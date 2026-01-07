# Trinity Design System - TypeScript Error Analysis

**Generated:** January 3, 2026  
**Total Errors:** 108  
**Status:** Analysis Complete

---

## Executive Summary

| Priority | Count | Category | Estimated Effort |
|----------|-------|----------|------------------|
| 🔴 Critical | 6 | DataTable generic/props | 1-2 hours |
| 🟠 High | 8 | Missing neutral tokens | 30 min |
| 🟡 Medium | 45 | Type mismatches, API | 3-4 hours |
| 🟢 Low | 29 | Test utils, edge cases | 1-2 hours |

---

## 🔴 CRITICAL (6 errors) — Blocks CI/Build

### 1. DataTable Generic Constraint
**Files:** `src/components/DataTable/DataTable.tsx`  
**Lines:** 186-187

```typescript
// CURRENT (broken)
bulkActions?: BulkAction<R>[];
onBulkAction?: (action: BulkAction<R>) => void;

// ERROR: Type 'R' does not satisfy the constraint 'GridValidRowModel'
```

**Fix:**
```typescript
import { GridValidRowModel } from '@mui/x-data-grid';

// Add constraint to interface
interface DataTableProps<R extends GridValidRowModel> {
  bulkActions?: BulkAction<R>[];
  onBulkAction?: (action: BulkAction<R>) => void;
}
```

---

### 2. DataTable pinnedColumns Prop
**File:** `src/components/DataTable/DataTable.tsx`  
**Line:** 962

```typescript
// CURRENT (broken)
pinnedColumns={pinnedColumns}

// ERROR: Property 'pinnedColumns' does not exist on type DataGrid props
```

**Fix Options:**
```typescript
// Option A: Remove prop (if using free DataGrid)
// Just delete the pinnedColumns prop

// Option B: Use DataGridPro (requires license)
import { DataGridPro } from '@mui/x-data-grid-pro';

// Option C: Conditional render
{isProVersion && <DataGridPro pinnedColumns={pinnedColumns} />}
```

---

### 3. DataTable Slot Button sx Prop
**File:** `src/components/DataTable/DataTable.tsx`  
**Lines:** 377, 393, 409

```typescript
// CURRENT (broken)
sx: { ... }

// ERROR: 'sx' does not exist in type 'Partial<BaseButtonPropsOverrides>'
```

**Fix:**
```typescript
// Option A: Use style instead of sx
style: {
  backgroundColor: '...',
  borderRadius: '...',
}

// Option B: Create styled component
const StyledButton = styled(Button)({ ... });
```

---

## 🟠 HIGH (8 errors) — Missing Token Properties

### Missing `brandColors.neutral` Properties

The following gray scale values are referenced but don't exist in `brandColors.neutral`:

| Missing Property | Files Using It | Available Alternative |
|------------------|----------------|----------------------|
| `gray50` | ChartWrapper.tsx:184 | `lightGray` (#FAFAFA) |
| `gray200` | ChartWrapper.tsx:59, CellRenderers.tsx:120 | `gray100` (#E5E7EB) |
| `gray300` | ChartWrapper.tsx:186, CustomLegend.tsx:154 | `gray400` (#9CA3AF) |
| `gray800` | ComposedChart.tsx:111, ComposedChart.tsx:121 | `darkBg` (#18181B) |
| `gray900` | CustomTooltip.tsx:113 | `gray600` (#374151) |

**Current `brandColors.neutral` structure:**
```typescript
neutral: {
  white: '#FFFFFF',
  lightGray: '#FAFAFA',
  gray100: '#E5E7EB',  // NOTE: Actually gray200
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#374151',
  darkBg: '#18181B',
  darkPaper: '#27272A',
}
```

**Fix Option A - Map to existing:**
```typescript
// In each file, replace:
brandColors.neutral.gray50  → brandColors.neutral.lightGray
brandColors.neutral.gray200 → brandColors.neutral.gray100
brandColors.neutral.gray300 → brandColors.neutral.gray400
brandColors.neutral.gray800 → brandColors.neutral.darkBg
brandColors.neutral.gray900 → brandColors.neutral.gray600
```

**Fix Option B - Extend tokens.ts:**
```typescript
// In src/tokens.ts, add to brandColors.neutral:
neutral: {
  ...existing,
  gray50: baseTokens.colors.gray[50],
  gray200: baseTokens.colors.gray[200],
  gray300: baseTokens.colors.gray[300],
  gray800: baseTokens.colors.gray[800],
  gray900: baseTokens.colors.gray[900],
}
```

---

## 🟡 MEDIUM (45 errors) — Type Mismatches & API Issues

### A. ResponsiveContainer Width/Height (6 errors)

**Files:**
- `src/components/Charts/LineChart.tsx:99`
- `src/components/Charts/BarChart.tsx:130`
- `src/components/Charts/AreaChart.tsx:101`
- `src/components/Charts/ScatterChart.tsx:221`
- `src/components/Charts/ComposedChart.tsx:163`

```typescript
// CURRENT (broken)
<ResponsiveContainer width={width} height={height}>

// ERROR: Type 'string | number' is not assignable to type 'number | `${number}%`'
```

**Fix:**
```typescript
<ResponsiveContainer 
  width={width as number | `${number}%`} 
  height={height as number | `${number}%`}
>
```

---

### B. Chart onClick Payload Access (8 errors)

**Files:**
- `src/components/Charts/LineChart.tsx:275-276`
- `src/components/Charts/AreaChart.tsx:256-257`

```typescript
// CURRENT (broken)
if (payload && payload.payload) {
  onDataPointClick(payload.payload, payload.index || 0);
}

// ERROR: Property 'payload' does not exist on MouseEvent
```

**Fix:**
```typescript
// Use proper Recharts callback signature
const handleClick = (data: any, index: number) => {
  if (onDataPointClick && data) {
    onDataPointClick(data, index);
  }
};

// Or use CategoricalChartState type
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
```

---

### C. CustomTooltip Missing Props (7 errors)

**File:** `src/components/Charts/CustomTooltip.tsx:28-78`

```typescript
// CURRENT interface missing props
interface CustomTooltipProps {
  // Missing: payload, label
}

// ERROR: Property 'payload' does not exist on type 'CustomTooltipProps'
```

**Fix:**
```typescript
interface TooltipPayloadItem {
  value: number;
  color: string;
  name: string;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  // ... other existing props
}

// Add types to callback params
payload.reduce((sum: number, entry: TooltipPayloadItem) => ...)
payload.map((entry: TooltipPayloadItem, index: number) => ...)
```

---

### D. Sparkline chartColorsStatus (3 errors)

**File:** `src/components/Charts/Sparkline.tsx:60-63`

```typescript
// CURRENT (broken)
referenceLineColor = chartColorsStatus.neutral,
minColor = chartColorsStatus.error,
maxColor = chartColorsStatus.success,

// ERROR: Property 'neutral' does not exist on type 'string[]'
```

**Fix:**
```typescript
// Define as object instead of array
const chartColorsStatus = {
  neutral: brandColors.neutral.gray500,
  error: semanticTokens.colors.status.error,
  success: semanticTokens.colors.status.success,
} as const;
```

---

### E. Charts types.ts Index Signature (1 error)

**File:** `src/components/Charts/types.ts:31`

```typescript
// CURRENT (broken)
interface DataPoint {
  [key: string]: string | number | null | undefined;
  date: string | Date;  // Date not in index signature
}
```

**Fix:**
```typescript
interface DataPoint {
  [key: string]: string | number | Date | null | undefined;
  date: string | Date;
}

// OR change date to string only
date: string;
```

---

### F. PieChart Data Type (1 error)

**File:** `src/components/Charts/PieChart.tsx:225`

```typescript
// ERROR: Type 'PieDataPoint[]' is not assignable to type 'ChartDataInput[]'
```

**Fix:**
```typescript
interface PieDataPoint {
  [key: string]: string | number | null | undefined;
  name: string;
  value: number;
  color?: string;
}
```

---

### G. BarChart onDataPointClick (1 error)

**File:** `src/components/Charts/BarChart.tsx:279`

```typescript
// CURRENT
(data, index) => onDataPointClick(data, index)

// ERROR: Argument of type 'BarRectangleItem' is not assignable to 'DataPoint'
```

**Fix:**
```typescript
// Cast or adjust callback signature
(data, index) => onDataPointClick(data as DataPoint, index)

// Or update DataPoint interface to be compatible
```

---

### H. ComposedChart AxisConfig (1 error)

**File:** `src/components/Charts/ComposedChart.tsx:251`

```typescript
// CURRENT
interval={xAxis?.interval}

// ERROR: Property 'interval' does not exist on type 'AxisConfig'
```

**Fix:**
```typescript
// Add to AxisConfig interface
interface AxisConfig {
  // ... existing
  interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd';
}
```

---

### I. MUI Grid v2 API (4 errors)

**File:** `src/stories/utils/ComponentTemplate.stories.tsx:392,439,592,600`

```typescript
// CURRENT (MUI v5 API - broken in v6/7)
<Grid item xs={12} md={6}>

// ERROR: Property 'item' does not exist
```

**Fix:**
```typescript
// MUI v6/7 Grid2 API
<Grid size={{ xs: 12, md: 6 }}>

// Or import Grid2 explicitly
import Grid2 from '@mui/material/Unstable_Grid2';
<Grid2 xs={12} md={6}>
```

---

### J. AppLayoutDemoPage Props (1 error)

**File:** `src/pages/AppLayoutDemoPage.tsx:91`

```typescript
// CURRENT
notificationCount={5}

// ERROR: Property 'notificationCount' does not exist on type 'AppLayoutProps'
```

**Fix:**
```typescript
// Option A: Add to AppLayoutProps interface
interface AppLayoutProps {
  // ... existing
  notificationCount?: number;
}

// Option B: Remove from usage if not needed
// Delete the line: notificationCount={5}
```

---

## 🟢 LOW (29 errors) — Test Utilities & Non-Production

### A. test-utils.tsx Missing expect (6 errors)

**File:** `src/testing/test-utils.tsx:125,187,197,207,218,229`

```typescript
// ERROR: Cannot find name 'expect'
expect(results).toHaveNoViolations();
```

**Fix:**
```typescript
// Option A: Import from vitest
import { expect } from 'vitest';

// Option B: Add triple-slash reference
/// <reference types="vitest/globals" />

// Option C: Update tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

---

### B. test-utils.tsx axe Container Type (1 error)

**File:** `src/testing/test-utils.tsx:100`

```typescript
// CURRENT
const results = await axe(container, { ... });

// ERROR: Type 'Document' is not assignable to type 'Element'
```

**Fix:**
```typescript
const results = await axe(container as Element, {
  // ... options
});
```

---

### C. DataTable Row Event Handlers (4 errors)

**File:** `src/components/DataTable/DataTable.tsx:987,992`

```typescript
// CURRENT
(slotProps?.row as Record<string, unknown>)?.onMouseEnter?.(event);

// ERROR: Type cast issues
```

**Fix:**
```typescript
// Safer type handling
const rowProps = slotProps?.row;
if (rowProps && 'onMouseEnter' in rowProps) {
  (rowProps.onMouseEnter as ((e: React.MouseEvent) => void))?.(event);
}
```

---

## Recommended Fix Order

### Phase A (30 min) - Token Fixes
1. Extend `brandColors.neutral` in `src/tokens.ts`
2. OR map references to existing tokens

### Phase B (1-2 hours) - DataTable Critical
1. Add `GridValidRowModel` constraint
2. Remove/guard `pinnedColumns` prop
3. Replace `sx` with `style` in slots

### Phase C (2-3 hours) - Charts
1. Fix `ResponsiveContainer` type casts
2. Update `CustomTooltipProps` interface
3. Fix `chartColorsStatus` structure
4. Update `AxisConfig` interface

### Phase D (1 hour) - Stories & Tests
1. Update MUI Grid v2 API
2. Add Vitest globals reference
3. Fix axe container type

---

## Files Requiring Changes

| File | Error Count | Priority |
|------|-------------|----------|
| `src/components/DataTable/DataTable.tsx` | 10 | 🔴 Critical |
| `src/components/Charts/CustomTooltip.tsx` | 7 | 🟡 Medium |
| `src/testing/test-utils.tsx` | 7 | 🟢 Low |
| `src/components/Charts/LineChart.tsx` | 4 | 🟡 Medium |
| `src/components/Charts/AreaChart.tsx` | 4 | 🟡 Medium |
| `src/stories/utils/ComponentTemplate.stories.tsx` | 4 | 🟡 Medium |
| `src/components/Charts/ChartWrapper.tsx` | 3 | 🟠 High |
| `src/components/Charts/Sparkline.tsx` | 3 | 🟡 Medium |
| `src/components/Charts/ComposedChart.tsx` | 4 | 🟡 Medium |
| `src/components/Charts/BarChart.tsx` | 2 | 🟡 Medium |
| Others | ~60 | Various |

---

## Quick Wins (Can fix immediately)

1. **Token mapping** - Replace missing gray values with existing alternatives
2. **ResponsiveContainer casts** - Add `as number | \`${number}%\`` 
3. **Vitest globals** - Add reference to tsconfig or imports
4. **Grid v2 API** - Change `<Grid item xs={12}>` to `<Grid size={12}>`

---

*Document generated for Trinity Design System type error remediation planning.*
