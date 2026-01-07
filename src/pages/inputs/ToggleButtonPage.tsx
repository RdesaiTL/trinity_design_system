import * as React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const ToggleButtonPage: React.FC = () => {
  const [alignment, setAlignment] = React.useState<string | null>('left');
  const [formats, setFormats] = React.useState<string[]>(['bold']);

  return (
    <ComponentPage
      title="Toggle Button"
      description="Toggle buttons can be used to group related options."
    >
      <Section title="Exclusive Selection">
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={(_, v) => setAlignment(v)}
        >
          <ToggleButton value="left"><FormatAlignLeftIcon /></ToggleButton>
          <ToggleButton value="center"><FormatAlignCenterIcon /></ToggleButton>
          <ToggleButton value="right"><FormatAlignRightIcon /></ToggleButton>
          <ToggleButton value="justify"><FormatAlignJustifyIcon /></ToggleButton>
        </ToggleButtonGroup>
      </Section>

      <Section title="Multiple Selection">
        <ToggleButtonGroup
          value={formats}
          onChange={(_, v) => setFormats(v)}
        >
          <ToggleButton value="bold"><FormatBoldIcon /></ToggleButton>
          <ToggleButton value="italic"><FormatItalicIcon /></ToggleButton>
          <ToggleButton value="underlined"><FormatUnderlinedIcon /></ToggleButton>
        </ToggleButtonGroup>
      </Section>

      <Section title="Sizes">
        <Showcase direction="column">
          <ToggleButtonGroup size="small" value="left" exclusive>
            <ToggleButton value="left"><FormatAlignLeftIcon /></ToggleButton>
            <ToggleButton value="center"><FormatAlignCenterIcon /></ToggleButton>
            <ToggleButton value="right"><FormatAlignRightIcon /></ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup size="medium" value="left" exclusive>
            <ToggleButton value="left"><FormatAlignLeftIcon /></ToggleButton>
            <ToggleButton value="center"><FormatAlignCenterIcon /></ToggleButton>
            <ToggleButton value="right"><FormatAlignRightIcon /></ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup size="large" value="left" exclusive>
            <ToggleButton value="left"><FormatAlignLeftIcon /></ToggleButton>
            <ToggleButton value="center"><FormatAlignCenterIcon /></ToggleButton>
            <ToggleButton value="right"><FormatAlignRightIcon /></ToggleButton>
          </ToggleButtonGroup>
        </Showcase>
      </Section>

      <Section title="Colors">
        <Showcase direction="column">
          <ToggleButtonGroup color="primary" value="left" exclusive>
            <ToggleButton value="left">One</ToggleButton>
            <ToggleButton value="center">Two</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup color="secondary" value="left" exclusive>
            <ToggleButton value="left">One</ToggleButton>
            <ToggleButton value="center">Two</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup color="success" value="left" exclusive>
            <ToggleButton value="left">One</ToggleButton>
            <ToggleButton value="center">Two</ToggleButton>
          </ToggleButtonGroup>
        </Showcase>
      </Section>

      <Section title="Vertical">
        <ToggleButtonGroup orientation="vertical" value="left" exclusive>
          <ToggleButton value="left"><FormatAlignLeftIcon /></ToggleButton>
          <ToggleButton value="center"><FormatAlignCenterIcon /></ToggleButton>
          <ToggleButton value="right"><FormatAlignRightIcon /></ToggleButton>
        </ToggleButtonGroup>
      </Section>

      <Section title="Disabled">
        <ToggleButtonGroup value="left" exclusive>
          <ToggleButton value="left"><FormatAlignLeftIcon /></ToggleButton>
          <ToggleButton value="center" disabled><FormatAlignCenterIcon /></ToggleButton>
          <ToggleButton value="right"><FormatAlignRightIcon /></ToggleButton>
        </ToggleButtonGroup>
      </Section>
    </ComponentPage>
  );
};
