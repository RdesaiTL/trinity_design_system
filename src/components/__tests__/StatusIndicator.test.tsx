/**
 * StatusIndicator Component Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
} from '../StatusIndicator';

describe('StatusIndicator', () => {
  // ============================================================================
  // UTILITY FUNCTION TESTS
  // ============================================================================

  describe('getStatusConfig', () => {
    it('returns correct config for error status', () => {
      const config = getStatusConfig('error');
      expect(config.severity).toBe('high');
      expect(config.label).toBe('Error');
      expect(config.icon).toBe('error');
    });

    it('returns correct config for success status', () => {
      const config = getStatusConfig('success');
      expect(config.severity).toBe('low');
      expect(config.label).toBe('Success');
    });

    it('returns correct config for warning status', () => {
      const config = getStatusConfig('warning');
      expect(config.severity).toBe('medium');
      expect(config.shape).toBe('triangle');
    });
  });

  describe('getAllStatusTypes', () => {
    it('returns all status types', () => {
      const types = getAllStatusTypes();
      expect(types.length).toBeGreaterThan(0);
      expect(types).toContain('error');
      expect(types).toContain('success');
      expect(types).toContain('warning');
      expect(types).toContain('pending');
      expect(types).toContain('beta');
    });

    it('returns correct number of status types', () => {
      const types = getAllStatusTypes();
      // Should have at least the common statuses
      expect(types.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('getStatusTypesBySeverity', () => {
    it('returns high severity statuses', () => {
      const highSeverity = getStatusTypesBySeverity('high');
      expect(highSeverity).toContain('error');
      expect(highSeverity).toContain('critical');
      expect(highSeverity).toContain('failed');
    });

    it('returns low severity statuses', () => {
      const lowSeverity = getStatusTypesBySeverity('low');
      expect(lowSeverity).toContain('success');
      expect(lowSeverity).toContain('complete');
      expect(lowSeverity).toContain('approved');
    });

    it('returns info severity statuses', () => {
      const infoSeverity = getStatusTypesBySeverity('info');
      expect(infoSeverity).toContain('info');
      expect(infoSeverity).toContain('new');
      expect(infoSeverity).toContain('beta');
    });
  });

  // ============================================================================
  // COMPONENT TESTS
  // ============================================================================

  describe('IconIndicator', () => {
    it('renders with default props', () => {
      render(<IconIndicator status="success" />);
      expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<IconIndicator status="error" label="Custom Error" />);
      expect(screen.getByText('Custom Error')).toBeInTheDocument();
    });

    it('hides label when showLabel is false', () => {
      render(<IconIndicator status="success" showLabel={false} />);
      expect(screen.queryByText('Success')).not.toBeInTheDocument();
    });
  });

  describe('ShapeIndicator', () => {
    it('renders with default props', () => {
      render(<ShapeIndicator status="warning" />);
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<ShapeIndicator status="pending" label="Awaiting Approval" />);
      expect(screen.getByText('Awaiting Approval')).toBeInTheDocument();
    });
  });

  describe('StatusDot', () => {
    it('renders without crashing', () => {
      const { container } = render(<StatusDot status="success" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies pulse animation when pulse prop is true', () => {
      const { container } = render(<StatusDot status="running" pulse />);
      expect(container.firstChild).toHaveStyle('animation: pulse 2s infinite');
    });
  });

  describe('BadgeIndicator', () => {
    it('renders with count', () => {
      render(
        <BadgeIndicator count={5}>
          <span>Content</span>
        </BadgeIndicator>
      );
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
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

  describe('DifferentialIndicator', () => {
    it('renders positive value correctly', () => {
      render(<DifferentialIndicator value={10} />);
      expect(screen.getByText('+10')).toBeInTheDocument();
    });

    it('renders negative value correctly', () => {
      render(<DifferentialIndicator value={-5} />);
      expect(screen.getByText('-5')).toBeInTheDocument();
    });

    it('formats as percentage', () => {
      render(<DifferentialIndicator value={25} percentage />);
      expect(screen.getByText('+25%')).toBeInTheDocument();
    });

    it('formats as currency', () => {
      render(<DifferentialIndicator value={1000} currency="$" />);
      expect(screen.getByText('+$1,000')).toBeInTheDocument();
    });
  });

  describe('StatusChip', () => {
    it('renders with default label', () => {
      render(<StatusChip status="active" />);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<StatusChip status="pending" label="Needs Review" />);
      expect(screen.getByText('Needs Review')).toBeInTheDocument();
    });
  });

  describe('InlineStatus', () => {
    it('renders with dot by default', () => {
      const { container } = render(<InlineStatus status="complete" />);
      expect(screen.getByText('Complete')).toBeInTheDocument();
      // Dot should be present
      expect(container.querySelectorAll('div').length).toBeGreaterThan(0);
    });

    it('renders without dot when showDot is false', () => {
      render(<InlineStatus status="error" showDot={false} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('StatusLegend', () => {
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
  });
});
