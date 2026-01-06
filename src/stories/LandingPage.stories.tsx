import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { LandingPage, FeatureCard, LandingPageFeature } from '../components/LandingPage';
import TopNavHeader from '../components/TopNavHeader';
import { gradientIcons, brandGradients, backgroundImages } from '../assets';
import { brandColors } from '../tokens';

/**
 * # LandingPage Template
 *
 * A complete landing page template featuring a hero section with customizable background
 * and a grid of feature cards. Perfect for product landing pages, service showcases,
 * and application entry points.
 *
 * ## Features
 *
 * - **Hero Section**: Customizable title, subtitle, and background (image or gradient)
 * - **Feature Cards**: Navy or white variants with gradient icons
 * - **Responsive Grid**: 1-4 column layouts that adapt to screen size
 * - **Trinity Branding**: Uses brand colors, typography, and assets
 * - **Accessibility**: WCAG AA compliant with proper heading structure
 *
 * ## Usage
 *
 * ```tsx
 * import { LandingPage } from '@trinity/design-system';
 * import { gradientIcons, brandGradients } from '@trinity/design-system/assets';
 *
 * const features = [
 *   {
 *     id: 'feature-1',
 *     icon: gradientIcons.ai,
 *     title: 'AI Research',
 *     description: 'Powerful AI-driven research tools',
 *     variant: 'navy',
 *     onClick: () => navigate('/research'),
 *   },
 * ];
 *
 * <LandingPage
 *   heroTitle="AI for Life Sciences"
 *   heroSubtitle="Transform your workflows with AI"
 *   backgroundImage={brandGradients.light[0]}
 *   features={features}
 * />
 * ```
 *
 * ## Customization
 *
 * Engineers can customize:
 * - Background images (from `brandGradients` or `backgroundImages` assets)
 * - Card variants (`navy` or `white`)
 * - Icons (from `gradientIcons` asset library)
 * - Grid columns (1-6)
 * - Hero height and content (including fullscreen)
 * - Add navigation header and footer
 */

// Background image options for select control
const backgroundOptions = {
  'None (Default Gradient)': undefined,
  // Light Brand Gradients
  'Light Gradient 1': brandGradients.light[0],
  'Light Gradient 2': brandGradients.light[1],
  'Light Gradient 3': brandGradients.light[2],
  'Light Gradient 4': brandGradients.light[3],
  'Light Gradient 5': brandGradients.light[4],
  'Light Gradient 6': brandGradients.light[5],
  'Light Gradient 7': brandGradients.light[6],
  'Light Gradient 8': brandGradients.light[7],
  'Light Gradient 9': brandGradients.light[8],
  'Light Gradient 10': brandGradients.light[9],
  // Dark Brand Gradients
  'Dark Gradient 1': brandGradients.dark[0],
  'Dark Gradient 2': brandGradients.dark[1],
  'Dark Gradient 3': brandGradients.dark[2],
  'Dark Gradient 4': brandGradients.dark[3],
  'Dark Gradient 5': brandGradients.dark[4],
  'Dark Gradient 6': brandGradients.dark[5],
  'Dark Gradient 7': brandGradients.dark[6],
  'Dark Gradient 8': brandGradients.dark[7],
  // Smooth Abstract
  'Smooth Abstract 1': backgroundImages.smoothAbstract[0],
  'Smooth Abstract 2': backgroundImages.smoothAbstract[1],
  'Smooth Abstract 3': backgroundImages.smoothAbstract[2],
  'Smooth Abstract 4': backgroundImages.smoothAbstract[3],
  'Smooth Abstract 5': backgroundImages.smoothAbstract[4],
  'Smooth Abstract 6': backgroundImages.smoothAbstract[5],
  'Smooth Abstract 7': backgroundImages.smoothAbstract[6],
  'Smooth Abstract 8': backgroundImages.smoothAbstract[7],
  'Smooth Abstract 9': backgroundImages.smoothAbstract[8],
  'Smooth Abstract 10': backgroundImages.smoothAbstract[9],
  'Smooth Abstract 11': backgroundImages.smoothAbstract[10],
  'Smooth Abstract 12': backgroundImages.smoothAbstract[11],
  'Smooth Abstract 13': backgroundImages.smoothAbstract[12],
  'Smooth Abstract 14': backgroundImages.smoothAbstract[13],
  // Technology & Human
  'Tech Human 1': backgroundImages.technologyHuman[0],
  'Tech Human 2': backgroundImages.technologyHuman[1],
  'Tech Human 3': backgroundImages.technologyHuman[2],
  'Tech Human 4': backgroundImages.technologyHuman[3],
  'Tech Human 5': backgroundImages.technologyHuman[4],
  'Tech Human 6': backgroundImages.technologyHuman[5],
  'Tech Human 7': backgroundImages.technologyHuman[6],
  'Tech Human 8': backgroundImages.technologyHuman[7],
  'Tech Human 9': backgroundImages.technologyHuman[8],
  'Tech Human 10': backgroundImages.technologyHuman[9],
  'Tech Human 11': backgroundImages.technologyHuman[10],
  'Tech Human 12': backgroundImages.technologyHuman[11],
  'Tech Human 13': backgroundImages.technologyHuman[12],
};

// Hero height options
const heroHeightOptions = {
  'Small (300px)': 300,
  'Medium (400px)': 400,
  'Large (500px)': 500,
  'Extra Large (600px)': 600,
  'Half Screen (50vh)': '50vh',
  'Full Screen (100vh)': '100vh',
  'Fullscreen': 'fullscreen',
};

const meta: Meta<typeof LandingPage> = {
  title: 'Templates/LandingPage',
  component: LandingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A complete landing page template with hero section and feature card grid.',
      },
    },
  },
  argTypes: {
    heroTitle: {
      control: 'text',
      description: 'Main hero title',
    },
    heroSubtitle: {
      control: 'text',
      description: 'Hero subtitle/description',
    },
    backgroundImage: {
      control: 'select',
      options: Object.keys(backgroundOptions),
      mapping: backgroundOptions,
      description: 'Background image for the hero section',
    },
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'Number of feature card columns (1-6)',
    },
    heroHeight: {
      control: 'select',
      options: Object.keys(heroHeightOptions),
      mapping: heroHeightOptions,
      description: 'Hero section height',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample features matching the design reference
const sampleFeatures: LandingPageFeature[] = [
  {
    id: 'research',
    icon: gradientIcons.ai,
    title: 'Trinity Research Platform',
    description:
      'Get the insights you need in seconds - just ask your question and receive a clear, concise answer instantly.',
    variant: 'navy',
    onClick: () => console.log('Research Platform clicked'),
  },
  {
    id: 'automation',
    icon: gradientIcons.perf,
    title: 'Automation Studio',
    description:
      'Optimize your workflows and automate tedious tasks with cutting-edge AI. Enhance your efficiency and allow your team to focus on what matters most.',
    variant: 'navy',
    onClick: () => console.log('Automation Studio clicked'),
  },
  {
    id: 'job-generator',
    icon: gradientIcons.together,
    title: 'Job Description Generator',
    description:
      'Create tailored job descriptions in minutes. Using AI, generate precise, role-specific descriptions to attract the best talent for your life sciences team.',
    variant: 'navy',
    onClick: () => console.log('Job Generator clicked'),
  },
];

/**
 * Default landing page with the AI for Life Sciences theme.
 * Matches the provided design reference.
 */
export const Default: Story = {
  args: {
    heroTitle: 'AI for Life Sciences',
    heroSubtitle:
      'Unlock the power of AI in transforming research, operations, and recruitment with our innovative tools. Streamline your processes, enhance productivity, and gain insights faster than ever.',
    backgroundImage: brandGradients.light[0],
    features: sampleFeatures,
    columns: 3,
    heroHeight: 400,
  },
};

/**
 * With Trinity navigation header integrated.
 */
export const WithNavigation: Story = {
  args: {
    heroTitle: 'AI for Life Sciences',
    heroSubtitle:
      'Unlock the power of AI in transforming research, operations, and recruitment with our innovative tools.',
    backgroundImage: brandGradients.light[0],
    features: sampleFeatures,
    columns: 3,
    heroHeight: 400,
    heroExtendsUnderNav: true,
    navHeight: 64,
    header: (
      <TopNavHeader
        appTitle="AI Innovation Hub"
        clients={[
          { id: '1', name: 'Acme Pharma' },
          { id: '2', name: 'BioTech Inc' },
        ]}
        selectedClientId="1"
        onClientChange={() => {}}
        user={{ name: 'Rahul Desai', email: 'rahul@trinity.com' }}
        onLogout={() => {}}
        sx={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: 'transparent',
          '& .MuiAppBar-root': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      />
    ),
  },
};

/**
 * Mixed card variants - combining navy and white cards.
 */
export const MixedCardVariants: Story = {
  args: {
    heroTitle: 'Our Services',
    heroSubtitle: 'Comprehensive solutions for life sciences organizations.',
    backgroundImage: brandGradients.light[2],
    features: [
      {
        id: 'consulting',
        icon: gradientIcons.strategy,
        title: 'Strategic Consulting',
        description:
          'Expert guidance on market access, pricing strategies, and commercial planning.',
        variant: 'white',
        onClick: () => {},
      },
      {
        id: 'research',
        icon: gradientIcons.marketResearch,
        title: 'Market Research',
        description:
          'In-depth market analysis and competitive intelligence to inform your decisions.',
        variant: 'navy',
        onClick: () => {},
      },
      {
        id: 'analytics',
        icon: gradientIcons.insights,
        title: 'Data Analytics',
        description:
          'Transform raw data into actionable insights with our analytics platform.',
        variant: 'white',
        onClick: () => {},
      },
      {
        id: 'medical',
        icon: gradientIcons.medical,
        title: 'Medical Affairs',
        description:
          'Support your medical teams with evidence-based insights and communications.',
        variant: 'navy',
        onClick: () => {},
      },
    ],
    columns: 4,
    heroHeight: 350,
  },
};

/**
 * Two-column layout for fewer features.
 */
export const TwoColumnLayout: Story = {
  args: {
    heroTitle: 'Get Started',
    heroSubtitle: 'Choose your path to innovation.',
    backgroundGradient: `linear-gradient(135deg, ${brandColors.primary.main} 0%, ${brandColors.primary.light} 100%)`,
    features: [
      {
        id: 'enterprise',
        icon: gradientIcons.portfolio,
        title: 'Enterprise Solutions',
        description:
          'Full-scale deployment with dedicated support, custom integrations, and advanced security features.',
        variant: 'navy',
        onClick: () => {},
      },
      {
        id: 'starter',
        icon: gradientIcons.launch,
        title: 'Quick Start',
        description:
          'Get up and running in minutes with our self-service platform and comprehensive documentation.',
        variant: 'white',
        onClick: () => {},
      },
    ],
    columns: 2,
    heroHeight: 300,
  },
};

/**
 * Using a smooth abstract background image.
 */
export const WithAbstractBackground: Story = {
  args: {
    heroTitle: 'Innovation Hub',
    heroSubtitle:
      'Where cutting-edge technology meets life sciences expertise.',
    backgroundImage: backgroundImages.smoothAbstract[4],
    features: [
      {
        id: 'ai',
        icon: gradientIcons.intelligence,
        title: 'AI & Machine Learning',
        description: 'Leverage advanced AI models trained on life sciences data.',
        variant: 'navy',
      },
      {
        id: 'data',
        icon: gradientIcons.realWorld,
        title: 'Real World Data',
        description: 'Access and analyze real-world evidence at scale.',
        variant: 'navy',
      },
      {
        id: 'platform',
        icon: gradientIcons.custEngagement,
        title: 'Engagement Platform',
        description: 'Connect with HCPs and patients through digital channels.',
        variant: 'navy',
      },
    ],
    columns: 3,
    heroHeight: 450,
  },
};

/**
 * Standalone FeatureCard component for individual use.
 */
export const FeatureCardStandalone: StoryObj<typeof FeatureCard> = {
  render: () => (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h5" gutterBottom>
        Feature Card Variants
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Cards can be used individually outside of the LandingPage template.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FeatureCard
            variant="navy"
            icon={gradientIcons.ai}
            title="Navy Variant"
            description="Dark navy background with white text. Ideal for primary features."
            onClick={() => alert('Clicked!')}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FeatureCard
            variant="white"
            icon={gradientIcons.insights}
            title="White Variant"
            description="White background with dark text. Great for secondary features or light backgrounds."
            onClick={() => alert('Clicked!')}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FeatureCard
            variant="navy"
            icon={gradientIcons.growth}
            title="Custom Accent"
            description="Cards support custom accent colors for the divider bar."
            accentColor={brandColors.secondary.light}
            onClick={() => alert('Clicked!')}
          />
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * All available gradient icons for reference.
 */
export const IconReference: StoryObj = {
  render: () => {
    const iconEntries = Object.entries(gradientIcons);

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Available Gradient Icons
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Use these with the <code>icon</code> prop:{' '}
          <code>icon={'{gradientIcons.ai}'}</code>
        </Typography>

        <Grid container spacing={2}>
          {iconEntries.map(([name, src]) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={name}>
              <Box
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: brandColors.primary.main,
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={name}
                  sx={{ width: 48, height: 48, mb: 1 }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: brandColors.neutral.white,
                    display: 'block',
                    fontSize: 10,
                  }}
                >
                  {name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  },
};

/**
 * Visual gallery of all available background images.
 * Click any thumbnail to see its import path.
 */
export const BackgroundGallery: StoryObj = {
  render: () => {
    const [selectedBg, setSelectedBg] = React.useState<string | null>(null);
    const [selectedName, setSelectedName] = React.useState<string>('');

    const handleSelect = (name: string, url: string) => {
      setSelectedBg(url);
      setSelectedName(name);
    };

    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Background Image Gallery
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Click any background to preview it. Use the select control in the Playground story to apply.
        </Typography>

        {/* Preview */}
        {selectedBg && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Selected: <code>{selectedName}</code>
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 200,
                borderRadius: 2,
                backgroundImage: `url(${selectedBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: `2px solid ${brandColors.secondary.main}`,
              }}
            />
          </Box>
        )}

        {/* Light Brand Gradients */}
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Light Brand Gradients
        </Typography>
        <Grid container spacing={2}>
          {brandGradients.light.map((bg, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={`light-${i}`}>
              <Box
                onClick={() => handleSelect(`brandGradients.light[${i}]`, bg)}
                sx={{
                  height: 100,
                  borderRadius: 1,
                  backgroundImage: `url(${bg})`,
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                  border: selectedBg === bg ? `3px solid ${brandColors.secondary.main}` : '3px solid transparent',
                  '&:hover': { opacity: 0.8 },
                }}
              />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, textAlign: 'center' }}>
                Light {i + 1}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Dark Brand Gradients */}
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Dark Brand Gradients
        </Typography>
        <Grid container spacing={2}>
          {brandGradients.dark.map((bg, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={`dark-${i}`}>
              <Box
                onClick={() => handleSelect(`brandGradients.dark[${i}]`, bg)}
                sx={{
                  height: 100,
                  borderRadius: 1,
                  backgroundImage: `url(${bg})`,
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                  border: selectedBg === bg ? `3px solid ${brandColors.secondary.main}` : '3px solid transparent',
                  '&:hover': { opacity: 0.8 },
                }}
              />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, textAlign: 'center' }}>
                Dark {i + 1}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Smooth Abstract */}
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Smooth Abstract
        </Typography>
        <Grid container spacing={2}>
          {backgroundImages.smoothAbstract.map((bg, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={`smooth-${i}`}>
              <Box
                onClick={() => handleSelect(`backgroundImages.smoothAbstract[${i}]`, bg)}
                sx={{
                  height: 100,
                  borderRadius: 1,
                  backgroundImage: `url(${bg})`,
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                  border: selectedBg === bg ? `3px solid ${brandColors.secondary.main}` : '3px solid transparent',
                  '&:hover': { opacity: 0.8 },
                }}
              />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, textAlign: 'center' }}>
                Abstract {i + 1}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Technology & Human */}
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Technology & Human
        </Typography>
        <Grid container spacing={2}>
          {backgroundImages.technologyHuman.map((bg, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={`tech-${i}`}>
              <Box
                onClick={() => handleSelect(`backgroundImages.technologyHuman[${i}]`, bg)}
                sx={{
                  height: 100,
                  borderRadius: 1,
                  backgroundImage: `url(${bg})`,
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                  border: selectedBg === bg ? `3px solid ${brandColors.secondary.main}` : '3px solid transparent',
                  '&:hover': { opacity: 0.8 },
                }}
              />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, textAlign: 'center' }}>
                Tech {i + 1}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  },
};

/**
 * Interactive FeatureCard playground with icon selection.
 */
export const FeatureCardPlayground: StoryObj = {
  render: () => {
    const [selectedIcon, setSelectedIcon] = React.useState<string>('ai');
    const [variant, setVariant] = React.useState<'navy' | 'white'>('navy');
    const iconEntries = Object.entries(gradientIcons);

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Feature Card Playground
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Select an icon and variant to preview the card.
        </Typography>

        <Grid container spacing={4}>
          {/* Card Preview */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Preview
            </Typography>
            <FeatureCard
              variant={variant}
              icon={gradientIcons[selectedIcon as keyof typeof gradientIcons]}
              title="Feature Title"
              description="This is a sample description for the feature card. It demonstrates the selected icon and variant."
              onClick={() => alert('Card clicked!')}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block' }}>
                icon={'{gradientIcons.{selectedIcon}}'}
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                variant="{variant}"
              </Typography>
            </Box>
          </Grid>

          {/* Controls */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Variant Toggle */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Variant
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  onClick={() => setVariant('navy')}
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: 1,
                    cursor: 'pointer',
                    backgroundColor: variant === 'navy' ? brandColors.primary.main : brandColors.neutral.gray200,
                    color: variant === 'navy' ? brandColors.neutral.white : brandColors.primary.main,
                    fontWeight: 600,
                  }}
                >
                  Navy
                </Box>
                <Box
                  onClick={() => setVariant('white')}
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: 1,
                    cursor: 'pointer',
                    backgroundColor: variant === 'white' ? brandColors.primary.main : brandColors.neutral.gray200,
                    color: variant === 'white' ? brandColors.neutral.white : brandColors.primary.main,
                    fontWeight: 600,
                  }}
                >
                  White
                </Box>
              </Box>
            </Box>

            {/* Icon Selection */}
            <Typography variant="subtitle2" gutterBottom>
              Select Icon ({iconEntries.length} available)
            </Typography>
            <Grid container spacing={1}>
              {iconEntries.map(([name, src]) => (
                <Grid size={{ xs: 3, sm: 2, md: 1.5 }} key={name}>
                  <Box
                    onClick={() => setSelectedIcon(name)}
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      cursor: 'pointer',
                      backgroundColor: selectedIcon === name ? brandColors.secondary.main : brandColors.primary.main,
                      border: selectedIcon === name ? `2px solid ${brandColors.secondary.main}` : '2px solid transparent',
                      textAlign: 'center',
                      '&:hover': { opacity: 0.8 },
                    }}
                  >
                    <Box
                      component="img"
                      src={src}
                      alt={name}
                      sx={{ width: 32, height: 32 }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  },
};

/**
 * Full screen hero example.
 */
export const FullScreenHero: Story = {
  args: {
    heroTitle: 'Welcome to Trinity',
    heroSubtitle: 'Your complete platform for life sciences innovation. Powered by AI, designed for impact.',
    backgroundImage: brandGradients.light[0],
    features: sampleFeatures,
    columns: 3,
    heroHeight: 'fullscreen',
  },
};

/**
 * Six column layout for many features.
 */
export const SixColumnLayout: Story = {
  args: {
    heroTitle: 'Our Capabilities',
    heroSubtitle: 'Comprehensive solutions across the life sciences value chain.',
    backgroundImage: brandGradients.light[2],
    features: [
      { id: '1', icon: gradientIcons.strategy, title: 'Strategy', description: 'Market positioning and growth strategies.', variant: 'navy' as const },
      { id: '2', icon: gradientIcons.marketResearch, title: 'Research', description: 'Primary and secondary research.', variant: 'white' as const },
      { id: '3', icon: gradientIcons.insights, title: 'Insights', description: 'Data-driven decision support.', variant: 'navy' as const },
      { id: '4', icon: gradientIcons.medical, title: 'Medical', description: 'Medical affairs excellence.', variant: 'white' as const },
      { id: '5', icon: gradientIcons.launch, title: 'Launch', description: 'Go-to-market execution.', variant: 'navy' as const },
      { id: '6', icon: gradientIcons.perf, title: 'Performance', description: 'Tracking and optimization.', variant: 'white' as const },
    ],
    columns: 6,
    heroHeight: 350,
  },
};

/**
 * Code example for engineers.
 */
export const CodeExample: StoryObj = {
  render: () => (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Implementation Guide
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic Usage
        </Typography>
        <Box
          component="pre"
          sx={{
            p: 2,
            borderRadius: 1,
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            overflow: 'auto',
            fontSize: 13,
          }}
        >
          {`import { LandingPage } from '@trinity/design-system';
import { gradientIcons, brandGradients } from '@trinity/design-system/assets';

function MyLandingPage() {
  const features = [
    {
      id: 'feature-1',
      icon: gradientIcons.ai,
      title: 'AI Research Platform',
      description: 'Get insights in seconds.',
      variant: 'navy', // or 'white'
      onClick: () => navigate('/research'),
    },
    {
      id: 'feature-2',
      icon: gradientIcons.perf,
      title: 'Automation Studio',
      description: 'Automate tedious tasks.',
      variant: 'navy',
      onClick: () => navigate('/automation'),
    },
  ];

  return (
    <LandingPage
      heroTitle="AI for Life Sciences"
      heroSubtitle="Transform your workflows with AI."
      backgroundImage={brandGradients.light[0]}
      features={features}
      columns={3}
    />
  );
}`}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          With Navigation
        </Typography>
        <Box
          component="pre"
          sx={{
            p: 2,
            borderRadius: 1,
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            overflow: 'auto',
            fontSize: 13,
          }}
        >
          {`import { LandingPage, TopNavHeader } from '@trinity/design-system';

<LandingPage
  heroTitle="AI Innovation Hub"
  backgroundImage={brandGradients.light[0]}
  features={features}
  heroExtendsUnderNav={true}
  navHeight={64}
  header={
    <TopNavHeader
      appTitle="AI Innovation Hub"
      // ... other props
    />
  }
/>`}
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Available Props
        </Typography>
        <Box
          component="table"
          sx={{
            width: '100%',
            borderCollapse: 'collapse',
            '& th, & td': {
              border: '1px solid #ddd',
              p: 1.5,
              textAlign: 'left',
            },
            '& th': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>heroTitle</code></td>
              <td>string</td>
              <td>required</td>
              <td>Main hero title</td>
            </tr>
            <tr>
              <td><code>heroSubtitle</code></td>
              <td>string</td>
              <td>—</td>
              <td>Hero subtitle text</td>
            </tr>
            <tr>
              <td><code>backgroundImage</code></td>
              <td>string</td>
              <td>—</td>
              <td>Background image URL</td>
            </tr>
            <tr>
              <td><code>features</code></td>
              <td>LandingPageFeature[]</td>
              <td>required</td>
              <td>Array of feature cards</td>
            </tr>
            <tr>
              <td><code>columns</code></td>
              <td>1 | 2 | 3 | 4</td>
              <td>3</td>
              <td>Grid columns</td>
            </tr>
            <tr>
              <td><code>heroHeight</code></td>
              <td>number | string</td>
              <td>400</td>
              <td>Hero section height</td>
            </tr>
          </tbody>
        </Box>
      </Box>
    </Container>
  ),
};
