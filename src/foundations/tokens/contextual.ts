/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TIER 4: CONTEXTUAL TOKENS (Mode/State Overrides)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Theme-aware and state-aware token overrides.
 * These modify base/semantic tokens for specific contexts like dark mode.
 * 
 * Rules:
 * - Override ONLY what changes in context
 * - Derive from base tokens
 * - Maintain same token structure as semantic tokens for easy swapping
 * 
 * @module foundations/tokens/contextual
 */

import { colors, opacity } from './base';

// ═══════════════════════════════════════════════════════════════════════════════
// DARK MODE OVERRIDES
// ═══════════════════════════════════════════════════════════════════════════════

export const darkMode = {
  // ─────────────────────────────────────────────────────────────────────────────
  // Text Colors (Dark Mode)
  // ─────────────────────────────────────────────────────────────────────────────
  text: {
    primary: colors.gray[50],
    secondary: colors.gray[400],
    tertiary: colors.gray[500],
    disabled: colors.gray[600],
    inverse: colors.gray[900],
    brand: colors.coral[400],
    link: colors.azure[400],
    linkHover: colors.azure[300],
    error: colors.status.error[300],
    success: colors.status.success[300],
    warning: colors.status.warning[300],
    info: colors.status.info[300],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Background Colors (Dark Mode)
  // ─────────────────────────────────────────────────────────────────────────────
  background: {
    primary: colors.gray[900],
    secondary: colors.gray[800],
    tertiary: colors.gray[700],
    inverse: colors.gray[50],
    brand: colors.navy[900],
    brandSubtle: colors.navy[800],
    accent: colors.coral[700],
    accentSubtle: 'rgba(255, 97, 80, 0.15)',
    elevated: colors.gray[800],
    sunken: colors.gray[900],
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Border Colors (Dark Mode)
  // ─────────────────────────────────────────────────────────────────────────────
  border: {
    default: colors.gray[700],
    subtle: colors.gray[800],
    strong: colors.gray[600],
    focus: colors.purple[400],
    error: colors.status.error[400],
    success: colors.status.success[400],
    warning: colors.status.warning[400],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Interactive Colors (Dark Mode)
  // ─────────────────────────────────────────────────────────────────────────────
  interactive: {
    default: colors.purple[400],
    hover: colors.coral[500],
    active: colors.indigo[400],
    disabled: colors.gray[600],
    focus: colors.purple[400],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Status Colors (Dark Mode)
  // ─────────────────────────────────────────────────────────────────────────────
  status: {
    error: {
      text: colors.status.error[300],
      background: colors.status.error[900],
      border: colors.status.error[700],
      backgroundStrong: 'rgba(239, 68, 68, 0.2)',
    },
    warning: {
      text: colors.status.warning[300],
      background: colors.status.warning[900],
      border: colors.status.warning[700],
      backgroundStrong: 'rgba(245, 158, 11, 0.2)',
    },
    success: {
      text: colors.status.success[300],
      background: colors.status.success[900],
      border: colors.status.success[700],
      backgroundStrong: 'rgba(34, 197, 94, 0.2)',
    },
    info: {
      text: colors.status.info[300],
      background: colors.status.info[900],
      border: colors.status.info[700],
      backgroundStrong: 'rgba(59, 130, 246, 0.2)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Shadow Overrides (Dark Mode - more subtle)
  // ─────────────────────────────────────────────────────────────────────────────
  shadow: {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
    cardHover: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
    dropdown: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
    modal: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
    floating: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// HIGH CONTRAST MODE (Accessibility)
// ═══════════════════════════════════════════════════════════════════════════════

export const highContrast = {
  text: {
    primary: colors.gray[900],
    secondary: colors.gray[800],
    tertiary: colors.gray[700],
  },
  background: {
    primary: colors.gray[0],
    secondary: colors.gray[0],
    elevated: colors.gray[0],
  },
  border: {
    default: colors.gray[900],
    subtle: colors.gray[700],
    strong: colors.gray[900],
    focus: colors.gray[900],
  },
  focusRing: {
    width: 3,
    color: colors.gray[900],
    offset: colors.gray[0],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// STATE MODIFIERS
// ═══════════════════════════════════════════════════════════════════════════════

export const stateModifiers = {
  /** Hover state opacity/color shifts */
  hover: {
    opacity: opacity[90],
    backgroundShift: 0.05,  // Darken by 5%
  },
  /** Active/pressed state */
  active: {
    opacity: opacity[80],
    scale: 0.98,
  },
  /** Disabled state */
  disabled: {
    opacity: opacity[50],
    cursor: 'not-allowed',
  },
  /** Focus state */
  focus: {
    ringWidth: 2,
    ringOffset: 2,
  },
  /** Loading state */
  loading: {
    opacity: opacity[70],
    cursor: 'wait',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED CONTEXTUAL TOKENS EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const contextualTokens = {
  darkMode,
  highContrast,
  stateModifiers,
} as const;

export type ContextualTokens = typeof contextualTokens;

export default contextualTokens;
