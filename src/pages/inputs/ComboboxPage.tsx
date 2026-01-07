import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';
import { Combobox, ComboboxOption } from '../../components/Combobox';

// Sample data
const frameworks: ComboboxOption[] = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue.js' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'nuxt', label: 'Nuxt' },
];

const users: ComboboxOption[] = [
  { id: 'user-1', label: 'Alice Johnson', secondary: 'alice@example.com' },
  { id: 'user-2', label: 'Bob Smith', secondary: 'bob@example.com' },
  { id: 'user-3', label: 'Carol Williams', secondary: 'carol@example.com' },
];

const groupedOptions: ComboboxOption[] = [
  { id: 'red', label: 'Red', group: 'Warm Colors' },
  { id: 'orange', label: 'Orange', group: 'Warm Colors' },
  { id: 'green', label: 'Green', group: 'Cool Colors' },
  { id: 'blue', label: 'Blue', group: 'Cool Colors' },
];

export const ComboboxPage: React.FC = () => {
  const [creatableOptions, setCreatableOptions] = React.useState(frameworks);

  return (
    <ComponentPage
      title="Combobox"
      description="An enhanced multi-select component with create option, grouping, and custom rendering. Built on MUI Autocomplete with additional features."
    >
      <Section title="Basic">
        <Showcase>
          <Box sx={{ width: 300 }}>
            <Combobox
              options={frameworks}
              label="Select Framework"
              placeholder="Choose a framework..."
            />
          </Box>
        </Showcase>
      </Section>

      <Section title="Multiple Values">
        <Showcase>
          <Box sx={{ width: 400 }}>
            <Combobox
              options={frameworks}
              label="Select Frameworks"
              placeholder="Choose frameworks..."
              multiple
              showCheckbox
            />
          </Box>
        </Showcase>
      </Section>

      <Section title="With Secondary Text">
        <Showcase>
          <Box sx={{ width: 400 }}>
            <Combobox
              options={users}
              label="Assign to"
              placeholder="Select user..."
              fullWidth
            />
          </Box>
        </Showcase>
      </Section>

      <Section title="Grouped Options">
        <Showcase>
          <Box sx={{ width: 300 }}>
            <Combobox
              options={groupedOptions}
              label="Select Color"
              placeholder="Choose a color..."
              groupBy
              fullWidth
            />
          </Box>
        </Showcase>
      </Section>

      <Section title="Creatable">
        <Showcase>
          <Box sx={{ width: 400 }}>
            <Combobox
              options={creatableOptions}
              label="Tags"
              placeholder="Add tags..."
              multiple
              creatable
              createText='Create "{value}"'
              onCreate={(value) => {
                const newOption = { 
                  id: value.toLowerCase().replace(/\s+/g, '-'), 
                  label: value 
                };
                setCreatableOptions([...creatableOptions, newOption]);
                return newOption;
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Type a new value and press Enter to add it
            </Typography>
          </Box>
        </Showcase>
      </Section>

      <Section title="Sizes">
        <Showcase>
          <Box sx={{ width: 250 }}>
            <Combobox
              options={frameworks}
              label="Small"
              size="small"
            />
          </Box>
          <Box sx={{ width: 250 }}>
            <Combobox
              options={frameworks}
              label="Medium"
              size="medium"
            />
          </Box>
        </Showcase>
      </Section>

      <Section title="States">
        <Showcase>
          <Box sx={{ width: 250 }}>
            <Combobox
              options={frameworks}
              label="Disabled"
              disabled
            />
          </Box>
          <Box sx={{ width: 250 }}>
            <Combobox
              options={users}
              label="With Error"
              error
              errorMessage="This field is required"
            />
          </Box>
        </Showcase>
      </Section>

      <Section title="Limit Tags">
        <Showcase>
          <Box sx={{ width: 400 }}>
            <Combobox
              options={frameworks}
              label="Selected Technologies"
              multiple
              limitTags={2}
              defaultValue={[frameworks[0], frameworks[1], frameworks[2], frameworks[3]]}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Shows +N indicator when more than 2 items selected
            </Typography>
          </Box>
        </Showcase>
      </Section>
    </ComponentPage>
  );
};
