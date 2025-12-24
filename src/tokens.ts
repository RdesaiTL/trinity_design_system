// ============================================
// TRINITY DESIGN TOKENS
// A comprehensive token system for consistent design
// ============================================


/**
 * Trinity Design System Token Types
 * These interfaces describe the structure of the design tokens for type safety and DX.
 */

// ============================================
// BASE TOKEN INTERFACES
// ============================================

export interface TrinityColorShades {
  [key: string]: string;
}

export interface TrinityBaseColors {
  navy: TrinityColorShades;
  purple: TrinityColorShades;
  indigo: TrinityColorShades;
  coral: TrinityColorShades;
  azure: TrinityColorShades;
  gray: TrinityColorShades;
}

export interface TrinitySpacing {
  0: number; 1: number; 2: number; 3: number; 4: number;
  5: number; 6: number; 7: number; 8: number; 9: number;
  10: number; 12: number; 14: number; 16: number;
  20: number; 24: number; 32: number;
}

export interface TrinityFontSize {
  xs: string; sm: string; base: string; lg: string; xl: string;
  '2xl': string; '3xl': string; '4xl': string; '5xl': string; '6xl': string;
}

export interface TrinityFontWeight {
  light: number; regular: number; medium: number;
  semibold: number; bold: number; extrabold: number;
}

export interface TrinityLineHeight {
  none: number; tight: number; snug: number;
  normal: number; relaxed: number; loose: number;
}

export interface TrinityLetterSpacing {
  tighter: string; tight: string; normal: string;
  wide: string; wider: string; widest: string;
}

/**
 * Border Radius Token System
 * 
 * Based on size-based grouping with nesting formula:
 * Outer radius = Inner radius + Padding
 * 
 * Size groups (by shortest side):
 * - xs: 16-24px elements (small chips, badges)
 * - sm: 24-32px elements (buttons, inputs, small cards)
 * - md: 32-48px elements (cards, list items)
 * - lg: 48-64px elements (larger cards, dialogs)
 * - xl: 64px+ elements (modals, large containers)
 */
export interface TrinityBorderRadius {
  /** No radius - 0px */
  none: number;
  /** Extra small - 4px - For 16-24px elements (badges, small chips, icons) */
  xs: number;
  /** Small - 6px - For 24-32px elements (buttons, tags, inputs) */
  sm: number;
  /** Medium - 8px - For 32-48px elements (cards, list items, small containers) */
  md: number;
  /** Large - 12px - For 48-64px elements (larger cards, dialogs, panels) */
  lg: number;
  /** Extra large - 16px - For 64px+ elements (modals, popovers, large containers) */
  xl: number;
  /** 2X large - 20px - For very large containers with nested lg elements */
  '2xl': number;
  /** 3X large - 24px - For maximum container nesting scenarios */
  '3xl': number;
  /** Full/Max - 9999px - For pill shapes (buttons, badges, avatars) */
  full: number;
}

export interface TrinityBorderWidth {
  0: number; 1: number; 2: number; 4: number; 8: number;
}

export interface TrinityShadows {
  none: string; sm: string; base: string; md: string;
  lg: string; xl: string; '2xl': string; inner: string;
}

export interface TrinityZIndex {
  auto: string | number; 0: number; 10: number; 20: number;
  30: number; 40: number; 50: number;
  dropdown: number; sticky: number; fixed: number;
  modalBackdrop: number; modal: number; popover: number; tooltip: number;
}

export interface TrinityDuration {
  fastest: string; faster: string; fast: string;
  normal: string; slow: string; slower: string; slowest: string;
}

export interface TrinityEasing {
  linear: string; in: string; out: string; inOut: string;
}

export interface TrinityOpacity {
  0: number; 5: number; 10: number; 20: number; 25: number;
  30: number; 40: number; 50: number; 60: number; 70: number;
  75: number; 80: number; 90: number; 95: number; 100: number;
}

export interface TrinityBreakpoints {
  xs: number; sm: number; md: number; lg: number; xl: number;
}

export interface TrinityBaseTokens {
  colors: TrinityBaseColors;
  spacing: TrinitySpacing;
  fontSize: TrinityFontSize;
  fontWeight: TrinityFontWeight;
  lineHeight: TrinityLineHeight;
  letterSpacing: TrinityLetterSpacing;
  borderRadius: TrinityBorderRadius;
  borderWidth: TrinityBorderWidth;
  shadows: TrinityShadows;
  zIndex: TrinityZIndex;
  duration: TrinityDuration;
  easing: TrinityEasing;
  opacity: TrinityOpacity;
  breakpoints: TrinityBreakpoints;
}

// ============================================
// SEMANTIC TOKEN INTERFACES
// ============================================

export interface TrinityBrandColors {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
}

export interface TrinityTextColors {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled: string;
  inverse: string;
  brand: string;
  link: string;
  linkHover: string;
  error: string;
  success: string;
  warning: string;
}

export interface TrinityBackgroundColors {
  primary: string;
  secondary: string;
  tertiary: string;
  inverse: string;
  brand: string;
  brandSubtle: string;
  accent: string;
  accentSubtle: string;
}

export interface TrinityBorderColors {
  default: string;
  subtle: string;
  strong: string;
  focus: string;
  error: string;
  success: string;
}

export interface TrinityInteractiveColors {
  default: string;
  hover: string;
  active: string;
  disabled: string;
  focus: string;
}

export interface TrinityStatusColors {
  text: string;
  background: string;
  border: string;
}

export interface TrinityStatusSet {
  error: TrinityStatusColors;
  warning: TrinityStatusColors;
  success: TrinityStatusColors;
  info: TrinityStatusColors;
}

export interface TrinitySemanticColors {
  brand: TrinityBrandColors;
  text: TrinityTextColors;
  background: TrinityBackgroundColors;
  border: TrinityBorderColors;
  interactive: TrinityInteractiveColors;
  status: TrinityStatusSet;
}

export interface TrinityTypographyStyle {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing?: string;
}

export interface TrinityTypographyScale {
  large: TrinityTypographyStyle;
  medium: TrinityTypographyStyle;
  small: TrinityTypographyStyle;
}

export interface TrinityHeadingScale {
  h1: TrinityTypographyStyle;
  h2: TrinityTypographyStyle;
  h3: TrinityTypographyStyle;
  h4: TrinityTypographyStyle;
  h5: TrinityTypographyStyle;
  h6: TrinityTypographyStyle;
}

export interface TrinitySemanticTypography {
  display: TrinityTypographyScale;
  heading: TrinityHeadingScale;
  body: TrinityTypographyScale;
  label: TrinityTypographyScale;
}

export interface TrinityComponentSpacing {
  paddingXs: number;
  paddingSm: number;
  paddingMd: number;
  paddingLg: number;
  paddingXl: number;
  gapXs: number;
  gapSm: number;
  gapMd: number;
  gapLg: number;
}

export interface TrinityLayoutSpacing {
  pagePadding: number;
  sectionGap: number;
  containerMaxWidth: number;
}

export interface TrinitySemanticSpacing {
  component: TrinityComponentSpacing;
  layout: TrinityLayoutSpacing;
}

export interface TrinitySemanticRadius {
  button: number;
  input: number;
  card: number;
  modal: number;
  badge: number;
  avatar: number;
}

export interface TrinitySemanticBorderWidth {
  default: number;
  focus: number;
  thick: number;
}

export interface TrinitySemanticBorders {
  radius: TrinitySemanticRadius;
  width: TrinitySemanticBorderWidth;
}

export interface TrinitySemanticShadows {
  card: string;
  dropdown: string;
  modal: string;
  button: string;
  input: string;
  inputFocus: string;
}

export interface TrinitySemanticMotionDuration {
  instant: string;
  fast: string;
  normal: string;
  slow: string;
}

export interface TrinitySemanticMotionEasing {
  default: string;
  enter: string;
  exit: string;
}

export interface TrinitySemanticMotion {
  duration: TrinitySemanticMotionDuration;
  easing: TrinitySemanticMotionEasing;
}

export interface TrinitySemanticTokens {
  colors: TrinitySemanticColors;
  typography: TrinitySemanticTypography;
  spacing: TrinitySemanticSpacing;
  borders: TrinitySemanticBorders;
  shadows: TrinitySemanticShadows;
  motion: TrinitySemanticMotion;
}

// ============================================
// COMPONENT TOKEN INTERFACES
// ============================================

export interface TrinityComponentSize<T> {
  small: T;
  medium: T;
  large: T;
}

export interface TrinityPadding {
  x: number;
  y: number;
}

export interface TrinityButtonColors {
  background: string;
  backgroundHover: string;
  text: string;
  border?: string;
  textHover?: string;
}

export interface TrinityButtonTokens {
  height: TrinityComponentSize<number>;
  padding: TrinityComponentSize<TrinityPadding>;
  fontSize: TrinityComponentSize<string>;
  borderRadius: number;
  primary: TrinityButtonColors;
  secondary: TrinityButtonColors;
  outlined: TrinityButtonColors;
}

export interface TrinityInputBorderColors {
  default: string;
  hover: string;
  focus: string;
  error: string;
}

export interface TrinityInputBackgroundColors {
  default: string;
  disabled: string;
}

export interface TrinityInputTokens {
  height: TrinityComponentSize<number>;
  padding: TrinityComponentSize<TrinityPadding>;
  fontSize: TrinityComponentSize<string>;
  borderRadius: number;
  borderColor: TrinityInputBorderColors;
  background: TrinityInputBackgroundColors;
}

export interface TrinityCardTokens {
  padding: TrinityComponentSize<number>;
  borderRadius: number;
  shadow: string;
  background: string;
  border: string;
}

export interface TrinityAvatarSize {
  xs: number; sm: number; md: number;
  lg: number; xl: number; '2xl': number;
}

export interface TrinityAvatarFontSize {
  xs: string; sm: string; md: string;
  lg: string; xl: string; '2xl': string;
}

export interface TrinityAvatarTokens {
  size: TrinityAvatarSize;
  borderRadius: number;
  fontSize: TrinityAvatarFontSize;
}

export interface TrinityBadgeTokens {
  padding: TrinityPadding;
  borderRadius: number;
  fontSize: string;
  fontWeight: number;
}

export interface TrinityChipSize {
  small: number;
  medium: number;
}

export interface TrinityChipTokens {
  height: TrinityChipSize;
  padding: { small: TrinityPadding; medium: TrinityPadding };
  borderRadius: number;
  fontSize: TrinityChipSize;
}

export interface TrinityTooltipTokens {
  padding: TrinityPadding;
  borderRadius: number;
  fontSize: string;
  background: string;
  text: string;
}

export interface TrinityModalWidth {
  small: number;
  medium: number;
  large: number;
  fullWidth: string;
}

export interface TrinityModalTokens {
  padding: number;
  borderRadius: number;
  shadow: string;
  backdropOpacity: number;
  width: TrinityModalWidth;
}

export interface TrinitySwitchSize {
  small: number;
  medium: number;
}

export interface TrinitySwitchTrack {
  off: string;
  on: string;
}

export interface TrinitySwitchTokens {
  width: TrinitySwitchSize;
  height: TrinitySwitchSize;
  thumb: TrinitySwitchSize;
  track: TrinitySwitchTrack;
}

export interface TrinityNavigationHeader {
  height: number;
  background: string;
  text: string;
}

export interface TrinityNavigationSidebar {
  width: number;
  collapsedWidth: number;
  background: string;
}

export interface TrinityNavigationItem {
  height: number;
  padding: TrinityPadding;
  borderRadius: number;
}

export interface TrinityNavigationTokens {
  header: TrinityNavigationHeader;
  sidebar: TrinityNavigationSidebar;
  item: TrinityNavigationItem;
}

export interface TrinityComponentTokens {
  button: TrinityButtonTokens;
  input: TrinityInputTokens;
  card: TrinityCardTokens;
  avatar: TrinityAvatarTokens;
  badge: TrinityBadgeTokens;
  chip: TrinityChipTokens;
  tooltip: TrinityTooltipTokens;
  modal: TrinityModalTokens;
  switch: TrinitySwitchTokens;
  navigation: TrinityNavigationTokens;
}

// ============================================
// DARK MODE TOKEN INTERFACES
// ============================================

export interface TrinityDarkModeTextColors {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled: string;
}

export interface TrinityDarkModeBackgroundColors {
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface TrinityDarkModeBorderColors {
  default: string;
  subtle: string;
  strong: string;
}

export interface TrinityDarkModeColors {
  text: TrinityDarkModeTextColors;
  background: TrinityDarkModeBackgroundColors;
  border: TrinityDarkModeBorderColors;
  // Interactive state overrides for dark mode
  interactive?: {
    default: string;
    hover: string;
    active: string;
    disabled: string;
    focus: string;
  };
  // Status color overrides for dark mode
  status?: {
    error: TrinityStatusColors;
    warning: TrinityStatusColors;
    success: TrinityStatusColors;
    info: TrinityStatusColors;
  };
}

export interface TrinityDarkModeTokens {
  colors: TrinityDarkModeColors;
}

// ============================================
// COMBINED TOKEN INTERFACE
// ============================================

export interface TrinityTokens {
  base: TrinityBaseTokens;
  semantic: TrinitySemanticTokens;
  component: TrinityComponentTokens;
  darkMode: TrinityDarkModeTokens;
}

// ============================================
// BASE TOKENS - Primitive values
// These are the foundational values that don't change
// ============================================

export const baseTokens = {
  // Color Primitives
  colors: {
    // Blues & Purples
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
      900: '#050742', // Primary Navy
    },
    purple: {
      50: '#F3EAFA',
      100: '#E1CBF2',
      200: '#CDA8EA',
      300: '#B985E1',
      400: '#A96ADA',
      500: '#9950D3',
      600: '#8D49CE',
      700: '#7841C9', // Primary Purple
      800: '#6939B5',
      900: '#4E2A97',
    },
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
      900: '#3816A0', // Deep Indigo
    },
    // Warm Colors
    coral: {
      50: '#FFEFEE',
      100: '#FFD7D4',
      200: '#FFBCB7',
      300: '#FFA19A',
      400: '#FF8D85',
      500: '#FF796F',
      600: '#FF7167',
      700: '#FF665C',
      800: '#FF6150', // Primary Coral
      900: '#FF5241',
    },
    // Cool Colors
    azure: {
      50: '#E5F5FC',
      100: '#BEE5F7',
      200: '#93D4F2',
      300: '#67C3ED',
      400: '#47B6E9',
      500: '#27AAE1', // Primary Azure
      600: '#239DDD',
      700: '#1D8DD8',
      800: '#177ED3',
      900: '#0E62CA',
    },
    // Neutrals
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
  },

  // Spacing Scale (in pixels, use for padding, margin, gaps)
  spacing: {
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
  },

  // Typography Scale
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  /**
   * Border Radius Scale
   * 
   * Designed for consistent nesting using: Outer = Inner + Padding
   * 
   * Common nesting patterns:
   * - Button (sm:6px) inside Card (md:8px) with 8px padding: 6 + 8 = 12 (use lg for container) 
   * - Card (md:8px) inside Modal (lg:12px) with 16px padding: 8 + 16 = 24 (use 3xl for modal)
   * - Input (sm:6px) inside Panel (md:8px) with 8px padding: 6 + 8 = 12 (use lg for panel)
   * 
   * Usage by element type:
   * - xs (4px): Small badges, icon containers, status dots with corners
   * - sm (6px): Buttons, inputs, chips, tags, small interactive elements
   * - md (8px): Cards, list items, small panels, menu items
   * - lg (12px): Large cards, dialogs, dropdown menus, panels
   * - xl (16px): Modals, popovers, large containers
   * - 2xl (20px): Very large modals with nested content
   * - 3xl (24px): Maximum nesting scenarios
   * - full (9999px): Pills, avatars, fully rounded elements
   */
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
  },

  // Border Width
  borderWidth: {
    0: 0,
    1: 1,
    2: 2,
    4: 4,
    8: 8,
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Z-Index Scale
  zIndex: {
    auto: 'auto',
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // Transitions
  duration: {
    fastest: '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },

  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Opacity
  opacity: {
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
  },

  // Breakpoints
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// ============================================
// SEMANTIC TOKENS - Meaningful, contextual names
// These map base tokens to specific use cases
// ============================================

export const semanticTokens = {
  colors: {
    // Brand
    brand: {
      primary: baseTokens.colors.navy[900],
      secondary: baseTokens.colors.purple[700],
      tertiary: baseTokens.colors.indigo[900],
      accent: baseTokens.colors.coral[800],
    },

    // Text
    text: {
      primary: baseTokens.colors.gray[900],
      secondary: baseTokens.colors.gray[500],
      tertiary: baseTokens.colors.gray[400],
      disabled: baseTokens.colors.gray[300],
      inverse: baseTokens.colors.gray[0],
      brand: baseTokens.colors.navy[900],
      link: baseTokens.colors.azure[500],
      linkHover: baseTokens.colors.azure[700],
      error: '#DC2626',
      success: '#16A34A',
      warning: '#D97706',
    },

    // Backgrounds
    background: {
      primary: baseTokens.colors.gray[0],
      secondary: baseTokens.colors.gray[50],
      tertiary: baseTokens.colors.gray[100],
      inverse: baseTokens.colors.gray[800],
      brand: baseTokens.colors.navy[900],
      brandSubtle: baseTokens.colors.navy[50],
      accent: baseTokens.colors.coral[800],
      accentSubtle: baseTokens.colors.coral[50],
    },

    // Surface colors for elevated/sunken elements
    surface: {
      elevated: baseTokens.colors.gray[0],    // Cards, modals, popovers
      sunken: baseTokens.colors.gray[100],    // Inputs, code blocks, wells
      overlay: 'rgba(0, 0, 0, 0.5)',          // Modal/dialog backdrops
    },

    // Borders
    border: {
      default: baseTokens.colors.gray[200],
      subtle: baseTokens.colors.gray[100],
      strong: baseTokens.colors.gray[400],
      focus: baseTokens.colors.purple[700],
      error: '#DC2626',
      success: '#16A34A',
    },

    // Interactive States
    interactive: {
      default: baseTokens.colors.navy[900],
      hover: baseTokens.colors.coral[800],
      active: baseTokens.colors.indigo[900],
      disabled: baseTokens.colors.gray[300],
      focus: baseTokens.colors.purple[700],
    },

    // Focus ring styles (accessibility)
    focus: {
      ring: baseTokens.colors.navy[900],      // Focus outline color
      ringOffset: baseTokens.colors.gray[0],  // Gap color between element and ring
    },

    // Selection styles
    selection: {
      background: baseTokens.colors.azure[100],
      text: baseTokens.colors.gray[900],
    },

    // Status/Feedback
    status: {
      error: {
        text: '#DC2626',
        background: '#FEF2F2',
        border: '#FECACA',
      },
      warning: {
        text: '#D97706',
        background: '#FFFBEB',
        border: '#FDE68A',
      },
      success: {
        text: '#16A34A',
        background: '#F0FDF4',
        border: '#BBF7D0',
      },
      info: {
        text: baseTokens.colors.azure[500],
        background: baseTokens.colors.azure[50],
        border: baseTokens.colors.azure[200],
      },
    },
  },

  typography: {
    // Display styles
    display: {
      large: {
        fontSize: baseTokens.fontSize['5xl'],
        fontWeight: baseTokens.fontWeight.bold,
        lineHeight: baseTokens.lineHeight.tight,
        letterSpacing: baseTokens.letterSpacing.tight,
      },
      medium: {
        fontSize: baseTokens.fontSize['4xl'],
        fontWeight: baseTokens.fontWeight.bold,
        lineHeight: baseTokens.lineHeight.tight,
        letterSpacing: baseTokens.letterSpacing.tight,
      },
      small: {
        fontSize: baseTokens.fontSize['3xl'],
        fontWeight: baseTokens.fontWeight.semibold,
        lineHeight: baseTokens.lineHeight.snug,
        letterSpacing: baseTokens.letterSpacing.normal,
      },
    },
    // Heading styles
    heading: {
      h1: {
        fontSize: baseTokens.fontSize['3xl'],
        fontWeight: baseTokens.fontWeight.bold,
        lineHeight: baseTokens.lineHeight.tight,
      },
      h2: {
        fontSize: baseTokens.fontSize['2xl'],
        fontWeight: baseTokens.fontWeight.semibold,
        lineHeight: baseTokens.lineHeight.snug,
      },
      h3: {
        fontSize: baseTokens.fontSize.xl,
        fontWeight: baseTokens.fontWeight.semibold,
        lineHeight: baseTokens.lineHeight.snug,
      },
      h4: {
        fontSize: baseTokens.fontSize.lg,
        fontWeight: baseTokens.fontWeight.semibold,
        lineHeight: baseTokens.lineHeight.normal,
      },
      h5: {
        fontSize: baseTokens.fontSize.base,
        fontWeight: baseTokens.fontWeight.semibold,
        lineHeight: baseTokens.lineHeight.normal,
      },
      h6: {
        fontSize: baseTokens.fontSize.sm,
        fontWeight: baseTokens.fontWeight.semibold,
        lineHeight: baseTokens.lineHeight.normal,
      },
    },
    // Body styles
    body: {
      large: {
        fontSize: baseTokens.fontSize.lg,
        fontWeight: baseTokens.fontWeight.regular,
        lineHeight: baseTokens.lineHeight.relaxed,
      },
      medium: {
        fontSize: baseTokens.fontSize.base,
        fontWeight: baseTokens.fontWeight.regular,
        lineHeight: baseTokens.lineHeight.normal,
      },
      small: {
        fontSize: baseTokens.fontSize.sm,
        fontWeight: baseTokens.fontWeight.regular,
        lineHeight: baseTokens.lineHeight.normal,
      },
    },
    // Label styles
    label: {
      large: {
        fontSize: baseTokens.fontSize.base,
        fontWeight: baseTokens.fontWeight.medium,
        lineHeight: baseTokens.lineHeight.tight,
      },
      medium: {
        fontSize: baseTokens.fontSize.sm,
        fontWeight: baseTokens.fontWeight.medium,
        lineHeight: baseTokens.lineHeight.tight,
      },
      small: {
        fontSize: baseTokens.fontSize.xs,
        fontWeight: baseTokens.fontWeight.medium,
        lineHeight: baseTokens.lineHeight.tight,
      },
    },
  },

  spacing: {
    // Component-specific spacing
    component: {
      paddingXs: baseTokens.spacing[1],
      paddingSm: baseTokens.spacing[2],
      paddingMd: baseTokens.spacing[4],
      paddingLg: baseTokens.spacing[6],
      paddingXl: baseTokens.spacing[8],
      gapXs: baseTokens.spacing[1],
      gapSm: baseTokens.spacing[2],
      gapMd: baseTokens.spacing[4],
      gapLg: baseTokens.spacing[6],
    },
    // Layout spacing
    layout: {
      pagePadding: baseTokens.spacing[6],
      sectionGap: baseTokens.spacing[12],
      containerMaxWidth: 1280,
    },
  },

  borders: {
    /**
     * Semantic border radius assignments
     * Based on component size and nesting requirements:
     * - Outer radius = Inner radius + Padding
     */
    radius: {
      /** Buttons use full pill shape */
      button: baseTokens.borderRadius.full,
      /** Inputs use sm (6px) for 32-40px height elements */
      input: baseTokens.borderRadius.sm,
      /** Cards use lg (12px) for typical 200-400px cards */
      card: baseTokens.borderRadius.lg,
      /** Modals use xl (16px) - allows nested cards with lg */
      modal: baseTokens.borderRadius.xl,
      /** Large modals use 2xl (20px) for complex nested content */
      modalLarge: baseTokens.borderRadius['2xl'],
      /** Badges use full pill shape */
      badge: baseTokens.borderRadius.full,
      /** Avatars use full for circular shape */
      avatar: baseTokens.borderRadius.full,
      /** Chips/tags use sm (6px) */
      chip: baseTokens.borderRadius.sm,
      /** Menu items use md (8px) */
      menuItem: baseTokens.borderRadius.md,
      /** Dropdown/popover menus use lg (12px) */
      menu: baseTokens.borderRadius.lg,
      /** Tooltips use md (8px) */
      tooltip: baseTokens.borderRadius.md,
      /** Small icon containers use xs (4px) */
      iconContainer: baseTokens.borderRadius.xs,
    },
    width: {
      default: baseTokens.borderWidth[1],
      focus: baseTokens.borderWidth[2],
      thick: baseTokens.borderWidth[4],
    },
  },

  shadows: {
    card: baseTokens.shadows.md,
    dropdown: baseTokens.shadows.lg,
    modal: baseTokens.shadows['2xl'],
    button: baseTokens.shadows.sm,
    input: baseTokens.shadows.none,
    inputFocus: baseTokens.shadows.base,
  },

  motion: {
    duration: {
      instant: baseTokens.duration.fastest,
      fast: baseTokens.duration.fast,
      normal: baseTokens.duration.normal,
      slow: baseTokens.duration.slow,
    },
    easing: {
      default: baseTokens.easing.inOut,
      enter: baseTokens.easing.out,
      exit: baseTokens.easing.in,
    },
  },
};

// ============================================
// COMPONENT TOKENS - Specific to UI components
// These provide precise control for individual components
// ============================================

export const componentTokens = {
  button: {
    // Sizing
    height: {
      small: 32,
      medium: 40,
      large: 48,
    },
    padding: {
      small: { x: 16, y: 8 },
      medium: { x: 20, y: 10 },
      large: { x: 24, y: 12 },
    },
    fontSize: {
      small: baseTokens.fontSize.sm,
      medium: baseTokens.fontSize.base,
      large: baseTokens.fontSize.lg,
    },
    borderRadius: baseTokens.borderRadius.full,
    // Colors by variant
    primary: {
      background: semanticTokens.colors.brand.primary,
      backgroundHover: semanticTokens.colors.brand.accent,
      text: semanticTokens.colors.text.inverse,
    },
    secondary: {
      background: semanticTokens.colors.brand.tertiary,
      backgroundHover: semanticTokens.colors.brand.accent,
      text: semanticTokens.colors.text.inverse,
    },
    outlined: {
      background: 'transparent',
      backgroundHover: semanticTokens.colors.brand.accent,
      border: semanticTokens.colors.brand.primary,
      text: semanticTokens.colors.brand.primary,
      textHover: semanticTokens.colors.text.inverse,
    },
  },

  input: {
    height: {
      small: 36,
      medium: 44,
      large: 52,
    },
    padding: {
      small: { x: 12, y: 8 },
      medium: { x: 14, y: 10 },
      large: { x: 16, y: 12 },
    },
    fontSize: {
      small: baseTokens.fontSize.sm,
      medium: baseTokens.fontSize.base,
      large: baseTokens.fontSize.lg,
    },
    borderRadius: baseTokens.borderRadius.sm, // 6px for 36-52px height inputs
    borderColor: {
      default: semanticTokens.colors.border.default,
      hover: semanticTokens.colors.border.strong,
      focus: semanticTokens.colors.border.focus,
      error: semanticTokens.colors.border.error,
    },
    background: {
      default: semanticTokens.colors.background.primary,
      disabled: semanticTokens.colors.background.tertiary,
    },
  },

  card: {
    padding: {
      small: baseTokens.spacing[4],
      medium: baseTokens.spacing[6],
      large: baseTokens.spacing[8],
    },
    borderRadius: baseTokens.borderRadius.lg, // 12px for cards - inner elements use sm:6px or md:8px
    shadow: semanticTokens.shadows.card,
    background: semanticTokens.colors.background.primary,
    border: semanticTokens.colors.border.subtle,
  },

  avatar: {
    size: {
      xs: 24,
      sm: 32,
      md: 40,
      lg: 48,
      xl: 64,
      '2xl': 96,
    },
    borderRadius: baseTokens.borderRadius.full,
    fontSize: {
      xs: baseTokens.fontSize.xs,
      sm: baseTokens.fontSize.xs,
      md: baseTokens.fontSize.sm,
      lg: baseTokens.fontSize.base,
      xl: baseTokens.fontSize.xl,
      '2xl': baseTokens.fontSize['2xl'],
    },
  },

  badge: {
    padding: { x: 8, y: 2 },
    borderRadius: baseTokens.borderRadius.full,
    fontSize: baseTokens.fontSize.xs,
    fontWeight: baseTokens.fontWeight.medium,
  },

  chip: {
    height: {
      small: 24,
      medium: 32,
    },
    padding: {
      small: { x: 8, y: 4 },
      medium: { x: 12, y: 6 },
    },
    borderRadius: baseTokens.borderRadius.sm, // 6px for 24-32px height chips
    fontSize: {
      small: baseTokens.fontSize.xs,
      medium: baseTokens.fontSize.sm,
    },
  },

  tooltip: {
    padding: { x: 12, y: 8 },
    borderRadius: baseTokens.borderRadius.sm, // 6px for small tooltip elements
    fontSize: baseTokens.fontSize.sm,
    background: semanticTokens.colors.background.inverse,
    text: semanticTokens.colors.text.inverse,
  },

  modal: {
    padding: baseTokens.spacing[6],
    borderRadius: baseTokens.borderRadius.xl, // 16px - allows nested cards with lg:12px
    shadow: semanticTokens.shadows.modal,
    backdropOpacity: baseTokens.opacity[50],
    width: {
      small: 400,
      medium: 560,
      large: 720,
      fullWidth: '90vw',
    },
  },

  switch: {
    width: {
      small: 36,
      medium: 48,
    },
    height: {
      small: 20,
      medium: 28,
    },
    thumb: {
      small: 16,
      medium: 24,
    },
    track: {
      off: baseTokens.colors.gray[200],
      on: semanticTokens.colors.brand.primary,
    },
  },

  navigation: {
    header: {
      height: 64,
      background: semanticTokens.colors.brand.primary,
      text: semanticTokens.colors.text.inverse,
    },
    sidebar: {
      width: 240,
      collapsedWidth: 64,
      background: semanticTokens.colors.brand.primary,
    },
    item: {
      height: 44,
      padding: { x: 16, y: 12 },
      borderRadius: baseTokens.borderRadius.md, // 8px for 44px height nav items
    },
  },
};

// ============================================
// DARK MODE TOKENS - Overrides for dark theme
// ============================================

export const darkModeTokens: TrinityDarkModeTokens = {
  colors: {
    text: {
      primary: baseTokens.colors.gray[50],
      secondary: baseTokens.colors.gray[400],
      tertiary: baseTokens.colors.gray[500],
      disabled: baseTokens.colors.gray[600],
    },
    background: {
      primary: baseTokens.colors.gray[800],
      secondary: baseTokens.colors.gray[700],
      tertiary: baseTokens.colors.gray[600],
    },
    border: {
      default: baseTokens.colors.gray[600],
      subtle: baseTokens.colors.gray[700],
      strong: baseTokens.colors.gray[500],
    },
    // Interactive state overrides for dark mode
    interactive: {
      default: baseTokens.colors.purple[400],
      hover: baseTokens.colors.coral[500],
      active: baseTokens.colors.indigo[400],
      disabled: baseTokens.colors.gray[600],
      focus: baseTokens.colors.purple[400],
    },
    // Status color overrides for dark mode
    status: {
      error: {
        text: '#FCA5A5',
        background: '#450A0A',
        border: '#7F1D1D',
      },
      warning: {
        text: '#FCD34D',
        background: '#451A03',
        border: '#78350F',
      },
      success: {
        text: '#86EFAC',
        background: '#052E16',
        border: '#166534',
      },
      info: {
        text: baseTokens.colors.azure[300],
        background: baseTokens.colors.azure[900],
        border: baseTokens.colors.azure[700],
      },
    },
  },
};

// ============================================
// UTILITY EXPORTS
// ============================================

// All tokens combined for easy access
export const tokens = {
  base: baseTokens,
  semantic: semanticTokens,
  component: componentTokens,
  darkMode: darkModeTokens,
};

export default tokens;
