import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Chip,
  Checkbox,
  ListItemText,
  Stack,
  Avatar,
  ListSubheader,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';
import { brandColors } from '../tokens';

/**
 * # Dropdown / Select
 * 
 * Dropdowns allow users to select from a list of options. They support
 * search-ahead filtering, single and multi-select, grouping, and more.
 * 
 * ## Types
 * - **Single Select**: Choose one option
 * - **Multi Select**: Choose multiple options
 * - **Grouped**: Options organized by category
 * - **With Checkboxes**: Visual selection indicators
 * 
 * ## Features
 * - Search/filter functionality
 * - Limit displayed tags
 * - Custom rendering
 */

interface DropdownDemoProps {
  variant?: 'singleSelect' | 'multiSelect' | 'grouped' | 'limitTags' | 'checkboxes' | 'customOptions';
  size?: 'small' | 'medium';
}

const countries = [
  { label: 'United States', code: 'US' },
  { label: 'United Kingdom', code: 'GB' },
  { label: 'Canada', code: 'CA' },
  { label: 'Germany', code: 'DE' },
  { label: 'France', code: 'FR' },
  { label: 'Japan', code: 'JP' },
  { label: 'Australia', code: 'AU' },
  { label: 'India', code: 'IN' },
  { label: 'Brazil', code: 'BR' },
  { label: 'Mexico', code: 'MX' },
  { label: 'Italy', code: 'IT' },
  { label: 'Spain', code: 'SP' },
  { label: 'Netherlands', code: 'NL' },
  { label: 'Switzerland', code: 'CH' },
  { label: 'Sweden', code: 'SE' },
];

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 
  'Node.js', 'Python', 'Java', 'C#', 'Go',
  'SQL', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
];

const movieOptions = [
  { title: 'The Shawshank Redemption', year: 1994, category: 'Drama' },
  { title: 'The Godfather', year: 1972, category: 'Drama' },
  { title: 'The Dark Knight', year: 2008, category: 'Action' },
  { title: 'Pulp Fiction', year: 1994, category: 'Drama' },
  { title: 'Forrest Gump', year: 1994, category: 'Drama' },
  { title: 'Inception', year: 2010, category: 'Sci-Fi' },
  { title: 'The Matrix', year: 1999, category: 'Sci-Fi' },
  { title: 'Interstellar', year: 2014, category: 'Sci-Fi' },
  { title: 'Gladiator', year: 2000, category: 'Action' },
  { title: 'The Avengers', year: 2012, category: 'Action' },
];

const teamMembers = [
  { name: 'John Doe', role: 'Developer', avatar: 'JD' },
  { name: 'Jane Smith', role: 'Designer', avatar: 'JS' },
  { name: 'Mike Johnson', role: 'Manager', avatar: 'MJ' },
  { name: 'Sarah Williams', role: 'Developer', avatar: 'SW' },
  { name: 'Tom Brown', role: 'QA Engineer', avatar: 'TB' },
  { name: 'Emily Davis', role: 'DevOps', avatar: 'ED' },
];

const groupedOptions = movieOptions.sort((a, b) => a.category.localeCompare(b.category));

const DropdownDemo = ({ variant = 'singleSelect', size = 'small' }: DropdownDemoProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<typeof countries>([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  if (variant === 'multiSelect') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Multi Select Dropdown with Search</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Size: {size}
        </Typography>
        <Stack spacing={3} sx={{ maxWidth: 400 }}>
          {/* Basic multi-select */}
          <Autocomplete
            multiple
            options={skills}
            size={size}
            renderInput={(params) => (
              <TextField {...params} label="Skills" placeholder="Search skills..." />
            )}
          />

          {/* Multi-select with chips */}
          <Autocomplete
            multiple
            options={skills}
            value={selectedSkills}
            onChange={(_, newValue) => setSelectedSkills(newValue)}
            size={size}
            renderInput={(params) => (
              <TextField {...params} label="Technologies" placeholder="Add technologies..." />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  size="small"
                  sx={{ bgcolor: brandColors.primary.light, color: brandColors.primary.dark }}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
          />

          {/* Countries multi-select */}
          <Autocomplete
            multiple
            options={countries}
            getOptionLabel={(option) => option.label}
            value={selectedCountries}
            onChange={(_, newValue) => setSelectedCountries(newValue)}
            size={size}
            renderInput={(params) => (
              <TextField {...params} label="Countries" placeholder="Select countries..." />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.code}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{option.code}</span>
                  <span>{option.label}</span>
                </Box>
              </li>
            )}
          />

          {/* Freesolo - allow custom values */}
          <Autocomplete
            multiple
            freeSolo
            options={skills}
            size={size}
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="Add tags..." helperText="Type and press Enter to add custom tags" />
            )}
          />
        </Stack>
      </Box>
    );
  }

  if (variant === 'grouped') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Grouped Dropdown</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Size: {size}
        </Typography>
        <Stack spacing={3} sx={{ maxWidth: 400 }}>
          {/* Grouped options */}
          <Autocomplete
            options={groupedOptions}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.title}
            size={size}
            renderInput={(params) => (
              <TextField {...params} label="Movies" placeholder="Search movies..." />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <ListSubheader 
                  sx={{ 
                    bgcolor: 'grey.100', 
                    fontWeight: 600,
                    color: brandColors.primary.main,
                  }}
                >
                  {params.group}
                </ListSubheader>
                <ul style={{ padding: 0 }}>{params.children}</ul>
              </li>
            )}
          />

          {/* Grouped with custom rendering */}
          <Autocomplete
            options={groupedOptions}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.title}
            size={size}
            renderInput={(params) => (
              <TextField {...params} label="Select a movie" />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.title}>
                <Box>
                  <Typography variant="body2">{option.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.year}
                  </Typography>
                </Box>
              </li>
            )}
          />

          {/* Multiple grouped */}
          <Autocomplete
            multiple
            options={groupedOptions}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.title}
            size={size}
            renderInput={(params) => (
              <TextField {...params} label="Favorite Movies" placeholder="Select movies..." />
            )}
          />
        </Stack>
      </Box>
    );
  }

  if (variant === 'limitTags') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Dropdown with Limit Tags</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Use limitTags to limit displayed options when not focused. Size: {size}
        </Typography>
        <Stack spacing={3} sx={{ maxWidth: 400 }}>
          {/* Limit to 2 tags */}
          <Autocomplete
            multiple
            limitTags={2}
            options={skills}
            defaultValue={['JavaScript', 'TypeScript', 'React', 'Node.js']}
            size={size}
            renderInput={(params) => (
              <TextField {...params} label="Skills (max 2 visible)" placeholder="Add more..." />
            )}
          />

          {/* Limit to 3 tags */}
          <Autocomplete
            multiple
            limitTags={3}
            options={countries}
            getOptionLabel={(option) => option.label}
            defaultValue={[countries[0], countries[1], countries[2], countries[3], countries[4]]}
            size={size}
            renderInput={(params) => (
              <TextField {...params} label="Countries (max 3 visible)" />
            )}
          />

          {/* Limit to 1 tag with custom +N indicator */}
          <Autocomplete
            multiple
            limitTags={1}
            options={skills}
            defaultValue={['JavaScript', 'TypeScript', 'React']}
            size={size}
            getLimitTagsText={(more) => `+${more} more`}
            renderInput={(params) => (
              <TextField {...params} label="Technologies (1 visible)" />
            )}
          />

          {/* No limit when focused */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Click on the fields above to see all selected tags when focused.
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (variant === 'checkboxes') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Dropdown with Checkboxes</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Size: {size}
        </Typography>
        <Stack spacing={3} sx={{ maxWidth: 400 }}>
          {/* Basic checkbox dropdown */}
          <Autocomplete
            multiple
            options={skills}
            disableCloseOnSelect
            size={size}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Select Skills" placeholder="Choose skills..." />
            )}
          />

          {/* Checkbox with ListItemText */}
          <Autocomplete
            multiple
            options={countries}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            size={size}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.code}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                <ListItemText 
                  primary={option.label} 
                  secondary={option.code}
                />
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Select Countries" placeholder="Choose countries..." />
            )}
          />

          {/* Checkbox with avatars */}
          <Autocomplete
            multiple
            options={teamMembers}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            size={size}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.name}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: 12 }}>
                  {option.avatar}
                </Avatar>
                <ListItemText 
                  primary={option.name} 
                  secondary={option.role}
                />
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Team Members" placeholder="Select team members..." />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  avatar={<Avatar sx={{ width: 20, height: 20, fontSize: 10 }}>{option.avatar}</Avatar>}
                  label={option.name}
                  size="small"
                  {...getTagProps({ index })}
                  key={option.name}
                />
              ))
            }
          />
        </Stack>
      </Box>
    );
  }

  if (variant === 'customOptions') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Custom Option Rendering</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Size: {size}
        </Typography>
        <Stack spacing={3} sx={{ maxWidth: 400 }}>
          {/* With avatars */}
          <Autocomplete
            options={teamMembers}
            getOptionLabel={(option) => option.name}
            size={size}
            renderOption={(props, option) => (
              <li {...props} key={option.name}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: brandColors.primary.main }}>
                    {option.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">{option.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.role}
                    </Typography>
                  </Box>
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Assign to" placeholder="Search team members..." />
            )}
          />

          {/* Movie with year badge */}
          <Autocomplete
            options={movieOptions}
            getOptionLabel={(option) => option.title}
            size={size}
            renderOption={(props, option) => (
              <li {...props} key={option.title}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Box>
                    <Typography variant="body2">{option.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.category}
                    </Typography>
                  </Box>
                  <Chip label={option.year} size="small" variant="outlined" />
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Select Movie" placeholder="Search movies..." />
            )}
          />

          {/* Country with flag placeholder */}
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.label}
            size={size}
            renderOption={(props, option) => (
              <li {...props} key={option.code}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box 
                    sx={{ 
                      width: 24, 
                      height: 16, 
                      bgcolor: 'grey.300', 
                      borderRadius: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  >
                    {option.code}
                  </Box>
                  <Typography variant="body2">{option.label}</Typography>
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Country" placeholder="Select country..." />
            )}
          />
        </Stack>
      </Box>
    );
  }

  // singleSelect variant (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Single Select Dropdown with Search</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Size: {size}
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        {/* Basic autocomplete */}
        <Autocomplete
          options={skills}
          size={size}
          renderInput={(params) => (
            <TextField {...params} label="Select a skill" placeholder="Search..." />
          )}
        />

        {/* With clearable */}
        <Autocomplete
          options={skills}
          size={size}
          disableClearable={false}
          renderInput={(params) => (
            <TextField {...params} label="Technology" helperText="Search and select" />
          )}
        />

        {/* Countries with object options */}
        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option.label}
          size={size}
          renderInput={(params) => (
            <TextField {...params} label="Country" placeholder="Select a country..." />
          )}
        />

        {/* With default value */}
        <Autocomplete
          options={skills}
          defaultValue="React"
          size={size}
          renderInput={(params) => (
            <TextField {...params} label="Primary Skill" />
          )}
        />

        {/* Disabled */}
        <Autocomplete
          options={skills}
          defaultValue="JavaScript"
          disabled
          size={size}
          renderInput={(params) => (
            <TextField {...params} label="Disabled" />
          )}
        />

        {/* Loading state */}
        <Autocomplete
          options={[]}
          loading
          size={size}
          renderInput={(params) => (
            <TextField {...params} label="Loading..." />
          )}
        />
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof DropdownDemo> = {
  title: 'Inputs/Autocomplete',
  component: DropdownDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Dropdown select components with search, multi-select, and grouping.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['singleSelect', 'multiSelect', 'grouped', 'limitTags', 'checkboxes', 'customOptions'],
      description: 'Dropdown variant to display',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'Size of the dropdown',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Single select dropdown with search.
 */
export const SingleSelect: Story = {
  args: {
    variant: 'singleSelect',
    size: 'small',
  },
};

/**
 * Multi select dropdown with chips.
 */
export const MultiSelect: Story = {
  args: {
    variant: 'multiSelect',
    size: 'small',
  },
};

/**
 * Grouped dropdown options.
 */
export const Grouped: Story = {
  args: {
    variant: 'grouped',
    size: 'small',
  },
};

/**
 * Dropdown with limited visible tags.
 */
export const LimitTags: Story = {
  args: {
    variant: 'limitTags',
    size: 'small',
  },
};

/**
 * Dropdown with checkbox selection.
 */
export const WithCheckboxes: Story = {
  args: {
    variant: 'checkboxes',
    size: 'small',
  },
};

/**
 * Custom option rendering with avatars and badges.
 */
export const CustomOptions: Story = {
  args: {
    variant: 'customOptions',
    size: 'small',
  },
};

/**
 * Small size dropdowns.
 */
export const SmallSize: Story = {
  args: {
    variant: 'singleSelect',
    size: 'small',
  },
};
