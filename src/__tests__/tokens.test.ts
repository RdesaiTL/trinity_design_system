import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  tokens,
  baseTokens,
  semanticTokens,
  componentTokens,
  darkModeTokens,
} from '../tokens';
import {
  getContrastRatio,
  validateAccessibility,
  generateCssVariables,
  generateDarkModeCssVariables,
  injectTrinityCssVariables,
  injectDarkModeCssVariables,
  createTrinityTheme,
} from '../theme';

describe('Trinity Tokens', () => {
  describe('baseTokens', () => {
    it('should have all required color palettes', () => {
      expect(baseTokens.colors).toHaveProperty('navy');
      expect(baseTokens.colors).toHaveProperty('purple');
      expect(baseTokens.colors).toHaveProperty('indigo');
      expect(baseTokens.colors).toHaveProperty('coral');
      expect(baseTokens.colors).toHaveProperty('azure');
      expect(baseTokens.colors).toHaveProperty('gray');
    });

    it('should have complete color shades for each palette', () => {
      const expectedShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
      
      Object.entries(baseTokens.colors).forEach(([name, palette]) => {
        if (name === 'gray') {
          expect(palette).toHaveProperty('0'); // gray has 0 (white)
        }
        expectedShades.forEach(shade => {
          expect(palette).toHaveProperty(shade);
        });
      });
    });

    it('should have spacing scale', () => {
      expect(baseTokens.spacing[0]).toBe(0);
      expect(baseTokens.spacing[4]).toBe(16);
      expect(baseTokens.spacing[8]).toBe(32);
    });

    it('should have font sizes in rem units', () => {
      expect(baseTokens.fontSize.base).toBe('1rem');
      expect(baseTokens.fontSize.sm).toBe('0.875rem');
      expect(baseTokens.fontSize.lg).toBe('1.125rem');
    });

    it('should have font weights as numbers', () => {
      expect(typeof baseTokens.fontWeight.regular).toBe('number');
      expect(baseTokens.fontWeight.bold).toBe(700);
    });

    it('should have border radius values', () => {
      expect(baseTokens.borderRadius.none).toBe(0);
      expect(baseTokens.borderRadius.full).toBe(9999);
    });

    it('should have shadow definitions', () => {
      expect(baseTokens.shadows.none).toBe('none');
      expect(typeof baseTokens.shadows.md).toBe('string');
      expect(baseTokens.shadows.md).toContain('rgb');
    });

    it('should have transition durations', () => {
      expect(baseTokens.duration.fast).toBe('150ms');
      expect(baseTokens.duration.normal).toBe('200ms');
    });

    it('should have breakpoints', () => {
      expect(baseTokens.breakpoints.sm).toBe(600);
      expect(baseTokens.breakpoints.md).toBe(900);
      expect(baseTokens.breakpoints.lg).toBe(1200);
    });
  });

  describe('semanticTokens', () => {
    it('should have brand colors mapped correctly', () => {
      expect(semanticTokens.colors.brand.primary).toBe(baseTokens.colors.navy[900]);
      expect(semanticTokens.colors.brand.secondary).toBe(baseTokens.colors.purple[700]);
      expect(semanticTokens.colors.brand.accent).toBe(baseTokens.colors.coral[800]);
    });

    it('should have text colors', () => {
      expect(semanticTokens.colors.text.primary).toBe(baseTokens.colors.gray[900]);
      expect(semanticTokens.colors.text.inverse).toBe(baseTokens.colors.gray[0]);
    });

    it('should have status colors with text, background, and border', () => {
      expect(semanticTokens.colors.status.error).toHaveProperty('text');
      expect(semanticTokens.colors.status.error).toHaveProperty('background');
      expect(semanticTokens.colors.status.error).toHaveProperty('border');
    });

    it('should have typography presets', () => {
      expect(semanticTokens.typography.heading.h1).toHaveProperty('fontSize');
      expect(semanticTokens.typography.heading.h1).toHaveProperty('fontWeight');
      expect(semanticTokens.typography.heading.h1).toHaveProperty('lineHeight');
    });

    it('should have spacing presets', () => {
      expect(semanticTokens.spacing.component.paddingMd).toBe(baseTokens.spacing[4]);
      expect(semanticTokens.spacing.layout.pagePadding).toBe(baseTokens.spacing[6]);
    });

    it('should have motion tokens', () => {
      expect(semanticTokens.motion.duration.fast).toBe(baseTokens.duration.fast);
      expect(semanticTokens.motion.easing.default).toBe(baseTokens.easing.inOut);
    });
  });

  describe('componentTokens', () => {
    it('should have button tokens', () => {
      expect(componentTokens.button.height.medium).toBe(40);
      expect(componentTokens.button.borderRadius).toBe(baseTokens.borderRadius.full);
    });

    it('should have input tokens', () => {
      expect(componentTokens.input.height.medium).toBe(44);
      // Design intent: sm (6px) for inputs per token documentation - "small interactive elements"
      expect(componentTokens.input.borderRadius).toBe(baseTokens.borderRadius.sm);
    });

    it('should have card tokens', () => {
      expect(componentTokens.card.borderRadius).toBe(baseTokens.borderRadius.lg);
    });

    it('should have avatar size tokens', () => {
      expect(componentTokens.avatar.size.md).toBe(40);
      expect(componentTokens.avatar.size.lg).toBe(48);
    });

    it('should have navigation tokens', () => {
      expect(componentTokens.navigation.header.height).toBe(64);
      expect(componentTokens.navigation.sidebar.width).toBe(240);
    });
  });

  describe('darkModeTokens', () => {
    it('should have dark mode text colors', () => {
      expect(darkModeTokens.colors.text.primary).toBe(baseTokens.colors.gray[50]);
      expect(darkModeTokens.colors.text.secondary).toBe(baseTokens.colors.gray[400]);
    });

    it('should have dark mode background colors', () => {
      expect(darkModeTokens.colors.background.primary).toBe(baseTokens.colors.gray[800]);
    });

    it('should have dark mode border colors', () => {
      expect(darkModeTokens.colors.border.default).toBe(baseTokens.colors.gray[600]);
    });

    it('should have dark mode interactive colors', () => {
      expect(darkModeTokens.colors.interactive).toBeDefined();
      expect(darkModeTokens.colors.interactive?.hover).toBeDefined();
    });

    it('should have dark mode status colors', () => {
      expect(darkModeTokens.colors.status).toBeDefined();
      expect(darkModeTokens.colors.status?.error.text).toBeDefined();
    });
  });

  describe('tokens (combined)', () => {
    it('should have all token layers', () => {
      expect(tokens).toHaveProperty('base');
      expect(tokens).toHaveProperty('semantic');
      expect(tokens).toHaveProperty('component');
      expect(tokens).toHaveProperty('darkMode');
    });
  });
});

describe('Accessibility Utilities', () => {
  describe('getContrastRatio', () => {
    it('should return 21 for black on white', () => {
      const ratio = getContrastRatio('#000000', '#FFFFFF');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('should return 1 for same colors', () => {
      const ratio = getContrastRatio('#FFFFFF', '#FFFFFF');
      expect(ratio).toBe(1);
    });

    it('should calculate navy on white correctly', () => {
      const ratio = getContrastRatio(baseTokens.colors.navy[900], '#FFFFFF');
      expect(ratio).toBeGreaterThan(4.5); // Should be WCAG AA compliant
    });

    it('should handle 3-character hex codes', () => {
      const ratio = getContrastRatio('#000', '#FFF');
      expect(ratio).toBeCloseTo(21, 0);
    });
  });

  describe('validateAccessibility', () => {
    it('should return true for sufficient contrast', () => {
      const result = validateAccessibility('#000000', '#FFFFFF');
      expect(result).toBe(true);
    });

    it('should return false for insufficient contrast', () => {
      const result = validateAccessibility('#AAAAAA', '#FFFFFF');
      expect(result).toBe(false);
    });

    it('should use custom ratio when provided', () => {
      const result = validateAccessibility('#777777', '#FFFFFF', 3.0);
      expect(result).toBe(true);
    });
  });
});

describe('CSS Variable Generation', () => {
  describe('generateCssVariables', () => {
    it('should generate CSS variable string', () => {
      const css = generateCssVariables();
      expect(css).toContain('--trinity-');
      expect(css).toContain('--trinity-color-navy-900');
      expect(css).toContain('--trinity-spacing-4');
    });

    it('should include all base token categories', () => {
      const css = generateCssVariables();
      expect(css).toContain('--trinity-color-');
      expect(css).toContain('--trinity-spacing-');
      expect(css).toContain('--trinity-font-size-');
      expect(css).toContain('--trinity-radius-');
      expect(css).toContain('--trinity-shadow-');
    });

    it('should include semantic tokens', () => {
      const css = generateCssVariables();
      expect(css).toContain('--trinity-semantic-');
    });

    it('should include component tokens', () => {
      const css = generateCssVariables();
      expect(css).toContain('--trinity-component-');
    });
  });

  describe('generateDarkModeCssVariables', () => {
    it('should generate dark mode CSS variables', () => {
      const css = generateDarkModeCssVariables();
      expect(css).toContain('--trinity-semantic-text-primary');
      expect(css).toContain('--trinity-semantic-background-primary');
    });
  });
});

describe('CSS Variable Injection', () => {
  beforeEach(() => {
    // Setup DOM
    document.head.innerHTML = '';
  });

  afterEach(() => {
    document.head.innerHTML = '';
  });

  describe('injectTrinityCssVariables', () => {
    it('should create a style element', () => {
      injectTrinityCssVariables();
      const styleEl = document.getElementById('trinity-css-variables');
      expect(styleEl).toBeTruthy();
      expect(styleEl?.tagName).toBe('STYLE');
    });

    it('should replace existing style element', () => {
      injectTrinityCssVariables();
      injectTrinityCssVariables();
      const styleEls = document.querySelectorAll('#trinity-css-variables');
      expect(styleEls.length).toBe(1);
    });
  });

  describe('injectDarkModeCssVariables', () => {
    it('should create a dark mode style element', () => {
      injectDarkModeCssVariables();
      const styleEl = document.getElementById('trinity-dark-mode-variables');
      expect(styleEl).toBeTruthy();
    });

    it('should include media query for prefers-color-scheme', () => {
      injectDarkModeCssVariables();
      const styleEl = document.getElementById('trinity-dark-mode-variables');
      expect(styleEl?.textContent).toContain('prefers-color-scheme: dark');
    });
  });
});

describe('Theme Creation', () => {
  describe('createTrinityTheme', () => {
    it('should create a light theme', () => {
      const theme = createTrinityTheme('light');
      expect(theme.palette.mode).toBe('light');
      expect(theme.palette.primary.main).toBe(baseTokens.colors.navy[900]);
    });

    it('should create a dark theme', () => {
      const theme = createTrinityTheme('dark');
      expect(theme.palette.mode).toBe('dark');
      expect(theme.palette.background.default).toBe(baseTokens.colors.gray[800]);
    });

    it('should apply Montserrat font family', () => {
      const theme = createTrinityTheme('light');
      expect(theme.typography.fontFamily).toContain('Montserrat');
    });

    it('should disable button text transform', () => {
      const theme = createTrinityTheme('light');
      expect(theme.typography.button.textTransform).toBe('none');
    });

    it('should set appropriate border radius per mode', () => {
      const lightTheme = createTrinityTheme('light');
      const darkTheme = createTrinityTheme('dark');
      expect(lightTheme.shape.borderRadius).toBe(baseTokens.borderRadius['2xl']);
      expect(darkTheme.shape.borderRadius).toBe(baseTokens.borderRadius.md);
    });
  });
});
