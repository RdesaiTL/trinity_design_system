/**
 * AI Component Integration Guide
 * 
 * Shows how AI components connect to templates and layouts.
 * This is the architectural overview for the AI design system.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback } from 'react';
import { Box, Typography, Stack, Grid } from '@mui/material';
import {
  AILabel,
  AIAvatar,
  AIChatMessage,
  AIChatInput,
  AISourcesSection,
  AISuggestedAction,
  AIContainer,
  aiTokens,
  aiRadiusPx,
} from '../components/AI';
import { AIFabLayout, ChatMessage } from '../components/AppLayout';
import {
  StoryPage,
  StorySection,
  TreeDiagram,
  FeatureCard,
  ColorSwatch,
  CodeBlock,
  sampleNavItems,
  sampleUser,
  sampleClients,
  SampleDashboard,
  getAIResponse,
} from './utils';

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

/**
 * ComponentHierarchyDemo - Shows the AI component tree structure
 */
const ComponentHierarchyDemo: React.FC = () => (
  <StoryPage
    title="AI Component Hierarchy"
    description="Understanding how AI components relate to templates and layouts."
  >
    {/* Architecture Diagram */}
    <StorySection title="Component Tree">
      <TreeDiagram>
{`📦 Templates/Layouts
├── 🏗️ AIFabLayout          → Full app with FAB + AI panel
│   ├── TopNavWithSidebar   → Navigation (reused)
│   ├── TopNavHeader        → Alternative nav (reused)
│   └── InsightEnginePanel  → AI chat panel
│       ├── AIAvatar        → AI identity indicator
│       ├── AIChatMessage   → Message bubbles
│       ├── AISourcesSection → Source citations
│       ├── AIChatInput     → Message input
│       └── AITypingIndicator → Loading state
│
├── 🏗️ AppLayout            → Full app with nav-triggered AI
│   └── (Same panel structure)
│
└── 🧩 Standalone Components (for custom implementations)
    ├── AILabel             → AI presence indicator
    ├── AIContainer         → AI content wrapper
    ├── AIExpandableSection → Collapsible AI content
    ├── AISuggestedAction   → Action buttons
    ├── AIQuickReply        → Quick suggestions
    └── AIPersonaCard       → AI persona display`}
      </TreeDiagram>
    </StorySection>

    {/* Component Categories */}
    <Typography variant="h6" gutterBottom>
      Component Categories
    </Typography>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <FeatureCard
          title="Layout Templates"
          description="Complete layout with FAB-triggered or nav-triggered AI panel. Choose between sidebar or top navigation styles."
          tags={['AIFabLayout', 'AppLayout']}
          gradientTitle
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FeatureCard
          title="Panel Components"
          description="Full-featured AI chat panel with sources, model selection, voice input, and fullscreen support."
          tags={['InsightEnginePanel', 'ResizablePanel']}
          gradientTitle
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FeatureCard
          title="Chat Components"
          description="Individual chat components for building custom chat interfaces."
          tags={['AIChatMessage', 'AIChatInput', 'AITypingIndicator', 'AIQuickReply']}
          gradientTitle
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FeatureCard
          title="Identity Components"
          description="Visual identity and explainability components for AI presence."
          tags={['AILabel', 'AIAvatar', 'AIContainer', 'AISourcesSection']}
          gradientTitle
        />
      </Grid>
    </Grid>
  </StoryPage>
);

/**
 * ComponentShowcaseDemo - Interactive showcase of individual AI components
 */
const ComponentShowcaseDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <StoryPage
      title="AI Components Showcase"
      description="Interactive examples of individual AI components."
      maxWidth={1000}
    >
      <Stack spacing={4}>
        {/* Label */}
        <StorySection title="AI Label">
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
            <AILabel />
            <AILabel size="md" />
            <AILabel size="lg" />
          </Stack>
        </StorySection>

        {/* Avatar */}
        <StorySection title="AI Avatar">
          <Stack direction="row" spacing={3} alignItems="center">
            <AIAvatar size="small" />
            <AIAvatar size="medium" animated />
            <AIAvatar size="large" />
          </Stack>
        </StorySection>

        {/* Messages */}
        <StorySection title="Chat Messages">
          <Stack spacing={2}>
            <AIChatMessage
              role="assistant"
              content="Hello! I'm your AI assistant. How can I help you today?"
            />
            <AIChatMessage
              role="user"
              content="Can you help me analyze the latest engagement data?"
            />
            <AIChatMessage
              role="assistant"
              content="I'd be happy to help! Based on your recent data, I can see engagement is up 23% this week."
            />
          </Stack>
        </StorySection>

        {/* Input */}
        <StorySection title="Chat Input">
          <AIChatInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={(val) => {
              console.log('Submitted:', val);
              setInputValue('');
            }}
            placeholder="Type a message..."
          />
        </StorySection>

        {/* Sources */}
        <StorySection title="Sources Section">
          <AISourcesSection
            title="References"
            sources={[
              { title: 'Trinity Design System Docs', url: 'https://docs.trinity.com', type: 'webpage' },
              { title: 'AI Component Guidelines', url: 'https://docs.trinity.com/ai', type: 'document' },
              { title: 'Integration Tutorial', url: 'https://docs.trinity.com/tutorial', type: 'article' },
            ]}
            collapsible
            defaultExpanded
          />
        </StorySection>

        {/* Container */}
        <AIContainer
          title="AI Insight"
          subtitle="Generated analysis"
          showAvatar
          bordered
          padded
        >
          <Typography variant="body2">
            This content is wrapped in an AIContainer, which provides consistent
            styling and an optional header with AI avatar.
          </Typography>
        </AIContainer>

        {/* Actions */}
        <StorySection title="Suggested Actions">
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <AISuggestedAction label="Summarize" onClick={() => {}} />
            <AISuggestedAction label="Explain" onClick={() => {}} />
            <AISuggestedAction label="Translate" onClick={() => {}} />
          </Stack>
        </StorySection>
      </Stack>
    </StoryPage>
  );
};

/**
 * DesignTokensDemo - Display AI design tokens
 */
const DesignTokensDemo: React.FC = () => (
  <StoryPage
    title="AI Design Tokens"
    description="All AI components share these design tokens for consistent styling."
    maxWidth={1000}
  >
    <Grid container spacing={3}>
      {/* Colors */}
      <Grid size={{ xs: 12, md: 6 }}>
        <StorySection title="Colors">
          <Stack spacing={2}>
            <ColorSwatch
              color={aiTokens.colors.aiPrimary}
              name="aiPrimary"
              description="brandColors.primary.light"
            />
            <ColorSwatch
              color={aiTokens.colors.aiSecondary}
              name="aiSecondary"
              description="brandColors.secondary.main (Coral)"
            />
            <ColorSwatch
              color={aiTokens.colors.aiBackground}
              name="aiBackground"
              description="Subtle purple tint"
            />
            <ColorSwatch
              color={aiTokens.colors.aiBorder}
              name="aiBorder"
              description="Light border for AI containers"
            />
          </Stack>
        </StorySection>
      </Grid>

      {/* Gradients */}
      <Grid size={{ xs: 12, md: 6 }}>
        <StorySection title="Gradients">
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 40,
                  borderRadius: 1,
                  background: aiTokens.gradient.primary,
                }}
              />
              <Box>
                <Typography variant="body2" fontWeight={500}>Primary Gradient</Typography>
                <Typography variant="caption" color="text.secondary">Used for AI accent elements</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 40,
                  borderRadius: 1,
                  background: aiTokens.gradient.text,
                }}
              />
              <Box>
                <Typography variant="body2" fontWeight={500}>Text Gradient</Typography>
                <Typography variant="caption" color="text.secondary">For gradient text effects</Typography>
              </Box>
            </Box>
          </Stack>
        </StorySection>
      </Grid>

      {/* Border Radius */}
      <Grid size={{ xs: 12, md: 6 }}>
        <StorySection title="Border Radius">
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: `${aiRadiusPx.sm}px`, bgcolor: 'grey.200' }} />
              <Typography variant="body2">sm: {aiRadiusPx.sm}px</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: `${aiRadiusPx.md}px`, bgcolor: 'grey.200' }} />
              <Typography variant="body2">md: {aiRadiusPx.md}px</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: `${aiRadiusPx.lg}px`, bgcolor: 'grey.200' }} />
              <Typography variant="body2">lg: {aiRadiusPx.lg}px</Typography>
            </Box>
          </Stack>
        </StorySection>
      </Grid>

      {/* Usage Code */}
      <Grid size={{ xs: 12, md: 6 }}>
        <StorySection title="Usage">
          <CodeBlock>
{`import { aiTokens, aiRadiusPx } from '@trinity/design-system';

// Use in styles
const styles = {
  background: aiTokens.gradient.primary,
  color: aiTokens.colors.aiPrimary,
  borderRadius: aiRadiusPx.md,
};`}
          </CodeBlock>
        </StorySection>
      </Grid>
    </Grid>
  </StoryPage>
);

/**
 * FullIntegrationDemo - Complete AI layout integration demo
 */
const FullIntegrationDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = useCallback((message: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const response = getAIResponse(message);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  }, []);

  return (
    <AIFabLayout
      navStyle="sidebar"
      navItems={sampleNavItems}
      selectedNav="home"
      appTitle="Trinity Platform"
      clientName="Acme Pharma"
      user={{
        name: sampleUser.name,
        initials: sampleUser.initials,
        email: sampleUser.email,
      }}
      clients={sampleClients}
      initialMessages={messages}
      onSendMessage={handleSendMessage}
      isTyping={isTyping}
    >
      <SampleDashboard />
    </AIFabLayout>
  );
};

const meta: Meta = {
  title: 'AI/Integration Guide',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AI Component Architecture

This guide shows how AI components work together in the Trinity Design System.

## Component Hierarchy

\`\`\`
AIFabLayout / AppLayout (Templates)
├── TopNavWithSidebar / TopNavHeader (Navigation)
├── InsightEnginePanel (AI Panel Container)
│   ├── AIAvatar (AI Identity)
│   ├── AIChatMessage (Conversation)
│   │   └── AISourcesSection (Citations)
│   ├── AIChatInput (User Input)
│   ├── AITypingIndicator (Loading State)
│   └── AIQuickReply (Suggestions)
└── AIFab (Launch Button)
\`\`\`

## Usage Patterns

1. **Use AIFabLayout** for full app integration
2. **Use InsightEnginePanel** for standalone AI panel
3. **Use individual components** for custom AI interfaces
        `,
      },
    },
  },
};

export default meta;

// ============================================================================
// STORIES - Using extracted demo components for reusability
// ============================================================================

/**
 * Shows the AI component hierarchy and how components relate.
 */
export const ComponentHierarchy: StoryObj = {
  render: () => <ComponentHierarchyDemo />,
};

/**
 * Interactive showcase of individual AI components.
 */
export const ComponentShowcase: StoryObj = {
  render: () => <ComponentShowcaseDemo />,
};

/**
 * Display of AI design tokens including colors, gradients, and spacing.
 */
export const DesignTokens: StoryObj = {
  render: () => <DesignTokensDemo />,
};

/**
 * Complete integration example with AIFabLayout and all components.
 */
export const FullIntegration: StoryObj = {
  render: () => <FullIntegrationDemo />,
};
