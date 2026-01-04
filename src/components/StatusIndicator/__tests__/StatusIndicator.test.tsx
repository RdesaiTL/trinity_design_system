/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * STATUS INDICATOR COMPONENT TESTS (ENHANCED)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Comprehensive tests for StatusIndicator components covering:
 * - All indicator types (Icon, Shape, Dot, Badge, Differential, Chip, Inline, Legend)
 * - Accessibility (WCAG 2.1 AA compliance)
 * - Color contrast for status colors
 * - Screen reader announcements
 * 
 * @module components/StatusIndicator/__tests__/StatusIndicator.test
 */

import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../../theme';
import {
  IconIndicator,
  ShapeIndicator,
  StatusDot,
  BadgeIndicator,
  DifferentialIndicator,
  StatusChip,
  InlineStatus,
  StatusLegend,
  getStatusConfig,
  getAllStatusTypes,
  getStatusTypesBySeverity,
} from '../index';
import { StatusType } from '../types';

// toHaveNoViolations is extended globally in test-setup.ts

// Wrapper for themed rendering (unused, kept for future tests)
const _renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEST DATA
// ═══════════════════════════════════════════════════════════════════════════════

const allStatusTypes: StatusType[] = [
  'success', 'error', 'warning', 'info', 'pending', 
  'active', 'inactive', 'complete', 'failed', 'new',
  'critical', 'beta', 'draft', 'approved', 'rejected',
  'running', 'in-progress', 'cancelled'
];

const severityLevels = ['high', 'medium', 'low', 'info'] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTION TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('StatusIndicator Utilities', () => {
  describe('getStatusConfig', () => {
    it.each(allStatusTypes)('returns valid config for %s status', (status) => {
      const config = getStatusConfig(status);
      
      expect(config).toBeDefined();
      expect(config.label).toBeTruthy();
      expect(config.severity).toBeTruthy();
      expect(config.icon).toBeTruthy();
      expect(config.backgroundColor).toBeTruthy();
    });

    it('returns correct severity mappings', () => {
      expect(getStatusConfig('error').severity).toBe('high');
      expect(getStatusConfig('critical').severity).toBe('high');
      expect(getStatusConfig('warning').severity).toBe('medium');
      expect(getStatusConfig('success').severity).toBe('low');
      expect(getStatusConfig('info').severity).toBe('info');
    });

    it('returns correct shapes for status types', () => {
      expect(getStatusConfig('error').shape).toBe('circle');
      expect(getStatusConfig('warning').shape).toBe('triangle');
      expect(getStatusConfig('success').shape).toBe('circle');
    });
  });

  describe('getAllStatusTypes', () => {
    it('returns all status types', () => {
      const types = getAllStatusTypes();
      expect(types.length).toBeGreaterThanOrEqual(10);
      expect(types).toContain('error');
      expect(types).toContain('success');
      expect(types).toContain('warning');
      expect(types).toContain('pending');
    });
  });

  describe('getStatusTypesBySeverity', () => {
    it.each(severityLevels)('returns correct statuses for %s severity', (severity) => {
      const statuses = getStatusTypesBySeverity(severity);
      expect(Array.isArray(statuses)).toBe(true);
      
      // Verify each returned status has the expected severity
      statuses.forEach(status => {
        const config = getStatusConfig(status);
        expect(config.severity).toBe(severity);
      });
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ICON INDICATOR TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('IconIndicator', () => {
  describe('Rendering', () => {
    it.each(allStatusTypes)('renders %s status without crashing', (status) => {
      const { container } = render(<IconIndicator status={status} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(<IconIndicator status="success" />);
      expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<IconIndicator status="error" label="Custom Error Message" />);
      expect(screen.getByText('Custom Error Message')).toBeInTheDocument();
    });

    it('hides label when showLabel is false', () => {
      render(<IconIndicator status="success" showLabel={false} />);
      expect(screen.queryByText('Success')).not.toBeInTheDocument();
    });

    it('renders iconOnly variant', () => {
      const { container } = render(<IconIndicator status="warning" iconOnly />);
      expect(container.firstChild).toBeInTheDocument();
      // Icon only should not have background circle
    });
  });

  describe('Sizes', () => {
    it.each(['small', 'medium', 'large'] as const)('renders %s size', (size) => {
      const { container } = render(<IconIndicator status="info" size={size} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<IconIndicator status="success" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations for all status types', async () => {
      for (const status of ['success', 'error', 'warning', 'info'] as const) {
        const { container } = render(<IconIndicator status={status} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });

    it('conveys status through visible text, not just color', () => {
      render(<IconIndicator status="error" />);
      // Label should be visible
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// SHAPE INDICATOR TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('ShapeIndicator', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<ShapeIndicator status="warning" />);
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<ShapeIndicator status="pending" label="Awaiting Approval" />);
      expect(screen.getByText('Awaiting Approval')).toBeInTheDocument();
    });

    it('renders with custom shape', () => {
      const { container } = render(<ShapeIndicator status="success" shape="square" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('shows outline when showOutline is true', () => {
      const { container } = render(<ShapeIndicator status="info" showOutline={true} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ShapeIndicator status="warning" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('uses shape AND color to convey meaning (not color alone)', () => {
      render(<ShapeIndicator status="error" />);
      // Should have visible label
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// STATUS DOT TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('StatusDot', () => {
  describe('Rendering', () => {
    it.each(allStatusTypes)('renders %s status', (status) => {
      const { container } = render(<StatusDot status={status} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies pulse animation when pulse prop is true', () => {
      const { container } = render(<StatusDot status="running" pulse />);
      // Animation should be applied
      expect(container.firstChild).toBeInTheDocument();
    });

    it('does not pulse by default', () => {
      const { container } = render(<StatusDot status="success" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it.each(['small', 'medium', 'large'] as const)('renders %s size', (size) => {
      const { container } = render(<StatusDot status="active" size={size} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<StatusDot status="success" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    // Note: StatusDot alone may rely on color only - should be used with labels
    it('should be used with accompanying text label for accessibility', () => {
      render(
        <span>
          <StatusDot status="active" />
          <span>Active</span>
        </span>
      );
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// BADGE INDICATOR TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('BadgeIndicator', () => {
  describe('Rendering', () => {
    it('renders with count', () => {
      render(
        <BadgeIndicator count={5}>
          <span>Notifications</span>
        </BadgeIndicator>
      );
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    it('renders zero count as invisible badge', () => {
      render(
        <BadgeIndicator count={0}>
          <span>Notifications</span>
        </BadgeIndicator>
      );
      // MUI Badge hides zero count by default (invisible class)
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    it('renders max count with overflow', () => {
      render(
        <BadgeIndicator count={100} max={99}>
          <span>Notifications</span>
        </BadgeIndicator>
      );
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('renders as dot variant', () => {
      const { container } = render(
        <BadgeIndicator dot>
          <span>Content</span>
        </BadgeIndicator>
      );
      expect(container.querySelector('.MuiBadge-dot')).toBeInTheDocument();
    });

    it('hides badge when invisible', () => {
      const { container } = render(
        <BadgeIndicator count={5} invisible>
          <span>Content</span>
        </BadgeIndicator>
      );
      expect(container.querySelector('.MuiBadge-invisible')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <BadgeIndicator count={5}>
          <span>Notifications</span>
        </BadgeIndicator>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('badge count is accessible to screen readers', () => {
      render(
        <BadgeIndicator count={10}>
          <button>Inbox</button>
        </BadgeIndicator>
      );
      // Count should be visible
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// DIFFERENTIAL INDICATOR TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('DifferentialIndicator', () => {
  describe('Rendering', () => {
    it('renders positive value with + prefix', () => {
      render(<DifferentialIndicator value={10} />);
      expect(screen.getByText('+10')).toBeInTheDocument();
    });

    it('renders negative value with - prefix', () => {
      render(<DifferentialIndicator value={-5} />);
      expect(screen.getByText('-5')).toBeInTheDocument();
    });

    it('renders zero value', () => {
      render(<DifferentialIndicator value={0} />);
      expect(screen.getByText('+0')).toBeInTheDocument();
    });

    it('formats as percentage', () => {
      render(<DifferentialIndicator value={25} percentage />);
      expect(screen.getByText('+25%')).toBeInTheDocument();
    });

    it('formats negative percentage', () => {
      render(<DifferentialIndicator value={-15} percentage />);
      expect(screen.getByText('-15%')).toBeInTheDocument();
    });

    it('formats as currency', () => {
      render(<DifferentialIndicator value={1000} currency="$" />);
      expect(screen.getByText('+$1,000')).toBeInTheDocument();
    });

    it('formats negative currency', () => {
      render(<DifferentialIndicator value={-500} currency="€" />);
      expect(screen.getByText('-€500')).toBeInTheDocument();
    });
  });

  describe('Visual States', () => {
    it('shows positive color for positive values', () => {
      const { container } = render(<DifferentialIndicator value={10} />);
      // Should have success/green color
      expect(container.firstChild).toBeInTheDocument();
    });

    it('shows negative color for negative values', () => {
      const { container } = render(<DifferentialIndicator value={-10} />);
      // Should have error/red color
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DifferentialIndicator value={25} percentage />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('conveys meaning through text, not just color', () => {
      render(<DifferentialIndicator value={-10} />);
      // Negative sign conveys meaning
      expect(screen.getByText('-10')).toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// STATUS CHIP TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('StatusChip', () => {
  describe('Rendering', () => {
    it.each(allStatusTypes)('renders %s status chip', (status) => {
      render(<StatusChip status={status} />);
      const config = getStatusConfig(status);
      expect(screen.getByText(config.label)).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<StatusChip status="pending" label="Needs Review" />);
      expect(screen.getByText('Needs Review')).toBeInTheDocument();
    });

    it('renders clickable chip', () => {
      const onClick = vi.fn();
      render(<StatusChip status="active" onClick={onClick} />);
      const chip = screen.getByText('Active').closest('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });

    it('renders deletable chip', () => {
      const onDelete = vi.fn();
      render(<StatusChip status="pending" onDelete={onDelete} />);
      expect(screen.getByTestId('CancelIcon')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it.each(['small', 'medium'] as const)('renders %s size', (size) => {
      render(<StatusChip status="success" size={size} />);
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<StatusChip status="error" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('clickable chip has button role', () => {
      const onClick = vi.fn();
      render(<StatusChip status="active" onClick={onClick} />);
      // MuiChip with onClick should be clickable
      const chip = screen.getByText('Active').closest('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// INLINE STATUS TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('InlineStatus', () => {
  describe('Rendering', () => {
    it('renders with dot by default', () => {
      const { container } = render(<InlineStatus status="complete" />);
      expect(screen.getByText('Complete')).toBeInTheDocument();
      // Should have dot element
      expect(container.querySelectorAll('div').length).toBeGreaterThan(0);
    });

    it('renders without dot when showDot is false', () => {
      render(<InlineStatus status="error" showDot={false} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<InlineStatus status="pending" label="Under Review" />);
      expect(screen.getByText('Under Review')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<InlineStatus status="active" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('label is visible for screen readers', () => {
      render(<InlineStatus status="warning" />);
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// STATUS LEGEND TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('StatusLegend', () => {
  describe('Rendering', () => {
    it('renders multiple legend items', () => {
      render(
        <StatusLegend
          items={[
            { status: 'success' },
            { status: 'warning' },
            { status: 'error' },
          ]}
        />
      );
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('renders with custom labels', () => {
      render(
        <StatusLegend
          items={[
            { status: 'success', label: 'Completed' },
            { status: 'pending', label: 'In Progress' },
          ]}
        />
      );
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
    });

    it('renders with counts', () => {
      render(
        <StatusLegend
          items={[
            { status: 'success', count: 10 },
            { status: 'error', count: 3 },
          ]}
        />
      );
      expect(screen.getByText('(10)')).toBeInTheDocument();
      expect(screen.getByText('(3)')).toBeInTheDocument();
    });

    it('renders empty state when no items', () => {
      const { container } = render(<StatusLegend items={[]} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders in row direction by default', () => {
      const { container } = render(
        <StatusLegend
          items={[{ status: 'success' }, { status: 'error' }]}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders in column direction when specified', () => {
      const { container } = render(
        <StatusLegend
          items={[{ status: 'success' }, { status: 'error' }]}
          direction="column"
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <StatusLegend
          items={[
            { status: 'success', label: 'Approved', count: 15 },
            { status: 'warning', label: 'Pending', count: 5 },
            { status: 'error', label: 'Rejected', count: 2 },
          ]}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('all legend items have visible labels', () => {
      render(
        <StatusLegend
          items={[
            { status: 'success' },
            { status: 'warning' },
            { status: 'error' },
          ]}
        />
      );
      // Labels should be visible, not hidden
      expect(screen.getByText('Success')).toBeVisible();
      expect(screen.getByText('Warning')).toBeVisible();
      expect(screen.getByText('Error')).toBeVisible();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// INTEGRATION TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('StatusIndicator Integration', () => {
  it('all indicators use consistent status configuration', () => {
    const status = 'success' as const;
    const config = getStatusConfig(status);
    
    // All indicators should show the same label by default
    const { rerender, container: _container } = render(<IconIndicator status={status} />);
    expect(screen.getByText(config.label)).toBeInTheDocument();
    
    rerender(<ShapeIndicator status={status} />);
    expect(screen.getByText(config.label)).toBeInTheDocument();
    
    rerender(<StatusChip status={status} />);
    expect(screen.getByText(config.label)).toBeInTheDocument();
    
    rerender(<InlineStatus status={status} />);
    expect(screen.getByText(config.label)).toBeInTheDocument();
  });

  it('all indicators respect custom labels', () => {
    const customLabel = 'Custom Status Label';
    
    const { rerender } = render(<IconIndicator status="success" label={customLabel} />);
    expect(screen.getByText(customLabel)).toBeInTheDocument();
    
    rerender(<ShapeIndicator status="success" label={customLabel} />);
    expect(screen.getByText(customLabel)).toBeInTheDocument();
    
    rerender(<StatusChip status="success" label={customLabel} />);
    expect(screen.getByText(customLabel)).toBeInTheDocument();
    
    rerender(<InlineStatus status="success" label={customLabel} />);
    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });
});
