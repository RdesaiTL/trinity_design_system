import * as React from 'react';
import { Breadcrumbs, Link, Typography, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { ComponentPage, Section } from '../../components/shared';

export const BreadcrumbsPage: React.FC = () => (
  <ComponentPage
    title="Breadcrumbs"
    description="Breadcrumbs allow users to make selections from a range of values."
  >
    <Section title="Basic">
      <Breadcrumbs aria-label="breadcrumb">
        <Link component="button" underline="hover" color="inherit">Home</Link>
        <Link component="button" underline="hover" color="inherit">Catalog</Link>
        <Typography sx={{ color: 'text.primary' }}>Accessories</Typography>
      </Breadcrumbs>
    </Section>

    <Section title="Custom Separator">
      <Stack spacing={2}>
        <Breadcrumbs separator="›">
          <Link component="button" underline="hover" color="inherit">Home</Link>
          <Link component="button" underline="hover" color="inherit">Catalog</Link>
          <Typography color="text.primary">Accessories</Typography>
        </Breadcrumbs>
        <Breadcrumbs separator="-">
          <Link component="button" underline="hover" color="inherit">Home</Link>
          <Link component="button" underline="hover" color="inherit">Catalog</Link>
          <Typography color="text.primary">Accessories</Typography>
        </Breadcrumbs>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link component="button" underline="hover" color="inherit">Home</Link>
          <Link component="button" underline="hover" color="inherit">Catalog</Link>
          <Typography color="text.primary">Accessories</Typography>
        </Breadcrumbs>
      </Stack>
    </Section>

    <Section title="With Icons">
      <Breadcrumbs aria-label="breadcrumb">
        <Link component="button" underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link component="button" underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit">
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Catalog
        </Link>
        <Typography sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
          Accessories
        </Typography>
      </Breadcrumbs>
    </Section>

    <Section title="Collapsed">
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <Link component="button" underline="hover" color="inherit">Home</Link>
        <Link component="button" underline="hover" color="inherit">Catalog</Link>
        <Link component="button" underline="hover" color="inherit">Accessories</Link>
        <Link component="button" underline="hover" color="inherit">New Collection</Link>
        <Typography color="text.primary">Belts</Typography>
      </Breadcrumbs>
    </Section>

    <Section title="Custom Collapsed">
      <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
        <Link component="button" underline="hover" color="inherit">Home</Link>
        <Link component="button" underline="hover" color="inherit">Catalog</Link>
        <Link component="button" underline="hover" color="inherit">Accessories</Link>
        <Link component="button" underline="hover" color="inherit">New Collection</Link>
        <Typography color="text.primary">Belts</Typography>
      </Breadcrumbs>
    </Section>
  </ComponentPage>
);
