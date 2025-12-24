import * as React from 'react';
import { Breadcrumbs, Link, Typography, Stack, Chip } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const BreadcrumbsPage: React.FC = () => (
  <ComponentPage
    title="Breadcrumbs"
    description="Breadcrumbs allow users to make selections from a range of values."
  >
    <Section title="Basic">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">Home</Link>
        <Link underline="hover" color="inherit" href="#">Catalog</Link>
        <Typography sx={{ color: 'text.primary' }}>Accessories</Typography>
      </Breadcrumbs>
    </Section>

    <Section title="Custom Separator">
      <Stack spacing={2}>
        <Breadcrumbs separator="›">
          <Link underline="hover" color="inherit" href="#">Home</Link>
          <Link underline="hover" color="inherit" href="#">Catalog</Link>
          <Typography color="text.primary">Accessories</Typography>
        </Breadcrumbs>
        <Breadcrumbs separator="-">
          <Link underline="hover" color="inherit" href="#">Home</Link>
          <Link underline="hover" color="inherit" href="#">Catalog</Link>
          <Typography color="text.primary">Accessories</Typography>
        </Breadcrumbs>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link underline="hover" color="inherit" href="#">Home</Link>
          <Link underline="hover" color="inherit" href="#">Catalog</Link>
          <Typography color="text.primary">Accessories</Typography>
        </Breadcrumbs>
      </Stack>
    </Section>

    <Section title="With Icons">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="#">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="#">
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
        <Link underline="hover" color="inherit" href="#">Home</Link>
        <Link underline="hover" color="inherit" href="#">Catalog</Link>
        <Link underline="hover" color="inherit" href="#">Accessories</Link>
        <Link underline="hover" color="inherit" href="#">New Collection</Link>
        <Typography color="text.primary">Belts</Typography>
      </Breadcrumbs>
    </Section>

    <Section title="Custom Collapsed">
      <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
        <Link underline="hover" color="inherit" href="#">Home</Link>
        <Link underline="hover" color="inherit" href="#">Catalog</Link>
        <Link underline="hover" color="inherit" href="#">Accessories</Link>
        <Link underline="hover" color="inherit" href="#">New Collection</Link>
        <Typography color="text.primary">Belts</Typography>
      </Breadcrumbs>
    </Section>
  </ComponentPage>
);
