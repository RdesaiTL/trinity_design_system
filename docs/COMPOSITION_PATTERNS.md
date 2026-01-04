# Composition Patterns

This guide demonstrates how to combine Trinity Design System components to build common application patterns. Each pattern is designed to be accessible, themeable, and production-ready.

## Table of Contents

1. [Dashboard Layout](#dashboard-layout)
2. [Data Explorer](#data-explorer)
3. [Settings Panel](#settings-panel)
4. [File Browser](#file-browser)
5. [Command Center](#command-center)
6. [Content Editor](#content-editor)
7. [Code Review Interface](#code-review-interface)
8. [Admin Console](#admin-console)

---

## Dashboard Layout

A responsive dashboard with navigation, metrics cards, and data visualization.

```tsx
import {
  AppLayout,
  TopNavWithSidebar,
  DataCard,
  StatusIndicator,
  Charts,
} from '@trinity/design-system';
import { Box, Grid, Typography } from '@mui/material';

const DashboardPattern = () => {
  const navItems = [
    { label: 'Overview', path: '/', icon: <DashboardIcon /> },
    { label: 'Analytics', path: '/analytics', icon: <AnalyticsIcon /> },
    { label: 'Reports', path: '/reports', icon: <AssessmentIcon /> },
  ];

  return (
    <AppLayout
      header={<TopNavWithSidebar logo={<Logo />} navItems={navItems} />}
      sidebar={<NavigationSidebar items={navItems} />}
    >
      <Box sx={{ p: 3 }}>
        {/* Status Row */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <StatusIndicator status="success" label="All Systems Operational" />
          <StatusIndicator status="warning" label="3 Pending Tasks" />
        </Box>

        {/* Metrics Grid */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <DataCard
              title="Total Users"
              value="12,847"
              trend={{ value: 12, direction: 'up' }}
              icon={<PeopleIcon />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DataCard
              title="Revenue"
              value="$48,290"
              trend={{ value: 8, direction: 'up' }}
              icon={<AttachMoneyIcon />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DataCard
              title="Active Sessions"
              value="1,429"
              trend={{ value: 3, direction: 'down' }}
              icon={<DevicesIcon />}
            />
          </Grid>
        </Grid>

        {/* Charts Row */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Charts.LineChart
              data={revenueData}
              title="Revenue Over Time"
              height={300}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Charts.PieChart
              data={categoryData}
              title="Sales by Category"
              height={300}
            />
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
};
```

**Key Components Used:**
- `AppLayout` - Page structure with header/sidebar
- `TopNavWithSidebar` - Navigation header
- `DataCard` - Metric display with trends
- `StatusIndicator` - System status
- `Charts` - Data visualization

---

## Data Explorer

An interface for browsing, filtering, and analyzing tabular data.

```tsx
import {
  DataTable,
  SearchInput,
  FilterBar,
  SplitPane,
  Combobox,
} from '@trinity/design-system';
import { Box, Paper } from '@mui/material';

const DataExplorerPattern = () => {
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const filterOptions = [
    { id: 'status', label: 'Status', type: 'select', options: ['Active', 'Pending', 'Closed'] },
    { id: 'date', label: 'Date Range', type: 'dateRange' },
    { id: 'category', label: 'Category', type: 'multiSelect', options: categories },
  ];

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Search & Filter Bar */}
      <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search records..."
          sx={{ width: 300 }}
        />
        <FilterBar
          filters={filterOptions}
          activeFilters={filters}
          onChange={setFilters}
        />
        <Box sx={{ ml: 'auto' }}>
          <Combobox
            options={columnOptions}
            label="Visible Columns"
            multiple
            size="small"
          />
        </Box>
      </Paper>

      {/* Main Content - Table + Detail Panel */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <SplitPane
          orientation="horizontal"
          defaultSize={65}
          minSize={400}
          primary={
            <DataTable
              data={filteredData}
              columns={columns}
              onRowClick={setSelectedRow}
              selectedRow={selectedRow?.id}
              sortable
              selectable
              pagination={{ pageSize: 25 }}
            />
          }
          secondary={
            <DetailPanel
              record={selectedRow}
              onClose={() => setSelectedRow(null)}
            />
          }
        />
      </Box>
    </Box>
  );
};
```

**Key Components Used:**
- `DataTable` - Sortable, filterable data grid
- `SearchInput` - Full-text search
- `FilterBar` - Advanced filtering
- `SplitPane` - Resizable detail panel
- `Combobox` - Column selection

---

## Settings Panel

A settings interface with categorized options and form controls.

```tsx
import {
  TreeView,
  TransferList,
  Toast,
} from '@trinity/design-system';
import { Box, Paper, Switch, TextField, Button } from '@mui/material';

const SettingsPanelPattern = () => {
  const [activeSection, setActiveSection] = useState('general');
  const { showToast } = useToast();

  const settingsTree = [
    {
      id: 'general',
      label: 'General',
      icon: <SettingsIcon />,
      children: [
        { id: 'profile', label: 'Profile' },
        { id: 'preferences', label: 'Preferences' },
      ],
    },
    {
      id: 'security',
      label: 'Security',
      icon: <SecurityIcon />,
      children: [
        { id: 'password', label: 'Password' },
        { id: '2fa', label: 'Two-Factor Auth' },
      ],
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <NotificationsIcon />,
    },
    {
      id: 'permissions',
      label: 'Permissions',
      icon: <AdminPanelSettingsIcon />,
    },
  ];

  const handleSave = () => {
    showToast({
      message: 'Settings saved successfully',
      severity: 'success',
    });
  };

  return (
    <SplitPane
      orientation="horizontal"
      defaultSize={25}
      minSize={200}
      maxSize={350}
      primary={
        <Paper sx={{ height: '100%', p: 2 }}>
          <TreeView
            nodes={settingsTree}
            selected={new Set([activeSection])}
            onNodeClick={(node) => setActiveSection(node.id)}
            dense
          />
        </Paper>
      }
      secondary={
        <Box sx={{ p: 3 }}>
          {activeSection === 'permissions' ? (
            <TransferList
              leftTitle="Available Permissions"
              rightTitle="Assigned Permissions"
              leftItems={availablePermissions}
              rightItems={assignedPermissions}
              onChange={handlePermissionsChange}
            />
          ) : (
            <SettingsForm section={activeSection} />
          )}

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="outlined">Cancel</Button>
          </Box>
        </Box>
      }
    />
  );
};
```

**Key Components Used:**
- `TreeView` - Settings navigation
- `SplitPane` - Navigation/content layout
- `TransferList` - Permission assignment
- `Toast` - Save confirmation

---

## File Browser

A file management interface with tree navigation and file operations.

```tsx
import {
  TreeView,
  DataTable,
  SearchInput,
  CommandPalette,
  Modal,
  SplitPane,
} from '@trinity/design-system';

const FileBrowserPattern = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { id: 'new-folder', label: 'New Folder', icon: <CreateNewFolderIcon />, shortcut: '⌘N' },
    { id: 'upload', label: 'Upload Files', icon: <UploadIcon />, shortcut: '⌘U' },
    { id: 'delete', label: 'Delete Selected', icon: <DeleteIcon />, shortcut: '⌫' },
    { id: 'rename', label: 'Rename', icon: <EditIcon />, shortcut: 'F2' },
    { id: 'download', label: 'Download', icon: <DownloadIcon />, shortcut: '⌘D' },
  ];

  return (
    <Box sx={{ height: '100vh' }}>
      {/* Toolbar */}
      <Paper sx={{ p: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Breadcrumbs path={currentPath} onChange={setCurrentPath} />
        <SearchInput
          placeholder="Search files..."
          sx={{ ml: 'auto', width: 250 }}
        />
        <IconButton onClick={() => setShowCommandPalette(true)}>
          <TerminalIcon />
        </IconButton>
      </Paper>

      {/* Main Content */}
      <SplitPane
        orientation="horizontal"
        defaultSize={20}
        minSize={150}
        collapsible
        primary={
          <TreeView
            nodes={folderTree}
            onNodeClick={(node) => setCurrentPath(node.id)}
            selected={new Set([currentPath])}
            showIcons
          />
        }
        secondary={
          <DataTable
            data={filesInCurrentPath}
            columns={fileColumns}
            selectable
            selectedRows={selectedFiles}
            onSelectionChange={setSelectedFiles}
            onRowDoubleClick={handleFileOpen}
          />
        }
      />

      {/* Command Palette */}
      <CommandPalette
        open={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        commands={commands}
        onSelect={handleCommand}
        placeholder="Type a command..."
      />
    </Box>
  );
};
```

**Key Components Used:**
- `TreeView` - Folder navigation
- `DataTable` - File listing with selection
- `SearchInput` - File search
- `CommandPalette` - Quick actions
- `SplitPane` - Sidebar/content layout

---

## Command Center

A keyboard-driven interface for power users with quick access to all features.

```tsx
import {
  CommandPalette,
  SearchInput,
  DataCard,
  Timeline,
  Toast,
} from '@trinity/design-system';

const CommandCenterPattern = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recentCommands, setRecentCommands] = useState<Command[]>([]);
  const { showToast } = useToast();

  const commandGroups = [
    {
      title: 'Navigation',
      commands: [
        { id: 'goto-dashboard', label: 'Go to Dashboard', shortcut: 'G D' },
        { id: 'goto-settings', label: 'Go to Settings', shortcut: 'G S' },
        { id: 'goto-profile', label: 'Go to Profile', shortcut: 'G P' },
      ],
    },
    {
      title: 'Actions',
      commands: [
        { id: 'create-new', label: 'Create New...', shortcut: '⌘N' },
        { id: 'search', label: 'Search Everything', shortcut: '⌘K' },
        { id: 'export', label: 'Export Data', shortcut: '⌘E' },
      ],
    },
    {
      title: 'Theme',
      commands: [
        { id: 'toggle-theme', label: 'Toggle Dark Mode', shortcut: '⌘⇧D' },
        { id: 'change-accent', label: 'Change Accent Color' },
      ],
    },
  ];

  const handleCommand = (command: Command) => {
    setRecentCommands((prev) => [command, ...prev.slice(0, 4)]);
    executeCommand(command.id);
    showToast({ message: `Executed: ${command.label}`, severity: 'info' });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Quick Access Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <SearchInput
          placeholder="Press ⌘K to open command palette..."
          onClick={() => setIsOpen(true)}
          readOnly
          sx={{ cursor: 'pointer' }}
        />
      </Paper>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DataCard title="Commands Today" value={recentCommands.length} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Commands
            </Typography>
            <Timeline
              items={recentCommands.map((cmd, i) => ({
                id: `${cmd.id}-${i}`,
                title: cmd.label,
                timestamp: new Date(),
                icon: cmd.icon,
              }))}
              dense
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Command Palette Modal */}
      <CommandPalette
        open={isOpen}
        onClose={() => setIsOpen(false)}
        groups={commandGroups}
        onSelect={handleCommand}
        recentCommands={recentCommands}
        showShortcuts
      />
    </Box>
  );
};
```

**Key Components Used:**
- `CommandPalette` - Central command interface
- `SearchInput` - Quick access trigger
- `Timeline` - Recent activity display
- `DataCard` - Usage statistics
- `Toast` - Action feedback

---

## Content Editor

A rich content editing interface with preview and media management.

```tsx
import {
  RichTextEditor,
  FileUpload,
  SplitPane,
  Combobox,
  Toast,
} from '@trinity/design-system';

const ContentEditorPattern = () => {
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState({ tags: [], category: null });
  const [showPreview, setShowPreview] = useState(true);
  const { showToast } = useToast();

  const handleImageUpload = async (file: File) => {
    const url = await uploadImage(file);
    return url;
  };

  const handleSave = async () => {
    await saveContent({ content, metadata });
    showToast({ message: 'Content saved!', severity: 'success' });
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Combobox
          options={categories}
          value={metadata.category}
          onChange={(cat) => setMetadata({ ...metadata, category: cat })}
          label="Category"
          size="small"
          sx={{ width: 200 }}
        />
        <Combobox
          options={allTags}
          value={metadata.tags}
          onChange={(tags) => setMetadata({ ...metadata, tags })}
          label="Tags"
          multiple
          creatable
          size="small"
          sx={{ width: 300 }}
        />
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <ToggleButton
            value="preview"
            selected={showPreview}
            onChange={() => setShowPreview(!showPreview)}
          >
            <VisibilityIcon />
          </ToggleButton>
          <Button variant="contained" onClick={handleSave}>
            Publish
          </Button>
        </Box>
      </Paper>

      {/* Editor + Preview */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {showPreview ? (
          <SplitPane
            orientation="horizontal"
            defaultSize={50}
            primary={
              <RichTextEditor
                value={content}
                onChange={setContent}
                onImageUpload={handleImageUpload}
                minHeight={400}
                toolbar={[
                  'heading',
                  'separator',
                  'bold',
                  'italic',
                  'underline',
                  'separator',
                  'bulletList',
                  'orderedList',
                  'separator',
                  'link',
                  'image',
                  'code',
                  'quote',
                ]}
              />
            }
            secondary={
              <Paper sx={{ p: 3, height: '100%', overflow: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  Preview
                </Typography>
                <Box
                  dangerouslySetInnerHTML={{ __html: content }}
                  sx={{ '& img': { maxWidth: '100%' } }}
                />
              </Paper>
            }
          />
        ) : (
          <RichTextEditor
            value={content}
            onChange={setContent}
            onImageUpload={handleImageUpload}
            minHeight="100%"
          />
        )}
      </Box>

      {/* Media Upload Panel */}
      <Paper sx={{ p: 2 }}>
        <FileUpload
          accept="image/*"
          multiple
          onUpload={handleImageUpload}
          variant="inline"
        />
      </Paper>
    </Box>
  );
};
```

**Key Components Used:**
- `RichTextEditor` - Content editing
- `FileUpload` - Media management
- `SplitPane` - Editor/preview split
- `Combobox` - Tags and categories
- `Toast` - Save feedback

---

## Code Review Interface

A diff-based code review interface with comments and approvals.

```tsx
import {
  DiffViewer,
  Timeline,
  Combobox,
  DataCard,
  Toast,
} from '@trinity/design-system';

const CodeReviewPattern = () => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');
  const [comments, setComments] = useState<Comment[]>([]);
  const { showToast } = useToast();

  const files = [
    { path: 'src/App.tsx', additions: 12, deletions: 5 },
    { path: 'src/utils/helpers.ts', additions: 45, deletions: 20 },
    { path: 'src/components/Button.tsx', additions: 8, deletions: 2 },
  ];

  const handleApprove = () => {
    showToast({ message: 'Review approved!', severity: 'success' });
  };

  const handleRequestChanges = () => {
    showToast({ message: 'Changes requested', severity: 'warning' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">PR #142: Refactor auth module</Typography>
          <Chip label="Ready for Review" color="primary" />
          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={handleRequestChanges}>
              Request Changes
            </Button>
            <Button variant="contained" color="success" onClick={handleApprove}>
              Approve
            </Button>
          </Box>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
          <DataCard title="Files Changed" value={files.length} compact />
          <DataCard
            title="Additions"
            value={`+${files.reduce((a, f) => a + f.additions, 0)}`}
            compact
            sx={{ color: 'success.main' }}
          />
          <DataCard
            title="Deletions"
            value={`-${files.reduce((a, f) => a + f.deletions, 0)}`}
            compact
            sx={{ color: 'error.main' }}
          />
        </Box>
      </Paper>

      {/* File List + Diff Viewer */}
      <SplitPane
        orientation="horizontal"
        defaultSize={20}
        minSize={200}
        primary={
          <Paper sx={{ height: '100%', overflow: 'auto' }}>
            <List>
              {files.map((file) => (
                <ListItem
                  key={file.path}
                  button
                  onClick={() => setSelectedFile(file.path)}
                >
                  <ListItemText
                    primary={file.path}
                    secondary={`+${file.additions} -${file.deletions}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        }
        secondary={
          <Box sx={{ height: '100%', overflow: 'auto' }}>
            <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, v) => v && setViewMode(v)}
                size="small"
              >
                <ToggleButton value="side-by-side">Side by Side</ToggleButton>
                <ToggleButton value="unified">Unified</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <DiffViewer
              original={originalCode}
              modified={modifiedCode}
              viewMode={viewMode}
              originalTitle="Before"
              modifiedTitle="After"
            />
          </Box>
        }
      />

      {/* Comments Timeline */}
      <Paper sx={{ p: 2, maxHeight: 200, overflow: 'auto' }}>
        <Typography variant="subtitle2" gutterBottom>
          Review Comments
        </Typography>
        <Timeline
          items={comments.map((c) => ({
            id: c.id,
            title: c.author,
            content: c.text,
            timestamp: c.createdAt,
          }))}
        />
      </Paper>
    </Box>
  );
};
```

**Key Components Used:**
- `DiffViewer` - Code diff display
- `SplitPane` - File list/diff layout
- `Timeline` - Comment thread
- `DataCard` - Change statistics
- `Toast` - Action feedback

---

## Admin Console

A comprehensive admin interface with dockable panels and monitoring.

```tsx
import {
  DockLayout,
  DataTable,
  Charts,
  Timeline,
  StatusIndicator,
  SearchInput,
  CommandPalette,
} from '@trinity/design-system';

const AdminConsolePattern = () => {
  const [showCommands, setShowCommands] = useState(false);

  const zones = [
    {
      id: 'sidebar',
      size: 18,
      panels: [
        {
          id: 'navigation',
          title: 'Navigation',
          icon: <MenuIcon />,
          content: <AdminNavigation />,
        },
        {
          id: 'quick-actions',
          title: 'Quick Actions',
          icon: <FlashOnIcon />,
          content: <QuickActionsPanel />,
        },
      ],
    },
    {
      id: 'main',
      size: 62,
      direction: 'vertical',
      children: [
        {
          id: 'content',
          size: 65,
          panels: [
            {
              id: 'users',
              title: 'User Management',
              icon: <PeopleIcon />,
              content: (
                <Box sx={{ p: 2 }}>
                  <SearchInput placeholder="Search users..." sx={{ mb: 2 }} />
                  <DataTable
                    data={users}
                    columns={userColumns}
                    sortable
                    pagination
                  />
                </Box>
              ),
            },
            {
              id: 'analytics',
              title: 'Analytics',
              icon: <AnalyticsIcon />,
              content: (
                <Charts.ComposedChart
                  data={analyticsData}
                  bars={[{ dataKey: 'users', color: 'primary' }]}
                  lines={[{ dataKey: 'revenue', color: 'success' }]}
                />
              ),
            },
          ],
        },
        {
          id: 'monitoring',
          size: 35,
          panels: [
            {
              id: 'logs',
              title: 'System Logs',
              icon: <TerminalIcon />,
              content: <LogViewer logs={systemLogs} />,
            },
            {
              id: 'activity',
              title: 'Activity Feed',
              icon: <TimelineIcon />,
              content: <Timeline items={activityFeed} dense />,
            },
          ],
        },
      ],
    },
    {
      id: 'status',
      size: 20,
      panels: [
        {
          id: 'system-status',
          title: 'System Status',
          icon: <HealthAndSafetyIcon />,
          content: (
            <Box sx={{ p: 2 }}>
              <StatusIndicator status="success" label="API" showDot />
              <StatusIndicator status="success" label="Database" showDot />
              <StatusIndicator status="warning" label="Cache" showDot />
              <StatusIndicator status="success" label="CDN" showDot />
            </Box>
          ),
        },
      ],
    },
  ];

  return (
    <Box sx={{ height: '100vh' }}>
      <DockLayout
        zones={zones}
        direction="horizontal"
        showPanelActions
        onPanelClose={(id) => console.log('Close panel:', id)}
      />
      <CommandPalette
        open={showCommands}
        onClose={() => setShowCommands(false)}
        commands={adminCommands}
      />
    </Box>
  );
};
```

**Key Components Used:**
- `DockLayout` - Flexible panel arrangement
- `DataTable` - User/data management
- `Charts` - Analytics visualization
- `Timeline` - Activity feed
- `StatusIndicator` - System health
- `CommandPalette` - Admin actions

---

## Best Practices

### 1. Component Composition

- **Single Responsibility**: Each component should do one thing well
- **Prop Drilling**: Use context for deeply nested data
- **Controlled vs Uncontrolled**: Prefer controlled components for complex forms

### 2. Layout Patterns

```tsx
// Recommended: Use SplitPane for resizable layouts
<SplitPane
  primary={<Navigation />}
  secondary={<Content />}
  defaultSize={25}
  minSize={200}
/>

// Recommended: Use DockLayout for complex multi-panel UIs
<DockLayout
  zones={[
    { id: 'left', panels: [...] },
    { id: 'center', panels: [...] },
  ]}
/>
```

### 3. State Management

```tsx
// Lift state to the nearest common ancestor
const ParentComponent = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <SplitPane
      primary={<List onSelect={setSelectedItem} />}
      secondary={<Detail item={selectedItem} />}
    />
  );
};
```

### 4. Accessibility

- Always include keyboard navigation
- Use `CommandPalette` for keyboard-driven actions
- Ensure proper focus management in modals and panels
- Test with screen readers

### 5. Performance

```tsx
// Memoize expensive computations
const filteredData = useMemo(() => 
  data.filter(item => matchesFilter(item, filters)),
  [data, filters]
);

// Use virtualization for large lists
<DataTable
  data={largeDataset}
  virtualized
  rowHeight={48}
/>
```

---

## Component Compatibility Matrix

| Pattern | Required Components | Optional Components |
|---------|---------------------|---------------------|
| Dashboard | AppLayout, DataCard, Charts | StatusIndicator, Timeline |
| Data Explorer | DataTable, SearchInput, FilterBar | SplitPane, Combobox |
| Settings | TreeView, TransferList, SplitPane | Toast, Modal |
| File Browser | TreeView, DataTable, CommandPalette | SearchInput, SplitPane |
| Command Center | CommandPalette, SearchInput | Timeline, DataCard, Toast |
| Content Editor | RichTextEditor, FileUpload | SplitPane, Combobox, Toast |
| Code Review | DiffViewer, Timeline | SplitPane, DataCard |
| Admin Console | DockLayout, DataTable, Charts | StatusIndicator, Timeline |

---

## Next Steps

1. **Customization**: See [Theme Customization](./DEVELOPER_GUIDE.md#theme-customization)
2. **Accessibility**: Review [Accessibility Guidelines](./ACCESSIBILITY.md)
3. **Testing**: Follow [Testing Strategy](./TESTING_STRATEGY.md)
4. **Contributing**: Read [Contributing Guide](../CONTRIBUTING.md)
