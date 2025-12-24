import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Tooltip,
  IconButton,
  Button,
  Zoom,
  Fade,
  ClickAwayListener,
  Popper,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useRef } from 'react';
import { brandColors } from '../theme';

/**
 * # Tooltips
 * 
 * Tooltips display informative text when users hover over, focus on,
 * or tap an element.
 * 
 * ## Types
 * - **Simple**: Brief text description
 * - **Rich**: Complex content with formatting
 * - **Interactive**: Tooltips with clickable content
 * 
 * ## Design Guidelines
 * - Keep tooltip text concise (under 150 characters)
 * - Use for supplementary information only
 * - Don't hide critical information in tooltips
 * - Ensure tooltips don't obstruct important UI
 * - Use appropriate delay for hover triggers
 */

interface TooltipDemoProps {
  variant?: 'basic' | 'placements' | 'rich' | 'customized' | 'interactive' | 'triggers';
}

const TooltipDemo = ({ variant = 'basic' }: TooltipDemoProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'placements') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Tooltip Placements</Typography>
        <Box sx={{ width: 500, margin: '0 auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Tooltip title="Top Start" placement="top-start">
              <Button>top-start</Button>
            </Tooltip>
            <Tooltip title="Top" placement="top">
              <Button>top</Button>
            </Tooltip>
            <Tooltip title="Top End" placement="top-end">
              <Button>top-end</Button>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Tooltip title="Left Start" placement="left-start">
                <Button>left-start</Button>
              </Tooltip>
              <Tooltip title="Left" placement="left">
                <Button>left</Button>
              </Tooltip>
              <Tooltip title="Left End" placement="left-end">
                <Button>left-end</Button>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Tooltip title="Right Start" placement="right-start">
                <Button>right-start</Button>
              </Tooltip>
              <Tooltip title="Right" placement="right">
                <Button>right</Button>
              </Tooltip>
              <Tooltip title="Right End" placement="right-end">
                <Button>right-end</Button>
              </Tooltip>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Tooltip title="Bottom Start" placement="bottom-start">
              <Button>bottom-start</Button>
            </Tooltip>
            <Tooltip title="Bottom" placement="bottom">
              <Button>bottom</Button>
            </Tooltip>
            <Tooltip title="Bottom End" placement="bottom-end">
              <Button>bottom-end</Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    );
  }

  if (variant === 'rich') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Rich Tooltips</Typography>
        <Stack spacing={4}>
          {/* Tooltip with formatted content */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>With Formatted Content</Typography>
            <Tooltip
              title={
                <Box>
                  <Typography variant="subtitle2">Keyboard Shortcuts</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    <strong>⌘ + S</strong> - Save<br />
                    <strong>⌘ + Z</strong> - Undo<br />
                    <strong>⌘ + C</strong> - Copy
                  </Typography>
                </Box>
              }
              arrow
            >
              <Button variant="outlined" startIcon={<HelpOutlineIcon />}>
                Keyboard Shortcuts
              </Button>
            </Tooltip>
          </Box>

          {/* Tooltip with list */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>With Requirements List</Typography>
            <Tooltip
              title={
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Password Requirements:</Typography>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                    <li>One special character</li>
                  </ul>
                </Box>
              }
              arrow
            >
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Tooltip with image placeholder */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>With Preview</Typography>
            <Tooltip
              title={
                <Box sx={{ width: 200 }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 100,
                      bgcolor: brandColors.primary.light,
                      borderRadius: 1,
                      mb: 1,
                    }}
                  />
                  <Typography variant="subtitle2">Market Analysis Q4</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Last updated: 2 hours ago
                  </Typography>
                </Box>
              }
              arrow
            >
              <Button variant="outlined">Preview Report</Button>
            </Tooltip>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'customized') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Customized Tooltips</Typography>
        <Stack spacing={4} direction="row" flexWrap="wrap">
          {/* Light tooltip */}
          <Tooltip
            title="Light tooltip"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  boxShadow: 2,
                  '& .MuiTooltip-arrow': {
                    color: 'background.paper',
                  },
                },
              },
            }}
            arrow
          >
            <Button variant="outlined">Light</Button>
          </Tooltip>

          {/* Brand colored tooltip */}
          <Tooltip
            title="Brand colored tooltip"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: brandColors.primary.main,
                  '& .MuiTooltip-arrow': {
                    color: brandColors.primary.main,
                  },
                },
              },
            }}
            arrow
          >
            <Button variant="outlined">Brand Color</Button>
          </Tooltip>

          {/* Success tooltip */}
          <Tooltip
            title="Success message"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'success.main',
                  '& .MuiTooltip-arrow': {
                    color: 'success.main',
                  },
                },
              },
            }}
            arrow
          >
            <Button variant="outlined">Success</Button>
          </Tooltip>

          {/* Warning tooltip */}
          <Tooltip
            title="Warning message"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'warning.main',
                  color: 'warning.contrastText',
                  '& .MuiTooltip-arrow': {
                    color: 'warning.main',
                  },
                },
              },
            }}
            arrow
          >
            <Button variant="outlined">Warning</Button>
          </Tooltip>

          {/* Large tooltip */}
          <Tooltip
            title="This is a larger tooltip with more padding and a slightly bigger font size for better readability."
            componentsProps={{
              tooltip: {
                sx: {
                  maxWidth: 300,
                  fontSize: 14,
                  p: 2,
                },
              },
            }}
            arrow
          >
            <Button variant="outlined">Large</Button>
          </Tooltip>
        </Stack>

        <Typography variant="subtitle2" sx={{ mt: 4, mb: 2 }}>Transitions</Typography>
        <Stack spacing={2} direction="row">
          <Tooltip title="Zoom transition" TransitionComponent={Zoom}>
            <Button variant="outlined">Zoom</Button>
          </Tooltip>
          <Tooltip title="Fade transition" TransitionComponent={Fade}>
            <Button variant="outlined">Fade</Button>
          </Tooltip>
        </Stack>
      </Box>
    );
  }

  if (variant === 'interactive') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Interactive Tooltips</Typography>
        <Stack spacing={4}>
          {/* Copy to clipboard tooltip */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Copy to Clipboard</Typography>
            <Tooltip title={copied ? 'Copied!' : 'Click to copy'}>
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Click-triggered tooltip */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Click-Triggered Tooltip</Typography>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <div>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={() => setOpen(false)}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <Box sx={{ p: 1 }}>
                      <Typography variant="body2">
                        This tooltip stays open until you click away.
                      </Typography>
                      <Button size="small" sx={{ mt: 1, color: 'inherit' }} onClick={() => setOpen(false)}>
                        Got it
                      </Button>
                    </Box>
                  }
                >
                  <Button variant="outlined" onClick={() => setOpen(true)}>
                    Click me
                  </Button>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </Box>

          {/* Delayed tooltip */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Delayed Tooltip (500ms)</Typography>
            <Tooltip title="I appear after a delay" enterDelay={500} leaveDelay={200}>
              <Button variant="outlined">Hover me</Button>
            </Tooltip>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'triggers') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Tooltip Triggers</Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Icon Buttons with Tooltips</Typography>
            <Paper sx={{ p: 2, display: 'inline-flex', gap: 1 }}>
              <Tooltip title="Add new item">
                <IconButton color="primary">
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Disabled Elements</Typography>
            <Stack direction="row" spacing={2}>
              <Tooltip title="Disabled button - wrap in span">
                <span>
                  <Button variant="contained" disabled>
                    Disabled
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title="You can still hover this">
                <span>
                  <IconButton disabled>
                    <InfoOutlinedIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Follow Cursor</Typography>
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                bgcolor: 'grey.50',
              }}
            >
              <Tooltip title="I follow your cursor!" followCursor>
                <Box sx={{ p: 4, border: '1px dashed', borderColor: 'grey.400' }}>
                  Hover anywhere in this box
                </Box>
              </Tooltip>
            </Paper>
          </Box>
        </Stack>
      </Box>
    );
  }

  // basic variant (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Basic Tooltips</Typography>
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>Simple Tooltips</Typography>
          <Stack direction="row" spacing={2}>
            <Tooltip title="This is a tooltip">
              <Button variant="outlined">Hover me</Button>
            </Tooltip>
            <Tooltip title="Delete this item">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="More information" arrow>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>With Arrow</Typography>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Tooltip with arrow" arrow>
              <Button variant="outlined">With Arrow</Button>
            </Tooltip>
            <Tooltip title="Tooltip without arrow">
              <Button variant="outlined">Without Arrow</Button>
            </Tooltip>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Long Text</Typography>
          <Tooltip title="This is a longer tooltip message that provides more detailed information about the element it's attached to. It automatically wraps to multiple lines when needed.">
            <Button variant="outlined">Long tooltip</Button>
          </Tooltip>
        </Box>
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof TooltipDemo> = {
  title: 'Data Display/Tooltip',
  component: TooltipDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tooltips for displaying additional information.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'placements', 'rich', 'customized', 'interactive', 'triggers'],
      description: 'Tooltip demo variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive Tooltip playground - use Controls to customize placement and arrow.
 */
export const Playground: Story = {
  argTypes: {
    title: {
      control: 'text',
      description: 'Tooltip text content',
    },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
      description: 'Tooltip placement',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow indicator',
    },
  },
  render: (args: { title?: string; placement?: 'top' | 'bottom' | 'left' | 'right'; arrow?: boolean }) => (
    <Box sx={{ p: 8, display: 'flex', justifyContent: 'center' }}>
      <Tooltip title={args.title || 'Tooltip text'} placement={args.placement} arrow={args.arrow}>
        <Button variant="contained">Hover me</Button>
      </Tooltip>
    </Box>
  ),
  args: {
    title: 'This is a tooltip',
    placement: 'top',
    arrow: true,
  },
};

/**
 * Basic tooltip usage.
 */
export const Basic: Story = {
  args: {
    variant: 'basic',
  },
};

/**
 * Different tooltip placements.
 */
export const Placements: Story = {
  args: {
    variant: 'placements',
  },
};

/**
 * Rich tooltips with formatted content.
 */
export const Rich: Story = {
  args: {
    variant: 'rich',
  },
};

/**
 * Customized tooltip styles.
 */
export const Customized: Story = {
  args: {
    variant: 'customized',
  },
};

/**
 * Interactive tooltip examples.
 */
export const Interactive: Story = {
  args: {
    variant: 'interactive',
  },
};

/**
 * Different tooltip triggers.
 */
export const Triggers: Story = {
  args: {
    variant: 'triggers',
  },
};
