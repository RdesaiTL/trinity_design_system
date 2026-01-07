import React, { useState } from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Stack,
  Skeleton,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { brandColors } from '../../tokens';

export interface BreadcrumbItem {
  /** Label to display */
  label: string;
  /** Optional href for navigation. Last item typically has no href. */
  href?: string;
  /** Optional icon to display before label */
  icon?: React.ReactNode;
}

export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Breadcrumb navigation items */
  breadcrumbs?: BreadcrumbItem[];
  /** Whether to show breadcrumbs */
  showBreadcrumbs?: boolean;
  /** Tab labels for sub-navigation */
  tabs?: string[];
  /** Currently selected tab index */
  selectedTab?: number;
  /** Callback when tab changes */
  onTabChange?: (index: number) => void;
  /** Primary action button label */
  primaryAction?: string;
  /** Primary action click handler */
  onPrimaryAction?: () => void;
  /** Secondary action button label */
  secondaryAction?: string;
  /** Secondary action click handler */
  onSecondaryAction?: () => void;
  /** Additional action buttons/elements */
  actions?: React.ReactNode;
  /** Icon to display next to title */
  icon?: React.ReactNode;
  /** Status badge label */
  statusLabel?: string;
  /** Status badge color */
  statusColor?: 'success' | 'warning' | 'error' | 'info' | 'default';
  /** Visual variant */
  variant?: 'default' | 'compact' | 'hero';
  /** Hero background image URL */
  heroImage?: string;
  /** Whether the header is in loading state */
  loading?: boolean;
  /** Additional content below title area */
  children?: React.ReactNode;
  /** Custom styles */
  sx?: object;
}

/**
 * PageHeader provides a consistent header pattern for pages within Trinity applications.
 * It includes breadcrumb navigation, page title, description, contextual actions, and optional tab navigation.
 *
 * @example
 * ```tsx
 * <PageHeader
 *   title="Dashboard"
 *   subtitle="Overview of your analytics"
 *   breadcrumbs={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Analytics', href: '/analytics' },
 *     { label: 'Dashboard' }
 *   ]}
 *   primaryAction="Create Report"
 *   onPrimaryAction={() => console.log('Create clicked')}
 *   tabs={['Overview', 'Details', 'Settings']}
 *   selectedTab={0}
 *   onTabChange={(index) => console.log('Tab:', index)}
 * />
 * ```
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs = [],
  showBreadcrumbs = true,
  tabs,
  selectedTab = 0,
  onTabChange,
  primaryAction,
  onPrimaryAction,
  secondaryAction,
  onSecondaryAction,
  actions,
  icon,
  statusLabel,
  statusColor = 'success',
  variant = 'default',
  heroImage,
  loading = false,
  children,
  sx,
}) => {
  const [tabValue, setTabValue] = useState(selectedTab);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    onTabChange?.(newValue);
  };

  const isHero = variant === 'hero';
  const isCompact = variant === 'compact';

  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          p: isCompact ? 2 : 3,
          ...sx,
        }}
      >
        <Skeleton width={200} height={20} sx={{ mb: 2 }} />
        <Skeleton width={300} height={32} sx={{ mb: 1 }} />
        <Skeleton width={400} height={20} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: isHero ? brandColors.primary.main : 'background.paper',
        color: isHero ? 'white' : 'text.primary',
        borderBottom: !isHero ? '1px solid' : 'none',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Hero Background Image */}
      {isHero && heroImage && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(to right, ${brandColors.primary.main}, transparent)`,
            },
          }}
        />
      )}

      <Box sx={{ position: 'relative', p: isCompact ? 2 : 3 }}>
        {/* Breadcrumbs */}
        {showBreadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs
            separator={
              <NavigateNextIcon
                fontSize="small"
                sx={{ color: isHero ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}
              />
            }
            aria-label="breadcrumb"
            sx={{ mb: 2 }}
          >
            {breadcrumbs.map((crumb, index) =>
              crumb.href ? (
                <Link
                  key={index}
                  href={crumb.href}
                  underline="hover"
                  sx={{
                    color: isHero ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: isHero ? 'white' : 'text.primary',
                    },
                  }}
                >
                  {index === 0 && !crumb.icon && <HomeIcon fontSize="small" />}
                  {crumb.icon}
                  {crumb.label}
                </Link>
              ) : (
                <Typography
                  key={index}
                  sx={{
                    color: isHero ? 'white' : 'text.primary',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {crumb.label}
                </Typography>
              )
            )}
          </Breadcrumbs>
        )}

        {/* Title Row */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          {/* Title Area */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {icon && (
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  bgcolor: isHero ? 'rgba(255,255,255,0.1)' : 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& .MuiSvgIcon-root': {
                    fontSize: 28,
                    color: isHero ? 'white' : brandColors.primary.main,
                  },
                }}
              >
                {icon}
              </Box>
            )}
            <Box>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography
                  variant={isCompact ? 'h6' : 'h5'}
                  component="h1"
                  fontWeight={600}
                >
                  {title}
                </Typography>
                {statusLabel && (
                  <Chip
                    label={statusLabel}
                    size="small"
                    color={statusColor}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                    }}
                  />
                )}
              </Stack>
              {subtitle && (
                <Typography
                  variant="body2"
                  sx={{
                    color: isHero ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                    mt: 0.5,
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Actions */}
          <Stack direction="row" spacing={1} alignItems="center">
            {actions}
            {secondaryAction && (
              <Button
                variant="outlined"
                onClick={onSecondaryAction}
                sx={{
                  borderColor: isHero ? 'rgba(255,255,255,0.5)' : undefined,
                  color: isHero ? 'white' : undefined,
                  '&:hover': {
                    borderColor: isHero ? 'white' : undefined,
                    bgcolor: isHero ? 'rgba(255,255,255,0.1)' : undefined,
                  },
                }}
              >
                {secondaryAction}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant="contained"
                onClick={onPrimaryAction}
                sx={{
                  bgcolor: isHero ? 'white' : undefined,
                  color: isHero ? brandColors.primary.main : undefined,
                  '&:hover': {
                    bgcolor: isHero ? 'rgba(255,255,255,0.9)' : undefined,
                  },
                }}
              >
                {primaryAction}
              </Button>
            )}
            {!isCompact && (
              <IconButton
                size="small"
                aria-label="More actions"
                sx={{
                  color: isHero ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>

        {/* Custom Content */}
        {children && <Box sx={{ mt: 2 }}>{children}</Box>}

        {/* Tab Navigation */}
        {tabs && tabs.length > 0 && (
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              mt: 2,
              borderBottom: isHero ? 'none' : '1px solid',
              borderColor: 'divider',
              '& .MuiTab-root': {
                color: isHero ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                minHeight: 48,
                textTransform: 'none',
                fontWeight: 500,
                '&.Mui-selected': {
                  color: isHero ? 'white' : brandColors.primary.main,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: isHero ? 'white' : brandColors.primary.main,
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} />
            ))}
          </Tabs>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader;
