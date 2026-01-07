/**
 * AI Components - Re-exports from modular structure
 * 
 * This file provides backward compatibility by re-exporting
 * all AI components from the new modular structure.
 * 
 * @deprecated Import directly from './AI' folder for tree-shaking benefits
 * @example
 * // New recommended import:
 * import { AILabel, AIChatMessage } from './AI';
 * 
 * // Legacy import (still works):
 * import { AILabel, AIChatMessage } from './AI.tsx';
 */

// Re-export everything from the modular AI folder
export * from './AI';

// For backward compatibility, also export default combined namespace
import * as AIComponents from './AI';
export default AIComponents;
