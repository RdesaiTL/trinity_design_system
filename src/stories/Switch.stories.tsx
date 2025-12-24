import type { Meta, StoryObj } from '@storybook/react';
import { Switch, FormControlLabel, FormGroup, Stack, Box, Typography } from '@mui/material';
import { useState } from 'react';

/**
 * # Switch
 * 
 * Switches toggle the state of a single setting on or off. They're the preferred
 * way to adjust settings on mobile.
 * 
 * ## Trinity Design Specs
 * - Custom styling with brand colors
 * - Checkmark icon when enabled
 * - Smooth transition animations
 * 
 * ## Usage Guidelines
 * - Use for binary settings (on/off, enabled/disabled)
 * - Pair with FormControlLabel for accessibility
 * - Provide clear labels describing what the switch controls
 */
const meta: Meta<typeof Switch> = {
  title: 'Inputs/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Toggle switches with Trinity branding and checkmark indicator.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'If true, the switch is checked',
      table: { category: 'State' },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the switch is disabled',
      table: { category: 'State' },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the switch',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'default'],
      description: 'The color of the switch when checked',
      table: { category: 'Appearance' },
    },
    required: {
      control: 'boolean',
      description: 'If true, the switch is required',
      table: { category: 'Validation' },
    },
  },
  args: {
    defaultChecked: false,
    disabled: false,
    size: 'medium',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground - use Controls to customize the switch.
 * Try toggling checked state, size, color, and disabled.
 */
export const Playground: Story = {
  args: {
    defaultChecked: true,
    disabled: false,
    size: 'medium',
    color: 'primary',
  },
};

/**
 * Default switch in unchecked state.
 */
export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

/**
 * Switch in checked state showing the checkmark.
 */
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

/**
 * Switch with a label for accessibility.
 */
export const WithLabel: Story = {
  render: () => (
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="Enable notifications"
    />
  ),
};

/**
 * All switch sizes.
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <FormControlLabel
        control={<Switch size="small" defaultChecked />}
        label="Small"
      />
      <FormControlLabel
        control={<Switch size="medium" defaultChecked />}
        label="Medium"
      />
    </Stack>
  ),
};

/**
 * Switches with different colors.
 */
export const Colors: Story = {
  render: () => (
    <Stack spacing={1}>
      <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Primary" />
      <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Secondary" />
      <FormControlLabel control={<Switch defaultChecked color="success" />} label="Success" />
      <FormControlLabel control={<Switch defaultChecked color="error" />} label="Error" />
      <FormControlLabel control={<Switch defaultChecked color="warning" />} label="Warning" />
      <FormControlLabel control={<Switch defaultChecked color="info" />} label="Info" />
    </Stack>
  ),
};

/**
 * Disabled switches in both states.
 */
export const Disabled: Story = {
  render: () => (
    <Stack spacing={1}>
      <FormControlLabel control={<Switch disabled />} label="Disabled (off)" />
      <FormControlLabel control={<Switch disabled defaultChecked />} label="Disabled (on)" />
    </Stack>
  ),
};

/**
 * Group of related switches for settings.
 */
export const SettingsGroup: Story = {
  render: () => {
    const SettingsExample = () => {
      const [settings, setSettings] = useState({
        notifications: true,
        emails: false,
        darkMode: false,
        analytics: true,
      });

      const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [name]: event.target.checked });
      };

      return (
        <Box sx={{ maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>Settings</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={settings.notifications} onChange={handleChange('notifications')} />}
              label="Push Notifications"
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 6, mb: 2 }}>
              Receive alerts about important updates
            </Typography>

            <FormControlLabel
              control={<Switch checked={settings.emails} onChange={handleChange('emails')} />}
              label="Email Notifications"
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 6, mb: 2 }}>
              Get weekly digests and important announcements
            </Typography>

            <FormControlLabel
              control={<Switch checked={settings.darkMode} onChange={handleChange('darkMode')} />}
              label="Dark Mode"
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 6, mb: 2 }}>
              Use dark theme across the application
            </Typography>

            <FormControlLabel
              control={<Switch checked={settings.analytics} onChange={handleChange('analytics')} />}
              label="Usage Analytics"
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 6 }}>
              Help us improve by sharing anonymous usage data
            </Typography>
          </FormGroup>
        </Box>
      );
    };

    return <SettingsExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Example settings panel with grouped switches and descriptions.',
      },
    },
  },
};

/**
 * Label placement options.
 */
export const LabelPlacement: Story = {
  render: () => (
    <Stack spacing={2}>
      <FormControlLabel
        control={<Switch />}
        label="End (default)"
        labelPlacement="end"
      />
      <FormControlLabel
        control={<Switch />}
        label="Start"
        labelPlacement="start"
      />
      <FormControlLabel
        control={<Switch />}
        label="Top"
        labelPlacement="top"
      />
      <FormControlLabel
        control={<Switch />}
        label="Bottom"
        labelPlacement="bottom"
      />
    </Stack>
  ),
};
