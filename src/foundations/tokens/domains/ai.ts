/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * DOMAIN TOKENS: AI Components
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * AI-specific tokens that extend the canonical token system.
 * ALL values derive from base/semantic tokens — NO raw values allowed.
 * 
 * @module foundations/tokens/domains/ai
 */

import { colors, spacing, borderRadius, opacity } from '../base';
import { brand } from '../semantic';

// ═══════════════════════════════════════════════════════════════════════════════
// AI COLOR PALETTE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * AI-specific colors derived from brand colors
 * Primary: Purple (AI identity)
 * Secondary: Coral (highlights, CTAs)
 */
export const aiColors = {
  /** Primary AI color - Purple */
  primary: brand.secondary,                    // colors.purple[700]
  /** Secondary AI color - Coral */  
  secondary: brand.accent,                     // colors.coral[800]
  
  /** AI backgrounds */
  background: {
    default: `rgba(120, 65, 201, ${opacity[5]})`,
    hover: colors.indigo[50],
    active: colors.indigo[100],
    dark: `rgba(120, 65, 201, ${opacity[15]})`,
  },
  
  /** AI borders */
  border: {
    default: `rgba(120, 65, 201, ${opacity[20]})`,
    hover: `rgba(120, 65, 201, ${opacity[30]})`,
    active: colors.purple[400],
  },
  
  /** Source badge colors */
  sourceBadge: {
    background: `rgba(120, 65, 201, ${opacity[15]})`,
    backgroundDark: `rgba(120, 65, 201, ${opacity[25]})`,
    text: colors.purple[700],
    textDark: colors.purple[300],
  },
  
  /** Typing indicator */
  typingDot: {
    light: colors.purple[700],
    dark: colors.coral[500],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// AI GRADIENTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * AI gradient definitions using brand colors
 * Coral → Purple is the signature AI gradient
 */
export const aiGradients = {
  /** Primary gradient: Coral to Purple (vertical) */
  primary: `linear-gradient(180deg, ${colors.coral[800]} 0%, ${colors.purple[700]} 100%)`,
  
  /** Horizontal variant */
  horizontal: `linear-gradient(90deg, ${colors.coral[800]} 0%, ${colors.purple[700]} 100%)`,
  
  /** Diagonal variant */
  diagonal: `linear-gradient(135deg, ${colors.coral[800]} 0%, ${colors.purple[700]} 100%)`,
  
  /** Text gradient (for display text) */
  text: `linear-gradient(180deg, ${colors.coral[800]} 0%, ${colors.purple[700]} 100%)`,
  
  /** Subtle background gradient */
  subtle: `linear-gradient(180deg, rgba(120, 65, 201, 0.03) 0%, rgba(120, 65, 201, 0.06) 100%)`,
  
  /** Border gradient */
  border: `linear-gradient(180deg, ${colors.coral[800]}, ${colors.purple[700]})`,
  
  /** Glow effects */
  glow: `0 0 20px rgba(255, 97, 80, 0.3), 0 0 40px rgba(120, 65, 201, 0.2)`,
  glowSubtle: `0 0 0 3px rgba(120, 65, 201, 0.15)`,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// AI SPACING (MUI Spacing Units)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * AI spacing tokens in MUI spacing units (1 unit = 8px)
 * Derived from base spacing scale
 */
export const aiSpacing = {
  /** Tight spacing - 4px (0.5 units) */
  xs: spacing[1] / 8,      // 0.5
  /** Small spacing - 8px (1 unit) */
  sm: spacing[2] / 8,      // 1
  /** Medium spacing - 12px (1.5 units) */
  md: spacing[3] / 8,      // 1.5
  /** Default spacing - 16px (2 units) */
  base: spacing[4] / 8,    // 2
  /** Large spacing - 24px (3 units) */
  lg: spacing[6] / 8,      // 3
  /** Extra large spacing - 32px (4 units) */
  xl: spacing[8] / 8,      // 4
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// AI BORDER RADIUS (MUI Spacing Units)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * AI border radius tokens in MUI spacing units
 * Derived from base border radius scale
 */
export const aiRadius = {
  /** Extra small - 4px (1 unit) */
  xs: borderRadius.xs / 4,     // 1
  /** Small - 6px (1.5 units) */
  sm: borderRadius.sm / 4,     // 1.5
  /** Medium - 8px (2 units) */
  md: borderRadius.md / 4,     // 2
  /** Large - 12px (3 units) */
  lg: borderRadius.lg / 4,     // 3
  /** Extra large - 16px (4 units) */
  xl: borderRadius.xl / 4,     // 4
  /** Full pill shape */
  full: borderRadius.full,     // 9999
  /** Circle shape */
  circle: '50%',
} as const;

/**
 * AI border radius in pixels (for direct CSS usage)
 */
export const aiRadiusPx = {
  xs: `${borderRadius.xs}px`,
  sm: `${borderRadius.sm}px`,
  md: `${borderRadius.md}px`,
  lg: `${borderRadius.lg}px`,
  xl: `${borderRadius.xl}px`,
  full: `${borderRadius.full}px`,
  circle: '50%',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// AI COMPONENT-SPECIFIC TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const aiComponents = {
  /** AI Label */
  label: {
    borderRadius: aiRadius.full,
    padding: { x: aiSpacing.sm, y: aiSpacing.xs },
    fontSize: {
      small: '0.75rem',
      medium: '0.875rem',
    },
    iconSize: {
      small: 14,
      medium: 16,
    },
  },
  
  /** AI Avatar */
  avatar: {
    size: {
      small: 32,
      medium: 40,
      large: 48,
    },
    borderRadius: aiRadius.circle,
    gradient: aiGradients.diagonal,
  },
  
  /** AI Chat Message */
  chatMessage: {
    borderRadius: aiRadius.lg,
    padding: aiSpacing.md,
    maxWidth: '80%',
    gap: aiSpacing.sm,
  },
  
  /** AI Chat Input */
  chatInput: {
    borderRadius: aiRadius.lg,
    padding: aiSpacing.md,
    minHeight: 48,
  },
  
  /** AI Source Card */
  sourceCard: {
    borderRadius: aiRadius.md,
    padding: aiSpacing.sm,
    gap: aiSpacing.xs,
  },
  
  /** AI Container */
  container: {
    borderRadius: aiRadius.lg,
    padding: aiSpacing.lg,
    border: aiColors.border.default,
    background: aiColors.background.default,
  },
  
  /** AI Typing Indicator */
  typingIndicator: {
    dotSize: 8,
    gap: aiSpacing.xs,
    animationDuration: '1.4s',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED AI TOKENS EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const aiTokens = {
  colors: aiColors,
  gradients: aiGradients,
  spacing: aiSpacing,
  radius: aiRadius,
  radiusPx: aiRadiusPx,
  components: aiComponents,
} as const;

export type AITokens = typeof aiTokens;

export default aiTokens;
