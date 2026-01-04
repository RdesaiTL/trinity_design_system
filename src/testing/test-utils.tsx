/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TRINITY DESIGN SYSTEM — TEST UTILITIES
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Shared utilities, providers, and helpers for consistent testing across
 * all components. Use these instead of raw Testing Library imports.
 * 
 * @module testing/test-utils
 */

import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { axe } from 'vitest-axe';
import type { AxeResults } from 'axe-core';
import { expect, vi } from 'vitest';
import { lightTheme, darkTheme } from '../theme';

// ═══════════════════════════════════════════════════════════════════════════════
// THEME PROVIDER WRAPPER
// ═══════════════════════════════════════════════════════════════════════════════

interface _WrapperProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
}

/**
 * Creates a wrapper with MUI ThemeProvider
 */
const createWrapper = (theme: 'light' | 'dark' = 'light') => {
  const muiTheme = theme === 'light' ? lightTheme : darkTheme;
  
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  };
};

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOM RENDER
// ═══════════════════════════════════════════════════════════════════════════════

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark';
}

interface CustomRenderResult extends RenderResult {
  user: UserEvent;
}

/**
 * Custom render function that wraps component with theme provider
 * and sets up userEvent for interaction testing
 */
function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {}
): CustomRenderResult {
  const { theme = 'light', ...renderOptions } = options;
  
  const user = userEvent.setup();
  
  const result = render(ui, {
    wrapper: createWrapper(theme),
    ...renderOptions,
  });

  return {
    ...result,
    user,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACCESSIBILITY TESTING
// ═══════════════════════════════════════════════════════════════════════════════

interface A11yOptions {
  /** axe-core rules to run */
  rules?: Record<string, { enabled: boolean }>;
  /** Elements to exclude from testing */
  exclude?: string[];
}

/**
 * Run accessibility audit on rendered component
 * @returns Promise with axe results
 */
async function checkA11y(
  container: Element | Document = document.body,
  options: A11yOptions = {}
): Promise<AxeResults> {
  const results = await axe(container as Element, {
    rules: {
      // Ensure color contrast
      'color-contrast': { enabled: true },
      // Ensure interactive elements are keyboard accessible
      'keyboard-navigable': { enabled: true },
      // Ensure ARIA attributes are valid
      'aria-valid-attr': { enabled: true },
      'aria-valid-attr-value': { enabled: true },
      // Custom overrides
      ...options.rules,
    },
  });

  return results;
}

/**
 * Assert no accessibility violations
 */
async function expectNoA11yViolations(
  container: Element | Document = document.body,
  options: A11yOptions = {}
): Promise<void> {
  const results = await checkA11y(container, options);
  expect(results).toHaveNoViolations();
}

// ═══════════════════════════════════════════════════════════════════════════════
// KEYBOARD TESTING HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

interface KeyboardTestHelpers {
  /** Press Tab key */
  tab: () => Promise<void>;
  /** Press Shift+Tab */
  shiftTab: () => Promise<void>;
  /** Press Enter */
  enter: () => Promise<void>;
  /** Press Space */
  space: () => Promise<void>;
  /** Press Escape */
  escape: () => Promise<void>;
  /** Press Arrow Down */
  arrowDown: () => Promise<void>;
  /** Press Arrow Up */
  arrowUp: () => Promise<void>;
  /** Press Arrow Left */
  arrowLeft: () => Promise<void>;
  /** Press Arrow Right */
  arrowRight: () => Promise<void>;
  /** Press Home */
  home: () => Promise<void>;
  /** Press End */
  end: () => Promise<void>;
  /** Type text */
  type: (text: string) => Promise<void>;
}

/**
 * Create keyboard interaction helpers
 */
function createKeyboardHelpers(user: UserEvent): KeyboardTestHelpers {
  return {
    tab: () => user.tab(),
    shiftTab: () => user.tab({ shift: true }),
    enter: () => user.keyboard('{Enter}'),
    space: () => user.keyboard(' '),
    escape: () => user.keyboard('{Escape}'),
    arrowDown: () => user.keyboard('{ArrowDown}'),
    arrowUp: () => user.keyboard('{ArrowUp}'),
    arrowLeft: () => user.keyboard('{ArrowLeft}'),
    arrowRight: () => user.keyboard('{ArrowRight}'),
    home: () => user.keyboard('{Home}'),
    end: () => user.keyboard('{End}'),
    type: (text: string) => user.keyboard(text),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOCUS TESTING HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Assert element has focus
 */
function expectFocused(element: HTMLElement): void {
  expect(element).toHaveFocus();
}

/**
 * Assert element is in tab order (tabindex >= 0 or naturally focusable)
 */
function expectInTabOrder(element: HTMLElement): void {
  const tabIndex = element.getAttribute('tabindex');
  const isFocusableElement = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'].includes(element.tagName);
  
  expect(
    isFocusableElement || (tabIndex !== null && parseInt(tabIndex) >= 0)
  ).toBe(true);
}

/**
 * Assert element is NOT in tab order
 */
function expectNotInTabOrder(element: HTMLElement): void {
  const tabIndex = element.getAttribute('tabindex');
  expect(tabIndex).toBe('-1');
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARIA TESTING HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Assert element has correct ARIA role
 */
function expectRole(element: HTMLElement, role: string): void {
  expect(element).toHaveAttribute('role', role);
}

/**
 * Assert element has aria-label or aria-labelledby
 */
function expectAccessibleName(element: HTMLElement): void {
  const hasLabel = element.hasAttribute('aria-label');
  const hasLabelledBy = element.hasAttribute('aria-labelledby');
  const hasTitle = element.hasAttribute('title');
  
  expect(hasLabel || hasLabelledBy || hasTitle).toBe(true);
}

/**
 * Assert aria-expanded state
 */
function expectExpanded(element: HTMLElement, expanded: boolean): void {
  expect(element).toHaveAttribute('aria-expanded', String(expanded));
}

/**
 * Assert aria-selected state
 */
function expectSelected(element: HTMLElement, selected: boolean): void {
  expect(element).toHaveAttribute('aria-selected', String(selected));
}

/**
 * Assert aria-disabled state
 */
function expectAriaDisabled(element: HTMLElement, disabled: boolean): void {
  expect(element).toHaveAttribute('aria-disabled', String(disabled));
}

// ═══════════════════════════════════════════════════════════════════════════════
// MOCK HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create a mock callback that can be awaited
 */
function createMockCallback<T = void>(): {
  fn: ReturnType<typeof vi.fn>;
  waitForCall: () => Promise<void>;
} {
  let resolveCall: () => void;
  const callPromise = new Promise<void>((resolve) => {
    resolveCall = resolve;
  });

  const fn = vi.fn(async () => {
    resolveCall();
    return undefined as T;
  });

  return {
    fn,
    waitForCall: () => callPromise,
  };
}

/**
 * Mock window.matchMedia for responsive/reduced motion tests
 */
function mockMatchMedia(matches: boolean = false): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// WAIT HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Wait for animation frame (useful for transition tests)
 */
function waitForAnimationFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

/**
 * Wait for MUI transitions (default 225ms)
 */
function waitForTransition(ms: number = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ═══════════════════════════════════════════════════════════════════════════════
// RE-EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

// Re-export everything from Testing Library
export * from '@testing-library/react';
export { userEvent };

// Export custom utilities
export {
  customRender as render,
  checkA11y,
  expectNoA11yViolations,
  createKeyboardHelpers,
  expectFocused,
  expectInTabOrder,
  expectNotInTabOrder,
  expectRole,
  expectAccessibleName,
  expectExpanded,
  expectSelected,
  expectAriaDisabled,
  createMockCallback,
  mockMatchMedia,
  waitForAnimationFrame,
  waitForTransition,
  createWrapper,
};

// Export types
export type { CustomRenderOptions, CustomRenderResult, KeyboardTestHelpers, A11yOptions };
