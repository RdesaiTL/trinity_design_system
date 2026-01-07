/**
 * Navigation - Shared Types
 * Common type definitions for navigation components
 */

export interface App {
  id: string;
  name: string;
  url?: string;
}

export interface Client {
  id: string;
  name: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isSpecial?: boolean;
  badge?: number;
  disabled?: boolean;
  href?: string;
}

export interface UserInfo {
  initials?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export interface SearchConfig {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
}

export interface BaseNavProps {
  /** Application name displayed in the header */
  appName?: string;
  /** Current client name */
  clientName?: string;
  /** List of available clients */
  clients?: Client[];
  /** Callback when client changes */
  onClientChange?: (clientId: string) => void;
  /** User initials for avatar fallback */
  userInitials?: string;
  /** User display name */
  userName?: string;
  /** User email */
  userEmail?: string;
  /** Search callback */
  onSearch?: (query: string) => void;
  /** Apps menu click handler */
  onAppsClick?: (appId: string) => void;
  /** User menu action handler */
  onUserMenuClick?: (action: string) => void;
  /** List of available apps */
  apps?: App[];
}
