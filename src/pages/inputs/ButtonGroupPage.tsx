import * as React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const ButtonGroupPage: React.FC = () => (
  <ComponentPage
    title="Button Group"
    description="The ButtonGroup component can be used to group related buttons."
  >
    <Section title="Basic">
      <Showcase>
        <ButtonGroup variant="contained">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Showcase>
    </Section>

    <Section title="Variants">
      <Showcase direction="column">
        <ButtonGroup variant="contained">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="text">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Showcase>
    </Section>

    <Section title="Sizes">
      <Showcase direction="column">
        <ButtonGroup size="small" variant="contained">
          <Button>Small</Button>
          <Button>Small</Button>
          <Button>Small</Button>
        </ButtonGroup>
        <ButtonGroup size="medium" variant="contained">
          <Button>Medium</Button>
          <Button>Medium</Button>
          <Button>Medium</Button>
        </ButtonGroup>
        <ButtonGroup size="large" variant="contained">
          <Button>Large</Button>
          <Button>Large</Button>
          <Button>Large</Button>
        </ButtonGroup>
      </Showcase>
    </Section>

    <Section title="Colors">
      <Showcase direction="column">
        <ButtonGroup variant="contained" color="primary">
          <Button>Primary</Button>
          <Button>Primary</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" color="secondary">
          <Button>Secondary</Button>
          <Button>Secondary</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" color="success">
          <Button>Success</Button>
          <Button>Success</Button>
        </ButtonGroup>
      </Showcase>
    </Section>

    <Section title="Vertical">
      <Showcase>
        <ButtonGroup orientation="vertical" variant="contained">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical" variant="outlined">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Showcase>
    </Section>
  </ComponentPage>
);
