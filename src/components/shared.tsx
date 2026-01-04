/**
 * @fileoverview Shared utility components for building component demo pages.
 * These components provide consistent styling and structure across all pages.
 * @module components/shared
 */

import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';

// @baseTokens-usage: spacing and borderRadius are primitive tokens (not semantic colors)
// eslint-disable-next-line no-restricted-syntax
import { baseTokens } from '../tokens';

// Use spacing/radius from tokens
const sectionSpacing = baseTokens.spacing[8]; // 32px
const contentSpacing = baseTokens.spacing[6]; // 24px
const elementSpacing = baseTokens.spacing[4]; // 16px
const cardRadius = baseTokens.borderRadius.lg; // 12px
const paperRadius = baseTokens.borderRadius.md; // 8px

/**
 * Props for the ComponentPage component.
 */
interface ComponentPageProps {
  /** The main title displayed at the top of the page */
  title: string;
  /** A brief description of the component being showcased */
  description: string;
  /** Page content, typically Section components */
  children: React.ReactNode;
}

/**
 * ComponentPage provides the standard layout for component demo pages.
 * It displays a title, description, and wraps child content.
 *
 * @example
 * ```tsx
 * <ComponentPage
 *   title="Button"
 *   description="Buttons allow users to take actions with a single tap."
 * >
 *   <Section title="Variants">
 *     <Showcase>
 *       <Button variant="contained">Primary</Button>
 *     </Showcase>
 *   </Section>
 * </ComponentPage>
 * ```
 */
export const ComponentPage: React.FC<ComponentPageProps> = ({ title, description, children }) => (
  <Box>
    <Typography variant="h4" fontWeight={700} gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: sectionSpacing, maxWidth: 700 }}>
      {description}
    </Typography>
    {children}
  </Box>
);

/**
 * Props for the Section component.
 */
interface SectionProps {
  /** Section heading text */
  title: string;
  /** Section content, typically Showcase components or other demos */
  children: React.ReactNode;
}

/**
 * Section provides a titled, bordered container for grouping related component demos.
 * Each section has a heading and paper background for visual separation.
 *
 * @example
 * ```tsx
 * <Section title="Sizes">
 *   <Showcase>
 *     <Button size="small">Small</Button>
 *     <Button size="medium">Medium</Button>
 *     <Button size="large">Large</Button>
 *   </Showcase>
 * </Section>
 * ```
 */
export const Section: React.FC<SectionProps> = ({ title, children }) => (
  <Box sx={{ mb: sectionSpacing }}>
    <Typography variant="h6" fontWeight={600} gutterBottom>
      {title}
    </Typography>
    <Paper variant="outlined" sx={{ p: contentSpacing, borderRadius: paperRadius }}>
      {children}
    </Paper>
  </Box>
);

/**
 * Props for the Showcase component.
 */
interface ShowcaseProps {
  /** Components to display in the showcase */
  children: React.ReactNode;
  /** Layout direction - 'row' for horizontal, 'column' for vertical */
  direction?: 'row' | 'column';
}

/**
 * Showcase is a flex container for displaying components with consistent spacing.
 * Use within Section components to arrange demo elements.
 *
 * @example
 * ```tsx
 * <Showcase direction="row">
 *   <Chip label="Default" />
 *   <Chip label="Primary" color="primary" />
 *   <Chip label="Secondary" color="secondary" />
 * </Showcase>
 * ```
 */
export const Showcase: React.FC<ShowcaseProps> = ({ children, direction = 'row' }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: direction,
      flexWrap: 'wrap',
      gap: elementSpacing,
      alignItems: direction === 'row' ? 'center' : 'flex-start',
    }}
  >
    {children}
  </Box>
);
