/**
 * AIFabLayout Component
 * 
 * A flexible layout template that supports two navigation styles:
 * - "sidebar" (default): TopNavWithSidebar - Full navigation with collapsible sidebar
 * - "topnav": TopNavHeader - Simple top navigation without sidebar
 * 
 * Both styles include FAB-triggered AI panel functionality.
 * 
 * @example Sidebar Navigation (default)
 * ```tsx
 * <AIFabLayout
 *   navStyle="sidebar"
 *   appTitle="My App"
 *   navItems={[{ id: 'home', label: 'Home', icon: <HomeIcon /> }]}
 * >
 *   <YourContent />
 * </AIFabLayout>
 * ```
 * 
 * @example Top Navigation Only
 * ```tsx
 * <AIFabLayout
 *   navStyle="topnav"
 *   appTitle="My App"
 * >
 *   <YourContent />
 * </AIFabLayout>
 * ```
 */

import React, { useState, useCallback } from 'react';
import { Box, useTheme, SxProps, Theme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import { AIFab, AIFabProps } from './AIFab';
import { InsightEnginePanel, InsightEnginePanelProps, ChatMessage } from './InsightEnginePanel';
import { ResizablePanel } from './ResizablePanel';
import TopNavWithSidebar from '../TopNavWithSidebar';
import TopNavHeader from '../TopNavHeader';
import { brandColors } from '../../tokens';

// ============================================================================
// Types
// ============================================================================

/** Navigation style options */
export type NavStyle = 'sidebar' | 'topnav';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
}

export interface Client {
  id: string;
  name: string;
}

export interface AIFabLayoutProps {
  /**
   * Navigation style to use:
   * - "sidebar": TopNavWithSidebar - Header with collapsible left sidebar
   * - "topnav": TopNavHeader - Simple top navigation without sidebar
   * @default "sidebar"
   */
  navStyle?: NavStyle;
  /** Application title shown in header */
  appTitle?: string;
  /** Navigation items for the sidebar (only used when navStyle="sidebar") */
  navItems?: NavItem[];
  /** Currently selected navigation item ID (only used when navStyle="sidebar") */
  selectedNav?: string;
  /** Callback when navigation item is clicked (only used when navStyle="sidebar") */
  onNavClick?: (navId: string) => void;
  /** User information for the header */
  user?: UserInfo;
  /** Callback for user actions (profile, settings, logout) */
  onUserAction?: (action: string) => void;
  /** Callback when search is submitted */
  onSearch?: (query: string) => void;
  /** Client list for the client selector */
  clients?: Client[];
  /** Currently selected client name */
  clientName?: string;
  /** Callback when client is changed */
  onClientChange?: (clientId: string) => void;
  /** Main content */
  children: React.ReactNode;
  /** Custom sx props for the main content area */
  contentSx?: SxProps<Theme>;
  /** Props for the AI FAB button */
  fabProps?: Partial<AIFabProps>;
  /** Props for the InsightEnginePanel */
  panelProps?: Partial<InsightEnginePanelProps>;
  /** Controlled open state for AI panel */
  aiPanelOpen?: boolean;
  /** Callback when AI panel state changes */
  onAIPanelChange?: (open: boolean) => void;
  /** Initial messages for the AI panel */
  initialMessages?: ChatMessage[];
  /** Callback when a message is sent */
  onSendMessage?: (message: string, options?: { proSearch?: boolean; focus?: string }) => void;
  /** Whether the AI is typing */
  isTyping?: boolean;
  /** Default width of the AI panel */
  defaultPanelWidth?: number;
  /** Minimum width of the AI panel */
  minPanelWidth?: number;
  /** Maximum width of the AI panel */
  maxPanelWidth?: number;
}

// ============================================================================
// Default Values
// ============================================================================

const defaultNavItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <AssessmentIcon /> },
  { id: 'contacts', label: 'Contacts', icon: <PeopleIcon /> },
  { id: 'documents', label: 'Documents', icon: <FolderIcon /> },
];

const defaultUser: UserInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  initials: 'JD',
};

const defaultClients: Client[] = [
  { id: '1', name: 'Long Client Name 1' },
  { id: '2', name: 'Long Client Name 2' },
  { id: '3', name: 'Client ABC' },
];

// AppBar height constant
const APPBAR_HEIGHT = 56;

/**
 * AIFabLayout - Flexible application layout with FAB-triggered AI panel
 * 
 * This template provides two navigation styles:
 * 1. "sidebar" (default) - Full navigation with TopNavWithSidebar
 * 2. "topnav" - Simple top navigation with TopNavHeader
 * 
 * Both include the AI FAB and resizable panel functionality.
 * 
 * CUSTOMIZATION GUIDE:
 * --------------------
 * This is a TEMPLATE/STRUCTURE component. Customize it by:
 * 
 * 1. Navigation Style: Set `navStyle` prop
 *    - "sidebar": Use when you need section-based navigation
 *    - "topnav": Use for simpler apps without sidebar
 * 
 * 2. Content Area: Pass your content as children
 *    - The content receives padding via `contentSx` prop
 *    - Override styles using `contentSx={{ p: 0, backgroundColor: 'custom' }}`
 * 
 * 3. AI Panel: Customize via `panelProps`
 *    - Pass custom handlers, initial messages, etc.
 * 
 * 4. FAB Button: Customize via `fabProps`
 *    - Change position, tooltip, badge, etc.
 */
export const AIFabLayout: React.FC<AIFabLayoutProps> = ({
  navStyle = 'sidebar',
  appTitle = 'Trinity App',
  navItems = defaultNavItems,
  selectedNav: controlledSelectedNav,
  onNavClick,
  user = defaultUser,
  onUserAction,
  onSearch,
  clients = defaultClients,
  clientName = 'Long Client Name 1',
  onClientChange,
  children,
  contentSx,
  fabProps = {},
  panelProps = {},
  aiPanelOpen: controlledPanelOpen,
  onAIPanelChange,
  initialMessages = [],
  onSendMessage,
  isTyping = false,
  defaultPanelWidth = 420,
  minPanelWidth = 350,
  maxPanelWidth = 700,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Internal state
  const [internalSelectedNav, setInternalSelectedNav] = useState(navItems[0]?.id || '');
  const [internalPanelOpen, setInternalPanelOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Use controlled or internal state
  const selectedNav = controlledSelectedNav ?? internalSelectedNav;
  const aiPanelOpen = controlledPanelOpen ?? internalPanelOpen;

  // Calculate user initials from name
  const userInitials = user.initials || user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  // Handlers
  const handleNavClick = useCallback((navId: string) => {
    setInternalSelectedNav(navId);
    onNavClick?.(navId);
  }, [onNavClick]);

  const handleToggleAIPanel = useCallback(() => {
    const newOpen = !aiPanelOpen;
    if (controlledPanelOpen === undefined) {
      setInternalPanelOpen(newOpen);
    }
    onAIPanelChange?.(newOpen);
  }, [aiPanelOpen, controlledPanelOpen, onAIPanelChange]);

  const handleCloseAIPanel = useCallback(() => {
    if (controlledPanelOpen === undefined) {
      setInternalPanelOpen(false);
    }
    setIsFullscreen(false);
    onAIPanelChange?.(false);
  }, [controlledPanelOpen, onAIPanelChange]);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  // ==========================================================================
  // Content with AI Panel (shared between both navigation styles)
  // ==========================================================================
  const contentWithPanel = (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {/* Main Content */}
      {!isFullscreen && (
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
            minHeight: 0,
            backgroundColor: 'background.default',
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...contentSx,
          }}
        >
          {children}
        </Box>
      )}

      {/* AI Panel - Fullscreen Mode */}
      {isFullscreen && aiPanelOpen && (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: isDark ? brandColors.neutral.darkBg : brandColors.neutral.white,
            overflow: 'hidden',
            height: '100%',
            minHeight: 0,
          }}
        >
          <InsightEnginePanel
            initialMessages={initialMessages}
            onSendMessage={onSendMessage}
            isTyping={isTyping}
            onClose={handleCloseAIPanel}
            isFullscreen={isFullscreen}
            onFullscreenToggle={handleToggleFullscreen}
            showControls
            userInitials={userInitials}
            {...panelProps}
          />
        </Box>
      )}

      {/* AI Panel - Side Panel Mode */}
      {!isFullscreen && aiPanelOpen && (
        <ResizablePanel
          open={aiPanelOpen}
          onClose={handleCloseAIPanel}
          defaultWidth={defaultPanelWidth}
          minWidth={minPanelWidth}
          maxWidth={maxPanelWidth}
          showCloseButton={false}
          sx={{ minHeight: 0 }}
        >
          <InsightEnginePanel
            initialMessages={initialMessages}
            onSendMessage={onSendMessage}
            isTyping={isTyping}
            onClose={handleCloseAIPanel}
            isFullscreen={isFullscreen}
            onFullscreenToggle={handleToggleFullscreen}
            showControls
            userInitials={userInitials}
            {...panelProps}
          />
        </ResizablePanel>
      )}

      {/* FAB Button - hidden when panel is open or in fullscreen */}
      {!isFullscreen && !aiPanelOpen && (
        <AIFab
          open={aiPanelOpen}
          onClick={handleToggleAIPanel}
          position="bottom-right"
          tooltip="Ask AI Assistant"
          {...fabProps}
        />
      )}
    </Box>
  );

  // ==========================================================================
  // Render based on navigation style
  // ==========================================================================
  
  // Style 1: TopNavWithSidebar - Full navigation with collapsible sidebar
  if (navStyle === 'sidebar') {
    return (
      <TopNavWithSidebar
        appName={appTitle}
        clientName={clientName}
        clients={clients}
        onClientChange={onClientChange}
        userInitials={userInitials}
        userName={user.name}
        userEmail={user.email}
        onSearch={onSearch}
        onUserMenuClick={onUserAction}
        navItems={navItems}
        selectedNavItem={selectedNav}
        onNavItemClick={handleNavClick}
      >
        {contentWithPanel}
      </TopNavWithSidebar>
    );
  }

  // Style 2: TopNavHeader - Simple top navigation without sidebar
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNavHeader
        appName={appTitle}
        clientName={clientName}
        clients={clients}
        onClientChange={onClientChange}
        userInitials={userInitials}
        userName={user.name}
        userEmail={user.email}
        onSearch={onSearch}
        onUserMenuClick={onUserAction}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          mt: `${APPBAR_HEIGHT}px`,
          minHeight: 0,
        }}
      >
        {contentWithPanel}
      </Box>
    </Box>
  );
};

export default AIFabLayout;
