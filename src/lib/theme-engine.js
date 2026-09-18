// ewe-theme, in the browser.
//
// A PORT of the color half of ewe/bin/ewe-theme (Ewe design system v3): the
// same OKLCH maths, the same two built-in Base24 schemes, the same role
// table, the same contrast guarantees, the same look-preset and Glass
// remaps. It exists so the theming page can *show* the derivation instead of
// describing it: pick an accent and every role on the page moves with it,
// exactly as `ewe-theme build` would move it on a real machine.
//
// Keep it faithful. If the Python changes, change this — and run
// scripts/check-engine.sh, which derives both and compares every role.

// ═══ color math — sRGB <-> OKLCH ════════════════════════════════════════
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

// ═══ FOUNDATIONS — the design system's fixed values ══════════════════════
export const EWELLOW = '#eeb407';
const BLACK = '#020202';
export const NEUTRAL = {
	0: '#fefdfc', 50: '#faf9f6', 100: '#f4f2ee', 200: '#e9e6e0', 300: '#d5d2cb',
	400: '#a8a49d', 500: '#7f7b75', 600: '#5d5a55', 700: '#423f3a', 800: '#2c2a26',
	850: '#201e1a', 900: '#151411', 950: '#0b0a08'
};
const WHITE = NEUTRAL[0];
const REF_RAMP = {
	50: '#fff6e4', 100: '#ffedc6', 200: '#ffdf9a', 300: '#fdcf64', 400: '#f8c23a',
	500: EWELLOW, 600: '#ce9707', 700: '#a77607', 800: '#805708', 900: '#5a3b09', 950: '#352206'
};
export const RAMP_STEPS = Object.keys(REF_RAMP).map(Number);
export const NEUTRAL_STEPS = Object.keys(NEUTRAL).map(Number);

// The Accent picker's presets: values a person can pick as their accent.
export const ACCENT_PRESETS = [
	{ name: 'Ewellow', hex: EWELLOW }, { name: 'Amber', hex: '#f08a3c' },
	{ name: 'Coral', hex: '#e5675b' }, { name: 'Rose', hex: '#d86fb3' },
	{ name: 'Iris', hex: '#9a8cf0' }, { name: 'Sky', hex: '#62a8f5' },
	{ name: 'Teal', hex: '#4cc1b0' }, { name: 'Moss', hex: '#7cc36a' },
	{ name: 'Stone', hex: '#a8a49d' }
];

const EWE_STATUS = {
	dark: { success: '#69d6aa', warning: '#f9a870', danger: '#ffa196', info: '#76c7ff' },
	light: { success: '#047554', warning: '#964d09', danger: '#a04038', info: '#026a9d' }
};
// Which step of the accent ramp each accent role is. `accent` is step 500
// and `on-accent` is chosen by contrast.
export const ACCENT_STEP = {
	dark: {
		'accent-hover': 400, 'accent-pressed': 600, 'accent-subtle': 950,
		'accent-text': 400, 'focus-ring': 400, 'glass-accent': 400
	},
	light: {
		'accent-hover': 600, 'accent-pressed': 700, 'accent-subtle': 50,
		'accent-text': 800, 'focus-ring': 700, 'glass-accent': 900
	}
};
const STATUS_SUBTLE = { dark: [27, 0.045], light: [95, 0.026] };
const SUNKEN_DL = 4;
const PRESSED_DL = { dark: 8, light: 6 };
const BORDER_SUBTLE_MIX = 0.3;
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
const FIELD_BORDER_WIDTH = 1;

// The top bar: its size follows its icons. icon_size small | normal | large
// picks the module and the glyph; the bar is that module plus space-s above
// and below, so 44 / 48 / 56.
const SPACE_S = 8;
export const BAR = {
	small: { module: DENSITY.comfortable[0], icon: 16 },
	normal: { module: DENSITY.comfortable[1], icon: 20 },
	large: { module: 40, icon: 24 }
};
for (const b of Object.values(BAR)) b.height = b.module + 2 * SPACE_S;
const BAR_STEPS = ['small', 'normal', 'large'];
export const TEXT_SCALES = [100, 115, 130];

/** Text size scales a pixel size, rounded to a whole pixel (ewe-theme's _scale). */
export const scalePx = (px, pct) => pyRound((px * pct) / 100);

// shadows: (x, y, blur) and the alpha per variant; the color is derived
const SHADOW = {
	'shadow-sm': [[0, 1, 2], { dark: 0.4, light: 0.08 }],
	'shadow-float': [[0, 2, 6], { dark: 0.35, light: 0.1 }]
};
const GRADIENT_ANGLE = { 'gradient-ewellow': 135, 'gradient-ember': 160, 'gradient-night': 180 };
const GRADIENT_EWELLOW_MIX = [0.5, 0.25];
const EMBER_TINT = 0.4;
const GLOW_ALPHA = 0.08;

const SURFACES = [
	'surface-base', 'surface-raised', 'surface-overlay', 'surface-sunken',
	'surface-hover', 'surface-pressed', 'surface-selected'
];
const RESTING = SURFACES.filter((s) => s !== 'surface-pressed');
const STATUS = ['success', 'warning', 'danger', 'info'];
const STATUS_FINISH = ['on-status', ...STATUS.map((s) => s + '-subtle')];
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

// ═══ the two built-in schemes: palette + accent, no overrides ════════════
export const BUILTIN_SCHEMES = [
	{
		slug: 'ewe-dark', name: 'Ewe Dark', variant: 'dark', builtin: true, accent: EWELLOW,
		semantic: true,
		palette: {
			base00: '#0b0a08', base01: '#151411', base02: '#2c2a26', base03: '#5d5a55',
			base04: '#a8a49d', base05: '#faf9f6', base06: '#d5d2cb', base07: '#fefdfc',
			base08: '#ffa196', base09: '#f9a870', base0A: '#eeb407', base0B: '#69d6aa',
			base0C: '#64d1d7', base0D: '#76c7ff', base0E: '#e0a4ee', base0F: '#805708',
			base10: '#020202', base11: '#020202', base12: '#febfb7', base13: '#ffc29a',
			base14: '#7deabd', base15: '#79e5eb', base16: '#a3d8ff', base17: '#f1bafe'
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
		}
	}
];
const BY_SLUG = Object.fromEntries(BUILTIN_SCHEMES.map((s) => [s.slug, s]));

// ═══ one black, one white ════════════════════════════════════════════════
const L_FLOOR = oklch(BLACK)[0]; // nothing emitted is darker than `black`
const L_CEIL = oklch(WHITE)[0]; // nothing emitted is lighter than `neutral-0`

/** `hexv`, or `black` / `neutral-0` when it lies beyond them. */
function inRange(hexv) {
	const L = oklch(hexv)[0];
	if (L < L_FLOOR - 1e-6) return BLACK;
	if (L > L_CEIL + 1e-6) return WHITE;
	return hexv;
}

/** `hexv` at lightness L (hue and chroma kept), inside the range. */
function atL(hexv, L) {
	const [, C, H] = oklch(hexv);
	return inRange(oklchHex(Math.max(L_FLOOR, Math.min(L_CEIL, L)), C, H));
}

/** `black` or `neutral-0`, whichever contrasts more with `fill`. */
export const onColor = (fill) => (contrast(fill, BLACK) >= contrast(fill, WHITE) ? BLACK : WHITE);

// ═══ the accent ramp ═════════════════════════════════════════════════════
/** The reference ramp as [L, chroma ratio to step 500, hue delta]. */
const PROFILE = (() => {
	const [, C5, H5] = oklch(REF_RAMP[500]);
	const p = {};
	for (const step of RAMP_STEPS) {
		const [L, C, H] = oklch(REF_RAMP[step]);
		p[step] = [L, C / C5, (((H - H5 + 180) % 360) + 360) % 360 - 180];
	}
	return p;
})();

/** The accent's own ramp, step 500 being the accent itself. */
export function accentRamp(accent) {
	const [L0, C0, H0] = oklch(accent);
	const La = PROFILE[500][0];
	const ramp = {};
	for (const step of RAMP_STEPS) {
		const [L, cr, dh] = PROFILE[step];
		const Ls = L >= La ? L0 + ((100 - L0) * (L - La)) / (100 - La) : (L0 * L) / La;
		ramp[step] = oklchHex(Ls, C0 * cr, mod360(H0 + dh));
	}
	ramp[500] = accent.toLowerCase();
	return ramp;
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
	const pressed = okToward(p.base02, p.base05, PRESSED_DL[variant]);
	if (dark) {
		Object.assign(c, {
			'surface-base': p.base00,
			'surface-raised': p.base01,
			'surface-overlay': okMix(p.base01, p.base02, 0.5),
			'surface-sunken': sunken,
			'surface-hover': p.base02,
			'surface-pressed': pressed,
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
			'surface-pressed': pressed,
			'surface-selected': top,
			'border-subtle': okMix(p.base02, p.base03, BORDER_SUBTLE_MIX),
			'border-strong': okMix(p.base03, p.base04, 0.5)
		});
	}
	Object.assign(c, {
		'text-primary': p.base05,
		'text-secondary': p.base06,
		'text-muted': p.base04,
		'text-disabled': p.base03
	});
	// the accent roles are steps of the ramp generated from the accent
	c['accent'] = ramp[500];
	for (const [role, step] of Object.entries(ACCENT_STEP[variant])) c[role] = ramp[step];
	if (sc.semantic !== false) {
		Object.assign(c, { danger: p.base08, warning: p.base09, success: p.base0B, info: p.base0D });
	} else {
		Object.assign(c, EWE_STATUS[variant]);
	}
	const alpha = { scrim: SCRIM_ALPHA[variant] };
	c['scrim'] = dark ? p.base11 || BLACK : p.base05;
	for (const k of Object.keys(c)) c[k] = inRange(c[k]); // one black, one white
	c['on-accent'] = onColor(c['accent']);
	return [c, alpha];
}

/** A status color as a tinted ground: at the subtle L, chroma capped. */
function statusSubtle(color, variant) {
	const [Ls, Cmax] = STATUS_SUBTLE[variant];
	const [, C, H] = oklch(color);
	return inRange(oklchHex(Ls, Math.min(C, Cmax), H));
}

function finishStatus(c, variant) {
	for (const s of STATUS) c[s + '-subtle'] = statusSubtle(c[s], variant);
	// one on-status for the four fills: whichever holds best on all of them
	const score = (cand) => Math.min(...STATUS.map((s) => contrast(c[s], cand)));
	c['on-status'] = score(BLACK) >= score(WHITE) ? BLACK : WHITE;
}

// ═══ the guarantees ══════════════════════════════════════════════════════
const worstOn = (hexv, c, surfaces) => Math.min(...surfaces.map((s) => contrast(hexv, c[s])));

function ensureContrast(c, role, surfaces, target, adjusted, why) {
	const worst = worstOn(c[role], c, surfaces);
	if (worst >= target - 1e-9) return;
	const [L, C, H] = oklch(c[role]);
	const mean = surfaces.reduce((n, s) => n + oklch(c[s])[0], 0) / surfaces.length;
	const first = L >= mean ? 1 : -1;
	const move = (cand) => {
		adjusted.push({ role, from: c[role], to: cand, why: `${why} (was ${worst.toFixed(2)}:1)` });
		c[role] = cand;
	};
	for (const direction of [first, -first]) {
		for (let step = 1; step <= 100; step++) {
			const Ln = L + direction * step;
			if (Ln < L_FLOOR || Ln > L_CEIL) break;
			const cand = inRange(oklchHex(Ln, C, H));
			if (worstOn(cand, c, surfaces) >= target) return move(cand);
		}
		// the last step inside the range, before turning round
		const cand = atL(c[role], direction > 0 ? L_CEIL : L_FLOOR);
		if (worstOn(cand, c, surfaces) >= target) return move(cand);
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
	// 1. surfaces stay apart, as far as the range between black and
	//    neutral-0 allows
	for (const [below, role] of [
		['surface-base', 'surface-raised'],
		['surface-raised', 'surface-overlay'],
		['surface-raised', 'surface-hover']
	]) {
		const Lb = oklch(c[below])[0],
			L = oklch(c[role])[0];
		if (Math.abs(L - Lb) >= SURFACE_STEP - 0.05) continue;
		const sign = Math.abs(L - Lb) > 1e-6 ? (L > Lb ? 1 : -1) : dark ? 1 : -1;
		const want = Math.max(L_FLOOR, Math.min(L_CEIL, Lb + sign * SURFACE_STEP));
		if (Math.abs(want - Lb) <= Math.abs(L - Lb) + 0.05) continue; // no room left
		const nw = atL(c[role], want);
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
			const nw = inRange(oklchHex(Lw, Cw, mod360(Ha + sign * WARNING_HUE_GAP)));
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

/** derive -> overrides (user schemes only) -> guarantees. */
function schemeColors(sc, accent) {
	const [c, alpha] = deriveRoles(sc, accent);
	const ov = Object.fromEntries(Object.entries(sc.overrides || {}).map(([k, v]) => [k, inRange(v)]));
	for (const [k, v] of Object.entries(ov)) if (!STATUS_FINISH.includes(k)) c[k] = v;
	const adjusted = [];
	guarantees(c, sc.variant, accent, adjusted);
	// glass-accent is accent-text inside glass: where they are the same ramp
	// step (the dark), it follows accent-text through the guarantees
	const steps = ACCENT_STEP[sc.variant];
	if (!('glass-accent' in ov) && steps['glass-accent'] === steps['accent-text'])
		c['glass-accent'] = c['accent-text'];
	finishStatus(c, sc.variant);
	for (const k of STATUS_FINISH) if (k in ov) c[k] = ov[k];
	return { color: c, alpha, adjusted };
}

/** The four gradients, from the ramp and the surfaces. */
function gradients(c) {
	const [fa, fb] = GRADIENT_EWELLOW_MIX;
	const [, Cs, Hs] = oklch(c['accent-subtle']);
	const Lr = oklch(c['surface-raised'])[0];
	const ember = inRange(oklchHex(Lr, Cs * EMBER_TINT, Hs));
	return {
		'gradient-ewellow': { kind: 'linear', angle: GRADIENT_ANGLE['gradient-ewellow'], stops: [
			[inRange(okMix(c['ewellow-400'], c['accent'], fa)), 1, 0],
			[inRange(okMix(c['accent'], c['ewellow-600'], fb)), 1, 100]] },
		'gradient-ember': { kind: 'linear', angle: GRADIENT_ANGLE['gradient-ember'], stops: [
			[ember, 1, 0], [c['surface-base'], 1, 100]] },
		'gradient-night': { kind: 'linear', angle: GRADIENT_ANGLE['gradient-night'], stops: [
			[c['surface-raised'], 1, 0], [c['surface-base'], 1, 100]] },
		'gradient-glow': { kind: 'radial', at: '50% 0%', stops: [
			[c['accent'], GLOW_ALPHA, 0], [c['accent'], 0, 60]] }
	};
}

// ═══ the token set ═══════════════════════════════════════════════════════
/**
 * Everything `ewe-theme build` would derive, for one scheme and one accent.
 *
 * @param {object} opts scheme (slug or record), accent, corner, density,
 *   stroke, barOpacity (0–100), increaseContrast, reduceTransparency,
 *   barIconSize, textScale (100 | 115 | 130: the controls grow with the type,
 *   and at 130 the bar's icons move one step up)
 */
export function derive({
	scheme = 'ewe-dark',
	accent = EWELLOW,
	corner = 'medium',
	density = 'comfortable',
	stroke = 'thin',
	barOpacity = 100,
	increaseContrast = false,
	reduceTransparency = false,
	barIconSize = 'normal',
	textScale = 100
} = {}) {
	const sc = typeof scheme === 'string' ? BY_SLUG[scheme] || BY_SLUG['ewe-dark'] : scheme;
	const variant = sc.variant;
	const dark = variant === 'dark';
	const acc = inRange((sc.builtin ? accent : sc.accent || sc.palette.base0A).toLowerCase());
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
	const t05 = inRange(sc.palette.base05),
		t07 = inRange(sc.palette.base07);
	const tint = contrast(t05, color['surface-base']) >= contrast(t07, color['surface-base']) ? t05 : t07;
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
			const L = oklch(color[role])[0];
			for (let step = 1; step <= 100; step++) {
				const Ln = L + direction * step;
				const edge = Ln < L_FLOOR || Ln > L_CEIL;
				const cand = atL(color[role], Ln); // at the edge: black / neutral-0
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
				if (edge) break;
			}
		}
		for (const st of STATUS)
			if (adjusted.some((a) => a.role === st && a.why.includes('glass')))
				color[st + '-subtle'] = statusSubtle(color[st], variant);
	}

	// ── look presets: a remap of a few tokens, never colors or type ───────
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
		'focus-width': increaseContrast ? 2 : FOCUS_WIDTH,
		'field-border-width': Math.max(increaseContrast ? 2 : FIELD_BORDER_WIDTH, bw1)
	};
	// any other value snaps to the nearest step, as ewe-theme does
	const ts = TEXT_SCALES.reduce((best, s) => (Math.abs(s - textScale) < Math.abs(best - textScale) ? s : best), TEXT_SCALES[0]);
	const size = Object.fromEntries(
		Object.entries({ 'control-sm': 24, 'control-md': ctrlMd, 'control-lg': ctrlLg, 'control-xl': 40, 'control-2xl': 48 })
			.map(([k, v]) => [k, scalePx(v, ts)])
	);
	let barStep = BAR[barIconSize] ? barIconSize : 'normal';
	if (ts === 130) barStep = BAR_STEPS[Math.min(BAR_STEPS.indexOf(barStep) + 1, BAR_STEPS.length - 1)];
	const bar = BAR[barStep];

	const ink = dark ? BLACK : inRange(sc.palette.base05);
	const shadow = Object.fromEntries(
		Object.entries(SHADOW).map(([k, [[x, y, blur], a]]) => [k, { x, y, blur, color: ink, alpha: a[variant] }])
	);

	return {
		scheme: { slug: sc.slug, name: sc.name, variant, builtin: !!sc.builtin },
		accent: acc,
		variant,
		color,
		alpha,
		shape,
		size,
		bar: { iconSize: barStep, ...bar, padding: SPACE_S },
		shadow,
		gradient: gradients(color),
		adjusted,
		brand: Object.fromEntries(RAMP_STEPS.map((s) => [s, color['ewellow-' + s]])),
		glass: { alpha: glassAlpha, solid: glassSolid, blurred: !glassSolid && op >= 10 && op < 100 }
	};
}

const fmt = (x) => {
	const s = x.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
	return s === '' || s === '-' ? '0' : s;
};

const rgba = (v, a) => {
	const [r, g, b] = rgb(v);
	return `rgba(${r}, ${g}, ${b}, ${fmt(a)})`;
};

/** A role's value as tokens.css spells it: translucent roles as rgba(). */
export function colorCss(role, color, alpha) {
	const v = color[role];
	return alpha && role in alpha ? rgba(v, alpha[role]) : v;
}

const px = (v) => (v === 0 ? '0' : `${v}px`);

export const shadowCss = (sh) => (sh ? `${px(sh.x)} ${px(sh.y)} ${px(sh.blur)} ${rgba(sh.color, sh.alpha)}` : 'none');

export function gradientCss(g) {
	const stops = g.stops.map(([c, a, pos]) => `${a < 1 ? rgba(c, a) : c} ${pos}%`).join(', ');
	return g.kind === 'radial'
		? `radial-gradient(circle at ${g.at}, ${stops})`
		: `linear-gradient(${g.angle}deg, ${stops})`;
}

/** Every role as a `--name:value` declaration list, for a style attribute. */
export function cssVars(t) {
	return [
		...Object.keys(t.color).map((k) => `--${k}:${colorCss(k, t.color, t.alpha)}`),
		...Object.entries(t.shape).map(([k, v]) => `--${k}:${v}px`),
		...Object.entries(t.size).map(([k, v]) => `--${k}:${v}px`),
		...Object.entries(t.shadow).map(([k, v]) => `--${k}:${shadowCss(v)}`),
		...Object.entries(t.gradient).map(([k, v]) => `--${k}:${gradientCss(v)}`)
	].join(';');
}
