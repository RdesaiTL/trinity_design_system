/**
 * Testing Module Exports
 * 
 * Import testing utilities from this module:
 * import { render, expectNoA11yViolations, axe, a11y } from '@/testing';
 */

// Core test utilities (render, screen, userEvent, etc.)
export * from './test-utils';

// Accessibility testing utilities
export {
  axe,
  axeConfigs,
  runAccessibilityAudit,
  a11y,
  aria,
  keyboard,
  focus,
  contrast,
  screenReader,
  liveRegion,
} from './a11y-utils';
