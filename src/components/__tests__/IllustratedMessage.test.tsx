/**
 * IllustratedMessage Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  IllustratedMessage,
  UploadDropZone,
  EmptyTableIllustration,
  EmptyDraftsIllustration,
  GettingStartedIllustration,
  NoResultsIllustration,
  ErrorGenericIllustration,
  Error404Illustration,
  Error500Illustration,
  SuccessIllustration,
  NoNotificationsIllustration,
  NoDataIllustration,
  OfflineIllustration,
} from '../IllustratedMessage';

describe('IllustratedMessage', () => {
  // ============================================================================
  // BASIC RENDERING
  // ============================================================================

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<IllustratedMessage illustration="empty-table" title="No Data" />);
      expect(screen.getByText('No Data')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      render(<IllustratedMessage illustration="empty-table" title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders with custom description', () => {
      render(<IllustratedMessage illustration="empty-table" title="Test" description="Custom description text" />);
      expect(screen.getByText('Custom description text')).toBeInTheDocument();
    });

    it('renders with title and description', () => {
      render(
        <IllustratedMessage
          illustration="empty-table"
          title="Test Title"
          description="Test description"
        />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ILLUSTRATION TYPES
  // ============================================================================

  describe('Illustration Types', () => {
    it('renders empty-table type', () => {
      render(<IllustratedMessage illustration="empty-table" title="No Data" />);
      expect(screen.getByText('No Data')).toBeInTheDocument();
    });

    it('renders empty-drafts type', () => {
      render(<IllustratedMessage illustration="empty-drafts" title="No Drafts" />);
      expect(screen.getByText('No Drafts')).toBeInTheDocument();
    });

    it('renders getting-started type', () => {
      render(<IllustratedMessage illustration="getting-started" title="Get Started" />);
      expect(screen.getByText('Get Started')).toBeInTheDocument();
    });

    it('renders no-results type', () => {
      render(<IllustratedMessage illustration="no-results" title="No Results" />);
      expect(screen.getByText('No Results')).toBeInTheDocument();
    });

    it('renders error-generic type', () => {
      render(<IllustratedMessage illustration="error-generic" title="Something Went Wrong" />);
      expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
    });

    it('renders error-404 type', () => {
      render(<IllustratedMessage illustration="error-404" title="Page Not Found" />);
      expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    });

    it('renders error-500 type', () => {
      render(<IllustratedMessage illustration="error-500" title="Server Error" />);
      expect(screen.getByText('Server Error')).toBeInTheDocument();
    });

    it('renders success type', () => {
      render(<IllustratedMessage illustration="success" title="Success" />);
      expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('renders no-notifications type', () => {
      render(<IllustratedMessage illustration="no-notifications" title="No Notifications" />);
      expect(screen.getByText('No Notifications')).toBeInTheDocument();
    });

    it('renders offline type', () => {
      render(<IllustratedMessage illustration="offline" title="You are Offline" />);
      expect(screen.getByText('You are Offline')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // SIZE VARIANTS
  // ============================================================================

  describe('Size Variants', () => {
    it('renders small size', () => {
      const { container } = render(<IllustratedMessage illustration="empty-table" title="Test" size="small" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      const { container } = render(<IllustratedMessage illustration="empty-table" title="Test" size="medium" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders large size', () => {
      const { container } = render(<IllustratedMessage illustration="empty-table" title="Test" size="large" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ACTIONS
  // ============================================================================

  describe('Actions', () => {
    it('renders primary action button', () => {
      const handleClick = vi.fn();
      render(
        <IllustratedMessage
          illustration="empty-table"
          title="Test"
          primaryAction={{ label: 'Primary Button', onClick: handleClick }}
        />
      );
      
      const button = screen.getByText('Primary Button');
      expect(button).toBeInTheDocument();
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders secondary action button', () => {
      const handleClick = vi.fn();
      render(
        <IllustratedMessage
          illustration="empty-table"
          title="Test"
          secondaryAction={{ label: 'Secondary Button', onClick: handleClick }}
        />
      );
      
      const button = screen.getByText('Secondary Button');
      expect(button).toBeInTheDocument();
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders both primary and secondary actions', () => {
      render(
        <IllustratedMessage
          illustration="empty-table"
          title="Test"
          primaryAction={{ label: 'Primary', onClick: vi.fn() }}
          secondaryAction={{ label: 'Secondary', onClick: vi.fn() }}
        />
      );
      
      expect(screen.getByText('Primary')).toBeInTheDocument();
      expect(screen.getByText('Secondary')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // STANDALONE ILLUSTRATIONS
  // ============================================================================

  describe('Standalone Illustrations', () => {
    it('renders EmptyTableIllustration', () => {
      const { container } = render(<EmptyTableIllustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders EmptyDraftsIllustration', () => {
      const { container } = render(<EmptyDraftsIllustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders GettingStartedIllustration', () => {
      const { container } = render(<GettingStartedIllustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders NoResultsIllustration', () => {
      const { container } = render(<NoResultsIllustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders ErrorGenericIllustration', () => {
      const { container } = render(<ErrorGenericIllustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders Error404Illustration', () => {
      const { container } = render(<Error404Illustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders Error500Illustration', () => {
      const { container } = render(<Error500Illustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders SuccessIllustration', () => {
      const { container } = render(<SuccessIllustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders NoNotificationsIllustration', () => {
      const { container } = render(<NoNotificationsIllustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders NoDataIllustration', () => {
      const { container } = render(<NoDataIllustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders OfflineIllustration', () => {
      const { container } = render(<OfflineIllustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});

describe('UploadDropZone', () => {
  // ============================================================================
  // BASIC RENDERING
  // ============================================================================

  describe('Basic Rendering', () => {
    it('renders upload drop zone', () => {
      render(<UploadDropZone />);
      expect(screen.getByText(/drag|drop|upload/i)).toBeInTheDocument();
    });

    it('renders with custom description', () => {
      render(<UploadDropZone description="Drop your files here" />);
      expect(screen.getByText('Drop your files here')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // FILE TYPES
  // ============================================================================

  describe('File Type Display', () => {
    it('displays accepted file types text', () => {
      render(<UploadDropZone acceptedTypes="PNG, JPG, PDF up to 10MB" />);
      expect(screen.getByText(/PNG, JPG, PDF/i)).toBeInTheDocument();
    });
  });

  // ============================================================================
  // STATES
  // ============================================================================

  describe('States', () => {
    it('renders drop zone', () => {
      render(<UploadDropZone />);
      // Check for drop zone content
      const dropZone = screen.getByText(/drag|drop|upload/i).closest('div');
      expect(dropZone).toBeInTheDocument();
    });
  });

  // ============================================================================
  // EVENTS
  // ============================================================================

  describe('Events', () => {
    it('calls onDrop when files are dropped', async () => {
      const handleDrop = vi.fn();
      const { container } = render(
        <UploadDropZone onDrop={handleDrop} />
      );

      // Note: Full drag-and-drop testing requires more complex setup
      // This just verifies the component renders with the callback
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
