import * as React from 'react';
import { Box, Stack, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';
import {
  IconIndicator,
  ShapeIndicator,
  StatusDot,
  BadgeIndicator,
  DifferentialIndicator,
  StatusChip,
  InlineStatus,
  StatusLegend,
} from '../../components/StatusIndicator';
import { IconProvider } from '../../components/Icon';

export const StatusIndicatorPage: React.FC = () => {
  return (
    <IconProvider defaultLibrary="material">
      <ComponentPage
        title="Status Indicator"
        description="Status indicators communicate severity-level information to users through colors, shapes, and icons."
      >
        <Section title="Icon Indicators">
          <Showcase>
            <IconIndicator status="success" label="Complete" />
            <IconIndicator status="error" label="Failed" />
            <IconIndicator status="warning" label="Warning" />
            <IconIndicator status="info" label="Information" />
            <IconIndicator status="pending" label="Pending" />
            <IconIndicator status="in-progress" label="In Progress" />
          </Showcase>
        </Section>

        <Section title="Shape Indicators">
          <Showcase>
            <ShapeIndicator status="success" label="Active" />
            <ShapeIndicator status="error" label="Error" />
            <ShapeIndicator status="warning" label="Attention" />
            <ShapeIndicator status="info" label="Info" />
            <ShapeIndicator status="draft" label="Draft" />
          </Showcase>
        </Section>

        <Section title="Status Dots">
          <Showcase>
            <Stack direction="row" spacing={2} alignItems="center">
              <StatusDot status="success" />
              <StatusDot status="error" />
              <StatusDot status="warning" />
              <StatusDot status="info" />
              <StatusDot status="pending" />
              <StatusDot status="inactive" pulse />
            </Stack>
          </Showcase>
        </Section>

        <Section title="Badge Indicators">
          <Showcase>
            <BadgeIndicator count={5} status="error">
              <Box sx={{ width: 40, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
            </BadgeIndicator>
            <BadgeIndicator count={12} status="warning">
              <Box sx={{ width: 40, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
            </BadgeIndicator>
            <BadgeIndicator count={99} status="info" max={99}>
              <Box sx={{ width: 40, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
            </BadgeIndicator>
          </Showcase>
        </Section>

        <Section title="Differential Indicators">
          <Showcase>
            <DifferentialIndicator value={12.5} percentage />
            <DifferentialIndicator value={-8.3} percentage />
            <DifferentialIndicator value={0} percentage />
            <DifferentialIndicator value={1500} currency="$" />
            <DifferentialIndicator value={-500} currency="$" />
          </Showcase>
        </Section>

        <Section title="Status Chips">
          <Showcase>
            <StatusChip status="success" label="Approved" />
            <StatusChip status="error" label="Rejected" />
            <StatusChip status="warning" label="Pending Review" />
            <StatusChip status="info" label="New" />
            <StatusChip status="draft" label="Draft" />
            <StatusChip status="inactive" label="Archived" />
          </Showcase>
        </Section>

        <Section title="Inline Status">
          <Paper sx={{ p: 2 }}>
            <Stack spacing={1}>
              <InlineStatus status="success" label="Order completed successfully" />
              <InlineStatus status="error" label="Payment failed" />
              <InlineStatus status="warning" label="Low inventory warning" />
              <InlineStatus status="in-progress" label="Processing your request" />
            </Stack>
          </Paper>
        </Section>

        <Section title="Status Legend">
          <Paper sx={{ p: 2, maxWidth: 400 }}>
            <StatusLegend
              items={[
                { status: 'success', label: 'Active' },
                { status: 'warning', label: 'Pending' },
                { status: 'error', label: 'Error' },
                { status: 'inactive', label: 'Inactive' },
              ]}
            />
          </Paper>
        </Section>
      </ComponentPage>
    </IconProvider>
  );
};
