// ewe-theme, in the browser.
//
// A LINE-FOR-LINE PORT of the colour half of ewe/bin/ewe-theme — the same
// CIELAB maths, the same reference ladders, the same Fluent 2 alias table.
// It exists so the theming page can *show* the derivation instead of
// describing it: you move one accent and every role on the page moves with
// it, exactly as `ewe-theme build` would move them on a real machine.
//
// Keep it faithful. If the Python changes, change this — and check a couple
// of stops against `ewe-theme show` before believing the result.

// ═══ colour math — sRGB <-> CIELAB <-> LCH, D65 ═══════════════════════════
const Xn = 0.95047, Yn = 1.0, Zn = 1.08883;

const lin = (c) => {
	c /= 255;
	return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const gam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function hexToLch(h) {
	h = h.replace('#', '');
	if (h.length === 3) h = [...h].map((c) => c + c).join('');
	const [r, g, b] = [0, 2, 4].map((i) => lin(parseInt(h.slice(i, i + 2), 16)));
	const X = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
	const Y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
	const Z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;
	const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : ((24389 / 27) * t + 16) / 116);
	const fx = f(X / Xn), fy = f(Y / Yn), fz = f(Z / Zn);
	const L = 116 * fy - 16, a = 500 * (fx - fy), bb = 200 * (fy - fz);
	return [L, Math.hypot(a, bb), ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360];
}

function lchToRgb(L, C, H) {
	const a = C * Math.cos((H * Math.PI) / 180);
	const b = C * Math.sin((H * Math.PI) / 180);
	const fy = (L + 16) / 116;
	const fx = fy + a / 500, fz = fy - b / 200;
	const g = (t) => (t ** 3 > 216 / 24389 ? t ** 3 : (116 * t - 16) / (24389 / 27));
	const X = g(fx) * Xn;
	const Y = (L > 8 ? ((L + 16) / 116) ** 3 : L / (24389 / 27)) * Yn;
	const Z = g(fz) * Zn;
	return [
		gam(3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z),
		gam(-0.969266 * X + 1.8760108 * Y + 0.041556 * Z),
		gam(0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z)
	];
}

const fits = (t) => t.every((c) => c >= -0.0005 && c <= 1.0005);

/** Fluent's snap_into_gamut: hold L and H, drop chroma until sRGB fits. */
export function lchToHex(L, C, H) {
	if (!fits(lchToRgb(L, C, H))) {
		let lo = 0, hi = C;
		for (let i = 0; i < 32; i++) {
			const mid = (lo + hi) / 2;
			if (fits(lchToRgb(L, mid, H))) lo = mid;
			else hi = mid;
		}
		C = lo;
	}
	const q = (c) => Math.max(0, Math.min(255, Math.round(c * 255)));
	return '#' + lchToRgb(L, C, H).map((c) => q(c).toString(16).padStart(2, '0')).join('');
}

// ═══ ramp 1: the greys ════════════════════════════════════════════════════
// Fluent's grey ramp is 50 stops keyed by percent lightness — grey[20] is
// #333333. The keys and the lightness are Fluent's verbatim; only the hue is
// bent, so every alias below stays Fluent's own mapping.
const GREY_KEYS = [...Array(49)].map((_, i) => 2 + i * 2).concat(99);

export function greyRamp(accent, tint) {
	const hue = hexToLch(accent)[2];
	const ramp = {};
	for (const k of GREY_KEYS) {
		const v = Math.round(2.55 * k);
		const base = '#' + [v, v, v].map((c) => c.toString(16).padStart(2, '0')).join('');
		if (!tint) { ramp[k] = base; continue; }
		const L = hexToLch(base)[0];
		const t = L / 100;
		// Weighted to the DARK end on purpose: the dark rungs are the large
		// surfaces, and that is where a hue actually reads. The light rungs
		// are text, which must stay neutral or it goes muddy.
		const C = tint * 0.32 * Math.exp(-(((t - 0.22) / 0.3) ** 2));
		ramp[k] = lchToHex(L, C, hue);
	}
	return ramp;
}

// ═══ ramp 2: the brand ════════════════════════════════════════════════════
// Fluent's real generator walks a curved helix through CIELAB with a per-hue
// snapping table. This is its faithful reduction: hold the hue, ride a
// lightness ladder anchored so the accent lands EXACTLY on stop 80, scale
// chroma by the measured envelope, twist slightly toward the ends, snap.
export const BRAND_STOPS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
const REF_L = [7.0, 12.9, 18.0, 23.7, 29.1, 34.7, 39.2, 44.9, 54.8, 63.7, 68.2, 72.6, 78.3, 84.3, 89.7, 95.5];
const REF_C = [11.2, 16.6, 20.9, 25.2, 31.3, 36.7, 43.6, 49.8, 52.5, 51.1, 43.7, 38.1, 30.7, 21.5, 13.2, 5.3];
const ANCHOR = 80;
const TORSION = -13.0;

export function brandRamp(accent) {
	const [L0, C0, H0] = hexToLch(accent);
	const i = BRAND_STOPS.indexOf(ANCHOR);
	const La = REF_L[i], Ca = REF_C[i];
	const ks = Ca ? C0 / Ca : 0;
	const ramp = {};
	BRAND_STOPS.forEach((s, j) => {
		const L = REF_L[j];
		const Lo = L <= La ? L0 * (L / La) : L0 + ((100 - L0) * (L - La)) / (100 - La);
		const t = L >= La ? (L - La) / (100 - La) : ((La - L) / La) * 0.55;
		ramp[s] = lchToHex(Lo, REF_C[j] * ks, (((H0 + TORSION * t) % 360) + 360) % 360);
	});
	return ramp;
}

/** Foreground for text sitting ON a fill. Fluent hard-codes white; ewe
 *  cannot, because you may pick yellow. L* 60 is where white gives up. */
export const on = (fill) => (hexToLch(fill)[0] > 60 ? '#242424' : '#ffffff');

// ═══ the alias layer — Fluent's dark theme, verbatim ══════════════════════
export function alias(g, b, white = '#ffffff', black = '#000000') {
	return {
		'fg-1': white, 'fg-2': g[84], 'fg-2-hover': white,
		'fg-3': g[68], 'fg-3-hover': g[84], 'fg-4': g[60],
		'fg-disabled': g[36], 'fg-inverted': g[14],
		'fg-on-brand': on(b[70]), // DEVIATION: measured, not white
		'bg-1': g[16], 'bg-1-hover': g[24], 'bg-1-pressed': g[12], 'bg-1-selected': g[22],
		'bg-2': g[12], 'bg-2-hover': g[20], 'bg-2-pressed': g[8], 'bg-2-selected': g[18],
		'bg-3': g[8], 'bg-3-hover': g[16], 'bg-3-pressed': g[4], 'bg-3-selected': g[14],
		'bg-4': g[4], 'bg-4-hover': g[12], 'bg-4-pressed': black, 'bg-4-selected': g[10],
		'bg-5': black, 'bg-5-hover': g[8], 'bg-5-pressed': g[2], 'bg-5-selected': g[6],
		'bg-6': g[20], 'bg-disabled': g[8],
		// DEVIATION: Fluent's bg-6 has no states, because its Card component
		// carries them. ewe's panels are full of tiles that must hover, so the
		// ladder is extended with Fluent's own deltas (+8 / -4 / +6) off g20.
		card: g[20], 'card-hover': g[28], 'card-pressed': g[16], 'card-selected': g[26],
		subtle: 'transparent', 'subtle-hover': g[22], 'subtle-pressed': g[18], 'subtle-selected': g[20],
		'stroke-1': g[40], 'stroke-1-hover': g[46], 'stroke-1-pressed': g[42], 'stroke-1-selected': g[44],
		'stroke-2': g[32], 'stroke-3': g[24],
		'stroke-accessible': g[68], 'stroke-disabled': g[26],
		'stroke-focus-1': black, 'stroke-focus-2': white,
		'brand-bg': b[70], 'brand-bg-hover': b[80], 'brand-bg-pressed': b[40], 'brand-bg-selected': b[60],
		'brand-fg-1': b[100], 'brand-fg-2': b[110],
		'brand-fg-link': b[100], 'brand-fg-link-hover': b[110],
		'brand-stroke-1': b[100], 'brand-stroke-2': b[50],
		'compound-brand-bg': b[100], 'compound-brand-bg-hover': b[110],
		'compound-brand-bg-pressed': b[90], 'compound-brand-fg': b[100],
		'compound-brand-stroke': b[100]
	};
}

// ═══ the non-colour ramps — Fluent's own, verbatim ═══════════════════════
export const RADIUS_RAMP = { none: 0, small: 2, medium: 4, large: 6, xlarge: 8, '2xlarge': 12, '3xlarge': 16, '4xlarge': 24, circular: 9999 };
export const SPACING_RAMP = { none: 0, xxs: 2, xs: 4, snudge: 6, s: 8, mnudge: 10, m: 12, l: 16, xl: 20, xxl: 24, xxxl: 32 };
export const STROKE_RAMP = { thin: 1, thick: 2, thicker: 3, thickest: 4 };

export const CORNER = {
	none: { control: 'none', card: 'none', panel: 'none', pill: 'none' },
	small: { control: 'small', card: 'medium', panel: 'large', pill: 'small' },
	medium: { control: 'medium', card: 'large', panel: 'xlarge', pill: 'medium' },
	large: { control: 'large', card: 'xlarge', panel: '2xlarge', pill: 'circular' }
};
// Fluent's own button sizes are 24 / 32 / 40 — exactly this ladder.
export const DENSITY = {
	compact: { pad: 's', gap: 'xs', control: 24, row: 28 },
	comfortable: { pad: 'm', gap: 's', control: 32, row: 36 },
	roomy: { pad: 'l', gap: 'm', control: 40, row: 44 }
};

/** Everything `ewe-theme build` would derive from one accent. */
export function derive(accent, tint = 8) {
	const grey = greyRamp(accent, tint);
	const brand = brandRamp(accent);
	return { grey, brand, color: alias(grey, brand) };
}

/** The shape and size half: corners, stroke weight, density. Values in px.
 *  18, not 16, for the middle icon rung: Lucide is stroke art where the old
 *  face was solid, so the same nominal size reads lighter and size is the
 *  only lever a font leaves you for optical weight. */
export function shape(corner = 'medium', stroke = 'thin', density = 'comfortable') {
	const c = CORNER[corner] ?? CORNER.medium;
	const d = DENSITY[density] ?? DENSITY.comfortable;
	const thin = STROKE_RAMP[stroke] ?? 1;
	const icon = d.control >= 40 ? 20 : d.control >= 32 ? 18 : 16;
	return {
		'radius-control': RADIUS_RAMP[c.control],
		'radius-card': RADIUS_RAMP[c.card],
		'radius-panel': RADIUS_RAMP[c.panel],
		'radius-pill': RADIUS_RAMP[c.pill],
		'stroke-width': thin,
		'stroke-width-thick': Math.min(4, thin + 1),
		'focus-width': 2,
		pad: SPACING_RAMP[d.pad],
		gap: SPACING_RAMP[d.gap],
		control: d.control,
		row: d.row,
		icon
	};
}
