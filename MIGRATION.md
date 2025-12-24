# Trinity Design System - Migration Guide

This document outlines breaking changes and migration paths for the Trinity Design System.

## Version 1.1.0

### New Features

#### 1. Comprehensive Token Type System

All token layers now have complete TypeScript interfaces:

```typescript
import type {
  TrinityTokens,
  TrinityBaseTokens,
  TrinitySemanticTokens,
  TrinityComponentTokens,
  TrinityDarkModeTokens,
} from '@trinity/design-system';
```

#### 2. Auto-generated CSS Variables

New utilities to automatically generate CSS custom properties from all tokens:

```typescript
import { 
  generateCssVariables,
  generateDarkModeCssVariables,
  injectTrinityCssVariables,
  injectDarkModeCssVariables 
} from '@trinity/design-system';

// Inject all variables into :root
injectTrinityCssVariables();

// Also inject dark mode variables (responds to prefers-color-scheme)
injectDarkModeCssVariables();
```

Available CSS variables follow the pattern:
- Colors: `--trinity-color-{palette}-{shade}` (e.g., `--trinity-color-navy-900`)
- Spacing: `--trinity-spacing-{size}` (e.g., `--trinity-spacing-4`)
- Font sizes: `--trinity-font-size-{size}` (e.g., `--trinity-font-size-base`)
- Border radius: `--trinity-radius-{size}` (e.g., `--trinity-radius-md`)
- Shadows: `--trinity-shadow-{size}` (e.g., `--trinity-shadow-md`)
- Semantic tokens: `--trinity-semantic-{category}-{name}`
- Component tokens: `--trinity-component-{component}-{property}`

#### 3. useTrinityTokens Hook

New React hook for accessing tokens with theme awareness:

```typescript
import { useTrinityTokens } from '@trinity/design-system';

function MyComponent() {
  const { 
    base,
    semantic,
    component,
    mode,
    isDarkMode,
    spacing,
    spacingCss,
    radius,
    shadow,
    getColor,
    getSemanticColor 
  } = useTrinityTokens();

  return (
    <Box sx={{
      backgroundColor: getColor(
        semantic.colors.background.primary,
        darkMode.colors.background.primary
      ),
      padding: spacingCss(4), // '16px'
      borderRadius: radius('md'), // 6
      boxShadow: shadow('md'),
    }} />
  );
}
```

#### 4. Enhanced Dark Mode Tokens

Dark mode tokens now include complete overrides for:
- Interactive states (hover, active, focus, disabled)
- Status colors (error, warning, success, info)

```typescript
import { darkModeTokens } from '@trinity/design-system';

// New dark mode interactive colors
darkModeTokens.colors.interactive.hover
darkModeTokens.colors.interactive.focus

// New dark mode status colors
darkModeTokens.colors.status.error.text
darkModeTokens.colors.status.error.background
```

### Breaking Changes

#### Token Types

The `TrinityTokens` interface now uses specific types instead of `any`:

**Before:**
```typescript
export interface TrinityTokens {
  base: TrinityBaseTokens;
  semantic: any;
  component: any;
  darkMode: any;
}
```

**After:**
```typescript
export interface TrinityTokens {
  base: TrinityBaseTokens;
  semantic: TrinitySemanticTokens;
  component: TrinityComponentTokens;
  darkMode: TrinityDarkModeTokens;
}
```

**Migration:** Update any code that relied on loose typing of semantic, component, or darkMode tokens.

#### CSS Variable Names

The `injectTrinityCssVariables` function now generates comprehensive CSS variables instead of just a few key ones.

**Before:**
- Limited variables like `--trinity-primary`, `--trinity-spacing-md`

**After:**
- Full variable system: `--trinity-color-navy-900`, `--trinity-spacing-4`, etc.

**Migration:** Update any CSS that referenced the old variable names:

| Old Variable | New Variable |
|-------------|--------------|
| `--trinity-primary` | `--trinity-color-navy-900` |
| `--trinity-secondary` | `--trinity-color-purple-700` |
| `--trinity-coral` | `--trinity-color-coral-800` |
| `--trinity-spacing-md` | `--trinity-spacing-4` |
| `--trinity-radius-lg` | `--trinity-radius-lg` (unchanged) |

### New Exports

The following are now exported from the main entry point:

```typescript
// Types
export type {
  TrinityTokens,
  TrinityBaseTokens,
  TrinitySemanticTokens,
  TrinityComponentTokens,
  TrinityDarkModeTokens,
  TrinityColorShades,
  TrinityBaseColors,
  TrinitySpacing,
  TrinityFontSize,
  TrinityFontWeight,
  TrinityBorderRadius,
  TrinityShadows,
  TrinitySemanticColors,
  TrinityTypographyStyle,
  TrinityButtonTokens,
  TrinityInputTokens,
  TrinityCardTokens,
  TrinityNavigationTokens,
  UseTrinityTokensResult,
};

// Utilities
export {
  generateCssVariables,
  generateDarkModeCssVariables,
  injectTrinityCssVariables,
  injectDarkModeCssVariables,
  useTrinityTokens,
};
```

### Recommended Upgrade Steps

1. **Update imports** to use the new main entry point if needed:
   ```typescript
   // New unified import
   import { tokens, useTrinityTokens, injectTrinityCssVariables } from '@trinity/design-system';
   ```

2. **Update CSS variable references** to use the new naming convention.

3. **Add type annotations** where you were previously using `any` with token objects.

4. **Consider using `useTrinityTokens`** hook for theme-aware token access in React components.

5. **Run tests** to ensure token values haven't changed unexpectedly.

### Deprecations

None in this release.

### Questions or Issues?

If you encounter any issues during migration, please open an issue on the GitHub repository.
