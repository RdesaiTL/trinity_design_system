/**
 * DataTable Design Tokens
 * Consistent styling for Trinity DataTable
 */

import { brandColors } from '../../tokens';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type TableDensity = 'compact' | 'standard' | 'comfortable';

// ============================================================================
// DENSITY TOKENS
// ============================================================================

export const densityTokens: Record<TableDensity, {
  rowHeight: number;
  headerHeight: number;
  fontSize: number;
  padding: string;
  cellPaddingY: number;
  avatarSize: number;
  avatarFontSize: number;
  chipHeight: number;
  iconSize: number;
  progressWidth: number;
}> = {
  compact: {
    rowHeight: 48,
    headerHeight: 44,
    fontSize: 12,
    padding: '6px 8px',
    cellPaddingY: 6,
    avatarSize: 28,
    avatarFontSize: 11,
    chipHeight: 22,
    iconSize: 14,
    progressWidth: 80,
  },
  standard: {
    rowHeight: 52,
    headerHeight: 56,
    fontSize: 14,
    padding: '8px 16px',
    cellPaddingY: 8,
    avatarSize: 32,
    avatarFontSize: 12,
    chipHeight: 24,
    iconSize: 16,
    progressWidth: 100,
  },
  comfortable: {
    rowHeight: 68,
    headerHeight: 64,
    fontSize: 14,
    padding: '12px 16px',
    cellPaddingY: 12,
    avatarSize: 40,
    avatarFontSize: 14,
    chipHeight: 28,
    iconSize: 18,
    progressWidth: 120,
  },
};

// ============================================================================
// COLOR TOKENS - Light and Dark mode
// ============================================================================

/**
 * NOTE:
 * Header background and border grays intentionally differ
 * from baseTokens.gray scale.
 *
 * These values are tuned for dense tabular readability and
 * preserve historical visual parity.
 *
 * Do not normalize unless approved as a visual change.
 */
export const tableColors = {
  light: {
    headerBg: '#F3F4F6',
    headerText: brandColors.neutral.gray600,
    headerBorder: '#D1D5DB',
    background: brandColors.neutral.white,
    alternateRow: brandColors.neutral.lightGray,
    hover: brandColors.neutral.gray100,
    selected: `${brandColors.primary.light}14`,
    borderColor: brandColors.neutral.gray100,
    text: brandColors.neutral.gray600,
    textSecondary: brandColors.neutral.gray500,
  },
  dark: {
    headerBg: '#3F3F46',
    headerText: brandColors.neutral.white,
    headerBorder: '#52525B',
    background: brandColors.neutral.darkBg,
    alternateRow: brandColors.neutral.darkPaper,
    hover: 'rgba(255, 255, 255, 0.05)',
    selected: `${brandColors.primary.light}24`,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    text: brandColors.neutral.white,
    textSecondary: brandColors.neutral.gray400,
  },
};

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const tableTypography = {
  fontFamily: '"Montserrat", sans-serif',
  headerWeight: 600,
  cellWeight: 400,
  header: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.01em',
    textTransform: 'none' as const,
  },
  cell: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  cellSecondary: {
    fontSize: 12,
    fontWeight: 400,
    color: brandColors.neutral.gray500,
  },
  footer: {
    fontSize: 13,
    fontWeight: 500,
  },
};

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const tableSpacing = {
  cellPaddingX: 16,
  cellPaddingY: 8,
  headerPaddingX: 16,
  headerPaddingY: 12,
  toolbarPadding: 16,
  actionGap: 8,
};

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export const tableAnimation = {
  duration: 200,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  hover: 'background-color 0.15s ease',
};

// ============================================================================
// BORDER TOKENS
// ============================================================================

export const tableBorders = {
  radius: 8,
  width: 1,
  style: 'solid',
};

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const tableShadows = {
  default: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
  hover: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  elevated: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  card: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
};

// ============================================================================
// STATUS BADGE TOKENS
// ============================================================================

export const statusBadgeTokens: Record<'success' | 'warning' | 'error' | 'info' | 'default', {
  background: string;
  text: string;
  border: string;
}> = {
  success: {
    background: '#DCFCE7',
    text: '#166534',
    border: '#86EFAC',
  },
  warning: {
    background: '#FEF3C7',
    text: '#92400E',
    border: '#FCD34D',
  },
  error: {
    background: '#FEE2E2',
    text: '#991B1B',
    border: '#FCA5A5',
  },
  info: {
    background: '#DBEAFE',
    text: '#1E40AF',
    border: '#93C5FD',
  },
  default: {
    background: brandColors.neutral.gray100,
    text: brandColors.neutral.gray600,
    border: brandColors.neutral.gray400,
  },
};

// ============================================================================
// THEME PRESETS
// ============================================================================

export const tableTheme = {
  light: {
    background: brandColors.neutral.white,
    headerBg: brandColors.neutral.lightGray,
    rowBackground: brandColors.neutral.white,
    rowBackgroundAlt: brandColors.neutral.lightGray,
    rowHover: brandColors.neutral.gray100,
    rowSelected: `${brandColors.primary.light}14`,
    border: brandColors.neutral.gray100,
    text: brandColors.neutral.gray600,
    textSecondary: brandColors.neutral.gray500,
  },
  dark: {
    background: brandColors.neutral.darkBg,
    headerBg: brandColors.neutral.darkPaper,
    rowBackground: brandColors.neutral.darkBg,
    rowBackgroundAlt: brandColors.neutral.darkPaper,
    rowHover: 'rgba(255, 255, 255, 0.05)',
    rowSelected: `${brandColors.primary.light}24`,
    border: 'rgba(255, 255, 255, 0.12)',
    text: brandColors.neutral.white,
    textSecondary: brandColors.neutral.gray400,
  },
};
