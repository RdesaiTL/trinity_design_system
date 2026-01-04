// ============================================
// TRINITY DESIGN SYSTEM - Main Entry Point
// ============================================

// Export all components
export * from './components';

// Export tokens (excluding AttentionLevel to avoid conflict with hierarchy)
export {
  tokens,
  baseTokens,
  semanticTokens,
  componentTokens,
  darkModeTokens,
  typographicHierarchy,
} from './tokens';
export type {
  TrinityTokens,
  TrinityBaseColors,
  TrinitySpacing,
  TrinityFontSize,
  TrinityFontWeight,
  TrinityLineHeight,
  TrinityLetterSpacing,
  TrinityBorderRadius,
  TrinityBorderWidth,
  TrinityShadows,
  TrinityZIndex,
  TrinityDuration,
  TrinityEasing,
  TrinityOpacity,
  TrinityBreakpoints,
  TrinitySemanticColors,
  TrinitySemanticSpacing,
  TrinitySemanticBorders,
  TrinitySemanticShadows,
  TrinitySemanticMotion,
  TrinityComponentTokens,
  TrinityDarkModeTokens,
} from './tokens';

// Export hierarchy system and utilities (includes AttentionLevel)
export * from './hierarchy';

// Export theme utilities
export {
  // Theme creators
  createTrinityTheme,
  lightTheme,
  darkTheme,
  // CSS Variable utilities
  generateCssVariables,
  generateDarkModeCssVariables,
  injectTrinityCssVariables,
  injectDarkModeCssVariables,
  // Accessibility utilities
  getContrastRatio,
  validateAccessibility,
  // Brand colors and accessible combinations
  brandColors,
  accessibleCombinations,
  // Token access hook
  useTrinityTokens,
} from './theme';

// Export hook types
export type { UseTrinityTokensResult } from './theme';
