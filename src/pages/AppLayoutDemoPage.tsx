/**
 * AppLayoutDemoPage
 * Demonstrates the AppLayout template with resizable AI panel
 */

import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { AppLayout, ChatMessage, NavItem } from '../components/AppLayout';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { brandColors, semanticTokens } from '../tokens';

// Custom nav items for demo
const demoNavItems: NavItem[] = [
  { id: 'home', label: 'Dashboard', icon: <HomeIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <AssessmentIcon />, badge: 3 },
  { id: 'contacts', label: 'Contacts', icon: <PeopleIcon /> },
  { id: 'documents', label: 'Documents', icon: <FolderIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  { id: 'insight-engine', label: 'Insight Engine', icon: <AutoAwesomeIcon />, isSpecial: true },
];

// Sample AI responses for demo
const sampleResponses: Record<string, string> = {
  "What can you help with?": "I can help you with:\n\n• **Data Analysis** - Explore trends, patterns, and insights in your data\n• **Report Generation** - Create summaries and visualizations\n• **KOL Research** - Find and analyze key opinion leaders\n• **Document Search** - Find relevant information across your documents\n\nWhat would you like to explore today?",
  "Show recent insights": "Here are your recent insights:\n\n📈 **Engagement Trend**: Your content engagement has increased by 23% this week\n\n👥 **Top KOLs**: Dr. Sarah Chen and Dr. Michael Park have been most active\n\n📊 **Popular Topics**: Immunotherapy and precision medicine are trending\n\nWould you like me to dive deeper into any of these?",
  "Analyze data": "I'd be happy to analyze your data! Please specify:\n\n1. **Time period** - What date range should I look at?\n2. **Metrics** - Which KPIs are most important?\n3. **Segments** - Any specific regions or categories?\n\nOr I can provide a general overview of your dashboard metrics.",
  "default": "I understand you're interested in learning more. Let me analyze that for you...\n\nBased on your current dashboard, I can see several opportunities for deeper insights. Would you like me to focus on any particular area?"
};

export const AppLayoutDemoPage: React.FC = () => {
  const [selectedNav, setSelectedNav] = useState('home');
  const [insightPanelOpen, setInsightPanelOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleNavClick = useCallback((navId: string) => {
    setSelectedNav(navId);
    console.log('Nav clicked:', navId);
  }, []);

  const handleSendMessage = useCallback((message: string) => {
    // Simulate AI response
    setIsTyping(true);
    
    setTimeout(() => {
      const response = sampleResponses[message] || sampleResponses['default'];
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1500);
  }, []);

  const handleUserAction = useCallback((action: string) => {
    console.log('User action:', action);
  }, []);

  return (
    <AppLayout
      appTitle="Trinity Platform"
      navItems={demoNavItems}
      selectedNav={selectedNav}
      onNavClick={handleNavClick}
      user={{
        name: 'John Smith',
        email: 'john.smith@trinity.com',
        initials: 'JS',
      }}
      onUserAction={handleUserAction}
      enableInsightEngine
      insightEnginePanelOpen={insightPanelOpen}
      onInsightEnginePanelChange={setInsightPanelOpen}
      insightEngineMessages={messages}
      onInsightEngineSend={handleSendMessage}
      insightEngineTyping={isTyping}
    >
      {/* Demo Dashboard Content */}
      <Box>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back, John! Here's your overview for today.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<AutoAwesomeIcon />}
            onClick={() => setInsightPanelOpen(true)}
            sx={{
              background: insightPanelOpen 
                ? `linear-gradient(135deg, ${brandColors.secondary.main} 0%, ${brandColors.primary.light} 100%)`
                : 'transparent',
              color: insightPanelOpen ? brandColors.neutral.white : brandColors.primary.light,
              borderColor: brandColors.primary.light,
              '&:hover': {
                background: `linear-gradient(135deg, ${brandColors.secondary.main} 0%, ${brandColors.primary.light} 100%)`,
                color: brandColors.neutral.white,
                borderColor: 'transparent',
              },
            }}
          >
            {insightPanelOpen ? 'AI Assistant Active' : 'Ask AI Assistant'}
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Try it out!</strong> Click on "Insight Engine" in the left sidebar or the "Ask AI Assistant" button to open the AI chat panel. 
          You can drag the panel edge to resize it!
        </Alert>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      Total Engagements
                    </Typography>
                    <Typography variant="h4" fontWeight={600}>
                      24,521
                    </Typography>
                    <Chip 
                      label="+12.5%" 
                      size="small" 
                      sx={{ 
                        mt: 1, 
                        backgroundColor: semanticTokens.colors.status.success.background,
                        color: semanticTokens.colors.status.success.text,
                        fontWeight: 500,
                      }} 
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: `${brandColors.primary.light}15`,
                    }}
                  >
                    <TrendingUpIcon sx={{ color: brandColors.primary.light }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      Active KOLs
                    </Typography>
                    <Typography variant="h4" fontWeight={600}>
                      1,284
                    </Typography>
                    <Chip 
                      label="+8.2%" 
                      size="small" 
                      sx={{ 
                        mt: 1, 
                        backgroundColor: semanticTokens.colors.status.success.background,
                        color: semanticTokens.colors.status.success.text,
                        fontWeight: 500,
                      }} 
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: `${brandColors.secondary.main}15`,
                    }}
                  >
                    <PeopleIcon sx={{ color: brandColors.secondary.main }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      Insights Generated
                    </Typography>
                    <Typography variant="h4" fontWeight={600}>
                      847
                    </Typography>
                    <Chip 
                      label="+24.1%" 
                      size="small" 
                      sx={{ 
                        mt: 1, 
                        backgroundColor: semanticTokens.colors.status.success.background,
                        color: semanticTokens.colors.status.success.text,
                        fontWeight: 500,
                      }} 
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: `${brandColors.secondary.dark}15`,
                    }}
                  >
                    <InsightsIcon sx={{ color: brandColors.secondary.dark }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      Events This Month
                    </Typography>
                    <Typography variant="h4" fontWeight={600}>
                      23
                    </Typography>
                    <Chip 
                      label="5 upcoming" 
                      size="small" 
                      sx={{ 
                        mt: 1, 
                        backgroundColor: `${brandColors.primary.main}15`, 
                        color: brandColors.primary.main,
                        fontWeight: 500,
                      }} 
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: `${brandColors.primary.main}15`,
                    }}
                  >
                    <CalendarTodayIcon sx={{ color: brandColors.primary.main }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content Area */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: 400 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Engagement Trends
                </Typography>
                <Box
                  sx={{
                    height: 320,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: brandColors.neutral.gray100,
                    borderRadius: 2,
                  }}
                >
                  <Typography color="text.secondary">
                    Chart visualization would go here
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: 400 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { title: 'New KOL identified', time: '2 min ago', type: 'success' },
                    { title: 'Report generated', time: '15 min ago', type: 'info' },
                    { title: 'Data sync complete', time: '1 hour ago', type: 'success' },
                    { title: 'New engagement detected', time: '2 hours ago', type: 'info' },
                    { title: 'Weekly analysis ready', time: '3 hours ago', type: 'success' },
                  ].map((activity, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 1,
                        backgroundColor: brandColors.neutral.gray100 + '50',
                      }}
                    >
                      <Typography variant="body2">{activity.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
};

export default AppLayoutDemoPage;
