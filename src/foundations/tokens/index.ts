/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TRINITY DESIGN SYSTEM — CANONICAL TOKEN SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This is the single source of truth for all design tokens.
 * 
 * TOKEN HIERARCHY (4-Tier Architecture):
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ Tier 1 — BASE TOKENS (Raw Primitives)                                       │
 * │   Colors, spacing scales, typography primitives, shadows, etc.              │
 * │   NO semantic meaning — just raw values.                                    │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │ Tier 2 — SEMANTIC TOKENS (Intent-Based Aliases)                             │
 * │   Brand colors, text colors, backgrounds, status colors, etc.               │
 * │   Derives ONLY from Tier 1. Maps 1:1 to design intent.                      │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │ Tier 3 — COMPONENT TOKENS (Component-Scoped)                                │
 * │   Button, input, card, modal tokens, etc.                                   │
 * │   Derives from Tier 1 or Tier 2. No raw values.                             │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │ Tier 4 — CONTEXTUAL TOKENS (Mode/State Overrides)                           │
 * │   Dark mode, high contrast, density variations, etc.                        │
 * │   Overrides semantic/component tokens for specific contexts.                │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * RULES:
 * 1. NO magic numbers in component files
 * 2. NO hardcoded hex values outside base.ts
 * 3. Component tokens MUST derive from base or semantic
 * 4. Domain tokens extend this system, never replace it
 * 
 * @module foundations/tokens
 */

// ═══════════════════════════════════════════════════════════════════════════════
// TIER 1 — BASE TOKENS (Raw Primitives)
// ═══════════════════════════════════════════════════════════════════════════════

export {
  // Color palette
  colors,
  
  // Spacing scale
  spacing,
  
  // Typography primitives
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  
  // Border primitives
  borderRadius,
  borderWidth,
  
  // Elevation
  shadows,
  zIndex,
  
  // Motion
  duration,
  easing,
  
  // Miscellaneous
  opacity,
  breakpoints,
} from './base';

// Types
export type { Colors, Spacing, FontSize, BorderRadius, Shadows } from './base';

// ═══════════════════════════════════════════════════════════════════════════════
// TIER 2 — SEMANTIC TOKENS (Intent-Based Aliases)
// ═══════════════════════════════════════════════════════════════════════════════

export {
  // Brand colors
  brand,
  
  // Text colors
  text,
  
  // Background colors
  background,
  
  // Border colors
  border,
  
  // Interactive states
  interactive,
  focusRing,
  
  // Status colors
  status,
  
  // Semantic scales
  space,
  radius,
  shadow,
  motion,
  elevation,
  typography,
} from './semantic';

// Types
export type { Brand, TextColors, BackgroundColors, BorderColors, Status } from './semantic';

// ═══════════════════════════════════════════════════════════════════════════════
// TIER 3 — COMPONENT TOKENS (Component-Scoped)
// ═══════════════════════════════════════════════════════════════════════════════

export {
  button,
  input,
  card,
  modal,
  avatar,
  badge,
  chip,
  tooltip,
  switchToggle,
  navigation,
  toast,
  dropdown,
} from './component';

// Types
export type { ButtonTokens, InputTokens, CardTokens } from './component';

// ═══════════════════════════════════════════════════════════════════════════════
// TIER 4 — CONTEXTUAL TOKENS (Mode/State Overrides)
// ═══════════════════════════════════════════════════════════════════════════════

export {
  darkMode,
  highContrast,
  stateModifiers,
} from './contextual';

// Types
export type { DarkModeTokens, HighContrastTokens } from './contextual';

// ═══════════════════════════════════════════════════════════════════════════════
// DOMAIN TOKENS (Specialized Extensions)
// ═══════════════════════════════════════════════════════════════════════════════

// AI Domain
export {
  aiColors,
  aiGradients,
  aiSpacing,
  aiRadius,
  aiRadiusPx,
  aiComponents,
  aiTokens,
} from './domains/ai';

// Charts Domain
export {
  chartColorsPrimary,
  chartColorsCategorical,
  chartColorsSequential,
  chartColorsDiverging,
  chartColorsStatus,
  chartTypography,
  chartSpacing,
  chartSizing,
  chartGrid,
  chartAxis,
  chartTooltip,
  chartLegend,
  chartAnimation,
  chartAccessibility,
  chartTheme,
  chartTokens,
  getChartColor,
  getChartColors,
} from './domains/charts';

// DataTable Domain
export {
  densityTokens,
  tableColors,
  tableTypography,
  tableLayout,
  tableAnimation,
  tableComponents,
  tableFeatures,
  tableAccessibility,
  dataTableTokens,
  getDensityTokens,
  getTableColors,
} from './domains/datatable';

// Domain types
export type { AITokens } from './domains/ai';
export type { ChartTokens } from './domains/charts';
export type { DataTableTokens, DensityLevel } from './domains/datatable';

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED TOKEN OBJECT (For convenience)
// ═══════════════════════════════════════════════════════════════════════════════

import { colors, spacing, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, borderRadius, borderWidth, shadows, zIndex, duration, easing, opacity, breakpoints } from './base';
import { brand, text, background, border, interactive, focusRing, status, space, radius, shadow, motion, elevation, typography } from './semantic';
import { button, input, card, modal, avatar, badge, chip, tooltip, switchToggle, navigation, toast, dropdown } from './component';
import { darkMode, highContrast, stateModifiers } from './contextual';
import { aiTokens } from './domains/ai';
import { chartTokens } from './domains/charts';
import { dataTableTokens } from './domains/datatable';

/**
 * Complete token system object
 * Use this for programmatic access to all tokens
 */
export const tokens = {
  // Tier 1 - Base
  base: {
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
  },
  
  // Tier 2 - Semantic
  semantic: {
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
  },
  
  // Tier 3 - Component
  component: {
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
  },
  
  // Tier 4 - Contextual
  contextual: {
    darkMode,
    highContrast,
    stateModifiers,
  },
  
  // Domain Extensions
  domains: {
    ai: aiTokens,
    charts: chartTokens,
    dataTable: dataTableTokens,
  },
} as const;

export type Tokens = typeof tokens;

export default tokens;
