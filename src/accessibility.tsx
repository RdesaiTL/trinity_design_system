/**
 * Trinity Accessibility Utilities
 * Helpers for building accessible components
 * 
 * @module accessibility
 */

import { useEffect, useRef, useState, useCallback } from 'react';

// ============================================================================
// FOCUS TRAP HOOK
// ============================================================================

export interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  enabled?: boolean;
  /** Initial element to focus (selector or element) */
  initialFocus?: string | HTMLElement | null;
  /** Element to return focus to when trap is deactivated */
  returnFocus?: boolean;
  /** Whether to include tab navigation wrapping */
  wrapFocus?: boolean;
}

export interface UseFocusTrapReturn {
  /** Ref to attach to the container element */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Activate the focus trap */
  activate: () => void;
  /** Deactivate the focus trap */
  deactivate: () => void;
  /** Whether the trap is currently active */
  isActive: boolean;
}

/**
 * Hook to trap focus within a container element.
 * Useful for modals, dialogs, and dropdown menus.
 */
export const useFocusTrap = ({
  enabled = true,
  initialFocus,
  returnFocus = true,
  wrapFocus = true,
}: UseFocusTrapOptions = {}): UseFocusTrapReturn => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');
    
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter((el) => el.offsetParent !== null);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isActive || !wrapFocus) return;
    
    if (event.key === 'Tab') {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }, [isActive, wrapFocus, getFocusableElements]);

  const activate = useCallback(() => {
    if (!containerRef.current) return;
    
    previousActiveElement.current = document.activeElement as HTMLElement;
    setIsActive(true);
    
    // Focus initial element or first focusable element
    setTimeout(() => {
      if (initialFocus) {
        const element = typeof initialFocus === 'string'
          ? containerRef.current?.querySelector<HTMLElement>(initialFocus)
          : initialFocus;
        element?.focus();
      } else {
        const focusable = getFocusableElements();
        focusable[0]?.focus();
      }
    }, 0);
  }, [initialFocus, getFocusableElements]);

  const deactivate = useCallback(() => {
    setIsActive(false);
    
    if (returnFocus && previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [returnFocus]);

  useEffect(() => {
    if (enabled && isActive) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [enabled, isActive, handleKeyDown]);

  return {
    containerRef,
    activate,
    deactivate,
    isActive,
  };
};

// ============================================================================
// REDUCED MOTION HOOK
// ============================================================================

/**
 * Hook to detect user's reduced motion preference.
 * Use this to disable animations for users who have requested reduced motion.
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// ============================================================================
// SKIP LINK COMPONENT
// ============================================================================

import React from 'react';
import { Box, Button, SxProps, Theme } from '@mui/material';

export interface SkipLinkProps {
  /** Target element ID to skip to */
  targetId: string;
  /** Link text */
  label?: string;
  /** Custom styles */
  sx?: SxProps<Theme>;
}

/**
 * Skip Link - Provides keyboard users a way to skip navigation.
 * Should be the first focusable element on the page.
 */
export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId,
  label = 'Skip to main content',
  sx,
}) => {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.removeAttribute('tabindex');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <Button
      component="a"
      href={`#${targetId}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      sx={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        zIndex: 9999,
        '&:focus': {
          position: 'fixed',
          top: 16,
          left: 16,
          width: 'auto',
          height: 'auto',
          overflow: 'visible',
          padding: '12px 24px',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 600,
          borderRadius: 2,
          boxShadow: 3,
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};

// ============================================================================
// ARIA LIVE REGION HOOK
// ============================================================================

export interface UseAriaLiveOptions {
  /** Politeness level */
  politeness?: 'polite' | 'assertive' | 'off';
  /** Whether the region is atomic */
  atomic?: boolean;
  /** Relevance filter */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}

export interface UseAriaLiveReturn {
  /** Announce a message */
  announce: (message: string) => void;
  /** Clear the current announcement */
  clear: () => void;
  /** Current message */
  message: string;
  /** ARIA attributes to spread */
  ariaProps: {
    role: 'status' | 'alert';
    'aria-live': 'polite' | 'assertive' | 'off';
    'aria-atomic': boolean;
    'aria-relevant'?: 'additions' | 'removals' | 'text' | 'all';
  };
}

/**
 * Hook for managing ARIA live regions.
 * Useful for announcing dynamic content changes to screen readers.
 */
export const useAriaLive = ({
  politeness = 'polite',
  atomic = true,
  relevant,
}: UseAriaLiveOptions = {}): UseAriaLiveReturn => {
  const [message, setMessage] = useState('');

  const announce = useCallback((newMessage: string) => {
    setMessage('');
    // Clear then set to ensure the announcement is made even if the same message
    setTimeout(() => setMessage(newMessage), 50);
  }, []);

  const clear = useCallback(() => {
    setMessage('');
  }, []);

  const ariaProps = {
    role: (politeness === 'assertive' ? 'alert' : 'status') as 'status' | 'alert',
    'aria-live': politeness,
    'aria-atomic': atomic,
    ...(relevant && { 'aria-relevant': relevant }),
  };

  return {
    announce,
    clear,
    message,
    ariaProps,
  };
};

// ============================================================================
// VISUALLY HIDDEN COMPONENT
// ============================================================================

export interface VisuallyHiddenProps {
  /** Content to hide visually but keep accessible */
  children: React.ReactNode;
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Visually Hidden - Hides content visually while keeping it accessible.
 * Useful for providing additional context to screen readers.
 */
export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  as: Component = 'span',
}) => {
  return (
    <Box
      component={Component}
      sx={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {children}
    </Box>
  );
};

// ============================================================================
// KEYBOARD NAVIGATION HOOK
// ============================================================================

export type NavigationDirection = 'horizontal' | 'vertical' | 'both';

export interface UseRovingTabIndexOptions {
  /** List of item refs */
  items: React.RefObject<HTMLElement | null>[];
  /** Current focused index */
  currentIndex?: number;
  /** Navigation direction */
  direction?: NavigationDirection;
  /** Whether navigation wraps */
  wrap?: boolean;
  /** Callback when index changes */
  onIndexChange?: (index: number) => void;
}

export interface UseRovingTabIndexReturn {
  /** Current focused index */
  focusedIndex: number;
  /** Set focused index */
  setFocusedIndex: (index: number) => void;
  /** Key down handler to attach to container */
  handleKeyDown: (event: React.KeyboardEvent) => void;
  /** Get tabindex for an item */
  getTabIndex: (index: number) => 0 | -1;
}

/**
 * Hook for implementing roving tabindex keyboard navigation.
 * Useful for lists, tabs, and other navigable components.
 */
export const useRovingTabIndex = ({
  items,
  currentIndex = 0,
  direction = 'vertical',
  wrap = true,
  onIndexChange,
}: UseRovingTabIndexOptions): UseRovingTabIndexReturn => {
  const [focusedIndex, setFocusedIndexState] = useState(currentIndex);

  const setFocusedIndex = useCallback((index: number) => {
    setFocusedIndexState(index);
    onIndexChange?.(index);
    items[index]?.current?.focus();
  }, [items, onIndexChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const { key } = event;
    const isHorizontal = direction === 'horizontal' || direction === 'both';
    const isVertical = direction === 'vertical' || direction === 'both';

    let nextIndex = focusedIndex;

    if ((key === 'ArrowDown' && isVertical) || (key === 'ArrowRight' && isHorizontal)) {
      event.preventDefault();
      nextIndex = focusedIndex + 1;
      if (nextIndex >= items.length) {
        nextIndex = wrap ? 0 : items.length - 1;
      }
    } else if ((key === 'ArrowUp' && isVertical) || (key === 'ArrowLeft' && isHorizontal)) {
      event.preventDefault();
      nextIndex = focusedIndex - 1;
      if (nextIndex < 0) {
        nextIndex = wrap ? items.length - 1 : 0;
      }
    } else if (key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (key === 'End') {
      event.preventDefault();
      nextIndex = items.length - 1;
    }

    if (nextIndex !== focusedIndex) {
      setFocusedIndex(nextIndex);
    }
  }, [focusedIndex, items.length, direction, wrap, setFocusedIndex]);

  const getTabIndex = useCallback((index: number): 0 | -1 => {
    return index === focusedIndex ? 0 : -1;
  }, [focusedIndex]);

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
    getTabIndex,
  };
};
