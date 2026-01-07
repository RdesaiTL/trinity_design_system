import * as React from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InputIcon from '@mui/icons-material/Input';
import DataObjectIcon from '@mui/icons-material/DataObject';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LayersIcon from '@mui/icons-material/Layers';
import NavigationIcon from '@mui/icons-material/Navigation';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ScienceIcon from '@mui/icons-material/Science';
import HomeIcon from '@mui/icons-material/Home';

/** Width of the sidebar drawer in pixels */
const drawerWidth = 280;

/**
 * Props for the Layout component.
 */
interface LayoutProps {
  /** Main content to render in the layout body */
  children: React.ReactNode;
  /** Currently active page identifier (e.g., 'button', 'avatar') */
  currentPage: string;
  /** Callback fired when a navigation item is clicked */
  onPageChange: (page: string) => void;
  /** Whether dark mode is currently enabled */
  darkMode: boolean;
  /** Callback to toggle between light and dark themes */
  onToggleDarkMode: () => void;
}

const navCategories = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <HomeIcon />,
    items: [],
  },
  {
    id: 'inputs',
    label: 'Inputs',
    icon: <InputIcon />,
    items: [
      { id: 'autocomplete', label: 'Autocomplete' },
      { id: 'button', label: 'Button' },
      { id: 'button-group', label: 'Button Group' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'fab', label: 'Floating Action Button' },
      { id: 'radio', label: 'Radio Group' },
      { id: 'rating', label: 'Rating' },
      { id: 'select', label: 'Select' },
      { id: 'slider', label: 'Slider' },
      { id: 'switch', label: 'Switch' },
      { id: 'text-field', label: 'Text Field' },
      { id: 'toggle-button', label: 'Toggle Button' },
    ],
  },
  {
    id: 'data-display',
    label: 'Data Display',
    icon: <DataObjectIcon />,
    items: [
      { id: 'avatar', label: 'Avatar' },
      { id: 'badge', label: 'Badge' },
      { id: 'chip', label: 'Chip' },
      { id: 'divider', label: 'Divider' },
      { id: 'list', label: 'List' },
      { id: 'table', label: 'Table' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'typography', label: 'Typography' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: <FeedbackIcon />,
    items: [
      { id: 'alert', label: 'Alert' },
      { id: 'backdrop', label: 'Backdrop' },
      { id: 'dialog', label: 'Dialog' },
      { id: 'progress', label: 'Progress' },
      { id: 'skeleton', label: 'Skeleton' },
      { id: 'snackbar', label: 'Snackbar' },
    ],
  },
  {
    id: 'surfaces',
    label: 'Surfaces',
    icon: <LayersIcon />,
    items: [
      { id: 'accordion', label: 'Accordion' },
      { id: 'app-bar', label: 'App Bar' },
      { id: 'card', label: 'Card' },
      { id: 'paper', label: 'Paper' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    icon: <NavigationIcon />,
    items: [
      { id: 'bottom-navigation', label: 'Bottom Navigation' },
      { id: 'breadcrumbs', label: 'Breadcrumbs' },
      { id: 'drawer', label: 'Drawer' },
      { id: 'link', label: 'Link' },
      { id: 'menu', label: 'Menu' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'speed-dial', label: 'Speed Dial' },
      { id: 'stepper', label: 'Stepper' },
      { id: 'tabs', label: 'Tabs' },
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    icon: <ViewQuiltIcon />,
    items: [
      { id: 'box', label: 'Box' },
      { id: 'container', label: 'Container' },
      { id: 'grid', label: 'Grid' },
      { id: 'stack', label: 'Stack' },
      { id: 'image-list', label: 'Image List' },
    ],
  },
  {
    id: 'utils',
    label: 'Utils & Lab',
    icon: <ScienceIcon />,
    items: [
      { id: 'modal', label: 'Modal' },
      { id: 'popover', label: 'Popover' },
      { id: 'transitions', label: 'Transitions' },
      { id: 'timeline', label: 'Timeline' },
    ],
  },
];

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentPage,
  onPageChange,
  darkMode,
  onToggleDarkMode,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openCategories, setOpenCategories] = React.useState<string[]>(['inputs']);
  const theme = useTheme();

  const handleCategoryClick = (categoryId: string, hasItems: boolean) => {
    if (!hasItems) {
      onPageChange(categoryId);
      return;
    }
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" fontWeight={700} color="primary">
          Trinity Design
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1 }}>
        {navCategories.map((category) => (
          <React.Fragment key={category.id}>
            <ListItem disablePadding>
              <ListItemButton
                selected={currentPage === category.id}
                onClick={() => handleCategoryClick(category.id, category.items.length > 0)}
                sx={{
                  borderRadius: '8px',
                  mb: 0.5,
                  '&.Mui-selected': {
                    bgcolor: theme.palette.primary.main + '15',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{category.icon}</ListItemIcon>
                <ListItemText primary={category.label} />
                {category.items.length > 0 && (
                  openCategories.includes(category.id) ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>
            {category.items.length > 0 && (
              <Collapse in={openCategories.includes(category.id)} timeout="auto">
                <List component="div" disablePadding>
                  {category.items.map((item) => (
                    <ListItemButton
                      key={item.id}
                      selected={currentPage === item.id}
                      onClick={() => {
                        onPageChange(item.id);
                        setMobileOpen(false);
                      }}
                      sx={{
                        pl: 6,
                        py: 0.5,
                        borderRadius: '8px',
                        mb: 0.25,
                        '&.Mui-selected': {
                          bgcolor: theme.palette.primary.main + '15',
                        },
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: '0.875rem' }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Component Library
          </Typography>
          <IconButton onClick={onToggleDarkMode} sx={{ color: 'text.primary' }}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
