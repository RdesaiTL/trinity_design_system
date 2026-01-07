import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';
import { Layout } from '../components/Layout';

/**
 * The Layout component provides a complete application shell with:
 * - Responsive sidebar navigation with collapsible categories
 * - Dark/light mode toggle
 * - Mobile-friendly drawer behavior
 * - Pre-configured navigation structure for component demos
 * 
 * ## Usage
 * 
 * The Layout component is typically used as the root wrapper for your application:
 * 
 * ```tsx
 * import { Layout } from '@trinity/design-system';
 * 
 * function App() {
 *   const [darkMode, setDarkMode] = useState(false);
 *   const [currentPage, setCurrentPage] = useState('overview');
 * 
 *   return (
 *     <Layout
 *       currentPage={currentPage}
 *       onPageChange={setCurrentPage}
 *       darkMode={darkMode}
 *       onToggleDarkMode={() => setDarkMode(!darkMode)}
 *     >
 *       {/* Your page content *\/}
 *     </Layout>
 *   );
 * }
 * ```
 * 
 * ## Navigation Structure
 * 
 * The sidebar is organized into collapsible categories:
 * - **Overview** - Home page
 * - **Inputs** - Form controls (Button, TextField, etc.)
 * - **Data Display** - Visual components (Avatar, Chip, etc.)
 * - **Feedback** - User feedback (Alert, Dialog, etc.)
 * - **Surfaces** - Container components (Card, Paper, etc.)
 * - **Navigation** - Navigation components (Tabs, Menu, etc.)
 * - **Layout** - Layout utilities (Grid, Stack, etc.)
 * - **Lab** - Experimental components
 */

// Sample page content component
const SamplePageContent = ({ page }: { page: string }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        {page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ')}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Content Area
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              This is the main content area. The Layout component provides a responsive
              shell with a sidebar for navigation and a header with theme toggle.
            </Typography>
            <Button variant="contained" sx={{ mr: 2 }}>
              Primary Action
            </Button>
            <Button variant="outlined">
              Secondary Action
            </Button>
          </Paper>
          
          <Grid container spacing={2}>
            {[1, 2, 3].map((item) => (
              <Grid size={{ xs: 12, sm: 4 }} key={item}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Card {item}</Typography>
                    <Typography color="text.secondary">
                      Sample card content demonstrating the layout.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Sidebar Content
            </Typography>
            <Typography color="text.secondary">
              Additional content can be placed here. The layout is fully responsive
              and adapts to different screen sizes.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Interactive wrapper for Storybook
const LayoutDemo = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');

  return (
    <Box sx={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Layout
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      >
        <SamplePageContent page={currentPage} />
      </Layout>
    </Box>
  );
};

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Layout component provides a complete application shell with sidebar navigation,
dark mode toggle, and responsive behavior.

### Features

- **Responsive Sidebar**: Collapsible drawer on mobile, persistent on desktop
- **Category Navigation**: Expandable sections for organizing components
- **Theme Toggle**: Built-in dark/light mode switch
- **Active State**: Highlights current page in navigation
- **Trinity Branding**: Styled with Trinity design tokens

### Props

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Page content to render in the main area |
| currentPage | string | ID of the currently active page |
| onPageChange | (page: string) => void | Callback when navigation item is clicked |
| darkMode | boolean | Current theme mode |
| onToggleDarkMode | () => void | Callback to toggle theme |
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default Layout with interactive navigation and theme toggle.
 * Click items in the sidebar to see the navigation in action.
 */
export const Default: Story = {
  render: () => <LayoutDemo />,
};

const DarkModeDemo = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  
  return (
    <Box sx={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Layout
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        darkMode={true}
        onToggleDarkMode={() => {}}
      >
        <SamplePageContent page={currentPage} />
      </Layout>
    </Box>
  );
};

/**
 * Layout in dark mode. Toggle the theme using the moon/sun icon in the header.
 */
export const DarkMode: Story = {
  render: () => <DarkModeDemo />,
};

const WithSelectedPageDemo = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <Box sx={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Layout
        currentPage="button"
        onPageChange={() => {}}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      >
        <SamplePageContent page="button" />
      </Layout>
    </Box>
  );
};

/**
 * Example showing the Layout with a specific page selected.
 */
export const WithSelectedPage: Story = {
  render: () => <WithSelectedPageDemo />,
};
