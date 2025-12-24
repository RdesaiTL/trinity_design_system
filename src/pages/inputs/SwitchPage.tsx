import * as React from 'react';
import { Switch, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const SwitchPage: React.FC = () => (
  <ComponentPage
    title="Switch"
    description="Switches toggle the state of a single setting on or off."
  >
    <Section title="Basic">
      <Showcase>
        <Switch defaultChecked />
        <Switch />
        <Switch disabled defaultChecked />
        <Switch disabled />
      </Showcase>
    </Section>

    <Section title="With Labels">
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="On" />
        <FormControlLabel control={<Switch />} label="Off" />
        <FormControlLabel disabled control={<Switch />} label="Disabled" />
        <FormControlLabel disabled control={<Switch defaultChecked />} label="Disabled On" />
      </FormGroup>
    </Section>

    <Section title="Sizes">
      <Showcase>
        <Switch defaultChecked size="small" />
        <Switch defaultChecked />
      </Showcase>
    </Section>

    <Section title="Colors">
      <Showcase>
        <Switch defaultChecked color="default" />
        <Switch defaultChecked color="primary" />
        <Switch defaultChecked color="secondary" />
        <Switch defaultChecked color="success" />
        <Switch defaultChecked color="error" />
        <Switch defaultChecked color="warning" />
        <Switch defaultChecked color="info" />
      </Showcase>
    </Section>

    <Section title="Label Placement">
      <FormGroup row>
        <FormControlLabel control={<Switch />} label="Top" labelPlacement="top" />
        <FormControlLabel control={<Switch />} label="Start" labelPlacement="start" />
        <FormControlLabel control={<Switch />} label="Bottom" labelPlacement="bottom" />
        <FormControlLabel control={<Switch />} label="End" labelPlacement="end" />
      </FormGroup>
    </Section>
  </ComponentPage>
);
