/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TIER 3: COMPONENT TOKENS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Component-scoped tokens that derive ONLY from base or semantic tokens.
 * These provide precise control for individual UI components.
 * 
 * Rules:
 * - NO raw values (no hex codes, no pixel values)
 * - Must derive from base or semantic tokens
 * - Organized by component name
 * 
 * @module foundations/tokens/component
 */

import { colors, spacing, fontSize, fontWeight, borderRadius, opacity } from './base';
import { brand, text, background, border, interactive, radius, shadow, space } from './semantic';

// ═══════════════════════════════════════════════════════════════════════════════
// BUTTON TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const button = {
  height: {
    small: 32,
    medium: 40,
    large: 48,
  },
  padding: {
    small: { x: spacing[4], y: spacing[2] },    // 16px, 8px
    medium: { x: spacing[5], y: spacing[3] },   // 20px, 12px
    large: { x: spacing[6], y: spacing[4] },    // 24px, 16px
  },
  fontSize: {
    small: fontSize.sm,
    medium: fontSize.base,
    large: fontSize.lg,
  },
  fontWeight: fontWeight.semibold,
  borderRadius: radius.button,
  
  // Variants
  primary: {
    background: brand.primary,
    backgroundHover: brand.accent,
    text: text.inverse,
    textHover: text.inverse,
  },
  secondary: {
    background: brand.tertiary,
    backgroundHover: brand.accent,
    text: text.inverse,
    textHover: text.inverse,
  },
  outlined: {
    background: 'transparent',
    backgroundHover: brand.accent,
    border: brand.primary,
    text: brand.primary,
    textHover: text.inverse,
  },
  ghost: {
    background: 'transparent',
    backgroundHover: background.tertiary,
    text: text.primary,
    textHover: text.primary,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// INPUT TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const input = {
  height: {
    small: 36,
    medium: 44,
    large: 52,
  },
  padding: {
    small: { x: spacing[3], y: spacing[2] },    // 12px, 8px
    medium: { x: spacing[4], y: spacing[3] },   // 16px, 12px
    large: { x: spacing[4], y: spacing[4] },    // 16px, 16px
  },
  fontSize: {
    small: fontSize.sm,
    medium: fontSize.base,
    large: fontSize.lg,
  },
  borderRadius: radius.input,
  borderWidth: 1,
  borderColor: {
    default: border.default,
    hover: border.strong,
    focus: border.focus,
    error: border.error,
    success: border.success,
  },
  background: {
    default: background.primary,
    disabled: background.tertiary,
    error: colors.status.error[50],
  },
  text: {
    default: text.primary,
    placeholder: text.tertiary,
    disabled: text.disabled,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CARD TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const card = {
  padding: {
    small: spacing[4],    // 16px
    medium: spacing[6],   // 24px
    large: spacing[8],    // 32px
  },
  borderRadius: radius.card,
  shadow: shadow.card,
  shadowHover: shadow.cardHover,
  background: background.elevated,
  border: border.subtle,
  borderWidth: 1,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const modal = {
  padding: spacing[6],   // 24px
  borderRadius: radius.modal,
  shadow: shadow.modal,
  backdropOpacity: opacity[50],
  width: {
    small: 400,
    medium: 560,
    large: 720,
    fullWidth: '90vw',
  },
  background: background.elevated,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// AVATAR TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const avatar = {
  size: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    '2xl': 96,
  },
  borderRadius: radius.avatar,
  fontSize: {
    xs: fontSize.xs,
    sm: fontSize.xs,
    md: fontSize.sm,
    lg: fontSize.base,
    xl: fontSize.xl,
    '2xl': fontSize['2xl'],
  },
  // Accessible background colors (work with white text)
  backgrounds: [
    colors.indigo[600],
    colors.purple[600],
    colors.coral[600],
    colors.azure[600],
    colors.navy[700],
    colors.indigo[500],
    colors.purple[500],
    colors.coral[500],
  ],
  // Status indicators
  status: {
    online: colors.status.success[500],
    offline: colors.gray[400],
    busy: colors.status.error[500],
    away: colors.status.warning[500],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BADGE TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const badge = {
  padding: { x: spacing[2], y: spacing[1] },  // 8px, 4px
  borderRadius: radius.badge,
  fontSize: fontSize.xs,
  fontWeight: fontWeight.medium,
  // Semantic variants derive from status tokens
  variants: {
    success: {
      background: colors.status.success[100],
      text: colors.status.success[700],
      border: colors.status.success[200],
    },
    warning: {
      background: colors.status.warning[100],
      text: colors.status.warning[700],
      border: colors.status.warning[200],
    },
    error: {
      background: colors.status.error[100],
      text: colors.status.error[700],
      border: colors.status.error[200],
    },
    info: {
      background: colors.status.info[100],
      text: colors.status.info[700],
      border: colors.status.info[200],
    },
    default: {
      background: colors.gray[100],
      text: colors.gray[600],
      border: colors.gray[200],
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHIP TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const chip = {
  height: {
    small: 24,
    medium: 32,
  },
  padding: {
    small: { x: spacing[2], y: spacing[1] },   // 8px, 4px
    medium: { x: spacing[3], y: spacing[2] },  // 12px, 8px
  },
  borderRadius: radius.chip,
  fontSize: {
    small: fontSize.xs,
    medium: fontSize.sm,
  },
  fontWeight: fontWeight.medium,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TOOLTIP TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const tooltip = {
  padding: { x: spacing[3], y: spacing[2] },  // 12px, 8px
  borderRadius: radius.tooltip,
  fontSize: fontSize.sm,
  background: background.inverse,
  text: text.inverse,
  shadow: shadow.tooltip,
  maxWidth: 320,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SWITCH TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const switchToggle = {
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
    off: colors.gray[200],
    on: brand.primary,
  },
  borderRadius: borderRadius.full,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const navigation = {
  header: {
    height: 64,
    background: brand.primary,
    text: text.inverse,
  },
  sidebar: {
    width: 240,
    collapsedWidth: 64,
    background: brand.primary,
  },
  item: {
    height: 44,
    padding: { x: spacing[4], y: spacing[3] },  // 16px, 12px
    borderRadius: radius.menuItem,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TOAST / NOTIFICATION TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const toast = {
  padding: { x: spacing[4], y: spacing[3] },  // 16px, 12px
  borderRadius: radius.containerSmall,
  shadow: shadow.floating,
  maxWidth: 400,
  minWidth: 300,
  gap: spacing[3],  // 12px between icon and content
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// DROPDOWN / MENU TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const dropdown = {
  padding: spacing[2],  // 8px
  borderRadius: radius.menu,
  shadow: shadow.dropdown,
  background: background.elevated,
  border: border.subtle,
  item: {
    height: 40,
    padding: { x: spacing[3], y: spacing[2] },  // 12px, 8px
    borderRadius: radius.menuItem,
    fontSize: fontSize.sm,
    hover: background.tertiary,
    active: colors.indigo[50],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED COMPONENT TOKENS EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const componentTokens = {
  button,
  input,
  card,
  modal,
  avatar,
  badge,
  chip,
  tooltip,
  switch: switchToggle,
  navigation,
  toast,
  dropdown,
} as const;

export type ComponentTokens = typeof componentTokens;

export default componentTokens;
