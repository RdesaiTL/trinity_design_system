import * as React from 'react';
import { useState } from 'react';
import { Button, Stack, Typography, TextField } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';
import { Modal, ConfirmDialog, useConfirmDialog } from '../../components/Modal';

export const ModalPage: React.FC = () => {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { confirm, state, close } = useConfirmDialog();

  const handleLoadingSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoadingOpen(false);
    }, 2000);
  };

  return (
    <ComponentPage
      title="Modal"
      description="Modals display content in a layer above the main page. Use modals for important information that requires user attention or action."
    >
      <Section title="Variants">
        <Showcase>
          <Button variant="contained" onClick={() => setDefaultOpen(true)}>Default</Button>
          <Button variant="contained" color="info" onClick={() => setInfoOpen(true)}>Info</Button>
          <Button variant="contained" color="success" onClick={() => setSuccessOpen(true)}>Success</Button>
          <Button variant="contained" color="warning" onClick={() => setWarningOpen(true)}>Warning</Button>
          <Button variant="contained" color="error" onClick={() => setDangerOpen(true)}>Danger</Button>
        </Showcase>

        <Modal
          open={defaultOpen}
          onClose={() => setDefaultOpen(false)}
          title="Default Modal"
          primaryAction="Confirm"
          onPrimaryAction={() => setDefaultOpen(false)}
        >
          <Typography>This is a default modal dialog.</Typography>
        </Modal>

        <Modal
          open={infoOpen}
          onClose={() => setInfoOpen(false)}
          title="Information"
          variant="info"
          primaryAction="Got it"
          onPrimaryAction={() => setInfoOpen(false)}
        >
          <Typography>Here is some helpful information for you.</Typography>
        </Modal>

        <Modal
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
          title="Success!"
          variant="success"
          primaryAction="Continue"
          onPrimaryAction={() => setSuccessOpen(false)}
        >
          <Typography>Your action was completed successfully.</Typography>
        </Modal>

        <Modal
          open={warningOpen}
          onClose={() => setWarningOpen(false)}
          title="Warning"
          variant="warning"
          primaryAction="Proceed"
          secondaryAction="Cancel"
          onPrimaryAction={() => setWarningOpen(false)}
          onSecondaryAction={() => setWarningOpen(false)}
        >
          <Typography>Are you sure you want to continue? This action may have consequences.</Typography>
        </Modal>

        <Modal
          open={dangerOpen}
          onClose={() => setDangerOpen(false)}
          title="Delete Item"
          variant="danger"
          primaryAction="Delete"
          secondaryAction="Cancel"
          onPrimaryAction={() => setDangerOpen(false)}
          onSecondaryAction={() => setDangerOpen(false)}
        >
          <Typography>This action cannot be undone. Are you sure you want to delete this item?</Typography>
        </Modal>
      </Section>

      <Section title="Form Modal">
        <Showcase>
          <Button variant="outlined" onClick={() => setFormOpen(true)}>Open Form Modal</Button>
        </Showcase>

        <Modal
          open={formOpen}
          onClose={() => setFormOpen(false)}
          title="Create New Item"
          primaryAction="Create"
          secondaryAction="Cancel"
          onPrimaryAction={() => setFormOpen(false)}
          onSecondaryAction={() => setFormOpen(false)}
        >
          <Stack spacing={2}>
            <TextField label="Name" fullWidth />
            <TextField label="Description" fullWidth multiline rows={3} />
          </Stack>
        </Modal>
      </Section>

      <Section title="Loading State">
        <Showcase>
          <Button variant="outlined" onClick={() => setLoadingOpen(true)}>Open Loading Modal</Button>
        </Showcase>

        <Modal
          open={loadingOpen}
          onClose={() => !isLoading && setLoadingOpen(false)}
          title="Processing"
          primaryAction="Submit"
          secondaryAction="Cancel"
          onPrimaryAction={handleLoadingSubmit}
          onSecondaryAction={() => setLoadingOpen(false)}
          loading={isLoading}
        >
          <Typography>Click submit to see the loading state.</Typography>
        </Modal>
      </Section>

      <Section title="Confirm Dialog Hook">
        <Showcase>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              confirm({
                title: 'Delete Project',
                message: 'Are you sure you want to delete this project? This action cannot be undone.',
                confirmLabel: 'Delete',
                variant: 'danger',
                onConfirm: async () => {
                  console.log('Deleted!');
                  close();
                },
              });
            }}
          >
            Delete with Confirmation
          </Button>
        </Showcase>
        <ConfirmDialog
          open={state.isOpen}
          onClose={close}
          onConfirm={state.onConfirm}
          title={state.title}
          message={state.message}
          variant={state.variant}
          confirmLabel={state.confirmLabel}
        />
      </Section>
    </ComponentPage>
  );
};
