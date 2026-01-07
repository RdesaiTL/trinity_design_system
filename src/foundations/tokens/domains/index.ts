/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * DOMAIN TOKENS INDEX
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Barrel file for all domain-specific tokens.
 * Domains extend the canonical token system for specialized use cases.
 * 
 * @module foundations/tokens/domains
 */

// AI Domain
export * from './ai';
export { default as aiTokens } from './ai';

// Charts Domain
export * from './charts';
export { default as chartTokens } from './charts';

// DataTable Domain
export * from './datatable';
export { default as dataTableTokens } from './datatable';
