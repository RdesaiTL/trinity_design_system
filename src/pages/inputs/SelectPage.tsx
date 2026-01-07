import * as React from 'react';
import {
  Select, MenuItem, FormControl, InputLabel, FormHelperText, OutlinedInput, Chip, Box,
} from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const SelectPage: React.FC = () => {
  const [age, setAge] = React.useState('');
  const [multi, setMulti] = React.useState<string[]>([]);

  return (
    <ComponentPage
      title="Select"
      description="Select components are used for collecting user-provided information from a list of options."
    >
      <Section title="Basic">
        <Showcase>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Age</InputLabel>
            <Select value={age} label="Age" onChange={(e) => setAge(e.target.value)}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Age</InputLabel>
            <Select defaultValue={20} label="Age">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>With helper text</FormHelperText>
          </FormControl>
        </Showcase>
      </Section>

      <Section title="Variants">
        <Showcase>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Outlined</InputLabel>
            <Select label="Outlined" defaultValue={10}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ minWidth: 120 }}>
            <InputLabel>Filled</InputLabel>
            <Select defaultValue={10}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Standard</InputLabel>
            <Select defaultValue={10}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
            </Select>
          </FormControl>
        </Showcase>
      </Section>

      <Section title="Sizes">
        <Showcase>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Small</InputLabel>
            <Select label="Small" defaultValue={10}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Medium</InputLabel>
            <Select label="Medium" defaultValue={10}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
            </Select>
          </FormControl>
        </Showcase>
      </Section>

      <Section title="Multiple Select">
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Names</InputLabel>
          <Select
            multiple
            value={multi}
            onChange={(e) => setMulti(e.target.value as string[])}
            input={<OutlinedInput label="Names" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {['Oliver', 'Van', 'April', 'Ralph', 'Omar'].map((name) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Section>

      <Section title="States">
        <Showcase>
          <FormControl sx={{ minWidth: 120 }} disabled>
            <InputLabel>Disabled</InputLabel>
            <Select label="Disabled" defaultValue={10}>
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} error>
            <InputLabel>Error</InputLabel>
            <Select label="Error" defaultValue="">
              <MenuItem value="">None</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
            <FormHelperText>Error message</FormHelperText>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} required>
            <InputLabel>Required</InputLabel>
            <Select label="Required" defaultValue="">
              <MenuItem value="">None</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
        </Showcase>
      </Section>
    </ComponentPage>
  );
};
