import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { AppLayout, ChatMessage, NavItem, AIFabLayout } from '../components/AppLayout';
import { brandColors } from '../tokens';
import { semanticTokens } from '../tokens';
import {
  CodeBlock,
  SampleDashboard,
  sampleUser,
  sampleClients,
  getAIResponse,
} from './utils';

const meta: Meta<typeof AppLayout> = {
  title: 'Templates/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AppLayout Template

A complete application layout template that provides a ready-to-use structure for Trinity-based applications.

## Features

- **Top Navigation Header** - With search, notifications, and user menu
- **Collapsible Sidebar** - Navigation with badges and special items
- **Resizable AI Panel** - Insight Engine chat interface that opens on demand
- **Responsive Design** - Adapts to different screen sizes

## Usage

\`\`\`tsx
import { AppLayout } from '@trinity/design-system';

function App() {
  return (
    <AppLayout
      appTitle="My App"
      enableInsightEngine
      onInsightEngineSend={(msg) => handleAIMessage(msg)}
    >
      <YourContent />
    </AppLayout>
  );
}
\`\`\`

## Key Interactions

1. **Sidebar Toggle** - Click the hamburger menu or the chevron at the bottom
2. **Insight Engine** - Click "Insight Engine" in the sidebar to open the AI panel
3. **Resize Panel** - Drag the left edge of the AI panel to resize it
4. **Fullscreen Mode** - Click the fullscreen icon in the panel header to expand
5. **Close Panel** - Click the X icon or "Insight Engine" nav item again
        `,
      },
    },
  },
  argTypes: {
    appTitle: {
      control: 'text',
      description: 'Application title shown in the header',
    },
    enableInsightEngine: {
      control: 'boolean',
      description: 'Enable the AI Insight Engine panel feature',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo nav items - uses base items from shared helpers, with custom additions
const demoNavItems: NavItem[] = [
  { id: 'home', label: 'Dashboard', icon: <HomeIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <AssessmentIcon />, badge: 3 },
  { id: 'contacts', label: 'Contacts', icon: <PeopleIcon /> },
  { id: 'documents', label: 'Documents', icon: <FolderIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  { id: 'insight-engine', label: 'Insight Engine', icon: <AutoAwesomeIcon />, isSpecial: true },
];

// ============================================================================
// DEMO WRAPPER COMPONENTS
// ============================================================================

/**
 * InteractiveAppLayout - Reusable wrapper for interactive AppLayout demos
 */
const InteractiveAppLayout: React.FC<{ 
  initialPanelOpen?: boolean;
  showDashboard?: boolean;
}> = ({ initialPanelOpen = false, showDashboard = true }) => {
  const [selectedNav, setSelectedNav] = useState('home');
  const [insightPanelOpen, setInsightPanelOpen] = useState(initialPanelOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = useCallback((message: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const response = getAIResponse(message);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1000);
  }, []);

  return (
    <AppLayout
      appTitle="Trinity Platform"
      navItems={demoNavItems}
      selectedNav={selectedNav}
      onNavClick={setSelectedNav}
      user={sampleUser}
      clientName="Acme Pharma"
      clients={sampleClients}
      enableInsightEngine
      insightEnginePanelOpen={insightPanelOpen}
      onInsightEnginePanelChange={setInsightPanelOpen}
      insightEngineMessages={messages}
      onInsightEngineSend={handleSendMessage}
      insightEngineTyping={isTyping}
    >
      {showDashboard ? <DashboardContent /> : <MinimalContentPlaceholder />}
    </AppLayout>
  );
};

/**
 * DashboardContent - Sample dashboard content for AppLayout demos
 */
const DashboardContent: React.FC = () => (
  <Box>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome back! Here's your overview.
      </Typography>
    </Box>

    <Alert severity="info" sx={{ mb: 3 }}>
      <strong>Try it!</strong> Click "Insight Engine" in the sidebar to open the AI panel. 
      Drag the panel edge to resize!
    </Alert>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard
          label="Engagements"
          value="24,521"
          change="+12.5%"
          icon={<TrendingUpIcon />}
          color={brandColors.primary.light}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard
          label="Active KOLs"
          value="1,284"
          change="+8.2%"
          icon={<PeopleIcon />}
          color={brandColors.secondary.main}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard
          label="Insights"
          value="847"
          change="+24.1%"
          icon={<InsightsIcon />}
          color={brandColors.secondary.dark}
        />
      </Grid>
    </Grid>

    <ChartPlaceholder />
  </Box>
);

/**
 * StatCard - Reusable stat card component
 */
const StatCard: React.FC<{
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}> = ({ label, value, change, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" variant="body2">{label}</Typography>
          <Typography variant="h4" fontWeight={600}>{value}</Typography>
          <Chip
            label={change}
            size="small"
            sx={{
              mt: 1,
              backgroundColor: semanticTokens.colors.status.success.background,
              color: semanticTokens.colors.status.success.text,
            }}
          />
        </Box>
        <Box sx={{ p: 1, borderRadius: 2, backgroundColor: `${color}15`, height: 'fit-content' }}>
          <Box sx={{ color }}>{icon}</Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

/**
 * ChartPlaceholder - Chart placeholder for dashboard demos
 */
const ChartPlaceholder: React.FC = () => (
  <Card sx={{ mt: 3, height: 300 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>Engagement Trends</Typography>
      <Box
        sx={{
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: brandColors.neutral.gray100,
          borderRadius: 2,
        }}
      >
        <Typography color="text.secondary">Chart visualization placeholder</Typography>
      </Box>
    </CardContent>
  </Card>
);

/**
 * MinimalContentPlaceholder - Minimal placeholder content
 */
const MinimalContentPlaceholder: React.FC = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h5" color="text.secondary">
      Your content goes here
    </Typography>
  </Box>
);

/**
 * Default AppLayout with all features enabled.
 * Click on "Insight Engine" in the sidebar to open the AI chat panel.
 */
export const Default: Story = {
  render: () => <InteractiveAppLayout />,
};

/**
 * AppLayout with the Insight Engine panel already open.
 * Try dragging the left edge of the panel to resize it!
 */
export const WithAIPanelOpen: Story = {
  render: () => <InteractiveAppLayout initialPanelOpen />,
};

/**
 * Minimal layout without dashboard content.
 * Shows the basic structure of the layout template.
 */
export const MinimalContent: Story = {
  render: () => <InteractiveAppLayout showDashboard={false} />,
};

/**
 * AppLayout without the Insight Engine feature.
 * The "Insight Engine" nav item will not open a panel.
 */
export const WithoutInsightEngine: Story = {
  render: () => (
    <AppLayout
      appTitle="Simple App"
      navItems={demoNavItems.filter(item => item.id !== 'insight-engine')}
      enableInsightEngine={false}
      user={{
        name: 'Jane Doe',
        email: 'jane@example.com',
        initials: 'JD',
      }}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Simple Layout
        </Typography>
        <Typography color="text.secondary">
          This version doesn't have the AI panel feature enabled.
        </Typography>
      </Box>
    </AppLayout>
  ),
};

// ============================================================================
// AI FAB LAYOUT DEMO COMPONENTS
// ============================================================================

/**
 * FABSidebarDemo - Demo wrapper for sidebar navigation style
 */
const FABSidebarDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const handleSendMessage = useCallback((message: string) => {
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: `This is the **Sidebar Navigation** style using TopNavWithSidebar. It includes a collapsible left sidebar for section navigation. Perfect for multi-page applications.`,
        timestamp: new Date(),
      }]);
    }, 800);
  }, []);

  const fabNavItems = demoNavItems.filter(item => item.id !== 'insight-engine');
  
  return (
    <AIFabLayout
      navStyle="sidebar"
      appTitle="Sidebar Navigation"
      navItems={fabNavItems}
      user={sampleUser}
      clients={sampleClients}
      initialMessages={messages}
      onSendMessage={handleSendMessage}
    >
      <FABDemoContent 
        title="Sidebar Navigation Style"
        description='This layout uses navStyle="sidebar" which renders TopNavWithSidebar. The sidebar is collapsible and supports icons, labels, and badges.'
        whenToUse="Multi-page applications with distinct sections like Dashboard, Analytics, Settings, etc."
      />
    </AIFabLayout>
  );
};

/**
 * FABTopNavDemo - Demo wrapper for top navigation style
 */
const FABTopNavDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const handleSendMessage = useCallback((message: string) => {
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: `This is the **Top Navigation** style using TopNavHeader. No sidebar - just a clean top bar with search, client selector, and user menu. Great for single-page applications or dashboards.`,
        timestamp: new Date(),
      }]);
    }, 800);
  }, []);
  
  return (
    <AIFabLayout
      navStyle="topnav"
      appTitle="Top Navigation Only"
      user={sampleUser}
      clients={sampleClients}
      initialMessages={messages}
      onSendMessage={handleSendMessage}
    >
      <FABDemoContent 
        title="Top Navigation Style"
        description='This layout uses navStyle="topnav" which renders only TopNavHeader. No sidebar navigation - the full width is available for content.'
        whenToUse="Single-page apps, dashboards, or applications where you don't need sidebar navigation."
        cardCount={4}
      />
    </AIFabLayout>
  );
};

/**
 * FABDemoContent - Reusable content for FAB layout demos
 */
const FABDemoContent: React.FC<{
  title: string;
  description: string;
  whenToUse: string;
  cardCount?: number;
}> = ({ title, description, whenToUse, cardCount = 3 }) => (
  <Box>
    <Typography variant="h4" gutterBottom>{title}</Typography>
    <Typography color="text.secondary" paragraph>
      {description}
    </Typography>
    
    <Alert severity="info" sx={{ mb: 3 }}>
      <strong>When to use:</strong> {whenToUse}
    </Alert>
    
    <Grid container spacing={3}>
      {Array.from({ length: cardCount }).map((_, i) => (
        <Grid size={{ xs: 12, md: Math.floor(12 / cardCount) }} key={i}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Feature {i + 1}</Typography>
              <Typography color="text.secondary">
                Click the FAB button to open the AI panel.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

// ============================================================================
// AI FAB LAYOUT - NAVIGATION STYLE OPTIONS
// ============================================================================

/**
 * AI FAB Layout - Sidebar Navigation (Default)
 * 
 * Uses `navStyle="sidebar"` (TopNavWithSidebar) with collapsible left sidebar.
 * Best for applications with multiple sections/pages.
 */
export const FABWithSidebar: Story = {
  render: () => <FABSidebarDemo />,
};

/**
 * AI FAB Layout - Top Navigation Only
 * 
 * Uses `navStyle="topnav"` (TopNavHeader) without sidebar.
 * Best for simpler applications or single-page apps.
 */
export const FABWithTopNav: Story = {
  render: () => <FABTopNavDemo />,
};

/**
 * Layout Customization Guide
 * 
 * This story demonstrates how to customize the AIFabLayout template
 * to fit your specific application needs.
 */
export const CustomizationGuide: Story = {
  render: () => <CustomizationGuideContent />,
};

/**
 * CustomizationGuideContent - Extracted demo component for customization guide
 */
const CustomizationGuideContent: React.FC = () => (
  <AIFabLayout
    navStyle="sidebar"
    appTitle="Customization Guide"
    user={sampleUser}
  >
    <Box sx={{ maxWidth: 900 }}>
      <Typography variant="h4" gutterBottom>
        Layout Customization Guide
      </Typography>
      <Typography color="text.secondary" paragraph>
        AIFabLayout is a <strong>template/structure</strong> component. Here's how to customize it.
      </Typography>
      
      {/* Navigation Style */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            1. Choose Navigation Style
          </Typography>
          <CodeBlock>{`// Option A: Sidebar Navigation (default)
<AIFabLayout navStyle="sidebar" navItems={[...]} />

// Option B: Top Navigation Only
<AIFabLayout navStyle="topnav" />`}</CodeBlock>
          <Alert severity="success" sx={{ mt: 1 }}>
            <strong>Tip:</strong> Use "sidebar" for multi-section apps, "topnav" for dashboards.
          </Alert>
        </CardContent>
      </Card>
      
      {/* Content Customization */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            2. Customize Content Area
          </Typography>
          <CodeBlock>{`<AIFabLayout
  contentSx={{
    p: 0,                    // Remove default padding
    backgroundColor: '#f5f5f5',
    maxWidth: 1200,
    mx: 'auto',              // Center content
  }}
>
  <YourContent />
</AIFabLayout>`}</CodeBlock>
        </CardContent>
      </Card>
      
      {/* AI Panel Customization */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            3. Customize AI Panel
          </Typography>
          <CodeBlock>{`<AIFabLayout
  defaultPanelWidth={500}   // Starting width
  minPanelWidth={400}       // Minimum resize width
  maxPanelWidth={800}       // Maximum resize width
  panelProps={{
    placeholder: "Ask me anything...",
  }}
  fabProps={{
    position: 'bottom-left',
    tooltip: 'Get Help',
  }}
/>`}</CodeBlock>
        </CardContent>
      </Card>
      
      {/* Event Handlers */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            4. Handle Events
          </Typography>
          <CodeBlock>{`<AIFabLayout
  onNavClick={(navId) => router.push(\`/\${navId}\`)}
  onSearch={(query) => performSearch(query)}
  onUserAction={(action) => {
    if (action === 'logout') auth.logout();
    if (action === 'settings') openSettings();
  }}
  onClientChange={(clientId) => switchClient(clientId)}
  onSendMessage={async (message) => {
    const response = await aiService.chat(message);
    // Handle response...
  }}
  onAIPanelChange={(open) => {
    analytics.track('ai_panel_toggled', { open });
  }}
/>`}</CodeBlock>
        </CardContent>
      </Card>
    </Box>
  </AIFabLayout>
);
