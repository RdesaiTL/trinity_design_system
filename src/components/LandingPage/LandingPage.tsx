/**
 * @fileoverview LandingPage template component for Trinity applications.
 * Provides a complete hero section with feature cards layout.
 *
 * @example
 * ```tsx
 * import { LandingPage } from '@trinity/design-system';
 * import { gradientIcons, brandGradients } from '@trinity/design-system/assets';
 *
 * const features = [
 *   {
 *     id: 'research',
 *     icon: gradientIcons.ai,
 *     title: 'Research Platform',
 *     description: 'AI-powered research tools',
 *     variant: 'navy',
 *   },
 *   // ... more features
 * ];
 *
 * <LandingPage
 *   heroTitle="AI for Life Sciences"
 *   heroSubtitle="Transform your research with innovative AI tools."
 *   backgroundImage={brandGradients.light[0]}
 *   features={features}
 * />
 * ```
 *
 * @module components/LandingPage/LandingPage
 */

import * as React from 'react';
import { Box, Container, Typography, Grid, SxProps, Theme } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { brandColors, semanticTokens } from '../../tokens';
import { FeatureCard, FeatureCardProps } from './FeatureCard';

export interface LandingPageFeature extends Omit<FeatureCardProps, 'sx'> {
  /**
   * Unique identifier for the feature
   */
  id: string;
}

export interface LandingPageProps {
  /**
   * Hero section title
   */
  heroTitle: string;

  /**
   * Hero section subtitle/description
   */
  heroSubtitle?: string;

  /**
   * Icon to display next to the hero title
   * Can be a React node or 'sparkle' for the default AI sparkle icon
   * @default 'sparkle'
   */
  heroIcon?: React.ReactNode | 'sparkle';

  /**
   * Background image URL for the hero section
   * Use brandGradients or backgroundImages from assets
   */
  backgroundImage?: string;

  /**
   * Background gradient CSS (alternative to backgroundImage)
   * @example 'linear-gradient(135deg, #050742 0%, #3816A0 100%)'
   */
  backgroundGradient?: string;

  /**
   * Array of feature cards to display
   */
  features: LandingPageFeature[];

  /**
   * Number of columns for the feature grid
   * @default 3
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Maximum width of the content container
   * @default 'lg'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;

  /**
   * Hero section height. Can be a number (pixels), string ('100vh'), or 'fullscreen'
   * @default 400
   */
  heroHeight?: number | string;

  /**
   * Whether the hero extends behind the navigation (for transparent nav)
   * @default false
   */
  heroExtendsUnderNav?: boolean;

  /**
   * Navigation height to account for when heroExtendsUnderNav is true
   * @default 64
   */
  navHeight?: number;

  /**
   * Custom header/navigation component to render at the top
   */
  header?: React.ReactNode;

  /**
   * Footer component to render at the bottom
   */
  footer?: React.ReactNode;

  /**
   * Additional content to render after features
   */
  children?: React.ReactNode;

  /**
   * Additional styles for the root container
   */
  sx?: SxProps<Theme>;

  /**
   * Additional styles for the hero section
   */
  heroSx?: SxProps<Theme>;

  /**
   * Additional styles for the features section
   */
  featuresSx?: SxProps<Theme>;
}

/**
 * LandingPage - A complete landing page template with hero and feature cards.
 *
 * Features:
 * - Customizable hero section with background image/gradient
 * - Responsive feature card grid
 * - Supports both navy and white card variants
 * - Works with Trinity navigation components
 * - Fully accessible
 *
 * @accessibility
 * - Semantic HTML structure with proper heading hierarchy
 * - Hero title uses h1, feature cards use h3
 * - Background images are decorative (aria-hidden)
 * - All interactive elements are keyboard accessible
 */
export const LandingPage: React.FC<LandingPageProps> = ({
  heroTitle,
  heroSubtitle,
  heroIcon = 'sparkle',
  backgroundImage,
  backgroundGradient,
  features,
  columns = 3,
  maxWidth = 'lg',
  heroHeight = 400,
  heroExtendsUnderNav = false,
  navHeight = 64,
  header,
  footer,
  children,
  sx,
  heroSx,
  featuresSx,
}) => {
  // Calculate hero positioning
  const heroTopOffset = heroExtendsUnderNav ? -navHeight : 0;
  const heroPaddingTop = heroExtendsUnderNav ? navHeight : 0;

  // Compute hero height - support 'fullscreen' keyword
  const computedHeroHeight = heroHeight === 'fullscreen' ? '100vh' : heroHeight;

  // Grid column mapping for MUI Grid v2
  // Note: 5-column uses percentage width via sx override
  const gridColumns: Record<number, { xs: number; sm?: number; md?: number; lg?: number }> = {
    1: { xs: 12 },
    2: { xs: 12, sm: 6 },
    3: { xs: 12, sm: 6, md: 4 },
    4: { xs: 12, sm: 6, md: 3 },
    5: { xs: 12, sm: 6, md: 4 }, // Will use custom width for 5-col
    6: { xs: 12, sm: 6, md: 4, lg: 2 },
  };

  // Render hero icon
  const renderHeroIcon = () => {
    if (heroIcon === 'sparkle') {
      return (
        <AutoAwesomeIcon
          sx={{
            fontSize: 32,
            color: brandColors.secondary.main,
            mr: 1.5,
          }}
        />
      );
    }
    return heroIcon;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {/* Header/Navigation */}
      {header}

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: computedHeroHeight,
          mt: `${heroTopOffset}px`,
          pt: `${heroPaddingTop}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          ...heroSx,
        }}
      >
        {/* Background Layer */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            ...(backgroundImage && {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }),
            ...(backgroundGradient && !backgroundImage && {
              background: backgroundGradient,
            }),
            ...(!backgroundImage && !backgroundGradient && {
              background: `linear-gradient(135deg, ${brandColors.primary.main} 0%, ${brandColors.primary.light} 50%, ${brandColors.secondary.main} 100%)`,
            }),
          }}
        />

        {/* Hero Content */}
        <Container maxWidth={maxWidth} sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
            }}
          >
            {/* Title with Icon */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              {renderHeroIcon()}
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  color: brandColors.neutral.white,
                  fontWeight: 700,
                  fontSize: {
                    xs: semanticTokens.typography.heading.h4.fontSize,
                    md: semanticTokens.typography.heading.h3.fontSize,
                  },
                }}
              >
                {heroTitle}
              </Typography>
            </Box>

            {/* Subtitle */}
            {heroSubtitle && (
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: 800,
                  mx: 'auto',
                  fontSize: {
                    xs: semanticTokens.typography.body.medium.fontSize,
                    md: semanticTokens.typography.body.large.fontSize,
                  },
                  lineHeight: 1.6,
                }}
              >
                {heroSubtitle}
              </Typography>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'transparent',
          mt: -8, // Overlap with hero
          position: 'relative',
          zIndex: 2,
          pb: 8,
          ...featuresSx,
        }}
      >
        <Container maxWidth={maxWidth}>
          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid
                key={feature.id}
                size={gridColumns[columns]}
                sx={columns === 5 ? { 
                  flexBasis: { lg: '20%' }, 
                  maxWidth: { lg: '20%' } 
                } : undefined}
              >
                <FeatureCard
                  variant={feature.variant}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  onClick={feature.onClick}
                  href={feature.href}
                  accentColor={feature.accentColor}
                  iconSize={feature.iconSize}
                  showArrow={feature.showArrow}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Additional Content */}
      {children}

      {/* Footer */}
      {footer}
    </Box>
  );
};

export default LandingPage;
