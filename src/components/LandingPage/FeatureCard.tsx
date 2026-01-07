/**
 * @fileoverview FeatureCard component for Trinity Landing Page template.
 * Displays a feature/service card with icon, title, description, and action indicator.
 *
 * @example
 * ```tsx
 * import { FeatureCard } from '@trinity/design-system';
 * import { gradientIcons } from '@trinity/design-system/assets';
 *
 * <FeatureCard
 *   variant="navy"
 *   icon={gradientIcons.ai}
 *   title="AI Research Platform"
 *   description="Get insights in seconds with our AI-powered research tools."
 *   onClick={() => navigate('/research')}
 * />
 * ```
 *
 * @module components/LandingPage/FeatureCard
 */

import * as React from 'react';
import { Box, Typography, Card, CardActionArea, SxProps, Theme } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { brandColors, semanticTokens } from '../../tokens';

export interface FeatureCardProps {
  /**
   * Card color variant
   * - 'navy': Dark navy background with white text
   * - 'white': White background with dark text
   * @default 'navy'
   */
  variant?: 'navy' | 'white';

  /**
   * Icon to display (use gradientIcons from assets)
   * Can be a string URL or React node
   */
  icon: string | React.ReactNode;

  /**
   * Card title
   */
  title: string;

  /**
   * Card description text
   */
  description: string;

  /**
   * Click handler for the card
   */
  onClick?: () => void;

  /**
   * Optional href for link-based navigation
   */
  href?: string;

  /**
   * Accent color for the divider bar
   * @default brandColors.secondary.main (coral)
   */
  accentColor?: string;

  /**
   * Icon size in pixels
   * @default 64
   */
  iconSize?: number;

  /**
   * Whether to show the arrow indicator
   * @default true
   */
  showArrow?: boolean;

  /**
   * Additional styles
   */
  sx?: SxProps<Theme>;
}

/**
 * FeatureCard - A card component for showcasing features/services on landing pages.
 *
 * Features:
 * - Two variants: navy (dark) and white (light)
 * - Gradient icon support
 * - Coral accent divider
 * - Hover effects with subtle lift
 * - Accessible with proper ARIA labels
 *
 * @accessibility
 * - Uses semantic heading structure (h3 for title)
 * - CardActionArea provides keyboard navigation
 * - Sufficient color contrast (WCAG AA compliant)
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  variant = 'navy',
  icon,
  title,
  description,
  onClick,
  href,
  accentColor = brandColors.secondary.main,
  iconSize = 64,
  showArrow = true,
  sx,
}) => {
  const isNavy = variant === 'navy';

  // Color scheme based on variant
  const colors = {
    background: isNavy ? brandColors.primary.main : brandColors.neutral.white,
    title: isNavy ? brandColors.neutral.white : brandColors.primary.main,
    description: isNavy ? 'rgba(255, 255, 255, 0.8)' : brandColors.neutral.gray600,
    arrow: isNavy ? 'rgba(255, 255, 255, 0.6)' : brandColors.neutral.gray400,
    arrowHover: isNavy ? brandColors.neutral.white : brandColors.primary.main,
  };

  const cardContent = (
    <Box
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 280,
      }}
    >
      {/* Icon */}
      <Box sx={{ mb: 2 }}>
        {typeof icon === 'string' ? (
          <Box
            component="img"
            src={icon}
            alt=""
            aria-hidden="true"
            sx={{
              width: iconSize,
              height: iconSize,
              objectFit: 'contain',
            }}
          />
        ) : (
          <Box sx={{ width: iconSize, height: iconSize }}>{icon}</Box>
        )}
      </Box>

      {/* Accent Divider */}
      <Box
        sx={{
          width: 40,
          height: 3,
          backgroundColor: accentColor,
          borderRadius: 1,
          mb: 2,
        }}
      />

      {/* Title */}
      <Typography
        variant="h6"
        component="h3"
        sx={{
          color: colors.title,
          fontWeight: 600,
          mb: 1.5,
          fontSize: semanticTokens.typography.heading.h6.fontSize,
        }}
      >
        {title}
      </Typography>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{
          color: colors.description,
          lineHeight: 1.6,
          flex: 1,
          fontSize: semanticTokens.typography.body.small.fontSize,
        }}
      >
        {description}
      </Typography>

      {/* Arrow Indicator */}
      {showArrow && (
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            '& .arrow-icon': {
              color: colors.arrow,
              transition: 'color 0.2s ease, transform 0.2s ease',
            },
          }}
        >
          <ChevronRightIcon className="arrow-icon" />
        </Box>
      )}
    </Box>
  );

  // Handle link navigation
  const handleClick = href
    ? () => {
        window.location.href = href;
      }
    : onClick;

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: colors.background,
        borderRadius: `${semanticTokens.borders.radius.card}px`,
        height: '100%',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isNavy
            ? '0 12px 24px rgba(5, 7, 66, 0.3)'
            : '0 12px 24px rgba(0, 0, 0, 0.1)',
          '& .arrow-icon': {
            color: colors.arrowHover,
            transform: 'translateX(4px)',
          },
        },
        ...sx,
      }}
    >
      {handleClick ? (
        <CardActionArea
          onClick={handleClick}
          sx={{ height: '100%' }}
          aria-label={`${title} - ${description}`}
        >
          {cardContent}
        </CardActionArea>
      ) : (
        cardContent
      )}
    </Card>
  );
};

export default FeatureCard;
