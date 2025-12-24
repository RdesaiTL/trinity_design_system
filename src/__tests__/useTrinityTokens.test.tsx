import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { useTrinityTokens, lightTheme, darkTheme } from '../theme';
import { baseTokens, semanticTokens } from '../tokens';
import React from 'react';

describe('useTrinityTokens Hook', () => {
  const lightWrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
  );

  const darkWrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
  );

  describe('in light mode', () => {
    it('should return light mode', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: lightWrapper });
      expect(result.current.mode).toBe('light');
      expect(result.current.isDarkMode).toBe(false);
    });

    it('should return all token layers', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: lightWrapper });
      expect(result.current.tokens).toBeDefined();
      expect(result.current.base).toBeDefined();
      expect(result.current.semantic).toBeDefined();
      expect(result.current.component).toBeDefined();
      expect(result.current.darkMode).toBeDefined();
    });

    it('should provide spacing helper', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: lightWrapper });
      expect(result.current.spacing(4)).toBe(16);
      expect(result.current.spacingCss(4)).toBe('16px');
    });

    it('should provide radius helper', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: lightWrapper });
      expect(result.current.radius('md')).toBe(baseTokens.borderRadius.md);
    });

    it('should provide shadow helper', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: lightWrapper });
      expect(result.current.shadow('md')).toBe(baseTokens.shadows.md);
    });

    it('should return light color from getColor', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: lightWrapper });
      const color = result.current.getColor('#FFFFFF', '#000000');
      expect(color).toBe('#FFFFFF');
    });
  });

  describe('in dark mode', () => {
    it('should return dark mode', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: darkWrapper });
      expect(result.current.mode).toBe('dark');
      expect(result.current.isDarkMode).toBe(true);
    });

    it('should return dark color from getColor when dark variant provided', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: darkWrapper });
      const color = result.current.getColor('#FFFFFF', '#000000');
      expect(color).toBe('#000000');
    });

    it('should return light color from getColor when no dark variant provided', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: darkWrapper });
      const color = result.current.getColor('#FFFFFF');
      expect(color).toBe('#FFFFFF');
    });
  });

  describe('getSemanticColor', () => {
    it('should return semantic color value in light mode', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: lightWrapper });
      const color = result.current.getSemanticColor('brand', 'primary');
      expect(color).toBe(semanticTokens.colors.brand.primary);
    });

    it('should return empty string for invalid paths', () => {
      const { result } = renderHook(() => useTrinityTokens(), { wrapper: lightWrapper });
      const color = result.current.getSemanticColor('brand', 'nonexistent');
      expect(color).toBe('');
    });
  });
});
