import * as React from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { DragIndicator as DragIcon } from '@mui/icons-material';

// ============================================
// Types
// ============================================

export interface SplitPaneProps {
  /** Child panes (must be exactly 2) */
  children: [React.ReactNode, React.ReactNode];
  /** Orientation of the split */
  direction?: 'horizontal' | 'vertical';
  /** Initial size of the first pane (percentage or pixels) */
  defaultSize?: number | string;
  /** Minimum size for panes (pixels) */
  minSize?: number;
  /** Maximum size for first pane (pixels) */
  maxSize?: number;
  /** Size of the resizer handle */
  resizerSize?: number;
  /** Callback when size changes */
  onResize?: (size: number) => void;
  /** Callback when resize starts */
  onResizeStart?: () => void;
  /** Callback when resize ends */
  onResizeEnd?: (size: number) => void;
  /** Show visual indicator on resizer */
  showResizerIcon?: boolean;
  /** Allow double-click to reset to default */
  doubleClickReset?: boolean;
  /** Collapse first pane */
  collapsedFirst?: boolean;
  /** Collapse second pane */
  collapsedSecond?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  sx?: Record<string, unknown>;
}

// ============================================
// Resizer Component
// ============================================

interface ResizerProps {
  direction: 'horizontal' | 'vertical';
  resizerSize: number;
  showResizerIcon: boolean;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onDoubleClick?: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  valueNow: number;
  valueMin: number;
  valueMax: number;
}

const Resizer: React.FC<ResizerProps> = ({
  direction,
  resizerSize,
  showResizerIcon,
  isDragging,
  onMouseDown,
  onDoubleClick,
  onKeyDown,
  valueNow,
  valueMin,
  valueMax,
}) => {
  const theme = useTheme();
  const isHorizontal = direction === 'horizontal';

  return (
    <Box
      role="separator"
      aria-valuenow={Math.round(valueNow)}
      aria-valuemin={valueMin}
      aria-valuemax={valueMax}
      aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
      aria-label={`Resize ${isHorizontal ? 'horizontally' : 'vertically'}`}
      tabIndex={0}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      sx={{
        position: 'relative',
        flexShrink: 0,
        backgroundColor: isDragging
          ? alpha(theme.palette.primary.main, 0.2)
          : theme.palette.divider,
        transition: isDragging ? 'none' : 'background-color 150ms ease',
        cursor: isHorizontal ? 'col-resize' : 'row-resize',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isHorizontal
          ? {
              width: resizerSize,
              minWidth: resizerSize,
              height: '100%',
            }
          : {
              height: resizerSize,
              minHeight: resizerSize,
              width: '100%',
            }),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.15),
        },
        '&:active': {
          backgroundColor: alpha(theme.palette.primary.main, 0.25),
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        },
        '&:focus-visible': {
          outline: 'none',
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        },
        // Expanded hit area
        '&::before': {
          content: '""',
          position: 'absolute',
          ...(isHorizontal
            ? {
                top: 0,
                bottom: 0,
                left: -4,
                right: -4,
              }
            : {
                left: 0,
                right: 0,
                top: -4,
                bottom: -4,
              }),
        },
      }}
    >
      {showResizerIcon && (
        <DragIcon
          fontSize="small"
          sx={{
            color: isDragging
              ? theme.palette.primary.main
              : theme.palette.action.active,
            transform: isHorizontal ? 'rotate(90deg)' : 'none',
            opacity: isDragging ? 1 : 0.6,
            transition: 'opacity 150ms ease',
          }}
        />
      )}
    </Box>
  );
};

// ============================================
// SplitPane Component
// ============================================

export const SplitPane: React.FC<SplitPaneProps> = ({
  children,
  direction = 'horizontal',
  defaultSize = '50%',
  minSize = 50,
  maxSize,
  resizerSize = 6,
  onResize,
  onResizeStart,
  onResizeEnd,
  showResizerIcon = true,
  doubleClickReset = true,
  collapsedFirst = false,
  collapsedSecond = false,
  className,
  sx,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const initialSizeRef = React.useRef<number>(0);
  const startPosRef = React.useRef<number>(0);

  const isHorizontal = direction === 'horizontal';
  const [firstPane, secondPane] = children;

  // Parse initial size
  const parseInitialSize = React.useCallback((): number => {
    if (typeof defaultSize === 'number') {
      return defaultSize;
    }
    if (typeof defaultSize === 'string' && defaultSize.endsWith('%')) {
      const container = containerRef.current;
      if (container) {
        const containerSize = isHorizontal
          ? container.offsetWidth
          : container.offsetHeight;
        return (parseFloat(defaultSize) / 100) * (containerSize - resizerSize);
      }
    }
    return 200; // Fallback
  }, [defaultSize, isHorizontal, resizerSize]);

  // Initialize size on mount
  React.useEffect(() => {
    if (size === null && containerRef.current) {
      setSize(parseInitialSize());
    }
  }, [size, parseInitialSize]);

  // Handle container resize
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!isDragging && size === null) {
        setSize(parseInitialSize());
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [isDragging, parseInitialSize, size]);

  // Clamp size within bounds
  const clampSize = React.useCallback(
    (newSize: number): number => {
      const container = containerRef.current;
      if (!container) return newSize;

      const containerSize = isHorizontal
        ? container.offsetWidth
        : container.offsetHeight;
      const maxAllowed = maxSize || containerSize - resizerSize - minSize;

      return Math.max(minSize, Math.min(maxAllowed, newSize));
    },
    [isHorizontal, maxSize, minSize, resizerSize]
  );

  // Handle mouse down on resizer
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      initialSizeRef.current = size || parseInitialSize();
      startPosRef.current = isHorizontal ? e.clientX : e.clientY;
      onResizeStart?.();
    },
    [isHorizontal, onResizeStart, parseInitialSize, size]
  );

  // Handle mouse move
  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = isHorizontal ? e.clientX : e.clientY;
      const delta = currentPos - startPosRef.current;
      const newSize = clampSize(initialSizeRef.current + delta);

      setSize(newSize);
      onResize?.(newSize);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (size !== null) {
        onResizeEnd?.(size);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isHorizontal, clampSize, onResize, onResizeEnd, size]);

  // Handle double-click reset
  const handleDoubleClick = React.useCallback(() => {
    if (!doubleClickReset) return;
    const newSize = parseInitialSize();
    setSize(newSize);
    onResize?.(newSize);
    onResizeEnd?.(newSize);
  }, [doubleClickReset, parseInitialSize, onResize, onResizeEnd]);

  // Handle keyboard resize
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 50 : 10; // Larger steps with shift
      const currentSize = size ?? parseInitialSize();
      let newSize = currentSize;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          newSize = clampSize(currentSize - step);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          newSize = clampSize(currentSize + step);
          break;
        case 'Home':
          e.preventDefault();
          newSize = minSize;
          break;
        case 'End':
          e.preventDefault();
          newSize = maxSize || (containerRef.current
            ? (isHorizontal ? containerRef.current.offsetWidth : containerRef.current.offsetHeight) - resizerSize - minSize
            : currentSize);
          break;
        case 'Enter':
          e.preventDefault();
          handleDoubleClick();
          return;
        default:
          return;
      }

      setSize(newSize);
      onResize?.(newSize);
    },
    [size, parseInitialSize, clampSize, minSize, maxSize, isHorizontal, resizerSize, onResize, handleDoubleClick]
  );

  // Calculate pane sizes
  const getFirstPaneStyle = (): React.CSSProperties => {
    if (collapsedFirst) {
      return isHorizontal ? { width: 0 } : { height: 0 };
    }
    if (collapsedSecond) {
      return { flex: 1 };
    }
    const paneSize = size ?? parseInitialSize();
    return isHorizontal ? { width: paneSize } : { height: paneSize };
  };

  const getSecondPaneStyle = (): React.CSSProperties => {
    if (collapsedSecond) {
      return isHorizontal ? { width: 0 } : { height: 0 };
    }
    return { flex: 1 };
  };

  /* eslint-disable react-hooks/refs -- Valid ref access patterns for resize calculations and MUI props */
  return (
    <Box
      ref={containerRef}
      className={className}
      sx={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* First Pane */}
      <Box
        sx={{
          overflow: 'hidden',
          flexShrink: 0,
          transition: isDragging ? 'none' : 'width 200ms ease, height 200ms ease',
          ...getFirstPaneStyle(),
        }}
      >
        {!collapsedFirst && firstPane}
      </Box>

      {/* Resizer */}
      {!collapsedFirst && !collapsedSecond && (
        <Resizer
          direction={direction}
          resizerSize={resizerSize}
          showResizerIcon={showResizerIcon}
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
          onDoubleClick={doubleClickReset ? handleDoubleClick : undefined}
          onKeyDown={handleKeyDown}
          valueNow={size ?? parseInitialSize()}
          valueMin={minSize}
          valueMax={maxSize || (containerRef.current
            ? (isHorizontal ? containerRef.current.offsetWidth : containerRef.current.offsetHeight) - resizerSize - minSize
            : 1000)}
        />
      )}

      {/* Second Pane */}
      <Box
        sx={{
          overflow: 'hidden',
          transition: isDragging ? 'none' : 'width 200ms ease, height 200ms ease',
          ...getSecondPaneStyle(),
        }}
      >
        {!collapsedSecond && secondPane}
      </Box>
    </Box>
  );
  /* eslint-enable react-hooks/refs */
};

export default SplitPane;
