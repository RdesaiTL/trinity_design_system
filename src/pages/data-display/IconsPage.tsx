import * as React from 'react';
import { Box, Stack, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';
import { Icon, IconProvider } from '../../components/Icon';
import { brandColors } from '../../tokens';

export const IconsPage: React.FC = () => {
  const commonIcons = [
    'home', 'settings', 'search', 'menu', 'close', 'add', 'remove',
    'edit', 'delete', 'save', 'share', 'download', 'upload', 'refresh',
    'check', 'warning', 'error', 'info', 'help', 'notification',
    'person', 'group', 'email', 'phone', 'calendar', 'clock',
    'folder', 'file', 'image', 'video', 'music', 'link',
    'star', 'favorite', 'bookmark', 'visibility', 'lock', 'unlock',
  ];

  return (
    <IconProvider defaultLibrary="material">
      <ComponentPage
        title="Icons"
        description="Icons are visual symbols used to represent objects, actions, or concepts. The Trinity Design System uses Material Icons with custom styling."
      >
        <Section title="Icon Sizes">
          <Showcase>
            <Stack direction="row" spacing={3} alignItems="center">
              <Box textAlign="center">
                <Icon name="star" size="xs" />
                <Typography variant="caption" display="block">xs</Typography>
              </Box>
              <Box textAlign="center">
                <Icon name="star" size="small" />
                <Typography variant="caption" display="block">small</Typography>
              </Box>
              <Box textAlign="center">
                <Icon name="star" size="medium" />
                <Typography variant="caption" display="block">medium</Typography>
              </Box>
              <Box textAlign="center">
                <Icon name="star" size="large" />
                <Typography variant="caption" display="block">large</Typography>
              </Box>
              <Box textAlign="center">
                <Icon name="star" size="xl" />
                <Typography variant="caption" display="block">xl</Typography>
              </Box>
            </Stack>
          </Showcase>
        </Section>

        <Section title="Icon Colors">
          <Showcase>
            <Icon name="favorite" color="primary" size="large" />
            <Icon name="favorite" color="secondary" size="large" />
            <Icon name="favorite" color="error" size="large" />
            <Icon name="favorite" color="warning" size="large" />
            <Icon name="favorite" color="success" size="large" />
            <Icon name="favorite" color="info" size="large" />
            <Icon name="favorite" sx={{ color: brandColors.primary.light }} size="large" />
          </Showcase>
        </Section>

        <Section title="Common Icons">
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2}>
              {commonIcons.map((iconName) => (
                <Grid size={{ xs: 4, sm: 3, md: 2 }} key={iconName}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 1,
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Icon name={iconName} size="medium" />
                    <Typography variant="caption" sx={{ mt: 0.5, textAlign: 'center' }}>
                      {iconName}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Section>

        <Section title="Icon in Context">
          <Showcase>
            <Card sx={{ maxWidth: 300 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Icon name="info" color="info" />
                  <Typography variant="subtitle1">Information</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Icons help users quickly identify content and actions.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 300 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Icon name="warning" color="warning" />
                  <Typography variant="subtitle1">Warning</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Use appropriate icons to convey the right message.
                </Typography>
              </CardContent>
            </Card>
          </Showcase>
        </Section>
      </ComponentPage>
    </IconProvider>
  );
};
