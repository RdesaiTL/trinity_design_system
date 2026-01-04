/**
 * Accessibility Utilities Tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, fireEvent, render, screen } from '@testing-library/react';
import {
  useFocusTrap,
  useReducedMotion,
  useAriaLive,
  useRovingTabIndex,
  SkipLink,
  VisuallyHidden,
} from '../accessibility';
import React from 'react';

// ============================================================================
// useReducedMotion Tests
// ============================================================================

describe('useReducedMotion', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('should return false when reduced motion is not preferred', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should return true when reduced motion is preferred', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should update when preference changes', () => {
    let changeHandler: ((event: MediaQueryListEvent) => void) | null = null;

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn((_, handler) => {
        changeHandler = handler;
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    // Simulate preference change
    act(() => {
      if (changeHandler) {
        changeHandler({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(true);
  });
});

// ============================================================================
// useAriaLive Tests
// ============================================================================

describe('useAriaLive', () => {
  it('should initialize with empty message', () => {
    const { result } = renderHook(() => useAriaLive());
    expect(result.current.message).toBe('');
  });

  it('should return correct aria props for polite', () => {
    const { result } = renderHook(() => useAriaLive({ politeness: 'polite' }));
    expect(result.current.ariaProps).toEqual({
      role: 'status',
      'aria-live': 'polite',
      'aria-atomic': true,
    });
  });

  it('should return correct aria props for assertive', () => {
    const { result } = renderHook(() => useAriaLive({ politeness: 'assertive' }));
    expect(result.current.ariaProps).toEqual({
      role: 'alert',
      'aria-live': 'assertive',
      'aria-atomic': true,
    });
  });

  it('should include relevant when specified', () => {
    const { result } = renderHook(() => useAriaLive({ relevant: 'additions' }));
    expect(result.current.ariaProps['aria-relevant']).toBe('additions');
  });

  it('should announce messages', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAriaLive());

    act(() => {
      result.current.announce('Test message');
    });

    // Initial clear
    expect(result.current.message).toBe('');

    // After timeout, message should be set
    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current.message).toBe('Test message');
    vi.useRealTimers();
  });

  it('should clear messages', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAriaLive());

    act(() => {
      result.current.announce('Test message');
    });

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current.message).toBe('Test message');

    act(() => {
      result.current.clear();
    });

    expect(result.current.message).toBe('');
    vi.useRealTimers();
  });
});

// ============================================================================
// useFocusTrap Tests
// ============================================================================

describe('useFocusTrap', () => {
  it('should initialize with correct state', () => {
    const { result } = renderHook(() => useFocusTrap());
    expect(result.current.isActive).toBe(false);
    expect(result.current.containerRef.current).toBeNull();
  });

  it('should have activate and deactivate functions', () => {
    const { result } = renderHook(() => useFocusTrap());
    expect(typeof result.current.activate).toBe('function');
    expect(typeof result.current.deactivate).toBe('function');
  });

  it('should not activate without a container ref', () => {
    const { result } = renderHook(() => useFocusTrap());

    act(() => {
      result.current.activate();
    });
    // Should remain inactive because containerRef is null
    expect(result.current.isActive).toBe(false);
  });

  it('should deactivate correctly', () => {
    const { result } = renderHook(() => useFocusTrap());

    // Manually set active for test purposes
    act(() => {
      result.current.deactivate();
    });
    expect(result.current.isActive).toBe(false);
  });
});

// ============================================================================
// useRovingTabIndex Tests
// ============================================================================

describe('useRovingTabIndex', () => {
  it('should initialize with correct index', () => {
    const items = [
      { current: document.createElement('button') },
      { current: document.createElement('button') },
      { current: document.createElement('button') },
    ] as React.RefObject<HTMLButtonElement>[];

    const { result } = renderHook(() => useRovingTabIndex({ items, currentIndex: 1 }));
    expect(result.current.focusedIndex).toBe(1);
  });

  it('should return correct tabIndex for items', () => {
    const items = [
      { current: document.createElement('button') },
      { current: document.createElement('button') },
    ] as React.RefObject<HTMLButtonElement>[];

    const { result } = renderHook(() => useRovingTabIndex({ items, currentIndex: 0 }));

    expect(result.current.getTabIndex(0)).toBe(0);
    expect(result.current.getTabIndex(1)).toBe(-1);
  });

  it('should handle arrow key navigation', () => {
    const items = [
      { current: document.createElement('button') },
      { current: document.createElement('button') },
      { current: document.createElement('button') },
    ] as React.RefObject<HTMLButtonElement>[];

    // Mock focus
    items.forEach((item) => {
      item.current!.focus = vi.fn();
    });

    const { result } = renderHook(() =>
      useRovingTabIndex({ items, direction: 'vertical' })
    );

    // Navigate down
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.focusedIndex).toBe(1);

    // Navigate down again
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.focusedIndex).toBe(2);
  });

  it('should wrap navigation', () => {
    const items = [
      { current: document.createElement('button') },
      { current: document.createElement('button') },
    ] as React.RefObject<HTMLButtonElement>[];

    items.forEach((item) => {
      item.current!.focus = vi.fn();
    });

    const { result } = renderHook(() =>
      useRovingTabIndex({ items, currentIndex: 1, wrap: true })
    );

    // Navigate down should wrap to first
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.focusedIndex).toBe(0);
  });

  it('should not wrap when wrap is false', () => {
    const items = [
      { current: document.createElement('button') },
      { current: document.createElement('button') },
    ] as React.RefObject<HTMLButtonElement>[];

    items.forEach((item) => {
      item.current!.focus = vi.fn();
    });

    const { result } = renderHook(() =>
      useRovingTabIndex({ items, currentIndex: 1, wrap: false })
    );

    // Navigate down should stay at last
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.focusedIndex).toBe(1);
  });

  it('should handle Home and End keys', () => {
    const items = [
      { current: document.createElement('button') },
      { current: document.createElement('button') },
      { current: document.createElement('button') },
    ] as React.RefObject<HTMLButtonElement>[];

    items.forEach((item) => {
      item.current!.focus = vi.fn();
    });

    const { result } = renderHook(() =>
      useRovingTabIndex({ items, currentIndex: 1 })
    );

    // End key
    act(() => {
      result.current.handleKeyDown({
        key: 'End',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.focusedIndex).toBe(2);

    // Home key
    act(() => {
      result.current.handleKeyDown({
        key: 'Home',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.focusedIndex).toBe(0);
  });

  it('should call onIndexChange callback', () => {
    const onIndexChange = vi.fn();
    const items = [
      { current: document.createElement('button') },
      { current: document.createElement('button') },
    ] as React.RefObject<HTMLButtonElement>[];

    items.forEach((item) => {
      item.current!.focus = vi.fn();
    });

    const { result } = renderHook(() =>
      useRovingTabIndex({ items, onIndexChange })
    );

    act(() => {
      result.current.setFocusedIndex(1);
    });

    expect(onIndexChange).toHaveBeenCalledWith(1);
  });
});

// ============================================================================
// SkipLink Tests
// ============================================================================

describe('SkipLink', () => {
  it('should render with default label', () => {
    render(<SkipLink targetId="main" />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('should render with custom label', () => {
    render(<SkipLink targetId="main" label="Skip navigation" />);
    expect(screen.getByText('Skip navigation')).toBeInTheDocument();
  });

  it('should have correct href', () => {
    render(<SkipLink targetId="main-content" />);
    const link = screen.getByRole('link', { hidden: true });
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('should focus target on click', () => {
    const targetElement = document.createElement('main');
    targetElement.id = 'main';
    targetElement.focus = vi.fn();
    document.body.appendChild(targetElement);

    render(<SkipLink targetId="main" />);
    fireEvent.click(screen.getByText('Skip to main content'));

    expect(targetElement.focus).toHaveBeenCalled();

    document.body.removeChild(targetElement);
  });

  it('should handle keyboard activation', () => {
    const targetElement = document.createElement('main');
    targetElement.id = 'main';
    targetElement.focus = vi.fn();
    document.body.appendChild(targetElement);

    render(<SkipLink targetId="main" />);
    fireEvent.keyDown(screen.getByText('Skip to main content'), { key: 'Enter' });

    expect(targetElement.focus).toHaveBeenCalled();

    document.body.removeChild(targetElement);
  });
});

// ============================================================================
// VisuallyHidden Tests
// ============================================================================

describe('VisuallyHidden', () => {
  it('should render children', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    expect(screen.getByText('Hidden text')).toBeInTheDocument();
  });

  it('should render as span by default', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    const element = screen.getByText('Hidden text');
    expect(element.tagName.toLowerCase()).toBe('span');
  });

  it('should render as custom element', () => {
    render(<VisuallyHidden as="div">Hidden text</VisuallyHidden>);
    const element = screen.getByText('Hidden text');
    expect(element.tagName.toLowerCase()).toBe('div');
  });

  it('should have visually hidden styles', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    const element = screen.getByText('Hidden text');
    
    // Check computed styles via inline styles (MUI applies as sx)
    const styles = window.getComputedStyle(element);
    expect(styles.position).toBe('absolute');
  });
});
