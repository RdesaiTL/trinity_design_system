import * as React from 'react';
import { Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const ButtonPage: React.FC = () => (
  <ComponentPage
    title="Button"
    description="Buttons allow users to take actions and make choices with a single tap."
  >
    <Section title="Contained">
      <Showcase>
        <Button variant="contained">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="contained" color="success">Success</Button>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="contained" color="warning">Warning</Button>
        <Button variant="contained" color="info">Info</Button>
        <Button variant="contained" disabled>Disabled</Button>
      </Showcase>
    </Section>

    <Section title="Outlined">
      <Showcase>
        <Button variant="outlined">Primary</Button>
        <Button variant="outlined" color="secondary">Secondary</Button>
        <Button variant="outlined" color="success">Success</Button>
        <Button variant="outlined" color="error">Error</Button>
        <Button variant="outlined" disabled>Disabled</Button>
      </Showcase>
    </Section>

    <Section title="Text">
      <Showcase>
        <Button variant="text">Primary</Button>
        <Button variant="text" color="secondary">Secondary</Button>
        <Button variant="text" color="error">Error</Button>
        <Button variant="text" disabled>Disabled</Button>
      </Showcase>
    </Section>

    <Section title="Sizes">
      <Showcase>
        <Button variant="contained" size="small">Small</Button>
        <Button variant="contained" size="medium">Medium</Button>
        <Button variant="contained" size="large">Large</Button>
      </Showcase>
    </Section>

    <Section title="With Icons">
      <Showcase>
        <Button variant="contained" startIcon={<SendIcon />}>Send</Button>
        <Button variant="contained" endIcon={<SendIcon />}>Send</Button>
        <Button variant="outlined" startIcon={<DeleteIcon />} color="error">Delete</Button>
        <Button variant="contained" startIcon={<CloudUploadIcon />}>Upload</Button>
      </Showcase>
    </Section>

    <Section title="Icon Buttons">
      <Showcase>
        <IconButton color="primary"><DeleteIcon /></IconButton>
        <IconButton color="secondary"><SendIcon /></IconButton>
        <IconButton color="error"><DeleteIcon /></IconButton>
        <IconButton disabled><DeleteIcon /></IconButton>
      </Showcase>
    </Section>

    <Section title="Icon Button Sizes">
      <Showcase>
        <IconButton size="small" color="primary"><DeleteIcon fontSize="small" /></IconButton>
        <IconButton size="medium" color="primary"><DeleteIcon /></IconButton>
        <IconButton size="large" color="primary"><DeleteIcon fontSize="large" /></IconButton>
      </Showcase>
    </Section>
  </ComponentPage>
);
