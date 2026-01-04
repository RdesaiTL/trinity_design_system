/**
 * @fileoverview CommandPalette component - keyboard-driven command menu (⌘K pattern)
 * @module components/CommandPalette
 */

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Chip,
  Divider,
  useTheme,
  alpha,
  Fade,
} from '@mui/material';
import {
  Search as SearchIcon,
  KeyboardReturn as EnterIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from '@mui/icons-material';
import { semanticTokens, baseTokens } from '../../tokens';

export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Icon */
  icon?: React.ReactNode;
  /** Keyboard shortcut */
  shortcut?: string[];
  /** Group this command belongs to */
  group?: string;
  /** Action to perform */
  onSelect?: () => void;
  /** Whether the command is disabled */
  disabled?: boolean;
  /** Keywords for search */
  keywords?: string[];
  /** Custom right-side content */
  suffix?: React.ReactNode;
}

export interface CommandGroup {
  /** Group identifier */
  id: string;
  /** Group label */
  label: string;
  /** Group icon */
  icon?: React.ReactNode;
}

export interface CommandPaletteProps {
  /** Whether the palette is open */
  open: boolean;
  /** Callback when palette should close */
  onClose: () => void;
  /** Available commands */
  commands: CommandItem[];
  /** Command groups for organization */
  groups?: CommandGroup[];
  /** Placeholder text */
  placeholder?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Loading state */
  loading?: boolean;
  /** Recent commands */
  recentCommands?: string[];
  /** Callback when a command is selected */
  onCommandSelect?: (command: CommandItem) => void;
  /** Max height of the command list */
  maxHeight?: number;
  /** Show keyboard navigation hints */
  showHints?: boolean;
  /** Custom filter function */
  filterFn?: (command: CommandItem, query: string) => boolean;
}

const ShortcutKey: React.FC<{ shortcut: string }> = ({ shortcut }) => {
  const theme = useTheme();
  return (
    <Box
      component="kbd"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 22,
        height: 22,
        px: 0.75,
        borderRadius: semanticTokens.borders.radiusPx.xs,
        backgroundColor: theme.palette.action.hover,
        border: `1px solid ${theme.palette.divider}`,
        fontSize: '0.75rem',
        fontFamily: 'inherit',
        color: theme.palette.text.secondary,
      }}
    >
      {shortcut}
    </Box>
  );
};

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  commands,
  groups = [],
  placeholder = 'Type a command or search...',
  emptyMessage = 'No commands found',
  loading = false,
  recentCommands = [],
  onCommandSelect,
  maxHeight = 400,
  showHints = true,
  filterFn,
}) => {
  const theme = useTheme();
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const listRef = React.useRef<HTMLUListElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Default filter function
  const defaultFilter = (command: CommandItem, q: string): boolean => {
    const searchText = q.toLowerCase();
    const matchLabel = command.label.toLowerCase().includes(searchText);
    const matchDescription = command.description?.toLowerCase().includes(searchText);
    const matchKeywords = command.keywords?.some((k) => k.toLowerCase().includes(searchText));
    return matchLabel || matchDescription || matchKeywords || false;
  };

  const filter = filterFn || defaultFilter;

  // Filtered and grouped commands
  const filteredCommands = React.useMemo(() => {
    let result = commands;
    
    if (query) {
      result = commands.filter((cmd) => filter(cmd, query));
    } else if (recentCommands.length > 0) {
      // Show recent commands first when no query
      const recent = recentCommands
        .map((id) => commands.find((c) => c.id === id))
        .filter(Boolean) as CommandItem[];
      const others = commands.filter((c) => !recentCommands.includes(c.id));
      result = [...recent, ...others];
    }
    
    return result;
  }, [commands, query, recentCommands, filter]);

  // Group commands
  const groupedCommands = React.useMemo(() => {
    if (query || groups.length === 0) {
      return [{ id: '_all', label: '', commands: filteredCommands }];
    }

    const grouped: { id: string; label: string; commands: CommandItem[] }[] = [];
    const ungrouped: CommandItem[] = [];

    // Add recent group if applicable
    if (recentCommands.length > 0 && !query) {
      const recentItems = recentCommands
        .map((id) => filteredCommands.find((c) => c.id === id))
        .filter(Boolean) as CommandItem[];
      if (recentItems.length > 0) {
        grouped.push({ id: '_recent', label: 'Recent', commands: recentItems.slice(0, 3) });
      }
    }

    groups.forEach((group) => {
      const groupCommands = filteredCommands.filter((c) => c.group === group.id);
      if (groupCommands.length > 0) {
        grouped.push({ id: group.id, label: group.label, commands: groupCommands });
      }
    });

    filteredCommands.forEach((cmd) => {
      if (!cmd.group && !recentCommands.includes(cmd.id)) {
        ungrouped.push(cmd);
      }
    });

    if (ungrouped.length > 0) {
      grouped.push({ id: '_other', label: 'Other', commands: ungrouped });
    }

    return grouped;
  }, [filteredCommands, groups, recentCommands, query]);

  // Flat list for keyboard navigation
  const flatList = React.useMemo(() => {
    return groupedCommands.flatMap((g) => g.commands);
  }, [groupedCommands]);

  // Reset selection when query changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Reset when opened
  React.useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < flatList.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatList.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (flatList[selectedIndex]) {
          handleSelect(flatList[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  // Scroll selected item into view
  React.useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      selectedEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleSelect = (command: CommandItem) => {
    if (command.disabled) return;
    command.onSelect?.();
    onCommandSelect?.(command);
    onClose();
  };

  let currentIndex = -1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={150}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: alpha(theme.palette.common.black, 0.5),
            backdropFilter: 'blur(4px)',
          },
        },
      }}
      PaperProps={{
        elevation: 24,
        sx: {
          borderRadius: semanticTokens.borders.radiusPx.md,
          overflow: 'hidden',
          position: 'fixed',
          top: '15%',
          maxHeight: '70vh',
        },
      }}
    >
      {/* Search Input */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1.5 }} />
        <InputBase
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          fullWidth
          sx={{
            fontSize: baseTokens.fontSize.lg,
            '& .MuiInputBase-input': {
              p: 0,
            },
          }}
        />
        {query && (
          <Chip
            label="ESC"
            size="small"
            onClick={() => setQuery('')}
            sx={{ height: 22, fontSize: baseTokens.fontSize.xs }}
          />
        )}
      </Box>

      {/* Command List */}
      <DialogContent sx={{ p: 0, maxHeight, overflow: 'auto' }}>
        {loading ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">Loading commands...</Typography>
          </Box>
        ) : flatList.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">{emptyMessage}</Typography>
          </Box>
        ) : (
          <List ref={listRef} disablePadding>
            {groupedCommands.map((group, groupIndex) => (
              <React.Fragment key={group.id}>
                {group.label && (
                  <Box sx={{ px: 2, py: 1, bgcolor: theme.palette.action.hover }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                      textTransform="uppercase"
                      letterSpacing={0.5}
                    >
                      {group.label}
                    </Typography>
                  </Box>
                )}
                {group.commands.map((command) => {
                  currentIndex++;
                  const idx = currentIndex;
                  const isSelected = selectedIndex === idx;

                  return (
                    <ListItem key={command.id} disablePadding data-index={idx}>
                      <ListItemButton
                        selected={isSelected}
                        disabled={command.disabled}
                        onClick={() => handleSelect(command)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        sx={{
                          py: 1.5,
                          px: 2,
                          '&.Mui-selected': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          },
                          '&.Mui-selected:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.12),
                          },
                        }}
                      >
                        {command.icon && (
                          <ListItemIcon sx={{ minWidth: 36, color: theme.palette.text.secondary }}>
                            {command.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={command.label}
                          secondary={command.description}
                          primaryTypographyProps={{
                            fontWeight: isSelected ? 600 : 400,
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption',
                            sx: { mt: 0.25 },
                          }}
                        />
                        {command.suffix}
                        {command.shortcut && (
                          <Box sx={{ display: 'flex', gap: 0.5, ml: 2 }}>
                            {command.shortcut.map((key, i) => (
                              <ShortcutKey key={i} shortcut={key} />
                            ))}
                          </Box>
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
                {groupIndex < groupedCommands.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>

      {/* Footer Hints */}
      {showHints && flatList.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            px: 2,
            py: 1,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.action.hover,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ArrowUpIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
            <ArrowDownIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
            <Typography variant="caption" color="text.secondary">
              Navigate
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <EnterIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
            <Typography variant="caption" color="text.secondary">
              Select
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            <Box component="kbd" sx={{ fontFamily: 'inherit' }}>ESC</Box> Close
          </Typography>
        </Box>
      )}
    </Dialog>
  );
};
