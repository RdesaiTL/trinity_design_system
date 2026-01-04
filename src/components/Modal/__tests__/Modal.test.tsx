/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MODAL COMPONENT TESTS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Comprehensive tests for Modal component covering:
 * - Rendering & DOM structure
 * - All variants (default, info, success, warning, danger, confirm)
 * - Accessibility (WCAG 2.1 AA compliance)
 * - Keyboard navigation & focus trapping
 * - User interactions
 * 
 * @module components/Modal/__tests__/Modal.test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import {
  render,
  screen,
  within,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';
import userEvent from '@testing-library/user-event';
import { Modal, ConfirmDialog, ModalProps } from '../Modal';

// toHaveNoViolations is extended globally in test-setup.ts

// Wrapper for themed rendering - unused, but kept for reference
// const renderWithTheme = (ui: React.ReactElement) => {
//   return render(
//     <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
//   );
// };

// ═══════════════════════════════════════════════════════════════════════════════
// TEST DATA & MOCKS
// ═══════════════════════════════════════════════════════════════════════════════

const defaultProps: ModalProps = {
  open: true,
  onClose: vi.fn(),
  title: 'Test Modal',
  children: <p>Modal content</p>,
};

const createMockHandlers = () => ({
  onClose: vi.fn(),
  onPrimaryAction: vi.fn(),
  onSecondaryAction: vi.fn(),
});

// Helper to render modal and wait for it to be visible
const renderModal = async (props: Partial<ModalProps> = {}) => {
  const user = userEvent.setup();
  const handlers = createMockHandlers();
  
  const result = render(
    <Modal {...defaultProps} {...handlers} {...props} />
  );
  
  // Wait for dialog to appear
  if (props.open !== false) {
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible();
    });
  }
  
  return { ...result, user, handlers };
};

// ═══════════════════════════════════════════════════════════════════════════════
// 1. RENDERING TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders when open is true', async () => {
      await renderModal();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('does not render when open is false', () => {
      render(<Modal {...defaultProps} open={false} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders title correctly', async () => {
      await renderModal({ title: 'My Title' });
      expect(screen.getByText('My Title')).toBeInTheDocument();
    });

    it('renders children content', async () => {
      await renderModal({ children: <span>Custom content</span> });
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });

    it('renders string children as DialogContentText', async () => {
      await renderModal({ children: 'String content' });
      expect(screen.getByText('String content')).toBeInTheDocument();
    });

    it('renders close button by default', async () => {
      await renderModal();
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', async () => {
      await renderModal({ showCloseButton: false });
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('renders primary action button', async () => {
      await renderModal({ primaryAction: 'Save' });
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('renders secondary action button', async () => {
      await renderModal({ secondaryAction: 'Cancel' });
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('hides footer when hideFooter is true', async () => {
      await renderModal({ hideFooter: true, primaryAction: 'Save' });
      expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
    });

    it('renders custom footer content', async () => {
      await renderModal({
        footer: <button>Custom Footer Button</button>,
      });
      expect(screen.getByRole('button', { name: 'Custom Footer Button' })).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 2. VARIANT TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Variants', () => {
    const variants = ['default', 'info', 'success', 'warning', 'danger', 'confirm'] as const;

    it.each(variants)('renders %s variant without crashing', async (variant) => {
      await renderModal({ variant, title: `${variant} Modal` });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders info variant with info icon', async () => {
      await renderModal({ variant: 'info', title: 'Info Modal' });
      const dialog = screen.getByRole('dialog');
      // Info variant should have an icon
      expect(within(dialog).getByTestId('InfoIcon')).toBeInTheDocument();
    });

    it('renders success variant with success icon', async () => {
      await renderModal({ variant: 'success', title: 'Success Modal' });
      const dialog = screen.getByRole('dialog');
      expect(within(dialog).getByTestId('CheckCircleIcon')).toBeInTheDocument();
    });

    it('renders warning variant with warning icon', async () => {
      await renderModal({ variant: 'warning', title: 'Warning Modal' });
      const dialog = screen.getByRole('dialog');
      expect(within(dialog).getByTestId('WarningIcon')).toBeInTheDocument();
    });

    it('renders danger variant with error icon', async () => {
      await renderModal({ variant: 'danger', title: 'Danger Modal' });
      const dialog = screen.getByRole('dialog');
      expect(within(dialog).getByTestId('ErrorIcon')).toBeInTheDocument();
    });

    it('renders confirm variant with help icon', async () => {
      await renderModal({ variant: 'confirm', title: 'Confirm Modal' });
      const dialog = screen.getByRole('dialog');
      expect(within(dialog).getByTestId('HelpOutlineIcon')).toBeInTheDocument();
    });

    it('default variant has no icon', async () => {
      await renderModal({ variant: 'default', title: 'Default Modal' });
      const dialog = screen.getByRole('dialog');
      // Default should not have variant icons
      expect(within(dialog).queryByTestId('InfoIcon')).not.toBeInTheDocument();
      expect(within(dialog).queryByTestId('CheckCircleIcon')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    it.each(sizes)('renders with maxWidth %s', async (size) => {
      await renderModal({ maxWidth: size });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders fullWidth by default', async () => {
      const { container } = await renderModal();
      // MUI Dialog paper should have fullWidth class
      expect(container.querySelector('.MuiDialog-paperFullWidth')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('disables primary button when loading', async () => {
      await renderModal({ primaryAction: 'Save', loading: true });
      expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    });

    it('shows loading spinner when loading', async () => {
      await renderModal({ primaryAction: 'Save', loading: true });
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('disables primary button when primaryDisabled is true', async () => {
      await renderModal({ primaryAction: 'Save', primaryDisabled: true });
      expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    });

    it('disables close button when loading', async () => {
      await renderModal({ loading: true });
      expect(screen.getByRole('button', { name: /close/i })).toBeDisabled();
    });

    it('disables secondary button when loading', async () => {
      await renderModal({ secondaryAction: 'Cancel', loading: true });
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 3. ACCESSIBILITY TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = await renderModal();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations for danger variant', async () => {
      const { container } = await renderModal({ variant: 'danger', title: 'Delete' });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has correct dialog role', async () => {
      await renderModal();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-labelledby pointing to title', async () => {
      await renderModal({ title: 'Accessible Title' });
      const dialog = screen.getByRole('dialog');
      const labelledBy = dialog.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
      
      // Find the title element with that ID
      const titleElement = document.getElementById(labelledBy!);
      expect(titleElement).toHaveTextContent('Accessible Title');
    });

    it('has aria-describedby pointing to content', async () => {
      await renderModal({ children: 'Modal description' });
      const dialog = screen.getByRole('dialog');
      const describedBy = dialog.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });

    it('close button has accessible label', async () => {
      await renderModal();
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('action buttons have accessible names', async () => {
      await renderModal({
        primaryAction: 'Confirm',
        secondaryAction: 'Cancel',
      });
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 4. KEYBOARD NAVIGATION TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Keyboard Navigation', () => {
    it('closes on Escape key by default', async () => {
      const { user, handlers } = await renderModal();
      await user.keyboard('{Escape}');
      expect(handlers.onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close on Escape when disableEscapeKeyDown is true', async () => {
      const { user, handlers } = await renderModal({ disableEscapeKeyDown: true });
      await user.keyboard('{Escape}');
      expect(handlers.onClose).not.toHaveBeenCalled();
    });

    it('traps focus within the modal', async () => {
      const { user } = await renderModal({
        primaryAction: 'Save',
        secondaryAction: 'Cancel',
      });

      // Tab through all focusable elements
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();

      // Focus should cycle back to first element
      const dialog = screen.getByRole('dialog');
      expect(dialog.contains(document.activeElement)).toBe(true);
    });

    it('moves focus to first focusable element on open', async () => {
      await renderModal({ primaryAction: 'Save' });
      
      // MUI Dialog focuses the dialog or first focusable element
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog.contains(document.activeElement)).toBe(true);
      });
    });

    it('primary button can be activated with Enter', async () => {
      const { user, handlers } = await renderModal({ primaryAction: 'Save' });
      
      const saveButton = screen.getByRole('button', { name: 'Save' });
      saveButton.focus();
      await user.keyboard('{Enter}');
      
      expect(handlers.onPrimaryAction).toHaveBeenCalled();
    });

    it('secondary button can be activated with Enter', async () => {
      const { user, handlers } = await renderModal({ secondaryAction: 'Cancel' });
      
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      cancelButton.focus();
      await user.keyboard('{Enter}');
      
      expect(handlers.onSecondaryAction).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 5. INTERACTION TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Interactions', () => {
    it('calls onClose when close button is clicked', async () => {
      const { user, handlers } = await renderModal();
      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(handlers.onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onPrimaryAction when primary button is clicked', async () => {
      const { user, handlers } = await renderModal({ primaryAction: 'Save' });
      await user.click(screen.getByRole('button', { name: 'Save' }));
      expect(handlers.onPrimaryAction).toHaveBeenCalledTimes(1);
    });

    it('calls onSecondaryAction and onClose when secondary button is clicked', async () => {
      const { user, handlers } = await renderModal({ secondaryAction: 'Cancel' });
      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(handlers.onSecondaryAction).toHaveBeenCalledTimes(1);
      expect(handlers.onClose).toHaveBeenCalledTimes(1);
    });

    it('closes on backdrop click by default', async () => {
      const { user, handlers } = await renderModal();
      
      // Click on backdrop (outside dialog paper)
      const backdrop = document.querySelector('.MuiBackdrop-root');
      if (backdrop) {
        await user.click(backdrop);
        expect(handlers.onClose).toHaveBeenCalled();
      }
    });

    it('does not close on backdrop click when disableBackdropClick is true', async () => {
      const { user, handlers } = await renderModal({ disableBackdropClick: true });
      
      const backdrop = document.querySelector('.MuiBackdrop-root');
      if (backdrop) {
        await user.click(backdrop);
        expect(handlers.onClose).not.toHaveBeenCalled();
      }
    });

    it('handles async primary action', async () => {
      const asyncAction = vi.fn().mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, 100))
      );
      
      const { user } = render(
        <Modal {...defaultProps} primaryAction="Save" onPrimaryAction={asyncAction} />
      );
      
      await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible());
      await user.click(screen.getByRole('button', { name: 'Save' }));
      
      // Should show loading state during async action
      expect(asyncAction).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 6. CONFIRM DIALOG TESTS
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('ConfirmDialog', () => {
    it('renders with default props', async () => {
      const onConfirm = vi.fn();
      const onClose = vi.fn();
      
      render(
        <ConfirmDialog
          open={true}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeVisible();
      });
      
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
      expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    });

    it('renders custom title and message', async () => {
      render(
        <ConfirmDialog
          open={true}
          onClose={vi.fn()}
          onConfirm={vi.fn()}
          title="Delete Item"
          message="This action cannot be undone."
        />
      );
      
      await waitFor(() => {
        expect(screen.getByText('Delete Item')).toBeInTheDocument();
        expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
      });
    });

    it('calls onConfirm when confirm button is clicked', async () => {
      const onConfirm = vi.fn();
      const user = userEvent.setup();
      
      render(
        <ConfirmDialog
          open={true}
          onClose={vi.fn()}
          onConfirm={onConfirm}
          confirmLabel="Delete"
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeVisible();
      });
      
      await user.click(screen.getByRole('button', { name: 'Delete' }));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('renders danger variant correctly', async () => {
      render(
        <ConfirmDialog
          open={true}
          onClose={vi.fn()}
          onConfirm={vi.fn()}
          variant="danger"
          title="Delete"
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeVisible();
      });
      
      // Danger variant uses error icon
      expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
    });

    it('has no accessibility violations', async () => {
      const { container } = render(
        <ConfirmDialog
          open={true}
          onClose={vi.fn()}
          onConfirm={vi.fn()}
          title="Confirm"
          message="Are you sure?"
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeVisible();
      });
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // 7. EDGE CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Edge Cases', () => {
    it('handles rapid open/close', async () => {
      const { rerender } = render(<Modal {...defaultProps} open={true} />);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeVisible();
      });
      
      // Rapidly toggle
      rerender(<Modal {...defaultProps} open={false} />);
      rerender(<Modal {...defaultProps} open={true} />);
      rerender(<Modal {...defaultProps} open={false} />);
      
      // Should not crash
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('handles undefined callbacks gracefully', async () => {
      const { user } = render(
        <Modal
          open={true}
          onClose={vi.fn()}
          title="Test"
          primaryAction="Save"
          // onPrimaryAction is undefined
        />
      );
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeVisible();
      });
      
      // Should not crash when clicking
      await user.click(screen.getByRole('button', { name: 'Save' }));
    });

    it('handles very long title', async () => {
      const longTitle = 'A'.repeat(200);
      await renderModal({ title: longTitle });
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles complex children', async () => {
      await renderModal({
        children: (
          <div>
            <input type="text" placeholder="Name" />
            <button>Inner Button</button>
            <select>
              <option>Option 1</option>
            </select>
          </div>
        ),
      });
      
      expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Inner Button' })).toBeInTheDocument();
    });
  });
});
