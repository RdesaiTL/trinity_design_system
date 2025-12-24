// ============================================
// TRINITY DESIGN SYSTEM - Main Entry Point
// ============================================

// Export all components
export * from './components';

// Export all tokens
export * from './tokens';

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
