/**
 * AI Design Tokens
 * Consistent spacing, border radius, and color tokens for AI components
 */

import { brandColors } from '../../theme';

// ============================================================================
// AI DESIGN TOKENS - Consistent spacing and border radius
// ============================================================================

/** Standardized border radius values for AI components */
export const aiRadius = {
  /** Extra small radius for tags, badges - 4px */
  xs: 1,
  /** Small radius for chips, small buttons - 6px */
  sm: 1.5,
  /** Medium radius for inputs, small cards - 8px */
  md: 2,
  /** Large radius for cards, containers - 12px */
  lg: 3,
  /** Extra large radius for large cards, modals - 16px */
  xl: 4,
  /** Full pill shape - 9999px */
  full: '9999px',
  /** Circle shape */
  circle: '50%',
} as const;

/** Standardized spacing values for AI components */
export const aiSpacing = {
  /** Tight spacing - 4px */
  xs: 0.5,
  /** Small spacing - 8px */
  sm: 1,
  /** Medium spacing - 12px */
  md: 1.5,
  /** Default spacing - 16px */
  base: 2,
  /** Large spacing - 24px */
  lg: 3,
  /** Extra large spacing - 32px */
  xl: 4,
} as const;

// ============================================================================
// AI THEME TOKENS
// ============================================================================

export const aiTokens = {
  // Gradient colors for AI presence - Coral to Purple (Trinity brand)
  gradient: {
    // Primary gradient: coral/pink at top to purple at bottom
    primary: `linear-gradient(180deg, ${brandColors.secondary.main} 0%, ${brandColors.primary.light} 100%)`,
    // Text gradient for large stats/numbers
    text: `linear-gradient(180deg, ${brandColors.secondary.main} 0%, ${brandColors.primary.light} 100%)`,
    // Subtle background gradient
    subtle: `linear-gradient(180deg, rgba(255, 97, 80, 0.08) 0%, rgba(120, 65, 201, 0.08) 100%)`,
    // Border gradient
    border: `linear-gradient(180deg, ${brandColors.secondary.main}, ${brandColors.primary.light})`,
    // Glow effect
    glow: `0 0 20px rgba(255, 97, 80, 0.3), 0 0 40px rgba(120, 65, 201, 0.2)`,
    // Horizontal variant (left to right)
    horizontal: `linear-gradient(90deg, ${brandColors.secondary.main} 0%, ${brandColors.primary.light} 100%)`,
    // Diagonal variant (top-left to bottom-right)
    diagonal: `linear-gradient(135deg, ${brandColors.secondary.main} 0%, ${brandColors.primary.light} 100%)`,
  },
  // AI-specific colors
  colors: {
    aiPrimary: brandColors.primary.light, // Purple
    aiSecondary: brandColors.secondary.main, // Coral
    aiBackground: 'rgba(120, 65, 201, 0.05)',
    aiBorder: 'rgba(120, 65, 201, 0.2)',
    aiHover: 'rgba(255, 97, 80, 0.1)',
    aiGradientStart: brandColors.secondary.main, // Coral
    aiGradientEnd: brandColors.primary.light, // Purple
  },
  // Standardized spacing and radius
  radius: aiRadius,
  spacing: aiSpacing,
} as const;

export type AIRadius = typeof aiRadius;
export type AISpacing = typeof aiSpacing;
export type AITokens = typeof aiTokens;
