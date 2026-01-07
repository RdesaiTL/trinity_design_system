import React from 'react';
import { Box, Typography, Button, Link, Stack, SxProps, Theme } from '@mui/material';
import { brandColors } from '../tokens';

// ============================================
// ILLUSTRATION STATUS COLORS
// ============================================

/**
 * Status colors for SVG illustrations.
 * @intentional-color: These colors are intentionally different from semantic UI tokens
 * to provide optimal visual clarity in illustration contexts.
 * They follow industry-standard status color conventions (Tailwind palette).
 * 
 * Do not normalize to semanticTokens.colors.status unless
 * approved as a visual redesign.
 */
/* eslint-disable no-restricted-syntax */
const illustrationStatusColors = {
  // Error/danger - Tailwind red-500
  error: {
    main: '#EF4444',
    light: '#FEE2E2',
  },
  // Warning/caution - Tailwind amber-500
  warning: {
    main: '#F59E0B',
    light: '#FEF3C7',
  },
  // Success/positive - Tailwind emerald-500
  success: {
    main: '#10B981',
    light: '#D1FAE5',
  },
  // Accent/highlight - Yellow for flames/sparks
  accent: {
    flame: '#FFD93D',
  },
} as const;
/* eslint-enable no-restricted-syntax */

// ============================================
// ILLUSTRATED MESSAGE TYPES
// ============================================

export type IllustrationType = 
  | 'empty-table'
  | 'empty-drafts'
  | 'getting-started'
  | 'empty-documents'
  | 'empty-insights'
  | 'no-results'
  | 'error-generic'
  | 'error-404'
  | 'error-500'
  | 'error-permission'
  | 'upload'
  | 'success'
  | 'no-notifications'
  | 'no-data'
  | 'offline';

export type IllustratedMessageSize = 'small' | 'medium' | 'large';

export interface IllustratedMessageProps {
  /** Type of illustration to display */
  illustration: IllustrationType;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Primary action button */
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  /** Secondary action link */
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  /** Size of the component */
  size?: IllustratedMessageSize;
  /** Custom illustration component (overrides illustration prop) */
  customIllustration?: React.ReactNode;
  /** Additional styles */
  sx?: SxProps<Theme>;
}

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig = {
  small: {
    illustrationSize: 120,
    titleVariant: 'subtitle1' as const,
    descriptionVariant: 'body2' as const,
    spacing: 2,
    padding: 3,
  },
  medium: {
    illustrationSize: 180,
    titleVariant: 'h6' as const,
    descriptionVariant: 'body1' as const,
    spacing: 3,
    padding: 4,
  },
  large: {
    illustrationSize: 240,
    titleVariant: 'h5' as const,
    descriptionVariant: 'body1' as const,
    spacing: 4,
    padding: 6,
  },
};

// ============================================
// SVG ILLUSTRATIONS
// ============================================

interface IllustrationProps {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

// Empty Table Illustration
const EmptyTableIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
  accentColor: _accentColor = brandColors.secondary.main,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Table base */}
    <rect x="20" y="60" width="160" height="100" rx="8" fill={secondaryColor} />
    {/* Header row */}
    <rect x="20" y="60" width="160" height="24" rx="8" fill={primaryColor} opacity="0.2" />
    {/* Rows */}
    <rect x="30" y="94" width="60" height="8" rx="4" fill={secondaryColor} opacity="0.8" />
    <rect x="100" y="94" width="70" height="8" rx="4" fill={secondaryColor} opacity="0.6" />
    <rect x="30" y="114" width="50" height="8" rx="4" fill={secondaryColor} opacity="0.8" />
    <rect x="100" y="114" width="50" height="8" rx="4" fill={secondaryColor} opacity="0.6" />
    <rect x="30" y="134" width="70" height="8" rx="4" fill={secondaryColor} opacity="0.8" />
    <rect x="100" y="134" width="60" height="8" rx="4" fill={secondaryColor} opacity="0.6" />
    {/* Empty indicator circle */}
    <circle cx="100" cy="115" r="35" fill="white" stroke={primaryColor} strokeWidth="3" strokeDasharray="6 4" />
    <text x="100" y="122" textAnchor="middle" fill={primaryColor} fontSize="32" fontWeight="300">?</text>
  </svg>
);

// Empty Drafts Illustration
const EmptyDraftsIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
  accentColor = brandColors.secondary.main,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Papers stack */}
    <rect x="50" y="50" width="100" height="120" rx="6" fill={secondaryColor} transform="rotate(-5 50 50)" />
    <rect x="55" y="45" width="100" height="120" rx="6" fill="white" stroke={secondaryColor} strokeWidth="2" />
    {/* Lines on paper */}
    <rect x="70" y="65" width="60" height="6" rx="3" fill={secondaryColor} />
    <rect x="70" y="80" width="70" height="6" rx="3" fill={secondaryColor} opacity="0.6" />
    <rect x="70" y="95" width="50" height="6" rx="3" fill={secondaryColor} opacity="0.4" />
    {/* Pencil */}
    <g transform="translate(120, 100) rotate(45)">
      <rect x="0" y="0" width="50" height="10" fill={accentColor} />
      <polygon points="50,0 60,5 50,10" fill={accentColor} opacity="0.7" />
      <rect x="-5" y="2" width="5" height="6" fill={primaryColor} />
    </g>
  </svg>
);

// Getting Started Illustration
const GettingStartedIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor: _secondaryColor = brandColors.neutral.gray100,
  accentColor = brandColors.secondary.main,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Rocket body */}
    <ellipse cx="100" cy="100" rx="30" ry="50" fill={primaryColor} />
    {/* Window */}
    <circle cx="100" cy="85" r="12" fill="white" />
    <circle cx="100" cy="85" r="8" fill={accentColor} opacity="0.3" />
    {/* Fins */}
    <path d="M70 120 L50 150 L70 140 Z" fill={accentColor} />
    <path d="M130 120 L150 150 L130 140 Z" fill={accentColor} />
    {/* Flame */}
    <ellipse cx="100" cy="160" rx="15" ry="25" fill={accentColor} opacity="0.8" />
    <ellipse cx="100" cy="155" rx="10" ry="18" fill={illustrationStatusColors.accent.flame} />
    <ellipse cx="100" cy="150" rx="5" ry="10" fill="white" />
    {/* Stars */}
    <circle cx="40" cy="50" r="3" fill={primaryColor} opacity="0.5" />
    <circle cx="160" cy="40" r="2" fill={primaryColor} opacity="0.5" />
    <circle cx="30" cy="120" r="2" fill={accentColor} opacity="0.5" />
    <circle cx="170" cy="100" r="3" fill={accentColor} opacity="0.5" />
  </svg>
);

// Empty Documents Illustration
const EmptyDocumentsIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Folder */}
    <path d="M30 70 L30 160 L170 160 L170 70 L100 70 L90 55 L30 55 Z" fill={secondaryColor} />
    <path d="M30 70 L170 70 L170 160 L30 160 Z" fill="white" stroke={secondaryColor} strokeWidth="2" />
    {/* Document inside */}
    <rect x="60" y="85" width="50" height="60" rx="4" fill="white" stroke={primaryColor} strokeWidth="2" />
    <rect x="70" y="95" width="30" height="4" rx="2" fill={secondaryColor} />
    <rect x="70" y="105" width="25" height="4" rx="2" fill={secondaryColor} opacity="0.6" />
    <rect x="70" y="115" width="30" height="4" rx="2" fill={secondaryColor} opacity="0.4" />
    {/* Plus icon */}
    <circle cx="140" cy="130" r="20" fill={primaryColor} />
    <rect x="132" y="127" width="16" height="6" rx="3" fill="white" />
    <rect x="137" y="122" width="6" height="16" rx="3" fill="white" />
  </svg>
);

// Empty Insights Illustration
const EmptyInsightsIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
  accentColor = brandColors.secondary.main,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Chart background */}
    <rect x="30" y="40" width="140" height="120" rx="8" fill="white" stroke={secondaryColor} strokeWidth="2" />
    {/* Grid lines */}
    <line x1="30" y1="80" x2="170" y2="80" stroke={secondaryColor} strokeWidth="1" strokeDasharray="4" />
    <line x1="30" y1="120" x2="170" y2="120" stroke={secondaryColor} strokeWidth="1" strokeDasharray="4" />
    {/* Bars placeholder */}
    <rect x="50" y="100" width="20" height="50" rx="4" fill={secondaryColor} opacity="0.5" />
    <rect x="90" y="80" width="20" height="70" rx="4" fill={secondaryColor} opacity="0.5" />
    <rect x="130" y="90" width="20" height="60" rx="4" fill={secondaryColor} opacity="0.5" />
    {/* Lightbulb */}
    <circle cx="160" cy="60" r="25" fill={accentColor} opacity="0.2" />
    <path d="M160 45 L160 55 M148 52 L155 58 M172 52 L165 58" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
    <circle cx="160" cy="65" r="10" fill={accentColor} />
    <rect x="155" y="75" width="10" height="8" rx="2" fill={primaryColor} />
  </svg>
);

// No Results Illustration
const NoResultsIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Magnifying glass */}
    <circle cx="85" cy="85" r="45" fill="white" stroke={primaryColor} strokeWidth="4" />
    <line x1="118" y1="118" x2="160" y2="160" stroke={primaryColor} strokeWidth="8" strokeLinecap="round" />
    {/* X inside */}
    <line x1="65" y1="65" x2="105" y2="105" stroke={secondaryColor} strokeWidth="6" strokeLinecap="round" />
    <line x1="105" y1="65" x2="65" y2="105" stroke={secondaryColor} strokeWidth="6" strokeLinecap="round" />
    {/* Question marks */}
    <text x="155" y="50" fill={secondaryColor} fontSize="20" fontWeight="bold">?</text>
    <text x="40" y="160" fill={secondaryColor} fontSize="16" fontWeight="bold">?</text>
  </svg>
);

// Error Generic Illustration
const ErrorGenericIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor: _primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Warning triangle */}
    <path d="M100 30 L170 150 L30 150 Z" fill={illustrationStatusColors.warning.light} stroke={illustrationStatusColors.warning.main} strokeWidth="3" />
    {/* Exclamation mark */}
    <rect x="94" y="70" width="12" height="45" rx="6" fill={illustrationStatusColors.warning.main} />
    <circle cx="100" cy="130" r="7" fill={illustrationStatusColors.warning.main} />
    {/* Decorative elements */}
    <circle cx="30" cy="60" r="8" fill={secondaryColor} opacity="0.5" />
    <circle cx="170" cy="80" r="6" fill={secondaryColor} opacity="0.5" />
    <rect x="160" y="130" width="20" height="4" rx="2" fill={secondaryColor} opacity="0.3" />
    <rect x="20" y="120" width="15" height="4" rx="2" fill={secondaryColor} opacity="0.3" />
  </svg>
);

// Error 404 Illustration
const Error404Illustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
  accentColor = brandColors.secondary.main,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 404 text */}
    <text x="100" y="100" textAnchor="middle" fill={primaryColor} fontSize="48" fontWeight="bold">404</text>
    {/* Broken link */}
    <path d="M60 130 Q40 130 40 150 Q40 170 60 170" stroke={secondaryColor} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M140 130 Q160 130 160 150 Q160 170 140 170" stroke={secondaryColor} strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Break indicator */}
    <line x1="85" y1="150" x2="95" y2="140" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
    <line x1="105" y1="160" x2="115" y2="150" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
    {/* Confused face elements */}
    <circle cx="75" cy="60" r="5" fill={primaryColor} />
    <circle cx="125" cy="60" r="5" fill={primaryColor} />
    <path d="M80 75 Q100 65 120 75" stroke={primaryColor} strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

// Error 500 Illustration
const Error500Illustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor: _primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
  accentColor = brandColors.secondary.main,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Server */}
    <rect x="60" y="40" width="80" height="120" rx="8" fill={secondaryColor} />
    <rect x="70" y="50" width="60" height="25" rx="4" fill="white" />
    <rect x="70" y="85" width="60" height="25" rx="4" fill="white" />
    <rect x="70" y="120" width="60" height="25" rx="4" fill="white" />
    {/* LEDs */}
    <circle cx="80" cy="62" r="4" fill={illustrationStatusColors.error.main} />
    <circle cx="92" cy="62" r="4" fill={illustrationStatusColors.error.main} />
    <circle cx="80" cy="97" r="4" fill={illustrationStatusColors.error.main} />
    <circle cx="92" cy="97" r="4" fill={accentColor} opacity="0.5" />
    <circle cx="80" cy="132" r="4" fill={accentColor} opacity="0.5" />
    <circle cx="92" cy="132" r="4" fill={accentColor} opacity="0.5" />
    {/* Lightning bolt */}
    <path d="M150 50 L135 90 L150 90 L130 130 L155 80 L140 80 Z" fill={accentColor} />
    {/* X marks */}
    <g transform="translate(40, 70)">
      <line x1="0" y1="0" x2="15" y2="15" stroke={illustrationStatusColors.error.main} strokeWidth="3" strokeLinecap="round" />
      <line x1="15" y1="0" x2="0" y2="15" stroke={illustrationStatusColors.error.main} strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

// Error Permission Illustration
const ErrorPermissionIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor: _secondaryColor = brandColors.neutral.gray100,
  accentColor = brandColors.secondary.main,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Lock body */}
    <rect x="60" y="90" width="80" height="70" rx="10" fill={primaryColor} />
    {/* Lock shackle */}
    <path d="M75 90 L75 60 Q75 40 100 40 Q125 40 125 60 L125 90" stroke={primaryColor} strokeWidth="10" fill="none" strokeLinecap="round" />
    {/* Keyhole */}
    <circle cx="100" cy="115" r="12" fill="white" />
    <rect x="95" y="115" width="10" height="20" rx="3" fill="white" />
    {/* Shield behind */}
    <path d="M100 25 L140 45 L140 85 Q140 115 100 135 Q60 115 60 85 L60 45 Z" fill={accentColor} opacity="0.15" />
    {/* Stop hand */}
    <circle cx="155" cy="65" r="20" fill={illustrationStatusColors.error.light} stroke={illustrationStatusColors.error.main} strokeWidth="2" />
    <rect x="147" y="55" width="16" height="20" rx="4" fill={illustrationStatusColors.error.main} />
  </svg>
);

// Upload Illustration
const UploadIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
  accentColor = brandColors.secondary.main,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cloud */}
    <ellipse cx="100" cy="80" rx="60" ry="40" fill={secondaryColor} />
    <ellipse cx="60" cy="95" rx="35" ry="25" fill={secondaryColor} />
    <ellipse cx="140" cy="95" rx="35" ry="25" fill={secondaryColor} />
    <ellipse cx="100" cy="100" rx="50" ry="30" fill={secondaryColor} />
    {/* Upload arrow */}
    <rect x="92" y="110" width="16" height="50" rx="4" fill={primaryColor} />
    <polygon points="100,85 75,120 125,120" fill={primaryColor} />
    {/* Dashed border box */}
    <rect x="30" y="140" width="140" height="50" rx="8" fill="white" stroke={accentColor} strokeWidth="2" strokeDasharray="8 4" />
    {/* File icon */}
    <rect x="85" y="150" width="30" height="35" rx="4" fill="white" stroke={primaryColor} strokeWidth="2" />
    <path d="M100 150 L115 150 L115 165 L100 165 L100 150 Z" fill={primaryColor} opacity="0.2" />
  </svg>
);

// Success Illustration
const SuccessIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor: _secondaryColor = brandColors.neutral.gray100,
  accentColor = brandColors.secondary.main,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Circle background */}
    <circle cx="100" cy="100" r="70" fill={illustrationStatusColors.success.light} />
    <circle cx="100" cy="100" r="55" fill={illustrationStatusColors.success.main} />
    {/* Checkmark */}
    <path d="M65 100 L90 125 L135 75" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Sparkles */}
    <circle cx="40" cy="50" r="6" fill={accentColor} opacity="0.6" />
    <circle cx="160" cy="60" r="4" fill={accentColor} opacity="0.6" />
    <circle cx="170" cy="130" r="5" fill={primaryColor} opacity="0.4" />
    <circle cx="30" cy="140" r="4" fill={primaryColor} opacity="0.4" />
    <path d="M45 170 L50 180 L55 170 L60 180" stroke={accentColor} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <path d="M140 170 L145 180 L150 170 L155 180" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// No Notifications Illustration
const NoNotificationsIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bell */}
    <path d="M100 40 Q130 40 140 80 L145 120 L55 120 L60 80 Q70 40 100 40 Z" fill={secondaryColor} />
    <ellipse cx="100" cy="120" rx="50" ry="12" fill={secondaryColor} />
    <circle cx="100" cy="145" r="12" fill={secondaryColor} />
    {/* Bell details */}
    <path d="M100 40 L100 25" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
    {/* Z's for sleeping */}
    <text x="145" y="60" fill={primaryColor} fontSize="20" fontWeight="bold" opacity="0.6">Z</text>
    <text x="155" y="45" fill={primaryColor} fontSize="16" fontWeight="bold" opacity="0.4">z</text>
    <text x="165" y="35" fill={primaryColor} fontSize="12" fontWeight="bold" opacity="0.2">z</text>
  </svg>
);

// No Data Illustration
const NoDataIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Database cylinder */}
    <ellipse cx="100" cy="60" rx="50" ry="20" fill={secondaryColor} />
    <rect x="50" y="60" width="100" height="80" fill={secondaryColor} />
    <ellipse cx="100" cy="140" rx="50" ry="20" fill={secondaryColor} />
    {/* Inner ellipses */}
    <ellipse cx="100" cy="60" rx="50" ry="20" fill="white" stroke={primaryColor} strokeWidth="2" />
    <ellipse cx="100" cy="140" rx="50" ry="20" fill="white" stroke={primaryColor} strokeWidth="2" />
    <line x1="50" y1="60" x2="50" y2="140" stroke={primaryColor} strokeWidth="2" />
    <line x1="150" y1="60" x2="150" y2="140" stroke={primaryColor} strokeWidth="2" />
    {/* Empty indicator */}
    <circle cx="100" cy="100" r="25" fill="white" stroke={primaryColor} strokeWidth="2" strokeDasharray="5 3" />
    <text x="100" y="108" textAnchor="middle" fill={primaryColor} fontSize="24" fontWeight="300">0</text>
  </svg>
);

// Offline Illustration
const OfflineIllustration: React.FC<IllustrationProps> = ({ 
  size = 180, 
  primaryColor: _primaryColor = brandColors.primary.main,
  secondaryColor = brandColors.neutral.gray100,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cloud with X */}
    <ellipse cx="100" cy="80" rx="55" ry="35" fill={secondaryColor} />
    <ellipse cx="60" cy="95" rx="30" ry="22" fill={secondaryColor} />
    <ellipse cx="140" cy="95" rx="30" ry="22" fill={secondaryColor} />
    <ellipse cx="100" cy="100" rx="45" ry="25" fill={secondaryColor} />
    {/* X mark */}
    <line x1="75" y1="70" x2="125" y2="110" stroke={illustrationStatusColors.error.main} strokeWidth="8" strokeLinecap="round" />
    <line x1="125" y1="70" x2="75" y2="110" stroke={illustrationStatusColors.error.main} strokeWidth="8" strokeLinecap="round" />
    {/* Signal waves */}
    <path d="M45 140 Q45 160 65 160" stroke={secondaryColor} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M35 145 Q35 170 65 170" stroke={secondaryColor} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
    <path d="M155 140 Q155 160 135 160" stroke={secondaryColor} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M165 145 Q165 170 135 170" stroke={secondaryColor} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// ============================================
// ILLUSTRATION COMPONENT MAP
// ============================================

const illustrationComponents: Record<IllustrationType, React.FC<IllustrationProps>> = {
  'empty-table': EmptyTableIllustration,
  'empty-drafts': EmptyDraftsIllustration,
  'getting-started': GettingStartedIllustration,
  'empty-documents': EmptyDocumentsIllustration,
  'empty-insights': EmptyInsightsIllustration,
  'no-results': NoResultsIllustration,
  'error-generic': ErrorGenericIllustration,
  'error-404': Error404Illustration,
  'error-500': Error500Illustration,
  'error-permission': ErrorPermissionIllustration,
  'upload': UploadIllustration,
  'success': SuccessIllustration,
  'no-notifications': NoNotificationsIllustration,
  'no-data': NoDataIllustration,
  'offline': OfflineIllustration,
};

// ============================================
// ILLUSTRATED MESSAGE COMPONENT
// ============================================

export const IllustratedMessage: React.FC<IllustratedMessageProps> = ({
  illustration,
  title,
  description,
  primaryAction,
  secondaryAction,
  size = 'medium',
  customIllustration,
  sx,
}) => {
  const config = sizeConfig[size];
  const IllustrationComponent = illustrationComponents[illustration];

  return (
    <Box
      sx={{
        textAlign: 'center',
        p: config.padding,
        maxWidth: size === 'small' ? 300 : size === 'large' ? 500 : 400,
        mx: 'auto',
        ...sx,
      }}
    >
      {/* Illustration */}
      <Box
        sx={{
          mb: config.spacing,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        role="img"
        aria-hidden="true"
      >
        {customIllustration || (
          <IllustrationComponent size={config.illustrationSize} />
        )}
      </Box>

      {/* Title */}
      <Typography
        variant={config.titleVariant}
        sx={{ mb: 1, fontWeight: 600 }}
      >
        {title}
      </Typography>

      {/* Description */}
      {description && (
        <Typography
          variant={config.descriptionVariant}
          color="text.secondary"
          sx={{ mb: config.spacing }}
        >
          {description}
        </Typography>
      )}

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <Stack
          spacing={1.5}
          alignItems="center"
          sx={{ mt: config.spacing }}
        >
          {primaryAction && (
            primaryAction.href ? (
              <Button
                variant="contained"
                href={primaryAction.href}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Link
                href={secondaryAction.href}
                onClick={secondaryAction.onClick}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                {secondaryAction.label}
              </Link>
            ) : (
              <Link
                component="button"
                onClick={secondaryAction.onClick}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                {secondaryAction.label}
              </Link>
            )
          )}
        </Stack>
      )}
    </Box>
  );
};

// ============================================
// UPLOAD DROP ZONE COMPONENT
// ============================================

export interface UploadDropZoneProps {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Accepted file types */
  acceptedTypes?: string;
  /** Max file size text */
  maxSize?: string;
  /** Browse button label */
  browseLabel?: string;
  /** On file drop handler */
  onDrop?: (files: FileList) => void;
  /** On browse click handler */
  onBrowse?: () => void;
  /** Is dragging state */
  isDragging?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Custom styles */
  sx?: SxProps<Theme>;
}

export const UploadDropZone: React.FC<UploadDropZoneProps> = ({
  title = 'Drag and drop your file',
  description = 'or click to browse from your computer',
  acceptedTypes = 'PNG, JPG, PDF up to 10MB',
  browseLabel = 'Browse Files',
  onDrop,
  onBrowse,
  isDragging = false,
  size = 'medium',
  sx,
}) => {
  const [dragActive, setDragActive] = React.useState(isDragging);
  const config = sizeConfig[size];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDrop?.(e.dataTransfer.files);
    }
  };

  return (
    <Box
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      sx={{
        p: config.padding,
        border: '2px dashed',
        borderColor: dragActive ? 'primary.main' : 'grey.300',
        borderRadius: 3, // 12px - consistent with cards
        bgcolor: dragActive ? 'primary.50' : 'grey.50',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'primary.50',
        },
        ...sx,
      }}
      onClick={onBrowse}
    >
      <Box sx={{ mb: 2 }}>
        <UploadIllustration size={config.illustrationSize * 0.7} />
      </Box>

      <Typography variant={config.titleVariant} sx={{ mb: 0.5, fontWeight: 600 }}>
        {title}
      </Typography>

      <Typography variant={config.descriptionVariant} color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>

      <Button variant="outlined" size={size === 'small' ? 'small' : 'medium'}>
        {browseLabel}
      </Button>

      {acceptedTypes && (
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
          {acceptedTypes}
        </Typography>
      )}
    </Box>
  );
};

// Export individual illustrations for custom use
export {
  EmptyTableIllustration,
  EmptyDraftsIllustration,
  GettingStartedIllustration,
  EmptyDocumentsIllustration,
  EmptyInsightsIllustration,
  NoResultsIllustration,
  ErrorGenericIllustration,
  Error404Illustration,
  Error500Illustration,
  ErrorPermissionIllustration,
  UploadIllustration,
  SuccessIllustration,
  NoNotificationsIllustration,
  NoDataIllustration,
  OfflineIllustration,
};

export default IllustratedMessage;
