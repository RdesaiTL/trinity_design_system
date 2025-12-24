import * as React from 'react';
import { Tooltip, Button, IconButton, Fab, Zoom, Fade, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const TooltipPage: React.FC = () => (
  <ComponentPage
    title="Tooltip"
    description="Tooltips display informative text when users hover over, focus on, or tap an element."
  >
    <Section title="Basic">
      <Showcase>
        <Tooltip title="Delete">
          <IconButton><DeleteIcon /></IconButton>
        </Tooltip>
        <Tooltip title="Add">
          <Fab color="primary" size="small"><AddIcon /></Fab>
        </Tooltip>
        <Tooltip title="Click me">
          <Button>Button</Button>
        </Tooltip>
      </Showcase>
    </Section>

    <Section title="Positioned">
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Tooltip title="Top Start" placement="top-start"><Button>top-start</Button></Tooltip>
        <Tooltip title="Top" placement="top"><Button>top</Button></Tooltip>
        <Tooltip title="Top End" placement="top-end"><Button>top-end</Button></Tooltip>
        <Tooltip title="Left Start" placement="left-start"><Button>left-start</Button></Tooltip>
        <Tooltip title="Left" placement="left"><Button>left</Button></Tooltip>
        <Tooltip title="Left End" placement="left-end"><Button>left-end</Button></Tooltip>
        <Tooltip title="Right Start" placement="right-start"><Button>right-start</Button></Tooltip>
        <Tooltip title="Right" placement="right"><Button>right</Button></Tooltip>
        <Tooltip title="Right End" placement="right-end"><Button>right-end</Button></Tooltip>
        <Tooltip title="Bottom Start" placement="bottom-start"><Button>bottom-start</Button></Tooltip>
        <Tooltip title="Bottom" placement="bottom"><Button>bottom</Button></Tooltip>
        <Tooltip title="Bottom End" placement="bottom-end"><Button>bottom-end</Button></Tooltip>
      </Box>
    </Section>

    <Section title="Arrow">
      <Showcase>
        <Tooltip title="With Arrow" arrow>
          <Button>Arrow</Button>
        </Tooltip>
        <Tooltip title="No Arrow">
          <Button>No Arrow</Button>
        </Tooltip>
      </Showcase>
    </Section>

    <Section title="Transitions">
      <Showcase>
        <Tooltip title="Default Grow">
          <Button>Grow</Button>
        </Tooltip>
        <Tooltip title="Fade" slots={{ transition: Fade }}>
          <Button>Fade</Button>
        </Tooltip>
        <Tooltip title="Zoom" slots={{ transition: Zoom }}>
          <Button>Zoom</Button>
        </Tooltip>
      </Showcase>
    </Section>

    <Section title="Interactive">
      <Tooltip title="This tooltip stays open while hovering over it" enterDelay={500} leaveDelay={200}>
        <Button>Delayed</Button>
      </Tooltip>
    </Section>

    <Section title="Width">
      <Showcase>
        <Tooltip title="Short">
          <Button>Short</Button>
        </Tooltip>
        <Tooltip title="A longer tooltip that wraps to multiple lines if needed for better readability">
          <Button>Long Text</Button>
        </Tooltip>
      </Showcase>
    </Section>

    <Section title="Disabled Elements">
      <Showcase>
        <Tooltip title="You can't click this">
          <span>
            <Button disabled>Disabled</Button>
          </span>
        </Tooltip>
      </Showcase>
    </Section>
  </ComponentPage>
);
