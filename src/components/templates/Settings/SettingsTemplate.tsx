/**
 * @fileoverview Settings Template with sidebar navigation and form sections
 * @module components/templates/Settings
 */

import * as React from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  Breadcrumbs,
  Link,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronRight as ChevronIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { semanticTokens } from '../../../tokens';

export interface SettingsNavItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon */
  icon?: React.ReactNode;
  /** Description */
  description?: string;
  /** Badge content */
  badge?: string | number;
  /** Disabled state */
  disabled?: boolean;
  /** Sub-items */
  children?: SettingsNavItem[];
}

export interface SettingsSection {
  /** Section identifier (matches nav item id) */
  id: string;
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Section content */
  content: React.ReactNode;
}

export interface SettingsTemplateProps {
  /** Page title */
  title?: string;
  /** Navigation items */
  navItems: SettingsNavItem[];
  /** Content sections */
  sections: SettingsSection[];
  /** Currently active section */
  activeSection?: string;
  /** Callback when section changes */
  onSectionChange?: (sectionId: string) => void;
  /** Show save button in header */
  showSaveButton?: boolean;
  /** Save button label */
  saveButtonLabel?: string;
  /** Callback when save is clicked */
  onSave?: () => void;
  /** Save button loading state */
  saving?: boolean;
  /** Breadcrumb items */
  breadcrumbs?: { label: string; href?: string }[];
  /** Header actions */
  headerActions?: React.ReactNode;
  /** Sidebar width */
  sidebarWidth?: number;
  /** Show section dividers */
  showDividers?: boolean;
  /** Sticky sidebar */
  stickySidebar?: boolean;
}

const SettingsNavItemComponent: React.FC<{
  item: SettingsNavItem;
  active: boolean;
  onClick: () => void;
  depth?: number;
}> = ({ item, active, onClick, depth = 0 }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(active);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          selected={active && !hasChildren}
          disabled={item.disabled}
          onClick={() => {
            if (hasChildren) {
              setExpanded(!expanded);
            } else {
              onClick();
            }
          }}
          sx={{
            pl: 2 + depth * 2,
            pr: 2,
            py: 1.25,
            borderRadius: `${semanticTokens.borders.radius.input}px`,
            mx: 1,
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
              },
              '& .MuiListItemIcon-root': {
                color: theme.palette.primary.main,
              },
            },
          }}
        >
          {item.icon && (
            <ListItemIcon sx={{ minWidth: 36, color: active ? 'inherit' : 'text.secondary' }}>
              {item.icon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.label}
            secondary={depth === 0 ? item.description : undefined}
            primaryTypographyProps={{
              fontWeight: active ? 600 : 400,
              variant: 'body2',
            }}
            secondaryTypographyProps={{
              variant: 'caption',
              sx: { mt: 0.25 },
            }}
          />
          {item.badge && (
            <Box
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: `${semanticTokens.borders.radius.pill}px`,
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                fontSize: semanticTokens.typography.label.small.fontSize,
                fontWeight: 600,
                minWidth: 20,
                textAlign: 'center',
              }}
            >
              {item.badge}
            </Box>
          )}
          {hasChildren && (
            <ChevronIcon
              fontSize="small"
              sx={{
                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: `transform ${semanticTokens.motion.duration.fast}`,
                color: theme.palette.text.secondary,
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
      {hasChildren && expanded && (
        <Box>
          {item.children!.map((child) => (
            <SettingsNavItemComponent
              key={child.id}
              item={child}
              active={false} // You'd need to track this properly
              onClick={onClick}
              depth={depth + 1}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export const SettingsTemplate: React.FC<SettingsTemplateProps> = ({
  title = 'Settings',
  navItems,
  sections,
  activeSection: controlledActiveSection,
  onSectionChange,
  showSaveButton = true,
  saveButtonLabel = 'Save changes',
  onSave,
  saving = false,
  breadcrumbs,
  headerActions,
  sidebarWidth = 280,
  showDividers = true,
  stickySidebar = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [internalActiveSection, setInternalActiveSection] = React.useState(
    navItems[0]?.id || sections[0]?.id || ''
  );

  const activeSection = controlledActiveSection ?? internalActiveSection;

  const handleSectionChange = (sectionId: string) => {
    if (controlledActiveSection === undefined) {
      setInternalActiveSection(sectionId);
    }
    onSectionChange?.(sectionId);
    setMobileOpen(false);
  };

  const currentSection = sections.find((s) => s.id === activeSection);

  const sidebarContent = (
    <Box sx={{ py: 1 }}>
      <List disablePadding>
        {navItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <SettingsNavItemComponent
              item={item}
              active={activeSection === item.id}
              onClick={() => handleSectionChange(item.id)}
            />
            {showDividers && index < navItems.length - 1 && item.children === undefined && (
              <Divider sx={{ my: 1, mx: 2 }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs sx={{ mb: 1 }}>
              {breadcrumbs.map((crumb, index) => (
                index === breadcrumbs.length - 1 ? (
                  <Typography key={index} variant="body2" color="text.primary">
                    {crumb.label}
                  </Typography>
                ) : (
                  <Link
                    key={index}
                    href={crumb.href}
                    underline="hover"
                    color="text.secondary"
                    variant="body2"
                  >
                    {crumb.label}
                  </Link>
                )
              ))}
            </Breadcrumbs>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h4" fontWeight={700}>
              {title}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {headerActions}
          {showSaveButton && onSave && (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={onSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : saveButtonLabel}
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Sidebar - Desktop */}
        {!isMobile && (
          <Paper
            elevation={0}
            sx={{
              width: sidebarWidth,
              flexShrink: 0,
              borderRadius: `${semanticTokens.borders.radius.card}px`,
              border: `1px solid ${theme.palette.divider}`,
              alignSelf: 'flex-start',
              position: stickySidebar ? 'sticky' : 'relative',
              top: stickySidebar ? semanticTokens.spacing.component.paddingMd : undefined, // 16px
            }}
          >
            {sidebarContent}
          </Paper>
        )}

        {/* Sidebar - Mobile */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: sidebarWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                {title}
              </Typography>
            </Box>
            <Divider />
            {sidebarContent}
          </Drawer>
        )}

        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {currentSection ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: `${semanticTokens.borders.radius.card}px`,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {currentSection.title}
              </Typography>
              {currentSection.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  {currentSection.description}
                </Typography>
              )}
              <Divider sx={{ mb: 4 }} />
              {currentSection.content}
            </Paper>
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: `${semanticTokens.borders.radius.card}px`,
                border: `1px solid ${theme.palette.divider}`,
                textAlign: 'center',
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Select a section from the menu
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};
