import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Divider,
  Alert,
  Chip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {
  useDebounce,
  useDebouncedCallback,
  useClipboard,
  useLocalStorage,
  useTrinityBreakpoints,
  useToggle,
  usePrevious,
  useOnClickOutside,
  useKeyPress,
  useInterval,
} from '../hooks';

/**
 * # Utility Hooks
 * 
 * The Trinity Design System provides a collection of utility hooks
 * to help with common UI patterns and state management.
 * 
 * ## Available Hooks
 * - `useDebounce` - Debounce a value
 * - `useDebouncedCallback` - Debounce a function
 * - `useClipboard` - Copy to clipboard with feedback
 * - `useLocalStorage` - Persist state in localStorage
 * - `useTrinityBreakpoints` - Responsive design breakpoints
 * - `useToggle` - Boolean toggle state
 * - `usePrevious` - Get previous value of state
 * - `useOnClickOutside` - Detect clicks outside element
 * - `useKeyPress` - Detect key presses
 * - `useInterval` - Declarative setInterval
 */

// Dummy component for meta
const HooksDemo = () => <Box />;

const meta: Meta<typeof HooksDemo> = {
  title: 'Utilities/Hooks',
  component: HooksDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Collection of utility hooks for common UI patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// useDebounce Demo
const UseDebounceDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    if (debouncedValue) {
      // Simulate API call
      setSearchResults([
        `Result for "${debouncedValue}" - Item 1`,
        `Result for "${debouncedValue}" - Item 2`,
        `Result for "${debouncedValue}" - Item 3`,
      ]);
    } else {
      setSearchResults([]);
    }
  }, [debouncedValue]);

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>useDebounce</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Debounces a value by 500ms. Type to see the effect.
      </Typography>
      <TextField
        fullWidth
        label="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        size="small"
        sx={{ mb: 2 }}
      />
      <Stack spacing={1}>
        <Typography variant="caption">
          Input value: <strong>{inputValue || '(empty)'}</strong>
        </Typography>
        <Typography variant="caption">
          Debounced value: <strong>{debouncedValue || '(empty)'}</strong>
        </Typography>
        {searchResults.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">Search results:</Typography>
            {searchResults.map((result, i) => (
              <Typography key={i} variant="body2">{result}</Typography>
            ))}
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

/**
 * `useDebounce` delays updating a value until after a specified delay.
 * Useful for search inputs, form validation, etc.
 */
export const Debounce: Story = {
  render: () => <UseDebounceDemo />,
};

// useClipboard Demo
const UseClipboardDemo = () => {
  const { copy, copied, error } = useClipboard({ successDuration: 2000 });
  const textToCopy = 'npm install @trinity/design-system';

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>useClipboard</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Copy text to clipboard with visual feedback.
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', flex: 1 }}>
          {textToCopy}
        </Typography>
        <Tooltip title={copied ? 'Copied!' : 'Copy'}>
          <IconButton onClick={() => copy(textToCopy)} color={copied ? 'success' : 'default'}>
            {copied ? <CheckIcon /> : <ContentCopyIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error.message}
        </Alert>
      )}
    </Paper>
  );
};

/**
 * `useClipboard` provides copy-to-clipboard functionality with success feedback.
 */
export const Clipboard: Story = {
  render: () => <UseClipboardDemo />,
};

// useLocalStorage Demo
const UseLocalStorageDemo = () => {
  const [theme, setTheme, removeTheme] = useLocalStorage('storybook-demo-theme', 'light');
  const [count, setCount] = useLocalStorage('storybook-demo-count', 0);

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>useLocalStorage</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Persist state in localStorage. Values survive page refresh.
      </Typography>
      
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>Theme Preference</Typography>
          <Stack direction="row" spacing={1}>
            <Button 
              variant={theme === 'light' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setTheme('light')}
            >
              Light
            </Button>
            <Button 
              variant={theme === 'dark' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setTheme('dark')}
            >
              Dark
            </Button>
            <Button size="small" onClick={removeTheme} color="error">
              Reset
            </Button>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            Stored: {theme}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" gutterBottom>Counter</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button size="small" onClick={() => setCount((c) => c - 1)}>-</Button>
            <Typography sx={{ minWidth: 40, textAlign: 'center' }}>{count}</Typography>
            <Button size="small" onClick={() => setCount((c) => c + 1)}>+</Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

/**
 * `useLocalStorage` persists state in localStorage and syncs across tabs.
 */
export const LocalStorage: Story = {
  render: () => <UseLocalStorageDemo />,
};

// useTrinityBreakpoints Demo
const UseTrinityBreakpointsDemo = () => {
  const breakpoints = useTrinityBreakpoints();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>useTrinityBreakpoints</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Responsive design utilities. Resize the window to see changes.
      </Typography>
      
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>Current Breakpoint</Typography>
          <Chip label={breakpoints.current.toUpperCase()} color="primary" />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Device Type</Typography>
          <Stack direction="row" spacing={1}>
            <Chip 
              label="Mobile" 
              color={breakpoints.isMobile ? 'success' : 'default'}
              variant={breakpoints.isMobile ? 'filled' : 'outlined'}
            />
            <Chip 
              label="Tablet" 
              color={breakpoints.isTablet ? 'success' : 'default'}
              variant={breakpoints.isTablet ? 'filled' : 'outlined'}
            />
            <Chip 
              label="Desktop" 
              color={breakpoints.isDesktop ? 'success' : 'default'}
              variant={breakpoints.isDesktop ? 'filled' : 'outlined'}
            />
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Breakpoint Flags</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {(['isXs', 'isSm', 'isMd', 'isLg', 'isXl'] as const).map((key) => (
              <Chip
                key={key}
                label={key}
                size="small"
                color={breakpoints[key] ? 'primary' : 'default'}
                variant={breakpoints[key] ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

/**
 * `useTrinityBreakpoints` provides responsive breakpoint detection.
 */
export const Breakpoints: Story = {
  render: () => <UseTrinityBreakpointsDemo />,
};

// useToggle Demo
const UseToggleDemo = () => {
  const [isOpen, toggle, setIsOpen] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>useToggle</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Simple boolean toggle state management.
      </Typography>
      
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>Panel Toggle</Typography>
          <Button variant="outlined" onClick={toggle}>
            {isOpen ? 'Close Panel' : 'Open Panel'}
          </Button>
          {isOpen && (
            <Paper sx={{ mt: 1, p: 2, bgcolor: 'primary.50' }}>
              <Typography>Panel content here!</Typography>
              <Button size="small" onClick={() => setIsOpen(false)} sx={{ mt: 1 }}>
                Close
              </Button>
            </Paper>
          )}
        </Box>

        <Divider />

        <FormControlLabel
          control={<Switch checked={isDarkMode} onChange={toggleDarkMode} />}
          label={`Dark Mode: ${isDarkMode ? 'On' : 'Off'}`}
        />
      </Stack>
    </Paper>
  );
};

/**
 * `useToggle` provides simple boolean state with toggle function.
 */
export const Toggle: Story = {
  render: () => <UseToggleDemo />,
};

// useInterval Demo
const UseIntervalDemo = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(1000);

  useInterval(
    () => setCount((c) => c + 1),
    isRunning ? delay : null
  );

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>useInterval</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Declarative setInterval hook. Pass null to pause.
      </Typography>
      
      <Stack spacing={2}>
        <Typography variant="h3" align="center">{count}</Typography>
        
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button
            variant="contained"
            startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button variant="outlined" onClick={() => setCount(0)}>
            Reset
          </Button>
        </Stack>

        <Box>
          <Typography variant="caption">Interval: {delay}ms</Typography>
          <Stack direction="row" spacing={1}>
            {[500, 1000, 2000].map((d) => (
              <Chip
                key={d}
                label={`${d}ms`}
                onClick={() => setDelay(d)}
                color={delay === d ? 'primary' : 'default'}
                variant={delay === d ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

/**
 * `useInterval` provides declarative interval management.
 */
export const Interval: Story = {
  render: () => <UseIntervalDemo />,
};

// useKeyPress Demo
const UseKeyPressDemo = () => {
  const [lastKey, setLastKey] = useState<string | null>(null);
  const isEscapePressed = useKeyPress('Escape');
  const isEnterPressed = useKeyPress('Enter');
  
  useKeyPress('ArrowUp', () => setLastKey('ArrowUp'));
  useKeyPress('ArrowDown', () => setLastKey('ArrowDown'));
  useKeyPress('ArrowLeft', () => setLastKey('ArrowLeft'));
  useKeyPress('ArrowRight', () => setLastKey('ArrowRight'));

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>useKeyPress</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Detect when specific keys are pressed. Try pressing keys!
      </Typography>
      
      <Stack spacing={2}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="Escape"
            color={isEscapePressed ? 'error' : 'default'}
            variant={isEscapePressed ? 'filled' : 'outlined'}
          />
          <Chip
            label="Enter"
            color={isEnterPressed ? 'success' : 'default'}
            variant={isEnterPressed ? 'filled' : 'outlined'}
          />
        </Stack>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Arrow Keys</Typography>
          <Typography variant="body2">
            Last arrow key: <strong>{lastKey || 'None'}</strong>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

/**
 * `useKeyPress` detects when specific keys are pressed.
 */
export const KeyPress: Story = {
  render: () => <UseKeyPressDemo />,
};

// useOnClickOutside Demo
const UseOnClickOutsideDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef as React.RefObject<HTMLElement>, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>useOnClickOutside</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Detect clicks outside an element. Click outside the dropdown to close it.
      </Typography>
      
      <Box sx={{ position: 'relative' }}>
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
          Open Dropdown
        </Button>
        
        {isOpen && (
          <Paper
            ref={dropdownRef}
            elevation={8}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              mt: 1,
              p: 2,
              minWidth: 200,
              zIndex: 1,
            }}
          >
            <Typography variant="subtitle2" gutterBottom>Dropdown Menu</Typography>
            <Stack spacing={1}>
              <Button size="small" fullWidth>Option 1</Button>
              <Button size="small" fullWidth>Option 2</Button>
              <Button size="small" fullWidth>Option 3</Button>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Click outside to close
            </Typography>
          </Paper>
        )}
      </Box>
    </Paper>
  );
};

/**
 * `useOnClickOutside` detects clicks outside a referenced element.
 */
export const ClickOutside: Story = {
  render: () => <UseOnClickOutsideDemo />,
};

// usePrevious Demo
const UsePreviousDemo = () => {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>usePrevious</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Track the previous value of a state variable.
      </Typography>
      
      <Stack spacing={2}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">{count}</Typography>
          <Typography variant="caption" color="text.secondary">
            Previous: {previousCount ?? 'N/A'}
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button onClick={() => setCount((c) => c - 1)}>-1</Button>
          <Button onClick={() => setCount((c) => c + 1)}>+1</Button>
          <Button onClick={() => setCount((c) => c + 10)}>+10</Button>
        </Stack>

        <Alert severity="info" sx={{ mt: 2 }}>
          {previousCount !== undefined && count > previousCount
            ? `Increased by ${count - previousCount}`
            : previousCount !== undefined && count < previousCount
            ? `Decreased by ${previousCount - count}`
            : 'Click a button to change the value'}
        </Alert>
      </Stack>
    </Paper>
  );
};

/**
 * `usePrevious` returns the previous value of a state variable.
 */
export const Previous: Story = {
  render: () => <UsePreviousDemo />,
};

/**
 * All hooks in one view.
 */
export const AllHooks: Story = {
  render: () => (
    <Stack spacing={3} direction="row" flexWrap="wrap" useFlexGap>
      <UseDebounceDemo />
      <UseClipboardDemo />
      <UseLocalStorageDemo />
      <UseToggleDemo />
      <UseIntervalDemo />
      <UseKeyPressDemo />
      <UseOnClickOutsideDemo />
      <UsePreviousDemo />
    </Stack>
  ),
};
