import * as React from 'react';
import { useState } from 'react';
import { Box, Stack, Typography, Paper, Button } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';
import {
  AILabel,
  AIAvatar,
  AIChatMessage,
  AIChatInput,
  AISourcesSection,
  AISuggestedAction,
  AIContainer,
  AIPersonaCard,
  AIExpandableSection,
  AITypingIndicator,
  AIQuickReply,
  GradientText,
} from '../../components/AI';
import { IconProvider } from '../../components/Icon';

export const AIPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <IconProvider defaultLibrary="material">
      <ComponentPage
        title="AI Components"
        description="AI components provide visual identity and explainability for AI-generated content. They ensure transparency and build user trust."
      >
        <Section title="AI Labels">
          <Showcase>
            <AILabel size="mini" />
            <AILabel size="xs" />
            <AILabel size="sm" />
            <AILabel size="md" />
            <AILabel size="lg" />
          </Showcase>
        </Section>

        <Section title="AI Avatar">
          <Showcase>
            <AIAvatar size="small" />
            <AIAvatar size="medium" />
            <AIAvatar size="large" />
            <AIAvatar size="medium" animated />
          </Showcase>
        </Section>

        <Section title="Chat Messages">
          <Paper sx={{ p: 2, maxWidth: 600 }}>
            <Stack spacing={2}>
              <AIChatMessage
                role="user"
                content="What can you help me with today?"
              />
              <AIChatMessage
                role="assistant"
                content="I can help you with a variety of tasks including answering questions, providing information, and assisting with analysis. What would you like to explore?"
              />
              <AITypingIndicator />
            </Stack>
          </Paper>
        </Section>

        <Section title="Chat Input">
          <Box sx={{ maxWidth: 600 }}>
            <AIChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={(val) => {
                console.log('Submitted:', val);
                setInputValue('');
              }}
              placeholder="Ask me anything..."
            />
          </Box>
        </Section>

        <Section title="Sources Section">
          <Paper sx={{ p: 2, maxWidth: 500 }}>
            <AISourcesSection
              sources={[
                { title: 'Clinical Guidelines - J Clin Med, 2024' },
                { title: 'Research Study - NEJM, 2024' },
                { title: 'FDA Approval Summary - 2024' },
              ]}
            />
          </Paper>
        </Section>

        <Section title="Suggested Actions">
          <Showcase>
            <AISuggestedAction label="Tell me more about this topic" />
            <AISuggestedAction label="Show me examples" variant="primary" />
            <AISuggestedAction label="Explain in simpler terms" />
          </Showcase>
        </Section>

        <Section title="Quick Replies">
          <Showcase>
            <AIQuickReply options={['Yes', 'No', 'Maybe later']} onSelect={(opt) => console.log(opt)} />
          </Showcase>
        </Section>

        <Section title="AI Container">
          <AIContainer title="AI Analysis" subtitle="Generated insights">
            <Typography variant="body2">
              Based on the data provided, here are the key insights and recommendations
              for your review. This analysis was generated using advanced machine learning
              algorithms.
            </Typography>
          </AIContainer>
        </Section>

        <Section title="Persona Card">
          <Box sx={{ maxWidth: 350 }}>
            <AIPersonaCard
              name="Dr. Sarah Chen"
              description="Board-certified physician with expertise in internal medicine and patient care."
              capabilities={['Medical Advice', 'Patient Care']}
            />
          </Box>
        </Section>

        <Section title="Expandable Section">
          <Paper sx={{ p: 2, maxWidth: 500 }}>
            <AIExpandableSection
              title="How was this generated?"
              defaultExpanded={false}
            >
              <Typography variant="body2" color="text.secondary">
                This content was generated using a large language model trained on medical
                literature. The model analyzes patterns in the data to provide relevant
                information and recommendations.
              </Typography>
            </AIExpandableSection>
          </Paper>
        </Section>

        <Section title="Gradient Text">
          <Showcase>
            <GradientText variant="h4">AI-Powered Insights</GradientText>
            <GradientText variant="h6">Machine Learning Results</GradientText>
          </Showcase>
        </Section>
      </ComponentPage>
    </IconProvider>
  );
};
