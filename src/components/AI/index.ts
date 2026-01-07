/**
 * AI Components Module
 * Comprehensive AI interface components for Trinity Design System
 * 
 * @module AI
 */

// ============================================================================
// TOKENS
// ============================================================================
export { aiTokens, aiSpacing, aiRadius, aiRadiusPx } from './tokens';

// ============================================================================
// CORE COMPONENTS
// ============================================================================
export { AILabel, type AILabelProps, type AILabelSize, type AILabelVariant } from './AILabel';
export { AIAvatar, type AIAvatarProps } from './AIAvatar';
export { AIExplainability, type AIExplainabilityProps } from './AIExplainability';

// ============================================================================
// CHAT COMPONENTS
// ============================================================================
export {
  AIChatMessage,
  AIChatInput,
  AITypingIndicator,
  AIQuickReply,
  type AIChatMessageProps,
  type AIChatInputProps,
  type AITypingIndicatorProps,
  type AIQuickReplyProps,
  type MessageRole,
} from './AIChat';

// ============================================================================
// SOURCE COMPONENTS
// ============================================================================
export {
  AISource,
  AISourcesSection,
  type AISourceProps,
  type AISourcesSectionProps,
} from './AISources';

// ============================================================================
// ACTION COMPONENTS
// ============================================================================
export {
  AISuggestedAction,
  AICircularAction,
  AIActionsGroup,
  type AISuggestedActionProps,
  type AICircularActionProps,
  type AIActionsGroupProps,
} from './AIActions';

// ============================================================================
// CONTAINER COMPONENTS
// ============================================================================
export {
  AIContainer,
  AIExpandableSection,
  AIPersonaCard,
  type AIContainerProps,
  type AIExpandableSectionProps,
  type AIPersonaCardProps,
} from './AIContainer';

// ============================================================================
// VISUAL COMPONENTS
// ============================================================================
export {
  GradientText,
  StatCard,
  GradientIconBadge,
  AIShimmer,
  type GradientTextProps,
  type StatCardProps,
  type GradientIconBadgeProps,
  type AIShimmerProps,
} from './AIVisuals';
