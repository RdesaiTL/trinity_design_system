/**
 * Navigation - Hooks
 * Custom hooks for navigation state management
 */

import { useState, useCallback } from 'react';
import { Client, App } from './types';

// ============================================================================
// USE CLIENT SELECTOR
// ============================================================================

export interface UseClientSelectorOptions {
  initialClient?: string;
  onClientChange?: (clientId: string) => void;
}

export interface UseClientSelectorReturn {
  selectedClient: string;
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleSelect: (client: Client) => void;
}

export const useClientSelector = ({
  initialClient = '',
  onClientChange,
}: UseClientSelectorOptions): UseClientSelectorReturn => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedClient, setSelectedClient] = useState(initialClient);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSelect = useCallback((client: Client) => {
    setSelectedClient(client.name);
    onClientChange?.(client.id);
    setAnchorEl(null);
  }, [onClientChange]);

  return {
    selectedClient,
    anchorEl,
    isOpen: Boolean(anchorEl),
    handleClick,
    handleClose,
    handleSelect,
  };
};

// ============================================================================
// USE USER MENU
// ============================================================================

export interface UseUserMenuOptions {
  onUserMenuClick?: (action: string) => void;
}

export interface UseUserMenuReturn {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleAction: (action: string) => void;
}

export const useUserMenu = ({
  onUserMenuClick,
}: UseUserMenuOptions): UseUserMenuReturn => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleAction = useCallback((action: string) => {
    onUserMenuClick?.(action);
    setAnchorEl(null);
  }, [onUserMenuClick]);

  return {
    anchorEl,
    isOpen: Boolean(anchorEl),
    handleClick,
    handleClose,
    handleAction,
  };
};

// ============================================================================
// USE APPS MENU
// ============================================================================

export interface UseAppsMenuOptions {
  onAppsClick?: (appId: string) => void;
}

export interface UseAppsMenuReturn {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleSelect: (appId: string) => void;
}

export const useAppsMenu = ({
  onAppsClick,
}: UseAppsMenuOptions): UseAppsMenuReturn => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSelect = useCallback((appId: string) => {
    onAppsClick?.(appId);
    setAnchorEl(null);
  }, [onAppsClick]);

  return {
    anchorEl,
    isOpen: Boolean(anchorEl),
    handleClick,
    handleClose,
    handleSelect,
  };
};

// ============================================================================
// USE SEARCH
// ============================================================================

export interface UseSearchOptions {
  onSearch?: (query: string) => void;
}

export interface UseSearchReturn {
  value: string;
  isFocused: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent) => void;
  handleClear: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
}

export const useSearch = ({
  onSearch,
}: UseSearchOptions): UseSearchReturn => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch?.(value);
    }
  }, [onSearch, value]);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return {
    value,
    isFocused,
    handleChange,
    handleKeyPress,
    handleClear,
    handleFocus,
    handleBlur,
  };
};

// ============================================================================
// USE SIDEBAR
// ============================================================================

export interface UseSidebarOptions {
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export interface UseSidebarReturn {
  isExpanded: boolean;
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
}

export const useSidebar = ({
  defaultExpanded = true,
  onExpandedChange,
}: UseSidebarOptions = {}): UseSidebarReturn => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggle = useCallback(() => {
    setIsExpanded((prev) => {
      const newValue = !prev;
      onExpandedChange?.(newValue);
      return newValue;
    });
  }, [onExpandedChange]);

  const expand = useCallback(() => {
    setIsExpanded(true);
    onExpandedChange?.(true);
  }, [onExpandedChange]);

  const collapse = useCallback(() => {
    setIsExpanded(false);
    onExpandedChange?.(false);
  }, [onExpandedChange]);

  return {
    isExpanded,
    toggle,
    expand,
    collapse,
  };
};
