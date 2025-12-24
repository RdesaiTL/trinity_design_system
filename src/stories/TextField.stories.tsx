import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  TextField,
  Stack,
  Box,
  InputAdornment,
  IconButton,
  FormHelperText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { brandColors } from '../theme';

/**
 * # TextField
 * 
 * Text fields allow users to enter and edit text. They are used in forms,
 * dialogs, and other places where text input is needed.
 * 
 * ## Trinity Design Specs
 * - **Size**: Small (compact for dense UIs)
 * - **Border Radius**: 6px for small inputs
 * - **Focus Color**: Primary navy (#050742)
 * - **Font**: Montserrat
 * 
 * ## Variants
 * - **Outlined**: Default, recommended for most use cases
 * - **Filled**: Background-filled style
 * - **Standard**: Minimal underline style
 */
const meta: Meta<typeof TextField> = {
  title: 'Inputs/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Text input fields with Trinity styling - small size optimized for compact UIs.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'The variant to use',
      table: { defaultValue: { summary: 'outlined' }, category: 'Appearance' },
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'The size of the text field',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'success'],
      description: 'The color of the text field',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled',
      table: { category: 'State' },
    },
    error: {
      control: 'boolean',
      description: 'If true, the label is displayed in an error state',
      table: { category: 'Validation' },
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the input will take up the full width',
      table: { category: 'Layout' },
    },
    required: {
      control: 'boolean',
      description: 'If true, the label will indicate required',
      table: { category: 'Validation' },
    },
    multiline: {
      control: 'boolean',
      description: 'If true, a textarea element is rendered',
      table: { category: 'Configuration' },
    },
    rows: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of rows for multiline',
      table: { category: 'Configuration' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
      table: { category: 'Content' },
    },
    label: {
      control: 'text',
      description: 'The label for the input',
      table: { category: 'Content' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground - use Controls to customize the text field.
 * Try changing variant, size, error state, helper text, and more!
 */
export const Playground: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    helperText: 'Helper text',
    variant: 'outlined',
    size: 'small',
    disabled: false,
    error: false,
    required: false,
    fullWidth: false,
    multiline: false,
    rows: 1,
  },
};

/**
 * Default small outlined text field.
 */
export const Default: Story = {
  args: {
    label: 'Label',
    variant: 'outlined',
    size: 'small',
  },
};

/**
 * All three text field variants.
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <TextField label="Outlined" variant="outlined" size="small" />
      <TextField label="Filled" variant="filled" size="small" />
      <TextField label="Standard" variant="standard" size="small" />
    </Stack>
  ),
};

/**
 * Text fields with helper text for additional guidance.
 */
export const WithHelperText: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField 
        label="Email" 
        size="small"
        helperText="We'll never share your email"
      />
      <TextField 
        label="Password" 
        type="password"
        size="small"
        helperText="Must be at least 8 characters"
      />
    </Stack>
  ),
};

/**
 * Error state with validation message.
 */
export const ErrorState: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField 
        label="Email" 
        size="small"
        error
        helperText="Please enter a valid email address"
        defaultValue="invalid-email"
      />
      <TextField 
        label="Password" 
        type="password"
        size="small"
        error
        helperText="Password is required"
      />
    </Stack>
  ),
};

/**
 * Required fields with asterisk indicator.
 */
export const Required: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField label="First Name" size="small" required />
      <TextField label="Last Name" size="small" required />
      <TextField label="Email" size="small" required type="email" />
    </Stack>
  ),
};

/**
 * Text fields with icons for visual context.
 */
export const WithIcons: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField
        label="Search"
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Username"
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Email"
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  ),
};

/**
 * Input adornments with prefixes, suffixes, and icons.
 */
export const Adornments: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField
        label="Phone"
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ mr: 0.5 }} />
                +1
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Amount"
        size="small"
        type="number"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Discount"
        size="small"
        type="number"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <PercentIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Weight"
        size="small"
        type="number"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          },
        }}
      />
      <TextField
        label="Website"
        size="small"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">https://</InputAdornment>,
            endAdornment: <InputAdornment position="end">.com</InputAdornment>,
          },
        }}
      />
    </Stack>
  ),
};

/**
 * Password field with visibility toggle.
 */
export const PasswordField: Story = {
  render: function PasswordFieldStory() {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <Stack spacing={2} sx={{ width: 300 }}>
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
    );
  },
};

/**
 * Number input with increment/decrement buttons.
 */
export const NumberInput: Story = {
  render: function NumberInputStory() {
    const [value, setValue] = useState(0);
    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <TextField
          label="Quantity"
          type="number"
          size="small"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          slotProps={{
            htmlInput: { min: 0, max: 100 },
          }}
          helperText="Use arrow keys to adjust"
        />
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>Custom Controls</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={() => setValue(v => v - 1)} 
              size="small"
              sx={{ border: 1, borderColor: 'divider' }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <TextField
              type="number"
              size="small"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value) || 0)}
              sx={{ width: 80 }}
              slotProps={{
                htmlInput: { style: { textAlign: 'center' } },
              }}
            />
            <IconButton 
              onClick={() => setValue(v => v + 1)} 
              size="small"
              sx={{ border: 1, borderColor: 'divider' }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Stack>
    );
  },
};

/**
 * Spinner field for touch-friendly number input.
 */
export const SpinnerField: Story = {
  render: function SpinnerFieldStory() {
    const [value, setValue] = useState(1);
    const increment = () => setValue((v) => Math.min(v + 1, 99));
    const decrement = () => setValue((v) => Math.max(v - 1, 1));

    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>Quantity</Typography>
          <Paper 
            variant="outlined" 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'stretch',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <IconButton
              onClick={decrement}
              disabled={value <= 1}
              size="small"
              sx={{ 
                borderRadius: 0,
                borderRight: 1,
                borderColor: 'divider',
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                minWidth: 48,
                px: 2,
                fontWeight: 500,
              }}
            >
              {value}
            </Box>
            <IconButton
              onClick={increment}
              disabled={value >= 99}
              size="small"
              sx={{ 
                borderRadius: 0,
                borderLeft: 1,
                borderColor: 'divider',
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Paper>
          <FormHelperText>Min: 1, Max: 99</FormHelperText>
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>Styled Spinner</Typography>
          <Paper 
            variant="outlined" 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              borderRadius: 2,
              p: 0.5,
              gap: 1,
            }}
          >
            <IconButton
              onClick={decrement}
              disabled={value <= 1}
              size="small"
              sx={{ bgcolor: 'grey.100', '&:hover': { bgcolor: 'grey.200' } }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ minWidth: 32, textAlign: 'center', fontWeight: 600 }}>
              {value}
            </Typography>
            <IconButton
              onClick={increment}
              disabled={value >= 99}
              size="small"
              sx={{ 
                bgcolor: brandColors.primary.main,
                color: 'white',
                '&:hover': { bgcolor: brandColors.primary.dark },
                '&.Mui-disabled': { bgcolor: 'grey.300' },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Paper>
        </Box>
      </Stack>
    );
  },
};

/**
 * Multiline text area for longer content.
 */
export const Multiline: Story = {
  render: function MultilineStory() {
    const [text, setText] = useState('');
    return (
      <Stack spacing={2} sx={{ width: 400 }}>
        <TextField
          label="Description"
          size="small"
          multiline
          rows={4}
          placeholder="Enter a description..."
        />
        <TextField
          label="Comments"
          size="small"
          multiline
          minRows={2}
          maxRows={6}
          placeholder="Auto-expanding textarea..."
          helperText="Auto-expands from 2 to 6 rows"
        />
        <TextField
          label="Bio"
          size="small"
          multiline
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 200))}
          helperText={`${text.length}/200 characters`}
          slotProps={{ htmlInput: { maxLength: 200 } }}
        />
      </Stack>
    );
  },
};

/**
 * Disabled and read-only states.
 */
export const DisabledAndReadOnly: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField label="Disabled" size="small" disabled defaultValue="Cannot edit" />
      <TextField 
        label="Read-only" 
        size="small" 
        defaultValue="Read only value"
        slotProps={{ input: { readOnly: true } }}
      />
    </Stack>
  ),
};

/**
 * Fields with tooltip help icons.
 */
export const WithTooltipHelp: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <Typography variant="body2">API Key</Typography>
          <Tooltip title="Your unique API key found in developer settings." arrow>
            <HelpOutlineIcon sx={{ fontSize: 16, color: 'text.secondary', cursor: 'help' }} />
          </Tooltip>
        </Box>
        <TextField fullWidth size="small" placeholder="Enter your API key" />
      </Box>
      <TextField
        label="Username"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="3-20 characters, letters, numbers, underscores only." arrow>
                  <HelpOutlineIcon sx={{ fontSize: 18, color: 'text.secondary', cursor: 'help' }} />
                </Tooltip>
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  ),
};

/**
 * Full width text field for forms.
 */
export const FullWidth: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <TextField label="Full Width Field" size="small" fullWidth sx={{ mb: 2 }} />
      <TextField label="Multiline Full Width" size="small" fullWidth multiline rows={3} />
    </Box>
  ),
};

/**
 * Login form example combining multiple text fields.
 */
export const LoginForm: Story = {
  render: function LoginFormStory() {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <Box sx={{ width: 320, p: 3 }}>
        <Typography variant="h6" gutterBottom>Sign In</Typography>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            size="small"
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            size="small"
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example login form layout using styled text fields.',
      },
    },
  },
};
