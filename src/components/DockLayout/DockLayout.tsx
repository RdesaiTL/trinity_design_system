import * as React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  DragIndicator as DragIcon,
  MoreVert as MoreIcon,
  Minimize as MinimizeIcon,
  Maximize as MaximizeIcon,
  OpenInNew as PopOutIcon,
  PushPin as PinIcon,
} from '@mui/icons-material';
import { semanticTokens } from '../../tokens';

// ============================================
// Types
// ============================================

export interface DockPanel {
  /** Unique identifier */
  id: string;
  /** Panel title */
  title: string;
  /** Panel content */
  content: React.ReactNode;
  /** Panel icon */
  icon?: React.ReactNode;
  /** Whether panel can be closed */
  closable?: boolean;
  /** Whether panel can be minimized */
  minimizable?: boolean;
  /** Whether panel can be maximized */
  maximizable?: boolean;
  /** Whether panel is pinned */
  pinned?: boolean;
  /** Minimum width */
  minWidth?: number;
  /** Minimum height */
  minHeight?: number;
}

export interface DockZone {
  /** Unique identifier */
  id: string;
  /** Panels in this zone */
  panels: string[];
  /** Active panel ID */
  activePanel?: string;
  /** Zone type */
  type: 'tabs' | 'split-horizontal' | 'split-vertical';
  /** Child zones (for split types) */
  children?: DockZone[];
  /** Size ratio for splits (0-1) */
  size?: number;
}

export interface DockLayoutProps {
  /** Available panels */
  panels: DockPanel[];
  /** Root zone configuration */
  layout: DockZone;
  /** Callback when layout changes */
  onLayoutChange?: (layout: DockZone) => void;
  /** Callback when panel is closed */
  onPanelClose?: (panelId: string) => void;
  /** Callback when active panel changes */
  onActiveChange?: (zoneId: string, panelId: string) => void;
  /** Show panel header actions */
  showPanelActions?: boolean;
  /** Enable drag and drop */
  draggable?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  sx?: Record<string, unknown>;
}

// ============================================
// Panel Header Component
// ============================================

interface PanelHeaderProps {
  panel: DockPanel;
  isActive: boolean;
  showActions: boolean;
  draggable: boolean;
  compact: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onPin?: () => void;
  onPopOut?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({
  panel,
  isActive,
  showActions,
  draggable,
  compact,
  onClose,
  onMinimize,
  onMaximize,
  onPin,
  onPopOut,
  onDragStart,
}) => {
  const theme = useTheme();
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: compact ? 1 : 1.5,
        py: compact ? 0.25 : 0.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: isActive
          ? alpha(theme.palette.primary.main, 0.08)
          : alpha(theme.palette.action.hover, 0.04),
        cursor: draggable ? 'grab' : 'default',
        userSelect: 'none',
        '&:active': draggable ? { cursor: 'grabbing' } : {},
      }}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      {/* Drag Handle */}
      {draggable && (
        <DragIcon
          fontSize="small"
          sx={{ mr: 0.5, color: theme.palette.action.active, opacity: 0.5 }}
        />
      )}

      {/* Icon */}
      {panel.icon && (
        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
          {panel.icon}
        </Box>
      )}

      {/* Title */}
      <Typography
        variant={compact ? 'caption' : 'body2'}
        fontWeight={isActive ? 600 : 400}
        sx={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {panel.title}
      </Typography>

      {/* Pin indicator */}
      {panel.pinned && (
        <PinIcon
          fontSize="small"
          sx={{ ml: 0.5, fontSize: 14, color: theme.palette.action.active }}
        />
      )}

      {/* Actions */}
      {showActions && (
        <>
          {!compact && (
            <>
              {panel.minimizable && onMinimize && (
                <IconButton size="small" onClick={onMinimize} sx={{ p: 0.25 }}>
                  <MinimizeIcon fontSize="small" />
                </IconButton>
              )}
              {panel.maximizable && onMaximize && (
                <IconButton size="small" onClick={onMaximize} sx={{ p: 0.25 }}>
                  <MaximizeIcon fontSize="small" />
                </IconButton>
              )}
            </>
          )}

          {/* More Menu */}
          <IconButton
            size="small"
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            sx={{ p: 0.25 }}
          >
            <MoreIcon fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {onPin && (
              <MenuItem onClick={() => { onPin(); setMenuAnchor(null); }}>
                <PinIcon fontSize="small" sx={{ mr: 1 }} />
                {panel.pinned ? 'Unpin' : 'Pin'}
              </MenuItem>
            )}
            {onPopOut && (
              <MenuItem onClick={() => { onPopOut(); setMenuAnchor(null); }}>
                <PopOutIcon fontSize="small" sx={{ mr: 1 }} />
                Pop Out
              </MenuItem>
            )}
            {compact && panel.minimizable && onMinimize && (
              <MenuItem onClick={() => { onMinimize(); setMenuAnchor(null); }}>
                <MinimizeIcon fontSize="small" sx={{ mr: 1 }} />
                Minimize
              </MenuItem>
            )}
            {compact && panel.maximizable && onMaximize && (
              <MenuItem onClick={() => { onMaximize(); setMenuAnchor(null); }}>
                <MaximizeIcon fontSize="small" sx={{ mr: 1 }} />
                Maximize
              </MenuItem>
            )}
            {(onPin || onPopOut) && panel.closable && <Divider />}
            {panel.closable !== false && onClose && (
              <MenuItem onClick={() => { onClose(); setMenuAnchor(null); }}>
                <CloseIcon fontSize="small" sx={{ mr: 1 }} />
                Close
              </MenuItem>
            )}
          </Menu>

          {/* Close Button */}
          {panel.closable !== false && onClose && !compact && (
            <IconButton size="small" onClick={onClose} sx={{ p: 0.25, ml: 0.5 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </>
      )}
    </Box>
  );
};

// ============================================
// Tabbed Zone Component
// ============================================

interface TabbedZoneProps {
  zone: DockZone;
  panels: Map<string, DockPanel>;
  showActions: boolean;
  draggable: boolean;
  compact: boolean;
  onActiveChange: (panelId: string) => void;
  onPanelClose: (panelId: string) => void;
  onDragStart: (e: React.DragEvent, panelId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const TabbedZone: React.FC<TabbedZoneProps> = ({
  zone,
  panels,
  showActions,
  draggable,
  compact,
  onActiveChange,
  onPanelClose,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const theme = useTheme();
  const activePanel = zone.activePanel || zone.panels[0];
  const currentPanel = panels.get(activePanel);

  if (zone.panels.length === 0) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.text.secondary,
          backgroundColor: alpha(theme.palette.action.hover, 0.02),
          border: `2px dashed ${theme.palette.divider}`,
          borderRadius: 1,
          m: 0.5,
        }}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Typography variant="body2">Drop panel here</Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: currentPanel?.minWidth || 100,
        minHeight: currentPanel?.minHeight || 100,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        overflow: 'hidden',
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {/* Tab Bar */}
      {zone.panels.length > 1 && (
        <Tabs
          value={activePanel}
          onChange={(_, newValue) => onActiveChange(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: compact ? 32 : 40,
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: alpha(theme.palette.action.hover, 0.02),
            '& .MuiTab-root': {
              minHeight: compact ? 32 : 40,
              minWidth: 'auto',
              px: 1.5,
              py: 0.5,
              textTransform: 'none',
              fontSize: compact ? semanticTokens.typography.dense.text : '0.875rem', // 12px dense, 14px normal
            },
            '& .MuiTabs-indicator': {
              height: 2,
            },
          }}
        >
          {zone.panels.map((panelId) => {
            const panel = panels.get(panelId);
            if (!panel) return null;
            return (
              <Tab
                key={panelId}
                value={panelId}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {panel.icon}
                    <span>{panel.title}</span>
                    {panel.closable !== false && (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPanelClose(panelId);
                        }}
                        sx={{ p: 0, ml: 0.5, '&:hover': { color: theme.palette.error.main } }}
                      >
                        <CloseIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    )}
                  </Box>
                }
                draggable={draggable}
                onDragStart={(e) => onDragStart(e, panelId)}
              />
            );
          })}
        </Tabs>
      )}

      {/* Single Panel Header (when only one panel) */}
      {zone.panels.length === 1 && currentPanel && (
        <PanelHeader
          panel={currentPanel}
          isActive={true}
          showActions={showActions}
          draggable={draggable}
          compact={compact}
          onClose={currentPanel.closable !== false ? () => onPanelClose(activePanel) : undefined}
          onDragStart={(e) => onDragStart(e, activePanel)}
        />
      )}

      {/* Panel Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: compact ? 1 : 2 }}>
        {currentPanel?.content}
      </Box>
    </Paper>
  );
};

// ============================================
// Split Zone Component
// ============================================

interface SplitZoneProps {
  zone: DockZone;
  panels: Map<string, DockPanel>;
  showActions: boolean;
  draggable: boolean;
  compact: boolean;
  onActiveChange: (zoneId: string, panelId: string) => void;
  onPanelClose: (panelId: string) => void;
  onLayoutChange: (zone: DockZone) => void;
  draggedPanel: string | null;
  onDragStart: (e: React.DragEvent, panelId: string) => void;
  onDrop: (zoneId: string, panelId: string) => void;
}

const SplitZone: React.FC<SplitZoneProps> = ({
  zone,
  panels,
  showActions,
  draggable,
  compact,
  onActiveChange,
  onPanelClose,
  onLayoutChange,
  draggedPanel,
  onDragStart,
  onDrop,
}) => {
  const isHorizontal = zone.type === 'split-horizontal';

  if (!zone.children || zone.children.length === 0) {
    return (
      <TabbedZone
        zone={zone}
        panels={panels}
        showActions={showActions}
        draggable={draggable}
        compact={compact}
        onActiveChange={(panelId) => onActiveChange(zone.id, panelId)}
        onPanelClose={onPanelClose}
        onDragStart={onDragStart}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => draggedPanel && onDrop(zone.id, draggedPanel)}
      />
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        flex: 1,
        gap: 0.5,
      }}
    >
      {zone.children.map((child, index) => (
        <Box
          key={child.id}
          sx={{
            flex: child.size || 1 / zone.children!.length,
            display: 'flex',
            minWidth: 0,
            minHeight: 0,
          }}
        >
          {child.type === 'tabs' ? (
            <TabbedZone
              zone={child}
              panels={panels}
              showActions={showActions}
              draggable={draggable}
              compact={compact}
              onActiveChange={(panelId) => onActiveChange(child.id, panelId)}
              onPanelClose={onPanelClose}
              onDragStart={onDragStart}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => draggedPanel && onDrop(child.id, draggedPanel)}
            />
          ) : (
            <SplitZone
              zone={child}
              panels={panels}
              showActions={showActions}
              draggable={draggable}
              compact={compact}
              onActiveChange={onActiveChange}
              onPanelClose={onPanelClose}
              onLayoutChange={(updatedZone) => {
                const newChildren = [...zone.children!];
                newChildren[index] = updatedZone;
                onLayoutChange({ ...zone, children: newChildren });
              }}
              draggedPanel={draggedPanel}
              onDragStart={onDragStart}
              onDrop={onDrop}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

// ============================================
// DockLayout Component
// ============================================

export const DockLayout: React.FC<DockLayoutProps> = ({
  panels: panelsList,
  layout,
  onLayoutChange,
  onPanelClose,
  onActiveChange,
  showPanelActions = true,
  draggable = true,
  compact = false,
  className,
  sx,
}) => {
  const theme = useTheme();
  const [draggedPanel, setDraggedPanel] = React.useState<string | null>(null);

  // Convert panels array to map for easy lookup
  const panels = React.useMemo(
    () => new Map(panelsList.map((p) => [p.id, p])),
    [panelsList]
  );

  const handleDragStart = React.useCallback((e: React.DragEvent, panelId: string) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', panelId);
    setDraggedPanel(panelId);
  }, []);

  const handleDragEnd = React.useCallback(() => {
    setDraggedPanel(null);
  }, []);

  const handleDrop = React.useCallback(
    (targetZoneId: string, panelId: string) => {
      if (!onLayoutChange) return;

      // This is a simplified drop handler
      // A full implementation would need to:
      // 1. Remove panel from source zone
      // 2. Add panel to target zone
      // 3. Update the layout structure
      
      console.log(`Drop panel ${panelId} into zone ${targetZoneId}`);
      setDraggedPanel(null);
    },
    [onLayoutChange]
  );

  const handlePanelClose = React.useCallback(
    (panelId: string) => {
      onPanelClose?.(panelId);
    },
    [onPanelClose]
  );

  const handleActiveChange = React.useCallback(
    (zoneId: string, panelId: string) => {
      onActiveChange?.(zoneId, panelId);
    },
    [onActiveChange]
  );

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: alpha(theme.palette.background.default, 0.5),
        p: 0.5,
        ...sx,
      }}
      onDragEnd={handleDragEnd}
    >
      {layout.type === 'tabs' ? (
        <TabbedZone
          zone={layout}
          panels={panels}
          showActions={showPanelActions}
          draggable={draggable}
          compact={compact}
          onActiveChange={(panelId) => handleActiveChange(layout.id, panelId)}
          onPanelClose={handlePanelClose}
          onDragStart={handleDragStart}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => draggedPanel && handleDrop(layout.id, draggedPanel)}
        />
      ) : (
        <SplitZone
          zone={layout}
          panels={panels}
          showActions={showPanelActions}
          draggable={draggable}
          compact={compact}
          onActiveChange={handleActiveChange}
          onPanelClose={handlePanelClose}
          onLayoutChange={(newLayout) => onLayoutChange?.(newLayout)}
          draggedPanel={draggedPanel}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      )}
    </Box>
  );
};

export default DockLayout;
