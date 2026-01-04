import * as React from 'react';
import {
  Box,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import {
  ViewColumn as SideBySideIcon,
  ViewStream as UnifiedIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';

// ============================================
// Types
// ============================================

export type DiffViewMode = 'side-by-side' | 'unified';

export interface DiffLine {
  type: 'unchanged' | 'added' | 'removed' | 'context';
  leftLine?: number;
  rightLine?: number;
  content: string;
}

export interface DiffHunk {
  header: string;
  lines: DiffLine[];
  startLeftLine: number;
  startRightLine: number;
}

export interface DiffViewerProps {
  /** Original/old content */
  oldValue: string;
  /** New/modified content */
  newValue: string;
  /** Title for old content */
  oldTitle?: string;
  /** Title for new content */
  newTitle?: string;
  /** View mode */
  viewMode?: DiffViewMode;
  /** Allow switching view modes */
  allowModeSwitch?: boolean;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Context lines around changes */
  contextLines?: number;
  /** Highlight word-level changes */
  wordDiff?: boolean;
  /** Maximum height */
  maxHeight?: number | string;
  /** Collapsible unchanged sections */
  collapsible?: boolean;
  /** Show copy button */
  showCopy?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  sx?: Record<string, unknown>;
}

// ============================================
// Simple diff algorithm
// ============================================

function computeDiff(oldLines: string[], newLines: string[], contextLines: number): DiffHunk[] {
  const hunks: DiffHunk[] = [];
  const lcs = longestCommonSubsequence(oldLines, newLines);
  
  let oldIndex = 0;
  let newIndex = 0;
  let lcsIndex = 0;
  
  const diffLines: DiffLine[] = [];
  
  while (oldIndex < oldLines.length || newIndex < newLines.length) {
    if (lcsIndex < lcs.length && oldLines[oldIndex] === lcs[lcsIndex] && newLines[newIndex] === lcs[lcsIndex]) {
      diffLines.push({
        type: 'unchanged',
        leftLine: oldIndex + 1,
        rightLine: newIndex + 1,
        content: oldLines[oldIndex],
      });
      oldIndex++;
      newIndex++;
      lcsIndex++;
    } else {
      // Check for removals
      while (oldIndex < oldLines.length && (lcsIndex >= lcs.length || oldLines[oldIndex] !== lcs[lcsIndex])) {
        diffLines.push({
          type: 'removed',
          leftLine: oldIndex + 1,
          content: oldLines[oldIndex],
        });
        oldIndex++;
      }
      // Check for additions
      while (newIndex < newLines.length && (lcsIndex >= lcs.length || newLines[newIndex] !== lcs[lcsIndex])) {
        diffLines.push({
          type: 'added',
          rightLine: newIndex + 1,
          content: newLines[newIndex],
        });
        newIndex++;
      }
    }
  }

  // Group into hunks with context
  if (contextLines === -1) {
    // No context limit - show all
    return [{
      header: `@@ -1,${oldLines.length} +1,${newLines.length} @@`,
      lines: diffLines,
      startLeftLine: 1,
      startRightLine: 1,
    }];
  }

  let currentHunk: DiffLine[] = [];
  let hunkStart = 0;
  let lastChangeIndex = -Infinity;

  diffLines.forEach((line, index) => {
    const isChange = line.type !== 'unchanged';
    const isNearChange = index - lastChangeIndex <= contextLines || 
                         (isChange && diffLines.slice(index, index + contextLines + 1).some(l => l.type !== 'unchanged'));

    if (isChange) {
      lastChangeIndex = index;
    }

    if (isNearChange || isChange) {
      if (currentHunk.length === 0) {
        hunkStart = index;
        // Add leading context
        const start = Math.max(0, index - contextLines);
        for (let i = start; i < index; i++) {
          currentHunk.push({ ...diffLines[i], type: 'context' });
        }
      }
      currentHunk.push(line);
    } else if (currentHunk.length > 0 && index - lastChangeIndex > contextLines) {
      // Close the hunk
      hunks.push({
        header: `@@ -${diffLines[hunkStart]?.leftLine || 1} +${diffLines[hunkStart]?.rightLine || 1} @@`,
        lines: currentHunk,
        startLeftLine: diffLines[hunkStart]?.leftLine || 1,
        startRightLine: diffLines[hunkStart]?.rightLine || 1,
      });
      currentHunk = [];
    }
  });

  if (currentHunk.length > 0) {
    hunks.push({
      header: `@@ -${diffLines[hunkStart]?.leftLine || 1} +${diffLines[hunkStart]?.rightLine || 1} @@`,
      lines: currentHunk,
      startLeftLine: diffLines[hunkStart]?.leftLine || 1,
      startRightLine: diffLines[hunkStart]?.rightLine || 1,
    });
  }

  return hunks.length > 0 ? hunks : [{
    header: 'No differences',
    lines: diffLines.map(l => ({ ...l, type: 'unchanged' as const })),
    startLeftLine: 1,
    startRightLine: 1,
  }];
}

function longestCommonSubsequence(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find LCS
  const lcs: string[] = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

// ============================================
// Line Number Gutter
// ============================================

interface GutterProps {
  lineNumber?: number;
  type: DiffLine['type'];
  side?: 'left' | 'right';
}

const Gutter: React.FC<GutterProps> = ({ lineNumber, type }) => {
  const theme = useTheme();
  
  const getBgColor = () => {
    switch (type) {
      case 'added': return alpha(theme.palette.success.main, 0.15);
      case 'removed': return alpha(theme.palette.error.main, 0.15);
      default: return 'transparent';
    }
  };

  return (
    <Box
      sx={{
        minWidth: 50,
        px: 1,
        py: 0.25,
        textAlign: 'right',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        color: theme.palette.text.secondary,
        backgroundColor: getBgColor(),
        borderRight: `1px solid ${theme.palette.divider}`,
        userSelect: 'none',
      }}
    >
      {lineNumber || ''}
    </Box>
  );
};

// ============================================
// Diff Line Component
// ============================================

interface DiffLineProps {
  line: DiffLine;
  showLineNumbers: boolean;
  viewMode: DiffViewMode;
}

const DiffLineComponent: React.FC<DiffLineProps> = ({ line, showLineNumbers, viewMode }) => {
  const theme = useTheme();

  const getLineStyles = () => {
    switch (line.type) {
      case 'added':
        return {
          backgroundColor: alpha(theme.palette.success.main, 0.1),
          borderLeft: `3px solid ${theme.palette.success.main}`,
        };
      case 'removed':
        return {
          backgroundColor: alpha(theme.palette.error.main, 0.1),
          borderLeft: `3px solid ${theme.palette.error.main}`,
        };
      case 'context':
        return {
          backgroundColor: alpha(theme.palette.action.hover, 0.05),
          borderLeft: `3px solid transparent`,
        };
      default:
        return {
          borderLeft: `3px solid transparent`,
        };
    }
  };

  const getPrefix = () => {
    switch (line.type) {
      case 'added': return '+';
      case 'removed': return '-';
      default: return ' ';
    }
  };

  if (viewMode === 'side-by-side') {
    return null; // Handled separately
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        minHeight: 22,
        ...getLineStyles(),
      }}
    >
      {showLineNumbers && (
        <>
          <Gutter lineNumber={line.leftLine} type={line.type} />
          <Gutter lineNumber={line.rightLine} type={line.type} />
        </>
      )}
      <Box
        component="pre"
        sx={{
          flex: 1,
          m: 0,
          px: 1,
          py: 0.25,
          fontFamily: 'monospace',
          fontSize: '0.8125rem',
          lineHeight: 1.5,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          color: line.type === 'context' ? theme.palette.text.secondary : 'inherit',
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: 16,
            color: line.type === 'added'
              ? theme.palette.success.main
              : line.type === 'removed'
              ? theme.palette.error.main
              : theme.palette.text.secondary,
          }}
        >
          {getPrefix()}
        </Box>
        {line.content}
      </Box>
    </Box>
  );
};

// ============================================
// Side-by-Side View
// ============================================

interface SideBySideViewProps {
  hunks: DiffHunk[];
  showLineNumbers: boolean;
}

const SideBySideView: React.FC<SideBySideViewProps> = ({ hunks, showLineNumbers }) => {
  const theme = useTheme();

  // Group lines for side-by-side display
  const getRowPairs = (lines: DiffLine[]) => {
    const pairs: { left?: DiffLine; right?: DiffLine }[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      
      if (line.type === 'unchanged' || line.type === 'context') {
        pairs.push({ left: line, right: line });
        i++;
      } else if (line.type === 'removed') {
        // Check if next line is added (for pairing)
        const nextAdded = lines[i + 1]?.type === 'added' ? lines[i + 1] : undefined;
        pairs.push({ left: line, right: nextAdded });
        i += nextAdded ? 2 : 1;
      } else if (line.type === 'added') {
        pairs.push({ left: undefined, right: line });
        i++;
      } else {
        i++;
      }
    }

    return pairs;
  };

  const renderCell = (line: DiffLine | undefined, side: 'left' | 'right') => {
    const getStyles = () => {
      if (!line) {
        return {
          backgroundColor: alpha(theme.palette.action.disabled, 0.05),
        };
      }
      switch (line.type) {
        case 'added':
          return { backgroundColor: alpha(theme.palette.success.main, 0.1) };
        case 'removed':
          return { backgroundColor: alpha(theme.palette.error.main, 0.1) };
        case 'context':
          return { backgroundColor: alpha(theme.palette.action.hover, 0.05) };
        default:
          return {};
      }
    };

    return (
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 22,
          ...getStyles(),
        }}
      >
        {showLineNumbers && (
          <Gutter
            lineNumber={side === 'left' ? line?.leftLine : line?.rightLine}
            type={line?.type || 'unchanged'}
          />
        )}
        <Box
          component="pre"
          sx={{
            flex: 1,
            m: 0,
            px: 1,
            py: 0.25,
            fontFamily: 'monospace',
            fontSize: '0.8125rem',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            color: line?.type === 'context' ? theme.palette.text.secondary : 'inherit',
          }}
        >
          {line?.content || ''}
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      {hunks.map((hunk, hunkIndex) => (
        <Box key={hunkIndex}>
          {hunk.header !== 'No differences' && (
            <Box
              sx={{
                backgroundColor: alpha(theme.palette.info.main, 0.1),
                px: 1,
                py: 0.5,
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: theme.palette.info.main,
              }}
            >
              {hunk.header}
            </Box>
          )}
          {getRowPairs(hunk.lines).map((pair, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: 'flex',
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              {renderCell(pair.left, 'left')}
              <Divider orientation="vertical" flexItem />
              {renderCell(pair.right, 'right')}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

// ============================================
// DiffViewer Component
// ============================================

export const DiffViewer: React.FC<DiffViewerProps> = ({
  oldValue = '',
  newValue = '',
  oldTitle = 'Original',
  newTitle = 'Modified',
  viewMode: initialViewMode = 'unified',
  allowModeSwitch = true,
  showLineNumbers = true,
  contextLines = 3,
  collapsible = false,
  showCopy = true,
  maxHeight,
  className,
  sx,
}) => {
  const theme = useTheme();
  const [viewMode, setViewMode] = React.useState<DiffViewMode>(initialViewMode);
  const [expandedHunks, setExpandedHunks] = React.useState<Set<number>>(new Set());

  const oldLines = React.useMemo(() => (oldValue ?? '').split('\n'), [oldValue]);
  const newLines = React.useMemo(() => (newValue ?? '').split('\n'), [newValue]);
  const hunks = React.useMemo(
    () => computeDiff(oldLines, newLines, contextLines),
    [oldLines, newLines, contextLines]
  );

  const hasChanges = hunks.some(h => h.lines.some(l => l.type !== 'unchanged'));

  const toggleHunk = (index: number) => {
    setExpandedHunks(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
  };

  return (
    <Paper
      className={className}
      variant="outlined"
      sx={{
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: alpha(theme.palette.background.default, 0.5),
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {viewMode === 'side-by-side' ? (
            <>
              <Typography variant="subtitle2" color="text.secondary">
                {oldTitle}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                vs
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {newTitle}
              </Typography>
            </>
          ) : (
            <Typography variant="subtitle2" color="text.secondary">
              {oldTitle} → {newTitle}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!hasChanges && (
            <Typography variant="caption" color="success.main">
              No changes
            </Typography>
          )}
          
          {showCopy && (
            <>
              <Tooltip title="Copy original">
                <IconButton size="small" onClick={() => handleCopy(oldValue)}>
                  <CopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy modified">
                <IconButton size="small" onClick={() => handleCopy(newValue)}>
                  <CopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}

          {allowModeSwitch && (
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, mode) => mode && setViewMode(mode)}
              size="small"
            >
              <ToggleButton value="unified">
                <Tooltip title="Unified view">
                  <UnifiedIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="side-by-side">
                <Tooltip title="Side-by-side view">
                  <SideBySideIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        </Box>
      </Box>

      {/* Diff Content */}
      <Box
        sx={{
          overflow: 'auto',
          maxHeight: maxHeight,
        }}
      >
        {viewMode === 'side-by-side' ? (
          <SideBySideView hunks={hunks} showLineNumbers={showLineNumbers} />
        ) : (
          hunks.map((hunk, hunkIndex) => (
            <Box key={hunkIndex}>
              {/* Hunk Header */}
              {hunk.header !== 'No differences' && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                    px: 1,
                    py: 0.5,
                    cursor: collapsible ? 'pointer' : 'default',
                  }}
                  onClick={() => collapsible && toggleHunk(hunkIndex)}
                >
                  {collapsible && (
                    <IconButton size="small" sx={{ p: 0, mr: 1 }}>
                      {expandedHunks.has(hunkIndex) ? (
                        <CollapseIcon fontSize="small" />
                      ) : (
                        <ExpandIcon fontSize="small" />
                      )}
                    </IconButton>
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'monospace',
                      color: theme.palette.info.main,
                    }}
                  >
                    {hunk.header}
                  </Typography>
                </Box>
              )}

              {/* Hunk Lines */}
              {(!collapsible || expandedHunks.has(hunkIndex) || !hunk.header.includes('@@')) && (
                <Box>
                  {hunk.lines.map((line, lineIndex) => (
                    <DiffLineComponent
                      key={lineIndex}
                      line={line}
                      showLineNumbers={showLineNumbers}
                      viewMode={viewMode}
                    />
                  ))}
                </Box>
              )}
            </Box>
          ))
        )}
      </Box>
    </Paper>
  );
};

export default DiffViewer;
