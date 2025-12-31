import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Checkbox,
  Stack,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { brandColors } from '../theme';

/**
 * # Radio & Checkbox Groups
 * 
 * Radio buttons allow users to select one option from a set,
 * while checkboxes allow multiple selections.
 * 
 * ## Radio Groups
 * - Single selection from multiple options
 * - Use when there are 2-7 options
 * - All options visible at once
 * 
 * ## Checkbox Groups
 * - Multiple selections allowed
 * - Independent options
 * - Can be all selected or none
 */

interface SelectionGroupDemoProps {
  variant?: 'radioBasic' | 'radioRow' | 'radioCustom' | 'checkboxBasic' | 'checkboxGroup' | 'checkboxIndeterminate';
  size?: 'small' | 'medium';
}

const SelectionGroupDemo = ({ variant = 'radioBasic', size = 'small' }: SelectionGroupDemoProps) => {
  const [radioValue, setRadioValue] = useState('option1');
  const [checkedItems, setCheckedItems] = useState<string[]>(['javascript', 'react']);
  const [parentChecked, setParentChecked] = useState([true, false, false]);

  const handleCheckChange = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParentChecked([event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChildChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...parentChecked];
    newChecked[index] = event.target.checked;
    setParentChecked(newChecked);
  };

  if (variant === 'radioRow') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Radio Group - Horizontal</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Size: {size}
        </Typography>
        <Stack spacing={4}>
          {/* Row layout */}
          <FormControl>
            <FormLabel>Payment Method</FormLabel>
            <RadioGroup row value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
              <FormControlLabel value="credit" control={<Radio size={size} />} label="Credit Card" />
              <FormControlLabel value="debit" control={<Radio size={size} />} label="Debit Card" />
              <FormControlLabel value="paypal" control={<Radio size={size} />} label="PayPal" />
            </RadioGroup>
          </FormControl>

          {/* Segmented control style */}
          <FormControl>
            <FormLabel>View</FormLabel>
            <Paper variant="outlined" sx={{ display: 'inline-flex', mt: 1 }}>
              {['List', 'Grid', 'Calendar'].map((option, index) => (
                <Box
                  key={option}
                  onClick={() => setRadioValue(option.toLowerCase())}
                  sx={{
                    px: 3,
                    py: 1,
                    cursor: 'pointer',
                    bgcolor: radioValue === option.toLowerCase() ? brandColors.primary.main : 'transparent',
                    color: radioValue === option.toLowerCase() ? 'white' : 'text.primary',
                    borderRight: index < 2 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: radioValue === option.toLowerCase() ? brandColors.primary.main : 'grey.100',
                    },
                  }}
                >
                  <Typography variant="body2">{option}</Typography>
                </Box>
              ))}
            </Paper>
          </FormControl>

          {/* Button style radios */}
          <FormControl>
            <FormLabel>Size</FormLabel>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {['XS', 'S', 'M', 'L', 'XL'].map((sizeOption) => (
                <Paper
                  key={sizeOption}
                  onClick={() => setRadioValue(sizeOption)}
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: 2,
                    borderColor: radioValue === sizeOption ? brandColors.primary.main : 'divider',
                    bgcolor: radioValue === sizeOption ? brandColors.primary.light : 'transparent',
                    '&:hover': { borderColor: brandColors.primary.main },
                  }}
                >
                  <Typography 
                    variant="body2" 
                    fontWeight={radioValue === sizeOption ? 600 : 400}
                  >
                    {sizeOption}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </FormControl>
        </Stack>
      </Box>
    );
  }

  if (variant === 'radioCustom') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Custom Radio Styles</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Size: {size}
        </Typography>
        <Stack spacing={4}>
          {/* Card style radios */}
          <FormControl>
            <FormLabel>Select Plan</FormLabel>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {[
                { value: 'basic', label: 'Basic', price: '$9/mo', desc: 'For individuals' },
                { value: 'pro', label: 'Pro', price: '$29/mo', desc: 'For small teams' },
                { value: 'enterprise', label: 'Enterprise', price: '$99/mo', desc: 'For large organizations' },
              ].map((plan) => (
                <Paper
                  key={plan.value}
                  onClick={() => setRadioValue(plan.value)}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: 2,
                    borderColor: radioValue === plan.value ? brandColors.primary.main : 'divider',
                    bgcolor: radioValue === plan.value ? brandColors.primary.light + '20' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Radio
                    checked={radioValue === plan.value}
                    size={size}
                    sx={{ p: 0 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">{plan.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{plan.desc}</Typography>
                  </Box>
                  <Typography variant="h6" color="primary.main">{plan.price}</Typography>
                </Paper>
              ))}
            </Stack>
          </FormControl>

          {/* Colored radios */}
          <FormControl>
            <FormLabel>Theme Color</FormLabel>
            <RadioGroup row value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
              <FormControlLabel
                value="primary"
                control={<Radio size={size} sx={{ color: brandColors.primary.main, '&.Mui-checked': { color: brandColors.primary.main } }} />}
                label="Navy"
              />
              <FormControlLabel
                value="secondary"
                control={<Radio size={size} sx={{ color: brandColors.secondary.main, '&.Mui-checked': { color: brandColors.secondary.main } }} />}
                label="Purple"
              />
              <FormControlLabel
                value="tertiary"
                control={<Radio size={size} sx={{ color: brandColors.primary.light, '&.Mui-checked': { color: brandColors.primary.light } }} />}
                label="Coral"
              />
              <FormControlLabel
                value="accent"
                control={<Radio size={size} sx={{ color: brandColors.secondary.light, '&.Mui-checked': { color: brandColors.secondary.light } }} />}
                label="Azure"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </Box>
    );
  }

  if (variant === 'checkboxBasic') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Checkbox Basics</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Size: {size}
        </Typography>
        <Stack spacing={3}>
          {/* Single checkboxes */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Single Checkboxes</Typography>
            <Stack>
              <FormControlLabel 
                control={<Checkbox defaultChecked size={size} />} 
                label="Checked" 
              />
              <FormControlLabel 
                control={<Checkbox size={size} />} 
                label="Unchecked" 
              />
              <FormControlLabel 
                control={<Checkbox disabled size={size} />} 
                label="Disabled" 
              />
              <FormControlLabel 
                control={<Checkbox disabled checked size={size} />} 
                label="Disabled Checked" 
              />
            </Stack>
          </Box>

          {/* Terms checkbox */}
          <FormControl error>
            <FormControlLabel
              control={<Checkbox size={size} />}
              label={
                <Typography variant="body2">
                  I agree to the <a href="#" style={{ color: brandColors.primary.main }}>Terms of Service</a> and{' '}
                  <a href="#" style={{ color: brandColors.primary.main }}>Privacy Policy</a>
                </Typography>
              }
            />
            <FormHelperText>You must accept the terms to continue</FormHelperText>
          </FormControl>

          {/* Colored checkboxes */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Colored Checkboxes</Typography>
            <Stack direction="row">
              <FormControlLabel control={<Checkbox defaultChecked color="primary" size={size} />} label="Primary" />
              <FormControlLabel control={<Checkbox defaultChecked color="secondary" size={size} />} label="Secondary" />
              <FormControlLabel control={<Checkbox defaultChecked color="success" size={size} />} label="Success" />
              <FormControlLabel control={<Checkbox defaultChecked color="warning" size={size} />} label="Warning" />
              <FormControlLabel control={<Checkbox defaultChecked color="error" size={size} />} label="Error" />
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'checkboxGroup') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Checkbox Group</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Size: {size}
        </Typography>
        <Stack spacing={4}>
          {/* Basic group */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Skills</FormLabel>
            <Stack>
              {['javascript', 'typescript', 'react', 'node', 'python'].map((skill) => (
                <FormControlLabel
                  key={skill}
                  control={
                    <Checkbox
                      checked={checkedItems.includes(skill)}
                      onChange={() => handleCheckChange(skill)}
                      size={size}
                    />
                  }
                  label={skill.charAt(0).toUpperCase() + skill.slice(1)}
                />
              ))}
            </Stack>
            <FormHelperText>
              Selected: {checkedItems.length > 0 ? checkedItems.join(', ') : 'None'}
            </FormHelperText>
          </FormControl>

          {/* Card style checkboxes */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Features</FormLabel>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {[
                { value: 'analytics', label: 'Analytics', desc: 'Track user behavior and metrics' },
                { value: 'reporting', label: 'Reporting', desc: 'Generate custom reports' },
                { value: 'api', label: 'API Access', desc: 'Integrate with external systems' },
              ].map((feature) => (
                <Paper
                  key={feature.value}
                  onClick={() => handleCheckChange(feature.value)}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: 2,
                    borderColor: checkedItems.includes(feature.value) ? brandColors.primary.main : 'divider',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                  }}
                >
                  <Checkbox
                    checked={checkedItems.includes(feature.value)}
                    size={size}
                    sx={{ p: 0, mt: -0.5 }}
                  />
                  <Box>
                    <Typography variant="subtitle2">{feature.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{feature.desc}</Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </FormControl>

          {/* Horizontal checkbox group */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Notification Preferences</FormLabel>
            <Stack direction="row" flexWrap="wrap">
              {['Email', 'SMS', 'Push', 'In-App'].map((pref) => (
                <FormControlLabel
                  key={pref}
                  control={<Checkbox size={size} />}
                  label={pref}
                />
              ))}
            </Stack>
          </FormControl>
        </Stack>
      </Box>
    );
  }

  if (variant === 'checkboxIndeterminate') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Indeterminate Checkbox</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Used for "select all" functionality when some items are selected. Size: {size}
        </Typography>
        <Stack spacing={4}>
          {/* Parent/child checkboxes */}
          <Box>
            <FormControlLabel
              label="Select All"
              control={
                <Checkbox
                  checked={parentChecked.every(Boolean)}
                  indeterminate={parentChecked.some(Boolean) && !parentChecked.every(Boolean)}
                  onChange={handleParentChange}
                  size={size}
                />
              }
            />
            <Box sx={{ ml: 3 }}>
              <FormControlLabel
                label="Option 1"
                control={
                  <Checkbox
                    checked={parentChecked[0]}
                    onChange={handleChildChange(0)}
                    size={size}
                  />
                }
              />
              <FormControlLabel
                label="Option 2"
                control={
                  <Checkbox
                    checked={parentChecked[1]}
                    onChange={handleChildChange(1)}
                    size={size}
                  />
                }
              />
              <FormControlLabel
                label="Option 3"
                control={
                  <Checkbox
                    checked={parentChecked[2]}
                    onChange={handleChildChange(2)}
                    size={size}
                  />
                }
              />
            </Box>
          </Box>

          {/* Table-like selection */}
          <Paper variant="outlined">
            <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
              <FormControlLabel
                label={<Typography variant="subtitle2">Select All Items</Typography>}
                control={
                  <Checkbox
                    checked={parentChecked.every(Boolean)}
                    indeterminate={parentChecked.some(Boolean) && !parentChecked.every(Boolean)}
                    onChange={handleParentChange}
                    size={size}
                  />
                }
              />
            </Box>
            {['Item A - Description of item A', 'Item B - Description of item B', 'Item C - Description of item C'].map((item, index) => (
              <Box 
                key={index}
                sx={{ 
                  p: 1.5, 
                  borderBottom: index < 2 ? 1 : 0, 
                  borderColor: 'divider',
                  bgcolor: parentChecked[index] ? 'primary.light' + '20' : 'transparent',
                }}
              >
                <FormControlLabel
                  label={item}
                  control={
                    <Checkbox
                      checked={parentChecked[index]}
                      onChange={handleChildChange(index)}
                      size={size}
                    />
                  }
                />
              </Box>
            ))}
          </Paper>
        </Stack>
      </Box>
    );
  }

  // radioBasic variant (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Radio Group - Vertical</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Size: {size}
      </Typography>
      <Stack spacing={4}>
        {/* Basic radio group */}
        <FormControl>
          <FormLabel>Select an option</FormLabel>
          <RadioGroup value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
            <FormControlLabel value="option1" control={<Radio size={size} />} label="Option 1" />
            <FormControlLabel value="option2" control={<Radio size={size} />} label="Option 2" />
            <FormControlLabel value="option3" control={<Radio size={size} />} label="Option 3" />
            <FormControlLabel value="option4" control={<Radio size={size} />} label="Option 4 (disabled)" disabled />
          </RadioGroup>
        </FormControl>

        {/* With helper text */}
        <FormControl>
          <FormLabel>Subscription Tier</FormLabel>
          <RadioGroup value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
            <FormControlLabel value="free" control={<Radio size={size} />} label="Free - Limited features" />
            <FormControlLabel value="basic" control={<Radio size={size} />} label="Basic - $9/month" />
            <FormControlLabel value="pro" control={<Radio size={size} />} label="Pro - $29/month" />
          </RadioGroup>
          <FormHelperText>Choose the plan that fits your needs</FormHelperText>
        </FormControl>

        {/* Error state */}
        <FormControl error>
          <FormLabel>Required Selection</FormLabel>
          <RadioGroup>
            <FormControlLabel value="yes" control={<Radio size={size} />} label="Yes" />
            <FormControlLabel value="no" control={<Radio size={size} />} label="No" />
          </RadioGroup>
          <FormHelperText>Please make a selection</FormHelperText>
        </FormControl>
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof SelectionGroupDemo> = {
  title: 'Inputs/Selection Groups',
  component: SelectionGroupDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Radio buttons and checkbox groups for selection.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['radioBasic', 'radioRow', 'radioCustom', 'checkboxBasic', 'checkboxGroup', 'checkboxIndeterminate'],
      description: 'Selection group variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'Size of the controls',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the controls',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'default'],
      description: 'Control color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic vertical radio group.
 */
export const RadioBasic: Story = {
  args: {
    variant: 'radioBasic',
    size: 'small',
  },
};

/**
 * Horizontal radio group.
 */
export const RadioRow: Story = {
  args: {
    variant: 'radioRow',
    size: 'small',
  },
};

/**
 * Custom styled radio buttons.
 */
export const RadioCustom: Story = {
  args: {
    variant: 'radioCustom',
    size: 'small',
  },
};

/**
 * Basic checkbox controls.
 */
export const CheckboxBasic: Story = {
  args: {
    variant: 'checkboxBasic',
    size: 'small',
  },
};

/**
 * Checkbox group selection.
 */
export const CheckboxGroup: Story = {
  args: {
    variant: 'checkboxGroup',
    size: 'small',
  },
};

/**
 * Indeterminate checkbox state.
 */
export const CheckboxIndeterminate: Story = {
  args: {
    variant: 'checkboxIndeterminate',
    size: 'small',
  },
};
