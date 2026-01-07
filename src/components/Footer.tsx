/**
 * @fileoverview Footer provides a consistent footer bar for Trinity applications.
 * It includes copyright information and navigation links.
 *
 * @example
 * ```tsx
 * import { Footer } from '@trinity/design-system';
 *
 * <Footer />
 * 
 * // With custom links
 * <Footer
 *   links={[
 *     { label: 'Privacy', href: 'https://example.com/privacy' },
 *     { label: 'Terms', href: 'https://example.com/terms' },
 *   ]}
 * />
 * ```
 *
 * @module components/Footer
 */

import * as React from 'react';
import {
  Box,
  Typography,
  Link,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { brandColors, semanticTokens } from '../tokens';

interface FooterLink {
  label: string;
  href: string;
  /** Opens in new tab if true (default: true for external links) */
  external?: boolean;
}

interface FooterProps {
  /** Company name displayed in copyright */
  companyName?: string;
  /** Custom links to display on the right side */
  links?: FooterLink[];
  /** Optional variant for light/dark backgrounds */
  variant?: 'light' | 'dark';
}

const defaultLinks: FooterLink[] = [
  {
    label: 'Privacy Policy',
    href: 'https://trinitylifesciences.com/website-privacy-policy/',
    external: true,
  },
  {
    label: 'About',
    href: 'https://trinitylifesciences.com/company/',
    external: true,
  },
  {
    label: 'Contact',
    href: 'https://trinitylifesciences.com/contact/',
    external: true,
  },
];

export default function Footer({
  companyName = 'Trinity LifeSciences',
  links = defaultLinks,
  variant = 'dark',
}: FooterProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Auto-update year
  const currentYear = new Date().getFullYear();

  const isDark = variant === 'dark';
  
  // Color scheme - uses background tertiary (light gray) with appropriate text
  const colors = {
    background: semanticTokens.colors.background.tertiary,
    text: semanticTokens.colors.text.primary,
    textSecondary: semanticTokens.colors.text.secondary,
    divider: semanticTokens.colors.border.default,
    linkHover: brandColors.primary.dark,
  };
  
  // Keep isDark reference for potential future use
  void isDark;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.background,
        borderTop: `1px solid ${colors.divider}`,
        px: { xs: 2, sm: 3 },
        py: { xs: 1.5, sm: 2 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 1.5 : 0,
        }}
      >
        {/* Left Side - Copyright */}
        <Typography
          variant="body2"
          sx={{
            color: colors.textSecondary,
            fontSize: semanticTokens.typography.body.small.fontSize, // 14px
            fontWeight: semanticTokens.typography.body.small.fontWeight, // 400
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          ©{currentYear} {companyName}. All rights reserved.
        </Typography>

        {/* Right Side - Links */}
        <Box
          component="nav"
          aria-label="Footer navigation"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-end',
          }}
        >
          {links.map((link, index) => (
            <React.Fragment key={link.label}>
              {index > 0 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    mx: { xs: 1, sm: 1.5 },
                    height: 14,
                    alignSelf: 'center',
                    backgroundColor: colors.divider,
                  }}
                />
              )}
              <Link
                href={link.href}
                target={link.external !== false ? '_blank' : undefined}
                rel={link.external !== false ? 'noopener noreferrer' : undefined}
                underline="none"
                sx={{
                  color: colors.textSecondary,
                  fontSize: semanticTokens.typography.body.small.fontSize, // 14px
                  fontWeight: semanticTokens.typography.body.small.fontWeight, // 400
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: colors.linkHover,
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${isDark ? brandColors.neutral.white : brandColors.primary.main}`,
                    outlineOffset: 2,
                    borderRadius: semanticTokens.borders.radiusPx.sm, // 6px
                  },
                }}
              >
                {link.label}
              </Link>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
