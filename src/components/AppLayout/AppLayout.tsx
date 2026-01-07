/**
 * AppLayout Component
 * A complete application layout template with TopNav, Sidebar, and optional AI panel
 * Uses the TopNavWithSidebar component for header and sidebar navigation
 */

import React, { useState, useCallback } from 'react';
import {
  Box,
  useTheme,
  SxProps,
  Theme,
} from '@mui/material';
// brandColors removed - use MUI theme tokens
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TopNavWithSidebar from '../TopNavWithSidebar';
import { ResizablePanel } from './ResizablePanel';
import { InsightEnginePanel, ChatMessage } from './InsightEnginePanel';

// ============================================================================
// Types
// ============================================================================

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isSpecial?: boolean;
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

export interface AppLayoutProps {
  /** Application title shown in header */
  appTitle?: string;
  /** Navigation items for the sidebar */
  navItems?: NavItem[];
  /** Currently selected navigation item ID */
  selectedNav?: string;
  /** Callback when navigation item is clicked */
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
  /** Enable AI Insight Engine panel */
  enableInsightEngine?: boolean;
  /** Initial state of Insight Engine panel */
  insightEnginePanelOpen?: boolean;
  /** Callback when Insight Engine panel state changes */
  onInsightEnginePanelChange?: (open: boolean) => void;
  /** Chat messages for Insight Engine */
  insightEngineMessages?: ChatMessage[];
  /** Callback when user sends message to Insight Engine */
  onInsightEngineSend?: (message: string) => void;
  /** Whether Insight Engine is typing */
  insightEngineTyping?: boolean;
  /** Main content */
  children: React.ReactNode;
  /** Custom sx props for the main content area */
  contentSx?: SxProps<Theme>;
}

// ============================================================================
// Default Nav Items
// ============================================================================

const defaultNavItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <AssessmentIcon /> },
  { id: 'contacts', label: 'Contacts', icon: <PeopleIcon /> },
  { id: 'documents', label: 'Documents', icon: <FolderIcon /> },
  { id: 'insight-engine', label: 'Insight Engine', icon: <AutoAwesomeIcon />, isSpecial: true },
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

// ============================================================================
// Constants
// ============================================================================

const _APPBAR_HEIGHT = 56;

/**
 * AppLayout - A complete application layout template for Trinity-based applications.
 * 
 * Features:
 * - Top navigation header with search, client selector, and user menu (via TopNavWithSidebar)
 * - Collapsible left sidebar navigation
 * - Optional AI-powered Insight Engine panel (resizable)
 * - Responsive main content area
 * 
 * @example
 * ```tsx
 * <AppLayout
 *   appTitle="My App"
 *   enableInsightEngine
 *   onInsightEngineSend={(msg) => console.log(msg)}
 * >
 *   <YourContent />
 * </AppLayout>
 * ```
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
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
  enableInsightEngine = true,
  insightEnginePanelOpen: controlledPanelOpen,
  onInsightEnginePanelChange,
  insightEngineMessages = [],
  onInsightEngineSend,
  insightEngineTyping = false,
  children,
  contentSx,
}) => {
  const theme = useTheme();

  // Internal state
  const [internalSelectedNav, setInternalSelectedNav] = useState(navItems[0]?.id || '');
  const [internalPanelOpen, setInternalPanelOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Use controlled or internal state
  const selectedNav = controlledSelectedNav ?? internalSelectedNav;
  const insightPanelOpen = controlledPanelOpen ?? internalPanelOpen;

  // Handlers
  const handleNavClick = useCallback((navId: string) => {
    if (navId === 'insight-engine' && enableInsightEngine) {
      const newOpenState = !insightPanelOpen;
      setInternalPanelOpen(newOpenState);
      onInsightEnginePanelChange?.(newOpenState);
    }
    
    setInternalSelectedNav(navId);
    onNavClick?.(navId);
  }, [enableInsightEngine, insightPanelOpen, onInsightEnginePanelChange, onNavClick]);

  const handleCloseInsightPanel = useCallback(() => {
    setInternalPanelOpen(false);
    setIsFullscreen(false);
    onInsightEnginePanelChange?.(false);
  }, [onInsightEnginePanelChange]);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  // Calculate user initials from name
  const userInitials = user.initials || user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  // Wrap children in content container with AI panel support
  const contentWithPanel = (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100%',
        minHeight: 0, // Important: allows flex children to shrink below content size
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
            minHeight: 0, // Important: allows flex children to shrink
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

      {/* Insight Engine Panel */}
      {enableInsightEngine && insightPanelOpen && (
        isFullscreen ? (
          // Fullscreen mode - panel takes entire content area
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.paper', // Use MUI theme
              overflow: 'hidden',
              height: '100%',
              minHeight: 0,
            }}
          >
            <InsightEnginePanel
              initialMessages={insightEngineMessages}
              onSendMessage={onInsightEngineSend}
              isTyping={insightEngineTyping}
              onClose={handleCloseInsightPanel}
              isFullscreen={isFullscreen}
              onFullscreenToggle={handleToggleFullscreen}
              showControls
            />
          </Box>
        ) : (
          // Side panel mode - resizable panel on the right
          <ResizablePanel
            open={insightPanelOpen}
            onClose={handleCloseInsightPanel}
            defaultWidth={420}
            minWidth={350}
            maxWidth={700}
            showCloseButton={false}
            sx={{ minHeight: 0 }}
          >
            <InsightEnginePanel
              initialMessages={insightEngineMessages}
              onSendMessage={onInsightEngineSend}
              isTyping={insightEngineTyping}
              onClose={handleCloseInsightPanel}
              isFullscreen={isFullscreen}
              onFullscreenToggle={handleToggleFullscreen}
              showControls
            />
          </ResizablePanel>
        )
      )}
    </Box>
  );

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
};

export default AppLayout;
