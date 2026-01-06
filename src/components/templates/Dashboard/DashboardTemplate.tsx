/**
 * @fileoverview Dashboard Template with KPI cards, charts grid, and activity feed
 * @module components/templates/Dashboard
 */

import * as React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Skeleton,
  Button,
  useTheme,
  Divider,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { semanticTokens } from '../../../tokens';

export interface KpiItem {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: number;
  icon?: React.ReactNode;
}

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  avatar?: string;
  icon?: React.ReactNode;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export interface DashboardTemplateProps {
  /** Page title */
  title?: string;
  /** Page subtitle/description */
  subtitle?: string;
  /** KPI cards data */
  kpis?: KpiItem[];
  /** Main chart content */
  mainChart?: React.ReactNode;
  /** Secondary charts (displayed in grid) */
  secondaryCharts?: React.ReactNode[];
  /** Activity feed items */
  activities?: ActivityItem[];
  /** Custom header actions */
  headerActions?: React.ReactNode;
  /** Callback for refresh action */
  onRefresh?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Last updated timestamp */
  lastUpdated?: string;
  /** Render custom KPI cards */
  renderKpi?: (kpi: KpiItem) => React.ReactNode;
  /** Render custom activity item */
  renderActivity?: (activity: ActivityItem) => React.ReactNode;
  /** Extra sidebar content */
  sidebarContent?: React.ReactNode;
  /** Number of columns for KPI grid */
  kpiColumns?: number;
  /** Show activity feed */
  showActivityFeed?: boolean;
}

const DefaultKpiCard: React.FC<{ kpi: KpiItem; loading?: boolean }> = ({ kpi, loading }) => {
  const theme = useTheme();
  
  const getTrendColor = () => {
    switch (kpi.trend) {
      case 'up': return theme.palette.success.main;
      case 'down': return theme.palette.error.main;
      default: return theme.palette.text.secondary;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        borderRadius: `${semanticTokens.borders.radius.card}px`,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {loading ? (
        <>
          <Skeleton width="60%" height={20} />
          <Skeleton width="40%" height={36} sx={{ mt: 1 }} />
          <Skeleton width="50%" height={16} sx={{ mt: 1 }} />
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            {kpi.icon && (
              <Box sx={{ color: theme.palette.primary.main }}>{kpi.icon}</Box>
            )}
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {kpi.title}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={700}>
            {kpi.value}
            {kpi.unit && (
              <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                {kpi.unit}
              </Typography>
            )}
          </Typography>
          {kpi.trend && kpi.trendValue !== undefined && (
            <Typography
              variant="caption"
              sx={{ color: getTrendColor(), fontWeight: 500, mt: 0.5, display: 'block' }}
            >
              {kpi.trendValue > 0 ? '+' : ''}{kpi.trendValue}% vs last period
            </Typography>
          )}
        </>
      )}
    </Paper>
  );
};

const DefaultActivityItem: React.FC<{ activity: ActivityItem }> = ({ activity }) => {
  const theme = useTheme();
  
  const getTypeColor = () => {
    switch (activity.type) {
      case 'success': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'error': return theme.palette.error.main;
      case 'info': return theme.palette.info.main;
      default: return theme.palette.primary.main;
    }
  };

  return (
    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
      <ListItemAvatar>
        <Avatar
          src={activity.avatar}
          sx={{
            width: 36,
            height: 36,
            bgcolor: activity.icon ? getTypeColor() : undefined,
          }}
        >
          {activity.icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={activity.title}
        secondary={
          <Box component="span">
            {activity.description && (
              <Typography component="span" variant="body2" color="text.secondary" display="block">
                {activity.description}
              </Typography>
            )}
            <Typography component="span" variant="caption" color="text.secondary">
              {activity.timestamp}
            </Typography>
          </Box>
        }
        primaryTypographyProps={{ fontWeight: 500, variant: 'body2' }}
      />
    </ListItem>
  );
};

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  title = 'Dashboard',
  subtitle,
  kpis = [],
  mainChart,
  secondaryCharts = [],
  activities = [],
  headerActions,
  onRefresh,
  loading = false,
  lastUpdated,
  renderKpi,
  renderActivity,
  sidebarContent,
  kpiColumns = 4,
  showActivityFeed = true,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
          {lastUpdated && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Last updated: {lastUpdated}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {headerActions}
          {onRefresh && (
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={onRefresh}
              size="small"
            >
              Refresh
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content Area */}
        <Grid size={{ xs: 12, lg: showActivityFeed ? 8 : 12 }}>
          {/* KPI Cards */}
          {kpis.length > 0 && (
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {kpis.map((kpi) => (
                <Grid key={kpi.id} size={{ xs: 12, sm: 6, md: 12 / kpiColumns }}>
                  {renderKpi ? renderKpi(kpi) : <DefaultKpiCard kpi={kpi} loading={loading} />}
                </Grid>
              ))}
            </Grid>
          )}

          {/* Main Chart */}
          {mainChart && (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: `${semanticTokens.borders.radius.card}px`,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              {loading ? (
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: `${semanticTokens.borders.radius.input}px` }} />
              ) : (
                mainChart
              )}
            </Paper>
          )}

          {/* Secondary Charts Grid */}
          {secondaryCharts.length > 0 && (
            <Grid container spacing={2}>
              {secondaryCharts.map((chart, index) => (
                <Grid key={index} size={{ xs: 12, md: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: `${semanticTokens.borders.radius.card}px`,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    {loading ? (
                      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: `${semanticTokens.borders.radius.input}px` }} />
                    ) : (
                      chart
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* Activity Feed Sidebar */}
        {showActivityFeed && (
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: `${semanticTokens.borders.radius.card}px`,
                border: `1px solid ${theme.palette.divider}`,
                position: 'sticky',
                top: semanticTokens.spacing.component.paddingMd, // 16px
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Recent Activity
              </Typography>
              
              {loading ? (
                <Box>
                  {[1, 2, 3, 4].map((i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Skeleton variant="circular" width={36} height={36} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton width="80%" height={20} />
                        <Skeleton width="60%" height={16} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : activities.length > 0 ? (
                <List disablePadding>
                  {activities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      {renderActivity ? renderActivity(activity) : <DefaultActivityItem activity={activity} />}
                      {index < activities.length - 1 && <Divider component="li" sx={{ my: 1 }} />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                  No recent activity
                </Typography>
              )}

              {/* Extra Sidebar Content */}
              {sidebarContent && (
                <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                  {sidebarContent}
                </Box>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
