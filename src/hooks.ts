import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme, useMediaQuery as muiUseMediaQuery } from '@mui/material';

// ============================================
// useDebounce
// ============================================

/**
 * Debounces a value, returning the debounced value after the specified delay.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   // This will only run 300ms after user stops typing
 *   fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Returns a debounced version of the callback function.
 *
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * ```tsx
 * const debouncedSave = useDebouncedCallback((value) => {
 *   saveToServer(value);
 * }, 500);
 *
 * <input onChange={(e) => debouncedSave(e.target.value)} />
 * ```
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
}

// ============================================
// useClipboard
// ============================================

interface UseClipboardOptions {
  /** Duration to show success state in ms */
  successDuration?: number;
  /** Callback on successful copy */
  onSuccess?: (text: string) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

interface UseClipboardReturn {
  /** Copy text to clipboard */
  copy: (text: string) => Promise<boolean>;
  /** Whether last copy was successful */
  copied: boolean;
  /** Error if copy failed */
  error: Error | null;
  /** Reset the copied state */
  reset: () => void;
}

/**
 * Hook for copying text to clipboard with feedback.
 *
 * @param options - Configuration options
 * @returns Clipboard utilities
 *
 * @example
 * ```tsx
 * const { copy, copied, error } = useClipboard({ successDuration: 2000 });
 *
 * <Button onClick={() => copy('Hello World!')}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </Button>
 * ```
 */
export function useClipboard(options: UseClipboardOptions = {}): UseClipboardReturn {
  const { successDuration = 2000, onSuccess, onError } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        onSuccess?.(text);

        // Reset after duration
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, successDuration);

        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to copy');
        setError(error);
        setCopied(false);
        onError?.(error);
        return false;
      }
    },
    [successDuration, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return { copy, copied, error, reset };
}

// ============================================
// useLocalStorage
// ============================================

type SetValue<T> = T | ((prevValue: T) => T);

/**
 * Hook for persisting state in localStorage.
 *
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns [value, setValue, removeValue]
 *
 * @example
 * ```tsx
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
 *
 * // Use like useState
 * setTheme('dark');
 * setTheme((prev) => prev === 'light' ? 'dark' : 'light');
 *
 * // Remove from storage
 * removeTheme();
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void, () => void] {
  // Get initial value from storage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          setStoredValue(e.newValue as unknown as T);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

// ============================================
// useTrinityBreakpoints
// ============================================

interface BreakpointFlags {
  /** Screen is extra small (< 600px) */
  isXs: boolean;
  /** Screen is small (>= 600px) */
  isSm: boolean;
  /** Screen is medium (>= 900px) */
  isMd: boolean;
  /** Screen is large (>= 1200px) */
  isLg: boolean;
  /** Screen is extra large (>= 1536px) */
  isXl: boolean;
  /** Screen is mobile sized (< 600px) */
  isMobile: boolean;
  /** Screen is tablet sized (600px - 899px) */
  isTablet: boolean;
  /** Screen is desktop sized (>= 900px) */
  isDesktop: boolean;
  /** Current breakpoint name */
  current: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Hook for responsive design using Trinity breakpoints.
 *
 * @returns Breakpoint flags and utilities
 *
 * @example
 * ```tsx
 * const { isMobile, isDesktop, current } = useTrinityBreakpoints();
 *
 * return (
 *   <Box sx={{ p: isMobile ? 2 : 4 }}>
 *     {isDesktop && <Sidebar />}
 *     <Content />
 *   </Box>
 * );
 * ```
 */
export function useTrinityBreakpoints(): BreakpointFlags {
  const theme = useTheme();

  const isXs = muiUseMediaQuery(theme.breakpoints.only('xs'));
  const isSm = muiUseMediaQuery(theme.breakpoints.only('sm'));
  const isMd = muiUseMediaQuery(theme.breakpoints.only('md'));
  const isLg = muiUseMediaQuery(theme.breakpoints.only('lg'));
  const isXl = muiUseMediaQuery(theme.breakpoints.only('xl'));

  const isMobile = muiUseMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = muiUseMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = muiUseMediaQuery(theme.breakpoints.up('md'));

  let current: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'xs';
  if (isXl) current = 'xl';
  else if (isLg) current = 'lg';
  else if (isMd) current = 'md';
  else if (isSm) current = 'sm';

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isTablet,
    isDesktop,
    current,
  };
}

// ============================================
// useToggle
// ============================================

/**
 * Hook for boolean toggle state.
 *
 * @param initialValue - Initial boolean value
 * @returns [value, toggle, setValue]
 *
 * @example
 * ```tsx
 * const [isOpen, toggle, setIsOpen] = useToggle(false);
 *
 * <Button onClick={toggle}>Toggle</Button>
 * <Button onClick={() => setIsOpen(true)}>Open</Button>
 * ```
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue];
}

// ============================================
// usePrevious
// ============================================

/**
 * Hook to get the previous value of a state.
 *
 * @param value - Current value
 * @returns Previous value (undefined on first render)
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * console.log(`Changed from ${prevCount} to ${count}`);
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  useEffect(() => {
    setPrevious(ref.current);
    ref.current = value;
  }, [value]);

  return previous;
}

// ============================================
// useOnClickOutside
// ============================================

/**
 * Hook to detect clicks outside of a referenced element.
 *
 * @param ref - React ref to the element
 * @param handler - Callback when click outside is detected
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 *
 * useOnClickOutside(ref, () => {
 *   setIsOpen(false);
 * });
 *
 * <div ref={ref}>Dropdown content</div>
 * ```
 */
export function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// ============================================
// useKeyPress
// ============================================

/**
 * Hook to detect when a specific key is pressed.
 *
 * @param targetKey - Key to listen for (e.g., 'Escape', 'Enter')
 * @param handler - Optional callback when key is pressed
 * @returns Whether the key is currently pressed
 *
 * @example
 * ```tsx
 * // With callback
 * useKeyPress('Escape', () => setIsOpen(false));
 *
 * // Check if pressed
 * const isEnterPressed = useKeyPress('Enter');
 * ```
 */
export function useKeyPress(
  targetKey: string,
  handler?: (event: KeyboardEvent) => void
): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed(true);
        handler?.(event);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey, handler]);

  return keyPressed;
}

// ============================================
// useInterval
// ============================================

/**
 * Hook for declarative setInterval.
 *
 * @param callback - Function to call on each interval
 * @param delay - Interval delay in ms, or null to pause
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 *
 * // Increment every second
 * useInterval(() => {
 *   setCount((c) => c + 1);
 * }, 1000);
 *
 * // Pause by passing null
 * useInterval(callback, isRunning ? 1000 : null);
 * ```
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) return;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}
