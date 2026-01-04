import * as React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ComponentPage, Section } from '../../components/shared';

const Item = ({ children }: { children: React.ReactNode }) => (
  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>{children}</Paper>
);

export const GridPage: React.FC = () => (
  <ComponentPage
    title="Grid"
    description="The Grid component uses CSS flexbox for high flexibility."
  >
    <Section title="Basic Grid">
      <Grid container spacing={2}>
        <Grid size={8}><Item>size=8</Item></Grid>
        <Grid size={4}><Item>size=4</Item></Grid>
        <Grid size={4}><Item>size=4</Item></Grid>
        <Grid size={8}><Item>size=8</Item></Grid>
      </Grid>
    </Section>

    <Section title="Spacing">
      <Typography variant="body2" sx={{ mb: 2 }}>spacing=2</Typography>
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((value) => (
          <Grid size={3} key={value}><Item>{value}</Item></Grid>
        ))}
      </Grid>
      <Typography variant="body2" sx={{ mb: 2, mt: 3 }}>spacing=4</Typography>
      <Grid container spacing={4}>
        {[1, 2, 3, 4].map((value) => (
          <Grid size={3} key={value}><Item>{value}</Item></Grid>
        ))}
      </Grid>
    </Section>

    <Section title="Responsive Values">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}><Item>xs=12 sm=6 md=4</Item></Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}><Item>xs=12 sm=6 md=4</Item></Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}><Item>xs=12 sm=6 md=4</Item></Grid>
        <Grid size={{ xs: 12, sm: 6, md: 8 }}><Item>xs=12 sm=6 md=8</Item></Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}><Item>xs=12 sm=6 md=4</Item></Grid>
      </Grid>
    </Section>

    <Section title="Auto Layout">
      <Grid container spacing={2}>
        <Grid size="auto"><Item>auto</Item></Grid>
        <Grid size={6}><Item>size=6</Item></Grid>
        <Grid size="grow"><Item>grow</Item></Grid>
      </Grid>
    </Section>

    <Section title="Row & Column Spacing">
      <Grid container rowSpacing={3} columnSpacing={1}>
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <Grid size={4} key={value}><Item>{value}</Item></Grid>
        ))}
      </Grid>
    </Section>

    <Section title="Direction">
      <Typography variant="body2" sx={{ mb: 2 }}>direction="row" (default)</Typography>
      <Grid container spacing={2} direction="row">
        <Grid><Item>1</Item></Grid>
        <Grid><Item>2</Item></Grid>
        <Grid><Item>3</Item></Grid>
      </Grid>
      <Typography variant="body2" sx={{ mb: 2, mt: 3 }}>direction="row-reverse"</Typography>
      <Grid container spacing={2} direction="row-reverse">
        <Grid><Item>1</Item></Grid>
        <Grid><Item>2</Item></Grid>
        <Grid><Item>3</Item></Grid>
      </Grid>
      <Typography variant="body2" sx={{ mb: 2, mt: 3 }}>direction="column"</Typography>
      <Grid container spacing={2} direction="column">
        <Grid><Item>1</Item></Grid>
        <Grid><Item>2</Item></Grid>
        <Grid><Item>3</Item></Grid>
      </Grid>
    </Section>

    <Section title="Nested Grid">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid size={6}><Item>Nested 1</Item></Grid>
              <Grid size={6}><Item>Nested 2</Item></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Section>
  </ComponentPage>
);
