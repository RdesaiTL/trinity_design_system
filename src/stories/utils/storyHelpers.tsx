/**
 * @fileoverview Shared helper components and utilities for Storybook stories.
 * These components provide consistent patterns across all story files.
 * @module stories/utils/storyHelpers
 */

import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { brandColors } from '../../tokens';
import { baseTokens, semanticTokens } from '../../tokens';

// ============================================================================
// PAGE WRAPPER COMPONENTS
// ============================================================================

interface StoryPageProps {
  /** Page title */
  title: string;
  /** Page description */
  description?: string;
  /** Page content */
  children: React.ReactNode;
  /** Maximum width constraint */
  maxWidth?: number | string;
}

/**
 * StoryPage - Standard wrapper for story documentation pages
 * Provides consistent title, description, and max-width styling
 */
export const StoryPage: React.FC<StoryPageProps> = ({
  title,
  description,
  children,
  maxWidth = 1200,
}) => (
  <Box sx={{ p: 4, maxWidth, mx: 'auto' }}>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    {description && (
      <Typography color="text.secondary" paragraph>
        {description}
      </Typography>
    )}
    {children}
  </Box>
);

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

interface StorySectionProps {
  /** Section title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Section content */
  children: React.ReactNode;
  /** Add bottom margin */
  spacing?: boolean;
}

/**
 * StorySection - Standard section wrapper with title and paper container
 */
export const StorySection: React.FC<StorySectionProps> = ({
  title,
  subtitle,
  children,
  spacing = true,
}) => (
  <Box sx={{ mb: spacing ? 4 : 0 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {subtitle}
      </Typography>
    )}
    <Paper sx={{ p: 3 }}>{children}</Paper>
  </Box>
);

// ============================================================================
// CODE BLOCK COMPONENTS
// ============================================================================

interface CodeBlockProps {
  /** Code content */
  children: string;
  /** Language hint for styling */
  language?: string;
  /** Title above code block */
  title?: string;
}

/**
 * CodeBlock - Styled code block for documentation
 * Uses consistent dark theme styling
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _language = 'tsx',
  title,
}) => (
  <Box sx={{ mb: 2 }}>
    {title && (
      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
        {title}
      </Typography>
    )}
    <Paper
      component="pre"
      sx={{
        bgcolor: '#1e1e1e',
        color: '#d4d4d4',
        p: 2,
        borderRadius: 2,
        overflow: 'auto',
        fontSize: '0.875rem',
        fontFamily: '"Fira Code", Monaco, Consolas, monospace',
        m: 0,
        lineHeight: 1.6,
      }}
    >
      <code>{children}</code>
    </Paper>
  </Box>
);

/**
 * TreeDiagram - Display hierarchical component tree
 */
export const TreeDiagram: React.FC<{ children: string }> = ({ children }) => (
  <Paper
    sx={{
      p: 3,
      backgroundColor: baseTokens.colors.gray[50],
      fontFamily: 'monospace',
      fontSize: '0.85rem',
      lineHeight: 1.8,
      whiteSpace: 'pre',
      overflow: 'auto',
    }}
  >
    {children}
  </Paper>
);

// ============================================================================
// CARD COMPONENTS
// ============================================================================

interface FeatureCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Optional chips/tags */
  tags?: string[];
  /** Gradient text for title */
  gradientTitle?: boolean;
}

/**
 * FeatureCard - Card for showcasing features or components
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  tags,
  gradientTitle,
}) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      {icon && (
        <Box sx={{ mb: 2, color: brandColors.primary.main }}>{icon}</Box>
      )}
      <Typography
        variant="h6"
        gutterBottom
        sx={
          gradientTitle
            ? {
                background: `linear-gradient(135deg, ${brandColors.secondary.main} 0%, ${brandColors.primary.light} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            : undefined
        }
      >
        {title}
      </Typography>
      {tags && tags.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      )}
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

// ============================================================================
// COLOR/TOKEN DISPLAY COMPONENTS
// ============================================================================

interface ColorSwatchProps {
  /** Color value */
  color: string;
  /** Color name/label */
  name: string;
  /** Optional description */
  description?: string;
}

/**
 * ColorSwatch - Display a color with its name
 */
export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  name,
  description,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 1,
        backgroundColor: color,
        border: color === '#FFFFFF' || color === 'white' ? '1px solid #eee' : undefined,
      }}
    />
    <Box>
      <Typography variant="body2" fontWeight={500}>
        {name}
      </Typography>
      {description && (
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  </Box>
);

// ============================================================================
// SAMPLE DATA & NAVIGATION
// ============================================================================

/** Standard navigation items for layout stories */
export const sampleNavItems = [
  { id: 'home', label: 'Dashboard', icon: <HomeIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <AssessmentIcon />, badge: 3 },
  { id: 'contacts', label: 'Contacts', icon: <PeopleIcon /> },
  { id: 'documents', label: 'Documents', icon: <FolderIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  { id: 'insight-engine', label: 'Insight Engine', icon: <AutoAwesomeIcon />, isSpecial: true },
];

/** Sample user data for layout stories */
export const sampleUser = {
  name: 'John Smith',
  email: 'john.smith@trinity.com',
  initials: 'JS',
};

/** Sample clients for layout stories */
export const sampleClients = [
  { id: '1', name: 'Acme Pharma' },
  { id: '2', name: 'BioTech Labs' },
  { id: '3', name: 'MedDevice Inc' },
];

// ============================================================================
// SAMPLE PAGE CONTENT COMPONENTS
// ============================================================================

interface SamplePageContentProps {
  /** Page title */
  title?: string;
  /** Number of cards to show */
  cardCount?: number;
}

/**
 * SamplePageContent - Generic page content for layout demos
 */
export const SamplePageContent: React.FC<SamplePageContentProps> = ({
  title = 'Dashboard',
  cardCount = 4,
}) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={3}>
      {Array.from({ length: cardCount }).map((_, i) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Card {i + 1}</Typography>
            <Typography color="text.secondary">Sample content</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

/**
 * SampleDashboard - More detailed dashboard content for demos
 */
export const SampleDashboard: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Dashboard
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      Welcome back! Here's an overview of your activity.
    </Typography>

    {/* Stats Row */}
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {[
        { label: 'Engagements', value: '24,521', change: '+12.5%' },
        { label: 'Active KOLs', value: '1,284', change: '+8.2%' },
        { label: 'Insights', value: '847', change: '+24.1%' },
      ].map((stat) => (
        <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2">
                {stat.label}
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {stat.value}
              </Typography>
              <Chip
                label={stat.change}
                size="small"
                sx={{
                  mt: 1,
                  backgroundColor: semanticTokens.colors.status.success.background,
                  color: semanticTokens.colors.status.success.text,
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* Chart Placeholder */}
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Engagement Trends
        </Typography>
        <Box
          sx={{
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: baseTokens.colors.gray[100],
            borderRadius: 1,
          }}
        >
          <Typography color="text.secondary">Chart Placeholder</Typography>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

// ============================================================================
// AI CHAT HELPERS
// ============================================================================

/** Sample AI responses for demos */
export const sampleAIResponses: Record<string, string> = {
  'What can you help with?':
    "I can help you with:\n\n• **Data Analysis** - Explore trends and insights\n• **Report Generation** - Create summaries\n• **KOL Research** - Find key opinion leaders\n• **Document Search** - Find relevant information\n\nWhat would you like to explore?",
  'Show recent insights':
    "Here are your recent insights:\n\n📈 **Engagement**: Up 23% this week\n👥 **Top KOLs**: Dr. Chen and Dr. Park most active\n📊 **Trending**: Immunotherapy topics\n\nWant me to dive deeper?",
  default:
    "I understand. Let me analyze that for you...\n\nBased on your dashboard, I can see several opportunities for deeper insights. Would you like me to focus on any particular area?",
};

/**
 * Get AI response for a message (for demos)
 */
export const getAIResponse = (message: string): string => {
  return sampleAIResponses[message] || sampleAIResponses['default'];
};

// ============================================================================
// USAGE GUIDE COMPONENTS
// ============================================================================

interface UsageExampleProps {
  /** Example title */
  title: string;
  /** Code example */
  code: string;
  /** Optional description */
  description?: string;
}

/**
 * UsageExample - Code example with title and description
 */
export const UsageExample: React.FC<UsageExampleProps> = ({
  title,
  code,
  description,
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
    )}
    <CodeBlock>{code}</CodeBlock>
  </Box>
);

/**
 * PropsTable - Display component props in a table format
 */
export const PropsTable: React.FC<{
  props: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
}> = ({ props }) => (
  <Paper variant="outlined" sx={{ overflow: 'auto' }}>
    <Box
      component="table"
      sx={{
        width: '100%',
        borderCollapse: 'collapse',
        '& th, & td': {
          p: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          textAlign: 'left',
        },
        '& th': {
          fontWeight: 600,
          backgroundColor: baseTokens.colors.gray[50],
        },
      }}
    >
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.name}>
            <td>
              <code style={{ color: brandColors.primary.main }}>{prop.name}</code>
            </td>
            <td>
              <code>{prop.type}</code>
            </td>
            <td>{prop.default || '-'}</td>
            <td>{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </Box>
  </Paper>
);
