// ewe-theme, in the browser.
//
// A PORT of the colour half of ewe/bin/ewe-theme (Ewe design system v3): the
// same OKLCH maths, the same two built-in Base24 schemes, the same role
// table, the same contrast guarantees, the same look-preset and Glass
// remaps. It exists so the theming page can *show* the derivation instead of
// describing it: pick an accent and every role on the page moves with it,
// exactly as `ewe-theme build` would move it on a real machine.
//
// Keep it faithful. If the Python changes, change this — and run
// scripts/check-engine.sh, which derives both and compares every role.

// ═══ colour math — sRGB <-> OKLCH ════════════════════════════════════════
const lin = (c) => {
	c /= 255;
	return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const gam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const cbrt = (x) => Math.cbrt(x);
const mod360 = (h) => ((h % 360) + 360) % 360;

/** Python's round(): half to even, which is not what Math.round does. */
const pyRound = (x) => {
	const f = Math.floor(x);
	const d = x - f;
	if (d > 0.5) return f + 1;
	if (d < 0.5) return f;
	return f % 2 === 0 ? f : f + 1;
};

function rgb(hex) {
	let h = hex.replace('#', '');
	if (h.length === 3) h = [...h].map((c) => c + c).join('');
	return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function hex(r, g, b) {
	const q = (c) => Math.max(0, Math.min(255, pyRound(c)));
	return '#' + [r, g, b].map((c) => q(c).toString(16).padStart(2, '0')).join('');
}

/** '#rrggbb' -> [L 0..100, C, h degrees] in OKLCH. */
export function oklch(hexv) {
	const [r, g, b] = rgb(hexv).map(lin);
	const l = cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
	const m = cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
	const s = cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
	const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
	const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
	const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
	return [L * 100, Math.hypot(a, bb), mod360((Math.atan2(bb, a) * 180) / Math.PI)];
}

function oklchRgb(L, C, h) {
	L /= 100;
	const a = C * Math.cos((h * Math.PI) / 180);
	const b = C * Math.sin((h * Math.PI) / 180);
	const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
	return [
		gam(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
		gam(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
		gam(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)
	];
}

const fits = (t) => t.every((c) => c >= -0.0005 && c <= 1.0005);

/** OKLCH -> '#rrggbb'. Holds L and h, drops chroma until sRGB fits. */
export function oklchHex(L, C, h) {
	L = Math.max(0, Math.min(100, L));
	if (!fits(oklchRgb(L, C, h))) {
		let lo = 0,
			hi = C;
		for (let i = 0; i < 32; i++) {
			const mid = (lo + hi) / 2;
			if (fits(oklchRgb(L, mid, h))) lo = mid;
			else hi = mid;
		}
		C = lo;
	}
	const [r, g, b] = oklchRgb(L, C, h);
	return hex(r * 255, g * 255, b * 255);
}

/** h1 -> h2 at f, hue along the short arc; a grey takes the other's hue. */
function okMix(h1, h2, f) {
	let [L1, C1, H1] = oklch(h1);
	let [L2, C2, H2] = oklch(h2);
	if (C1 < 0.005) H1 = H2;
	if (C2 < 0.005) H2 = H1;
	const d = (((H2 - H1 + 180) % 360) + 360) % 360 - 180;
	return oklchHex(L1 + (L2 - L1) * f, C1 + (C2 - C1) * f, mod360(H1 + d * f));
}

function okShift(hexv, dL) {
	const [L, C, H] = oklch(hexv);
	return oklchHex(L + dL, C, H);
}

/** `hexv` moved `dL` in lightness toward `target`, keeping its hue. */
function okToward(hexv, target, dL) {
	const [L, C, H] = oklch(hexv);
	const Lt = oklch(target)[0];
	return oklchHex(L + (Lt >= L ? dL : -dL), C, H);
}

const moveL = (hexv, L) => {
	const [, C, H] = oklch(hexv);
	return oklchHex(L, C, H);
};

// ── WCAG contrast ────────────────────────────────────────────────────────
export function luminance(hexv) {
	const [r, g, b] = rgb(hexv).map(lin);
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
	const la = luminance(a),
		lb = luminance(b);
	return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** `fg` at `alpha` composited over `bg`, as the compositor does. */
function over(fg, alpha, bg) {
	const f = rgb(fg),
		b = rgb(bg);
	return hex(...[0, 1, 2].map((i) => f[i] * alpha + b[i] * (1 - alpha)));
}

/** black or white, whichever contrasts more with `fill`. */
const onColor = (fill, dark = '#020202', light = '#ffffff') =>
	contrast(fill, dark) >= contrast(fill, light) ? dark : light;

// ═══ FOUNDATIONS — the design system's fixed values ══════════════════════
export const EWELLOW = '#eeb407';
const BLACK = '#020202';
export const NEUTRAL = {
	0: '#fefdfc', 50: '#faf9f6', 100: '#f4f2ee', 200: '#e9e6e0', 300: '#d5d2cb',
	400: '#a8a49d', 500: '#7f7b75', 600: '#5d5a55', 700: '#423f3a', 800: '#2c2a26',
	850: '#201e1a', 900: '#151411', 950: '#0b0a08'
};
const REF_RAMP = {
	50: '#fff6e4', 100: '#ffedc6', 200: '#ffdf9a', 300: '#fdcf64', 400: '#f8c23a',
	500: EWELLOW, 600: '#ce9707', 700: '#a77607', 800: '#805708', 900: '#5a3b09', 950: '#352206'
};
export const RAMP_STEPS = Object.keys(REF_RAMP).map(Number);
export const NEUTRAL_STEPS = Object.keys(NEUTRAL).map(Number);

const EWE_STATUS = {
	dark: { success: '#69d6aa', warning: '#f9a870', danger: '#ffa196', info: '#76c7ff' },
	light: { success: '#047554', warning: '#964d09', danger: '#a04038', info: '#026a9d' }
};
// Where the accent roles sit on the ramp: hover and pressed are relative to
// the accent's own lightness, the rest are absolute.
const ACCENT_L = {
	dark: { hover: +4, pressed: -10, subtle: 27, text: 84, ring: 84 },
	light: { hover: -10, pressed: -20, subtle: 97, text: 49, ring: 60 }
};
const STATUS_SUBTLE = { dark: [27, 0.045], light: [95, 0.026] };
const SUNKEN_DL = 4;
const SCRIM_ALPHA = { dark: 0.64, light: 0.32 };
const GLASS_ALPHA = {
	dark: { border: 0.1, hover: 0.08, pressed: 0.14 },
	light: { border: 0.1, hover: 0.06, pressed: 0.12 }
};
const CONTRAST_TEXT = 4.5,
	CONTRAST_BORDER = 3.0;
const SURFACE_STEP = 2.0;
const WARNING_HUE_GAP = 20.0;
const RED_HUE = 27.0;
const GLASS_PRESET = 80;
const OPACITY_GLASS = GLASS_PRESET / 100;

// Look presets: corner -> the five radii; density -> control-md and -lg;
// stroke -> the two border widths.
export const CORNER = {
	none: [0, 0, 0, 0, 0],
	small: [2, 2, 4, 6, 9999],
	medium: [4, 6, 8, 10, 9999],
	large: [6, 8, 12, 16, 9999]
};
export const DENSITY = { compact: [24, 28], comfortable: [28, 32], roomy: [32, 40] };
export const STROKE = { none: [0, 2], thin: [1, 2], thick: [2, 3] };
const FOCUS_WIDTH = 1;

const SURFACES = [
	'surface-base', 'surface-raised', 'surface-overlay', 'surface-sunken',
	'surface-hover', 'surface-pressed', 'surface-selected'
];
const RESTING = SURFACES.filter((s) => s !== 'surface-pressed');
const STATUS = ['success', 'warning', 'danger', 'info'];
export const ROLES = [
	...SURFACES,
	'border-subtle', 'border-strong', 'text-primary', 'text-secondary', 'text-muted',
	'text-disabled', 'accent', 'accent-hover', 'accent-pressed', 'on-accent', 'accent-subtle',
	'accent-text', 'focus-ring',
	...STATUS,
	...STATUS.map((s) => s + '-subtle'),
	'on-status', 'glass-accent'
];
const TEXT_ROLES = ['text-primary', 'text-secondary', 'text-muted', 'accent-text', ...STATUS];
const ACCENT_ROLES = [
	'accent', 'accent-hover', 'accent-pressed', 'on-accent', 'accent-subtle', 'accent-text',
	'focus-ring', 'glass-accent'
];

// ═══ the two built-in schemes ════════════════════════════════════════════
export const BUILTIN_SCHEMES = [
	{
		slug: 'ewe-dark', name: 'Ewe Dark', variant: 'dark', builtin: true, accent: EWELLOW,
		semantic: true,
		palette: {
			base00: '#0b0a08', base01: '#151411', base02: '#2c2a26', base03: '#5d5a55',
			base04: '#a8a49d', base05: '#faf9f6', base06: '#d5d2cb', base07: '#fefdfc',
			base08: '#ffa196', base09: '#f9a870', base0A: '#eeb407', base0B: '#69d6aa',
			base0C: '#64d1d7', base0D: '#76c7ff', base0E: '#e0a4ee', base0F: '#805708',
			base10: '#020202', base11: '#000000', base12: '#febfb7', base13: '#ffc29a',
			base14: '#7deabd', base15: '#79e5eb', base16: '#a3d8ff', base17: '#f1bafe'
		},
		overrides: {
			'on-accent': '#020202', 'accent-text': '#f8c23a', 'focus-ring': '#f8c23a',
			'surface-overlay': '#201e1a', 'surface-pressed': '#423f3a',
			'surface-selected': '#2c2a26', 'border-subtle': '#2c2a26',
			'border-strong': '#7f7b75', 'accent-subtle': '#352206'
		}
	},
	{
		slug: 'ewe-light', name: 'Ewe Light', variant: 'light', builtin: true, accent: EWELLOW,
		semantic: true,
		palette: {
			base00: '#f4f2ee', base01: '#faf9f6', base02: '#e9e6e0', base03: '#a8a49d',
			base04: '#5d5a55', base05: '#0b0a08', base06: '#423f3a', base07: '#fefdfc',
			base08: '#a04038', base09: '#964d09', base0A: '#eeb407', base0B: '#047554',
			base0C: '#057176', base0D: '#026a9d', base0E: '#814a8d', base0F: '#805708',
			base10: '#e9e6e0', base11: '#d5d2cb', base12: '#8c2e28', base13: '#7f3f02',
			base14: '#016245', base15: '#035e62', base16: '#025884', base17: '#6f397b'
		},
		overrides: {
			'on-accent': '#020202', 'accent-text': '#805708', 'focus-ring': '#a77607',
			'surface-overlay': '#fefdfc', 'surface-pressed': '#d5d2cb',
			'surface-selected': '#fefdfc', 'border-subtle': '#d5d2cb',
			'border-strong': '#7f7b75', 'accent-subtle': '#fff6e4'
		}
	}
];
const BY_SLUG = Object.fromEntries(BUILTIN_SCHEMES.map((s) => [s.slug, s]));

// ═══ the accent ramp ═════════════════════════════════════════════════════
/** The reference ramp as [L, chroma ratio to step 500, hue delta]. */
const PROFILE = (() => {
	const [L5, C5, H5] = oklch(REF_RAMP[500]);
	const p = {};
	for (const step of RAMP_STEPS) {
		const [L, C, H] = oklch(REF_RAMP[step]);
		p[step] = [L, C / C5, (((H - H5 + 180) % 360) + 360) % 360 - 180];
	}
	return p;
})();

/** Every step of the accent's ramp, in OKLCH. */
function accentRampLch(accent) {
	const [L0, C0, H0] = oklch(accent);
	const La = PROFILE[500][0];
	const steps = {};
	for (const step of RAMP_STEPS) {
		const [L, cr, dh] = PROFILE[step];
		const Ls = L >= La ? L0 + ((100 - L0) * (L - La)) / (100 - La) : (L0 * L) / La;
		steps[step] = [Ls, C0 * cr, mod360(H0 + dh)];
	}
	return steps;
}

/** The accent's own ramp, step 500 being the accent itself. */
export function accentRamp(accent) {
	const lch = accentRampLch(accent);
	const ramp = {};
	for (const step of RAMP_STEPS) ramp[step] = oklchHex(...lch[step]);
	ramp[500] = accent.toLowerCase();
	return ramp;
}

/** The ramp read at lightness L — "the accent at 84 L" means this. */
function rampAt(accent, L) {
	const pts = Object.values(accentRampLch(accent)).sort(
		(a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]
	);
	if (L <= pts[0][0]) return oklchHex(L, pts[0][1], pts[0][2]);
	const last = pts[pts.length - 1];
	if (L >= last[0]) return oklchHex(L, last[1], last[2]);
	for (let i = 0; i < pts.length - 1; i++) {
		const [L1, C1, H1] = pts[i];
		const [L2, C2, H2] = pts[i + 1];
		if (L1 <= L && L <= L2) {
			const f = L2 > L1 ? (L - L1) / (L2 - L1) : 0;
			const d = (((H2 - H1 + 180) % 360) + 360) % 360 - 180;
			return oklchHex(L, C1 + (C2 - C1) * f, mod360(H1 + d * f));
		}
	}
	return oklchHex(L, last[1], last[2]);
}

// ═══ role derivation ═════════════════════════════════════════════════════
function deriveRoles(sc, accent) {
	const p = sc.palette;
	const variant = sc.variant;
	const dark = variant === 'dark';
	const c = { ewellow: EWELLOW, black: BLACK };
	const ramp = accentRamp(accent);
	for (const s of RAMP_STEPS) c['ewellow-' + s] = ramp[s];
	for (const k of NEUTRAL_STEPS) c['neutral-' + k] = NEUTRAL[k];
	const sunken = p.base10 || okShift(p.base00, -SUNKEN_DL);
	if (dark) {
		Object.assign(c, {
			'surface-base': p.base00,
			'surface-raised': p.base01,
			'surface-overlay': okMix(p.base01, p.base02, 0.5),
			'surface-sunken': sunken,
			'surface-hover': p.base02,
			'surface-pressed': okToward(p.base02, p.base05, 8),
			'surface-selected': p.base02,
			'border-subtle': p.base02,
			'border-strong': okMix(p.base03, p.base04, 0.5)
		});
	} else {
		// base07 is the lightest surface in Ewe Light. A light scheme in the
		// Base16 convention runs the other way, and a black menu is not a menu.
		const top =
			oklch(p.base07)[0] >= oklch(p.base00)[0] ? p.base07 : okShift(p.base00, SURFACE_STEP);
		Object.assign(c, {
			'surface-base': p.base00,
			'surface-raised': p.base01,
			'surface-overlay': top,
			'surface-sunken': sunken,
			'surface-hover': p.base02,
			'surface-pressed': okToward(p.base02, p.base05, 8),
			'surface-selected': top,
			'border-subtle': okMix(p.base02, p.base03, 0.5),
			'border-strong': okMix(p.base03, p.base04, 0.5)
		});
	}
	Object.assign(c, {
		'text-primary': p.base05,
		'text-secondary': p.base06,
		'text-muted': p.base04,
		'text-disabled': p.base03
	});
	const L0 = oklch(accent)[0];
	const A = ACCENT_L[variant];
	c['accent'] = accent;
	c['accent-hover'] = rampAt(accent, L0 + A.hover);
	c['accent-pressed'] = rampAt(accent, L0 + A.pressed);
	c['on-accent'] = onColor(accent, BLACK, '#ffffff');
	c['accent-subtle'] = rampAt(accent, A.subtle);
	c['accent-text'] = rampAt(accent, A.text);
	c['focus-ring'] = rampAt(accent, A.ring);
	if (sc.semantic !== false) {
		Object.assign(c, {
			danger: p.base08, warning: p.base09, success: p.base0B, info: p.base0D
		});
	} else {
		Object.assign(c, EWE_STATUS[variant]);
	}
	const alpha = { scrim: SCRIM_ALPHA[variant] };
	c['scrim'] = dark ? p.base11 || BLACK : p.base05;
	return [c, alpha];
}

/** A status colour as a tinted ground: at the subtle L, chroma capped. */
function statusSubtle(color, variant) {
	const [Ls, Cmax] = STATUS_SUBTLE[variant];
	const [, C, H] = oklch(color);
	return oklchHex(Ls, Math.min(C, Cmax), H);
}

function finishStatus(c, variant) {
	for (const s of STATUS) c[s + '-subtle'] = statusSubtle(c[s], variant);
	// one on-status for the four fills: whichever holds best on all of them
	const score = (cand) => Math.min(...STATUS.map((s) => contrast(c[s], cand)));
	c['on-status'] = score('#020202') >= score('#ffffff') ? '#020202' : '#ffffff';
}

// ═══ the guarantees ══════════════════════════════════════════════════════
function ensureContrast(c, role, surfaces, target, adjusted, why) {
	const worst = Math.min(...surfaces.map((s) => contrast(c[role], c[s])));
	if (worst >= target - 1e-9) return;
	const [L, C, H] = oklch(c[role]);
	const mean = surfaces.reduce((n, s) => n + oklch(c[s])[0], 0) / surfaces.length;
	const first = L >= mean ? 1 : -1;
	for (const direction of [first, -first]) {
		for (let step = 1; step <= 100; step++) {
			const Ln = L + direction * step;
			if (Ln < 0 || Ln > 100) break;
			const cand = oklchHex(Ln, C, H);
			if (Math.min(...surfaces.map((s) => contrast(cand, c[s]))) >= target) {
				adjusted.push({ role, from: c[role], to: cand, why: `${why} (was ${worst.toFixed(2)}:1)` });
				c[role] = cand;
				return;
			}
		}
	}
	adjusted.push({
		role,
		from: c[role],
		to: c[role],
		why: `${why} — could not be reached by moving lightness alone (${worst.toFixed(2)}:1)`
	});
}

function guarantees(c, variant, accent, adjusted) {
	const dark = variant === 'dark';
	// 1. surfaces stay apart
	for (const [below, role] of [
		['surface-base', 'surface-raised'],
		['surface-raised', 'surface-overlay'],
		['surface-raised', 'surface-hover']
	]) {
		const Lb = oklch(c[below])[0],
			L = oklch(c[role])[0];
		if (Math.abs(L - Lb) >= SURFACE_STEP - 0.05) continue;
		const sign = Math.abs(L - Lb) > 1e-6 ? (L > Lb ? 1 : -1) : dark ? 1 : -1;
		const nw = moveL(c[role], Math.max(0, Math.min(100, Lb + sign * SURFACE_STEP)));
		if (nw !== c[role]) {
			adjusted.push({ role, from: c[role], to: nw, why: `at least ${SURFACE_STEP} L from ${below}` });
			c[role] = nw;
		}
	}
	// 2. warning never looks like the accent
	const [, Ca, Ha] = oklch(accent);
	const [Lw, Cw, Hw] = oklch(c['warning']);
	if (Ca > 0.02 && Cw > 0.02) {
		const d = (((Hw - Ha + 180) % 360) + 360) % 360 - 180;
		if (Math.abs(d) < WARNING_HUE_GAP) {
			const toward = (((RED_HUE - Ha + 180) % 360) + 360) % 360 - 180;
			const sign = toward >= 0 ? 1 : -1;
			const nw = oklchHex(Lw, Cw, mod360(Ha + sign * WARNING_HUE_GAP));
			adjusted.push({
				role: 'warning',
				from: c['warning'],
				to: nw,
				why: `hue within ${WARNING_HUE_GAP}° of the accent; turned toward red`
			});
			c['warning'] = nw;
		}
	}
	// 3. text reads on every surface; pressed carries primary and secondary
	for (const role of TEXT_ROLES)
		ensureContrast(c, role, RESTING, CONTRAST_TEXT, adjusted, `${CONTRAST_TEXT}:1 on every surface`);
	for (const role of ['text-primary', 'text-secondary'])
		ensureContrast(c, role, ['surface-pressed'], CONTRAST_TEXT, adjusted, `${CONTRAST_TEXT}:1 on surface-pressed`);
	// 4. outlines and the focus ring are visible on every surface
	for (const role of ['border-strong', 'focus-ring'])
		ensureContrast(c, role, RESTING, CONTRAST_BORDER, adjusted, `${CONTRAST_BORDER}:1 on every surface`);
}

/** derive -> overrides -> guarantees. */
function schemeColors(sc, accent) {
	const [c, alpha] = deriveRoles(sc, accent);
	const ov = sc.overrides || {};
	for (const [k, v] of Object.entries(ov)) {
		// an override of an accent role belongs to the accent the file was
		// written for; a built-in always wears the person's accent
		if (ACCENT_ROLES.includes(k) && sc.builtin && accent !== sc.accent) continue;
		c[k] = v;
	}
	const adjusted = [];
	guarantees(c, sc.variant, accent, adjusted);
	finishStatus(c, sc.variant);
	if ('on-status' in ov) c['on-status'] = ov['on-status'];
	for (const s of STATUS) if (s + '-subtle' in ov) c[s + '-subtle'] = ov[s + '-subtle'];
	return { color: c, alpha, adjusted };
}

// ═══ the token set ═══════════════════════════════════════════════════════
/**
 * Everything `ewe-theme build` would derive, for one scheme and one accent.
 *
 * @param {object} opts scheme (slug or record), accent, corner, density,
 *   stroke, barOpacity (0–100), increaseContrast, reduceTransparency
 */
export function derive({
	scheme = 'ewe-dark',
	accent = EWELLOW,
	corner = 'medium',
	density = 'comfortable',
	stroke = 'thin',
	barOpacity = 100,
	increaseContrast = false,
	reduceTransparency = false
} = {}) {
	const sc = typeof scheme === 'string' ? BY_SLUG[scheme] || BY_SLUG['ewe-dark'] : scheme;
	const variant = sc.variant;
	const dark = variant === 'dark';
	const acc = sc.builtin ? accent : sc.accent || sc.palette.base0A;
	const { color, alpha, adjusted } = schemeColors(sc, acc);

	// ── Increase contrast remaps roles ─────────────────────────────────────
	if (increaseContrast) {
		color['border-subtle'] = color['border-strong'];
		color['text-muted'] = color['text-secondary'];
		color['surface-hover'] = color['surface-pressed'];
	}

	// ── Glass: the bar, dock and lock card ────────────────────────────────
	const op = barOpacity;
	const glassSolid = increaseContrast || reduceTransparency;
	const glassAlpha = glassSolid ? 1.0 : op < 100 ? op / 100 : OPACITY_GLASS;
	const tint =
		contrast(sc.palette.base05, color['surface-base']) >=
		contrast(sc.palette.base07, color['surface-base'])
			? sc.palette.base05
			: sc.palette.base07;
	const ga = GLASS_ALPHA[variant];
	if (glassSolid) {
		Object.assign(color, {
			'glass-base': color['surface-base'],
			'glass-raised': color['surface-raised'],
			'glass-border': color['border-subtle'],
			'glass-hover': color['surface-hover'],
			'glass-pressed': color['surface-pressed']
		});
	} else {
		Object.assign(color, {
			'glass-base': color['surface-base'],
			'glass-raised': color['surface-raised'],
			'glass-border': tint,
			'glass-hover': tint,
			'glass-pressed': tint
		});
		Object.assign(alpha, {
			'glass-base': glassAlpha,
			'glass-raised': glassAlpha,
			'glass-border': ga.border,
			'glass-hover': ga.hover,
			'glass-pressed': ga.pressed
		});
	}
	color['glass-accent'] = dark
		? color['accent-text']
		: rampAt(acc, oklch(color['ewellow-900'])[0]);
	const ov = sc.overrides || {};
	if ('glass-accent' in ov && !(sc.builtin && acc !== sc.accent))
		color['glass-accent'] = ov['glass-accent'];
	if (!glassSolid && op < 100) {
		// The Glass contrast rule: at the preset, text and the accent mark hold
		// 4.5:1 and status glyphs 3:1 over the fill on white AND black.
		const backs = ['glass-base', 'glass-raised'].flatMap((k) =>
			['#ffffff', '#000000'].map((w) => over(color[k], OPACITY_GLASS, w))
		);
		const direction = dark ? 1 : -1;
		for (const [role, target] of [
			['text-primary', CONTRAST_TEXT],
			['text-secondary', CONTRAST_TEXT],
			['glass-accent', CONTRAST_TEXT],
			['success', CONTRAST_BORDER],
			['warning', CONTRAST_BORDER],
			['danger', CONTRAST_BORDER],
			['info', CONTRAST_BORDER]
		]) {
			const worst = Math.min(...backs.map((b) => contrast(color[role], b)));
			if (worst >= target - 1e-9) continue;
			const [L, C, H] = oklch(color[role]);
			for (let step = 1; step <= 100; step++) {
				const Ln = L + direction * step;
				if (Ln < 0 || Ln > 100) break;
				const cand = oklchHex(Ln, C, H);
				if (Math.min(...backs.map((b) => contrast(cand, b))) >= target) {
					adjusted.push({
						role,
						from: color[role],
						to: cand,
						why: `${target}:1 over glass at ${GLASS_PRESET}% (was ${worst.toFixed(2)}:1)`
					});
					color[role] = cand;
					break;
				}
			}
		}
		for (const st of STATUS)
			if (adjusted.some((a) => a.role === st && a.why.includes('glass')))
				color[st + '-subtle'] = statusSubtle(color[st], variant);
	}

	// ── look presets: a remap of a few tokens, never colours or type ───────
	const [slight, secondary, primary, rounded, full] = CORNER[corner] ?? CORNER.medium;
	const [ctrlMd, ctrlLg] = DENSITY[density] ?? DENSITY.comfortable;
	const [bw1, bw2] = STROKE[stroke] ?? STROKE.thin;
	const shape = {
		slight,
		secondary,
		primary,
		rounded,
		'fully-rounded': full,
		'border-width-1': bw1,
		'border-width-2': bw2,
		'focus-width': increaseContrast ? 2 : FOCUS_WIDTH
	};
	const size = { 'control-sm': 24, 'control-md': ctrlMd, 'control-lg': ctrlLg, 'control-xl': 40, 'control-2xl': 48 };

	return {
		scheme: { slug: sc.slug, name: sc.name, variant, builtin: !!sc.builtin },
		accent: acc,
		variant,
		color,
		alpha,
		shape,
		size,
		adjusted,
		brand: Object.fromEntries(RAMP_STEPS.map((s) => [s, color['ewellow-' + s]])),
		glass: { alpha: glassAlpha, solid: glassSolid, blurred: !glassSolid && op >= 10 && op < 100 }
	};
}

const fmt = (x) => {
	const s = x.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
	return s === '' || s === '-' ? '0' : s;
};

/** A role's value as tokens.css spells it: translucent roles as rgba(). */
export function colorCss(role, color, alpha) {
	const v = color[role];
	if (alpha && role in alpha) {
		const [r, g, b] = rgb(v);
		return `rgba(${r}, ${g}, ${b}, ${fmt(alpha[role])})`;
	}
	return v;
}

/** Every role as a `--name:value` declaration list, for a style attribute. */
export function cssVars(t) {
	return [
		...Object.keys(t.color).map((k) => `--${k}:${colorCss(k, t.color, t.alpha)}`),
		...Object.entries(t.shape).map(([k, v]) => `--${k}:${v}px`),
		...Object.entries(t.size).map(([k, v]) => `--${k}:${v}px`)
	].join(';');
}
