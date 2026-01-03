/**
 * AI Chat Components
 * Components for AI chat interfaces: Message, Input, Typing Indicator, Quick Reply
 * 
 * These components are used by InsightEnginePanel and can also be used
 * independently for custom AI chat implementations.
 * 
 * @example
 * ```tsx
 * import { AIChatMessage, AIChatInput, AITypingIndicator } from '@trinity/design-system';
 * 
 * <AIChatMessage role="assistant" content="Hello!" />
 * <AIChatInput onSubmit={(msg) => sendMessage(msg)} />
 * ```
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  TextField,
  Stack,
  Avatar,
  Chip,
  CircularProgress,
  Tooltip,
  SxProps,
  Theme,
} from '@mui/material';
import { brandColors } from '../../tokens';
import { Icon } from '../Icon';
import { aiTokens, aiSpacing, aiRadiusPx } from './tokens';
import { AIAvatar } from './AIAvatar';

// ============================================================================
// AI CHAT MESSAGE
// ============================================================================

export type MessageRole = 'user' | 'assistant';

export interface AIChatMessageProps {
  /** Message content */
  content: React.ReactNode;
  /** Role of the message sender */
  role: MessageRole;
  /** Timestamp */
  timestamp?: string;
  /** Whether the message is loading */
  isLoading?: boolean;
  /** User avatar/initials for user messages */
  userAvatar?: string | React.ReactNode;
  /** Whether to show copy button */
  showCopy?: boolean;
  /** Whether to show feedback buttons */
  showFeedback?: boolean;
  /** Whether to show share button */
  showShare?: boolean;
  /** Copy callback */
  onCopy?: () => void;
  /** Feedback callback */
  onFeedback?: (positive: boolean) => void;
  /** Share callback */
  onShare?: () => void;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Chat Message - Individual message in a chat conversation.
 */
export const AIChatMessage: React.FC<AIChatMessageProps> = ({
  content,
  role,
  timestamp,
  isLoading = false,
  userAvatar,
  showCopy = false,
  showFeedback = false,
  showShare = false,
  onCopy,
  onFeedback,
  onShare,
  sx,
}) => {
  const isUser = role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: 1.5,
        mb: 2,
        ...sx,
      }}
    >
      {/* Avatar */}
      {isUser ? (
        typeof userAvatar === 'string' ? (
          <Avatar sx={{ width: 36, height: 36, bgcolor: brandColors.primary.main }}>
            {userAvatar}
          </Avatar>
        ) : (
          userAvatar || (
            <Avatar sx={{ width: 36, height: 36, bgcolor: brandColors.primary.main }}>
              <Icon name="user" size="small" />
            </Avatar>
          )
        )
      ) : (
        <AIAvatar size="small" animated={isLoading} />
      )}

      {/* Message Content */}
      <Box sx={{ maxWidth: '80%', minWidth: 0 }}>
        <Paper
          elevation={0}
          sx={{
            p: aiSpacing.base,
            borderRadius: aiRadiusPx.lg,
            backgroundColor: isUser
              ? brandColors.primary.main
              : aiTokens.colors.aiBackground,
            color: isUser ? '#FFFFFF' : 'text.primary',
            border: isUser ? 'none' : `1px solid ${aiTokens.colors.aiBorder}`,
            ...(isLoading && {
              background: `linear-gradient(90deg, ${aiTokens.colors.aiBackground} 0%, rgba(120, 65, 201, 0.08) 50%, ${aiTokens.colors.aiBackground} 100%)`,
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              '@keyframes shimmer': {
                '0%': { backgroundPosition: '200% 0' },
                '100%': { backgroundPosition: '-200% 0' },
              },
            }),
          }}
        >
          {isLoading ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={16} sx={{ color: aiTokens.colors.aiPrimary }} />
              <Typography variant="body2" color="text.secondary">
                Generating response...
              </Typography>
            </Stack>
          ) : (
            <Typography variant="body2" component="div">
              {content}
            </Typography>
          )}
        </Paper>

        {/* Message Actions */}
        {!isLoading && !isUser && (showCopy || showFeedback || showShare) && (
          <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, ml: 1 }}>
            {showFeedback && (
              <>
                <Tooltip title="Helpful">
                  <IconButton size="small" onClick={() => onFeedback?.(true)}>
                    <Icon name="trending-up" size="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Not helpful">
                  <IconButton size="small" onClick={() => onFeedback?.(false)}>
                    <Icon name="trending-down" size="small" />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {showCopy && (
              <Tooltip title="Copy">
                <IconButton size="small" onClick={onCopy}>
                  <Icon name="copy" size="small" />
                </IconButton>
              </Tooltip>
            )}
            {showShare && (
              <Tooltip title="Share">
                <IconButton size="small" onClick={onShare}>
                  <Icon name="share" size="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        )}

        {/* Timestamp */}
        {timestamp && (
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.5, display: 'block' }}>
            {timestamp}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

// ============================================================================
// AI CHAT INPUT
// ============================================================================

export interface AIChatInputProps {
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Submit handler */
  onSubmit?: (value: string) => void;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether to show voice input button */
  showVoiceInput?: boolean;
  /** Voice input callback */
  onVoiceInput?: () => void;
  /** Whether AI is currently generating */
  isGenerating?: boolean;
  /** Stop generation callback */
  onStopGeneration?: () => void;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Chat Input - Input field for chat messages with send and voice buttons.
 */
export const AIChatInput: React.FC<AIChatInputProps> = ({
  placeholder = 'Enter a message',
  value: controlledValue,
  onChange,
  onSubmit,
  disabled = false,
  showVoiceInput = true,
  onVoiceInput,
  isGenerating = false,
  onStopGeneration,
  sx,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = () => {
    if (value.trim() && !disabled && !isGenerating) {
      onSubmit?.(value.trim());
      if (controlledValue === undefined) {
        setInternalValue('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1,
        pl: 2,
        borderRadius: aiRadiusPx.full,
        border: `1px solid ${brandColors.neutral.gray100}`,
        backgroundColor: '#FFFFFF',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:focus-within': {
          borderColor: aiTokens.colors.aiPrimary,
          boxShadow: `0 0 0 3px ${aiTokens.colors.aiHover}`,
        },
        ...sx,
      }}
    >
      {/* AI Sparkle Icon */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: aiTokens.colors.aiPrimary,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </Box>

      {/* Input Field */}
      <TextField
        fullWidth
        variant="standard"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled || isGenerating}
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: '0.9375rem',
          },
        }}
      />

      {/* Voice Input Button */}
      {showVoiceInput && (
        <IconButton
          size="small"
          onClick={onVoiceInput}
          disabled={disabled || isGenerating}
          sx={{ color: brandColors.neutral.gray500 }}
        >
          <Icon name="volume" size="small" />
        </IconButton>
      )}

      {/* Send/Stop Button */}
      {isGenerating ? (
        <IconButton
          onClick={onStopGeneration}
          sx={{
            backgroundColor: brandColors.secondary.main,
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: brandColors.secondary.dark,
            },
          }}
        >
          <Icon name="stop" size="small" />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          sx={{
            backgroundColor: value.trim() ? aiTokens.colors.aiPrimary : brandColors.neutral.gray100,
            color: value.trim() ? '#FFFFFF' : brandColors.neutral.gray400,
            '&:hover': {
              backgroundColor: value.trim() ? brandColors.primary.dark : brandColors.neutral.gray100,
            },
            '&:disabled': {
              backgroundColor: brandColors.neutral.gray100,
              color: brandColors.neutral.gray400,
            },
          }}
        >
          <Icon name="send" size="small" />
        </IconButton>
      )}
    </Paper>
  );
};

// ============================================================================
// AI TYPING INDICATOR
// ============================================================================

export interface AITypingIndicatorProps {
  /** Custom text */
  text?: string;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Typing Indicator - Shows when AI is generating a response.
 */
export const AITypingIndicator: React.FC<AITypingIndicatorProps> = ({
  text = 'AI is thinking',
  sx,
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={sx}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: aiRadiusPx.circle,
              backgroundColor: aiTokens.colors.aiPrimary,
              animation: 'bounce 1.4s infinite ease-in-out both',
              animationDelay: `${i * 0.16}s`,
              '@keyframes bounce': {
                '0%, 80%, 100%': {
                  transform: 'scale(0)',
                },
                '40%': {
                  transform: 'scale(1)',
                },
              },
            }}
          />
        ))}
      </Box>
      <Typography variant="caption" color="text.secondary">
        {text}
      </Typography>
    </Stack>
  );
};

// ============================================================================
// AI QUICK REPLY
// ============================================================================

export interface AIQuickReplyProps {
  /** List of quick reply options */
  options: string[];
  /** Selection handler */
  onSelect: (option: string) => void;
  /** Custom sx props */
  sx?: SxProps<Theme>;
}

/**
 * AI Quick Reply - Suggested quick reply options.
 */
export const AIQuickReply: React.FC<AIQuickReplyProps> = ({
  options,
  onSelect,
  sx,
}) => {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={sx}>
      {options.map((option, index) => (
        <Chip
          key={index}
          label={option}
          onClick={() => onSelect(option)}
          sx={{
            borderColor: aiTokens.colors.aiPrimary,
            color: aiTokens.colors.aiPrimary,
            '&:hover': {
              backgroundColor: aiTokens.colors.aiHover,
            },
          }}
          variant="outlined"
        />
      ))}
    </Stack>
  );
};
