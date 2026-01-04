
import { createTheme } from '@mui/material/styles';
import { 
  TrinityTokens, 
  baseTokens, 
  semanticTokens, 
  componentTokens, 
  darkModeTokens, 
  tokens,
  typographicHierarchy,
} from './tokens';

// ============================================
// CSS VARIABLE GENERATION
// ============================================

/**
 * Generate CSS variable name from token path
 */
function toVarName(...parts: (string | number)[]): string {
  return `--trinity-${parts.join('-').replace(/([A-Z])/g, '-$1').toLowerCase()}`;
}

/**
 * Recursively flatten tokens into CSS variable entries
 */
function flattenTokens(
  obj: Record<string, unknown>,
  prefix: string[] = []
): Array<{ name: string; value: string }> {
  const entries: Array<{ name: string; value: string }> = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = [...prefix, key];
    
    if (value === null || value === undefined) continue;
    
    if (typeof value === 'object' && !Array.isArray(value)) {
      entries.push(...flattenTokens(value as Record<string, unknown>, path));
    } else {
      const cssValue = typeof value === 'number' && !key.includes('opacity') && !key.includes('weight') && !key.includes('Height')
        ? `${value}px`
        : String(value);
      entries.push({ name: toVarName(...path), value: cssValue });
    }
  }

  return entries;
}

/**
 * Generate all CSS custom properties from tokens
 * Returns a CSS string that can be injected into :root
 */
export function generateCssVariables(tokenSet: TrinityTokens = tokens): string {
  const allVariables: Array<{ name: string; value: string }> = [];

  // Base tokens
  allVariables.push(...flattenTokens(tokenSet.base.colors, ['color']));
  allVariables.push(...flattenTokens(tokenSet.base.spacing, ['spacing']));
  allVariables.push(...flattenTokens(tokenSet.base.fontSize, ['font-size']));
  allVariables.push(...flattenTokens(tokenSet.base.fontWeight, ['font-weight']));
  allVariables.push(...flattenTokens(tokenSet.base.lineHeight, ['line-height']));
  allVariables.push(...flattenTokens(tokenSet.base.letterSpacing, ['letter-spacing']));
  allVariables.push(...flattenTokens(tokenSet.base.borderRadius, ['radius']));
  allVariables.push(...flattenTokens(tokenSet.base.borderWidth, ['border-width']));
  allVariables.push(...flattenTokens(tokenSet.base.shadows, ['shadow']));
  allVariables.push(...flattenTokens(tokenSet.base.zIndex, ['z-index']));
  allVariables.push(...flattenTokens(tokenSet.base.duration, ['duration']));
  allVariables.push(...flattenTokens(tokenSet.base.easing, ['easing']));
  allVariables.push(...flattenTokens(tokenSet.base.opacity, ['opacity']));
  allVariables.push(...flattenTokens(tokenSet.base.breakpoints, ['breakpoint']));

  // Semantic tokens
  allVariables.push(...flattenTokens(tokenSet.semantic.colors, ['semantic']));
  allVariables.push(...flattenTokens(tokenSet.semantic.spacing, ['semantic-spacing']));
  allVariables.push(...flattenTokens(tokenSet.semantic.borders, ['semantic-border']));
  allVariables.push(...flattenTokens(tokenSet.semantic.shadows, ['semantic-shadow']));
  allVariables.push(...flattenTokens(tokenSet.semantic.motion, ['motion']));

  // Component tokens
  allVariables.push(...flattenTokens(tokenSet.component, ['component']));

  return allVariables.map(v => `  ${v.name}: ${v.value};`).join('\n');
}

/**
 * Generate CSS variables string for dark mode overrides
 */
export function generateDarkModeCssVariables(tokenSet: TrinityTokens = tokens): string {
  const variables: Array<{ name: string; value: string }> = [];
  
  variables.push(...flattenTokens(tokenSet.darkMode.colors.text, ['semantic', 'text']));
  variables.push(...flattenTokens(tokenSet.darkMode.colors.background, ['semantic', 'background']));
  variables.push(...flattenTokens(tokenSet.darkMode.colors.border, ['semantic', 'border']));
  
  if (tokenSet.darkMode.colors.interactive) {
    variables.push(...flattenTokens(tokenSet.darkMode.colors.interactive, ['semantic', 'interactive']));
  }
  
  if (tokenSet.darkMode.colors.status) {
    variables.push(...flattenTokens(tokenSet.darkMode.colors.status, ['semantic', 'status']));
  }

  return variables.map(v => `  ${v.name}: ${v.value};`).join('\n');
}

/**
 * Returns a set of CSS custom properties for key Trinity tokens.
 * Call this at runtime to inject variables into :root.
 */
export function injectTrinityCssVariables(tokenSet: TrinityTokens = tokens) {
  if (typeof window === 'undefined') return;
  const _root = document.documentElement;
  
  // Generate and inject all CSS variables
  const cssVars = generateCssVariables(tokenSet);
  const styleEl = document.createElement('style');
  styleEl.id = 'trinity-css-variables';
  styleEl.textContent = `:root {\n${cssVars}\n}`;
  
  // Remove existing if present
  const existing = document.getElementById('trinity-css-variables');
  if (existing) existing.remove();
  
  document.head.appendChild(styleEl);
}

/**
 * Inject dark mode CSS variables 
 * Adds a style block that applies dark mode overrides when [data-theme="dark"] or .dark-mode is present
 */
export function injectDarkModeCssVariables(tokenSet: TrinityTokens = tokens) {
  if (typeof window === 'undefined') return;
  
  const darkVars = generateDarkModeCssVariables(tokenSet);
  const styleEl = document.createElement('style');
  styleEl.id = 'trinity-dark-mode-variables';
  styleEl.textContent = `
[data-theme="dark"],
.dark-mode,
:root.dark {
${darkVars}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${darkVars}
  }
}`;
  
  // Remove existing if present
  const existing = document.getElementById('trinity-dark-mode-variables');
  if (existing) existing.remove();
  
  document.head.appendChild(styleEl);
}

/**
 * Calculate contrast ratio between two hex colors (WCAG 2.1)
 * @param fg - Foreground color (hex)
 * @param bg - Background color (hex)
 * @returns Contrast ratio (number)
 */
export function getContrastRatio(fg: string, bg: string): number {
  function hexToRgb(hex: string) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const n = parseInt(c, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function luminance([r, g, b]: number[]) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  const L1 = luminance(hexToRgb(fg));
  const L2 = luminance(hexToRgb(bg));
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

/**
 * Validate accessible color pairs and warn if not WCAG AA compliant.
 * @param fg - Foreground color (hex)
 * @param bg - Background color (hex)
 * @param minRatio - Minimum contrast ratio (default 4.5)
 */
export function validateAccessibility(fg: string, bg: string, minRatio = 4.5): boolean {
  const ratio = getContrastRatio(fg, bg);
  if (ratio < minRatio && typeof window !== 'undefined') {
     
    console.warn(`[Trinity] Low contrast ratio ${ratio.toFixed(2)} for ${fg} on ${bg}`);
  }
  return ratio >= minRatio;
}

/**
 * Shared MUI component overrides for both light and dark themes.
 * Uses tokens for border radius, spacing, etc.
 */
function getSharedComponentOverrides(tokenSet: TrinityTokens = tokens, mode: 'light' | 'dark' = 'light') {
  // Border colors for cards/paper based on mode
  const borderColor = mode === 'dark' 
    ? `rgba(255, 255, 255, 0.12)` 
    : tokenSet.base.colors.gray[200];
  const borderColorStrong = mode === 'dark'
    ? `rgba(255, 255, 255, 0.2)`
    : tokenSet.base.colors.gray[300];
  
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'dark' ? tokenSet.base.colors.gray[800] : tokenSet.base.colors.gray[50],
          color: mode === 'dark' ? tokenSet.base.colors.gray[50] : tokenSet.base.colors.gray[900],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: `${tokenSet.base.spacing[2]}px ${tokenSet.base.spacing[5]}px`,
          borderRadius: tokenSet.base.borderRadius.full,
          fontWeight: tokenSet.base.fontWeight.semibold,
        },
        // Text buttons (default variant)
        text: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[100] : tokenSet.base.colors.navy[900],
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(5, 7, 66, 0.08)',
          },
        },
        textPrimary: {
          color: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 97, 80, 0.12)' 
              : 'rgba(5, 7, 66, 0.08)',
          },
        },
        textSecondary: {
          color: mode === 'dark' ? tokenSet.base.colors.purple[400] : tokenSet.base.colors.coral[800],
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(120, 65, 201, 0.12)' 
              : 'rgba(255, 97, 80, 0.08)',
          },
        },
        // Contained buttons
        contained: {
          color: tokenSet.base.colors.gray[0],
        },
        containedPrimary: {
          backgroundColor: tokenSet.base.colors.navy[900],
          color: tokenSet.base.colors.gray[0],
          '&:hover': {
            backgroundColor: tokenSet.base.colors.coral[800],
          },
        },
        containedSecondary: {
          backgroundColor: tokenSet.base.colors.indigo[900],
          color: tokenSet.base.colors.gray[0],
          '&:hover': {
            backgroundColor: tokenSet.base.colors.coral[800],
            color: tokenSet.base.colors.gray[0],
          },
        },
        // Outlined buttons
        outlined: {
          borderColor: tokenSet.base.colors.navy[900],
          color: tokenSet.base.colors.navy[900],
          borderWidth: 2,
          '&:hover': {
            backgroundColor: tokenSet.base.colors.coral[800],
            borderColor: tokenSet.base.colors.coral[800],
            color: tokenSet.base.colors.gray[0],
            borderWidth: 2,
          },
        },
        outlinedPrimary: {
          borderColor: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
          color: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
        },
        // Size variants
        sizeSmall: {
          padding: `${tokenSet.base.spacing[1]}px ${tokenSet.base.spacing[3]}px`,
          fontSize: tokenSet.base.fontSize.sm,
        },
        sizeLarge: {
          padding: `${tokenSet.base.spacing[3]}px ${tokenSet.base.spacing[6]}px`,
          fontSize: tokenSet.base.fontSize.lg,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: tokenSet.base.borderRadius.lg,
          border: `1px solid ${borderColor}`,
          boxShadow: mode === 'dark' 
            ? '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)'
            : '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
          transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
          '&:hover': {
            boxShadow: mode === 'dark'
              ? '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)'
              : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: tokenSet.base.borderRadius.md,
          border: `1px solid ${borderColor}`,
          boxShadow: mode === 'dark'
            ? '0 1px 2px 0 rgb(0 0 0 / 0.2)'
            : '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
        rounded: {
          borderRadius: tokenSet.base.borderRadius.md,
        },
        elevation0: {
          border: `1px solid ${borderColor}`,
          boxShadow: mode === 'dark'
            ? '0 1px 2px 0 rgb(0 0 0 / 0.2)'
            : '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
        elevation1: {
          border: `1px solid ${borderColor}`,
          boxShadow: mode === 'dark'
            ? '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)'
            : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
        elevation2: {
          border: `1px solid ${borderColor}`,
          boxShadow: mode === 'dark'
            ? '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)'
            : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
        elevation3: {
          border: `1px solid ${borderColor}`,
          boxShadow: mode === 'dark'
            ? '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)'
            : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        },
        outlined: {
          border: `1px solid ${borderColorStrong}`,
          boxShadow: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[300] : tokenSet.base.colors.gray[600],
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.04)',
          },
        },
        colorPrimary: {
          color: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
        },
        colorSecondary: {
          color: mode === 'dark' ? tokenSet.base.colors.purple[400] : tokenSet.base.colors.coral[800],
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: tokenSet.base.spacing[4],
          paddingTop: tokenSet.base.spacing[2],
          gap: tokenSet.base.spacing[2],
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: tokenSet.base.borderRadius.xl, // 16px for dialogs - allows nested cards with lg:12px
          border: `1px solid ${borderColor}`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: tokenSet.base.borderRadius.sm, // 6px for alert feedback elements
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
          textDecorationColor: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
          '&:hover': {
            color: mode === 'dark' ? tokenSet.base.colors.coral[300] : tokenSet.base.colors.coral[800],
            textDecorationColor: mode === 'dark' ? tokenSet.base.colors.coral[300] : tokenSet.base.colors.coral[800],
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokenSet.base.borderRadius.sm, // 6px for chip elements
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[400] : tokenSet.base.colors.gray[600],
          '&.Mui-focused': {
            color: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-sizeSmall': {
            borderRadius: tokenSet.base.borderRadius.sm, // 6px for small inputs
          },
          '& .MuiInputBase-input': {
            color: mode === 'dark' ? tokenSet.base.colors.gray[50] : tokenSet.base.colors.gray[900],
          },
          '& .MuiInputBase-input::placeholder': {
            color: mode === 'dark' ? tokenSet.base.colors.gray[500] : tokenSet.base.colors.gray[400],
            opacity: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-sizeSmall': {
            borderRadius: tokenSet.base.borderRadius.sm, // 6px for small inputs
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : tokenSet.base.colors.gray[300],
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : tokenSet.base.colors.gray[400],
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
          },
        },
        input: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[50] : tokenSet.base.colors.gray[900],
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.09)' : 'rgba(0, 0, 0, 0.06)',
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.13)' : 'rgba(0, 0, 0, 0.09)',
          },
          '&.Mui-focused': {
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.09)' : 'rgba(0, 0, 0, 0.06)',
          },
        },
        input: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[50] : tokenSet.base.colors.gray[900],
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[400] : tokenSet.base.colors.gray[600],
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-sizeSmall': {
            borderRadius: tokenSet.base.borderRadius.sm, // 6px for small inputs
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-sizeSmall': {
            borderRadius: tokenSet.base.borderRadius.sm, // 6px for small inputs
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.MuiSlider-sizeSmall': {
            '& .MuiSlider-thumb': {
              borderRadius: tokenSet.base.borderRadius.full, // Circular thumbs
            },
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          backgroundColor: 'transparent',
          '&:first-of-type': {
            borderTopLeftRadius: tokenSet.base.borderRadius.lg, // 12px for accordion container
            borderTopRightRadius: tokenSet.base.borderRadius.lg,
          },
          '&:last-of-type': {
            borderBottomLeftRadius: tokenSet.base.borderRadius.lg,
            borderBottomRightRadius: tokenSet.base.borderRadius.lg,
          },
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 48,
          borderBottom: `1px solid ${tokenSet.base.colors.gray[100]}`,
          '&.Mui-expanded': {
            minHeight: 48,
          },
        },
        content: {
          margin: '12px 0',
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
      },
    },
    // ============================================
    // TABLE COMPONENTS
    // ============================================
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate' as const,
          borderSpacing: 0,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)' 
            : tokenSet.base.colors.gray[50],
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
          '&.Mui-selected': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 97, 80, 0.08)' 
              : 'rgba(5, 7, 66, 0.04)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 97, 80, 0.12)' 
              : 'rgba(5, 7, 66, 0.08)',
          },
        },
        hover: {
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.04)' 
              : 'rgba(0, 0, 0, 0.02)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${borderColor}`,
          padding: `${tokenSet.base.spacing[3]}px ${tokenSet.base.spacing[4]}px`,
        },
        head: {
          fontWeight: tokenSet.base.fontWeight.semibold,
          color: mode === 'dark' ? tokenSet.base.colors.gray[300] : tokenSet.base.colors.gray[700],
          fontSize: tokenSet.base.fontSize.sm,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
        body: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[100] : tokenSet.base.colors.gray[900],
        },
        sizeSmall: {
          padding: `${tokenSet.base.spacing[2]}px ${tokenSet.base.spacing[3]}px`,
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[300] : tokenSet.base.colors.gray[700],
          '&:hover': {
            color: mode === 'dark' ? tokenSet.base.colors.gray[100] : tokenSet.base.colors.gray[900],
          },
          '&.Mui-active': {
            color: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
          },
        },
        icon: {
          color: 'inherit !important',
        },
      },
    },
    // ============================================
    // MENU / DROPDOWN COMPONENTS
    // ============================================
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: tokenSet.base.borderRadius.md,
          boxShadow: mode === 'dark'
            ? '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)'
            : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          border: `1px solid ${borderColor}`,
          marginTop: tokenSet.base.spacing[1],
        },
        list: {
          padding: tokenSet.base.spacing[1],
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: tokenSet.base.borderRadius.sm,
          margin: `0 ${tokenSet.base.spacing[1]}px`,
          padding: `${tokenSet.base.spacing[2]}px ${tokenSet.base.spacing[3]}px`,
          fontSize: tokenSet.base.fontSize.sm,
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.04)',
          },
          '&.Mui-selected': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 97, 80, 0.12)' 
              : 'rgba(5, 7, 66, 0.08)',
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? 'rgba(255, 97, 80, 0.16)' 
                : 'rgba(5, 7, 66, 0.12)',
            },
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: tokenSet.base.borderRadius.md,
          boxShadow: mode === 'dark'
            ? '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)'
            : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          border: `1px solid ${borderColor}`,
        },
      },
    },
    // ============================================
    // LIST COMPONENTS
    // ============================================
    MuiList: {
      styleOverrides: {
        root: {
          padding: tokenSet.base.spacing[1],
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: tokenSet.base.borderRadius.sm,
          marginBottom: tokenSet.base.spacing[1],
          '&:last-child': {
            marginBottom: 0,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: tokenSet.base.borderRadius.sm,
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.04)',
          },
          '&.Mui-selected': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 97, 80, 0.12)' 
              : 'rgba(5, 7, 66, 0.08)',
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? 'rgba(255, 97, 80, 0.16)' 
                : 'rgba(5, 7, 66, 0.12)',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[400] : tokenSet.base.colors.gray[600],
          minWidth: 40,
        },
      },
    },
    // ============================================
    // DRAWER / SIDEBAR
    // ============================================
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' 
            ? tokenSet.base.colors.gray[800] 
            : tokenSet.base.colors.gray[0],
          borderRight: `1px solid ${borderColor}`,
        },
      },
    },
    // ============================================
    // TABS COMPONENTS
    // ============================================
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40,
        },
        indicator: {
          backgroundColor: mode === 'dark' 
            ? tokenSet.base.colors.coral[400] 
            : tokenSet.base.colors.navy[900],
          height: 3,
          borderRadius: tokenSet.base.borderRadius.full,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: tokenSet.base.fontWeight.medium,
          fontSize: tokenSet.base.fontSize.sm,
          minHeight: 40,
          padding: `${tokenSet.base.spacing[2]}px ${tokenSet.base.spacing[4]}px`,
          color: mode === 'dark' ? tokenSet.base.colors.gray[400] : tokenSet.base.colors.gray[600],
          '&:hover': {
            color: mode === 'dark' ? tokenSet.base.colors.gray[200] : tokenSet.base.colors.gray[900],
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.04)' 
              : 'rgba(0, 0, 0, 0.02)',
          },
          '&.Mui-selected': {
            color: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
            fontWeight: tokenSet.base.fontWeight.semibold,
          },
        },
      },
    },
    // ============================================
    // BADGE
    // ============================================
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: tokenSet.base.fontWeight.semibold,
          fontSize: '0.65rem',
          minWidth: 18,
          height: 18,
          padding: '0 4px',
        },
        colorPrimary: {
          backgroundColor: mode === 'dark' 
            ? tokenSet.base.colors.coral[500] 
            : tokenSet.base.colors.navy[900],
        },
        colorSecondary: {
          backgroundColor: tokenSet.base.colors.coral[500],
        },
        colorError: {
          backgroundColor: tokenSet.base.colors.coral[600],
        },
        colorSuccess: {
          backgroundColor: '#1DC286',
        },
      },
    },
    // ============================================
    // AVATAR
    // ============================================
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: tokenSet.base.fontWeight.semibold,
          fontSize: tokenSet.base.fontSize.sm,
        },
        colorDefault: {
          backgroundColor: mode === 'dark' 
            ? tokenSet.base.colors.gray[600] 
            : tokenSet.base.colors.gray[300],
          color: mode === 'dark' 
            ? tokenSet.base.colors.gray[200] 
            : tokenSet.base.colors.gray[700],
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          '& .MuiAvatar-root': {
            borderColor: mode === 'dark' 
              ? tokenSet.base.colors.gray[800] 
              : tokenSet.base.colors.gray[0],
            borderWidth: 2,
          },
        },
      },
    },
    // ============================================
    // STEPPER
    // ============================================
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: tokenSet.base.spacing[3],
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: tokenSet.base.fontWeight.medium,
          '&.Mui-active': {
            fontWeight: tokenSet.base.fontWeight.semibold,
          },
          '&.Mui-completed': {
            fontWeight: tokenSet.base.fontWeight.medium,
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[600] : tokenSet.base.colors.gray[300],
          '&.Mui-active': {
            color: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
          },
          '&.Mui-completed': {
            color: '#1DC286',
          },
        },
      },
    },
    // ============================================
    // PAGINATION
    // ============================================
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: tokenSet.base.borderRadius.sm,
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontWeight: tokenSet.base.fontWeight.medium,
          '&.Mui-selected': {
            backgroundColor: mode === 'dark' 
              ? tokenSet.base.colors.coral[500] 
              : tokenSet.base.colors.navy[900],
            color: tokenSet.base.colors.gray[0],
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? tokenSet.base.colors.coral[400] 
                : tokenSet.base.colors.coral[800],
            },
          },
        },
      },
    },
    // ============================================
    // RATING
    // ============================================
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#FFB400',
        },
        iconEmpty: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[600] : tokenSet.base.colors.gray[300],
        },
      },
    },
    // ============================================
    // SKELETON
    // ============================================
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.11)' 
            : 'rgba(0, 0, 0, 0.08)',
        },
        rounded: {
          borderRadius: tokenSet.base.borderRadius.md,
        },
      },
    },
    // ============================================
    // SNACKBAR / TOAST
    // ============================================
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            borderRadius: tokenSet.base.borderRadius.md,
          },
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' 
            ? tokenSet.base.colors.gray[700] 
            : tokenSet.base.colors.gray[900],
          color: tokenSet.base.colors.gray[0],
          borderRadius: tokenSet.base.borderRadius.md,
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2)',
        },
      },
    },
    // ============================================
    // BREADCRUMBS
    // ============================================
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          color: mode === 'dark' ? tokenSet.base.colors.gray[500] : tokenSet.base.colors.gray[400],
        },
        li: {
          '& .MuiLink-root': {
            color: mode === 'dark' ? tokenSet.base.colors.gray[400] : tokenSet.base.colors.gray[600],
            '&:hover': {
              color: mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900],
            },
          },
          '& .MuiTypography-root': {
            color: mode === 'dark' ? tokenSet.base.colors.gray[200] : tokenSet.base.colors.gray[900],
          },
        },
      },
    },
    // ============================================
    // TOOLTIP
    // ============================================
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: mode === 'dark' 
            ? tokenSet.base.colors.gray[700] 
            : tokenSet.base.colors.gray[900],
          color: tokenSet.base.colors.gray[0],
          fontSize: tokenSet.base.fontSize.xs,
          fontWeight: tokenSet.base.fontWeight.medium,
          padding: `${tokenSet.base.spacing[1]}px ${tokenSet.base.spacing[2]}px`,
          borderRadius: tokenSet.base.borderRadius.sm,
        },
        arrow: {
          color: mode === 'dark' 
            ? tokenSet.base.colors.gray[700] 
            : tokenSet.base.colors.gray[900],
        },
      },
    },
    // ============================================
    // GLOBAL FOCUS STYLES (Accessibility)
    // ============================================
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: `2px solid ${mode === 'dark' ? tokenSet.base.colors.coral[400] : tokenSet.base.colors.navy[900]}`,
            outlineOffset: 2,
          },
        },
      },
    },
  };
}

/**
 * Factory to create a Trinity MUI theme from tokens.
 * @param mode 'light' | 'dark'
 * @param overrides Optional token overrides
 */
export function createTrinityTheme(mode: 'light' | 'dark', overrides?: Partial<TrinityTokens>): ReturnType<typeof createTheme> {
  const mergedTokens = { ...tokens, ...overrides };
  const palette = mode === 'dark'
    ? {
        mode: 'dark' as const,
        primary: { main: mergedTokens.base.colors.coral[600], ...mergedTokens.base.colors.coral },
        secondary: { main: mergedTokens.base.colors.purple[500], ...mergedTokens.base.colors.purple },
        background: {
          default: mergedTokens.base.colors.gray[800],
          paper: mergedTokens.base.colors.gray[700],
        },
        text: {
          primary: mergedTokens.base.colors.gray[50],
          secondary: mergedTokens.base.colors.gray[400],
          disabled: mergedTokens.base.colors.gray[500],
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        action: {
          active: mergedTokens.base.colors.gray[100],
          hover: 'rgba(255, 255, 255, 0.08)',
          selected: 'rgba(255, 255, 255, 0.16)',
          disabled: mergedTokens.base.colors.gray[600],
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
        },
      }
    : {
        mode: 'light' as const,
        primary: { main: mergedTokens.base.colors.navy[900], ...mergedTokens.base.colors.navy },
        secondary: { main: mergedTokens.base.colors.coral[800], ...mergedTokens.base.colors.coral },
        background: {
          default: mergedTokens.base.colors.gray[50],
          paper: mergedTokens.base.colors.gray[0],
        },
        text: {
          primary: mergedTokens.base.colors.gray[900],
          secondary: mergedTokens.base.colors.gray[600],
          disabled: mergedTokens.base.colors.gray[400],
        },
        divider: mergedTokens.base.colors.gray[200],
        action: {
          active: mergedTokens.base.colors.gray[700],
          hover: 'rgba(0, 0, 0, 0.04)',
          selected: 'rgba(0, 0, 0, 0.08)',
          disabled: mergedTokens.base.colors.gray[400],
          disabledBackground: mergedTokens.base.colors.gray[200],
        },
      };

  // Build typography using hierarchy system
  const typographyConfig = {
    fontFamily: '"Montserrat", sans-serif',
    // Button text style
    button: {
      textTransform: 'none' as const,
      fontWeight: mergedTokens.base.fontWeight.semibold,
    },
    // Hierarchy-based typography variants
    // Display variants (Level 1 - Hero/Marketing)
    h1: {
      fontSize: typographicHierarchy.heading.scale.h1.size,
      fontWeight: typographicHierarchy.heading.scale.h1.weight,
      lineHeight: typographicHierarchy.heading.scale.h1.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.primary 
        : mergedTokens.semantic.colors.text.primary,
    },
    h2: {
      fontSize: typographicHierarchy.heading.scale.h2.size,
      fontWeight: typographicHierarchy.heading.scale.h2.weight,
      lineHeight: typographicHierarchy.heading.scale.h2.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.primary 
        : mergedTokens.semantic.colors.text.primary,
    },
    h3: {
      fontSize: typographicHierarchy.heading.scale.h3.size,
      fontWeight: typographicHierarchy.heading.scale.h3.weight,
      lineHeight: typographicHierarchy.heading.scale.h3.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.primary 
        : mergedTokens.semantic.colors.text.primary,
    },
    h4: {
      fontSize: typographicHierarchy.heading.scale.h4.size,
      fontWeight: typographicHierarchy.heading.scale.h4.weight,
      lineHeight: typographicHierarchy.heading.scale.h4.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.primary 
        : mergedTokens.semantic.colors.text.secondary,
    },
    h5: {
      fontSize: typographicHierarchy.heading.scale.h5.size,
      fontWeight: typographicHierarchy.heading.scale.h5.weight,
      lineHeight: typographicHierarchy.heading.scale.h5.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.secondary 
        : mergedTokens.semantic.colors.text.secondary,
    },
    h6: {
      fontSize: typographicHierarchy.heading.scale.h6.size,
      fontWeight: typographicHierarchy.heading.scale.h6.weight,
      lineHeight: typographicHierarchy.heading.scale.h6.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.secondary 
        : mergedTokens.semantic.colors.text.secondary,
    },
    // Body variants (Level 3 - Content)
    body1: {
      fontSize: typographicHierarchy.body.scale.medium.size,
      fontWeight: typographicHierarchy.body.scale.medium.weight,
      lineHeight: typographicHierarchy.body.scale.medium.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.primary 
        : mergedTokens.semantic.colors.text.primary,
    },
    body2: {
      fontSize: typographicHierarchy.body.scale.small.size,
      fontWeight: typographicHierarchy.body.scale.small.weight,
      lineHeight: typographicHierarchy.body.scale.small.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.secondary 
        : mergedTokens.semantic.colors.text.secondary,
    },
    // Supporting text variants
    subtitle1: {
      fontSize: typographicHierarchy.label.scale.large.size,
      fontWeight: typographicHierarchy.label.scale.large.weight,
      lineHeight: typographicHierarchy.label.scale.large.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.primary 
        : mergedTokens.semantic.colors.text.primary,
    },
    subtitle2: {
      fontSize: typographicHierarchy.label.scale.medium.size,
      fontWeight: typographicHierarchy.label.scale.medium.weight,
      lineHeight: typographicHierarchy.label.scale.medium.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.secondary 
        : mergedTokens.semantic.colors.text.secondary,
    },
    caption: {
      fontSize: typographicHierarchy.caption.scale.default.size,
      fontWeight: typographicHierarchy.caption.scale.default.weight,
      lineHeight: typographicHierarchy.caption.scale.default.lineHeight,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.tertiary 
        : mergedTokens.semantic.colors.text.tertiary,
    },
    overline: {
      fontSize: typographicHierarchy.overline.scale.default.size,
      fontWeight: typographicHierarchy.overline.scale.default.weight,
      lineHeight: typographicHierarchy.overline.scale.default.lineHeight,
      letterSpacing: typographicHierarchy.overline.scale.default.tracking,
      textTransform: 'uppercase' as const,
      color: mode === 'dark' 
        ? mergedTokens.darkMode.colors.text.tertiary 
        : mergedTokens.semantic.colors.text.tertiary,
    },
  };

  return createTheme({
    palette,
    typography: typographyConfig,
    shape: {
      borderRadius: mode === 'dark' ? mergedTokens.base.borderRadius.md : mergedTokens.base.borderRadius['2xl'],
    },
    components: getSharedComponentOverrides(mergedTokens, mode),
  });
}

// Re-export tokens for convenience
export { baseTokens, semanticTokens, componentTokens, darkModeTokens, tokens } from './tokens';

// Re-export hierarchy system
export {
  hierarchy,
  elevationHierarchy,
  typographicHierarchy,
  attentionHierarchy,
  scaleHierarchy,
  contrastHierarchy,
  interactiveHierarchy,
  spacingHierarchy,
  getElevation,
  getTypography,
  getAttentionColor,
  getHierarchySpacing,
} from './tokens';

// ============================================
// BRAND COLORS - Edit these to match your brand
// ============================================
export const brandColors = {
  primary: {
    main: '#050742',      // Deep Navy
    light: '#7841C9',     // Light Violet/Purple
    dark: '#3816A0',      // Deep Indigo
  },
  secondary: {
    main: '#FF6150',      // Coral
    light: '#27AAE1',     // Azure
    dark: '#6B12ED',      // Electric Indigo
  },
  neutral: {
    white: '#FFFFFF',
    lightGray: '#FAFAFA',
    gray100: '#E5E7EB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#374151',
    darkBg: '#18181B',
    darkPaper: '#27272A',
  },
};

// ============================================
// WCAG 2.1 AA ACCESSIBLE COLOR COMBINATIONS
// Use these combinations for text/background pairs
// ============================================
export const accessibleCombinations = {
  // White text on colored backgrounds
  whiteOnNavy: { text: brandColors.neutral.white, bg: brandColors.primary.main },
  whiteOnPurple: { text: brandColors.neutral.white, bg: brandColors.primary.light },
  
  // Navy text on light backgrounds
  navyOnWhite: { text: brandColors.primary.main, bg: brandColors.neutral.white },
  navyOnCoral: { text: brandColors.primary.main, bg: brandColors.secondary.main },
  navyOnAzure: { text: brandColors.primary.main, bg: brandColors.secondary.light },
  
  // Purple text on white background
  purpleOnWhite: { text: brandColors.primary.light, bg: brandColors.neutral.white },
  
  // Accent colors on navy background
  coralOnNavy: { text: brandColors.secondary.main, bg: brandColors.primary.main },
  azureOnNavy: { text: brandColors.secondary.light, bg: brandColors.primary.main },
};


/**
 * Trinity light theme (MUI Theme)
 * @see createTrinityTheme
 */
export const lightTheme = createTrinityTheme('light');

// ============================================
// DARK THEME
// ============================================

/**
 * Trinity dark theme (MUI Theme)
 * @see createTrinityTheme
 */
export const darkTheme = createTrinityTheme('dark');

// ============================================
// REACT HOOK FOR TOKEN ACCESS
// ============================================

import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';

export interface UseTrinityTokensResult {
  /** All Trinity tokens */
  tokens: TrinityTokens;
  /** Base primitive tokens */
  base: TrinityTokens['base'];
  /** Semantic tokens */
  semantic: TrinityTokens['semantic'];
  /** Component-specific tokens */
  component: TrinityTokens['component'];
  /** Dark mode override tokens */
  darkMode: TrinityTokens['darkMode'];
  /** Current theme mode */
  mode: 'light' | 'dark';
  /** Whether dark mode is active */
  isDarkMode: boolean;
  /** Get the appropriate color value based on current mode */
  getColor: <T extends string>(lightColor: T, darkColor?: T) => T;
  /** Get semantic color with automatic dark mode handling */
  getSemanticColor: (category: keyof TrinityTokens['semantic']['colors'], name: string) => string;
  /** Helper to get spacing value in pixels */
  spacing: (size: keyof TrinityTokens['base']['spacing']) => number;
  /** Helper to get CSS spacing value */
  spacingCss: (size: keyof TrinityTokens['base']['spacing']) => string;
  /** Helper to get border radius */
  radius: (size: keyof TrinityTokens['base']['borderRadius']) => number;
  /** Helper to get shadow */
  shadow: (size: keyof TrinityTokens['base']['shadows']) => string;
}

/**
 * React hook to access Trinity design tokens with theme awareness.
 * Provides typed access to all token layers and utility functions.
 * 
 * @example
 * ```tsx
 * const { base, semantic, isDarkMode, spacing, getColor } = useTrinityTokens();
 * 
 * <Box sx={{
 *   backgroundColor: getColor(semantic.colors.background.primary),
 *   padding: spacingCss(4),
 *   borderRadius: radius('md'),
 * }} />
 * ```
 */
export function useTrinityTokens(): UseTrinityTokensResult {
  const muiTheme = useTheme();
  const mode = muiTheme.palette.mode as 'light' | 'dark';
  const isDarkMode = mode === 'dark';

  return useMemo(() => {
    const getColor = <T extends string>(lightColor: T, darkColor?: T): T => {
      if (isDarkMode && darkColor) return darkColor;
      return lightColor;
    };

    const getSemanticColor = (
      category: keyof TrinityTokens['semantic']['colors'],
      name: string
    ): string => {
      const lightValue = (semanticTokens.colors[category] as Record<string, string | Record<string, string>>)?.[name];
      
      if (isDarkMode) {
        // Check if dark mode has an override
        const darkColors = darkModeTokens.colors as unknown as Record<string, Record<string, string>>;
        const darkValue = darkColors[category]?.[name];
        if (darkValue) return darkValue;
      }
      
      return typeof lightValue === 'string' ? lightValue : '';
    };

    const spacing = (size: keyof TrinityTokens['base']['spacing']): number => {
      return baseTokens.spacing[size];
    };

    const spacingCss = (size: keyof TrinityTokens['base']['spacing']): string => {
      return `${baseTokens.spacing[size]}px`;
    };

    const radius = (size: keyof TrinityTokens['base']['borderRadius']): number => {
      return baseTokens.borderRadius[size];
    };

    const shadow = (size: keyof TrinityTokens['base']['shadows']): string => {
      return baseTokens.shadows[size];
    };

    return {
      tokens,
      base: baseTokens,
      semantic: semanticTokens,
      component: componentTokens,
      darkMode: darkModeTokens,
      mode,
      isDarkMode,
      getColor,
      getSemanticColor,
      spacing,
      spacingCss,
      radius,
      shadow,
    };
  }, [isDarkMode, mode]);
}

// Type exports for consumers
export type { TrinityTokens } from './tokens';