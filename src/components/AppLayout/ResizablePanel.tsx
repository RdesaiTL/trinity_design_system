/**
 * ResizablePanel Component
 * A panel that can be resized by dragging its edge
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Box, IconButton, Tooltip, SxProps, Theme } from '@mui/material';
import { brandColors } from '../../tokens';

export interface ResizablePanelProps {
  /** Whether the panel is open */
  open: boolean;
  /** Panel content */
  children: React.ReactNode;
  /** Default width of the panel */
  defaultWidth?: number;
  /** Minimum width the panel can be resized to */
  minWidth?: number;
  /** Maximum width the panel can be resized to */
  maxWidth?: number;
  /** Callback when panel is closed */
  onClose?: () => void;
  /** Which side the panel is on */
  side?: 'left' | 'right';
  /** Header content */
  header?: React.ReactNode;
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Custom sx props */
  sx?: SxProps<Theme>;
  /** Custom sx for content area */
  contentSx?: SxProps<Theme>;
}

/**
 * ResizablePanel - A panel that can be resized by dragging.
 * Used for sidebars, AI chat panels, and other expandable content areas.
 */
export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  open,
  children,
  defaultWidth = 400,
  minWidth = 320,
  maxWidth = 800,
  onClose,
  side = 'right',
  header,
  showCloseButton = true,
  sx,
  contentSx,
}) => {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
  }, [width]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const delta = side === 'right' 
      ? startXRef.current - e.clientX 
      : e.clientX - startXRef.current;
    
    const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidthRef.current + delta));
    setWidth(newWidth);
  }, [isResizing, minWidth, maxWidth, side]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  if (!open) return null;

  return (
    <Box
      ref={panelRef}
      sx={{
        position: 'relative',
        width,
        minWidth,
        maxWidth,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderLeft: side === 'right' ? `1px solid ${brandColors.neutral.gray100}` : 'none',
        borderRight: side === 'left' ? `1px solid ${brandColors.neutral.gray100}` : 'none',
        transition: isResizing ? 'none' : 'width 0.1s ease-out',
        overflow: 'hidden',
        flexShrink: 0,
        ...sx,
      }}
    >
      {/* Resize Handle */}
      <Box
        onMouseDown={handleMouseDown}
        sx={{
          position: 'absolute',
          top: 0,
          [side === 'right' ? 'left' : 'right']: 0,
          width: 6,
          height: '100%',
          cursor: 'col-resize',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            '& .resize-indicator': {
              backgroundColor: brandColors.primary.light,
              opacity: 1,
            },
          },
          ...(isResizing && {
            '& .resize-indicator': {
              backgroundColor: brandColors.primary.light,
              opacity: 1,
            },
          }),
        }}
      >
        <Box
          className="resize-indicator"
          sx={{
            width: 3,
            height: 40,
            borderRadius: 2,
            backgroundColor: brandColors.neutral.gray100,
            opacity: 0.5,
            transition: 'all 0.2s',
          }}
        />
      </Box>

      {/* Header */}
      {header && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: `1px solid ${brandColors.neutral.gray100}`,
            flexShrink: 0,
          }}
        >
          <Box sx={{ flex: 1 }}>{header}</Box>
          {showCloseButton && (
            <Tooltip title="Close panel">
              <IconButton
                size="small"
                onClick={onClose}
                sx={{
                  color: brandColors.neutral.gray500,
                  '&:hover': {
                    backgroundColor: brandColors.neutral.gray100,
                  },
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          ...contentSx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ResizablePanel;
