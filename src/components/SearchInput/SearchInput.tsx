/**
 * @fileoverview SearchInput component with suggestions, recent searches, and keyboard navigation
 * @module components/SearchInput
 */

import * as React from 'react';
import {
  Box,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Chip,
  Divider,
  Popper,
  ClickAwayListener,
  Fade,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  History as HistoryIcon,
  TrendingUp as TrendingIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { semanticTokens } from '../../tokens';

export interface SearchSuggestion {
  /** Unique identifier */
  id: string;
  /** Display text */
  label: string;
  /** Optional category/type */
  category?: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Optional metadata */
  metadata?: string;
}

export interface SearchInputProps {
  /** Current search value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when search is submitted */
  onSearch?: (value: string) => void;
  /** Callback when a suggestion is selected */
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  /** Placeholder text */
  placeholder?: string;
  /** List of suggestions to display */
  suggestions?: SearchSuggestion[];
  /** Recent search terms */
  recentSearches?: string[];
  /** Callback to clear recent searches */
  onClearRecentSearches?: () => void;
  /** Callback to remove a single recent search */
  onRemoveRecentSearch?: (search: string) => void;
  /** Loading state for suggestions */
  loading?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Full width */
  fullWidth?: boolean;
  /** Show keyboard shortcut hint */
  showShortcut?: boolean;
  /** Custom shortcut key */
  shortcutKey?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Maximum recent searches to show */
  maxRecentSearches?: number;
  /** Debounce delay for onChange in ms */
  debounceMs?: number;
}

const sizeStyles = {
  small: {
    height: 36,
    fontSize: semanticTokens.typography.body.small.fontSize,
    padding: `${semanticTokens.inline.tight}px ${semanticTokens.inline.compact}px`,
    iconSize: 18,
  },
  medium: {
    height: 44,
    fontSize: semanticTokens.typography.body.medium.fontSize,
    padding: `${semanticTokens.inline.compact}px ${semanticTokens.inline.comfortable}px`,
    iconSize: 20,
  },
  large: {
    height: 52,
    fontSize: semanticTokens.typography.body.large.fontSize,
    padding: `${semanticTokens.inline.compact}px ${semanticTokens.inline.spacious}px`,
    iconSize: 24,
  },
};

export const SearchInput: React.FC<SearchInputProps> = ({
  value: controlledValue,
  onChange,
  onSearch,
  onSuggestionSelect,
  placeholder = 'Search...',
  suggestions = [],
  recentSearches = [],
  onClearRecentSearches,
  onRemoveRecentSearch,
  loading = false,
  disabled = false,
  size = 'medium',
  fullWidth = false,
  showShortcut = true,
  shortcutKey = '⌘K',
  autoFocus = false,
  maxRecentSearches = 5,
  debounceMs = 300,
}) => {
  const theme = useTheme();
  const [internalValue, setInternalValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const styles = sizeStyles[size];

  // Filter recent searches based on current input
  const filteredRecent = React.useMemo(() => {
    if (!value) return recentSearches.slice(0, maxRecentSearches);
    return recentSearches
      .filter((s) => s.toLowerCase().includes(value.toLowerCase()))
      .slice(0, maxRecentSearches);
  }, [recentSearches, value, maxRecentSearches]);

  // Combined list for keyboard navigation
  const allItems = React.useMemo(() => {
    const items: { type: 'suggestion' | 'recent'; data: SearchSuggestion | string }[] = [];
    suggestions.forEach((s) => items.push({ type: 'suggestion', data: s }));
    if (!value && filteredRecent.length > 0) {
      filteredRecent.forEach((r) => items.push({ type: 'recent', data: r }));
    }
    return items;
  }, [suggestions, filteredRecent, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onChange?.(newValue);
    }, debounceMs);
  };

  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
    inputRef.current?.focus();
  };

  const handleSubmit = (searchValue: string) => {
    if (searchValue.trim()) {
      onSearch?.(searchValue.trim());
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setInternalValue(suggestion.label);
    onChange?.(suggestion.label);
    onSuggestionSelect?.(suggestion);
    setIsOpen(false);
  };

  const handleRecentClick = (recent: string) => {
    setInternalValue(recent);
    onChange?.(recent);
    handleSubmit(recent);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < allItems.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev > 0 ? prev - 1 : allItems.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && allItems[highlightedIndex]) {
          const item = allItems[highlightedIndex];
          if (item.type === 'suggestion') {
            handleSuggestionClick(item.data as SearchSuggestion);
          } else {
            handleRecentClick(item.data as string);
          }
        } else {
          handleSubmit(value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleClickAway = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Global keyboard shortcut
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const showDropdown = isOpen && (suggestions.length > 0 || (!value && filteredRecent.length > 0));

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        ref={anchorRef}
        sx={{
          position: 'relative',
          width: fullWidth ? '100%' : 'auto',
          minWidth: fullWidth ? undefined : 280,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: styles.height,
            borderRadius: semanticTokens.borders.radiusPx.xs,
            border: `1px solid ${
              isOpen 
                ? theme.palette.primary.main 
                : theme.palette.divider
            }`,
            backgroundColor: theme.palette.background.paper,
            transition: `all ${semanticTokens.motion.duration.fast} ${semanticTokens.motion.easing.default}`,
            '&:hover': {
              borderColor: disabled 
                ? theme.palette.divider 
                : theme.palette.primary.light,
            },
            ...(isOpen && {
              boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
            }),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: styles.height,
              color: theme.palette.text.secondary,
            }}
          >
            <SearchIcon sx={{ fontSize: styles.iconSize }} />
          </Box>

          <InputBase
            ref={inputRef}
            value={value}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            // eslint-disable-next-line jsx-a11y/no-autofocus -- Controlled via prop, intentional for search focus UX
            autoFocus={autoFocus}
            sx={{
              flex: 1,
              fontSize: styles.fontSize,
              '& .MuiInputBase-input': {
                padding: 0,
                '&::placeholder': {
                  color: theme.palette.text.secondary,
                  opacity: 0.7,
                },
              },
            }}
          />

          {value && (
            <IconButton
              size="small"
              onClick={handleClear}
              sx={{
                mr: 0.5,
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              <CloseIcon sx={{ fontSize: styles.iconSize - 2 }} />
            </IconButton>
          )}

          {showShortcut && !value && (
            <Chip
              label={shortcutKey}
              size="small"
              sx={{
                mr: 1,
                height: 22,
                fontSize: semanticTokens.typography.label.small.fontSize,
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.text.secondary,
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          )}
        </Paper>

        { }
        <Popper
          open={showDropdown}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          transition
          style={{ width: anchorRef.current?.offsetWidth, zIndex: 1000 }}
        >
          { }
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={200}>
              <Paper
                elevation={8}
                sx={{
                  mt: 0.5,
                  borderRadius: semanticTokens.borders.radiusPx.sm,
                  border: `1px solid ${theme.palette.divider}`,
                  maxHeight: 400,
                  overflow: 'auto',
                }}
              >
                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <List dense disablePadding>
                    {suggestions.map((suggestion, index) => (
                      <ListItem key={suggestion.id} disablePadding>
                        <ListItemButton
                          onClick={() => handleSuggestionClick(suggestion)}
                          selected={highlightedIndex === index}
                          sx={{
                            py: 1.5,
                            '&.Mui-selected': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {suggestion.icon || <TrendingIcon fontSize="small" />}
                          </ListItemIcon>
                          <ListItemText
                            primary={suggestion.label}
                            secondary={suggestion.metadata}
                            primaryTypographyProps={{
                              fontWeight: highlightedIndex === index ? 600 : 400,
                            }}
                          />
                          {suggestion.category && (
                            <Chip
                              label={suggestion.category}
                              size="small"
                              sx={{
                                ml: 1,
                                height: 20,
                                fontSize: semanticTokens.typography.label.small.fontSize,
                              }}
                            />
                          )}
                          <ArrowIcon
                            fontSize="small"
                            sx={{
                              ml: 1,
                              color: theme.palette.text.secondary,
                              opacity: highlightedIndex === index ? 1 : 0,
                              transition: `opacity ${semanticTokens.motion.duration.fast}`,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}

                {/* Recent Searches */}
                {!value && filteredRecent.length > 0 && (
                  <>
                    {suggestions.length > 0 && <Divider />}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                        textTransform="uppercase"
                        letterSpacing={0.5}
                      >
                        Recent Searches
                      </Typography>
                      {onClearRecentSearches && (
                        <Typography
                          variant="caption"
                          color="primary"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                          onClick={onClearRecentSearches}
                        >
                          Clear all
                        </Typography>
                      )}
                    </Box>
                    <List dense disablePadding>
                      {filteredRecent.map((recent, index) => {
                        const itemIndex = suggestions.length + index;
                        return (
                          <ListItem
                            key={recent}
                            disablePadding
                            secondaryAction={
                              onRemoveRecentSearch && (
                                <IconButton
                                  edge="end"
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveRecentSearch(recent);
                                  }}
                                  sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              )
                            }
                          >
                            <ListItemButton
                              onClick={() => handleRecentClick(recent)}
                              selected={highlightedIndex === itemIndex}
                              sx={{
                                py: 1,
                                '&.Mui-selected': {
                                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <HistoryIcon
                                  fontSize="small"
                                  sx={{ color: theme.palette.text.secondary }}
                                />
                              </ListItemIcon>
                              <ListItemText primary={recent} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </>
                )}

                {/* Loading state */}
                {loading && (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Searching...
                    </Typography>
                  </Box>
                )}

                {/* No results */}
                {!loading && value && suggestions.length === 0 && (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No results found for "{value}"
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};
