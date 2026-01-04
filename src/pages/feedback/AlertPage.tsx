import * as React from 'react';
import { Alert, AlertTitle, Button, Stack, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { ComponentPage, Section } from '../../components/shared';

export const AlertPage: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <ComponentPage
      title="Alert"
      description="An alert displays a short, important message in a way that attracts the user's attention."
    >
      <Section title="Severity">
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Alert severity="error">This is an error alert — check it out!</Alert>
          <Alert severity="warning">This is a warning alert — check it out!</Alert>
          <Alert severity="info">This is an info alert — check it out!</Alert>
          <Alert severity="success">This is a success alert — check it out!</Alert>
        </Stack>
      </Section>

      <Section title="Outlined">
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Alert variant="outlined" severity="error">This is an error alert</Alert>
          <Alert variant="outlined" severity="warning">This is a warning alert</Alert>
          <Alert variant="outlined" severity="info">This is an info alert</Alert>
          <Alert variant="outlined" severity="success">This is a success alert</Alert>
        </Stack>
      </Section>

      <Section title="Filled">
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Alert variant="filled" severity="error">This is an error alert</Alert>
          <Alert variant="filled" severity="warning">This is a warning alert</Alert>
          <Alert variant="filled" severity="info">This is an info alert</Alert>
          <Alert variant="filled" severity="success">This is a success alert</Alert>
        </Stack>
      </Section>

      <Section title="With Title">
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
          </Alert>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>well done!</strong>
          </Alert>
        </Stack>
      </Section>

      <Section title="With Actions">
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Alert
            severity="warning"
            action={
              <Button color="inherit" size="small">UNDO</Button>
            }
          >
            This is a warning alert with an action
          </Alert>
          <Alert
            severity="info"
            action={
              <IconButton color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            This is an info alert with close button
          </Alert>
        </Stack>
      </Section>

      <Section title="With Icons">
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Custom icon alert
          </Alert>
          <Alert icon={false} severity="success">
            Alert without icon
          </Alert>
        </Stack>
      </Section>

      <Section title="Transition">
        <Stack spacing={2}>
          <Button variant="outlined" onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Re-open'}
          </Button>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton size="small" onClick={() => setOpen(false)}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Close me to see the transition
            </Alert>
          </Collapse>
        </Stack>
      </Section>

      <Section title="Color Variants">
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Alert severity="success" color="info">
            Success with info color
          </Alert>
          <Alert severity="info" color="warning">
            Info with warning color
          </Alert>
        </Stack>
      </Section>
    </ComponentPage>
  );
};
