/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TIER 2: SEMANTIC TOKENS (Intent-Based Aliases)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Purpose-driven tokens that map primitives to design intent.
 * Each token answers: "What is this FOR?" not "What color IS this?"
 * 
 * Rules:
 * - Every token MUST derive from base tokens
 * - Names describe intent, not appearance (text.primary, not text.navy)
 * - 1:1 mapping to design intent — no ambiguity
 * 
 * @module foundations/tokens/semantic
 */

import { 
  colors, 
  spacing, 
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
} from './base';

// ═══════════════════════════════════════════════════════════════════════════════
// BRAND COLORS
// ═══════════════════════════════════════════════════════════════════════════════

export const brand = {
  /** Primary brand color - Navy (main identity) */
  primary: colors.navy[900],
  /** Secondary brand color - Purple (supporting) */
  secondary: colors.purple[700],
  /** Tertiary brand color - Indigo (accent) */
  tertiary: colors.indigo[600],
  /** Accent color - Coral (CTAs, highlights) */
  accent: colors.coral[800],
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TEXT COLORS
// ═══════════════════════════════════════════════════════════════════════════════

export const text = {
  /** Default text - highest contrast */
  primary: colors.gray[900],
  /** Secondary text - less emphasis */
  secondary: colors.gray[500],
  /** Tertiary text - hints, captions */
  tertiary: colors.gray[400],
  /** Disabled text */
  disabled: colors.gray[300],
  /** Inverse text (on dark backgrounds) */
  inverse: colors.gray[0],
  /** Brand-colored text */
  brand: colors.navy[900],
  /** Link text */
  link: colors.azure[600],
  /** Link hover text */
  linkHover: colors.azure[700],
  /** Error text */
  error: colors.status.error[600],
  /** Success text */
  success: colors.status.success[600],
  /** Warning text */
  warning: colors.status.warning[600],
  /** Info text */
  info: colors.status.info[600],
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BACKGROUND COLORS
// ═══════════════════════════════════════════════════════════════════════════════

export const background = {
  /** Primary background - white */
  primary: colors.gray[0],
  /** Secondary background - subtle gray */
  secondary: colors.gray[50],
  /** Tertiary background - darker gray */
  tertiary: colors.gray[100],
  /** Inverse background - dark */
  inverse: colors.gray[800],
  /** Brand background */
  brand: colors.navy[900],
  /** Brand subtle background */
  brandSubtle: colors.navy[50],
  /** Accent background */
  accent: colors.coral[800],
  /** Accent subtle background */
  accentSubtle: colors.coral[50],
  /** Elevated surface (cards, modals) */
  elevated: colors.gray[0],
  /** Sunken surface (inputs, wells) */
  sunken: colors.gray[100],
  /** Overlay backdrop */
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BORDER COLORS
// ═══════════════════════════════════════════════════════════════════════════════

export const border = {
  /** Default border */
  default: colors.gray[200],
  /** Subtle border - low contrast */
  subtle: colors.gray[100],
  /** Strong border - high contrast */
  strong: colors.gray[400],
  /** Focus border */
  focus: colors.purple[700],
  /** Error border */
  error: colors.status.error[600],
  /** Success border */
  success: colors.status.success[600],
  /** Warning border */
  warning: colors.status.warning[600],
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// INTERACTIVE STATE COLORS
// ═══════════════════════════════════════════════════════════════════════════════

export const interactive = {
  /** Default state */
  default: colors.navy[900],
  /** Hover state */
  hover: colors.coral[800],
  /** Active/pressed state */
  active: colors.indigo[900],
  /** Disabled state */
  disabled: colors.gray[300],
  /** Focus state */
  focus: colors.purple[700],
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// FOCUS RING STYLES
// ═══════════════════════════════════════════════════════════════════════════════

export const focusRing = {
  /** Focus ring color */
  color: colors.navy[900],
  /** Focus ring offset background */
  offset: colors.gray[0],
  /** Focus ring width */
  width: borderWidth[2],
  /** Focus ring offset distance */
  offsetDistance: 2,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// STATUS SEMANTIC COLORS
// ═══════════════════════════════════════════════════════════════════════════════

export const status = {
  error: {
    text: colors.status.error[600],
    background: colors.status.error[50],
    border: colors.status.error[200],
    backgroundStrong: colors.status.error[100],
  },
  warning: {
    text: colors.status.warning[600],
    background: colors.status.warning[50],
    border: colors.status.warning[200],
    backgroundStrong: colors.status.warning[100],
  },
  success: {
    text: colors.status.success[600],
    background: colors.status.success[50],
    border: colors.status.success[200],
    backgroundStrong: colors.status.success[100],
  },
  info: {
    text: colors.status.info[600],
    background: colors.status.info[50],
    border: colors.status.info[200],
    backgroundStrong: colors.status.info[100],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANTIC SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const space = {
  /** Component internal padding */
  component: {
    xs: spacing[1],   // 4px - tight internal spacing
    sm: spacing[2],   // 8px - compact internal spacing
    md: spacing[4],   // 16px - default internal spacing
    lg: spacing[6],   // 24px - comfortable internal spacing
    xl: spacing[8],   // 32px - spacious internal spacing
  },
  /** Gaps between elements */
  gap: {
    xs: spacing[1],   // 4px
    sm: spacing[2],   // 8px
    md: spacing[4],   // 16px
    lg: spacing[6],   // 24px
    xl: spacing[8],   // 32px
  },
  /** Layout/page-level spacing */
  layout: {
    pagePadding: spacing[6],      // 24px
    sectionGap: spacing[12],      // 48px
    containerMaxWidth: 1280,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANTIC BORDER RADIUS
// ═══════════════════════════════════════════════════════════════════════════════

export const radius = {
  /** Button radius - pill shape */
  button: borderRadius.full,
  /** Input radius */
  input: borderRadius.sm,
  /** Card radius */
  card: borderRadius.lg,
  /** Modal radius */
  modal: borderRadius.xl,
  /** Badge radius - pill shape */
  badge: borderRadius.full,
  /** Avatar radius - circular */
  avatar: borderRadius.full,
  /** Chip/tag radius */
  chip: borderRadius.sm,
  /** Menu item radius */
  menuItem: borderRadius.md,
  /** Dropdown/popover radius */
  menu: borderRadius.lg,
  /** Tooltip radius */
  tooltip: borderRadius.md,
  /** Small container radius */
  containerSmall: borderRadius.md,
  /** Medium container radius */
  containerMedium: borderRadius.lg,
  /** Large container radius */
  containerLarge: borderRadius.xl,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANTIC SHADOWS
// ═══════════════════════════════════════════════════════════════════════════════

export const shadow = {
  /** Card shadow */
  card: shadows.sm,
  /** Card hover shadow */
  cardHover: shadows.md,
  /** Dropdown shadow */
  dropdown: shadows.lg,
  /** Modal shadow */
  modal: shadows['2xl'],
  /** Button shadow */
  button: shadows.xs,
  /** Input shadow (default) */
  input: shadows.none,
  /** Input shadow (focus) */
  inputFocus: shadows.xs,
  /** Tooltip shadow */
  tooltip: shadows.md,
  /** Floating element shadow */
  floating: shadows.lg,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANTIC MOTION
// ═══════════════════════════════════════════════════════════════════════════════

export const motion = {
  duration: {
    instant: duration.instant,
    fast: duration.fast,
    normal: duration.normal,
    slow: duration.slow,
  },
  easing: {
    default: easing.inOut,
    enter: easing.out,
    exit: easing.in,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANTIC Z-INDEX
// ═══════════════════════════════════════════════════════════════════════════════

export const elevation = {
  base: zIndex.base,
  raised: zIndex.raised,
  dropdown: zIndex.dropdown,
  sticky: zIndex.sticky,
  fixed: zIndex.fixed,
  overlay: zIndex.overlay,
  modal: zIndex.modal,
  popover: zIndex.popover,
  tooltip: zIndex.tooltip,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANTIC TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════════════════

export const typography = {
  display: {
    large: {
      fontSize: fontSize['5xl'],
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
    medium: {
      fontSize: fontSize['4xl'],
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
    small: {
      fontSize: fontSize['3xl'],
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.snug,
      letterSpacing: letterSpacing.normal,
    },
  },
  heading: {
    h1: {
      fontSize: fontSize['3xl'],
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.tight,
    },
    h2: {
      fontSize: fontSize['2xl'],
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.snug,
    },
    h3: {
      fontSize: fontSize.xl,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.snug,
    },
    h4: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.normal,
    },
    h5: {
      fontSize: fontSize.base,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.normal,
    },
    h6: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.normal,
    },
  },
  body: {
    large: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.relaxed,
    },
    medium: {
      fontSize: fontSize.base,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.normal,
    },
    small: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.normal,
    },
  },
  label: {
    large: {
      fontSize: fontSize.base,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.tight,
    },
    medium: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.tight,
    },
    small: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.tight,
    },
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
  overline: {
    fontSize: fontSize['2xs'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED SEMANTIC TOKENS EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const semanticTokens = {
  brand,
  text,
  background,
  border,
  interactive,
  focusRing,
  status,
  space,
  radius,
  shadow,
  motion,
  elevation,
  typography,
} as const;

export type SemanticTokens = typeof semanticTokens;

export default semanticTokens;
