import * as React from 'react';
import { Checkbox, FormControlLabel, FormGroup, FormControl, FormLabel } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import Bookmark from '@mui/icons-material/Bookmark';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const CheckboxPage: React.FC = () => (
  <ComponentPage
    title="Checkbox"
    description="Checkboxes allow the user to select one or more items from a set."
  >
    <Section title="Basic">
      <Showcase>
        <Checkbox defaultChecked />
        <Checkbox />
        <Checkbox disabled />
        <Checkbox disabled checked />
      </Showcase>
    </Section>

    <Section title="With Labels">
      <Showcase>
        <FormGroup row>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          <FormControlLabel control={<Checkbox />} label="Required" required />
          <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup>
      </Showcase>
    </Section>

    <Section title="Sizes">
      <Showcase>
        <Checkbox defaultChecked size="small" />
        <Checkbox defaultChecked />
        <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
      </Showcase>
    </Section>

    <Section title="Colors">
      <Showcase>
        <Checkbox defaultChecked color="default" />
        <Checkbox defaultChecked color="primary" />
        <Checkbox defaultChecked color="secondary" />
        <Checkbox defaultChecked color="success" />
        <Checkbox defaultChecked color="error" />
        <Checkbox defaultChecked color="warning" />
        <Checkbox defaultChecked color="info" />
      </Showcase>
    </Section>

    <Section title="Custom Icons">
      <Showcase>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked />
        <Checkbox icon={<BookmarkBorder />} checkedIcon={<Bookmark />} defaultChecked />
      </Showcase>
    </Section>

    <Section title="Indeterminate">
      <Showcase>
        <Checkbox indeterminate />
        <Checkbox indeterminate color="secondary" />
      </Showcase>
    </Section>

    <Section title="Form Group">
      <FormControl component="fieldset">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Gilad Gray" />
          <FormControlLabel control={<Checkbox />} label="Jason Killian" />
          <FormControlLabel control={<Checkbox />} label="Antoine Llorca" />
        </FormGroup>
      </FormControl>
    </Section>
  </ComponentPage>
);
