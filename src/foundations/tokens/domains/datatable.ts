/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * DOMAIN TOKENS: DataTable
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * DataTable-specific tokens that extend the canonical token system.
 * ALL values derive from base/semantic tokens — NO raw values allowed.
 * 
 * @module foundations/tokens/domains/datatable
 */

import { colors, spacing, fontSize, fontWeight, borderRadius, duration, easing } from '../base';
import { brand, text, background, border, interactive } from '../semantic';
import { darkMode } from '../contextual';

// ═══════════════════════════════════════════════════════════════════════════════
// DENSITY CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Density tokens control the visual compactness of table rows.
 * All values derive from the base spacing scale.
 */
export const densityTokens = {
  compact: {
    rowHeight: 36,
    cellPadding: {
      vertical: spacing[1],    // 4px
      horizontal: spacing[2],  // 8px
    },
    fontSize: fontSize.xs,     // 12px
    iconSize: 16,
  },
  standard: {
    rowHeight: 48,
    cellPadding: {
      vertical: spacing[3],    // 12px
      horizontal: spacing[4],  // 16px
    },
    fontSize: fontSize.sm,     // 14px
    iconSize: 20,
  },
  comfortable: {
    rowHeight: 64,
    cellPadding: {
      vertical: spacing[4],    // 16px
      horizontal: spacing[5],  // 20px
    },
    fontSize: fontSize.base,   // 16px
    iconSize: 24,
  },
} as const;

export type DensityLevel = keyof typeof densityTokens;

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE COLOR THEMES
// ═══════════════════════════════════════════════════════════════════════════════

export const tableColors = {
  light: {
    background: {
      default: background.primary,
      header: colors.gray[50],
      row: background.primary,
      rowAlt: colors.gray[50],
      rowHover: colors.gray[100],
      rowSelected: colors.purple[50],
      rowSelectedHover: colors.purple[100],
    },
    text: {
      primary: text.primary,
      secondary: text.secondary,
      header: text.primary,
    },
    border: {
      default: border.default,
      light: colors.gray[100],
      header: colors.gray[300],
    },
    interactive: {
      sortIcon: colors.gray[400],
      sortIconActive: brand.primary,
      checkbox: brand.primary,
      link: interactive.linkDefault,
      linkHover: interactive.linkHover,
    },
    status: {
      success: colors.status.success[100],
      warning: colors.status.warning[100],
      error: colors.status.error[100],
      info: colors.status.info[100],
    },
  },
  dark: {
    background: {
      default: darkMode.background.primary,
      header: colors.gray[800],
      row: darkMode.background.primary,
      rowAlt: colors.gray[850],
      rowHover: colors.gray[700],
      rowSelected: 'rgba(120, 65, 201, 0.2)',
      rowSelectedHover: 'rgba(120, 65, 201, 0.3)',
    },
    text: {
      primary: darkMode.text.primary,
      secondary: darkMode.text.secondary,
      header: darkMode.text.primary,
    },
    border: {
      default: darkMode.border.default,
      light: colors.gray[700],
      header: colors.gray[600],
    },
    interactive: {
      sortIcon: colors.gray[500],
      sortIconActive: colors.purple[400],
      checkbox: colors.purple[400],
      link: colors.purple[400],
      linkHover: colors.purple[300],
    },
    status: {
      success: 'rgba(76, 175, 80, 0.2)',
      warning: 'rgba(255, 152, 0, 0.2)',
      error: 'rgba(244, 67, 54, 0.2)',
      info: 'rgba(33, 150, 243, 0.2)',
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════════════════

export const tableTypography = {
  header: {
    fontSize: fontSize.xs,       // 12px
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  cell: {
    fontSize: fontSize.sm,       // 14px
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: fontSize.sm,       // 14px
    fontWeight: fontWeight.regular,
    color: text.secondary,
  },
  pagination: {
    fontSize: fontSize.sm,       // 14px
    fontWeight: fontWeight.medium,
  },
  empty: {
    fontSize: fontSize.base,     // 16px
    fontWeight: fontWeight.medium,
    color: text.secondary,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE LAYOUT
// ═══════════════════════════════════════════════════════════════════════════════

export const tableLayout = {
  borderRadius: borderRadius.lg,
  borderWidth: 1,
  headerBorderWidth: 2,
  
  minColumnWidth: 80,
  maxColumnWidth: 400,
  defaultColumnWidth: 150,
  
  stickyHeaderZIndex: 2,
  stickyColumnZIndex: 1,
  
  scrollbarWidth: 8,
  scrollbarThumbRadius: borderRadius.xs,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE ANIMATION
// ═══════════════════════════════════════════════════════════════════════════════

export const tableAnimation = {
  rowTransition: `background-color ${duration.fast}ms ${easing.out}`,
  sortTransition: `transform ${duration.fast}ms ${easing.out}`,
  expandTransition: `height ${duration.normal}ms ${easing.inOut}`,
  fadeTransition: `opacity ${duration.fast}ms ${easing.out}`,
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

export const tableComponents = {
  checkbox: {
    size: 20,
    borderRadius: borderRadius.xs,
    checkedColor: brand.primary,
    uncheckedColor: colors.gray[400],
    indeterminateColor: brand.primary,
  },
  sortIndicator: {
    size: 18,
    activeColor: brand.primary,
    inactiveColor: colors.gray[400],
    transition: tableAnimation.sortTransition,
  },
  expandIcon: {
    size: 24,
    color: colors.gray[500],
    hoverColor: colors.gray[700],
    transition: tableAnimation.sortTransition,
  },
  pagination: {
    buttonSize: 32,
    buttonBorderRadius: borderRadius.sm,
    pageInputWidth: 48,
    gap: spacing[2],
  },
  toolbar: {
    height: 56,
    padding: spacing[4],
    gap: spacing[3],
    background: background.secondary,
    borderRadius: `${borderRadius.lg}px ${borderRadius.lg}px 0 0`,
  },
  emptyState: {
    iconSize: 48,
    iconColor: colors.gray[400],
    padding: spacing[8],
  },
  loadingOverlay: {
    background: 'rgba(255, 255, 255, 0.7)',
    darkBackground: 'rgba(0, 0, 0, 0.7)',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE FEATURE TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

export const tableFeatures = {
  selection: {
    checkboxColumnWidth: 48,
    selectedBorderColor: brand.primary,
    selectedBorderWidth: 2,
  },
  resizing: {
    handleWidth: 8,
    handleColor: 'transparent',
    handleHoverColor: brand.primary,
    minColumnWidth: 50,
  },
  reordering: {
    dragOpacity: 0.8,
    dropIndicatorColor: brand.primary,
    dropIndicatorWidth: 2,
  },
  filtering: {
    inputHeight: 32,
    inputBorderRadius: borderRadius.sm,
    chipHeight: 24,
    chipBorderRadius: borderRadius.full,
  },
  grouping: {
    indentWidth: spacing[6],
    expandIconSize: 20,
    groupRowBackground: colors.gray[100],
    groupRowBackgroundDark: colors.gray[800],
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE ACCESSIBILITY
// ═══════════════════════════════════════════════════════════════════════════════

export const tableAccessibility = {
  focusRing: {
    color: brand.secondary,
    width: 2,
    offset: -2,
    style: 'solid',
  },
  keyboardNav: {
    cellFocusBackground: colors.purple[50],
    cellFocusBorder: brand.primary,
  },
  ariaLabels: {
    sortAscending: 'Sorted ascending',
    sortDescending: 'Sorted descending',
    sortNone: 'Not sorted',
    selectAll: 'Select all rows',
    selectRow: 'Select row',
    expandRow: 'Expand row',
    collapseRow: 'Collapse row',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED DATATABLE TOKENS EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const dataTableTokens = {
  density: densityTokens,
  colors: tableColors,
  typography: tableTypography,
  layout: tableLayout,
  animation: tableAnimation,
  components: tableComponents,
  features: tableFeatures,
  accessibility: tableAccessibility,
} as const;

export type DataTableTokens = typeof dataTableTokens;

/**
 * Get density configuration by level
 */
export const getDensityTokens = (level: DensityLevel) => densityTokens[level];

/**
 * Get color tokens by theme
 */
export const getTableColors = (theme: 'light' | 'dark') => tableColors[theme];

export default dataTableTokens;
