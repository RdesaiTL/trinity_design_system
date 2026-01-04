import * as React from 'react';
import { Snackbar, Alert, Button, IconButton, Slide, SlideProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ComponentPage, Section, Showcase } from '../../components/shared';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

// Component for alert severity demo buttons
const AlertSeverityDemo = ({ severity }: { severity: 'success' | 'info' | 'warning' | 'error' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color={severity === 'success' ? 'success' : severity === 'error' ? 'error' : severity === 'warning' ? 'warning' : 'info'} onClick={() => setIsOpen(true)}>
        {severity}
      </Button>
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={() => setIsOpen(false)}>
        <Alert onClose={() => setIsOpen(false)} severity={severity}>{severity} alert snackbar</Alert>
      </Snackbar>
    </React.Fragment>
  );
};

// Component for positioned snackbar demo buttons
const PositionedDemo = ({ pos }: { pos: { v: string; h: string } }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button size="small" variant="outlined" onClick={() => setIsOpen(true)}>
        {pos.v} {pos.h}
      </Button>
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={() => setIsOpen(false)}
        message={`${pos.v} ${pos.h}`}
        anchorOrigin={{ vertical: pos.v as 'top' | 'bottom', horizontal: pos.h as 'left' | 'center' | 'right' }}
      />
    </React.Fragment>
  );
};

export const SnackbarPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [transOpen, setTransOpen] = React.useState(false);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <ComponentPage
      title="Snackbar"
      description="Snackbars provide brief notifications. The component is also known as a toast."
    >
      <Section title="Basic">
        <Showcase>
          <Button variant="outlined" onClick={() => setOpen(true)}>Open Snackbar</Button>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message="This is a basic snackbar message"
            action={
              <IconButton size="small" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        </Showcase>
      </Section>

      <Section title="With Alert">
        <Showcase>
          <Button variant="outlined" onClick={() => setAlertOpen(true)}>Open Alert Snackbar</Button>
          <Snackbar open={alertOpen} autoHideDuration={4000} onClose={() => setAlertOpen(false)}>
            <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
              This is a success message!
            </Alert>
          </Snackbar>
        </Showcase>
      </Section>

      <Section title="Alert Severities">
        <Showcase>
          {(['success', 'info', 'warning', 'error'] as const).map((severity) => (
            <AlertSeverityDemo key={severity} severity={severity} />
          ))}
        </Showcase>
      </Section>

      <Section title="Positioned">
        <Showcase>
          {[
            { v: 'top', h: 'left' },
            { v: 'top', h: 'center' },
            { v: 'top', h: 'right' },
            { v: 'bottom', h: 'left' },
            { v: 'bottom', h: 'center' },
            { v: 'bottom', h: 'right' },
          ].map((pos, i) => (
            <PositionedDemo key={i} pos={pos} />
          ))}
        </Showcase>
      </Section>

      <Section title="Transitions">
        <Showcase>
          <Button variant="outlined" onClick={() => setTransOpen(true)}>Slide Up</Button>
          <Snackbar
            open={transOpen}
            autoHideDuration={3000}
            onClose={() => setTransOpen(false)}
            TransitionComponent={SlideTransition}
            message="Slide transition"
          />
        </Showcase>
      </Section>
    </ComponentPage>
  );
};
