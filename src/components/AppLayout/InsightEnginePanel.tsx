/**
 * InsightEnginePanel Component
 * AI-powered chat panel inspired by Perplexity's clean interface
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Chip,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Paper,
  Collapse,
  useTheme,
  alpha,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShareIcon from '@mui/icons-material/Share';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LanguageIcon from '@mui/icons-material/Language';
import FolderIcon from '@mui/icons-material/Folder';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckIcon from '@mui/icons-material/Check';
import SchoolIcon from '@mui/icons-material/School';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RedditIcon from '@mui/icons-material/Reddit';
import ArticleIcon from '@mui/icons-material/Article';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import MicIcon from '@mui/icons-material/Mic';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import WidthFullIcon from '@mui/icons-material/WidthFull';
import SourceIcon from '@mui/icons-material/Source';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { brandColors } from '../../tokens';
import { aiTokens } from '../AI';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: SourceCategory[];
  isLoading?: boolean;
  relatedQuestions?: string[];
}

// Source category for collapsible groups
export interface SourceCategory {
  id: string;
  name: string;
  count: number;
  items?: SourceItem[];
}

// Individual source item within a category
export interface SourceItem {
  id: string;
  label: string;
  details?: Record<string, string>;
}

// Legacy interface for backwards compatibility
export interface SourceReference {
  number: number;
  title: string;
  url?: string;
  domain?: string;
  favicon?: string;
}

export interface FocusOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

export interface SourceOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export interface InsightEnginePanelProps {
  /** Initial messages to display (uncontrolled mode) */
  initialMessages?: ChatMessage[];
  /** Controlled messages - when provided, component uses external state */
  messages?: ChatMessage[];
  /** Callback when messages change - required for controlled mode */
  onMessagesChange?: (messages: ChatMessage[]) => void;
  /** Placeholder text for input */
  placeholder?: string;
  /** Title for the panel */
  title?: string;
  /** Subtitle for the panel */
  subtitle?: string;
  /** Callback when user sends a message */
  onSendMessage?: (message: string, options?: { proSearch?: boolean; focus?: string }) => void;
  /** Show typing indicator */
  isTyping?: boolean;
  /** Custom AI avatar */
  aiAvatar?: React.ReactNode;
  /** Callback when close button is clicked */
  onClose?: () => void;
  /** Whether fullscreen mode is active */
  isFullscreen?: boolean;
  /** Callback when fullscreen button is clicked */
  onFullscreenToggle?: () => void;
  /** Show the panel controls (close, fullscreen) */
  showControls?: boolean;
  /** Enable demo mode with fake responses */
  demoMode?: boolean;
  /** Callback when new thread is created */
  onNewThread?: () => void;
  /** Theme mode - defaults to MUI theme */
  themeMode?: 'light' | 'dark';
  /** Whether to use boxed layout (centered content with max-width) in fullscreen */
  boxedLayout?: boolean;
  /** Callback when boxed layout toggle is clicked */
  onBoxedLayoutToggle?: () => void;
  /** User initials to display in avatar */
  userInitials?: string;
}

// Focus options
const focusOptions: FocusOption[] = [
  { id: 'all', label: 'All', icon: <LanguageIcon fontSize="small" />, description: 'Search all sources' },
  { id: 'academic', label: 'Academic', icon: <SchoolIcon fontSize="small" />, description: 'Search academic papers' },
  { id: 'writing', label: 'Writing', icon: <ArticleIcon fontSize="small" />, description: 'Generate content' },
  { id: 'video', label: 'Video', icon: <YouTubeIcon fontSize="small" />, description: 'Search video content' },
  { id: 'social', label: 'Social', icon: <RedditIcon fontSize="small" />, description: 'Search social media' },
];

// LLM Model options
interface ModelOption {
  id: string;
  label: string;
  provider: string;
  description?: string;
}

const modelOptions: ModelOption[] = [
  { id: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI', description: 'Most capable model' },
  { id: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI', description: 'Fast and efficient' },
  { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'Anthropic', description: 'Balanced performance' },
  { id: 'claude-3-opus', label: 'Claude 3 Opus', provider: 'Anthropic', description: 'Most powerful' },
  { id: 'gemini-pro', label: 'Gemini Pro', provider: 'Google', description: 'Multimodal capable' },
];

// Source options for data sources
interface DataSourceOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  enabled: boolean;
}

const dataSourceOptions: DataSourceOption[] = [
  { id: 'web', label: 'Web Search', icon: <LanguageIcon fontSize="small" />, enabled: true },
  { id: 'documents', label: 'Documents', icon: <DescriptionIcon fontSize="small" />, enabled: true },
  { id: 'database', label: 'Database', icon: <StorageIcon fontSize="small" />, enabled: false },
  { id: 'sharepoint', label: 'SharePoint', icon: <CloudIcon fontSize="small" />, enabled: false },
  { id: 'projects', label: 'Projects', icon: <FolderIcon fontSize="small" />, enabled: false },
];

// Demo responses with sources
const demoResponses: Record<string, { content: string; sources: SourceCategory[]; relatedQuestions: string[] }> = {
  default: {
    content: `Based on my analysis of the available data, here are the key insights:

**Performance Overview**
The engagement metrics show a strong upward trend, with a 23% increase compared to the previous quarter. This growth is primarily driven by content in the clinical research and treatment guidelines categories.

**Key Findings**
1. **Peak Engagement Windows**: Tuesday through Thursday between 9am-11am EST consistently show the highest engagement rates
2. **Content Performance**: Educational content outperforms promotional material by 3.2x
3. **KOL Impact**: Content shared by key opinion leaders receives 4.5x more engagement

**Recommendations**
• Prioritize content publication during peak engagement windows
• Increase investment in educational content formats
• Expand KOL partnership program based on current success metrics`,
    sources: [
      { id: 'affiliations', name: 'Affiliations', count: 1 },
      { id: 'contact', name: 'Contact Details', count: 1 },
      { 
        id: 'publications', 
        name: 'Publications', 
        count: 4,
        items: [
          { 
            id: 'pub-a', 
            label: 'Small solitary pulmonary nodules detected at population-based CT screening...',
            details: {
              'Title': 'Small solitary pulmonary nodules (<= 1 cm) detected at population-based CT screening for lung cancer: reliable high-resolution CT features of benign lesions.',
              'Journal': 'International Journal of Cancer',
              'Authorship Position': 'Coauthor',
              'Publication Date': '2024-12-12',
              'Publication Type': 'Journal Article',
              'Tables': 'Publications, PublicationRelations',
              'Last Updated On': '10/29/2025'
            }
          },
          { id: 'pub-b', label: 'Screening for lung cancer with low-dose CT: analysis of screening data...' },
          { id: 'pub-c', label: 'Clinical insights into small cell lung cancer treatment strategies...' },
          { id: 'pub-d', label: 'US Lung Screen (USLS) nodule management protocol and outcomes...' }
        ]
      },
      { id: 'trials', name: 'Clinical Trials', count: 10 },
      { id: 'sci-topics', name: 'Scientific Leader Topics', count: 25 },
      { id: 'clin-topics', name: 'Clinical Leader Topics', count: 19 },
      { id: 'dig-topics', name: 'Digital Leader Topics', count: 31 },
      { id: 'msl', name: 'MSL Interactions', count: 2 },
    ],
    relatedQuestions: [
      'What are some discussion questions for this HCP?',
      'What are some themes I could engage this HCP on?',
      'What conferences has this HCP attended recently?',
      'Please summarize this HCP\'s experience.',
    ],
  },
  
  "What can you help with?": {
    content: `I'm Insight Engine, your AI-powered research assistant. Here's what I can help you with:

**Research & Analysis**
• Search across your data sources, documents, and the web
• Analyze trends and patterns in your data
• Generate insights from complex datasets

**Content & Strategy**
• Help draft and refine content
• Provide competitive intelligence
• Suggest optimization strategies

**Data Exploration**
• Query your databases naturally
• Create visualizations and summaries
• Connect insights across multiple sources

Simply ask me a question, and I'll search relevant sources to provide a comprehensive answer with citations.`,
    sources: [
      { id: 'docs', name: 'Documentation', count: 2 },
      { id: 'help', name: 'Help Articles', count: 3 },
    ],
    relatedQuestions: [
      'Show me recent insights',
      'Analyze my engagement data',
      'What are the top performing KOLs?',
    ],
  },

  "Show recent insights": {
    content: `Here are the most significant insights from the past week:

**📈 Engagement Surge**
Your immunotherapy content series saw a 156% increase in engagement. The article "Advances in CAR-T Therapy" was shared 2,341 times.

**👥 Rising KOL**
Dr. Sarah Chen from Stanford Medicine has emerged as a key voice in precision oncology. Her engagement rate is 3x higher than average.

**🌍 Regional Performance**
EMEA region outperformed other regions by 45%, driven primarily by localized content strategy in Germany and UK markets.

**📊 Content Insights**
Video content is generating 2.8x more engagement than static posts. Consider increasing video production.`,
    sources: [
      { id: 'analytics', name: 'Analytics Dashboard', count: 5 },
      { id: 'kol-report', name: 'KOL Tracking', count: 3 },
      { id: 'regional', name: 'Regional Analysis', count: 4 },
    ],
    relatedQuestions: [
      'Tell me more about Dr. Sarah Chen',
      'Why is EMEA outperforming?',
      'What video content works best?',
    ],
  },
};

/**
 * InsightEnginePanel - AI chat interface with Trinity branding
 */
export const InsightEnginePanel: React.FC<InsightEnginePanelProps> = ({
  initialMessages = [],
  messages: controlledMessages,
  onMessagesChange,
  placeholder: _placeholder = 'Ask anything...',
  title = 'Insight Engine',
  subtitle: _subtitle,
  onSendMessage,
  isTyping: externalIsTyping = false,
  aiAvatar,
  onClose,
  isFullscreen = false,
  onFullscreenToggle,
  showControls = true,
  demoMode = true,
  onNewThread,
  themeMode,
  boxedLayout = true,
  onBoxedLayoutToggle,
  userInitials = 'RD',
}) => {
  const muiTheme = useTheme();
  const isDark = themeMode ? themeMode === 'dark' : muiTheme.palette.mode === 'dark';
  
  // Support both controlled and uncontrolled modes
  const isControlled = controlledMessages !== undefined;
  const [internalMessages, setInternalMessages] = useState<ChatMessage[]>(initialMessages);
  
  // Use controlled messages if provided, otherwise use internal state
  const messages = isControlled ? controlledMessages : internalMessages;
  
  // Helper to update messages in both controlled and uncontrolled modes
  const setMessages = (newMessages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
    if (isControlled) {
      const updated = typeof newMessages === 'function' ? newMessages(controlledMessages) : newMessages;
      onMessagesChange?.(updated);
    } else {
      setInternalMessages(newMessages);
    }
  };
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(externalIsTyping);
  const [selectedFocus, _setSelectedFocus] = useState<string>('all');
  const [_focusMenuAnchor, _setFocusMenuAnchor] = useState<null | HTMLElement>(null);
  const [proSearchEnabled, setProSearchEnabled] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o');
  const [modelMenuAnchor, setModelMenuAnchor] = useState<null | HTMLElement>(null);
  const [sourceMenuAnchor, setSourceMenuAnchor] = useState<null | HTMLElement>(null);
  const [enabledSources, setEnabledSources] = useState<string[]>(['web', 'documents']);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Theme-aware colors using AI tokens
  const colors = {
    background: isDark ? brandColors.neutral.darkBg : brandColors.neutral.white,
    surface: isDark ? brandColors.neutral.darkPaper : brandColors.neutral.lightGray,
    inputBg: isDark ? brandColors.neutral.darkPaper : brandColors.neutral.gray100,
    border: isDark ? alpha(brandColors.neutral.white, 0.1) : brandColors.neutral.gray100,
    text: isDark ? brandColors.neutral.white : brandColors.primary.main,
    textSecondary: isDark ? brandColors.neutral.gray400 : brandColors.neutral.gray500,
    iconActive: isDark ? brandColors.primary.light : brandColors.primary.main, // Purple in dark, navy in light
    iconInactive: isDark ? brandColors.neutral.gray400 : brandColors.neutral.gray500,
    accent: isDark ? brandColors.primary.light : brandColors.primary.main, // Purple in dark, navy in light
    accentSecondary: brandColors.primary.light, // Purple
    gradient: aiTokens.gradient.diagonal,
    gradientHorizontal: aiTokens.gradient.horizontal,
    aiBackground: isDark ? aiTokens.colors.aiBackgroundDark : aiTokens.colors.aiBackground,
    aiBorder: isDark ? aiTokens.colors.aiBorderDark : aiTokens.colors.aiBorder,
    aiHover: isDark ? aiTokens.colors.aiHoverDark : aiTokens.colors.aiHover,
    buttonHighlight: isDark ? brandColors.primary.light : brandColors.primary.main, // Purple in dark, navy in light
    sourceBadgeBg: isDark ? aiTokens.colors.sourceBadgeBgDark : aiTokens.colors.sourceBadgeBg,
    typingDot: isDark ? aiTokens.colors.typingDotDark : aiTokens.colors.typingDot,
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    setIsTyping(externalIsTyping);
  }, [externalIsTyping]);

  const generateDemoResponse = (userMessage: string) => {
    if (demoResponses[userMessage]) {
      return demoResponses[userMessage];
    }
    return demoResponses.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputValue.trim();
    setInputValue('');
    
    onSendMessage?.(messageText, { proSearch: proSearchEnabled, focus: selectedFocus });

    if (demoMode) {
      setIsTyping(true);
      setTimeout(() => {
        const response = generateDemoResponse(messageText);
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.content,
          timestamp: new Date(),
          sources: response.sources,
          relatedQuestions: response.relatedQuestions,
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRelatedQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleNewThread = () => {
    setMessages([]);
    onNewThread?.();
  };

  const _currentFocus = focusOptions.find((f) => f.id === selectedFocus) || focusOptions[0];

  const defaultAIAvatar = (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: aiTokens.radiusPx.md, // 8px
        background: aiTokens.gradient.diagonal,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AutoAwesomeIcon sx={{ fontSize: 16, color: brandColors.neutral.white }} />
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0, // Important for flex scrolling
        background: aiTokens.gradient.subtle,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: aiTokens.spacing.base,
          py: aiTokens.spacing.md,
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: aiTokens.spacing.sm,
          backgroundColor: colors.background,
          flexShrink: 0, // Prevent header from shrinking
        }}
      >
        {/* New Thread Button */}
        <Tooltip title="New thread">
          <IconButton
            size="small"
            onClick={handleNewThread}
            sx={{
              color: colors.iconInactive,
              '&:hover': {
                backgroundColor: colors.aiHover,
              },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          {aiAvatar || defaultAIAvatar}
          <Typography variant="subtitle2" fontWeight={600} color={colors.text}>
            {title}
          </Typography>
          {proSearchEnabled && (
            <Chip
              label="Pro"
              size="small"
              sx={{
                height: 20,
                fontSize: 10,
                fontWeight: 600,
                background: aiTokens.gradient.diagonal,
                color: brandColors.neutral.white,
              }}
            />
          )}
        </Box>

        {showControls && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Thread history">
              <IconButton size="small" sx={{ color: colors.iconInactive }}>
                <HistoryIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {isFullscreen && onBoxedLayoutToggle && (
              <Tooltip title={boxedLayout ? 'Full width' : 'Boxed layout'}>
                <IconButton
                  size="small"
                  onClick={onBoxedLayoutToggle}
                  sx={{ color: colors.iconInactive }}
                >
                  {boxedLayout ? <WidthFullIcon fontSize="small" /> : <FitScreenIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            )}
            {onFullscreenToggle && (
              <Tooltip title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
                <IconButton
                  size="small"
                  onClick={onFullscreenToggle}
                  sx={{ color: colors.iconInactive }}
                >
                  {isFullscreen ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            )}
            {onClose && (
              <Tooltip title="Close">
                <IconButton
                  size="small"
                  onClick={onClose}
                  sx={{ color: colors.iconInactive }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          minHeight: 0, // Important: allows this flex child to shrink and scroll
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Content Wrapper - Applies boxed layout when in fullscreen */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            ...(isFullscreen && boxedLayout && {
              maxWidth: '900px',
              width: '100%',
              mx: 'auto',
              px: 3,
            }),
          }}
        >
          {/* Empty State */}
          {messages.length === 0 && (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: aiTokens.spacing.xl,
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: aiTokens.radiusPx.lg, // 12px
                  background: aiTokens.gradient.subtle,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: aiTokens.spacing.base,
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 28, color: aiTokens.colors.aiPrimary }} />
              </Box>
              <Typography variant="h6" fontWeight={600} color={colors.text} gutterBottom>
                What do you want to know?
              </Typography>
              <Typography variant="body2" color={colors.textSecondary} textAlign="center" sx={{ maxWidth: 300 }}>
                Ask anything and I'll search across your sources to find the answer
              </Typography>
            </Box>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              aiAvatar={aiAvatar || defaultAIAvatar}
              onRelatedQuestionClick={handleRelatedQuestion}
              isDark={isDark}
              colors={colors}
              userInitials={userInitials}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <Box sx={{ p: 3, backgroundColor: colors.background }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                {aiAvatar || defaultAIAvatar}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="caption" fontWeight={600} color={colors.textSecondary}>
                    Searching...
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <TypingDot delay={0} isDark={isDark} />
                  <TypingDot delay={0.15} isDark={isDark} />
                  <TypingDot delay={0.3} isDark={isDark} />
                </Box>
              </Box>
            </Box>
          </Box>
        )}

          <div ref={messagesEndRef} />
        </Box>
        {/* End Content Wrapper */}
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.border}`,
          flexShrink: 0, // Prevent input area from shrinking
          ...(isFullscreen && boxedLayout && {
            display: 'flex',
            justifyContent: 'center',
          }),
        }}
      >
        {/* Input Container - Wrapped for boxed layout */}
        <Box
          sx={{
            width: '100%',
            ...(isFullscreen && boxedLayout && {
              maxWidth: '900px',
            }),
          }}
        >
        <Paper
          elevation={0}
          sx={{
            backgroundColor: colors.inputBg,
            borderRadius: aiTokens.radiusPx.lg, // 12px
            overflow: 'hidden',
            position: 'relative',
            // Gradient border effect when input has text
            ...(inputValue.trim() && {
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: aiTokens.radiusPx.lg, // 12px
                padding: '1.5px',
                background: aiTokens.gradient.diagonal,
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none',
              },
            }),
            // Default border when no text
            ...(!inputValue.trim() && {
              border: `1px solid ${colors.border}`,
            }),
            transition: 'box-shadow 0.2s ease',
            '&:focus-within': {
              boxShadow: inputValue.trim() 
                ? aiTokens.gradient.glow 
                : aiTokens.gradient.inputGlow,
            },
          }}
        >
          {/* Text Input Row */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything. Type @ for mentions and / for shortcuts."
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{
                '& .MuiInputBase-root': {
                  color: isDark ? brandColors.neutral.white : brandColors.primary.main,
                },
                '& .MuiInputBase-input': {
                  py: 0.5,
                  fontSize: '14px',
                  fontWeight: 500,
                  color: isDark ? brandColors.neutral.white : brandColors.primary.main,
                  caretColor: aiTokens.colors.aiSecondary,
                  '&::placeholder': {
                    color: isDark ? alpha(brandColors.neutral.white, 0.5) : brandColors.neutral.gray500,
                    opacity: 1,
                    fontWeight: 400,
                  },
                },
              }}
            />
          </Box>

          {/* Bottom Toolbar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1.5,
              py: 1,
            }}
          >
            {/* Left Toolbar - Model & Source Selection */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
              {/* Model Selector */}
              <Tooltip title="Select AI Model">
                <Box
                  onClick={(e) => setModelMenuAnchor(e.currentTarget)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1,
                    py: 0.5,
                    borderRadius: aiTokens.radiusPx.md, // 8px
                    cursor: 'pointer',
                    backgroundColor: alpha(colors.buttonHighlight, 0.1),
                    border: `1px solid ${alpha(colors.buttonHighlight, 0.2)}`,
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: alpha(colors.buttonHighlight, 0.15),
                    },
                  }}
                >
                  <SmartToyIcon sx={{ fontSize: 14, color: colors.buttonHighlight }} />
                  <Typography variant="caption" fontWeight={500} sx={{ color: colors.text, fontSize: '11px', lineHeight: 1 }}>
                    {modelOptions.find(m => m.id === selectedModel)?.label || 'GPT-4o'}
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: 12, color: colors.textSecondary, ml: -0.25 }} />
                </Box>
              </Tooltip>

              {/* Model Menu */}
              <Menu
                anchorEl={modelMenuAnchor}
                open={Boolean(modelMenuAnchor)}
                onClose={() => setModelMenuAnchor(null)}
                PaperProps={{ sx: { minWidth: 220, mt: 1 } }}
              >
                {modelOptions.map((model) => (
                  <MenuItem
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model.id);
                      setModelMenuAnchor(null);
                    }}
                    selected={selectedModel === model.id}
                    sx={{ py: 1 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <SmartToyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={model.label}
                      secondary={`${model.provider} • ${model.description}`}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    {selectedModel === model.id && (
                      <CheckIcon fontSize="small" sx={{ color: colors.buttonHighlight }} />
                    )}
                  </MenuItem>
                ))}
              </Menu>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: colors.border }} />

              {/* Source Selector */}
              <Tooltip title="Select Data Sources">
                <Box
                  onClick={(e) => setSourceMenuAnchor(e.currentTarget)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1,
                    py: 0.5,
                    borderRadius: aiTokens.radiusPx.md, // 8px
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: alpha(colors.iconInactive, 0.1),
                    },
                  }}
                >
                  <SourceIcon sx={{ fontSize: 14, color: colors.iconInactive }} />
                  <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '11px', lineHeight: 1 }}>
                    {enabledSources.length}
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: 12, color: colors.textSecondary, ml: -0.25 }} />
                </Box>
              </Tooltip>

              {/* Source Menu */}
              <Menu
                anchorEl={sourceMenuAnchor}
                open={Boolean(sourceMenuAnchor)}
                onClose={() => setSourceMenuAnchor(null)}
                PaperProps={{ sx: { minWidth: 220, mt: 1 } }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    DATA SOURCES
                  </Typography>
                </Box>
                {dataSourceOptions.map((source) => (
                  <MenuItem
                    key={source.id}
                    onClick={() => {
                      setEnabledSources(prev => 
                        prev.includes(source.id) 
                          ? prev.filter(s => s !== source.id)
                          : [...prev, source.id]
                      );
                    }}
                    sx={{ py: 1 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {source.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={source.label}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                    <Switch
                      size="small"
                      checked={enabledSources.includes(source.id)}
                      onChange={() => {}}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: colors.buttonHighlight,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: colors.buttonHighlight,
                        },
                      }}
                    />
                  </MenuItem>
                ))}
              </Menu>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: colors.border }} />

              {/* Reason/Deep Think Mode */}
              <Tooltip title="Deep Think (Reason)">
                <IconButton
                  size="small"
                  onClick={() => setProSearchEnabled(!proSearchEnabled)}
                  sx={{
                    backgroundColor: proSearchEnabled ? colors.buttonHighlight : 'transparent',
                    color: proSearchEnabled ? brandColors.neutral.white : colors.iconInactive,
                    borderRadius: aiTokens.radiusPx.sm,
                    width: 28,
                    height: 28,
                    '&:hover': {
                      backgroundColor: proSearchEnabled ? colors.buttonHighlight : alpha(colors.iconInactive, 0.1),
                    },
                  }}
                >
                  <TipsAndUpdatesIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Right Toolbar - Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              {/* Web Search */}
              <Tooltip title="Search web">
                <IconButton
                  size="small"
                  sx={{
                    color: colors.iconInactive,
                    width: 28,
                    height: 28,
                    '&:hover': {
                      backgroundColor: alpha(colors.iconInactive, 0.1),
                    },
                  }}
                >
                  <LanguageIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>

              {/* Attach File */}
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} multiple />
              <Tooltip title="Attach file">
                <IconButton
                  size="small"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    color: colors.iconInactive,
                    width: 28,
                    height: 28,
                    '&:hover': {
                      backgroundColor: alpha(colors.iconInactive, 0.1),
                    },
                  }}
                >
                  <AttachFileIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>

              {/* Microphone - Dictation */}
              <Tooltip title="Voice input (Dictation)">
                <IconButton
                  size="small"
                  onClick={() => setIsListening(!isListening)}
                  sx={{
                    color: isListening ? aiTokens.colors.aiSecondary : colors.iconInactive,
                    width: 28,
                    height: 28,
                    '&:hover': {
                      backgroundColor: alpha(colors.iconInactive, 0.1),
                    },
                  }}
                >
                  <MicIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>

              {/* Voice Mode / Submit Button - Changes based on input */}
              {inputValue.trim() ? (
                <Tooltip title="Send message">
                  <IconButton
                    size="small"
                    onClick={handleSend}
                    sx={{
                      backgroundColor: colors.buttonHighlight,
                      color: brandColors.neutral.white,
                      borderRadius: aiTokens.radiusPx.sm,
                      width: 28,
                      height: 28,
                      '&:hover': {
                        backgroundColor: alpha(colors.buttonHighlight, 0.85),
                        boxShadow: `0 0 12px ${alpha(colors.buttonHighlight, 0.4)}`,
                      },
                    }}
                  >
                    <SendIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title={isVoiceMode ? 'Exit voice mode' : 'Voice mode'}>
                  <IconButton
                    size="small"
                    onClick={() => setIsVoiceMode(!isVoiceMode)}
                    sx={{
                      backgroundColor: isVoiceMode ? colors.buttonHighlight : colors.iconActive,
                      color: brandColors.neutral.white,
                      borderRadius: aiTokens.radiusPx.sm,
                      width: 28,
                      height: 28,
                      '&:hover': {
                        backgroundColor: alpha(colors.buttonHighlight, 0.85),
                      },
                    }}
                  >
                    <GraphicEqIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Voice Mode Overlay */}
        <Collapse in={isVoiceMode}>
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 3,
              backgroundColor: isDark ? brandColors.neutral.darkPaper : brandColors.neutral.gray100,
              borderRadius: aiTokens.radiusPx.xl,
              textAlign: 'center',
              border: `1px solid ${colors.border}`,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: aiTokens.radiusPx.circle,
                backgroundColor: isListening ? colors.buttonHighlight : alpha(colors.iconInactive, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                animation: isListening ? 'pulse 1.5s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: `0 0 0 0 ${alpha(colors.buttonHighlight, 0.4)}`,
                  },
                  '70%': {
                    boxShadow: `0 0 0 20px ${alpha(colors.buttonHighlight, 0)}`,
                  },
                  '100%': {
                    boxShadow: `0 0 0 0 ${alpha(colors.buttonHighlight, 0)}`,
                  },
                },
              }}
              onClick={() => setIsListening(!isListening)}
            >
              <MicIcon sx={{ fontSize: 36, color: isListening ? brandColors.neutral.white : colors.iconInactive }} />
            </Box>
            <Typography variant="body1" sx={{ color: colors.text, mb: 1 }}>
              {isListening ? 'Listening...' : 'Tap to speak'}
            </Typography>
            <Typography variant="caption" sx={{ color: colors.textSecondary }}>
              {isListening ? 'Speak your question clearly' : 'Voice mode is ready'}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                size="small"
                onClick={() => setIsVoiceMode(false)}
                sx={{ color: colors.iconInactive }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Paper>
        </Collapse>

        {/* Listening Indicator */}
        {isListening && !isVoiceMode && (
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: aiTokens.radiusPx.circle,
                backgroundColor: aiTokens.colors.aiSecondary,
                animation: 'blink 1s infinite',
                '@keyframes blink': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.3 },
                },
              }}
            />
            <Typography variant="caption" color={colors.textSecondary}>
              Listening... Speak now
            </Typography>
            <IconButton size="small" onClick={() => setIsListening(false)} sx={{ color: colors.iconInactive }}>
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        )}

        <Typography variant="caption" color={colors.textSecondary} sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
          Insight Engine can make mistakes. Verify important information.
        </Typography>
        </Box>
        {/* End Input Wrapper */}
      </Box>
    </Box>
  );
};

// Theme colors type
interface ThemeColors {
  background: string;
  surface: string;
  inputBg: string;
  border: string;
  text: string;
  textSecondary: string;
  iconActive: string;
  iconInactive: string;
  accent: string;
  accentSecondary: string;
  gradient: string;
  gradientHorizontal: string;
  aiBackground: string;
  aiBorder: string;
  aiHover: string;
  buttonHighlight: string;
  sourceBadgeBg: string;
  typingDot: string;
}

// Message Item Component
const MessageItem: React.FC<{
  message: ChatMessage;
  aiAvatar: React.ReactNode;
  onRelatedQuestionClick: (question: string) => void;
  isDark: boolean;
  colors: ThemeColors;
  userInitials?: string;
}> = ({ message, aiAvatar, onRelatedQuestionClick, isDark, colors, userInitials = 'RD' }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // User avatar matching AI avatar size with initials
  const userAvatar = (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: aiTokens.radiusPx.circle,
        backgroundColor: brandColors.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontSize: 10, fontWeight: 600, color: brandColors.neutral.white, letterSpacing: '-0.02em' }}>
        {userInitials}
      </Typography>
    </Box>
  );

  if (isUser) {
    return (
      <Box sx={{ backgroundColor: colors.background }}>
        <Box sx={{ px: aiTokens.spacing.lg, py: aiTokens.spacing.lg }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: aiTokens.spacing.md, justifyContent: 'flex-end' }}>
            <Paper
              elevation={0}
              sx={{
                p: aiTokens.spacing.base,
                borderRadius: aiTokens.radiusPx.md, // 8px
                backgroundColor: brandColors.neutral.gray100,
                color: brandColors.primary.main,
                maxWidth: '85%',
              }}
            >
              <Typography variant="body1" fontWeight={500}>
                {message.content}
              </Typography>
            </Paper>
            {userAvatar}
          </Box>
        </Box>
      </Box>
    );
  }

  // Calculate total source count
  const totalSourceCount = message.sources?.reduce((sum, cat) => sum + cat.count, 0) || 0;

  return (
    <Box sx={{ backgroundColor: colors.background }}>
      {/* Answer Section */}
      <Box sx={{ px: aiTokens.spacing.lg, py: aiTokens.spacing.lg }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: aiTokens.spacing.md }}>
          {aiAvatar}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              color={colors.text}
              sx={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.7,
                '& strong': { fontWeight: 600 },
              }}
            >
              {message.content}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ px: aiTokens.spacing.lg, pb: aiTokens.spacing.base }}>
        <Box sx={{ display: 'flex', gap: aiTokens.spacing.xs, ml: 5 }}>
          <Tooltip title={copied ? 'Copied!' : 'Copy'}>
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                color: copied ? aiTokens.colors.aiPrimary : colors.iconInactive,
                '&:hover': { backgroundColor: colors.aiHover },
              }}
            >
              {copied ? <CheckIcon sx={{ fontSize: 18 }} /> : <ContentCopyIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Good response">
            <IconButton
              size="small"
              sx={{
                color: colors.iconInactive,
                '&:hover': { backgroundColor: colors.aiHover, color: brandColors.secondary.light }, // Azure for positive
              }}
            >
              <ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bad response">
            <IconButton
              size="small"
              sx={{
                color: colors.iconInactive,
                '&:hover': { backgroundColor: colors.aiHover, color: aiTokens.colors.aiSecondary },
              }}
            >
              <ThumbDownOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton
              size="small"
              sx={{
                color: colors.iconInactive,
                '&:hover': { backgroundColor: colors.aiHover },
              }}
            >
              <ShareIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Regenerate">
            <IconButton
              size="small"
              sx={{
                color: colors.iconInactive,
                '&:hover': { backgroundColor: colors.aiHover },
              }}
            >
              <RefreshIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Sources Section - Collapsible Accordion Style */}
      {message.sources && message.sources.length > 0 && (
        <Box sx={{ px: aiTokens.spacing.lg, pb: aiTokens.spacing.base }}>
          <SourcesAccordion 
            sources={message.sources} 
            totalCount={totalSourceCount}
            isDark={isDark} 
            colors={colors} 
          />
        </Box>
      )}

      {/* Related Questions Section - Collapsible */}
      {message.relatedQuestions && message.relatedQuestions.length > 0 && (
        <Box sx={{ px: aiTokens.spacing.lg, pb: aiTokens.spacing.lg }}>
          <RelatedQuestionsAccordion
            questions={message.relatedQuestions}
            onQuestionClick={onRelatedQuestionClick}
            isDark={isDark}
            colors={colors}
          />
        </Box>
      )}

      <Divider sx={{ borderColor: colors.border }} />
    </Box>
  );
};

// Sources Accordion Component - Collapsible with numbered categories
const SourcesAccordion: React.FC<{
  sources: SourceCategory[];
  totalCount: number;
  isDark: boolean;
  colors: ThemeColors;
}> = ({ sources, totalCount, isDark, colors }) => {
  const [expanded, setExpanded] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SourceItem | null>(null);

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${colors.border}`,
        borderRadius: aiTokens.radiusPx.md,
        overflow: 'hidden',
        backgroundColor: colors.surface,
      }}
    >
      {/* Sources Header */}
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: colors.aiHover,
          },
        }}
      >
        <Typography variant="body2" fontWeight={600} color={colors.text}>
          Sources ({totalCount})
        </Typography>
        {expanded ? (
          <ExpandLessIcon sx={{ fontSize: 20, color: colors.iconInactive }} />
        ) : (
          <ExpandMoreIcon sx={{ fontSize: 20, color: colors.iconInactive }} />
        )}
      </Box>

      {/* Sources List */}
      <Collapse in={expanded}>
        <Box sx={{ px: 2, pb: 2 }}>
          {sources.map((category, index) => (
            <SourceCategoryItem
              key={category.id}
              category={category}
              index={index + 1}
              isExpanded={expandedCategory === category.id}
              onToggle={() => {
                setExpandedCategory(expandedCategory === category.id ? null : category.id);
                setSelectedItem(null);
              }}
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
              isDark={isDark}
              colors={colors}
            />
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
};

// Source Category Item - Individual collapsible category
const SourceCategoryItem: React.FC<{
  category: SourceCategory;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  selectedItem: SourceItem | null;
  onSelectItem: (item: SourceItem | null) => void;
  isDark: boolean;
  colors: ThemeColors;
}> = ({ category, index, isExpanded, onToggle, selectedItem, onSelectItem, isDark: _isDark, colors }) => {
  const hasItems = category.items && category.items.length > 0;
  
  return (
    <Box sx={{ mb: 0.5 }}>
      {/* Category Row */}
      <Box
        onClick={hasItems ? onToggle : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: 1,
          cursor: hasItems ? 'pointer' : 'default',
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            color: brandColors.primary.light, 
            fontWeight: 500,
            minWidth: 16,
          }}
        >
          {index}
        </Typography>
        <Typography variant="body2" color={colors.text} sx={{ flex: 1 }}>
          {category.name} ({category.count})
        </Typography>
        {hasItems && (
          <Typography
            variant="caption"
            sx={{
              color: brandColors.primary.light,
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            [{isExpanded ? 'Hide' : 'Show'}]
          </Typography>
        )}
      </Box>

      {/* Expanded Items */}
      {hasItems && (
        <Collapse in={isExpanded}>
          <Box sx={{ pl: 3, pb: 1 }}>
            {/* Item Chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {category.items!.map((item, idx) => {
                const letter = String.fromCharCode(97 + idx); // a, b, c, d...
                const isSelected = selectedItem?.id === item.id;
                
                return (
                  <Chip
                    key={item.id}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography 
                          component="span" 
                          sx={{ 
                            fontWeight: 600, 
                            color: isSelected ? brandColors.neutral.white : brandColors.primary.light,
                            fontSize: 12,
                          }}
                        >
                          {letter}
                        </Typography>
                        <Typography 
                          component="span" 
                          sx={{ 
                            fontSize: 12,
                            maxWidth: 150,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.label.length > 25 ? item.label.substring(0, 25) + '...' : item.label}
                        </Typography>
                      </Box>
                    }
                    onClick={() => onSelectItem(isSelected ? null : item)}
                    sx={{
                      backgroundColor: isSelected ? brandColors.primary.light : colors.inputBg,
                      color: isSelected ? brandColors.neutral.white : colors.text,
                      border: `1px solid ${isSelected ? brandColors.primary.light : colors.border}`,
                      borderRadius: aiTokens.radiusPx.xl, // 16px pill shape
                      height: 28,
                      '&:hover': {
                        backgroundColor: isSelected ? brandColors.primary.light : alpha(brandColors.primary.light, 0.1),
                      },
                    }}
                  />
                );
              })}
            </Box>

            {/* Selected Item Details Table */}
            {selectedItem?.details && (
              <Paper
                elevation={0}
                sx={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: aiTokens.radiusPx.md,
                  overflow: 'hidden',
                  backgroundColor: colors.background,
                }}
              >
                {Object.entries(selectedItem.details).map(([key, value], idx) => (
                  <Box
                    key={key}
                    sx={{
                      display: 'flex',
                      borderBottom: idx < Object.entries(selectedItem.details!).length - 1 ? `1px solid ${colors.border}` : 'none',
                    }}
                  >
                    <Box
                      sx={{
                        width: 140,
                        flexShrink: 0,
                        p: 1.5,
                        backgroundColor: colors.surface,
                        borderRight: `1px solid ${colors.border}`,
                      }}
                    >
                      <Typography variant="caption" fontWeight={600} color={colors.text}>
                        {key}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, p: 1.5 }}>
                      <Typography variant="caption" color={colors.text}>
                        {value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>
            )}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

// Related Questions Accordion Component
const RelatedQuestionsAccordion: React.FC<{
  questions: string[];
  onQuestionClick: (question: string) => void;
  isDark: boolean;
  colors: ThemeColors;
}> = ({ questions, onQuestionClick, isDark: _isDark, colors }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${colors.border}`,
        borderRadius: aiTokens.radiusPx.md,
        overflow: 'hidden',
        backgroundColor: colors.surface,
      }}
    >
      {/* Header */}
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: colors.aiHover,
          },
        }}
      >
        <Typography variant="body2" fontWeight={600} color={colors.text}>
          Related Questions
        </Typography>
        {expanded ? (
          <ExpandLessIcon sx={{ fontSize: 20, color: colors.iconInactive }} />
        ) : (
          <ExpandMoreIcon sx={{ fontSize: 20, color: colors.iconInactive }} />
        )}
      </Box>

      {/* Questions List */}
      <Collapse in={expanded}>
        <Box sx={{ px: 2, pb: 2 }}>
          {questions.map((question, idx) => (
            <Box
              key={idx}
              onClick={() => onQuestionClick(question)}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                py: 1,
                px: 1,
                borderRadius: aiTokens.radiusPx.sm,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: colors.aiHover,
                },
              }}
            >
              <ArrowForwardIcon 
                sx={{ 
                  fontSize: 16, 
                  color: brandColors.primary.light,
                  mt: 0.25,
                  flexShrink: 0,
                }} 
              />
              <Typography variant="body2" color={colors.text}>
                {question}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
};

// Typing Indicator Dot - uses AI gradient colors
const TypingDot: React.FC<{ delay: number; isDark?: boolean }> = ({ delay, isDark }) => (
  <Box
    sx={{
      width: 6,
      height: 6,
      borderRadius: aiTokens.radiusPx.circle,
      backgroundColor: isDark ? aiTokens.colors.typingDotDark : aiTokens.colors.typingDot,
      animation: 'typingPulse 1.4s infinite ease-in-out',
      animationDelay: `${delay}s`,
      '@keyframes typingPulse': {
        '0%, 80%, 100%': {
          opacity: 0.4,
          transform: 'scale(0.8)',
        },
        '40%': {
          opacity: 1,
          transform: 'scale(1)',
        },
      },
    }}
  />
);

export default InsightEnginePanel;
