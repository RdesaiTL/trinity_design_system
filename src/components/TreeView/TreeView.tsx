import * as React from 'react';
import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
  alpha,
  useTheme,
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  InsertDriveFile as FileIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

// ============================================
// Types
// ============================================

export interface TreeNode {
  /** Unique identifier for the node */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Child nodes */
  children?: TreeNode[];
  /** Whether node is disabled */
  disabled?: boolean;
  /** Custom data attached to node */
  data?: Record<string, unknown>;
}

export interface TreeViewProps {
  /** Tree data structure */
  data: TreeNode[];
  /** Currently selected node IDs */
  selected?: string[];
  /** Currently expanded node IDs */
  expanded?: string[];
  /** Enable multi-select mode */
  multiSelect?: boolean;
  /** Show checkboxes for selection */
  showCheckboxes?: boolean;
  /** Enable search/filter */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Show folder/file icons */
  showIcons?: boolean;
  /** Default icon for leaf nodes */
  defaultLeafIcon?: React.ReactNode;
  /** Default icon for branch nodes (collapsed) */
  defaultBranchIcon?: React.ReactNode;
  /** Default icon for branch nodes (expanded) */
  defaultBranchOpenIcon?: React.ReactNode;
  /** Indent size in pixels */
  indentSize?: number;
  /** Dense mode */
  dense?: boolean;
  /** Callback when selection changes */
  onSelect?: (nodeIds: string[]) => void;
  /** Callback when expansion changes */
  onExpand?: (nodeIds: string[]) => void;
  /** Callback when node is clicked */
  onNodeClick?: (node: TreeNode) => void;
  /** Callback when node is double clicked */
  onNodeDoubleClick?: (node: TreeNode) => void;
  /** Custom node render function */
  renderNode?: (node: TreeNode, props: TreeNodeRenderProps) => React.ReactNode;
  /** Enable drag and drop */
  draggable?: boolean;
  /** Callback when node is dropped */
  onDrop?: (draggedId: string, targetId: string, position: 'before' | 'after' | 'inside') => void;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  sx?: Record<string, unknown>;
}

export interface TreeNodeRenderProps {
  isExpanded: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  level: number;
  hasChildren: boolean;
}

// ============================================
// TreeItem Component
// ============================================

interface TreeItemProps {
  node: TreeNode;
  level: number;
  expanded: Set<string>;
  selected: Set<string>;
  indentSize: number;
  dense: boolean;
  showCheckboxes: boolean;
  showIcons: boolean;
  multiSelect: boolean;
  defaultLeafIcon: React.ReactNode;
  defaultBranchIcon: React.ReactNode;
  defaultBranchOpenIcon: React.ReactNode;
  onToggleExpand: (id: string) => void;
  onToggleSelect: (id: string, event: React.MouseEvent) => void;
  onNodeClick?: (node: TreeNode) => void;
  onNodeDoubleClick?: (node: TreeNode) => void;
  renderNode?: (node: TreeNode, props: TreeNodeRenderProps) => React.ReactNode;
  searchQuery: string;
  draggable: boolean;
  onKeyDown?: (e: React.KeyboardEvent, nodeId: string) => void;
  focusedId?: string | null;
  onDragStart?: (e: React.DragEvent, nodeId: string) => void;
  onDragOver?: (e: React.DragEvent, nodeId: string) => void;
  onDrop?: (e: React.DragEvent, nodeId: string) => void;
  dragOverId?: string | null;
}

const TreeItem: React.FC<TreeItemProps> = ({
  node,
  level,
  expanded,
  selected,
  indentSize,
  dense,
  showCheckboxes,
  showIcons,
  multiSelect,
  defaultLeafIcon,
  defaultBranchIcon,
  defaultBranchOpenIcon,
  onToggleExpand,
  onToggleSelect,
  onNodeClick,
  onNodeDoubleClick,
  renderNode,
  searchQuery,
  draggable,
  onKeyDown,
  focusedId,
  onDragStart,
  onDragOver,
  onDrop,
  dragOverId,
}) => {
  const theme = useTheme();
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isExpanded = expanded.has(node.id);
  const isSelected = selected.has(node.id);
  const isDisabled = node.disabled || false;
  const isDragOver = dragOverId === node.id;

  // Check if node matches search
  const matchesSearch = searchQuery
    ? node.label.toLowerCase().includes(searchQuery.toLowerCase())
    : true;

  // Check if any children match search
  const hasMatchingChildren = React.useMemo(() => {
    if (!searchQuery || !node.children) return false;
    const checkChildren = (children: TreeNode[]): boolean => {
      return children.some(
        (child) =>
          child.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (child.children && checkChildren(child.children))
      );
    };
    return checkChildren(node.children);
  }, [node.children, searchQuery]);

  // Skip rendering if no match and no matching children
  if (searchQuery && !matchesSearch && !hasMatchingChildren) {
    return null;
  }

  const renderProps: TreeNodeRenderProps = {
    isExpanded,
    isSelected,
    isDisabled,
    level,
    hasChildren,
  };

  const getIcon = () => {
    if (node.icon) return node.icon;
    if (!showIcons) return null;
    if (hasChildren) {
      return isExpanded ? defaultBranchOpenIcon : defaultBranchIcon;
    }
    return defaultLeafIcon;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) return;
    onToggleSelect(node.id, e);
    onNodeClick?.(node);
  };

  const handleDoubleClick = () => {
    if (isDisabled) return;
    if (hasChildren) {
      onToggleExpand(node.id);
    }
    onNodeDoubleClick?.(node);
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleExpand(node.id);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSelect(node.id, e);
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (draggable && onDragStart) {
      onDragStart(e, node.id);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (draggable && onDragOver) {
      e.preventDefault();
      onDragOver(e, node.id);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (draggable && onDrop) {
      e.preventDefault();
      onDrop(e, node.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled) return;
    onKeyDown?.(e, node.id);
  };

  return (
    <>
      <Box
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        aria-level={level + 1}
        tabIndex={focusedId === node.id ? 0 : -1}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        draggable={draggable && !isDisabled}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          display: 'flex',
          alignItems: 'center',
          pl: `${level * indentSize}px`,
          pr: 1,
          py: dense ? 0.25 : 0.5,
          minHeight: dense ? 28 : 36,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          borderRadius: 0.5,
          opacity: isDisabled ? 0.5 : 1,
          backgroundColor: isSelected
            ? alpha(theme.palette.primary.main, 0.12)
            : isDragOver
            ? alpha(theme.palette.primary.main, 0.08)
            : 'transparent',
          '&:hover': {
            backgroundColor: isDisabled
              ? 'transparent'
              : isSelected
              ? alpha(theme.palette.primary.main, 0.16)
              : alpha(theme.palette.action.hover, 0.04),
          },
          transition: 'background-color 150ms ease',
          ...(matchesSearch && searchQuery
            ? {
                '& .MuiTypography-root': {
                  fontWeight: 600,
                },
              }
            : {}),
        }}
      >
        {/* Expand/Collapse Arrow */}
        <IconButton
          size="small"
          onClick={handleExpandClick}
          sx={{
            p: 0.25,
            mr: 0.5,
            visibility: hasChildren ? 'visible' : 'hidden',
          }}
          disabled={isDisabled}
        >
          {isExpanded ? (
            <ExpandMoreIcon fontSize="small" />
          ) : (
            <ChevronRightIcon fontSize="small" />
          )}
        </IconButton>

        {/* Checkbox */}
        {showCheckboxes && (
          <Checkbox
            size="small"
            checked={isSelected}
            onClick={handleCheckboxClick}
            disabled={isDisabled}
            sx={{ p: 0.5, mr: 0.5 }}
          />
        )}

        {/* Icon */}
        {showIcons && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 1,
              color: isSelected ? 'primary.main' : 'text.secondary',
            }}
          >
            {getIcon()}
          </Box>
        )}

        {/* Label or Custom Render */}
        {renderNode ? (
          renderNode(node, renderProps)
        ) : (
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: isSelected ? 'primary.main' : 'text.primary',
            }}
          >
            {node.label}
          </Typography>
        )}
      </Box>

      {/* Children */}
      {hasChildren && (
        <Collapse in={isExpanded || hasMatchingChildren} timeout="auto">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              indentSize={indentSize}
              dense={dense}
              showCheckboxes={showCheckboxes}
              showIcons={showIcons}
              multiSelect={multiSelect}
              defaultLeafIcon={defaultLeafIcon}
              defaultBranchIcon={defaultBranchIcon}
              defaultBranchOpenIcon={defaultBranchOpenIcon}
              onToggleExpand={onToggleExpand}
              onToggleSelect={onToggleSelect}
              onNodeClick={onNodeClick}
              onNodeDoubleClick={onNodeDoubleClick}
              renderNode={renderNode}
              searchQuery={searchQuery}
              draggable={draggable}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              dragOverId={dragOverId}
              onKeyDown={onKeyDown}
              focusedId={focusedId}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

// ============================================
// TreeView Component
// ============================================

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  selected: controlledSelected,
  expanded: controlledExpanded,
  multiSelect = false,
  showCheckboxes = false,
  searchable = false,
  searchPlaceholder = 'Search...',
  showIcons = true,
  defaultLeafIcon = <FileIcon fontSize="small" />,
  defaultBranchIcon = <FolderIcon fontSize="small" />,
  defaultBranchOpenIcon = <FolderOpenIcon fontSize="small" />,
  indentSize = 20,
  dense = false,
  onSelect,
  onExpand,
  onNodeClick,
  onNodeDoubleClick,
  renderNode,
  draggable = false,
  onDrop,
  className,
  sx,
}) => {
  const [internalSelected, setInternalSelected] = React.useState<Set<string>>(
    new Set(controlledSelected || [])
  );
  const [internalExpanded, setInternalExpanded] = React.useState<Set<string>>(
    new Set(controlledExpanded || [])
  );
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dragOverId, setDragOverId] = React.useState<string | null>(null);
  const [focusedId, setFocusedId] = React.useState<string | null>(null);
  const draggedIdRef = React.useRef<string | null>(null);

  // Sync with controlled props
  React.useEffect(() => {
    if (controlledSelected) {
      setInternalSelected(new Set(controlledSelected));
    }
  }, [controlledSelected]);

  React.useEffect(() => {
    if (controlledExpanded) {
      setInternalExpanded(new Set(controlledExpanded));
    }
  }, [controlledExpanded]);

  const selected = controlledSelected
    ? new Set(controlledSelected)
    : internalSelected;
  const expanded = controlledExpanded
    ? new Set(controlledExpanded)
    : internalExpanded;

  // Helper to find a node by ID
  const findNode = React.useCallback((nodes: TreeNode[], id: string): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }, []);

  // Flatten tree for keyboard navigation
  const flattenTree = React.useCallback((nodes: TreeNode[], exp: Set<string>): string[] => {
    const result: string[] = [];
    const traverse = (items: TreeNode[]) => {
      for (const item of items) {
        result.push(item.id);
        if (item.children && exp.has(item.id)) {
          traverse(item.children);
        }
      }
    };
    traverse(nodes);
    return result;
  }, []);

  const handleToggleExpand = React.useCallback(
    (id: string) => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      setInternalExpanded(newExpanded);
      onExpand?.(Array.from(newExpanded));
    },
    [expanded, onExpand]
  );

  const handleToggleSelect = React.useCallback(
    (id: string, event: React.MouseEvent) => {
      let newSelected: Set<string>;

      if (multiSelect) {
        if (event.ctrlKey || event.metaKey) {
          // Toggle selection
          newSelected = new Set(selected);
          if (newSelected.has(id)) {
            newSelected.delete(id);
          } else {
            newSelected.add(id);
          }
        } else if (event.shiftKey && selected.size > 0) {
          // Range selection (simplified - just add to selection)
          newSelected = new Set(selected);
          newSelected.add(id);
        } else {
          // Single selection
          newSelected = new Set([id]);
        }
      } else {
        newSelected = new Set([id]);
      }

      setInternalSelected(newSelected);
      onSelect?.(Array.from(newSelected));
    },
    [multiSelect, selected, onSelect]
  );

  // Keyboard navigation handler (must be after handleToggleExpand/handleToggleSelect)
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent, nodeId: string) => {
      const flatIds = flattenTree(data, expanded);
      const currentIndex = flatIds.indexOf(nodeId);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < flatIds.length - 1) {
            setFocusedId(flatIds[currentIndex + 1]);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            setFocusedId(flatIds[currentIndex - 1]);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (!expanded.has(nodeId)) {
            handleToggleExpand(nodeId);
          } else {
            // Move to first child if expanded
            const node = findNode(data, nodeId);
            if (node?.children?.length) {
              setFocusedId(node.children[0].id);
            }
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (expanded.has(nodeId)) {
            handleToggleExpand(nodeId);
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleToggleSelect(nodeId, e as unknown as React.MouseEvent);
          break;
        case 'Home':
          e.preventDefault();
          if (flatIds.length > 0) {
            setFocusedId(flatIds[0]);
          }
          break;
        case 'End':
          e.preventDefault();
          if (flatIds.length > 0) {
            setFocusedId(flatIds[flatIds.length - 1]);
          }
          break;
      }
    },
    [data, expanded, handleToggleExpand, handleToggleSelect, flattenTree, findNode]
  );

  // Focus the element when focusedId changes
  React.useEffect(() => {
    if (focusedId) {
      const element = document.querySelector(`[role="treeitem"][tabindex="0"]`) as HTMLElement;
      element?.focus();
    }
  }, [focusedId]);

  const handleDragStart = React.useCallback((e: React.DragEvent, nodeId: string) => {
    draggedIdRef.current = nodeId;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', nodeId);
  }, []);

  const handleDragOver = React.useCallback((_e: React.DragEvent, nodeId: string) => {
    setDragOverId(nodeId);
  }, []);

  const handleDrop = React.useCallback(
    (_e: React.DragEvent, targetId: string) => {
      if (draggedIdRef.current && draggedIdRef.current !== targetId) {
        onDrop?.(draggedIdRef.current, targetId, 'inside');
      }
      draggedIdRef.current = null;
      setDragOverId(null);
    },
    [onDrop]
  );

  const handleDragEnd = React.useCallback(() => {
    draggedIdRef.current = null;
    setDragOverId(null);
  }, []);

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...sx,
      }}
      onDragEnd={handleDragEnd}
    >
      {/* Search Input */}
      {searchable && (
        <Box sx={{ px: 1, pb: 1 }}>
          <TextField
            size="small"
            fullWidth
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery('')}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {/* Tree Content */}
      <Box
        role="tree"
        aria-multiselectable={multiSelect}
        aria-label="Tree view"
        sx={{ flex: 1, overflow: 'auto', px: 0.5 }}
      >
        {data.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            level={0}
            expanded={expanded}
            selected={selected}
            indentSize={indentSize}
            dense={dense}
            showCheckboxes={showCheckboxes}
            showIcons={showIcons}
            multiSelect={multiSelect}
            defaultLeafIcon={defaultLeafIcon}
            defaultBranchIcon={defaultBranchIcon}
            defaultBranchOpenIcon={defaultBranchOpenIcon}
            onToggleExpand={handleToggleExpand}
            onToggleSelect={handleToggleSelect}
            onNodeClick={onNodeClick}
            onNodeDoubleClick={onNodeDoubleClick}
            renderNode={renderNode}
            searchQuery={searchQuery}
            draggable={draggable}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            dragOverId={dragOverId}
            onKeyDown={handleKeyDown}
            focusedId={focusedId}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TreeView;
