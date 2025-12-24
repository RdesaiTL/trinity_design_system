import * as React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const RadioPage: React.FC = () => {
  const [value, setValue] = React.useState('female');

  return (
    <ComponentPage
      title="Radio Group"
      description="Radio buttons allow the user to select one option from a set."
    >
      <Section title="Basic">
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup value={value} onChange={(e) => setValue(e.target.value)} row>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />
          </RadioGroup>
        </FormControl>
      </Section>

      <Section title="Standalone">
        <Showcase>
          <Radio checked />
          <Radio />
          <Radio disabled />
          <Radio disabled checked />
        </Showcase>
      </Section>

      <Section title="Sizes">
        <Showcase>
          <Radio checked size="small" />
          <Radio checked />
          <Radio checked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
        </Showcase>
      </Section>

      <Section title="Colors">
        <Showcase>
          <Radio defaultChecked color="default" />
          <Radio defaultChecked color="primary" />
          <Radio defaultChecked color="secondary" />
          <Radio defaultChecked color="success" />
          <Radio defaultChecked color="error" />
          <Radio defaultChecked color="warning" />
          <Radio defaultChecked color="info" />
        </Showcase>
      </Section>

      <Section title="Direction">
        <Showcase>
          <FormControl>
            <FormLabel>Plan</FormLabel>
            <RadioGroup defaultValue="basic">
              <FormControlLabel value="basic" control={<Radio />} label="Basic" />
              <FormControlLabel value="standard" control={<Radio />} label="Standard" />
              <FormControlLabel value="premium" control={<Radio />} label="Premium" />
            </RadioGroup>
          </FormControl>
        </Showcase>
      </Section>
    </ComponentPage>
  );
};
