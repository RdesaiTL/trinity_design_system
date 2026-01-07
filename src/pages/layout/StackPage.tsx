import * as React from 'react';
import { Stack, Box, Paper, Divider, Typography } from '@mui/material';
import { ComponentPage, Section } from '../../components/shared';

const Item = ({ children }: { children: React.ReactNode }) => (
  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>{children}</Paper>
);

export const StackPage: React.FC = () => (
  <ComponentPage
    title="Stack"
    description="Stack is a container component for arranging elements vertically or horizontally."
  >
    <Section title="Basic">
      <Stack spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </Section>

    <Section title="Direction">
      <Typography variant="body2" sx={{ mb: 2 }}>direction="row"</Typography>
      <Stack direction="row" spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
      <Typography variant="body2" sx={{ mb: 2, mt: 3 }}>direction="row-reverse"</Typography>
      <Stack direction="row-reverse" spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
      <Typography variant="body2" sx={{ mb: 2, mt: 3 }}>direction="column-reverse"</Typography>
      <Stack direction="column-reverse" spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </Section>

    <Section title="Spacing">
      <Typography variant="body2" sx={{ mb: 2 }}>spacing=1</Typography>
      <Stack direction="row" spacing={1}>
        <Item>1</Item><Item>2</Item><Item>3</Item>
      </Stack>
      <Typography variant="body2" sx={{ mb: 2, mt: 3 }}>spacing=2</Typography>
      <Stack direction="row" spacing={2}>
        <Item>1</Item><Item>2</Item><Item>3</Item>
      </Stack>
      <Typography variant="body2" sx={{ mb: 2, mt: 3 }}>spacing=4</Typography>
      <Stack direction="row" spacing={4}>
        <Item>1</Item><Item>2</Item><Item>3</Item>
      </Stack>
    </Section>

    <Section title="Dividers">
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </Section>

    <Section title="Responsive">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </Section>

    <Section title="Alignment">
      <Typography variant="body2" sx={{ mb: 2 }}>alignItems="center"</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Paper sx={{ p: 1, height: 40 }}>Short</Paper>
        <Paper sx={{ p: 1, height: 80 }}>Tall</Paper>
        <Paper sx={{ p: 1, height: 60 }}>Medium</Paper>
      </Stack>
      <Typography variant="body2" sx={{ mb: 2, mt: 3 }}>justifyContent="space-between"</Typography>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </Stack>
    </Section>

    <Section title="Flex Wrap">
      <Box sx={{ width: 300 }}>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Item key={i}>Item {i}</Item>
          ))}
        </Stack>
      </Box>
    </Section>
  </ComponentPage>
);
