/**
 * Icon Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Icon,
  IconProvider,
  useIconLibrary,
  getAvailableIcons,
  hasIcon,
  getIconName,
  iconSizeMap,
} from '../Icon';

// Test helper component for hook testing
const TestIconLibraryConsumer = () => {
  const { library, setLibrary } = useIconLibrary();
  return (
    <div>
      <span data-testid="library">{library}</span>
      <button onClick={() => setLibrary('feather')}>Switch to Feather</button>
    </div>
  );
};

describe('Icon', () => {
  // ============================================================================
  // BASIC RENDERING
  // ============================================================================

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<Icon name="home" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with different icon names', () => {
      const { rerender, container } = render(<Icon name="home" />);
      expect(container.firstChild).toBeInTheDocument();
      
      rerender(<Icon name="settings" />);
      expect(container.firstChild).toBeInTheDocument();
      
      rerender(<Icon name="user" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders unknown icon as null (no fallback)', () => {
      const { container } = render(<Icon name="unknown-icon-xyz" />);
      // Unknown icons return null, no fallback
      expect(container.firstChild).toBeNull();
    });
  });

  // ============================================================================
  // SIZE VARIANTS
  // ============================================================================

  describe('Size Variants', () => {
    it('renders with xs size', () => {
      const { container } = render(<Icon name="home" size="xs" />);
      // MUI Icons use fontSize in sx prop, we check the container exists
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with small size', () => {
      const { container } = render(<Icon name="home" size="small" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with medium size (default)', () => {
      const { container } = render(<Icon name="home" size="medium" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with large size', () => {
      const { container } = render(<Icon name="home" size="large" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ============================================================================
  // LIBRARY SWITCHING
  // ============================================================================

  describe('Library Switching', () => {
    it('uses material library by default', () => {
      const { container } = render(<Icon name="home" />);
      // Material icons render with MUI components
      expect(container.firstChild).toBeInTheDocument();
    });

    it('can override library per icon', () => {
      const { container } = render(<Icon name="home" library="feather" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('returns null for unknown material icons', () => {
      const { container } = render(<Icon name="nonexistent" library="material" />);
      // Unknown icons return null
      expect(container.firstChild).toBeNull();
    });

    it('returns null for unknown feather icons', () => {
      const { container } = render(<Icon name="nonexistent" library="feather" />);
      // Unknown icons return null
      expect(container.firstChild).toBeNull();
    });
  });

  // ============================================================================
  // COLOR VARIANTS
  // ============================================================================

  describe('Color Variants', () => {
    it('renders with inherit color', () => {
      const { container } = render(<Icon name="home" color="inherit" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with primary color', () => {
      const { container } = render(<Icon name="home" color="primary" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with custom hex color', () => {
      const { container } = render(<Icon name="home" color="#FF0000" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ICON PROVIDER CONTEXT
  // ============================================================================

  describe('IconProvider', () => {
    it('provides default material library', () => {
      render(
        <IconProvider>
          <TestIconLibraryConsumer />
        </IconProvider>
      );
      expect(screen.getByTestId('library')).toHaveTextContent('material');
    });

    it('allows changing library through context', () => {
      render(
        <IconProvider>
          <TestIconLibraryConsumer />
        </IconProvider>
      );
      
      expect(screen.getByTestId('library')).toHaveTextContent('material');
      fireEvent.click(screen.getByText('Switch to Feather'));
      expect(screen.getByTestId('library')).toHaveTextContent('feather');
    });

    it('accepts initial library prop', () => {
      render(
        <IconProvider defaultLibrary="feather">
          <TestIconLibraryConsumer />
        </IconProvider>
      );
      expect(screen.getByTestId('library')).toHaveTextContent('feather');
    });
  });

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  describe('Utility Functions', () => {
    describe('getAvailableIcons', () => {
      it('returns array of available icon names', () => {
        const icons = getAvailableIcons();
        expect(Array.isArray(icons)).toBe(true);
        expect(icons.length).toBeGreaterThan(0);
        expect(icons).toContain('home');
        expect(icons).toContain('settings');
      });
    });

    describe('hasIcon', () => {
      it('returns true for existing icons', () => {
        expect(hasIcon('home')).toBe(true);
        expect(hasIcon('settings')).toBe(true);
      });

      it('returns false for non-existent icons', () => {
        expect(hasIcon('nonexistent-xyz-123')).toBe(false);
      });
    });

    describe('getIconName', () => {
      it('returns icon name for valid icons', () => {
        const result = getIconName('home', 'material');
        expect(result).toBe('home');
      });

      it('returns null for invalid icons', () => {
        const result = getIconName('invalid-icon-xyz', 'material');
        expect(result).toBe(null);
      });
    });

    describe('iconSizeMap', () => {
      it('contains all size variants', () => {
        expect(iconSizeMap).toHaveProperty('xs');
        expect(iconSizeMap).toHaveProperty('small');
        expect(iconSizeMap).toHaveProperty('medium');
        expect(iconSizeMap).toHaveProperty('large');
        expect(iconSizeMap).toHaveProperty('xl');
      });

      it('sizes are in ascending order', () => {
        expect(iconSizeMap.xs).toBeLessThan(iconSizeMap.small);
        expect(iconSizeMap.small).toBeLessThan(iconSizeMap.medium);
        expect(iconSizeMap.medium).toBeLessThan(iconSizeMap.large);
        expect(iconSizeMap.large).toBeLessThan(iconSizeMap.xl);
      });
    });
  });

  // ============================================================================
  // ACCESSIBILITY
  // ============================================================================

  describe('Accessibility', () => {
    it('has proper role for decorative icons', () => {
      const { container } = render(<Icon name="home" />);
      const svg = container.querySelector('svg');
      // MUI icons are decorative by default
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ============================================================================
  // CUSTOM STYLES
  // ============================================================================

  describe('Custom Styles', () => {
    it('applies custom sx prop', () => {
      const { container } = render(
        <Icon name="home" sx={{ marginRight: 2 }} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Icon name="home" className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });
});
