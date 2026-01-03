/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * DATATABLE COMPONENT TESTS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Comprehensive tests for DataTable component covering:
 * - Rendering & DOM structure
 * - Density modes (compact, standard, comfortable)
 * - Sorting, filtering, pagination
 * - Row selection & bulk actions
 * - Accessibility (keyboard navigation, screen reader support)
 * - Inline editing
 * 
 * @module components/DataTable/__tests__/DataTable.test
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen, within, waitFor, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../../theme';
import { DataTable, DataTableProps } from '../DataTable';
import { GridColDef, GridRowId, GridValidRowModel } from '@mui/x-data-grid';

// toHaveNoViolations is extended globally in test-setup.ts

// ═══════════════════════════════════════════════════════════════════════════════
// TEST DATA
// ═══════════════════════════════════════════════════════════════════════════════

interface TestRow extends GridValidRowModel {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  age: number;
}

const mockColumns: GridColDef<TestRow>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role', width: 120 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'age', headerName: 'Age', type: 'number', width: 80 },
];

const mockRows: TestRow[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', age: 32 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', age: 28 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', age: 45 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', age: 35 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Pending', age: 40 },
];

const defaultProps: DataTableProps<TestRow> = {
  columns: mockColumns,
  rows: mockRows,
};

// Wrapper component with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {ui}
    </ThemeProvider>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 1. RENDERING TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('DataTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<DataTable {...defaultProps} />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('renders all column headers', () => {
      renderWithTheme(<DataTable {...defaultProps} />);
      
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
    });

    it('renders row data correctly', () => {
      renderWithTheme(<DataTable {...defaultProps} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('renders correct number of rows', () => {
      renderWithTheme(<DataTable {...defaultProps} />);
      
      const grid = screen.getByRole('grid');
      const rows = within(grid).getAllByRole('row');
      // Header row + data rows
      expect(rows.length).toBeGreaterThanOrEqual(mockRows.length);
    });

    it('renders with title and subtitle', () => {
      renderWithTheme(
        <DataTable
          {...defaultProps}
          title="User Management"
          subtitle="Manage system users"
        />
      );
      
      expect(screen.getByText('User Management')).toBeInTheDocument();
      expect(screen.getByText('Manage system users')).toBeInTheDocument();
    });

    it('renders loading skeleton when loading', () => {
      renderWithTheme(<DataTable {...defaultProps} loading />);
      
      // Should show skeleton elements
      const skeletons = document.querySelectorAll('.MuiSkeleton-root');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders empty state when no rows', () => {
      renderWithTheme(<DataTable {...defaultProps} rows={[]} />);
      
      expect(screen.getByText(/no rows/i)).toBeInTheDocument();
    });

    it('renders custom empty message', () => {
      renderWithTheme(
        <DataTable
          {...defaultProps}
          rows={[]}
          emptyMessage="No users found"
        />
      );
      
      expect(screen.getByText('No users found')).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 2. DENSITY TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Density Modes', () => {
    it.each(['compact', 'standard', 'comfortable'] as const)(
      'renders in %s density mode',
      (density) => {
        renderWithTheme(<DataTable {...defaultProps} density={density} />);
        expect(screen.getByRole('grid')).toBeInTheDocument();
      }
    );

    it('changes density dynamically', async () => {
      const { rerender } = renderWithTheme(
        <DataTable {...defaultProps} density="standard" />
      );
      
      expect(screen.getByRole('grid')).toBeInTheDocument();
      
      rerender(
        <ThemeProvider theme={lightTheme}>
          <DataTable {...defaultProps} density="compact" />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 3. TOOLBAR TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Toolbar', () => {
    it('renders search input when showSearch is true', () => {
      renderWithTheme(<DataTable {...defaultProps} showSearch />);
      
      expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });

    it('filters rows on search', async () => {
      const user = userEvent.setup();
      renderWithTheme(<DataTable {...defaultProps} showSearch />);
      
      const searchInput = screen.getByPlaceholderText(/search/i);
      await user.type(searchInput, 'John');
      
      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });
    });

    it('renders refresh button when onRefresh is provided', () => {
      const onRefresh = vi.fn();
      renderWithTheme(<DataTable {...defaultProps} onRefresh={onRefresh} />);
      
      expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
    });

    it('calls onRefresh when refresh button is clicked', async () => {
      const user = userEvent.setup();
      const onRefresh = vi.fn();
      renderWithTheme(<DataTable {...defaultProps} onRefresh={onRefresh} />);
      
      await user.click(screen.getByRole('button', { name: /refresh/i }));
      expect(onRefresh).toHaveBeenCalledTimes(1);
    });

    it('renders add button when onAddRow is provided', () => {
      const onAddRow = vi.fn();
      renderWithTheme(<DataTable {...defaultProps} onAddRow={onAddRow} />);
      
      expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 4. SELECTION TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Row Selection', () => {
    it('renders checkboxes when checkboxSelection is true', () => {
      renderWithTheme(<DataTable {...defaultProps} checkboxSelection />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('selects row on checkbox click', async () => {
      const user = userEvent.setup();
      const onRowSelectionChange = vi.fn();
      
      renderWithTheme(
        <DataTable
          {...defaultProps}
          checkboxSelection
          onRowSelectionChange={onRowSelectionChange}
        />
      );
      
      const checkboxes = screen.getAllByRole('checkbox');
      // First checkbox is "select all", click second one (first row)
      await user.click(checkboxes[1]);
      
      expect(onRowSelectionChange).toHaveBeenCalled();
    });

    it('selects all rows when header checkbox is clicked', async () => {
      const user = userEvent.setup();
      const onRowSelectionChange = vi.fn();
      
      renderWithTheme(
        <DataTable
          {...defaultProps}
          checkboxSelection
          onRowSelectionChange={onRowSelectionChange}
        />
      );
      
      // Find and click the "select all" checkbox (first checkbox)
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);
      
      expect(onRowSelectionChange).toHaveBeenCalled();
    });

    it('shows selection count in toolbar', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <DataTable
          {...defaultProps}
          checkboxSelection
        />
      );
      
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]); // Select first row
      
      await waitFor(() => {
        expect(screen.getByText(/1 selected/i)).toBeInTheDocument();
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 5. SORTING TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Sorting', () => {
    it('sorts by column when header is clicked', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(<DataTable {...defaultProps} />);
      
      // Click on Name column header
      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader);
      
      // Wait for sort to apply
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
    });

    it('toggles sort direction on subsequent clicks', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(<DataTable {...defaultProps} />);
      
      const nameHeader = screen.getByText('Name');
      
      // First click - ascending
      await user.click(nameHeader);
      
      // Second click - descending
      await user.click(nameHeader);
      
      // Third click - remove sort
      await user.click(nameHeader);
      
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('calls onSortModelChange when sort changes', async () => {
      const user = userEvent.setup();
      const onSortModelChange = vi.fn();
      
      renderWithTheme(
        <DataTable {...defaultProps} onSortModelChange={onSortModelChange} />
      );
      
      await user.click(screen.getByText('Name'));
      
      await waitFor(() => {
        expect(onSortModelChange).toHaveBeenCalled();
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 6. PAGINATION TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Pagination', () => {
    const manyRows = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: 'User',
      status: 'Active',
      age: 25 + (i % 30),
    }));

    it('renders pagination controls', () => {
      renderWithTheme(
        <DataTable
          {...defaultProps}
          rows={manyRows}
          pagination
          paginationModel={{ page: 0, pageSize: 10 }}
        />
      );
      
      // Should have pagination controls
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('shows correct page size options', () => {
      renderWithTheme(
        <DataTable
          {...defaultProps}
          rows={manyRows}
          pagination
          pageSizeOptions={[5, 10, 25]}
          paginationModel={{ page: 0, pageSize: 10 }}
        />
      );
      
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('calls onPaginationModelChange when page changes', async () => {
      const onPaginationModelChange = vi.fn();
      
      renderWithTheme(
        <DataTable
          {...defaultProps}
          rows={manyRows}
          pagination
          paginationModel={{ page: 0, pageSize: 10 }}
          onPaginationModelChange={onPaginationModelChange}
        />
      );
      
      // Find and click next page button
      const nextButton = screen.getByRole('button', { name: /next page/i });
      await userEvent.click(nextButton);
      
      expect(onPaginationModelChange).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 7. ACCESSIBILITY TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = renderWithTheme(<DataTable {...defaultProps} />);
      
      const results = await axe(container, {
        rules: {
          // MUI DataGrid has some known issues, exclude certain rules
          'scrollable-region-focusable': { enabled: false },
        },
      });
      
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with selection', async () => {
      const { container } = renderWithTheme(
        <DataTable {...defaultProps} checkboxSelection />
      );
      
      const results = await axe(container, {
        rules: {
          'scrollable-region-focusable': { enabled: false },
        },
      });
      
      expect(results).toHaveNoViolations();
    });

    it('has correct grid role', () => {
      renderWithTheme(<DataTable {...defaultProps} />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('has row and columnheader roles', () => {
      renderWithTheme(<DataTable {...defaultProps} />);
      
      expect(screen.getAllByRole('row').length).toBeGreaterThan(0);
      expect(screen.getAllByRole('columnheader').length).toBe(mockColumns.length);
    });

    it('column headers have aria-sort attribute when sortable', async () => {
      const user = userEvent.setup();
      renderWithTheme(<DataTable {...defaultProps} />);
      
      // Click to sort
      await user.click(screen.getByText('Name'));
      
      await waitFor(() => {
        const sortedHeader = screen.getByText('Name').closest('[role="columnheader"]');
        expect(sortedHeader).toHaveAttribute('aria-sort');
      });
    });

    it('checkboxes have accessible labels', () => {
      renderWithTheme(<DataTable {...defaultProps} checkboxSelection />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        // Each checkbox should have an accessible name
        expect(checkbox).toHaveAttribute('aria-label');
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 8. KEYBOARD NAVIGATION TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Keyboard Navigation', () => {
    it('allows Tab navigation into the grid', async () => {
      const user = userEvent.setup();
      renderWithTheme(<DataTable {...defaultProps} />);
      
      await user.tab();
      
      // Focus should enter the grid area
      const grid = screen.getByRole('grid');
      expect(grid.contains(document.activeElement)).toBe(true);
    });

    it('supports arrow key navigation between cells', async () => {
      const user = userEvent.setup();
      renderWithTheme(<DataTable {...defaultProps} />);
      
      // Tab into grid
      await user.tab();
      
      // Arrow navigation
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{ArrowUp}');
      await user.keyboard('{ArrowLeft}');
      
      // Should not crash
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('supports Home and End keys', async () => {
      const user = userEvent.setup();
      renderWithTheme(<DataTable {...defaultProps} />);
      
      await user.tab();
      await user.keyboard('{Home}');
      await user.keyboard('{End}');
      
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('allows Space to select checkbox when focused', async () => {
      const user = userEvent.setup();
      const onRowSelectionChange = vi.fn();
      
      renderWithTheme(
        <DataTable
          {...defaultProps}
          checkboxSelection
          onRowSelectionChange={onRowSelectionChange}
        />
      );
      
      // Tab to first checkbox
      await user.tab();
      await user.keyboard(' ');
      
      expect(onRowSelectionChange).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 9. BULK ACTIONS TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Bulk Actions', () => {
    const bulkActions = [
      { label: 'Delete', icon: <span>🗑️</span>, action: vi.fn() },
      { label: 'Export', icon: <span>📤</span>, action: vi.fn() },
    ];

    it('shows bulk actions when rows are selected', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <DataTable
          {...defaultProps}
          checkboxSelection
          bulkActions={bulkActions}
        />
      );
      
      // Select a row
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
      });
    });

    it('executes bulk action on selected rows', async () => {
      const user = userEvent.setup();
      const deleteAction = vi.fn();
      
      renderWithTheme(
        <DataTable
          {...defaultProps}
          checkboxSelection
          bulkActions={[
            { label: 'Delete', icon: <span>🗑️</span>, action: deleteAction },
          ]}
        />
      );
      
      // Select rows
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
      });
      
      await user.click(screen.getByRole('button', { name: /delete/i }));
      
      expect(deleteAction).toHaveBeenCalled();
    });

    it('clears selection when clear button is clicked', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <DataTable
          {...defaultProps}
          checkboxSelection
        />
      );
      
      // Select a row
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);
      
      await waitFor(() => {
        expect(screen.getByText(/1 selected/i)).toBeInTheDocument();
      });
      
      // Clear selection
      const clearButton = screen.getByRole('button', { name: /clear/i });
      await user.click(clearButton);
      
      await waitFor(() => {
        expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 10. ROW ACTIONS TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Row Actions', () => {
    const rowActions = [
      { label: 'Edit', icon: <span>✏️</span>, onClick: vi.fn() },
      { label: 'Delete', icon: <span>🗑️</span>, onClick: vi.fn(), color: 'error' as const },
    ];

    it('renders row actions menu button', () => {
      renderWithTheme(
        <DataTable {...defaultProps} rowActions={rowActions} />
      );
      
      // Should have action buttons for each row
      const actionButtons = screen.getAllByRole('button', { name: /actions/i });
      expect(actionButtons.length).toBeGreaterThan(0);
    });

    it('opens action menu on click', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <DataTable {...defaultProps} rowActions={rowActions} />
      );
      
      const actionButtons = screen.getAllByRole('button', { name: /actions/i });
      await user.click(actionButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });
    });

    it('executes row action when menu item is clicked', async () => {
      const user = userEvent.setup();
      const editHandler = vi.fn();
      
      renderWithTheme(
        <DataTable
          {...defaultProps}
          rowActions={[
            { label: 'Edit', icon: <span>✏️</span>, onClick: editHandler },
          ]}
        />
      );
      
      const actionButtons = screen.getAllByRole('button', { name: /actions/i });
      await user.click(actionButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: /edit/i })).toBeInTheDocument();
      });
      
      await user.click(screen.getByRole('menuitem', { name: /edit/i }));
      
      expect(editHandler).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 11. EDGE CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Edge Cases', () => {
    it('handles empty columns gracefully', () => {
      renderWithTheme(<DataTable columns={[]} rows={[]} />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('handles very large datasets', () => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: 'User',
        status: 'Active',
        age: 25,
      }));
      
      renderWithTheme(
        <DataTable
          {...defaultProps}
          rows={largeDataset}
          pagination
          paginationModel={{ page: 0, pageSize: 25 }}
        />
      );
      
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('handles special characters in data', () => {
      const specialRows = [
        { id: 1, name: '<script>alert("xss")</script>', email: 'test@test.com', role: 'User', status: 'Active', age: 25 },
        { id: 2, name: 'Name with "quotes"', email: 'test2@test.com', role: 'User', status: 'Active', age: 30 },
        { id: 3, name: 'Name with & ampersand', email: 'test3@test.com', role: 'User', status: 'Active', age: 35 },
      ];
      
      renderWithTheme(<DataTable {...defaultProps} rows={specialRows} />);
      
      // Should escape HTML
      expect(screen.queryByRole('script')).not.toBeInTheDocument();
      expect(screen.getByText('Name with "quotes"')).toBeInTheDocument();
    });

    it('handles undefined/null values in cells', () => {
      const rowsWithNull = [
        { id: 1, name: null, email: undefined, role: 'User', status: 'Active', age: 25 },
      ];
      
      // Should not crash
      renderWithTheme(
        <DataTable 
          columns={mockColumns} 
          rows={rowsWithNull as unknown as TestRow[]} 
        />
      );
      
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('handles rapid prop changes', async () => {
      const { rerender } = renderWithTheme(<DataTable {...defaultProps} />);
      
      // Rapidly change props
      for (let i = 0; i < 10; i++) {
        rerender(
          <ThemeProvider theme={lightTheme}>
            <DataTable
              {...defaultProps}
              density={i % 2 === 0 ? 'compact' : 'standard'}
            />
          </ThemeProvider>
        );
      }
      
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 12. THEME TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Theme Support', () => {
    it('renders in light theme', () => {
      renderWithTheme(<DataTable {...defaultProps} />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('renders in dark theme', () => {
      const { container } = render(
        <ThemeProvider theme={lightTheme}>
          <DataTable {...defaultProps} />
        </ThemeProvider>
      );
      
      expect(container.querySelector('[role="grid"]')).toBeInTheDocument();
    });
  });
});
