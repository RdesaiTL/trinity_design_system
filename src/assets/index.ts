/**
 * Trinity Design System - Asset Registry
 *
 * This module provides programmatic access to all Trinity brand assets
 * including gradient icons, background images, and brand gradients.
 *
 * @example
 * ```tsx
 * import { gradientIcons, backgroundImages, brandGradients } from '@trinity/design-system/assets';
 *
 * // Use a gradient icon
 * <img src={gradientIcons.ai} alt="AI Icon" />
 *
 * // Use a background image
 * <div style={{ backgroundImage: `url(${backgroundImages.smoothAbstract[0]})` }} />
 *
 * // Use a brand gradient
 * <div style={{ backgroundImage: `url(${brandGradients.light[0]})` }} />
 * ```
 */

// ============================================
// Gradient Icons
// ============================================

import benefitsIcon from './Gradient Icons/benifits-icon.svg';
import bigQuoteMarkIcon from './Gradient Icons/big-quote-mark-icon.svg';
import careersSmallerIcon from './Gradient Icons/careers-smaller-icon.svg';
import combinedIcon from './Gradient Icons/combined-icon.svg';
import cultureIcon from './Gradient Icons/culture-icon.svg';
import focusIcon from './Gradient Icons/focus-icon.svg';
import growthIcon from './Gradient Icons/growth-icon.svg';
import iconAi from './Gradient Icons/icon-ai.svg';
import iconBrandDev from './Gradient Icons/icon-brand-dev.svg';
import iconCommsInsights from './Gradient Icons/icon-comms-insights.svg';
import iconComms from './Gradient Icons/icon-comms.svg';
import iconCustEngagement from './Gradient Icons/icon-cust-engagement.svg';
import iconCustomer from './Gradient Icons/icon-customer.svg';
import iconInsights from './Gradient Icons/icon-insights.svg';
import iconIntelligence from './Gradient Icons/icon-intelligence.svg';
import iconLaunch1 from './Gradient Icons/icon-launch-1.svg';
import iconLaunch from './Gradient Icons/icon-launch.svg';
import iconLoss from './Gradient Icons/icon-loss.svg';
import iconMarketAccess from './Gradient Icons/icon-market-access.svg';
import iconMarketResearch from './Gradient Icons/icon-market-research.svg';
import iconMedical from './Gradient Icons/icon-medical.svg';
import iconPatientHcp from './Gradient Icons/icon-patient-hcp.svg';
import iconPerfTracking from './Gradient Icons/icon-perf-tracking.svg';
import iconPerf from './Gradient Icons/icon-perf.svg';
import iconPortfolio from './Gradient Icons/icon-portfolio.svg';
import iconPricing from './Gradient Icons/icon-pricing.svg';
import iconRealWorld from './Gradient Icons/icon-real-world.svg';
import iconStrategy from './Gradient Icons/icon-strategy.svg';
import impactSmallerIcon from './Gradient Icons/impact-smaller-icon.svg';
import inclusionSmallerIcon from './Gradient Icons/inclusion-smaller-icon.svg';
import leadershipSmallerIcon from './Gradient Icons/leadership-smaller-icon.svg';
import mindsetIcon from './Gradient Icons/mindset-icon.svg';
import puzzleIcon from './Gradient Icons/puzzle-icon.svg';
import rightThingIcon from './Gradient Icons/right-thing-icon.svg';
import supportiveIcon from './Gradient Icons/supportive-icon.svg';
import togetherIcon from './Gradient Icons/together-icon.svg';
import voicesIcon from './Gradient Icons/voices-icon.svg';

export const gradientIcons = {
  benefits: benefitsIcon,
  bigQuoteMark: bigQuoteMarkIcon,
  careersSmaller: careersSmallerIcon,
  combined: combinedIcon,
  culture: cultureIcon,
  focus: focusIcon,
  growth: growthIcon,
  ai: iconAi,
  brandDev: iconBrandDev,
  commsInsights: iconCommsInsights,
  comms: iconComms,
  custEngagement: iconCustEngagement,
  customer: iconCustomer,
  insights: iconInsights,
  intelligence: iconIntelligence,
  launch1: iconLaunch1,
  launch: iconLaunch,
  loss: iconLoss,
  marketAccess: iconMarketAccess,
  marketResearch: iconMarketResearch,
  medical: iconMedical,
  patientHcp: iconPatientHcp,
  perfTracking: iconPerfTracking,
  perf: iconPerf,
  portfolio: iconPortfolio,
  pricing: iconPricing,
  realWorld: iconRealWorld,
  strategy: iconStrategy,
  impactSmaller: impactSmallerIcon,
  inclusionSmaller: inclusionSmallerIcon,
  leadershipSmaller: leadershipSmallerIcon,
  mindset: mindsetIcon,
  puzzle: puzzleIcon,
  rightThing: rightThingIcon,
  supportive: supportiveIcon,
  together: togetherIcon,
  voices: voicesIcon,
} as const;

export type GradientIconName = keyof typeof gradientIcons;

/** Gradient icon metadata for documentation */
export const gradientIconMeta: Record<GradientIconName, { label: string; category: string }> = {
  benefits: { label: 'Benefits', category: 'Corporate' },
  bigQuoteMark: { label: 'Quote Mark', category: 'Decorative' },
  careersSmaller: { label: 'Careers', category: 'Corporate' },
  combined: { label: 'Combined', category: 'General' },
  culture: { label: 'Culture', category: 'Corporate' },
  focus: { label: 'Focus', category: 'Values' },
  growth: { label: 'Growth', category: 'Values' },
  ai: { label: 'AI', category: 'Technology' },
  brandDev: { label: 'Brand Development', category: 'Business' },
  commsInsights: { label: 'Communications Insights', category: 'Business' },
  comms: { label: 'Communications', category: 'Business' },
  custEngagement: { label: 'Customer Engagement', category: 'Business' },
  customer: { label: 'Customer', category: 'Business' },
  insights: { label: 'Insights', category: 'Business' },
  intelligence: { label: 'Intelligence', category: 'Technology' },
  launch1: { label: 'Launch Alt', category: 'Business' },
  launch: { label: 'Launch', category: 'Business' },
  loss: { label: 'Loss', category: 'Business' },
  marketAccess: { label: 'Market Access', category: 'Business' },
  marketResearch: { label: 'Market Research', category: 'Business' },
  medical: { label: 'Medical', category: 'Healthcare' },
  patientHcp: { label: 'Patient HCP', category: 'Healthcare' },
  perfTracking: { label: 'Performance Tracking', category: 'Business' },
  perf: { label: 'Performance', category: 'Business' },
  portfolio: { label: 'Portfolio', category: 'Business' },
  pricing: { label: 'Pricing', category: 'Business' },
  realWorld: { label: 'Real World', category: 'Business' },
  strategy: { label: 'Strategy', category: 'Business' },
  impactSmaller: { label: 'Impact', category: 'Values' },
  inclusionSmaller: { label: 'Inclusion', category: 'Values' },
  leadershipSmaller: { label: 'Leadership', category: 'Values' },
  mindset: { label: 'Mindset', category: 'Values' },
  puzzle: { label: 'Puzzle', category: 'Decorative' },
  rightThing: { label: 'Right Thing', category: 'Values' },
  supportive: { label: 'Supportive', category: 'Values' },
  together: { label: 'Together', category: 'Values' },
  voices: { label: 'Voices', category: 'Values' },
};

// ============================================
// Background Images - Smooth Abstract
// ============================================

import smoothAbstract1 from './Background Images/Smooth_Abstract/smooth_abstract1.jpg';
import smoothAbstract2 from './Background Images/Smooth_Abstract/smooth_abstract2.jpg';
import smoothAbstract3 from './Background Images/Smooth_Abstract/smooth_abstract3.png';
import smoothAbstract4 from './Background Images/Smooth_Abstract/smooth_abstract4.png';
import smoothAbstract5 from './Background Images/Smooth_Abstract/smooth_abstract5.jpg';
import smoothAbstract6 from './Background Images/Smooth_Abstract/smooth_abstract6.jpg';
import smoothAbstract7 from './Background Images/Smooth_Abstract/smooth_abstract7.png';
import smoothAbstract8 from './Background Images/Smooth_Abstract/smooth_abstract8.png';
import smoothAbstract9 from './Background Images/Smooth_Abstract/smooth_abstract9.jpg';
import smoothAbstract10 from './Background Images/Smooth_Abstract/smooth_abstract10.jpg';
import smoothAbstract11 from './Background Images/Smooth_Abstract/smooth_abstract11.png';
import smoothAbstract12 from './Background Images/Smooth_Abstract/smooth_abstract12.png';
import smoothAbstract13 from './Background Images/Smooth_Abstract/smooth_abstract13.jpg';
import smoothAbstract14 from './Background Images/Smooth_Abstract/smooth_abstract14.jpg';

// ============================================
// Background Images - Technology & Human
// ============================================

import bgTh1 from './Background Images/Technology&Human/bg_th1.jpg';
import bgTh2 from './Background Images/Technology&Human/bg_th2.jpg';
import bgTh3 from './Background Images/Technology&Human/bg_th3.jpg';
import bgTh4 from './Background Images/Technology&Human/bg_th4.png';
import bgTh5 from './Background Images/Technology&Human/bg_th5.jpg';
import bgTh6 from './Background Images/Technology&Human/bg_th6.png';
import bgTh7 from './Background Images/Technology&Human/bg_th7.jpg';
import bgTh8 from './Background Images/Technology&Human/bg_th8.jpg';
import bgTh9 from './Background Images/Technology&Human/bg_th9.jpg';
import bgTh10 from './Background Images/Technology&Human/bg_th10.jpg';
import bgTh11 from './Background Images/Technology&Human/bg_th11.jpg';
import bgTh12 from './Background Images/Technology&Human/bg_th12.jpg';
import bgTh13 from './Background Images/Technology&Human/bg_th13.jpg';

export const backgroundImages = {
  smoothAbstract: [
    smoothAbstract1,
    smoothAbstract2,
    smoothAbstract3,
    smoothAbstract4,
    smoothAbstract5,
    smoothAbstract6,
    smoothAbstract7,
    smoothAbstract8,
    smoothAbstract9,
    smoothAbstract10,
    smoothAbstract11,
    smoothAbstract12,
    smoothAbstract13,
    smoothAbstract14,
  ],
  technologyHuman: [
    bgTh1,
    bgTh2,
    bgTh3,
    bgTh4,
    bgTh5,
    bgTh6,
    bgTh7,
    bgTh8,
    bgTh9,
    bgTh10,
    bgTh11,
    bgTh12,
    bgTh13,
  ],
} as const;

export type BackgroundCategory = keyof typeof backgroundImages;

/** Background image metadata */
export const backgroundImageMeta = {
  smoothAbstract: {
    label: 'Smooth Abstract',
    description: 'Soft, flowing abstract backgrounds with gradient effects',
    count: 14,
  },
  technologyHuman: {
    label: 'Technology & Human',
    description: 'Backgrounds featuring technology and human elements',
    count: 13,
  },
} as const;

// ============================================
// Brand Gradients - Light
// ============================================

import lightGradient1 from './Brand Backgorund Gradients/LIGHT/light_brand_gradient1.png';
import lightGradient2 from './Brand Backgorund Gradients/LIGHT/light_brand_gradient2.png';
import lightGradient3 from './Brand Backgorund Gradients/LIGHT/light_brand_gradient3.png';
import lightGradient4 from './Brand Backgorund Gradients/LIGHT/light_brand_gradient4.png';
import lightGradient5 from './Brand Backgorund Gradients/LIGHT/light_brand_gradient5.png';
import lightGradient6 from './Brand Backgorund Gradients/LIGHT/light_brand_gradient6.png';
import lightGradient7 from './Brand Backgorund Gradients/LIGHT/light_brand_gradient7.png';
import lightGradient8 from './Brand Backgorund Gradients/LIGHT/light_brand_gradient8.png';
import lightGradient9 from './Brand Backgorund Gradients/LIGHT/light_brand_gradient9.png';
import lightGradient10 from './Brand Backgorund Gradients/LIGHT/light_brand_gradient10.png';

// ============================================
// Brand Gradients - Dark
// ============================================

import darkGradient1 from './Brand Backgorund Gradients/DARK/dark_brand_gradient1.png';
import darkGradient2 from './Brand Backgorund Gradients/DARK/dark_brand_gradient2.png';
import darkGradient3 from './Brand Backgorund Gradients/DARK/dark_brand_gradient3.png';
import darkGradient4 from './Brand Backgorund Gradients/DARK/dark_brand_gradient4.png';
import darkGradient5 from './Brand Backgorund Gradients/DARK/dark_brand_gradient5.png';
import darkGradient6 from './Brand Backgorund Gradients/DARK/dark_brand_gradient6.png';
import darkGradient7 from './Brand Backgorund Gradients/DARK/dark_brand_gradient7.png';
import darkGradient8 from './Brand Backgorund Gradients/DARK/dark_brand_gradient8.png';

export const brandGradients = {
  light: [
    lightGradient1,
    lightGradient2,
    lightGradient3,
    lightGradient4,
    lightGradient5,
    lightGradient6,
    lightGradient7,
    lightGradient8,
    lightGradient9,
    lightGradient10,
  ],
  dark: [
    darkGradient1,
    darkGradient2,
    darkGradient3,
    darkGradient4,
    darkGradient5,
    darkGradient6,
    darkGradient7,
    darkGradient8,
  ],
} as const;

export type GradientTheme = keyof typeof brandGradients;

/** Brand gradient metadata */
export const brandGradientMeta = {
  light: {
    label: 'Light Brand Gradients',
    description: 'Trinity brand gradients optimized for light mode interfaces',
    count: 10,
  },
  dark: {
    label: 'Dark Brand Gradients',
    description: 'Trinity brand gradients optimized for dark mode interfaces',
    count: 8,
  },
} as const;

// ============================================
// Utility Types & Helpers
// ============================================

/** Get all asset URLs for bulk download */
export const getAllAssetUrls = () => ({
  gradientIcons: Object.entries(gradientIcons).map(([name, url]) => ({
    name,
    url,
    filename: `gradient-icon-${name}.svg`,
  })),
  smoothAbstract: backgroundImages.smoothAbstract.map((url, i) => ({
    name: `smooth_abstract${i + 1}`,
    url,
    filename: `smooth-abstract-${i + 1}.${url.includes('.png') ? 'png' : 'jpg'}`,
  })),
  technologyHuman: backgroundImages.technologyHuman.map((url, i) => ({
    name: `bg_th${i + 1}`,
    url,
    filename: `technology-human-${i + 1}.${url.includes('.png') ? 'png' : 'jpg'}`,
  })),
  lightGradients: brandGradients.light.map((url, i) => ({
    name: `light_gradient${i + 1}`,
    url,
    filename: `light-brand-gradient-${i + 1}.png`,
  })),
  darkGradients: brandGradients.dark.map((url, i) => ({
    name: `dark_gradient${i + 1}`,
    url,
    filename: `dark-brand-gradient-${i + 1}.png`,
  })),
});

// Default export for convenience
export default {
  gradientIcons,
  gradientIconMeta,
  backgroundImages,
  backgroundImageMeta,
  brandGradients,
  brandGradientMeta,
  getAllAssetUrls,
};
