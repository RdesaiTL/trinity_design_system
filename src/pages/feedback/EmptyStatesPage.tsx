import * as React from 'react';
import { Paper } from '@mui/material';
import { ComponentPage, Section } from '../../components/shared';
import { IllustratedMessage } from '../../components/IllustratedMessage';
import { IconProvider } from '../../components/Icon';

export const EmptyStatesPage: React.FC = () => {
  return (
    <IconProvider defaultLibrary="material">
      <ComponentPage
        title="Empty States"
        description="Empty states communicate that there is no data to display and guide users on what to do next."
      >
        <Section title="Search Results">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <IllustratedMessage
              illustration="no-results"
              title="No results found"
              description="Try adjusting your search or filters to find what you're looking for."
              primaryAction={{
                label: 'Clear Filters',
                onClick: () => {},
              }}
            />
          </Paper>
        </Section>

        <Section title="Empty Data">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <IllustratedMessage
              illustration="empty-table"
              title="No items yet"
              description="Get started by creating your first item."
              primaryAction={{
                label: 'Create Item',
                onClick: () => {},
              }}
              secondaryAction={{
                label: 'Learn More',
                onClick: () => {},
              }}
            />
          </Paper>
        </Section>

        <Section title="Error State">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <IllustratedMessage
              illustration="error-generic"
              title="Something went wrong"
              description="We encountered an error while loading your data. Please try again."
              primaryAction={{
                label: 'Retry',
                onClick: () => {},
              }}
            />
          </Paper>
        </Section>

        <Section title="Success State">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <IllustratedMessage
              illustration="success"
              title="All done!"
              description="You've completed all your tasks for today."
            />
          </Paper>
        </Section>

        <Section title="No Connection">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <IllustratedMessage
              illustration="offline"
              title="No internet connection"
              description="Check your network settings and try again."
              primaryAction={{
                label: 'Retry',
                onClick: () => {},
              }}
            />
          </Paper>
        </Section>

        <Section title="Compact Variant">
          <Stack direction="row" spacing={3}>
            <Paper sx={{ p: 3, flex: 1, textAlign: 'center' }}>
              <IllustratedMessage
                illustration="no-notifications"
                title="No notifications"
                size="small"
              />
            </Paper>
            <Paper sx={{ p: 3, flex: 1, textAlign: 'center' }}>
              <IllustratedMessage
                illustration="no-results"
                title="No matches"
                size="small"
              />
            </Paper>
          </Stack>
        </Section>
      </ComponentPage>
    </IconProvider>
  );
};
