import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
} from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Button,
  Box,
  Slide,
  Grow,
  Fade,
  Portal,
} from '@mui/material';
import type { SlideProps, GrowProps, FadeProps } from '@mui/material';

export type ToastSeverity = 'success' | 'info' | 'warning' | 'error';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
type TransitionType = 'slide' | 'grow' | 'fade';

export interface ToastOptions {
  /** Message to display */
  message: string;
  /** Optional title */
  title?: string;
  /** Severity level */
  severity?: ToastSeverity;
  /** Auto-hide duration in ms. Set to null to disable auto-hide. */
  duration?: number | null;
  /** Action button label */
  action?: string;
  /** Action button click handler */
  onAction?: () => void;
  /** Position on screen */
  position?: ToastPosition;
  /** Transition animation */
  transition?: TransitionType;
  /** Whether the toast can be dismissed */
  dismissible?: boolean;
}

export interface ToastProps extends ToastOptions {
  /** Unique identifier */
  id: string;
  /** Whether the toast is visible */
  open: boolean;
  /** Callback when toast should close */
  onClose: () => void;
}

interface ToastContextType {
  /** Show a toast notification */
  toast: (options: ToastOptions) => string;
  /** Show a success toast */
  success: (message: string, options?: Partial<ToastOptions>) => string;
  /** Show an info toast */
  info: (message: string, options?: Partial<ToastOptions>) => string;
  /** Show a warning toast */
  warning: (message: string, options?: Partial<ToastOptions>) => string;
  /** Show an error toast */
  error: (message: string, options?: Partial<ToastOptions>) => string;
  /** Dismiss a specific toast by ID */
  dismiss: (id: string) => void;
  /** Dismiss all toasts */
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Default position for all toasts */
  defaultPosition?: ToastPosition;
  /** Default duration in ms */
  defaultDuration?: number;
  /** Maximum number of toasts to show at once */
  maxToasts?: number;
  /** Default transition animation */
  defaultTransition?: TransitionType;
}

interface ToastState extends ToastOptions {
  id: string;
  open: boolean;
}

// Transition components
const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="left" />;
};

const GrowTransition = (props: GrowProps) => {
  return <Grow {...props} />;
};

const FadeTransition = (props: FadeProps) => {
  return <Fade {...props} />;
};

// Helper to get anchor origin from position
const getAnchorOrigin = (
  position: ToastPosition
): { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' } => {
  const [vertical, horizontal] = position.split('-') as [
    'top' | 'bottom',
    'left' | 'center' | 'right'
  ];
  return { vertical, horizontal };
};

// Helper to get transition component
const getTransitionComponent = (transition: TransitionType) => {
  switch (transition) {
    case 'slide':
      return SlideTransition;
    case 'grow':
      return GrowTransition;
    case 'fade':
      return FadeTransition;
    default:
      return SlideTransition;
  }
};

/**
 * Single Toast component
 */
export const Toast: React.FC<ToastProps> = ({
  id: _id,
  message,
  title,
  severity = 'info',
  duration = 5000,
  action,
  onAction,
  position = 'top-right',
  transition = 'slide',
  dismissible = true,
  open,
  onClose,
}) => {
  const anchorOrigin = getAnchorOrigin(position);
  const TransitionComponent = getTransitionComponent(transition);

  const handleAction = () => {
    onAction?.();
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      TransitionComponent={TransitionComponent}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={dismissible ? onClose : undefined}
        action={
          action ? (
            <Button color="inherit" size="small" onClick={handleAction}>
              {action}
            </Button>
          ) : undefined
        }
        sx={{
          width: '100%',
          minWidth: 300,
          maxWidth: 500,
          boxShadow: 3,
          '& .MuiAlert-message': {
            flex: 1,
          },
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

/**
 * ToastProvider manages toast notifications globally.
 *
 * @example
 * ```tsx
 * // Wrap your app
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Use in any component
 * const { toast, success, error } = useToast();
 *
 * success('Changes saved!');
 * error('Something went wrong', { duration: 10000 });
 * toast({ message: 'Custom toast', severity: 'info', action: 'Undo', onAction: handleUndo });
 * ```
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = 'top-right',
  defaultDuration = 5000,
  maxToasts = 5,
  defaultTransition = 'slide',
}) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const toastIdCounter = useRef(0);

  // Generate unique ID
  const generateId = useCallback(() => {
    toastIdCounter.current += 1;
    return `toast-${toastIdCounter.current}-${Date.now()}`;
  }, []);

  // Add a new toast
  const addToast = useCallback(
    (options: ToastOptions): string => {
      const id = generateId();
      const newToast: ToastState = {
        ...options,
        id,
        open: true,
        position: options.position ?? defaultPosition,
        duration: options.duration ?? defaultDuration,
        transition: options.transition ?? defaultTransition,
        dismissible: options.dismissible ?? true,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Limit number of toasts
        if (updated.length > maxToasts) {
          return updated.slice(-maxToasts);
        }
        return updated;
      });

      return id;
    },
    [generateId, defaultPosition, defaultDuration, defaultTransition, maxToasts]
  );

  // Remove a toast
  const removeToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, open: false } : t))
    );
    // Clean up after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  // Dismiss all toasts
  const dismissAll = useCallback(() => {
    setToasts((prev) => prev.map((t) => ({ ...t, open: false })));
    setTimeout(() => {
      setToasts([]);
    }, 300);
  }, []);

  // Convenience methods
  const toast = useCallback(
    (options: ToastOptions) => addToast(options),
    [addToast]
  );

  const success = useCallback(
    (message: string, options?: Partial<ToastOptions>) =>
      addToast({ message, severity: 'success', ...options }),
    [addToast]
  );

  const info = useCallback(
    (message: string, options?: Partial<ToastOptions>) =>
      addToast({ message, severity: 'info', ...options }),
    [addToast]
  );

  const warning = useCallback(
    (message: string, options?: Partial<ToastOptions>) =>
      addToast({ message, severity: 'warning', ...options }),
    [addToast]
  );

  const error = useCallback(
    (message: string, options?: Partial<ToastOptions>) =>
      addToast({ message, severity: 'error', ...options }),
    [addToast]
  );

  const contextValue: ToastContextType = {
    toast,
    success,
    info,
    warning,
    error,
    dismiss: removeToast,
    dismissAll,
  };

  // Group toasts by position
  const toastsByPosition = toasts.reduce((acc, t) => {
    const pos = t.position || defaultPosition;
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(t);
    return acc;
  }, {} as Record<ToastPosition, ToastState[]>);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Portal>
        {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
          <Box
            key={position}
            sx={{
              position: 'fixed',
              zIndex: 9999,
              ...getPositionStyles(position as ToastPosition),
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              pointerEvents: 'none',
              '& > *': {
                pointerEvents: 'auto',
              },
            }}
          >
            {positionToasts.map((t) => (
              <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
            ))}
          </Box>
        ))}
      </Portal>
    </ToastContext.Provider>
  );
};

// Helper to get position styles
const getPositionStyles = (position: ToastPosition) => {
  const styles: Record<string, number | string> = {};
  const spacing = 16;

  if (position.startsWith('top')) styles.top = spacing;
  if (position.startsWith('bottom')) styles.bottom = spacing;
  if (position.endsWith('left')) styles.left = spacing;
  if (position.endsWith('right')) styles.right = spacing;
  if (position.endsWith('center')) {
    styles.left = '50%';
    styles.transform = 'translateX(-50%)';
  }

  return styles;
};

/**
 * Hook to access toast functionality.
 * Must be used within a ToastProvider.
 *
 * @example
 * ```tsx
 * const { success, error, toast, dismissAll } = useToast();
 *
 * // Simple usage
 * success('File uploaded successfully!');
 * error('Failed to save changes');
 *
 * // With options
 * toast({
 *   message: 'New message received',
 *   severity: 'info',
 *   title: 'Notification',
 *   action: 'View',
 *   onAction: () => navigate('/messages'),
 *   duration: 8000,
 * });
 * ```
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
