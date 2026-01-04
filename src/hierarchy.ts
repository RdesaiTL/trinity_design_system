// ============================================
// TRINITY DESIGN SYSTEM - HIERARCHY UTILITIES
// Helpers for applying design hierarchy throughout the app
// ============================================

import {
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
  baseTokens,
} from './tokens';

// Re-export core hierarchy objects
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
};

// ============================================
// TYPE DEFINITIONS
// ============================================

export type ElevationLevel = keyof typeof elevationHierarchy;
export type AttentionLevel = keyof typeof attentionHierarchy;
export type TypographyCategory = keyof typeof typographicHierarchy;
export type SpacingCategory = keyof typeof spacingHierarchy;
export type ContrastLevel = keyof typeof contrastHierarchy;
export type InteractiveState = keyof typeof interactiveHierarchy;

export interface HierarchyStyles {
  elevation?: ElevationLevel;
  attention?: AttentionLevel;
  typography?: { category: TypographyCategory; variant: string };
  spacing?: { category: SpacingCategory; size: number };
}

// ============================================
// ELEVATION UTILITIES
// ============================================

/**
 * Get CSS properties for an elevation level
 * @param level - Elevation level name
 * @returns Object with zIndex and boxShadow CSS properties
 */
export function getElevationStyles(level: ElevationLevel): {
  zIndex: number | string;
  boxShadow: string;
  position?: string;
} {
  const elevation = elevationHierarchy[level];
  const styles: { zIndex: number | string; boxShadow: string; position?: string } = {
    zIndex: elevation.zIndex,
    boxShadow: elevation.shadow,
  };
  
  // Add position relative if needed for z-index context
  if (elevation.level > 0) {
    styles.position = 'relative';
  }
  
  return styles;
}

/**
 * Get elevation for common UI patterns
 */
export const uiElevation = {
  /** For sunken/recessed areas like code blocks, wells */
  sunken: () => getElevationStyles('ground'),
  /** For standard cards at rest */
  card: () => getElevationStyles('resting'),
  /** For hovered/focused cards */
  cardHover: () => getElevationStyles('raised'),
  /** For dropdown menus */
  dropdown: () => getElevationStyles('floating'),
  /** For sticky headers */
  header: () => getElevationStyles('sticky'),
  /** For modal backdrops */
  backdrop: () => getElevationStyles('overlay'),
  /** For modal dialogs */
  modal: () => getElevationStyles('dialog'),
  /** For popovers */
  popover: () => getElevationStyles('popover'),
  /** For tooltips */
  tooltip: () => getElevationStyles('tooltip'),
};

// ============================================
// TYPOGRAPHY UTILITIES
// ============================================

/**
 * Get typography CSS properties
 * @param category - Typography category (display, heading, body, label, caption, overline)
 * @param variant - Variant within the category
 * @returns CSS properties object
 */
export function getTypographyStyles(
  category: TypographyCategory,
  variant: string
): Record<string, string | number> | null {
  const cat = typographicHierarchy[category];
  const scale = (cat.scale as Record<string, Record<string, string | number>>)[variant];
  
  if (!scale) return null;
  
  const styles: Record<string, string | number> = {
    fontSize: scale.size,
    fontWeight: scale.weight,
    lineHeight: scale.lineHeight,
  };
  
  if ('tracking' in scale) {
    styles.letterSpacing = scale.tracking as string;
  }
  
  if ('transform' in scale) {
    styles.textTransform = scale.transform as string;
  }
  
  return styles;
}

/**
 * Commonly used typography presets
 */
export const typographyPresets = {
  // Display typography
  heroTitle: () => getTypographyStyles('display', 'large'),
  pageTitle: () => getTypographyStyles('display', 'medium'),
  sectionTitle: () => getTypographyStyles('display', 'small'),
  
  // Heading typography
  h1: () => getTypographyStyles('heading', 'h1'),
  h2: () => getTypographyStyles('heading', 'h2'),
  h3: () => getTypographyStyles('heading', 'h3'),
  h4: () => getTypographyStyles('heading', 'h4'),
  h5: () => getTypographyStyles('heading', 'h5'),
  h6: () => getTypographyStyles('heading', 'h6'),
  
  // Body typography
  bodyLarge: () => getTypographyStyles('body', 'large'),
  body: () => getTypographyStyles('body', 'medium'),
  bodySmall: () => getTypographyStyles('body', 'small'),
  
  // Label typography
  labelLarge: () => getTypographyStyles('label', 'large'),
  label: () => getTypographyStyles('label', 'medium'),
  labelSmall: () => getTypographyStyles('label', 'small'),
  
  // Caption & overline
  caption: () => getTypographyStyles('caption', 'default'),
  captionEmphasis: () => getTypographyStyles('caption', 'emphasis'),
  overline: () => getTypographyStyles('overline', 'default'),
};

// ============================================
// ATTENTION/PROMINENCE UTILITIES
// ============================================

/**
 * Get color for attention level
 * @param level - Attention level
 * @param mode - Light or dark mode
 * @returns Color value
 */
export function getAttentionStyles(
  level: AttentionLevel,
  mode: 'light' | 'dark' = 'light'
): { color: string; opacity?: number } {
  const color = getAttentionColor(level, mode);
  const _attention = attentionHierarchy[level];
  
  if (level === 'disabled') {
    return { color, opacity: 0.6 };
  }
  
  return { color };
}

/**
 * Apply attention-based styling to content
 */
export const attentionStyles = {
  /** Primary importance - CTAs, titles, critical info */
  primary: (mode: 'light' | 'dark' = 'light') => ({
    color: getAttentionColor('primary', mode),
    fontWeight: 600,
  }),
  /** Secondary importance - section headers, key info */
  secondary: (mode: 'light' | 'dark' = 'light') => ({
    color: getAttentionColor('secondary', mode),
    fontWeight: 500,
  }),
  /** Tertiary - body text, regular content */
  tertiary: (mode: 'light' | 'dark' = 'light') => ({
    color: getAttentionColor('tertiary', mode),
    fontWeight: 400,
  }),
  /** Muted - helper text, metadata */
  muted: (mode: 'light' | 'dark' = 'light') => ({
    color: getAttentionColor('muted', mode),
    fontWeight: 400,
  }),
  /** Disabled - unavailable items */
  disabled: (mode: 'light' | 'dark' = 'light') => ({
    color: getAttentionColor('disabled', mode),
    fontWeight: 400,
    opacity: 0.6,
    cursor: 'not-allowed',
  }),
};

// ============================================
// SPACING UTILITIES
// ============================================

/**
 * Get spacing value from hierarchy
 */
export function getSpacing(category: SpacingCategory, size: number): number | null {
  return getHierarchySpacing(category, size);
}

/**
 * Spacing presets for common use cases
 */
export const spacing = {
  // Micro spacing (1-2)
  inline: spacingHierarchy.micro[1],  // 4px - tight inline elements
  inlineRelaxed: spacingHierarchy.micro[2], // 8px - comfortable inline
  
  // Component spacing (3-5)
  componentTight: spacingHierarchy.component[3], // 12px
  component: spacingHierarchy.component[4], // 16px
  componentRelaxed: spacingHierarchy.component[5], // 20px
  
  // Section spacing (6-10)
  sectionTight: spacingHierarchy.section[6], // 24px
  section: spacingHierarchy.section[8], // 32px
  sectionRelaxed: spacingHierarchy.section[10], // 40px
  
  // Layout spacing (12-32)
  layoutTight: spacingHierarchy.layout[12], // 48px
  layout: spacingHierarchy.layout[16], // 64px
  layoutRelaxed: spacingHierarchy.layout[24], // 96px
  layoutHero: spacingHierarchy.layout[32], // 128px
};

// ============================================
// SCALE UTILITIES
// ============================================

/**
 * Get scaled size based on base value and scale step
 */
export function getScaledSize(base: number, step: keyof typeof scaleHierarchy.sizes): number {
  return Math.round(base * scaleHierarchy.sizes[step]);
}

/**
 * Get icon size
 */
export function getIconSize(size: keyof typeof scaleHierarchy.icons): number {
  return scaleHierarchy.icons[size];
}

/**
 * Ensure touch target meets accessibility requirements
 */
export function ensureTouchTarget(
  size: number,
  level: 'minimum' | 'comfortable' | 'spacious' = 'minimum'
): number {
  const minSize = scaleHierarchy.touchTargets[level];
  return Math.max(size, minSize);
}

// ============================================
// INTERACTIVE STATE UTILITIES
// ============================================

/**
 * Get interactive state styles
 */
export function getInteractiveStyles(state: InteractiveState): Record<string, string | number> {
  const interactive = interactiveHierarchy[state];
  const styles: Record<string, string | number> = {
    transition: interactive.transition,
  };
  
  if (interactive.opacity !== 1) {
    styles.opacity = interactive.opacity;
  }
  
  if (interactive.transform !== 'none') {
    styles.transform = interactive.transform;
  }
  
  if ('outline' in interactive) {
    styles.outline = interactive.outline as string;
    styles.outlineOffset = interactive.outlineOffset as string;
  }
  
  if ('cursor' in interactive) {
    styles.cursor = interactive.cursor as string;
  }
  
  if ('pointerEvents' in interactive) {
    styles.pointerEvents = interactive.pointerEvents as string;
  }
  
  return styles;
}

/**
 * Get focus ring styles for accessibility
 */
export function getFocusRingStyles(color?: string): Record<string, string | number> {
  const focusColor = color || baseTokens.colors.navy[900];
  return {
    outline: `2px solid ${focusColor}`,
    outlineOffset: '2px',
  };
}

/**
 * CSS for interactive hover effects
 */
export const hoverEffect = {
  /** Subtle lift effect */
  lift: {
    transition: 'transform 150ms ease-out, box-shadow 150ms ease-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: elevationHierarchy.raised.shadow,
    },
  },
  /** Scale effect */
  scale: {
    transition: 'transform 150ms ease-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  /** Highlight effect */
  highlight: {
    transition: 'background-color 150ms ease-out',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
};

// ============================================
// CONTRAST UTILITIES
// ============================================

/**
 * Get contrast pair colors
 */
export function getContrastColors(level: ContrastLevel): {
  foreground: string;
  background: string;
  ratio: number;
} {
  return contrastHierarchy[level];
}

/**
 * Check if a contrast ratio meets WCAG requirements
 */
export function meetsWCAG(
  ratio: number,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

// ============================================
// COMBINED HIERARCHY UTILITIES
// ============================================

/**
 * Apply multiple hierarchy aspects at once
 */
export function applyHierarchy(config: HierarchyStyles): Record<string, unknown> {
  const styles: Record<string, unknown> = {};
  
  if (config.elevation) {
    Object.assign(styles, getElevationStyles(config.elevation));
  }
  
  if (config.attention) {
    Object.assign(styles, getAttentionStyles(config.attention));
  }
  
  if (config.typography) {
    const typoStyles = getTypographyStyles(
      config.typography.category,
      config.typography.variant
    );
    if (typoStyles) {
      Object.assign(styles, typoStyles);
    }
  }
  
  if (config.spacing) {
    const spacingValue = getSpacing(config.spacing.category, config.spacing.size);
    if (spacingValue) {
      styles.gap = spacingValue;
    }
  }
  
  return styles;
}

/**
 * Get presets for common UI patterns
 */
export const uiPatterns = {
  /** Card with hover effect */
  interactiveCard: () => ({
    ...getElevationStyles('resting'),
    borderRadius: 12,
    transition: 'transform 150ms ease-out, box-shadow 150ms ease-out',
    cursor: 'pointer',
    '&:hover': {
      ...getElevationStyles('raised'),
      transform: 'translateY(-2px)',
    },
    '&:focus-visible': getFocusRingStyles(),
  }),
  
  /** Modal dialog */
  modal: () => ({
    ...getElevationStyles('dialog'),
    borderRadius: 16,
    padding: spacing.section,
  }),
  
  /** Dropdown menu */
  dropdown: () => ({
    ...getElevationStyles('floating'),
    borderRadius: 8,
    padding: spacing.inline,
  }),
  
  /** Tooltip */
  tooltip: () => ({
    ...getElevationStyles('tooltip'),
    borderRadius: 6,
    padding: `${spacing.inline}px ${spacing.inlineRelaxed}px`,
  }),
  
  /** Primary button */
  primaryButton: () => ({
    ...typographyPresets.label(),
    padding: `${spacing.inlineRelaxed}px ${spacing.component}px`,
    borderRadius: 9999,
    fontWeight: 600,
    transition: 'all 150ms ease-out',
    '&:hover': {
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
    '&:focus-visible': getFocusRingStyles(),
  }),
  
  /** Section container */
  section: () => ({
    paddingTop: spacing.section,
    paddingBottom: spacing.section,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing.componentRelaxed,
  }),
  
  /** Page container */
  page: () => ({
    maxWidth: 1280,
    margin: '0 auto',
    padding: spacing.section,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing.layout,
  }),
};

// ============================================
// DESIGN SYSTEM LAYER DOCUMENTATION
// ============================================

/**
 * Design System Architecture Reference
 * 
 * Layer 1: FOUNDATIONS (baseTokens)
 * - Color palettes (navy, purple, coral, azure, gray)
 * - Typography scales (font sizes, weights, line heights)
 * - Spacing scale (0-32, in 4px increments)
 * - Border radius scale (none through full)
 * - Shadow definitions
 * - Motion/animation values
 * 
 * Layer 2: DESIGN TOKENS (semanticTokens)
 * - Semantic color mappings (brand, text, background, border, status)
 * - Typography presets (display, heading, body, label)
 * - Semantic spacing (component, layout)
 * - Semantic borders and shadows
 * 
 * Layer 3: COMPONENT TOKENS (componentTokens)
 * - Button sizes, colors, radii
 * - Input specifications
 * - Card tokens
 * - Avatar, badge, chip tokens
 * - Modal, tooltip tokens
 * - Navigation tokens
 * 
 * Layer 4: HIERARCHY (hierarchy)
 * - Attention hierarchy (primary → disabled)
 * - Typography hierarchy (display → overline)
 * - Elevation hierarchy (ground → tooltip)
 * - Scale hierarchy (size ratios)
 * - Contrast hierarchy (accessibility)
 * - Interactive hierarchy (states)
 * - Spacing hierarchy (micro → layout)
 * 
 * Layer 5: PATTERNS (uiPatterns)
 * - Interactive card pattern
 * - Modal pattern
 * - Dropdown pattern
 * - Button patterns
 * - Section/page layouts
 */
export const architectureLayers = {
  foundations: 'Layer 1: Raw design primitives (colors, spacing, typography scales)',
  tokens: 'Layer 2: Semantic mappings of foundations to use cases',
  components: 'Layer 3: UI component specifications',
  hierarchy: 'Layer 4: Visual hierarchy rules for consistent importance',
  patterns: 'Layer 5: Composed solutions for common UI tasks',
} as const;

export default hierarchy;
