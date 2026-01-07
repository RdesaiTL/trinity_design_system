import * as React from 'react';
import { Slider, Box, Typography } from '@mui/material';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { ComponentPage, Section, Showcase } from '../../components/shared';

export const SliderPage: React.FC = () => {
  const marks = [
    { value: 0, label: '0°C' },
    { value: 20, label: '20°C' },
    { value: 40, label: '40°C' },
    { value: 60, label: '60°C' },
    { value: 80, label: '80°C' },
    { value: 100, label: '100°C' },
  ];

  return (
    <ComponentPage
      title="Slider"
      description="Sliders allow users to make selections from a range of values."
    >
      <Section title="Continuous">
        <Box sx={{ width: 300 }}>
          <Typography gutterBottom>Volume</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VolumeDown />
            <Slider defaultValue={30} />
            <VolumeUp />
          </Box>
        </Box>
      </Section>

      <Section title="Sizes">
        <Box sx={{ width: 300 }}>
          <Showcase direction="column">
            <Slider defaultValue={30} size="small" />
            <Slider defaultValue={30} />
          </Showcase>
        </Box>
      </Section>

      <Section title="Discrete">
        <Box sx={{ width: 300 }}>
          <Slider
            defaultValue={30}
            step={10}
            marks
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </Box>
      </Section>

      <Section title="Custom Marks">
        <Box sx={{ width: 300 }}>
          <Slider
            defaultValue={40}
            step={20}
            marks={marks}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </Box>
      </Section>

      <Section title="Range">
        <Box sx={{ width: 300 }}>
          <Slider defaultValue={[20, 50]} valueLabelDisplay="auto" />
        </Box>
      </Section>

      <Section title="Colors">
        <Box sx={{ width: 300 }}>
          <Showcase direction="column">
            <Slider defaultValue={30} color="primary" />
            <Slider defaultValue={30} color="secondary" />
          </Showcase>
        </Box>
      </Section>

      <Section title="Vertical">
        <Box sx={{ height: 200 }}>
          <Showcase>
            <Slider orientation="vertical" defaultValue={30} />
            <Slider orientation="vertical" defaultValue={[20, 50]} />
          </Showcase>
        </Box>
      </Section>

      <Section title="Disabled">
        <Box sx={{ width: 300 }}>
          <Slider disabled defaultValue={30} />
        </Box>
      </Section>
    </ComponentPage>
  );
};
