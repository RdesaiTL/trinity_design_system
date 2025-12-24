import * as React from 'react';
import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Drawer, AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, useMediaQuery, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import InputIcon from '@mui/icons-material/Input';
import ViewListIcon from '@mui/icons-material/ViewList';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LayersIcon from '@mui/icons-material/Layers';
import NavigationIcon from '@mui/icons-material/Navigation';
import GridViewIcon from '@mui/icons-material/GridView';

import { lightTheme, darkTheme } from './theme';
import * as Pages from './pages';

const drawerWidth = 280;

interface NavItem {
  id: string;
  label: string;
}

interface NavCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const navCategories: NavCategory[] = [
  {
    id: 'design',
    label: 'Design System',
    icon: <GridViewIcon />,
    items: [
      { id: 'color-accessibility', label: 'Color Accessibility' },
      { id: 'icons', label: 'Icons' },
    ],
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
      { id: 'file-upload', label: 'File Upload' },
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
    icon: <ViewListIcon />,
    items: [
      { id: 'ai', label: 'AI Components' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'badge', label: 'Badge' },
      { id: 'chip', label: 'Chip' },
      { id: 'data-table', label: 'Data Table' },
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
      { id: 'dialog', label: 'Dialog' },
      { id: 'empty-states', label: 'Empty States' },
      { id: 'loader', label: 'Loader' },
      { id: 'modal', label: 'Modal' },
      { id: 'progress', label: 'Progress' },
      { id: 'skeleton', label: 'Skeleton' },
      { id: 'snackbar', label: 'Snackbar' },
      { id: 'status-indicator', label: 'Status Indicator' },
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
      { id: 'header-demo', label: 'Top Nav Header' },
      { id: 'sidebar-demo', label: 'Top Nav with Sidebar' },
      { id: 'link', label: 'Link' },
      { id: 'menu', label: 'Menu' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'stepper', label: 'Stepper' },
      { id: 'tabs', label: 'Tabs' },
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    icon: <GridViewIcon />,
    items: [
      { id: 'box', label: 'Box' },
      { id: 'container', label: 'Container' },
      { id: 'grid', label: 'Grid' },
      { id: 'stack', label: 'Stack' },
      { id: 'image-list', label: 'Image List' },
    ],
  },
];

const pageMap: Record<string, React.FC> = {
  overview: Pages.OverviewPage,
  // Design System
  'color-accessibility': Pages.ColorAccessibilityPage,
  icons: Pages.IconsPage,
  // Inputs
  autocomplete: Pages.AutocompletePage,
  button: Pages.ButtonPage,
  'button-group': Pages.ButtonGroupPage,
  checkbox: Pages.CheckboxPage,
  fab: Pages.FabPage,
  'file-upload': Pages.FileUploadPage,
  radio: Pages.RadioPage,
  rating: Pages.RatingPage,
  select: Pages.SelectPage,
  slider: Pages.SliderPage,
  switch: Pages.SwitchPage,
  'text-field': Pages.TextFieldPage,
  'toggle-button': Pages.ToggleButtonPage,
  // Data Display
  ai: Pages.AIPage,
  avatar: Pages.AvatarPage,
  badge: Pages.BadgePage,
  chip: Pages.ChipPage,
  'data-table': Pages.DataTablePage,
  divider: Pages.DividerPage,
  list: Pages.ListPage,
  table: Pages.TablePage,
  tooltip: Pages.TooltipPage,
  typography: Pages.TypographyPage,
  // Feedback
  alert: Pages.AlertPage,
  dialog: Pages.DialogPage,
  'empty-states': Pages.EmptyStatesPage,
  loader: Pages.LoaderPage,
  modal: Pages.ModalPage,
  progress: Pages.ProgressPage,
  skeleton: Pages.SkeletonPage,
  snackbar: Pages.SnackbarPage,
  'status-indicator': Pages.StatusIndicatorPage,
  // Surfaces
  accordion: Pages.AccordionPage,
  'app-bar': Pages.AppBarPage,
  card: Pages.CardPage,
  paper: Pages.PaperPage,
  // Navigation
  'bottom-navigation': Pages.BottomNavigationPage,
  breadcrumbs: Pages.BreadcrumbsPage,
  'header-demo': Pages.HeaderDemoPage,
  'sidebar-demo': Pages.SidebarDemoPage,
  link: Pages.LinkPage,
  menu: Pages.MenuPage,
  pagination: Pages.PaginationPage,
  stepper: Pages.StepperPage,
  tabs: Pages.TabsPage,
  // Layout
  box: Pages.BoxPage,
  container: Pages.ContainerPage,
  grid: Pages.GridPage,
  stack: Pages.StackPage,
  'image-list': Pages.ImageListPage,
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    inputs: true,
  });

  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCategoryClick = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handlePageSelect = (pageId: string) => {
    setCurrentPage(pageId);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const CurrentPageComponent = pageMap[currentPage] || Pages.OverviewPage;

  // Pages that have their own full layout (header + sidebar)
  const fullLayoutPages = ['sidebar-demo', 'header-demo'];
  const isFullLayoutPage = fullLayoutPages.includes(currentPage);

  const drawerContent = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap fontWeight={700} color="primary">
          Trinity Design
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={currentPage === 'overview'}
            onClick={() => handlePageSelect('overview')}
          >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {navCategories.map((category) => (
          <React.Fragment key={category.id}>
            <ListItemButton onClick={() => handleCategoryClick(category.id)}>
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText primary={category.label} />
              {openCategories[category.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategories[category.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.items.map((item) => (
                  <ListItemButton
                    key={item.id}
                    sx={{ pl: 4 }}
                    selected={currentPage === item.id}
                    onClick={() => handlePageSelect(item.id)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Full layout pages render without the default App shell */}
      {isFullLayoutPage ? (
        <CurrentPageComponent />
      ) : (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <AppBar
            position="fixed"
            sx={{
              width: { md: `calc(100% - ${drawerWidth}px)` },
              ml: { md: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                Component Library
              </Typography>
              <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>

          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          >
            {/* Mobile drawer */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawerContent}
            </Drawer>
            {/* Desktop drawer */}
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawerContent}
            </Drawer>
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { md: `calc(100% - ${drawerWidth}px)` },
              mt: 8,
              minHeight: '100vh',
            }}
          >
            <CurrentPageComponent />
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}