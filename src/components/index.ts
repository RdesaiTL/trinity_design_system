// Layout Components
export { Layout } from './Layout';
export { default as TopNavHeader } from './TopNavHeader';
export { default as TopNavWithSidebar } from './TopNavWithSidebar';

// App Layout Template
export {
  AppLayout,
  ResizablePanel,
  InsightEnginePanel,
} from './AppLayout';
export type {
  AppLayoutProps,
  NavItem as AppNavItem,
  UserInfo as AppUserInfo,
  ResizablePanelProps,
  InsightEnginePanelProps,
  ChatMessage,
  SourceOption,
} from './AppLayout';

// Shared Components
export { ComponentPage, Section, Showcase } from './shared';

// Navigation Utilities (shared across TopNavHeader and TopNavWithSidebar)
export {
  // Types
  type App,
  type Client,
  type NavItem,
  type UserInfo,
  type SearchConfig,
  type BaseNavProps,
  // Styled Components
  Search,
  SearchIconWrapper,
  StyledInputBase,
  ClearButton,
  ClientSelector,
  HeaderIconButton,
  LogoWrapper,
  // Hooks
  useClientSelector,
  useUserMenu,
  useAppsMenu,
  useSearch,
  useSidebar,
  // Hook Types
  type UseClientSelectorOptions,
  type UseClientSelectorReturn,
  type UseUserMenuOptions,
  type UseUserMenuReturn,
  type UseAppsMenuOptions,
  type UseAppsMenuReturn,
  type UseSearchOptions,
  type UseSearchReturn,
  type UseSidebarOptions,
  type UseSidebarReturn,
  // Components
  TrinityLogo,
  SearchBar,
  ClientMenu,
  AppsMenu,
  UserMenu,
  HeaderActions,
  // Component Types
  type TrinityLogoProps,
  type SearchBarProps,
  type ClientMenuProps,
  type AppsMenuProps,
  type UserMenuProps,
  type HeaderActionsProps,
} from './navigation';

// Icon System
export {
  Icon,
  IconProvider,
  IconLibrarySwitcher,
  useIconLibrary,
  getAvailableIcons,
  hasIcon,
  getIconName,
  iconSizeMap,
  iconNameMap,
} from './Icon';

// Icon Types
export type {
  IconLibrary,
  IconSize,
  IconContextType,
  TrinityIconProps,
} from './Icon';

// Theme and Token Utilities (re-exported for convenience)
export {
  // Theme creators
  createTrinityTheme,
  lightTheme,
  darkTheme,
  // CSS Variable utilities
  generateCssVariables,
  generateDarkModeCssVariables,
  injectTrinityCssVariables,
  injectDarkModeCssVariables,
  // Accessibility utilities
  getContrastRatio,
  validateAccessibility,
  // Brand colors and accessible combinations
  brandColors,
  accessibleCombinations,
  // Token access hook
  useTrinityTokens,
} from '../theme';

// Token re-exports
export {
  tokens,
  baseTokens,
  semanticTokens,
  componentTokens,
  darkModeTokens,
} from '../tokens';

// Token Type exports
export type {
  TrinityTokens,
  TrinityBaseTokens,
  TrinitySemanticTokens,
  TrinityComponentTokens,
  TrinityDarkModeTokens,
  TrinityColorShades,
  TrinityBaseColors,
  TrinitySpacing,
  TrinityFontSize,
  TrinityFontWeight,
  TrinityBorderRadius,
  TrinityShadows,
  TrinitySemanticColors,
  TrinityTypographyStyle,
  TrinityButtonTokens,
  TrinityInputTokens,
  TrinityCardTokens,
  TrinityNavigationTokens,
} from '../tokens';

// Theme hook types
export type { UseTrinityTokensResult } from '../theme';

// Illustrated Message
export {
  IllustratedMessage,
  UploadDropZone,
  // Individual illustrations for custom use
  EmptyTableIllustration,
  EmptyDraftsIllustration,
  GettingStartedIllustration,
  EmptyDocumentsIllustration,
  EmptyInsightsIllustration,
  NoResultsIllustration,
  ErrorGenericIllustration,
  Error404Illustration,
  Error500Illustration,
  ErrorPermissionIllustration,
  UploadIllustration,
  SuccessIllustration,
  NoNotificationsIllustration,
  NoDataIllustration,
  OfflineIllustration,
} from './IllustratedMessage';

// Illustrated Message Types
export type {
  IllustrationType,
  IllustratedMessageSize,
  IllustratedMessageProps,
  UploadDropZoneProps,
} from './IllustratedMessage';

// Status Indicator (from modular structure)
export {
  // Core Indicators
  IconIndicator,
  ShapeIndicator,
  StatusDot,
  // Badge & Differential
  BadgeIndicator,
  DifferentialIndicator,
  // Chip & Inline
  StatusChip,
  InlineStatus,
  // Legend
  StatusLegend,
  // Utility functions
  getStatusConfig,
  getAllStatusTypes,
  getStatusTypesBySeverity,
} from './StatusIndicator';

// Status Indicator Types
export type {
  StatusType,
  SeverityLevel,
  StatusShape,
  StatusSize,
  StatusConfig,
  IconIndicatorProps,
  ShapeIndicatorProps,
  StatusDotProps,
  BadgeIndicatorProps,
  DifferentialIndicatorProps,
  StatusChipProps,
  InlineStatusProps,
  StatusLegendProps,
  StatusLegendItem,
  ShapeProps,
} from './StatusIndicator';

// AI Components
export {
  // Core AI Components
  AILabel,
  AIAvatar,
  AIExplainability,
  // Chat Components
  AIChatMessage,
  AIChatInput,
  AITypingIndicator,
  AIQuickReply,
  // Content Components
  AISource,
  AISourcesSection,
  AISuggestedAction,
  AICircularAction,
  AIContainer,
  AIPersonaCard,
  AIExpandableSection,
  // Gradient Components
  GradientText,
  StatCard,
  GradientIconBadge,
  // Design Tokens
  aiTokens,
  aiRadius,
  aiSpacing,
} from './AI';

// AI Component Types
export type {
  AILabelSize,
  AILabelVariant,
  AILabelProps,
  AIExplainabilityProps,
  AIAvatarProps,
  MessageRole,
  AIChatMessageProps,
  AIChatInputProps,
  AISourceProps,
  AISourcesSectionProps,
  AISuggestedActionProps,
  AICircularActionProps,
  AIContainerProps,
  AIPersonaCardProps,
  AIExpandableSectionProps,
  AITypingIndicatorProps,
  AIQuickReplyProps,
  GradientTextProps,
  StatCardProps,
  GradientIconBadgeProps,
} from './AI';

// ============================================
// NEW COMPONENTS
// ============================================

// PageHeader Component
export { PageHeader } from './PageHeader';
export type { PageHeaderProps, BreadcrumbItem } from './PageHeader';

// Toast / Notification System
export {
  ToastProvider,
  useToast,
  Toast,
} from './Toast';
export type {
  ToastProps,
  ToastSeverity,
  ToastPosition,
  ToastProviderProps,
  ToastOptions,
} from './Toast';

// DataTable Component
export { DataTable } from './DataTable';
export type {
  DataTableProps,
  TrinityColumnDef,
  RowAction,
} from './DataTable';

// FileUpload Component
export { FileUpload } from './FileUpload';
export type {
  FileUploadProps,
  UploadFile,
  FileUploadVariant,
} from './FileUpload';

// Modal / Dialog Components
export {
  Modal,
  ConfirmDialog,
  useConfirmDialog,
} from './Modal';
export type {
  ModalProps,
  ConfirmDialogProps,
  ModalVariant,
} from './Modal';

// Utility Hooks (re-exported from hooks.ts)
export {
  useDebounce,
  useDebouncedCallback,
  useClipboard,
  useLocalStorage,
  useTrinityBreakpoints,
  useToggle,
  usePrevious,
  useOnClickOutside,
  useKeyPress,
  useInterval,
} from '../hooks';

// ============================================
// CHARTS COMPONENT LIBRARY
// ============================================

// Chart Components
export {
  // Core Chart Components
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  DonutChart,
  ScatterChart,
  BubbleChart,
  RadialBarChart,
  GaugeChart,
  ComposedChart,
  Sparkline,
  // Support Components
  ChartWrapper,
  CustomTooltip,
  SimpleTooltip,
  CustomLegend,
  InteractiveLegend,
  PieLegend,
  // Design Tokens
  chartColorsPrimary,
  chartColorsCategorical,
  chartColorsSequential,
  chartColorsDiverging,
  chartColorsStatus,
  chartTypography,
  chartSpacing,
  chartSizing,
  chartGridStyles,
  chartAxisStyles,
  chartTooltipStyles,
  chartLegendStyles,
  chartAnimation,
  chartTheme,
  getChartColor,
  getChartColors,
} from './Charts';

// Chart Types
export type {
  // Data Types
  DataPoint,
  NamedDataPoint,
  TimeSeriesDataPoint,
  MultiSeriesDataPoint,
  PieDataPoint,
  ScatterDataPoint,
  // Configuration Types
  SeriesConfig,
  AxisConfig,
  LegendConfig,
  LegendPosition,
  LegendAlign,
  TooltipConfig,
  ReferenceLineConfig,
  ReferenceAreaConfig,
  // Chart Props
  BaseChartProps,
  LineChartProps,
  BarChartProps,
  BarChartLayout,
  BarChartVariant,
  AreaChartProps,
  PieChartProps,
  ScatterChartProps,
  ComposedChartProps,
  ComposedSeriesConfig,
  ComposedChartReferenceLineConfig,
  RadialBarChartProps,
  GaugeChartProps,
  SparklineProps,
} from './Charts';

// ============================================================================
// SPRINT 1 & 2 COMPONENTS
// ============================================================================

// SearchInput
export { SearchInput } from './SearchInput';
export type { SearchInputProps, SearchSuggestion } from './SearchInput';

// FilterBar
export { FilterBar } from './FilterBar';
export type { FilterBarProps, FilterConfig, FilterValue, FilterPreset } from './FilterBar';

// DataCard
export { DataCard } from './DataCard';
export type { DataCardProps, TrendDirection } from './DataCard';

// CommandPalette
export { CommandPalette } from './CommandPalette';
export type { CommandPaletteProps, CommandItem, CommandGroup } from './CommandPalette';

// Timeline
export { Timeline, TimelineItemComponent } from './Timeline';
export type { TimelineProps, TimelineItem } from './Timeline';

// ============================================================================
// TEMPLATES
// ============================================================================

// Dashboard Template
export { DashboardTemplate } from './templates/Dashboard';
export type { DashboardTemplateProps, KpiItem, ActivityItem } from './templates/Dashboard/DashboardTemplate';

// Settings Template
export { SettingsTemplate } from './templates/Settings';
export type { SettingsTemplateProps, SettingsSection, SettingsNavItem } from './templates/Settings';

// ListDetail Template
export { ListDetailTemplate } from './templates/ListDetail';
export type { ListDetailTemplateProps, ListDetailItem } from './templates/ListDetail';

// ============================================================================
// ADDITIONAL COMPONENTS
// ============================================================================

// TreeView
export { TreeView } from './TreeView';
export type { TreeViewProps, TreeNode, TreeNodeRenderProps } from './TreeView';

// TransferList
export { TransferList } from './TransferList';
export type { TransferListProps, TransferListItem } from './TransferList';

// Combobox
export { Combobox } from './Combobox';
export type { ComboboxProps, ComboboxOption } from './Combobox';

// SplitPane
export { SplitPane } from './SplitPane';
export type { SplitPaneProps } from './SplitPane';

// RichTextEditor
export { RichTextEditor } from './RichTextEditor';
export type { RichTextEditorProps, ToolbarItem, HeadingLevel, TextAlign } from './RichTextEditor';

// DiffViewer
export { DiffViewer } from './DiffViewer';
export type { DiffViewerProps, DiffViewMode, DiffLine, DiffHunk } from './DiffViewer';

// DockLayout
export { DockLayout } from './DockLayout';
export type { DockLayoutProps, DockPanel, DockZone } from './DockLayout';
