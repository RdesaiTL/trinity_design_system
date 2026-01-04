import * as React from 'react';
import {
  Stepper, Step, StepLabel, StepContent, StepButton, Button, Typography, Box,
} from '@mui/material';
import { ComponentPage, Section } from '../../components/shared';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
const stepContent = [
  'For each ad campaign, you can control how much you spend.',
  'An ad group contains one or more ads.',
  'Try out different ad text to see what works best.',
];

export const StepperPage: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  const handleStep = (step: number) => () => setActiveStep(step);

  const _handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <ComponentPage
      title="Stepper"
      description="Steppers convey progress through numbered steps. It provides a wizard-like workflow."
    >
      <Section title="Horizontal Linear">
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Box sx={{ mt: 2 }}>
              <Typography>All steps completed!</Typography>
              <Button onClick={handleReset} sx={{ mt: 1 }}>Reset</Button>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ mb: 1 }}>{stepContent[activeStep]}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Section>

      <Section title="Non-Linear">
        <Box sx={{ width: '100%' }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton onClick={handleStep(index)}>{label}</StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Section>

      <Section title="Alternative Label">
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Section>

      <Section title="Error State">
        <Stepper activeStep={1}>
          <Step><StepLabel>Step 1</StepLabel></Step>
          <Step><StepLabel error>Step 2 (Error)</StepLabel></Step>
          <Step><StepLabel>Step 3</StepLabel></Step>
        </Stepper>
      </Section>

      <Section title="Vertical">
        <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={1} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{stepContent[index]}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" size="small" sx={{ mr: 1 }}>
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button disabled={index === 0} size="small">Back</Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Section>
    </ComponentPage>
  );
};
