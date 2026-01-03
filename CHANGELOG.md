# Changelog

All notable changes to the Trinity Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed (Phase 3.3 & 3.4 - Color Token Normalization)

- **Token Architecture Normalization** - Improved internal consistency without breaking changes
  - AI component tokens (`aiHover`, `aiHoverDark`) now reference `baseTokens.colors.indigo` scale
  - Charts sequential palette normalized to `baseTokens.colors.indigo[50-900]`
  - Navigation components (`TopNavHeader`, `TopNavWithSidebar`) inline `#fff` → `brandColors.neutral.white`
  - AI components (6 files) inline `#FFFFFF` → `brandColors.neutral.white`
  - `IllustratedMessage` SVG colors centralized to `illustrationStatusColors` constant

- **Intentional Color Decisions Documented**
  - Charts categorical palette: Intentionally uses full brand spectrum for data visualization distinction
  - DataTable header grays: Tuned for dense tabular readability (NOT from gray scale)
  - Status illustration colors: Tailwind-standard (red-500, amber-500, emerald-500) for universal recognition

### Added
- **Accessibility Utilities** (`@trinity/design-system/accessibility`)
  - `useFocusTrap` - Hook for trapping focus within modal dialogs
  - `useReducedMotion` - Hook to detect user's reduced motion preference
  - `useAriaLive` - Hook for managing ARIA live regions
  - `useRovingTabIndex` - Hook for keyboard navigation in lists
  - `SkipLink` - Component for skip-to-content functionality
  - `VisuallyHidden` - Component for screen reader-only content

- **Enhanced TypeScript Support**
  - Added `TrinityTokens` interface with full token structure
  - Created `useTrinityTokens()` hook for consuming tokens
  - Added CSS variable export via `generateCSSVariables()`
  - New `tokens.ts` module with typed design tokens

- **Modular Component Architecture**
  - Split `AI.tsx` into 9 focused modules under `components/AI/`
  - Split `StatusIndicator.tsx` into 6 focused modules under `components/StatusIndicator/`
  - Created shared navigation utilities under `components/navigation/`

- **Improved Package Exports**
  - Added tree-shaking support with `sideEffects` configuration
  - New subpath exports: `/theme`, `/tokens`, `/components`, `/accessibility`, `/navigation`
  - Individual component exports: `/components/AI`, `/components/StatusIndicator`, `/components/Icon`

- **Testing Infrastructure**
  - Added comprehensive tests for StatusIndicator components
  - Added comprehensive tests for Icon component
  - Added comprehensive tests for IllustratedMessage component
  - Added tests for accessibility utilities

### Changed
- Refactored navigation components to share common hooks and styled components
- Improved TypeScript strictness with proper type definitions
- Enhanced dark mode support with better accessible color combinations

### Fixed
- Fixed `any` type usage in DataTable.stories.tsx
- Fixed `any` type usage in Icons.stories.tsx
- Fixed type errors in AI components (IconName, brandColors references)

## [1.0.0] - 2024-01-XX

### Added
- Initial release of Trinity Design System
- MUI v6/7-based component library
- Light and dark theme support
- Brand colors with accessible combinations
- Core components:
  - `TopNavHeader` - Top navigation header component
  - `TopNavWithSidebar` - Navigation with collapsible sidebar
  - `Layout` - Page layout wrapper
  - `Icon` - Icon wrapper with multiple library support
  - `IllustratedMessage` - Empty states with illustrations
  - `StatusIndicator` - Status display components
  - `AI` - AI-specific UI components
- Storybook documentation with interactive examples
- WCAG 2.1 AA accessibility compliance
- Montserrat typography
- Custom MUI component overrides (buttons, switches, inputs)

### Design Tokens
- Brand colors (Navy, Coral, Teal, White, Grays)
- Accessible color combinations
- Typography scale
- Spacing scale
- Border radius values
- Shadow definitions
- Breakpoints

---

## Migration Guides

For detailed migration instructions, see [MIGRATION.md](./MIGRATION.md).

## Release Types

- **Major (X.0.0)**: Breaking changes requiring code updates
- **Minor (0.X.0)**: New features, backward compatible
- **Patch (0.0.X)**: Bug fixes, backward compatible
