import * as React from 'react';
import { Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import NavigationIcon from '@mui/icons-material/Navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const FabPage: React.FC = () => (
  <ComponentPage
    title="Floating Action Button"
    description="A Floating Action Button (FAB) performs the primary action on a screen."
  >
    <Section title="Basic">
      <Showcase>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit">
          <EditIcon />
        </Fab>
        <Fab disabled aria-label="add">
          <AddIcon />
        </Fab>
      </Showcase>
    </Section>

    <Section title="Extended">
      <Showcase>
        <Fab variant="extended" color="primary">
          <NavigationIcon sx={{ mr: 1 }} />
          Navigate
        </Fab>
        <Fab variant="extended" color="secondary">
          <FavoriteIcon sx={{ mr: 1 }} />
          Like
        </Fab>
        <Fab variant="extended" disabled>
          <NavigationIcon sx={{ mr: 1 }} />
          Disabled
        </Fab>
      </Showcase>
    </Section>

    <Section title="Sizes">
      <Showcase>
        <Fab size="small" color="primary">
          <AddIcon />
        </Fab>
        <Fab size="medium" color="primary">
          <AddIcon />
        </Fab>
        <Fab size="large" color="primary">
          <AddIcon />
        </Fab>
      </Showcase>
    </Section>

    <Section title="Colors">
      <Showcase>
        <Fab color="default"><AddIcon /></Fab>
        <Fab color="primary"><AddIcon /></Fab>
        <Fab color="secondary"><AddIcon /></Fab>
        <Fab color="success"><AddIcon /></Fab>
        <Fab color="error"><AddIcon /></Fab>
        <Fab color="warning"><AddIcon /></Fab>
        <Fab color="info"><AddIcon /></Fab>
      </Showcase>
    </Section>
  </ComponentPage>
);
