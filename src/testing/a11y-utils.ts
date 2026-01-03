/**
 * Trinity Design System - Accessibility Test Utilities
 * 
 * Centralized utilities for WCAG 2.1 AA compliance testing.
 * All component tests MUST use these utilities for consistency.
 */

import { axe } from 'vitest-axe';
import type { AxeResults, RunOptions } from 'axe-core';

// Re-export axe for convenience
export { axe };

/**
 * Run axe audit with Trinity-specific configuration
 */
export async function runAccessibilityAudit(
  container: Element,
  options?: RunOptions
): Promise<AxeResults> {
  const results = await axe(container, options);
  return results as AxeResults;
}

/**
 * Custom axe run options for specific component types
 * These can be passed to axe() as the second argument
 */
export const axeConfigs = {
  /** Options for Modal/Dialog components */
  dialog: {
    rules: {
      'aria-dialog-name': { enabled: true },
    },
  } as RunOptions,

  /** Options for DataTable/Grid components */
  grid: {
    rules: {
      'aria-required-children': { enabled: true },
      'aria-required-parent': { enabled: true },
    },
  } as RunOptions,

  /** Options for Navigation components */
  navigation: {
    rules: {
      'landmark-unique': { enabled: true },
    },
  } as RunOptions,

  /** Options for Form components */
  form: {
    rules: {
      'autocomplete-valid': { enabled: true },
      'label-title-only': { enabled: true },
    },
  } as RunOptions,
};

/**
 * Accessibility assertion helpers
 */
export const a11y = {
  /**
   * Assert no accessibility violations with detailed error output
   */
  async expectNoViolations(container: Element | Document): Promise<void> {
    const results = await runAccessibilityAudit(container);
    
    if (results.violations.length > 0) {
      const violationDetails = results.violations
        .map(violation => {
          const nodes = violation.nodes
            .map(node => `    - ${node.html}\n      ${node.failureSummary}`)
            .join('\n');
          return `
  [${violation.impact}] ${violation.id}: ${violation.help}
  WCAG: ${violation.tags.filter(t => t.startsWith('wcag')).join(', ')}
  More info: ${violation.helpUrl}
  Affected elements:
${nodes}`;
        })
        .join('\n');
      
      throw new Error(`Accessibility violations found:\n${violationDetails}`);
    }
  },

  /**
   * Assert element has accessible name
   */
  hasAccessibleName(element: Element, expectedName?: string): void {
    const computedName = element.getAttribute('aria-label') 
      || element.getAttribute('aria-labelledby')
      || element.textContent?.trim()
      || '';
    
    if (!computedName) {
      throw new Error(`Element has no accessible name: ${element.outerHTML}`);
    }
    
    if (expectedName && computedName !== expectedName) {
      throw new Error(
        `Expected accessible name "${expectedName}", got "${computedName}"`
      );
    }
  },

  /**
   * Assert element is focusable
   */
  isFocusable(element: Element): void {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    
    const isFocusable = focusableSelectors.some(
      selector => element.matches(selector)
    );
    
    if (!isFocusable) {
      throw new Error(`Element is not focusable: ${element.outerHTML}`);
    }
  },

  /**
   * Assert focus is visible
   */
  hasFocusIndicator(element: Element): void {
    const styles = window.getComputedStyle(element);
    const hasOutline = styles.outline !== 'none' && styles.outline !== '';
    const hasBoxShadow = styles.boxShadow !== 'none' && styles.boxShadow !== '';
    const hasBorder = styles.borderColor !== styles.backgroundColor;
    
    if (!hasOutline && !hasBoxShadow && !hasBorder) {
      // Note: This is a heuristic and may need adjustment
      console.warn(
        'Focus indicator may not be visible. Verify manually:',
        element.outerHTML
      );
    }
  },
};

/**
 * Keyboard testing utilities
 */
export const keyboard = {
  tab: () => new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }),
  shiftTab: () => new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }),
  enter: () => new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
  space: () => new KeyboardEvent('keydown', { key: ' ', bubbles: true }),
  escape: () => new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
  arrowUp: () => new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }),
  arrowDown: () => new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
  arrowLeft: () => new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
  arrowRight: () => new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
  home: () => new KeyboardEvent('keydown', { key: 'Home', bubbles: true }),
  end: () => new KeyboardEvent('keydown', { key: 'End', bubbles: true }),
};

/**
 * ARIA state assertions
 */
export const aria = {
  /**
   * Assert aria-expanded state
   */
  isExpanded(element: Element, expected: boolean): void {
    const actual = element.getAttribute('aria-expanded');
    if (actual !== String(expected)) {
      throw new Error(
        `Expected aria-expanded="${expected}", got "${actual}"`
      );
    }
  },

  /**
   * Assert aria-selected state
   */
  isSelected(element: Element, expected: boolean): void {
    const actual = element.getAttribute('aria-selected');
    if (actual !== String(expected)) {
      throw new Error(
        `Expected aria-selected="${expected}", got "${actual}"`
      );
    }
  },

  /**
   * Assert aria-current state
   */
  isCurrent(element: Element, expected: string | boolean): void {
    const actual = element.getAttribute('aria-current');
    const expectedStr = typeof expected === 'boolean' 
      ? String(expected) 
      : expected;
    if (actual !== expectedStr) {
      throw new Error(
        `Expected aria-current="${expectedStr}", got "${actual}"`
      );
    }
  },

  /**
   * Assert aria-hidden state
   */
  isHidden(element: Element, expected: boolean): void {
    const actual = element.getAttribute('aria-hidden');
    if (actual !== String(expected)) {
      throw new Error(
        `Expected aria-hidden="${expected}", got "${actual}"`
      );
    }
  },

  /**
   * Assert aria-disabled state
   */
  isDisabled(element: Element, expected: boolean): void {
    const actual = element.getAttribute('aria-disabled');
    if (actual !== String(expected)) {
      throw new Error(
        `Expected aria-disabled="${expected}", got "${actual}"`
      );
    }
  },

  /**
   * Assert element has required ARIA attributes for role
   */
  hasRequiredAttrs(element: Element, role: string): void {
    const requiredAttrs: Record<string, string[]> = {
      dialog: ['aria-labelledby'],
      alertdialog: ['aria-labelledby', 'aria-describedby'],
      tab: ['aria-selected'],
      tabpanel: ['aria-labelledby'],
      combobox: ['aria-expanded'],
      slider: ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
      progressbar: ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
      checkbox: ['aria-checked'],
      switch: ['aria-checked'],
      menu: [],
      menuitem: [],
      grid: [],
      gridcell: [],
    };

    const required = requiredAttrs[role] || [];
    const missing = required.filter(
      attr => !element.hasAttribute(attr)
    );

    if (missing.length > 0) {
      throw new Error(
        `Role "${role}" missing required attributes: ${missing.join(', ')}`
      );
    }
  },
};

/**
 * Focus management testing utilities
 */
export const focus = {
  /**
   * Assert focus is trapped within container
   */
  async isTrapped(
    container: Element,
    triggerTab: () => Promise<void>
  ): Promise<void> {
    const focusableElements = container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), ' +
      'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) {
      throw new Error('No focusable elements found in container');
    }

    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus last element and tab forward - should wrap to first
    lastFocusable.focus();
    await triggerTab();
    
    // In a proper focus trap, focus should wrap to first focusable
    if (document.activeElement !== firstFocusable && 
        !container.contains(document.activeElement)) {
      throw new Error('Focus escaped container on forward tab');
    }
  },

  /**
   * Assert focus returns to trigger element
   */
  returnsToTrigger(
    trigger: Element,
    expectedToHaveFocus = true
  ): void {
    if (expectedToHaveFocus && document.activeElement !== trigger) {
      throw new Error(
        `Expected focus to return to trigger element, but active element is: ${
          document.activeElement?.tagName
        }`
      );
    }
  },
};

/**
 * Color contrast utilities (basic checks - axe handles detailed contrast)
 */
export const contrast = {
  /**
   * Get relative luminance of a color
   */
  getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
    const l1 = this.getLuminance(...rgb1);
    const l2 = this.getLuminance(...rgb2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  /**
   * Assert contrast meets WCAG requirements
   */
  meetsWCAG(
    foreground: [number, number, number],
    background: [number, number, number],
    level: 'AA' | 'AAA' = 'AA',
    largeText = false
  ): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    const required = {
      AA: largeText ? 3 : 4.5,
      AAA: largeText ? 4.5 : 7,
    };
    return ratio >= required[level];
  },
};

/**
 * Screen reader simulation utilities
 */
export const screenReader = {
  /**
   * Get the accessible name of an element
   */
  getAccessibleName(element: Element): string {
    // aria-labelledby takes precedence
    const labelledBy = element.getAttribute('aria-labelledby');
    if (labelledBy) {
      const labelElement = document.getElementById(labelledBy);
      if (labelElement) return labelElement.textContent?.trim() || '';
    }
    
    // Then aria-label
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;
    
    // Then title
    const title = element.getAttribute('title');
    if (title) return title;
    
    // Then text content for some elements
    if (['BUTTON', 'A', 'LABEL'].includes(element.tagName)) {
      return element.textContent?.trim() || '';
    }
    
    // Input elements - check for associated label
    if (element.tagName === 'INPUT') {
      const id = element.getAttribute('id');
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) return label.textContent?.trim() || '';
      }
    }
    
    return '';
  },

  /**
   * Get the accessible description of an element
   */
  getAccessibleDescription(element: Element): string {
    const describedBy = element.getAttribute('aria-describedby');
    if (describedBy) {
      const ids = describedBy.split(' ');
      return ids
        .map(id => document.getElementById(id)?.textContent?.trim() || '')
        .filter(Boolean)
        .join(' ');
    }
    return '';
  },

  /**
   * Get the role of an element (explicit or implicit)
   */
  getRole(element: Element): string {
    const explicitRole = element.getAttribute('role');
    if (explicitRole) return explicitRole;
    
    // Implicit roles
    const implicitRoles: Record<string, string> = {
      A: 'link',
      BUTTON: 'button',
      INPUT: 'textbox', // Simplified - type affects this
      IMG: 'img',
      NAV: 'navigation',
      MAIN: 'main',
      HEADER: 'banner',
      FOOTER: 'contentinfo',
      ASIDE: 'complementary',
      FORM: 'form',
      TABLE: 'table',
      UL: 'list',
      OL: 'list',
      LI: 'listitem',
      H1: 'heading',
      H2: 'heading',
      H3: 'heading',
      H4: 'heading',
      H5: 'heading',
      H6: 'heading',
    };
    
    return implicitRoles[element.tagName] || '';
  },
};

/**
 * Live region testing utilities
 */
export const liveRegion = {
  /**
   * Find all live regions in the document
   */
  findAll(): Element[] {
    return Array.from(document.querySelectorAll(
      '[aria-live], [role="alert"], [role="status"], [role="log"], [role="progressbar"]'
    ));
  },

  /**
   * Assert live region has correct politeness
   */
  hasPoliteness(element: Element, expected: 'polite' | 'assertive' | 'off'): void {
    const role = element.getAttribute('role');
    let actual = element.getAttribute('aria-live');
    
    // Implicit live region values
    if (!actual) {
      if (role === 'alert') actual = 'assertive';
      else if (role === 'status') actual = 'polite';
      else if (role === 'log') actual = 'polite';
    }
    
    if (actual !== expected) {
      throw new Error(
        `Expected aria-live="${expected}", got "${actual || 'none'}"`
      );
    }
  },
};
