/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TIER 1: BASE TOKENS (Primitives)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Raw design primitives. These are the atomic values from which all other tokens
 * derive. NO semantic meaning — just raw values.
 * 
 * Rules:
 * - No magic numbers in component code — reference these tokens
 * - Values are immutable design decisions
 * - Changes here cascade through the entire system
 * 
 * @module foundations/tokens/base
 */

// ═══════════════════════════════════════════════════════════════════════════════
// COLOR PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Trinity Brand Color Palette
 * These are the raw hex values from brand guidelines.
 */
export const colors = {
  // ─────────────────────────────────────────────────────────────────────────────
  // PRIMARY BRAND: Navy
  // ─────────────────────────────────────────────────────────────────────────────
  navy: {
    50: '#E8E8F0',
    100: '#C5C6D9',
    200: '#9FA1C0',
    300: '#7879A7',
    400: '#5B5C94',
    500: '#3E3F81',
    600: '#383979',
    700: '#30316E',
    800: '#282964',
    900: '#050742',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SECONDARY BRAND: Purple
  // ─────────────────────────────────────────────────────────────────────────────
  purple: {
    50: '#F3EAFA',
    100: '#E1CBF2',
    200: '#CDA8EA',
    300: '#B985E1',
    400: '#A96ADA',
    500: '#9950D3',
    600: '#8D49CE',
    700: '#7841C9',
    800: '#6939B5',
    900: '#4E2A97',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TERTIARY BRAND: Indigo
  // ─────────────────────────────────────────────────────────────────────────────
  indigo: {
    50: '#EDE7FD',
    100: '#D2C3FA',
    200: '#B49CF6',
    300: '#9574F2',
    400: '#7E57F0',
    500: '#6739ED',
    600: '#5F33EB',
    700: '#542CE8',
    800: '#4A24E5',
    900: '#3816A0',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ACCENT: Coral
  // ─────────────────────────────────────────────────────────────────────────────
  coral: {
    50: '#FFEFEE',
    100: '#FFD7D4',
    200: '#FFBCB7',
    300: '#FFA19A',
    400: '#FF8D85',
    500: '#FF796F',
    600: '#FF7167',
    700: '#FF665C',
    800: '#FF6150',
    900: '#FF5241',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // UTILITY: Azure (Links, Info)
  // ─────────────────────────────────────────────────────────────────────────────
  azure: {
    50: '#E5F5FC',
    100: '#BEE5F7',
    200: '#93D4F2',
    300: '#67C3ED',
    400: '#47B6E9',
    500: '#27AAE1',
    600: '#239DDD',
    700: '#1D8DD8',
    800: '#177ED3',
    900: '#0E62CA',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // NEUTRALS: Gray Scale
  // ─────────────────────────────────────────────────────────────────────────────
  gray: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E5E7EB',
    300: '#D4D4D8',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#374151',
    700: '#27272A',
    800: '#18181B',
    900: '#09090B',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STATUS: Semantic Colors (raw values only)
  // ─────────────────────────────────────────────────────────────────────────────
  status: {
    success: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      900: '#052E16',
    },
    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      900: '#451A03',
    },
    error: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      900: '#450A0A',
    },
    info: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      900: '#1E3A8A',
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SPACING SCALE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 4px base unit spacing scale.
 * All values in pixels.
 */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════════

export const fontFamily = {
  sans: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
} as const;

export const fontSize = {
  '2xs': '0.625rem',   // 10px
  xs: '0.75rem',       // 12px
  sm: '0.875rem',      // 14px
  base: '1rem',        // 16px
  lg: '1.125rem',      // 18px
  xl: '1.25rem',       // 20px
  '2xl': '1.5rem',     // 24px
  '3xl': '1.875rem',   // 30px
  '4xl': '2.25rem',    // 36px
  '5xl': '3rem',       // 48px
  '6xl': '3.75rem',    // 60px
} as const;

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BORDER RADIUS SCALE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Border radius scale following nesting formula:
 * Outer radius = Inner radius + Padding
 * 
 * Usage by element height:
 * - xs (4px): 16-24px elements (badges, small chips)
 * - sm (6px): 24-32px elements (buttons, inputs, tags)
 * - md (8px): 32-48px elements (cards, list items)
 * - lg (12px): 48-64px elements (larger cards, panels)
 * - xl (16px): 64px+ elements (modals, popovers)
 */
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BORDER WIDTH
// ═══════════════════════════════════════════════════════════════════════════════

export const borderWidth = {
  0: 0,
  1: 1,
  2: 2,
  4: 4,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SHADOW SCALE
// ═══════════════════════════════════════════════════════════════════════════════

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// Z-INDEX SCALE
// ═══════════════════════════════════════════════════════════════════════════════

export const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  overlay: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// MOTION / ANIMATION
// ═══════════════════════════════════════════════════════════════════════════════

export const duration = {
  instant: '0ms',
  fastest: '50ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '400ms',
  slowest: '500ms',
} as const;

export const easing = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// OPACITY SCALE
// ═══════════════════════════════════════════════════════════════════════════════

export const opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BREAKPOINTS
// ═══════════════════════════════════════════════════════════════════════════════

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED BASE TOKENS EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const baseTokens = {
  colors,
  spacing,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  borderRadius,
  borderWidth,
  shadows,
  zIndex,
  duration,
  easing,
  opacity,
  breakpoints,
} as const;

export type BaseTokens = typeof baseTokens;

export default baseTokens;
