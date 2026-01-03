import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Card,
  CardContent,
  Button,
  ThemeProvider,
} from '@mui/material';
import { useState } from 'react';
import {
  AILabel,
  AIAvatar,
  AIChatMessage,
  AIChatInput,
  AISource,
  AISourcesSection,
  AISuggestedAction,
  AICircularAction,
  AIContainer,
  AIPersonaCard,
  AIExpandableSection,
  AITypingIndicator,
  AIQuickReply,
  AIExplainability,
  GradientText,
  StatCard,
  GradientIconBadge,
  aiTokens,
} from '../components/AI';
import { InsightEnginePanel } from '../components/AppLayout';
import { Icon, IconProvider } from '../components/Icon';
import { lightTheme, darkTheme } from '../theme';
import { brandColors } from '../tokens';

/**
 * # AI Components
 * 
 * AI components and patterns for the Trinity Design System, inspired by Carbon for AI.
 * These components provide visual identity and explainability for AI-generated content.
 * 
 * ## Core Principles
 * 
 * 1. **Transparency**: Always mark AI-generated content clearly
 * 2. **Explainability**: Provide pathways to understand how AI works
 * 3. **Consistency**: Use consistent visual language across all AI instances
 * 4. **Trust**: Build user trust through clear communication
 * 
 * ## Components Overview
 * 
 * | Component | Purpose |
 * |-----------|---------|
 * | `AILabel` | Primary indicator of AI presence |
 * | `AIAvatar` | Visual representation of AI assistant |
 * | `AIChatMessage` | Messages in AI conversations |
 * | `AIChatInput` | Input for AI chat interactions |
 * | `AISourcesSection` | Display sources/references |
 * | `AISuggestedAction` | AI-suggested action buttons |
 * | `AIContainer` | Container with AI presence styling |
 * | `AIPersonaCard` | AI-generated persona cards |
 * | `AIExpandableSection` | Collapsible AI content sections |
 */

const meta: Meta = {
  title: 'AI/Overview',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'AI components for transparency, explainability, and trust.',
      },
    },
  },
  decorators: [
    (Story) => (
      <IconProvider defaultLibrary="material">
        <Story />
      </IconProvider>
    ),
  ],
};

export default meta;

// ============================================================================
// AI LABEL STORIES
// ============================================================================

export const Labels: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>AI Label</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        The AI label is the primary indicator of AI presence. It provides transparency
        and serves as a pathway to explainability.
      </Typography>

      <Stack spacing={4}>
        {/* Sizes */}
        <Box>
          <Typography variant="h6" gutterBottom>Sizes</Typography>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
            <AILabel size="mini" showPopover={false} />
            <AILabel size="2xs" showPopover={false} />
            <AILabel size="xs" showPopover={false} />
            <AILabel size="sm" showPopover={false} />
            <AILabel size="md" showPopover={false} />
            <AILabel size="lg" showPopover={false} />
            <AILabel size="xl" showPopover={false} />
          </Stack>
        </Box>

        {/* Variants */}
        <Box>
          <Typography variant="h6" gutterBottom>Variants</Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>Default</Typography>
              <AILabel variant="default" showPopover={false} />
            </Box>
            <Box>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>Inline</Typography>
              <Typography variant="body2">
                This content was <AILabel variant="inline" size="sm" showPopover={false} /> generated
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* With Explainability Popover */}
        <Box>
          <Typography variant="h6" gutterBottom>With Explainability Popover</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Click the label to see the explainability popover.
          </Typography>
          <AILabel
            size="md"
            popoverContent={
              <AIExplainability
                title="AI-generated summary"
                description="This content was generated using natural language processing."
                modelName="GPT-4 Turbo"
                confidence={92}
                lastUpdated="Dec 22, 2025"
                actions={[
                  { label: 'Learn more', onClick: () => {} },
                  { label: 'Give feedback', onClick: () => {} },
                ]}
              />
            }
          />
        </Box>

        {/* Localization */}
        <Box>
          <Typography variant="h6" gutterBottom>Localization</Typography>
          <Stack direction="row" spacing={2}>
            <AILabel text="AI" showPopover={false} />
            <AILabel text="IA" showPopover={false} />
            <AILabel text="KI" showPopover={false} />
            <AILabel text="II" showPopover={false} />
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// AI CHAT STORIES
// ============================================================================

export const Chat: StoryObj = {
  render: () => {
    const ChatDemo = () => {
      const [messages, setMessages] = useState([
        {
          role: 'assistant' as const,
          content: "Hi, I can help you create a persona for Celebrity or influencer, using internet search & publicly available Interviews, Appearances as well as your brand materials.\n\nWhose person would you like to create?",
        },
        {
          role: 'user' as const,
          content: 'I want to create a persona for "Billy Gardell", and please include any information related to Ozempic.',
        },
        {
          role: 'assistant' as const,
          content: (
            <Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Great choice! I'll build a Billy Gardell persona that incorporates his public story and
                connections to Ozempic. Once ready, you'll be able to ask the persona questions directly.
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Billy Gardell's public persona is friendly, relatable, and deeply authentic, blending
                humor, humility, and warmth across media, interviews, and campaigns. He's most
                recognized for his roles in sitcoms ("Bob Hearts Abishola," "Mike & Molly") and his
                stand-up comedy, but his more recent public outreach has centered on health
                transformation and open discussion about his personal journey, especially with
                diabetes and weight loss.
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Billy Gardell Persona Example</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Style:</strong> Blue-collar, down-to-earth, and approachable. Gardell's style is marked by
                everyday language, observational humor, and storytelling rooted in relatable
                experiences - from rough childhood memories to family life and adult challenges.
              </Typography>
              <Typography variant="body2">
                <strong>Voice:</strong> Encouraging, honest, accepting, and occasionally introspective, his "voice" is
                fatherly and calm but always authentic - whether discussing his marriage ("You can
                be right, or you can be married!"), his career struggles, or diabetes management.
              </Typography>
            </Box>
          ),
        },
      ]);
      const [inputValue, setInputValue] = useState('');
      const [isGenerating, setIsGenerating] = useState(false);

      const handleSubmit = (value: string) => {
        setMessages([...messages, { role: 'user', content: value }]);
        setInputValue('');
        setIsGenerating(true);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'This is a sample AI response to your message.',
          }]);
          setIsGenerating(false);
        }, 2000);
      };

      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>AI Chat</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Conversational interface for AI interactions.
          </Typography>

          <Paper sx={{ maxWidth: 700, mx: 'auto', overflow: 'hidden' }}>
            {/* Chat Header */}
            <Box sx={{
              p: 2,
              borderBottom: `1px solid ${brandColors.neutral.gray100}`,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}>
              <AIAvatar size="small" />
              <Box>
                <Typography variant="subtitle2">Create Celebrity Persona</Typography>
                <Typography variant="caption" color="text.secondary">
                  AI-powered persona generation
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto' }}>
                <AILabel size="xs" showPopover={false} />
              </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ p: 2, maxHeight: 500, overflow: 'auto' }}>
              {messages.map((msg, index) => (
                <AIChatMessage
                  key={index}
                  role={msg.role}
                  content={msg.content}
                  userAvatar="RD"
                  showCopy={msg.role === 'assistant'}
                  showFeedback={msg.role === 'assistant'}
                  showShare={msg.role === 'assistant'}
                />
              ))}
              {isGenerating && (
                <AIChatMessage
                  role="assistant"
                  content=""
                  isLoading
                />
              )}
            </Box>

            {/* Sources Section */}
            <Box sx={{ px: 2, pb: 1 }}>
              <AISourcesSection
                sources={[
                  {
                    title: 'Guideline Update on Condition A - J Clin Med, 2024',
                    pages: ['Page 2', 'Page 2'],
                  },
                  {
                    title: 'RWE: QoL Gains with Product X - Real-World Insights, 2024',
                    pages: ['Page 3', 'Page 4'],
                  },
                ]}
              />
            </Box>

            {/* Suggested Actions */}
            <Box sx={{ px: 2, pb: 2 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <AISuggestedAction
                  label="I would like to add some additional details to the persona."
                  primary
                />
                <AISuggestedAction
                  label='Save "Billy Gardell" Digital Tween'
                  primary
                />
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button variant="text" size="small">Yes</Button>
                <Button variant="text" size="small">No</Button>
              </Stack>
            </Box>

            {/* Input */}
            <Box sx={{ p: 2, borderTop: `1px solid ${brandColors.neutral.gray100}` }}>
              <AIChatInput
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleSubmit}
                isGenerating={isGenerating}
                placeholder="Enter a message"
              />
            </Box>
          </Paper>
        </Box>
      );
    };
    
    return <ChatDemo />;
  },
};

// ============================================================================
// AI SOURCES STORIES
// ============================================================================

export const Sources: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>AI Sources</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Display sources and references for AI-generated content to build trust and enable verification.
      </Typography>

      <Stack spacing={4}>
        {/* Individual Source */}
        <Box>
          <Typography variant="h6" gutterBottom>Individual Source</Typography>
          <Paper sx={{ p: 2, maxWidth: 500 }}>
            <AISource
              index={1}
              title="Clinical Trial Results for Treatment A"
              description="Published in Journal of Medicine, 2024"
              pages={['Page 12', 'Page 15-17']}
              url="#"
            />
          </Paper>
        </Box>

        {/* Sources Section */}
        <Box>
          <Typography variant="h6" gutterBottom>Sources Section (Expandable)</Typography>
          <Paper sx={{ p: 2, maxWidth: 500 }}>
            <AISourcesSection
              defaultExpanded
              sources={[
                {
                  title: 'Guideline Update on Condition A - J Clin Med, 2024',
                  pages: ['Page 2'],
                },
                {
                  title: 'RWE: QoL Gains with Product X - Real-World Insights, 2024',
                  pages: ['Page 3', 'Page 4'],
                },
                {
                  title: 'Patient Outcomes Study - NEJM, 2024',
                  pages: ['Page 1-5'],
                },
              ]}
            />
          </Paper>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// AI CONTAINER STORIES
// ============================================================================

export const Containers: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>AI Container</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Containers with AI presence styling to wrap AI-generated content.
      </Typography>

      <Stack spacing={4}>
        {/* Basic Container */}
        <Box>
          <Typography variant="h6" gutterBottom>Basic Container</Typography>
          <AIContainer
            labelPopoverContent={
              <AIExplainability
                title="AI-generated profile"
                description="This profile was generated using data analysis."
                modelName="Trinity AI"
                confidence={95}
              />
            }
          >
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">Name:</Typography>
                <Typography variant="body1">Joe Charlett</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Specialty:</Typography>
                <Typography variant="body1">Gastroenterologist</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Primary Affiliation:</Typography>
                <Typography variant="body1">St. Mouvbourne Hospital</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">HCP Segment:</Typography>
                <Typography variant="body1">Must Win</Typography>
              </Box>
            </Stack>
          </AIContainer>
        </Box>

        {/* Container with Title */}
        <Box>
          <Typography variant="h6" gutterBottom>Container with Title</Typography>
          <AIContainer title="HCP Profile">
            <Typography variant="body2">
              This is AI-generated content inside a titled container.
            </Typography>
          </AIContainer>
        </Box>

        {/* Without Gradient Border */}
        <Box>
          <Typography variant="h6" gutterBottom>Without Gradient Border</Typography>
          <AIContainer showGradientBorder={false}>
            <Typography variant="body2">
              Container without the gradient border effect.
            </Typography>
          </AIContainer>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// AI PERSONA CARDS STORIES
// ============================================================================

export const PersonaCards: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>AI Persona Cards</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Cards for displaying AI-generated personas or segments.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AIPersonaCard
            name="Clinical Champions"
            description="I'm a clinically focused Condition A treater committed to effective treatment, valuing patient preference, and making decisions focused on the best outcomes, unhindered by insurance or logistics."
            image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
            onClick={() => {}}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AIPersonaCard
            name="Traditional Care"
            description="I'm highly influenced by insurance and logistics which supersede my desire to treat aggressively. I like to treat Condition A the way I have always done."
            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
            onClick={() => {}}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AIPersonaCard
            name="Infusion Specialists"
            description="I'm financially motivated, prioritizing high-efficacy treatments. I prefer Product Y over Product X, valuing strong outcomes and guided by insurance."
            image="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop"
            selected
            onClick={() => {}}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AIPersonaCard
            name="Pragmatic Providers"
            description="I'm a clinically focused Condition A treater committed to effective treatment, valuing patient preference, and making decisions focused on the best outcomes."
            image="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop"
            onClick={() => {}}
          />
        </Grid>
      </Grid>
    </Box>
  ),
};

// ============================================================================
// AI EXPANDABLE SECTIONS STORIES
// ============================================================================

export const ExpandableSections: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>AI Expandable Sections</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Collapsible sections for organizing AI-generated content.
      </Typography>

      <Stack spacing={2} sx={{ maxWidth: 600 }}>
        <AIExpandableSection title="Contact Information" icon="user" defaultExpanded>
          <List dense>
            <ListItem>
              <ListItemText primary="Address:" secondary="980, Oak Street, San Francisco, CA" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Phone:" secondary="+1 765 123 7878" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Email ID:"
                secondary={<a href="mailto:joe.charlett@abc.com">joe.charlett@abc.com</a>}
              />
            </ListItem>
          </List>
        </AIExpandableSection>

        <AIExpandableSection title="Quick Stats:" icon="chart">
          <List dense>
            <ListItem>
              <ListItemText primary="IL-23 Writer:" secondary="Tremfya" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Top Competitor:" secondary="STE" />
            </ListItem>
            <ListItem>
              <ListItemText primary="DEP Call Goal:" secondary="1 / 3 Completed (Through Cycle: 40%)" />
            </ListItem>
          </List>
        </AIExpandableSection>

        <AIExpandableSection title="Recent Activity" icon="activity">
          <Typography variant="body2" color="text.secondary">
            No recent activity recorded.
          </Typography>
        </AIExpandableSection>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// AI SUGGESTED ACTIONS STORIES
// ============================================================================

export const SuggestedActions: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>AI Suggested Actions</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Buttons for AI-suggested actions and quick replies.
      </Typography>

      <Stack spacing={4}>
        {/* Primary Actions */}
        <Box>
          <Typography variant="h6" gutterBottom>Pill Buttons - Primary</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <AISuggestedAction label="Generate report" primary />
            <AISuggestedAction label="Summarize content" primary />
            <AISuggestedAction label="Create persona" primary icon="user" />
          </Stack>
        </Box>

        {/* Secondary Actions */}
        <Box>
          <Typography variant="h6" gutterBottom>Pill Buttons - Secondary</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <AISuggestedAction label="View details" />
            <AISuggestedAction label="Edit response" icon="edit" />
            <AISuggestedAction label="Regenerate" icon="refresh" />
          </Stack>
        </Box>

        {/* Circular Actions */}
        <Box>
          <Typography variant="h6" gutterBottom>Circular Actions</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Icon buttons with labels below, ideal for form actions.
          </Typography>
          <Stack direction="row" spacing={4}>
            <AICircularAction label="Clear Form" icon="x" />
            <AICircularAction label="Find Similar" icon="search" />
            <AICircularAction label="Generate" icon="sparkles" primary />
          </Stack>
        </Box>

        {/* Circular Actions - Sizes */}
        <Box>
          <Typography variant="h6" gutterBottom>Circular Actions - Sizes</Typography>
          <Stack direction="row" spacing={4} alignItems="flex-end">
            <AICircularAction label="Small" icon="zap" size="small" />
            <AICircularAction label="Medium" icon="zap" size="medium" />
            <AICircularAction label="Large" icon="zap" size="large" />
            <AICircularAction label="Small Primary" icon="zap" size="small" primary />
            <AICircularAction label="Medium Primary" icon="zap" size="medium" primary />
            <AICircularAction label="Large Primary" icon="zap" size="large" primary />
          </Stack>
        </Box>

        {/* Quick Replies */}
        <Box>
          <Typography variant="h6" gutterBottom>Quick Replies</Typography>
          <AIQuickReply
            options={[
              'Tell me more',
              'Show examples',
              'Explain in detail',
              'Start over',
            ]}
            onSelect={(option) => console.log('Selected:', option)}
          />
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// AI AVATARS STORIES
// ============================================================================

export const Avatars: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>AI Avatar</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Visual representation of the AI assistant.
      </Typography>

      <Stack spacing={4}>
        {/* Sizes */}
        <Box>
          <Typography variant="h6" gutterBottom>Sizes</Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box sx={{ textAlign: 'center' }}>
              <AIAvatar size="small" />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Small</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <AIAvatar size="medium" />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Medium</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <AIAvatar size="large" />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>Large</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Animated */}
        <Box>
          <Typography variant="h6" gutterBottom>Animated (Thinking State)</Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <AIAvatar size="medium" animated />
            <AITypingIndicator />
          </Stack>
        </Box>

        {/* Custom Icons */}
        <Box>
          <Typography variant="h6" gutterBottom>Custom Icons</Typography>
          <Stack direction="row" spacing={3}>
            <AIAvatar icon="zap" />
            <AIAvatar icon="star" />
            <AIAvatar icon="code" />
            <AIAvatar icon="chat" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// COMPLETE CHAT DEMO
// ============================================================================

export const CompleteChatDemo: StoryObj = {
  render: () => {
    const [inputValue, setInputValue] = useState('');

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Complete Chat Interface</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          A complete AI chat interface with all features.
        </Typography>

        <Paper
          sx={{
            maxWidth: 800,
            mx: 'auto',
            height: 600,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              background: aiTokens.gradient.subtle,
              borderBottom: `1px solid ${brandColors.neutral.gray100}`,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <AIAvatar size="small" />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>Trinity AI Assistant</Typography>
              <Typography variant="caption" color="text.secondary">
                Powered by advanced language models
              </Typography>
            </Box>
            <AILabel
              size="sm"
              popoverContent={
                <AIExplainability
                  title="Trinity AI Assistant"
                  description="An AI-powered assistant for data analysis and insights."
                  modelName="Trinity LLM v2.0"
                  confidence={98}
                  lastUpdated="Dec 22, 2025"
                />
              }
            />
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
            <AIChatMessage
              role="assistant"
              content="Hello! I'm your Trinity AI Assistant. I can help you analyze data, generate insights, and answer questions about your healthcare professional database. What would you like to know?"
              showCopy
              showFeedback
            />

            <AIChatMessage
              role="user"
              content="Show me the summary of Dr. Joe Charlett"
              userAvatar="RD"
            />

            <AIChatMessage
              role="assistant"
              content={
                <Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Sure, here is the HCP profile for "Dr. Joe Charlett"
                  </Typography>
                  
                  <AIContainer showLabel={false} sx={{ mb: 2 }}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">Name:</Typography>
                        <Typography variant="body2">Joe Charlett</Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">Specialty:</Typography>
                        <Typography variant="body2">Gastroenterologist</Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">Primary Affiliation:</Typography>
                        <Typography variant="body2">St. Mouvbourne Hospital</Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">HCP Segment:</Typography>
                        <Typography variant="body2">Must Win</Typography>
                      </Grid>
                    </Grid>
                  </AIContainer>

                  <AIExpandableSection title="Contact Information" icon="user" defaultExpanded>
                    <List dense disablePadding>
                      <ListItem disableGutters>
                        <ListItemText
                          primary="Address"
                          secondary="980, Oak Street, San Francisco, CA"
                          primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                          secondaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText
                          primary="Phone"
                          secondary="+1 765 123 7878"
                          primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                          secondaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    </List>
                  </AIExpandableSection>
                </Box>
              }
              showCopy
              showFeedback
              showShare
            />
          </Box>

          {/* Quick Replies */}
          <Box sx={{ px: 2, py: 1 }}>
            <AIQuickReply
              options={[
                'Show recent interactions',
                'Compare with similar HCPs',
                'Generate engagement plan',
              ]}
              onSelect={() => {}}
            />
          </Box>

          {/* Input */}
          <Box sx={{ p: 2, borderTop: `1px solid ${brandColors.neutral.gray100}` }}>
            <AIChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={() => setInputValue('')}
              placeholder="Ask about HCPs, segments, or insights..."
            />
          </Box>
        </Paper>
      </Box>
    );
  },
};

// ============================================================================
// JOB DESCRIPTION GENERATOR DEMO
// ============================================================================

export const JobDescriptionDemo: StoryObj = {
  render: () => {
    const [inputValue, setInputValue] = useState('');

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>AI-Assisted Form</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Form with AI assistance for generating content.
        </Typography>

        <Grid container spacing={3}>
          {/* Form Side */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Job Specifications</Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Job Family Group"
                      size="small"
                      SelectProps={{ native: true }}
                    >
                      <option value="">Select...</option>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Job Family Group"
                      size="small"
                      SelectProps={{ native: true }}
                    >
                      <option value="">Select...</option>
                    </TextField>
                  </Grid>
                </Grid>
                
                <TextField fullWidth label="Job Title*" size="small" />
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Experience*"
                      size="small"
                      SelectProps={{ native: true }}
                    >
                      <option value="">Select...</option>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Education Level*"
                      size="small"
                      SelectProps={{ native: true }}
                    >
                      <option value="">Select...</option>
                    </TextField>
                  </Grid>
                </Grid>

                <TextField fullWidth label="Key Skills*" size="small" />
                
                <TextField
                  fullWidth
                  label="Additional Requirements"
                  multiline
                  rows={3}
                  size="small"
                  placeholder="Any additional requirements or preferences..."
                />

                <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 3, pt: 2 }}>
                  <AICircularAction label="Clear Form" icon="x" />
                  <AICircularAction label="Find Similar JD's" icon="search" />
                  <AICircularAction label="Generate JD" icon="sparkles" primary />
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* Preview Side */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              sx={{
                height: '100%',
                minHeight: 500,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  p: 2,
                  background: brandColors.primary.light,
                  color: '#FFFFFF',
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Job Description Preview
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    backgroundColor: brandColors.neutral.gray100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Icon name="document" size="xl" sx={{ color: brandColors.neutral.gray400 }} />
                </Box>
                <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
                  No job description yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fill in the job specifications and click "Generate JD"
                  to create a job description
                </Typography>
              </Box>

              <Box sx={{ p: 2, borderTop: `1px solid ${brandColors.neutral.gray100}` }}>
                <AIChatInput
                  value={inputValue}
                  onChange={setInputValue}
                  placeholder="Want to change anything? Start typing here."
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  },
};

// ============================================================================
// STYLE TOKENS
// ============================================================================

export const StyleTokens: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>AI Style Tokens</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Color and style tokens for creating consistent AI experiences.
      </Typography>

      <Stack spacing={4}>
        {/* Gradients */}
        <Box>
          <Typography variant="h6" gutterBottom>Gradients</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3, background: aiTokens.gradient.primary, color: '#FFF' }}>
                <Typography variant="subtitle2">Primary Gradient</Typography>
                <Typography variant="caption">aiTokens.gradient.primary</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3, background: aiTokens.gradient.subtle }}>
                <Typography variant="subtitle2">Subtle Gradient</Typography>
                <Typography variant="caption">aiTokens.gradient.subtle</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                sx={{
                  p: 3,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    padding: '2px',
                    borderRadius: 'inherit',
                    background: aiTokens.gradient.border,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  },
                }}
              >
                <Typography variant="subtitle2">Border Gradient</Typography>
                <Typography variant="caption">aiTokens.gradient.border</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Colors */}
        <Box>
          <Typography variant="h6" gutterBottom>Colors</Typography>
          <Grid container spacing={2}>
            {Object.entries(aiTokens.colors).map(([name, value]) => (
              <Grid size={{ xs: 6, md: 3 }} key={name}>
                <Paper sx={{ p: 2 }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 60,
                      borderRadius: 1,
                      backgroundColor: value,
                      mb: 1,
                    }}
                  />
                  <Typography variant="caption" display="block">{name}</Typography>
                  <Typography variant="caption" color="text.secondary">{value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Glow Effect */}
        <Box>
          <Typography variant="h6" gutterBottom>Glow Effect</Typography>
          <Paper
            sx={{
              p: 3,
              boxShadow: aiTokens.gradient.glow,
              display: 'inline-block',
            }}
          >
            <Typography variant="subtitle2">Box with AI Glow</Typography>
            <Typography variant="caption">aiTokens.gradient.glow</Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// GRADIENT TEXT
// ============================================================================

export const GradientTextStory: StoryObj = {
  name: 'Gradient Text',
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Gradient Text</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Typography with Trinity brand gradient (coral to purple).
        Perfect for hero sections, stat displays, and emphasis.
      </Typography>

      <Stack spacing={4}>
        {/* Directions */}
        <Box>
          <Typography variant="h6" gutterBottom>Gradient Directions</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <GradientText variant="h2" direction="vertical">
                  Vertical
                </GradientText>
                <Typography variant="caption" color="text.secondary">
                  direction="vertical"
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <GradientText variant="h2" direction="horizontal">
                  Horizontal
                </GradientText>
                <Typography variant="caption" color="text.secondary">
                  direction="horizontal"
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <GradientText variant="h2" direction="diagonal">
                  Diagonal
                </GradientText>
                <Typography variant="caption" color="text.secondary">
                  direction="diagonal"
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Typography Variants */}
        <Box>
          <Typography variant="h6" gutterBottom>Typography Variants</Typography>
          <Stack spacing={2}>
            <GradientText variant="h1">Heading 1</GradientText>
            <GradientText variant="h2">Heading 2</GradientText>
            <GradientText variant="h3">Heading 3</GradientText>
            <GradientText variant="h4">Heading 4</GradientText>
            <GradientText variant="h5">Heading 5</GradientText>
            <GradientText variant="h6">Heading 6</GradientText>
          </Stack>
        </Box>

        {/* Large Numbers */}
        <Box>
          <Typography variant="h6" gutterBottom>Large Numbers (Stat Display)</Typography>
          <Grid container spacing={3}>
            {['30', '70%', '350+', '90%'].map((value) => (
              <Grid size={{ xs: 6, md: 3 }} key={value}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <GradientText
                    variant="h1"
                    fontWeight={700}
                    sx={{ fontSize: { xs: '3rem', md: '4rem' } }}
                  >
                    {value}
                  </GradientText>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// STAT CARDS
// ============================================================================

export const StatCards: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Stat Cards</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Display statistics with optional gradient text for emphasis.
        Great for dashboards, landing pages, and summary views.
      </Typography>

      <Stack spacing={4}>
        {/* Basic Stat Cards */}
        <Box>
          <Typography variant="h6" gutterBottom>Basic Usage</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                label="Total Users"
                value="30"
                description="Active accounts"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                label="Satisfaction"
                value="70%"
                description="Customer rating"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                label="Projects"
                value="350+"
                description="Completed this year"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                label="Uptime"
                value="90%"
                description="System availability"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Without Gradient */}
        <Box>
          <Typography variant="h6" gutterBottom>Without Gradient</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                label="Revenue"
                value="$2.4M"
                description="Annual recurring"
                gradient={false}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                label="Growth"
                value="124%"
                description="Year over year"
                gradient={false}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                label="Team"
                value="48"
                description="Team members"
                gradient={false}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Clickable Cards */}
        <Box>
          <Typography variant="h6" gutterBottom>Interactive Cards</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                label="Open Issues"
                value="12"
                description="Click to view"
                onClick={() => alert('Viewing open issues...')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                label="Pull Requests"
                value="5"
                description="Ready for review"
                onClick={() => alert('Viewing PRs...')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                label="Deployments"
                value="89"
                description="This month"
                onClick={() => alert('Viewing deployments...')}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// GRADIENT ICON BADGES
// ============================================================================

export const GradientIconBadges: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Gradient Icon Badges</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Icons displayed in gradient-colored badges with a distinctive rounded shape.
      </Typography>

      <Stack spacing={4}>
        {/* Sizes */}
        <Box>
          <Typography variant="h6" gutterBottom>Sizes</Typography>
          <Stack direction="row" spacing={4} alignItems="flex-end">
            <Stack alignItems="center" spacing={1}>
              <GradientIconBadge icon="sparkles" size="small" />
              <Typography variant="caption">Small</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <GradientIconBadge icon="sparkles" size="medium" />
              <Typography variant="caption">Medium</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <GradientIconBadge icon="sparkles" size="large" />
              <Typography variant="caption">Large</Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Different Icons */}
        <Box>
          <Typography variant="h6" gutterBottom>Various Icons</Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
            <GradientIconBadge icon="bolt" size="medium" />
            <GradientIconBadge icon="brain" size="medium" />
            <GradientIconBadge icon="rocket" size="medium" />
            <GradientIconBadge icon="chart-bar" size="medium" />
            <GradientIconBadge icon="heart" size="medium" />
            <GradientIconBadge icon="star" size="medium" />
            <GradientIconBadge icon="shield-check" size="medium" />
            <GradientIconBadge icon="lightbulb" size="medium" />
          </Stack>
        </Box>

        {/* With Text */}
        <Box>
          <Typography variant="h6" gutterBottom>With Labels</Typography>
          <Grid container spacing={3}>
            {[
              { icon: 'bolt', label: 'Performance' },
              { icon: 'shield-check', label: 'Security' },
              { icon: 'chart-bar', label: 'Analytics' },
              { icon: 'sparkles', label: 'AI Features' },
            ].map((item) => (
              <Grid size={{ xs: 6, sm: 3 }} key={item.icon}>
                <Stack alignItems="center" spacing={2}>
                  <GradientIconBadge icon={item.icon} size="large" />
                  <Typography variant="subtitle2">{item.label}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  ),
};

// ============================================================================
// INSIGHT ENGINE PANEL STORIES
// ============================================================================

export const InsightEngine: StoryObj = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Insight Engine Panel</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A full-featured AI chat panel with voice input, dictation, deep thinking mode,
        and source citations. Supports both light and dark themes with Trinity branding.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Light Theme</Typography>
      <Paper elevation={2} sx={{ height: 600, overflow: 'hidden', borderRadius: 2, mb: 4 }}>
        <ThemeProvider theme={lightTheme}>
          <InsightEnginePanel
            title="Insight Engine"
            demoMode={true}
            themeMode="light"
            showControls={true}
            onClose={() => console.log('Close clicked')}
            onFullscreenToggle={() => console.log('Fullscreen clicked')}
            onNewThread={() => console.log('New thread clicked')}
            onSendMessage={(msg, opts) => console.log('Message sent:', msg, opts)}
          />
        </ThemeProvider>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Dark Theme</Typography>
      <Paper elevation={2} sx={{ height: 600, overflow: 'hidden', borderRadius: 2, mb: 4 }}>
        <ThemeProvider theme={darkTheme}>
          <InsightEnginePanel
            title="Insight Engine"
            demoMode={true}
            themeMode="dark"
            showControls={true}
            onClose={() => console.log('Close clicked')}
            onFullscreenToggle={() => console.log('Fullscreen clicked')}
            onNewThread={() => console.log('New thread clicked')}
            onSendMessage={(msg, opts) => console.log('Message sent:', msg, opts)}
          />
        </ThemeProvider>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Features</Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>🎤 Voice Input</Typography>
              <Typography variant="body2" color="text.secondary">
                Two voice modes available:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Dictation Mode" 
                    secondary="Click the microphone icon to transcribe speech to text"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Voice Mode" 
                    secondary="Click the waveform button for full voice conversation with visual feedback"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>🔍 Search Modes</Typography>
              <Typography variant="body2" color="text.secondary">
                Multiple search and thinking modes:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Search Mode" 
                    secondary="Standard search across all sources"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Deep Think Mode" 
                    secondary="Enable reasoning/pro mode for complex questions"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>📎 Actions</Typography>
              <Typography variant="body2" color="text.secondary">
                Available toolbar actions:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Web Search" secondary="Search the web for information" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Attach Files" secondary="Upload documents for context" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>💬 Response Features</Typography>
              <Typography variant="body2" color="text.secondary">
                AI responses include:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Source Citations" secondary="Clickable source cards with links" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Related Questions" secondary="Follow-up suggestions to continue" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Actions" secondary="Copy, rate, share, and regenerate responses" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  ),
};

export const InsightEngineLightOnly: StoryObj = {
  render: () => (
    <Box sx={{ height: 500 }}>
      <ThemeProvider theme={lightTheme}>
        <InsightEnginePanel
          title="Insight Engine"
          demoMode={true}
          themeMode="light"
          showControls={true}
          placeholder="Ask me anything..."
          onSendMessage={(msg) => console.log('Message:', msg)}
        />
      </ThemeProvider>
    </Box>
  ),
};

export const InsightEngineDarkOnly: StoryObj = {
  render: () => (
    <Box sx={{ height: 500 }}>
      <ThemeProvider theme={darkTheme}>
        <InsightEnginePanel
          title="Insight Engine"
          demoMode={true}
          themeMode="dark"
          showControls={true}
          placeholder="Ask me anything..."
          onSendMessage={(msg) => console.log('Message:', msg)}
        />
      </ThemeProvider>
    </Box>
  ),
};

// Interactive fullscreen story with boxed layout toggle
const InsightEngineFullscreenWrapper = () => {
  const [boxedLayout, setBoxedLayout] = useState(true);
  
  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <ThemeProvider theme={lightTheme}>
        <InsightEnginePanel
          title="Insight Engine"
          demoMode={true}
          themeMode="light"
          showControls={true}
          isFullscreen={true}
          boxedLayout={boxedLayout}
          onBoxedLayoutToggle={() => setBoxedLayout(!boxedLayout)}
          placeholder="Ask me anything..."
          onSendMessage={(msg) => console.log('Message:', msg)}
        />
      </ThemeProvider>
    </Box>
  );
};

export const InsightEngineFullscreen: StoryObj = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => <InsightEngineFullscreenWrapper />,
};

// Dark mode fullscreen with boxed layout toggle
const InsightEngineDarkFullscreenWrapper = () => {
  const [boxedLayout, setBoxedLayout] = useState(true);
  
  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <ThemeProvider theme={darkTheme}>
        <InsightEnginePanel
          title="Insight Engine"
          demoMode={true}
          themeMode="dark"
          showControls={true}
          isFullscreen={true}
          boxedLayout={boxedLayout}
          onBoxedLayoutToggle={() => setBoxedLayout(!boxedLayout)}
          placeholder="Ask me anything..."
          onSendMessage={(msg) => console.log('Message:', msg)}
        />
      </ThemeProvider>
    </Box>
  );
};

export const InsightEngineDarkFullscreen: StoryObj = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => <InsightEngineDarkFullscreenWrapper />,
};

// Import ChatMessage type for the controlled demo
import type { ChatMessage } from '../components/AppLayout/InsightEnginePanel';

// Interactive demo showing chat continuity between side panel and fullscreen
const InsightEngineChatContinuityWrapper = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [boxedLayout, setBoxedLayout] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (msg: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a response to: "${msg}". The chat continuity is maintained when switching between side panel and fullscreen views because we're using controlled state (messages prop) instead of internal state.`,
        timestamp: new Date(),
        sources: [
          { id: '1', name: 'Documentation', count: 3 },
          { id: '2', name: 'Knowledge Base', count: 5 },
        ],
        relatedQuestions: [
          'How does controlled state work?',
          'What are the benefits of this approach?',
        ],
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex' }}>
      <ThemeProvider theme={lightTheme}>
        {/* Side panel view */}
        {!isFullscreen && (
          <Box sx={{ width: 400, height: '100%', borderRight: '1px solid #E5E7EB' }}>
            <InsightEnginePanel
              title="Insight Engine"
              demoMode={false}
              themeMode="light"
              showControls={true}
              isFullscreen={false}
              messages={messages}
              onMessagesChange={setMessages}
              isTyping={isTyping}
              onFullscreenToggle={() => setIsFullscreen(true)}
              placeholder="Ask me anything..."
              onSendMessage={handleSendMessage}
              userInitials="JS"
            />
          </Box>
        )}
        {/* Fullscreen view */}
        {isFullscreen && (
          <Box sx={{ flex: 1, height: '100%' }}>
            <InsightEnginePanel
              title="Insight Engine"
              demoMode={false}
              themeMode="light"
              showControls={true}
              isFullscreen={true}
              boxedLayout={boxedLayout}
              onBoxedLayoutToggle={() => setBoxedLayout(!boxedLayout)}
              messages={messages}
              onMessagesChange={setMessages}
              isTyping={isTyping}
              onFullscreenToggle={() => setIsFullscreen(false)}
              placeholder="Ask me anything..."
              onSendMessage={handleSendMessage}
              userInitials="JS"
            />
          </Box>
        )}
      </ThemeProvider>
    </Box>
  );
};

export const InsightEngineChatContinuity: StoryObj = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates chat continuity when switching between side panel and fullscreen views using controlled state (messages prop). Send a message, then click the fullscreen button to see the chat history preserved.',
      },
    },
  },
  render: () => <InsightEngineChatContinuityWrapper />,
};
