import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { brandColors, semanticTokens } from '../../tokens';

export type ModalVariant = 'default' | 'info' | 'success' | 'warning' | 'danger' | 'confirm';

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: ModalVariant;
  /** Primary action button label */
  primaryAction?: string;
  /** Primary action click handler */
  onPrimaryAction?: () => void | Promise<void>;
  /** Secondary action button label */
  secondaryAction?: string;
  /** Secondary action click handler */
  onSecondaryAction?: () => void;
  /** Whether primary action is loading */
  loading?: boolean;
  /** Whether primary action is disabled */
  primaryDisabled?: boolean;
  /** Whether to show close button in header */
  showCloseButton?: boolean;
  /** Whether clicking backdrop closes the modal */
  disableBackdropClick?: boolean;
  /** Whether pressing escape closes the modal */
  disableEscapeKeyDown?: boolean;
  /** Maximum width */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /** Full width */
  fullWidth?: boolean;
  /** Full screen on mobile */
  fullScreenMobile?: boolean;
  /** Custom footer content */
  footer?: React.ReactNode;
  /** Hide default footer actions */
  hideFooter?: boolean;
  /** Custom styles */
  sx?: object;
}

// Variant configuration
const variantConfig: Record<ModalVariant, {
  icon: React.ReactNode;
  color: string;
  primaryColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}> = {
  default: {
    icon: null,
    color: brandColors.primary.main,
    primaryColor: 'primary',
  },
  info: {
    icon: <InfoIcon />,
    color: semanticTokens.colors.status.info.text,
    primaryColor: 'info',
  },
  success: {
    icon: <CheckCircleIcon />,
    color: semanticTokens.colors.status.success.text,
    primaryColor: 'success',
  },
  warning: {
    icon: <WarningIcon />,
    color: semanticTokens.colors.status.warning.text,
    primaryColor: 'warning',
  },
  danger: {
    icon: <ErrorIcon />,
    color: semanticTokens.colors.status.error.text,
    primaryColor: 'error',
  },
  confirm: {
    icon: <HelpOutlineIcon />,
    color: brandColors.primary.main,
    primaryColor: 'primary',
  },
};

/**
 * Modal component provides a consistent dialog pattern for Trinity applications.
 * Supports multiple variants for different use cases.
 *
 * @example
 * ```tsx
 * // Basic modal
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Edit Profile"
 *   primaryAction="Save"
 *   onPrimaryAction={handleSave}
 * >
 *   <TextField label="Name" fullWidth />
 * </Modal>
 *
 * // Danger confirmation
 * <Modal
 *   open={showDelete}
 *   onClose={() => setShowDelete(false)}
 *   variant="danger"
 *   title="Delete Item"
 *   primaryAction="Delete"
 *   onPrimaryAction={handleDelete}
 * >
 *   Are you sure you want to delete this item? This action cannot be undone.
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  variant = 'default',
  primaryAction,
  onPrimaryAction,
  secondaryAction = 'Cancel',
  onSecondaryAction,
  loading = false,
  primaryDisabled = false,
  showCloseButton = true,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  maxWidth = 'sm',
  fullWidth = true,
  fullScreenMobile = false,
  footer,
  hideFooter = false,
  sx,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const config = variantConfig[variant];

  const handleClose = (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && disableBackdropClick) return;
    if (reason === 'escapeKeyDown' && disableEscapeKeyDown) return;
    onClose();
  };

  const handlePrimaryAction = async () => {
    if (onPrimaryAction) {
      const result = onPrimaryAction();
      if (result instanceof Promise) {
        setIsLoading(true);
        try {
          await result;
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleSecondaryAction = () => {
    onSecondaryAction?.();
    onClose();
  };

  const showLoader = loading || isLoading;

  // Generate unique IDs for accessibility
  const titleId = React.useId();
  const descriptionId = React.useId();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreenMobile ? undefined : false}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={children ? descriptionId : undefined}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '12px',
          ...sx,
        },
      }}
    >
      {/* Header */}
      {(title || showCloseButton) && (
        <DialogTitle
          id={titleId}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            pr: showCloseButton ? 6 : 3,
          }}
        >
          {config.icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: `${config.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& .MuiSvgIcon-root': {
                  color: config.color,
                  fontSize: 24,
                },
              }}
            >
              {config.icon}
            </Box>
          )}
          <Typography variant="h6" component="span" fontWeight={600}>
            {title}
          </Typography>
          {showCloseButton && (
            <IconButton
              onClick={onClose}
              disabled={showLoader}
              aria-label="Close dialog"
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'text.secondary',
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      {/* Content */}
      <DialogContent id={descriptionId} dividers={variant === 'default'}>
        {typeof children === 'string' ? (
          <DialogContentText>{children}</DialogContentText>
        ) : (
          children
        )}
      </DialogContent>

      {/* Footer */}
      {!hideFooter && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          {footer || (
            <>
              {secondaryAction && (
                <Button
                  onClick={handleSecondaryAction}
                  disabled={showLoader}
                  color="inherit"
                >
                  {secondaryAction}
                </Button>
              )}
              {primaryAction && (
                <Button
                  onClick={handlePrimaryAction}
                  disabled={primaryDisabled || showLoader}
                  variant="contained"
                  color={config.primaryColor}
                  startIcon={showLoader ? <CircularProgress size={16} color="inherit" /> : undefined}
                >
                  {primaryAction}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

// ============================================
// ConfirmDialog - Simplified confirmation modal
// ============================================

export interface ConfirmDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog closes */
  onClose: () => void;
  /** Callback when user confirms */
  onConfirm: () => void | Promise<void>;
  /** Dialog title */
  title?: string;
  /** Dialog message */
  message?: string;
  /** Confirm button label */
  confirmLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Visual variant */
  variant?: 'default' | 'danger' | 'warning';
  /** Whether confirmation is loading */
  loading?: boolean;
}

/**
 * ConfirmDialog provides a simple "Are you sure?" pattern.
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *   open={showConfirm}
 *   onClose={() => setShowConfirm(false)}
 *   onConfirm={handleDelete}
 *   title="Delete Item"
 *   message="Are you sure you want to delete this item?"
 *   variant="danger"
 *   confirmLabel="Delete"
 * />
 * ```
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  loading = false,
}) => {
  const modalVariant = variant === 'default' ? 'confirm' : variant;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      variant={modalVariant}
      primaryAction={confirmLabel}
      onPrimaryAction={onConfirm}
      secondaryAction={cancelLabel}
      loading={loading}
      maxWidth="xs"
    >
      <Typography color="text.secondary">{message}</Typography>
    </Modal>
  );
};

// ============================================
// useConfirmDialog hook
// ============================================

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  variant: 'default' | 'danger' | 'warning';
  confirmLabel: string;
  onConfirm: () => void | Promise<void>;
}

interface _ConfirmDialogContextType {
  confirm: (options: Partial<ConfirmDialogState> & { onConfirm: () => void | Promise<void> }) => void;
  close: () => void;
  state: ConfirmDialogState;
}

const defaultState: ConfirmDialogState = {
  isOpen: false,
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  variant: 'default',
  confirmLabel: 'Confirm',
  onConfirm: () => {},
};

/**
 * Hook for programmatically showing confirmation dialogs.
 *
 * @example
 * ```tsx
 * // In your component
 * const { confirm, state, close } = useConfirmDialog();
 *
 * const handleDelete = () => {
 *   confirm({
 *     title: 'Delete Item',
 *     message: 'This cannot be undone.',
 *     variant: 'danger',
 *     confirmLabel: 'Delete',
 *     onConfirm: async () => {
 *       await deleteItem();
 *       close();
 *     },
 *   });
 * };
 *
 * // Render the dialog
 * <ConfirmDialog
 *   open={state.isOpen}
 *   onClose={close}
 *   onConfirm={state.onConfirm}
 *   title={state.title}
 *   message={state.message}
 *   variant={state.variant}
 *   confirmLabel={state.confirmLabel}
 * />
 * ```
 */
export const useConfirmDialog = () => {
  const [state, setState] = useState<ConfirmDialogState>(defaultState);

  const confirm = useCallback(
    (options: Partial<ConfirmDialogState> & { onConfirm: () => void | Promise<void> }) => {
      setState({
        ...defaultState,
        ...options,
        isOpen: true,
      });
    },
    []
  );

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return { confirm, close, state };
};

export default Modal;
