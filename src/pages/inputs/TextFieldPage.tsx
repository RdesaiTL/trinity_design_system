import * as React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const TextFieldPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <ComponentPage
      title="Text Field"
      description="Text fields let users enter and edit text."
    >
      <Section title="Variants">
        <Showcase>
          <TextField label="Outlined" variant="outlined" />
          <TextField label="Filled" variant="filled" />
          <TextField label="Standard" variant="standard" />
        </Showcase>
      </Section>

      <Section title="Sizes">
        <Showcase>
          <TextField label="Small" size="small" />
          <TextField label="Medium" />
        </Showcase>
      </Section>

      <Section title="States">
        <Showcase>
          <TextField label="Default" />
          <TextField label="Disabled" disabled />
          <TextField label="Read Only" defaultValue="Read only" slotProps={{ input: { readOnly: true } }} />
          <TextField label="Required" required />
          <TextField label="Error" error helperText="Error message" />
        </Showcase>
      </Section>

      <Section title="With Adornments">
        <Showcase>
          <TextField
            label="Search"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              },
            }}
          />
          <TextField
            label="Amount"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              },
            }}
          />
          <TextField
            label="Weight"
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              },
            }}
          />
          <TextField
            label="Username"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
              },
            }}
          />
        </Showcase>
      </Section>

      <Section title="Password">
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Section>

      <Section title="Multiline">
        <Showcase>
          <TextField label="Multiline" multiline rows={4} sx={{ width: 250 }} />
          <TextField label="Auto-grow" multiline minRows={2} maxRows={6} sx={{ width: 250 }} />
        </Showcase>
      </Section>

      <Section title="Full Width">
        <TextField label="Full Width" fullWidth />
      </Section>

      <Section title="Colors">
        <Showcase>
          <TextField label="Primary" color="primary" focused />
          <TextField label="Secondary" color="secondary" focused />
          <TextField label="Success" color="success" focused />
          <TextField label="Warning" color="warning" focused />
        </Showcase>
      </Section>
    </ComponentPage>
  );
};
