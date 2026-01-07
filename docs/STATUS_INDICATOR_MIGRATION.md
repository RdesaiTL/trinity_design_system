# StatusIndicator Migration Guide

## Overview

The StatusIndicator components have been consolidated into a **single polymorphic component** in v2.0. This provides a cleaner API, better TypeScript support, and consistent behavior across all status display patterns.

## Quick Reference

| Legacy Component | New Unified API |
|------------------|-----------------|
| `<IconIndicator status="success" />` | `<StatusIndicator status="success" />` |
| `<ShapeIndicator status="warning" />` | `<StatusIndicator variant="shape" status="warning" />` |
| `<StatusDot status="error" />` | `<StatusIndicator variant="dot" status="error" />` |
| `<StatusChip status="info" />` | `<StatusIndicator variant="chip" status="info" />` |
| `<InlineStatus status="pending" />` | `<StatusIndicator variant="inline" status="pending" />` |
| `<BadgeIndicator status="error" count={5}>...</BadgeIndicator>` | `<StatusIndicator variant="badge" status="error" count={5}>...</StatusIndicator>` |
| `<DifferentialIndicator value={12.5} percentage />` | `<StatusIndicator variant="differential" value={12.5} percentage />` |

## Detailed Migration

### IconIndicator → StatusIndicator (variant="icon")

```tsx
// Before
import { IconIndicator } from '@trinity/design-system';

<IconIndicator 
  status="success" 
  size="medium" 
  label="Approved" 
  showLabel={true}
  iconOnly={false}
/>

// After
import { StatusIndicator } from '@trinity/design-system';

<StatusIndicator 
  variant="icon"  // or omit - 'icon' is the default
  status="success" 
  size="medium" 
  label="Approved" 
  showLabel={true}
  iconOnly={false}
/>
```

### ShapeIndicator → StatusIndicator (variant="shape")

```tsx
// Before
import { ShapeIndicator } from '@trinity/design-system';

<ShapeIndicator 
  status="critical" 
  shape="hexagon"
  size="medium"
  showOutline={true}
/>

// After
import { StatusIndicator } from '@trinity/design-system';

<StatusIndicator 
  variant="shape"
  status="critical" 
  shape="hexagon"
  size="medium"
  showOutline={true}
/>
```

### StatusDot → StatusIndicator (variant="dot")

```tsx
// Before
import { StatusDot } from '@trinity/design-system';

<StatusDot 
  status="in-progress" 
  size="small" 
  pulse={true}
/>

// After
import { StatusIndicator } from '@trinity/design-system';

<StatusIndicator 
  variant="dot"
  status="in-progress" 
  size="small" 
  pulse={true}
/>
```

### StatusChip → StatusIndicator (variant="chip")

```tsx
// Before
import { StatusChip } from '@trinity/design-system';

<StatusChip 
  status="warning" 
  label="Pending Review"
  size="small"
  showIcon={true}
  onClick={handleClick}
  onDelete={handleDelete}
/>

// After
import { StatusIndicator } from '@trinity/design-system';

<StatusIndicator 
  variant="chip"
  status="warning" 
  label="Pending Review"
  size="small"
  showIcon={true}
  onClick={handleClick}
  onDelete={handleDelete}
/>
```

### InlineStatus → StatusIndicator (variant="inline")

```tsx
// Before
import { InlineStatus } from '@trinity/design-system';

<InlineStatus 
  status="complete" 
  label="Task Done"
  showDot={true}
  showIcon={false}
/>

// After
import { StatusIndicator } from '@trinity/design-system';

<StatusIndicator 
  variant="inline"
  status="complete" 
  label="Task Done"
  showDot={true}
  showIcon={false}
/>
```

### BadgeIndicator → StatusIndicator (variant="badge")

```tsx
// Before
import { BadgeIndicator } from '@trinity/design-system';

<BadgeIndicator 
  status="error" 
  count={5}
  max={99}
>
  <NotificationsIcon />
</BadgeIndicator>

// Dot variant
<BadgeIndicator status="success" dot>
  <MailIcon />
</BadgeIndicator>

// After
import { StatusIndicator } from '@trinity/design-system';

<StatusIndicator 
  variant="badge"
  status="error" 
  count={5}
  max={99}
>
  <NotificationsIcon />
</StatusIndicator>

// Dot variant
<StatusIndicator variant="badge" status="success" dot>
  <MailIcon />
</StatusIndicator>
```

### DifferentialIndicator → StatusIndicator (variant="differential")

```tsx
// Before
import { DifferentialIndicator } from '@trinity/design-system';

<DifferentialIndicator 
  value={12.5} 
  percentage={true}
  showIcon={true}
  showColor={true}
  positiveColor="#24a148"
  negativeColor="#da1e28"
/>

// After
import { StatusIndicator } from '@trinity/design-system';

<StatusIndicator 
  variant="differential"
  value={12.5} 
  percentage={true}
  showIcon={true}
  showColor={true}
  positiveColor="#24a148"
  negativeColor="#da1e28"
/>
```

## Props Reference

### Common Props (All Variants)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'icon' \| 'shape' \| 'dot' \| 'chip' \| 'inline' \| 'badge' \| 'differential'` | `'icon'` | Visual variant |
| `status` | `StatusType` | `'info'` | Semantic status type |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of indicator |
| `label` | `string` | Status default | Custom label text |
| `showLabel` | `boolean` | `true` | Show/hide label |
| `sx` | `SxProps<Theme>` | - | MUI sx styling |

### Variant-Specific Props

#### Icon Variant
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconOnly` | `boolean` | `false` | Hide background shape |

#### Shape Variant
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `StatusShape` | From status config | Override shape |
| `showOutline` | `boolean` | `true` | Show outline border |

#### Dot Variant
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pulse` | `boolean` | `false` | Enable pulse animation |

#### Chip Variant
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showIcon` | `boolean` | `true` | Show status icon |
| `onClick` | `() => void` | - | Click handler |
| `onDelete` | `() => void` | - | Delete handler |

#### Inline Variant
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showDot` | `boolean` | `true` | Show dot prefix |
| `showIcon` | `boolean` | `false` | Show icon prefix |

#### Badge Variant
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Content to wrap |
| `count` | `number` | - | Badge count |
| `dot` | `boolean` | `false` | Show dot instead |
| `max` | `number` | `999` | Max before "+" |
| `invisible` | `boolean` | `false` | Hide badge |

#### Differential Variant
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | **Required** | The numeric value |
| `percentage` | `boolean` | `false` | Format as % |
| `currency` | `string` | - | Currency symbol |
| `showIcon` | `boolean` | `true` | Show arrow icon |
| `showColor` | `boolean` | `true` | Color by value |
| `positiveColor` | `string` | `'#24a148'` | Positive color |
| `negativeColor` | `string` | `'#da1e28'` | Negative color |

## TypeScript Support

The unified component uses discriminated unions for excellent TypeScript inference:

```tsx
// TypeScript will enforce correct props for each variant
<StatusIndicator 
  variant="badge"
  status="error"
  count={5}        // ✅ Valid for badge variant
  children={<Icon />}  // ✅ Required for badge variant
/>

<StatusIndicator 
  variant="dot"
  status="success"
  pulse={true}     // ✅ Valid for dot variant
  // count={5}     // ❌ TypeScript error - not valid for dot
/>

<StatusIndicator 
  variant="differential"
  value={12.5}     // ✅ Required for differential variant
  percentage       // ✅ Valid for differential variant
/>
```

## Backward Compatibility

Legacy exports are preserved but marked as deprecated:

```tsx
// Still works but shows deprecation warning in IDE
import { IconIndicator, StatusChip } from '@trinity/design-system';

// Recommended
import { StatusIndicator } from '@trinity/design-system';
```

## Codemod (Optional)

For large codebases, you can use this regex pattern for find-and-replace:

```regex
// Find IconIndicator
<IconIndicator\s+

// Replace with
<StatusIndicator variant="icon" 

// Similar patterns for other components...
```

## Benefits of Migration

1. **Single Import**: One component instead of 7 separate imports
2. **Consistent API**: Same base props across all variants
3. **Type Safety**: Discriminated unions ensure correct prop usage
4. **Smaller Bundle**: Single component implementation
5. **Easier Maintenance**: One component to update and test
