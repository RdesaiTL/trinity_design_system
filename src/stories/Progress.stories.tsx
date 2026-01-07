import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  LinearProgress,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import { brandColors } from '../tokens';

/**
 * # Progress Indicators
 * 
 * Progress indicators show the status of a process in real-time.
 * They help users understand how long an operation will take.
 * 
 * ## Types
 * - **Linear Progress**: Horizontal bar for determinate/indeterminate progress
 * - **Circular Progress**: Spinner for loading states
 * - **Stepper**: Multi-step process navigation
 * 
 * ## Design Guidelines
 * - Use determinate progress when the duration is known
 * - Use indeterminate when duration is unknown
 * - Provide context about what's loading
 * - Consider skeleton loaders for content loading
 */

interface ProgressDemoProps {
  variant?: 'linear' | 'circular' | 'steps' | 'upload' | 'multiStep' | 'custom';
}

const ProgressDemo = ({ variant = 'linear' }: ProgressDemoProps) => {
  const [progress, _setProgress] = useState(67);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { label: 'Data Collection', description: 'Gathering market data from multiple sources' },
    { label: 'Analysis', description: 'Processing and analyzing collected data' },
    { label: 'Validation', description: 'Validating results against benchmarks' },
    { label: 'Report Generation', description: 'Creating comprehensive reports' },
  ];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  if (variant === 'circular') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Circular Progress</Typography>
        <Stack direction="row" spacing={4} alignItems="center">
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Indeterminate
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress variant="determinate" value={75} />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              75%
            </Typography>
          </Box>
          
          <Box sx={{ position: 'relative', display: 'inline-flex', textAlign: 'center' }}>
            <CircularProgress variant="determinate" value={progress} size={80} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {`${progress}%`}
              </Typography>
            </Box>
            <Typography variant="caption" display="block" sx={{ mt: 1, position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)' }}>
              With Label
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress color="secondary" />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Secondary
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={24} />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Small
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'steps') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Horizontal Stepper</Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === steps.length ? (
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
            <CheckCircleIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6">All steps completed!</Typography>
            <Typography>Your report has been generated successfully.</Typography>
          </Paper>
        ) : (
          <Box>
            <Typography variant="h6">{steps[activeStep].label}</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {steps[activeStep].description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  if (variant === 'multiStep') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Vertical Stepper</Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {step.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    size="small"
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    size="small"
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  }

  if (variant === 'upload') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>File Upload Progress</Typography>
        <Stack spacing={3}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">market_analysis_2024.xlsx</Typography>
              <Typography variant="body2" color="text.secondary">100%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={100} color="success" />
            <Typography variant="caption" color="success.main" sx={{ mt: 0.5 }}>
              ✓ Upload complete
            </Typography>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">sales_data_q4.csv</Typography>
              <Typography variant="body2" color="text.secondary">67%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={67} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              Uploading... 4.2 MB of 6.3 MB
            </Typography>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">territory_mapping.json</Typography>
              <Typography variant="body2" color="text.secondary">Waiting...</Typography>
            </Box>
            <LinearProgress variant="determinate" value={0} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              Queued for upload
            </Typography>
          </Paper>
        </Stack>
      </Box>
    );
  }

  if (variant === 'custom') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Custom Progress Indicators</Typography>
        <Stack spacing={4}>
          {/* Segmented Progress */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Segmented Progress</Typography>
            <Stack direction="row" spacing={0.5}>
              {[100, 100, 100, 75, 0, 0, 0].map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    height: 8,
                    flex: 1,
                    borderRadius: 4,
                    bgcolor: value === 0 ? 'grey.200' : value === 100 ? brandColors.primary.main : brandColors.secondary.main,
                  }}
                />
              ))}
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              4 of 7 steps complete
            </Typography>
          </Box>

          {/* Multi-metric Progress */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Multi-metric Progress</Typography>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">Data Quality</Typography>
                  <Typography variant="caption">92%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={92} color="success" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">Completeness</Typography>
                  <Typography variant="caption">78%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={78} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">Processing</Typography>
                  <Typography variant="caption">45%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={45} color="warning" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </Paper>
          </Box>

          {/* Dashboard Stats */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Dashboard Progress Cards</Typography>
            <Stack direction="row" spacing={2}>
              {[
                { label: 'Revenue Target', value: 85, color: brandColors.primary.main },
                { label: 'Market Coverage', value: 72, color: brandColors.secondary.main },
                { label: 'KOL Engagement', value: 94, color: brandColors.primary.light },
              ].map((item) => (
                <Paper key={item.label} sx={{ p: 2, flex: 1, textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={item.value}
                      size={80}
                      sx={{ color: item.color }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6">{item.value}%</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>{item.label}</Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  // Linear variant (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Linear Progress</Typography>
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>Indeterminate</Typography>
          <LinearProgress />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>Determinate ({progress}%)</Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>Buffer</Typography>
          <LinearProgress variant="buffer" value={progress} valueBuffer={progress + 15} />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>With Label</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {`${progress}%`}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Colors</Typography>
          <Stack spacing={2}>
            <LinearProgress variant="determinate" value={60} color="primary" />
            <LinearProgress variant="determinate" value={60} color="secondary" />
            <LinearProgress variant="determinate" value={60} color="success" />
            <LinearProgress variant="determinate" value={60} color="warning" />
            <LinearProgress variant="determinate" value={60} color="error" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof ProgressDemo> = {
  title: 'Feedback/Progress',
  component: ProgressDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'MUI progress indicators for determinate/indeterminate loading and multi-step processes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['linear', 'circular', 'steps', 'upload', 'multiStep', 'custom'],
      description: 'Progress indicator variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive Progress playground - try both Linear and Circular progress.
 * Use Controls to adjust value and color.
 */
export const Playground: Story = {
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress value (0-100)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Progress color',
    },
    type: {
      control: 'radio',
      options: ['linear', 'circular'],
      description: 'Progress type',
    },
  },
  render: (args: { value?: number; color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'; type?: 'linear' | 'circular' }) => (
    <Box sx={{ p: 4, width: 300 }}>
      <Typography gutterBottom>Progress: {args.value}%</Typography>
      {args.type === 'circular' ? (
        <CircularProgress
          variant="determinate"
          value={args.value}
          color={args.color}
        />
      ) : (
        <LinearProgress
          variant="determinate"
          value={args.value}
          color={args.color}
        />
      )}
    </Box>
  ),
  args: {
    value: 60,
    color: 'primary',
    type: 'linear',
  },
};

/**
 * Linear progress bars.
 */
export const Linear: Story = {
  args: {
    variant: 'linear',
  },
};

/**
 * Circular spinners and loaders.
 */
export const Circular: Story = {
  args: {
    variant: 'circular',
  },
};

/**
 * Horizontal stepper for multi-step processes.
 */
export const HorizontalStepper: Story = {
  args: {
    variant: 'steps',
  },
};

/**
 * Vertical stepper with content.
 */
export const VerticalStepper: Story = {
  args: {
    variant: 'multiStep',
  },
};

/**
 * File upload progress example.
 */
export const FileUpload: Story = {
  args: {
    variant: 'upload',
  },
};

/**
 * Custom progress visualizations.
 */
export const CustomProgress: Story = {
  args: {
    variant: 'custom',
  },
};
