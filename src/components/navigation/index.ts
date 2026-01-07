/**
 * Navigation Module
 * Shared navigation utilities for Trinity Design System
 * 
 * @module navigation
 */

// ============================================================================
// TYPES
// ============================================================================
export type {
  App,
  Client,
  NavItem,
  UserInfo,
  SearchConfig,
  BaseNavProps,
} from './types';

// ============================================================================
// STYLED COMPONENTS
// ============================================================================
export {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  ClearButton,
  ClientSelector,
  HeaderIconButton,
  LogoWrapper,
} from './styled';

// ============================================================================
// HOOKS
// ============================================================================
export {
  useClientSelector,
  useUserMenu,
  useAppsMenu,
  useSearch,
  useSidebar,
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
} from './hooks';

// ============================================================================
// COMPONENTS
// ============================================================================
export {
  TrinityLogo,
  SearchBar,
  ClientMenu,
  AppsMenu,
  UserMenu,
  HeaderActions,
  type TrinityLogoProps,
  type SearchBarProps,
  type ClientMenuProps,
  type AppsMenuProps,
  type UserMenuProps,
  type HeaderActionsProps,
} from './components';
