import * as React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { accessibleCombinations } from '../theme';
import { brandColors } from '../tokens';

// Color combination card component
interface ColorCardProps {
  text: string;
  bg: string;
  label: string;
  textColorName: string;
  bgColorName: string;
}

function ColorCard({ text, bg, label, textColorName, bgColorName }: ColorCardProps) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          width: 160,
          height: 160,
          borderRadius: 2,
          backgroundColor: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: bg === '#FFFFFF' ? '1px solid #E5E7EB' : 'none',
          boxShadow: 1,
        }}
      >
        <Typography
          sx={{
            color: text,
            fontSize: 64,
            fontWeight: 300,
            fontFamily: '"Montserrat", sans-serif',
          }}
        >
          Aa
        </Typography>
      </Box>
      <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="caption" display="block" color="text.secondary">
        {textColorName} on {bgColorName}
      </Typography>
    </Box>
  );
}

export default function ColorAccessibilityPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Color
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: brandColors.primary.light, mb: 3 }}
      >
        Accessibility
      </Typography>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="body1" sx={{ maxWidth: 400, mb: 4 }}>
          Our color palette has been carefully developed to meet the Web Content
          Accessibility Guidelines (WCAG) 2.1 AA standards.
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 400, mb: 4 }}>
          When selecting colors for text and text backgrounds please use the
          following combinations only.
        </Typography>

        {/* Row 1: Primary combinations */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 3 }}>
          Primary Combinations
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid>
            <ColorCard
              text={accessibleCombinations.whiteOnNavy.text}
              bg={accessibleCombinations.whiteOnNavy.bg}
              label="White on Navy"
              textColorName="White"
              bgColorName="Navy (#050742)"
            />
          </Grid>
          <Grid>
            <ColorCard
              text={accessibleCombinations.navyOnWhite.text}
              bg={accessibleCombinations.navyOnWhite.bg}
              label="Navy on White"
              textColorName="Navy (#050742)"
              bgColorName="White"
            />
          </Grid>
          <Grid>
            <ColorCard
              text={accessibleCombinations.whiteOnPurple.text}
              bg={accessibleCombinations.whiteOnPurple.bg}
              label="White on Purple"
              textColorName="White"
              bgColorName="Purple (#7841C9)"
            />
          </Grid>
          <Grid>
            <ColorCard
              text={accessibleCombinations.purpleOnWhite.text}
              bg={accessibleCombinations.purpleOnWhite.bg}
              label="Purple on White"
              textColorName="Purple (#7841C9)"
              bgColorName="White"
            />
          </Grid>
        </Grid>

        {/* Row 2: Accent combinations */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 3 }}>
          Accent Combinations
        </Typography>
        <Grid container spacing={3}>
          <Grid>
            <ColorCard
              text={accessibleCombinations.coralOnNavy.text}
              bg={accessibleCombinations.coralOnNavy.bg}
              label="Coral on Navy"
              textColorName="Coral (#FF6150)"
              bgColorName="Navy (#050742)"
            />
          </Grid>
          <Grid>
            <ColorCard
              text={accessibleCombinations.navyOnCoral.text}
              bg={accessibleCombinations.navyOnCoral.bg}
              label="Navy on Coral"
              textColorName="Navy (#050742)"
              bgColorName="Coral (#FF6150)"
            />
          </Grid>
          <Grid>
            <ColorCard
              text={accessibleCombinations.azureOnNavy.text}
              bg={accessibleCombinations.azureOnNavy.bg}
              label="Azure on Navy"
              textColorName="Azure (#27AAE1)"
              bgColorName="Navy (#050742)"
            />
          </Grid>
          <Grid>
            <ColorCard
              text={accessibleCombinations.navyOnAzure.text}
              bg={accessibleCombinations.navyOnAzure.bg}
              label="Navy on Azure"
              textColorName="Navy (#050742)"
              bgColorName="Azure (#27AAE1)"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Color Palette Reference */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Brand Color Palette
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  backgroundColor: brandColors.primary.main,
                  boxShadow: 1,
                }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: 600 }}>
                Navy
              </Typography>
              <Typography variant="caption" color="text.secondary">
                #050742
              </Typography>
            </Box>
          </Grid>
          <Grid>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  backgroundColor: brandColors.primary.light,
                  boxShadow: 1,
                }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: 600 }}>
                Purple
              </Typography>
              <Typography variant="caption" color="text.secondary">
                #7841C9
              </Typography>
            </Box>
          </Grid>
          <Grid>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  backgroundColor: brandColors.secondary.main,
                  boxShadow: 1,
                }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: 600 }}>
                Coral
              </Typography>
              <Typography variant="caption" color="text.secondary">
                #FF6150
              </Typography>
            </Box>
          </Grid>
          <Grid>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  backgroundColor: brandColors.secondary.light,
                  boxShadow: 1,
                }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: 600 }}>
                Azure
              </Typography>
              <Typography variant="caption" color="text.secondary">
                #27AAE1
              </Typography>
            </Box>
          </Grid>
          <Grid>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  backgroundColor: brandColors.neutral.white,
                  border: '1px solid #E5E7EB',
                  boxShadow: 1,
                }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: 600 }}>
                White
              </Typography>
              <Typography variant="caption" color="text.secondary">
                #FFFFFF
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Usage Guidelines */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Usage Guidelines
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
            <li>Always ensure a minimum contrast ratio of 4.5:1 for normal text</li>
            <li>Large text (18pt+ or 14pt+ bold) requires minimum 3:1 contrast</li>
            <li>Use the <code>accessibleCombinations</code> export from theme.ts for guaranteed compliance</li>
            <li>Test all custom color combinations with a contrast checker tool</li>
          </Typography>
        </Box>

        {/* Code Example */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Code Usage
          </Typography>
          <Box
            component="pre"
            sx={{
              backgroundColor: brandColors.neutral.darkBg,
              color: brandColors.neutral.white,
              p: 2,
              borderRadius: 2,
              fontSize: 13,
              overflow: 'auto',
            }}
          >
{`import { accessibleCombinations } from './theme';

// Use accessible color pairs
<Box sx={{
  backgroundColor: accessibleCombinations.whiteOnNavy.bg,
  color: accessibleCombinations.whiteOnNavy.text,
}}>
  WCAG AA Compliant Text
</Box>`}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
