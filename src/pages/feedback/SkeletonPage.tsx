import * as React from 'react';
import { Skeleton, Box, Typography, Avatar, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const SkeletonPage: React.FC = () => (
  <ComponentPage
    title="Skeleton"
    description="Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration."
  >
    <Section title="Variants">
      <Showcase direction="column">
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={210} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Showcase>
    </Section>

    <Section title="Animations">
      <Showcase direction="column">
        <Skeleton animation="wave" width={210} height={40} />
        <Skeleton animation="pulse" width={210} height={40} />
        <Skeleton animation={false} width={210} height={40} />
      </Showcase>
    </Section>

    <Section title="Text Example">
      <Box sx={{ width: 300 }}>
        <Typography variant="h4"><Skeleton /></Typography>
        <Typography variant="body1"><Skeleton /></Typography>
        <Typography variant="body1"><Skeleton /></Typography>
        <Typography variant="body1"><Skeleton width="60%" /></Typography>
      </Box>
    </Section>

    <Section title="Avatar Example">
      <Showcase>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box>
            <Skeleton width={120} height={20} />
            <Skeleton width={80} height={16} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar>U</Avatar>
          <Box>
            <Typography>User Name</Typography>
            <Typography variant="body2" color="text.secondary">Loaded</Typography>
          </Box>
        </Box>
      </Showcase>
    </Section>

    <Section title="Card Example">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardHeader
              avatar={<Skeleton variant="circular" width={40} height={40} />}
              title={<Skeleton width="80%" />}
              subheader={<Skeleton width="40%" />}
            />
            <Skeleton variant="rectangular" height={194} />
            <CardContent>
              <Skeleton />
              <Skeleton width="60%" />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardHeader
              avatar={<Avatar>R</Avatar>}
              title="Real Card"
              subheader="September 14, 2024"
            />
            <Box sx={{ height: 194, bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">Image Area</Typography>
            </Box>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This is a loaded card with actual content displayed.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Section>

    <Section title="Different Heights">
      <Showcase>
        <Skeleton variant="rectangular" width={100} height={40} />
        <Skeleton variant="rectangular" width={100} height={80} />
        <Skeleton variant="rectangular" width={100} height={120} />
      </Showcase>
    </Section>
  </ComponentPage>
);
