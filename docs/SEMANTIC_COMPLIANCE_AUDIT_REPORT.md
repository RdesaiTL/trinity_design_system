# Trinity Design System — Semantic Compliance Audit Report

**Audit Date:** January 5, 2026  
**Version:** 1.1.0  
**Auditor:** Principal Design Systems Engineer  
**Scope:** Full system semantic token compliance

---

## Executive Summary

This audit identifies **206 semantic violations** across 51 auditable components. The majority stem from **4 systemic gaps** in the token architecture rather than individual component negligence. Remediation can achieve ~75% reduction through semantic layer additions without touching component code.

| Metric | Count |
|--------|-------|
| Total Violations | 206 |
| Files Affected | 34 |
| Root Causes Identified | 4 major, 3 minor |
| Estimated Remediation Effort | 3 phases (2-3 sprints) |

---

## PHASE 1: Component Inventory & Classification

### Classification Framework

| Category | Definition | Semantic Strictness |
|----------|------------|---------------------|
| **Control** | Interactive inputs (buttons, fields, toggles) | **Strict** — Must use semantic tokens exclusively |
| **Container** | Surface wrappers (cards, accordions, modals) | **Strict** — Shadows, radii, borders must be semantic |
| **Navigation** | Wayfinding (menus, tabs, breadcrumbs) | **Strict** — Colors, typography, spacing semantic |
| **Data** | Information display (tables, charts, cards) | **Moderate** — Core styling semantic; data palettes allowed |
| **Layout** | Structural (grid, split, dock) | **Moderate** — Spacing semantic; dimensions contextual |
| **Template** | Page compositions | **Inherited** — Depends on composed components |
| **Pattern** | UX patterns (empty states, status) | **Moderate** — Illustration colors intentionally distinct |
| **Domain** | Specialized (AI, Charts) | **Exception** — Domain-specific tokens acceptable |

### Component Classification Matrix

| # | Component | Category | Strictness | Status |
|---|-----------|----------|------------|--------|
| 1 | Button | Control | Strict | ✅ Compliant (theme override) |
| 2 | TextField | Control | Strict | ✅ Compliant (theme override) |
| 3 | Switch | Control | Strict | ✅ Compliant (theme override) |
| 4 | Slider | Control | Strict | ✅ Compliant (theme override) |
| 5 | Rating | Control | Strict | ✅ Compliant (theme override) |
| 6 | Autocomplete | Control | Strict | ✅ Compliant (theme override) |
| 7 | DateTime | Control | Strict | ⚠️ Partial |
| 8 | SelectionGroups | Control | Strict | ✅ Compliant |
| 9 | Combobox | Control | Strict | ⚠️ Partial (borderRadius) |
| 10 | SearchInput | Control | Strict | ⚠️ Partial |
| 11 | FilterBar | Control | Strict | ⚠️ Partial (fontSize) |
| 12 | FileUpload | Control | Strict | ❌ Non-Compliant (px values) |
| 13 | Avatar | Data Display | Moderate | ✅ Compliant |
| 14 | Chip | Data Display | Moderate | ✅ Compliant |
| 15 | Tooltip | Data Display | Moderate | ✅ Compliant |
| 16 | DataTable | Data | Moderate | ❌ Non-Compliant (22 borderRadius, 7 fontSize) |
| 17 | DataCard | Data | Moderate | ⚠️ Partial (fontSize) |
| 18 | TreeView | Data Display | Moderate | ⚠️ Partial |
| 19 | Timeline | Data Display | Moderate | ⚠️ Partial (borderRadius) |
| 20 | DiffViewer | Data Display | Moderate | ⚠️ Partial (fontSize) |
| 21 | TransferList | Data Display | Moderate | ✅ Compliant |
| 22 | Alert | Feedback | Strict | ✅ Compliant (theme override) |
| 23 | Loader | Feedback | Strict | ✅ Compliant |
| 24 | Progress | Feedback | Strict | ✅ Compliant |
| 25 | Skeleton | Feedback | Strict | ✅ Compliant |
| 26 | Toast | Feedback | Strict | ✅ Compliant |
| 27 | Modal | Container | Strict | ⚠️ Partial (borderRadius, fontSize) |
| 28 | Accordion | Container | Strict | ✅ Compliant |
| 29 | Card | Container | Strict | ✅ Compliant |
| 30 | Breadcrumbs | Navigation | Strict | ✅ Compliant |
| 31 | Menu | Navigation | Strict | ⚠️ Partial (borderRadius) |
| 32 | Tabs | Navigation | Strict | ✅ Compliant |
| 33 | TopNavHeader | Navigation | Strict | ❌ Non-Compliant (7 borderRadius, 6 fontSize, 3 rgba) |
| 34 | TopNavWithSidebar | Navigation | Strict | ❌ Non-Compliant (8 borderRadius, 7 fontSize, 3 rgba) |
| 35 | Grid | Layout | Moderate | ✅ Compliant |
| 36 | Layout | Layout | Moderate | ⚠️ Partial (borderRadius) |
| 37 | SplitPane | Layout | Moderate | ✅ Compliant |
| 38 | DockLayout | Layout | Moderate | ⚠️ Partial (borderRadius, fontSize) |
| 39 | PageHeader | Layout | Moderate | ❌ Non-Compliant (9 rgba, 4 fontSize) |
| 40 | AppLayout | Template | Inherited | ⚠️ Partial |
| 41 | DashboardTemplate | Template | Inherited | ⚠️ Partial |
| 42 | ListDetailTemplate | Template | Inherited | ⚠️ Partial |
| 43 | SettingsTemplate | Template | Inherited | ⚠️ Partial |
| 44 | RichTextEditor | Control | Moderate | ⚠️ Partial (borderRadius, fontSize) |
| 45 | CommandPalette | Control | Moderate | ⚠️ Partial (fontSize) |
| 46 | Charts (all) | Domain | Exception | ⚠️ Domain tokens defined |
| 47 | EmptyStates | Pattern | Moderate | ✅ Compliant |
| 48 | IllustratedMessage | Pattern | Exception | ⚠️ Intentional (7 hex colors) |
| 49 | StatusIndicator | Pattern | Moderate | ⚠️ Partial (borderRadius, fontSize) |
| 50 | AI Components | Domain | Exception | ⚠️ Domain tokens (9 rgba in tokens.ts) |
| 51 | InsightEnginePanel | Domain | Exception | ❌ High violation count (31 fontSize, domain-specific) |

---

## PHASE 2: Violation Analysis by Root Cause

### Violation Summary

| Violation Type | Count | % of Total |
|----------------|-------|------------|
| Hardcoded `px` values | 82 | 40% |
| Hardcoded `rgba()` | 57 | 28% |
| Hardcoded hex colors | 38 | 18% |
| `baseTokens.*` usage | 29 | 14% |
| **TOTAL** | **206** | 100% |

---

### ROOT CAUSE 1: Missing Semantic Effects Layer
**Violations:** 57 (rgba) + partial hex  
**Impact:** High  

The token system has `baseTokens.opacity` values but **no semantic effects layer** for overlay, shadow, and focus states. Components hardcode rgba to achieve:

| Effect Intent | Current Pattern | Occurrences |
|---------------|-----------------|-------------|
| Dropdown shadow | `rgba(0,0,0,0.15)` | 10 |
| Dark text overlay | `rgba(255,255,255,0.7)` | 8 |
| AI component bg/border | `rgba(120,65,201,0.05-0.3)` | 12 |
| Dark mode hover | `rgba(255,255,255,0.05)` | 4 |
| Dark mode border | `rgba(255,255,255,0.12)` | 4 |
| Error state subtle | `rgba(218,30,40,0.05-0.3)` | 2 |

**Files Affected:**
- `TopNavHeader.tsx` (3)
- `TopNavWithSidebar.tsx` (3)
- `navigation/components.tsx` (3)
- `PageHeader/PageHeader.tsx` (9)
- `AI/tokens.ts` (9)
- `DataTable/tokens.ts` (8)
- `Charts/tokens.ts` (4)

**Semantic Gap:** `semanticTokens.effects` does not exist.

---

### ROOT CAUSE 2: Missing Semantic Icon/Typography Sizes
**Violations:** ~95 fontSize violations  
**Impact:** High  

Components define icon sizes and micro-typography inline because semantic tokens only cover standard text sizes (xs-6xl), not:

| Size Intent | Common Values | Context |
|-------------|---------------|---------|
| Icon in button | 14, 16, 18px | FilterBar, DataTable, CommandPalette |
| Dense UI text | 10, 11, 12px | Charts, DataTable, AI components |
| Hero icon | 28, 36px | PageHeader, InsightEnginePanel |
| Badge/label | 10, 11px | AILabel, InsightEnginePanel |

**Files Affected (Top 5):**
- `AppLayout/InsightEnginePanel.tsx` (31)
- `Charts/tokens.ts` (8)
- `DataTable/tokens.ts` (7)
- `AI/AILabel.tsx` (7)
- `TopNavWithSidebar.tsx` (7)

**Semantic Gap:** No `semanticTokens.iconSize` or `semanticTokens.typography.micro` scale.

---

### ROOT CAUSE 3: Missing Semantic Size Scale for Border Radius
**Violations:** ~90 borderRadius violations  
**Impact:** Medium  

While `semanticTokens.borders.radius` exists with component-specific tokens (button, input, card, modal), many use cases fall outside these:

| Intent | Current Pattern | Missing Token |
|--------|-----------------|---------------|
| Skeleton/loading | `borderRadius: 1` | `radius.skeleton` |
| Menu dropdown | `'12px'` | Already `radius.menu` = md (8px) ← mismatch |
| DataTable internal | `'8px'`, `'4px'`, `0` | `radius.tableCell`, `radius.none` |
| Status dot | `'50%'` | `radius.circle` |

**Files Affected (Top 5):**
- `DataTable/DataTable.tsx` (22)
- `TopNavWithSidebar.tsx` (8)
- `TopNavHeader.tsx` (7)
- `Charts/ChartWrapper.tsx` (5)
- `RichTextEditor/RichTextEditor.tsx` (4)

**Semantic Gap:** Missing `radius.circle`, discrepancy between defined tokens and actual nav menu values.

---

### ROOT CAUSE 4: Domain Color Palettes Not Classified as Exceptions
**Violations:** 38 hardcoded hex  
**Impact:** Low (mostly intentional)  

Three domains intentionally define specialized color palettes:

| Domain | File | Hex Count | Justification |
|--------|------|-----------|---------------|
| Charts | `Charts/tokens.ts` | 7 | Data visualization requires categorical palette |
| Illustrations | `IllustratedMessage.tsx` | 7 | Illustration status colors distinct from UI |
| DataTable | `DataTable/tokens.ts` | 16 | Dense tabular readability tuning |
| AI | `AI/tokens.ts` | 0 | Uses branded rgba properly |

**Assessment:** These are **intentional domain exceptions**, not defects. However, they lack formal `@intentional-color` annotations consistently.

---

### ROOT CAUSE 5: Inconsistent Component Token Architecture
**Violations:** ~29 baseTokens direct usage  
**Impact:** Low  

Some component token files (`AI/tokens.ts`, `Charts/tokens.ts`, `DataTable/tokens.ts`) correctly reference `baseTokens` for building domain tokens. This is **acceptable** for component-level token files that create their own semantic layer.

However, direct `baseTokens` usage in **component TSX files** is a violation.

**Acceptable:**
```typescript
// In AI/tokens.ts (domain token definition)
aiHover: baseTokens.colors.indigo[50]
```

**Violation:**
```typescript
// In Component.tsx (should use semantic)
color: baseTokens.colors.gray[500]
```

---

### ROOT CAUSE 6: Legacy Padding/Spacing Hardcoding
**Violations:** ~20 padding px strings  
**Impact:** Low  

Components use pixel padding strings like `'6px 12px'` instead of MUI spacing or semantic tokens:

| Pattern | Count | Alternative |
|---------|-------|-------------|
| `padding: '6px 12px'` | 4 | `py: 0.75, px: 1.5` |
| `padding: '4px 8px'` | 3 | `py: 0.5, px: 1` |
| `padding: '2px 4px'` | 2 | `py: 0.25, px: 0.5` |

**Files Affected:**
- Navigation components (TopNavHeader, TopNavWithSidebar, styled.ts)
- AI/AILabel.tsx (size variants)
- DataTable/tokens.ts (density variants)

---

### ROOT CAUSE 7: MUI Theme Integration Inconsistency
**Violations:** Minor  
**Impact:** Low  

Some components use MUI theme values correctly (`theme.palette.text.secondary`), others hardcode equivalents. This creates inconsistency but not visual bugs.

---

## PHASE 3: Systemic Pattern Synthesis

### Gap-to-Component Impact Map

| Gap | Components Affected | Severity |
|-----|---------------------|----------|
| Missing `semanticTokens.effects` | TopNavHeader, TopNavWithSidebar, PageHeader, AI/*, DataTable, Charts | **Critical** |
| Missing icon/micro typography scale | InsightEnginePanel, Charts, DataTable, AI components, Navigation | **High** |
| Border radius inconsistency | DataTable, Navigation, Modal, Templates | **Medium** |
| Domain palette governance | Charts, IllustratedMessage, DataTable | **Low** (intentional) |
| Padding token adoption | Navigation, AI/AILabel | **Low** |

### Violation Classification

#### ✅ True Design System Defects (Must Fix)
| ID | Gap | Fix Type |
|----|-----|----------|
| D1 | No semantic effects layer | Token addition |
| D2 | No icon/micro typography scale | Token addition |
| D3 | Border radius value mismatch (12px vs 8px for menus) | Token correction |
| D4 | Missing `radius.circle` token | Token addition |

#### ⚠️ Intentional Domain Exceptions (Document, Don't Fix)
| ID | Component | Justification |
|----|-----------|---------------|
| E1 | Charts color palettes | Data viz requires categorical colors outside brand |
| E2 | IllustratedMessage status colors | Tailwind palette for illustration consistency |
| E3 | DataTable header grays | Dense tabular readability tuning |
| E4 | AI tokens rgba patterns | Domain-specific until effects layer exists |

#### 🔧 Legacy Technical Debt (Phase 3 Normalization)
| ID | Area | Current State | Target State |
|----|------|---------------|--------------|
| L1 | Navigation borderRadius | Hardcoded '12px' | `semanticTokens.borders.radius.menu` |
| L2 | Padding strings | '6px 12px' | MUI spacing units |
| L3 | fontSize in components | Numeric literals | Theme typography or icon scale |

---

## PHASE 4: Remediation Strategy

### Phase A: Semantic Layer Additions (No Component Changes)
**Effort:** 1-2 days  
**Risk:** None  
**Impact:** Enables 60% of fixes  

| Task | Description | File |
|------|-------------|------|
| A1 | Add `semanticTokens.effects` object | `src/tokens.ts` |
| A2 | Add `semanticTokens.iconSize` scale (xs: 14, sm: 16, md: 20, lg: 24, xl: 28, 2xl: 36) | `src/tokens.ts` |
| A3 | Add `semanticTokens.typography.micro` (10px, 11px) | `src/tokens.ts` |
| A4 | Add `semanticTokens.borders.radius.circle` = '50%' | `src/tokens.ts` |
| A5 | Update `semanticTokens.borders.radius.menu` = 12 (match actual usage) | `src/tokens.ts` |
| A6 | Add eslint rule for `@intentional-color` annotation requirement | `eslint.tokens.config.js` |

**Deliverable:** Updated `tokens.ts` with no breaking changes.

---

### Phase B: Token Remapping (Low Risk)
**Effort:** 2-3 days  
**Risk:** Low (visual parity maintained)  
**Impact:** 25% violation reduction  

| Task | Components | Change |
|------|------------|--------|
| B1 | AI/tokens.ts | Replace rgba with `semanticTokens.effects.ai.*` |
| B2 | DataTable/tokens.ts | Replace rgba with `semanticTokens.effects.*` |
| B3 | Charts/tokens.ts | Replace rgba with `semanticTokens.effects.*` |
| B4 | All domain token files | Add `@intentional-color` annotations |

**Deliverable:** Domain token files reference semantic layer; visual unchanged.

---

### Phase C: Targeted Component Normalization
**Effort:** 3-5 days  
**Risk:** Medium (requires visual QA)  
**Impact:** Remaining 15% violations  

| Priority | Component | Violations | Fix |
|----------|-----------|------------|-----|
| 1 | TopNavHeader | 16 | Replace hardcoded borderRadius, fontSize, rgba |
| 2 | TopNavWithSidebar | 18 | Replace hardcoded borderRadius, fontSize, rgba |
| 3 | PageHeader | 13 | Replace rgba with effects tokens |
| 4 | DataTable/DataTable.tsx | 22+ | Replace borderRadius with semantic |
| 5 | InsightEnginePanel | 31+ | Apply icon/micro scale |

**Deliverable:** Top 5 high-violation files normalized.

---

## PHASE 5: Actionable Outputs

### A. Semantic Compliance Scorecard

| Component | Violations | Score | Status |
|-----------|------------|-------|--------|
| MUI Primitives (Button, TextField, etc.) | 0 | 100% | ✅ |
| Accordion, Card, Alert, Toast | 0 | 100% | ✅ |
| Breadcrumbs, Tabs, Grid | 0 | 100% | ✅ |
| Avatar, Chip, Tooltip | 0 | 100% | ✅ |
| Loader, Progress, Skeleton | 0 | 100% | ✅ |
| TransferList, EmptyStates | 0 | 100% | ✅ |
| Combobox, SearchInput, FilterBar | 2-4 | 85% | ⚠️ |
| Modal, Menu, Timeline, TreeView | 3-5 | 80% | ⚠️ |
| Layout, DockLayout, RichTextEditor | 4-6 | 75% | ⚠️ |
| DiffViewer, CommandPalette, StatusIndicator | 4-6 | 75% | ⚠️ |
| Templates (all) | 2-4 | 80% | ⚠️ |
| FileUpload | 4 | 70% | ⚠️ |
| DataCard | 4 | 70% | ⚠️ |
| PageHeader | 13 | 50% | ❌ |
| TopNavHeader | 16 | 45% | ❌ |
| TopNavWithSidebar | 18 | 40% | ❌ |
| DataTable | 29+ | 30% | ❌ |
| InsightEnginePanel | 31+ | 25% | ❌ |
| **Charts** (domain) | 15+ | N/A | ⚠️ Exception |
| **AI Components** (domain) | 20+ | N/A | ⚠️ Exception |
| **IllustratedMessage** (pattern) | 7 | N/A | ⚠️ Exception |

**Overall Score:** 68% compliant (excluding documented exceptions)

---

### B. Design Rule Gap List

| # | Gap | Required Rule | Priority |
|---|-----|---------------|----------|
| 1 | Effects layer | `semanticTokens.effects.{overlay,shadow,focus,state,ai}` | **P0** |
| 2 | Icon sizing | `semanticTokens.iconSize.{xs,sm,md,lg,xl,2xl}` | **P0** |
| 3 | Micro typography | `semanticTokens.typography.micro.{xs,sm}` | **P1** |
| 4 | Circle radius | `semanticTokens.borders.radius.circle` = '50%' | **P1** |
| 5 | Menu radius correction | `semanticTokens.borders.radius.menu` = 12 (was 8) | **P1** |
| 6 | Domain exception annotation | `@intentional-color` eslint enforcement | **P2** |
| 7 | Padding scale semantic | Consider `semanticTokens.spacing.inline.*` | **P3** |

---

### C. Normalization Candidate List (High Leverage)

| Rank | File | Violations | Est. Effort | ROI |
|------|------|------------|-------------|-----|
| 1 | `AI/tokens.ts` | 9 rgba | 30 min | High — Unblocks AI domain |
| 2 | `DataTable/tokens.ts` | 8 rgba + 16 hex | 45 min | High — Unblocks DataTable |
| 3 | `TopNavHeader.tsx` | 16 mixed | 1 hr | High — Core navigation |
| 4 | `TopNavWithSidebar.tsx` | 18 mixed | 1 hr | High — Core navigation |
| 5 | `PageHeader/PageHeader.tsx` | 13 rgba | 45 min | Medium — Hero variants |
| 6 | `Charts/tokens.ts` | 4 rgba + 7 hex | 30 min | Low — Domain exception |
| 7 | `InsightEnginePanel.tsx` | 31 fontSize | 2 hr | Medium — Complex domain |

---

### D. DO NOT FIX YET List

| Item | Reason |
|------|--------|
| `Charts/tokens.ts` categorical palette hex | Intentional domain exception — data viz requires distinct colors |
| `IllustratedMessage.tsx` illustration colors | Intentional pattern exception — Tailwind palette for illustration coherence |
| `DataTable/tokens.ts` header gray hex | Intentional legacy tuning — visual parity required; no design approval to change |
| Any `baseTokens` usage in `*/tokens.ts` files | Acceptable — domain token files correctly compose from base |
| `borderRadius: '50%'` patterns | Wait for `radius.circle` token to be added |
| `fontSize: 14` on icons | Wait for `iconSize` scale to be added |

---

## Appendix: Raw Violation Data

### By File (Top 15)

| File | borderRadius | fontSize | rgba | hex | Total |
|------|--------------|----------|------|-----|-------|
| DataTable/DataTable.tsx | 22 | 2 | 0 | 0 | 24 |
| InsightEnginePanel.tsx | 1 | 31 | 0 | 1 | 33 |
| TopNavWithSidebar.tsx | 8 | 7 | 3 | 0 | 18 |
| TopNavHeader.tsx | 7 | 6 | 3 | 0 | 16 |
| DataTable/tokens.ts | 0 | 7 | 8 | 16 | 31 |
| PageHeader.tsx | 1 | 4 | 9 | 0 | 14 |
| AI/tokens.ts | 0 | 0 | 9 | 0 | 9 |
| Charts/tokens.ts | 1 | 8 | 4 | 7 | 20 |
| AI/AILabel.tsx | 0 | 7 | 2 | 0 | 9 |
| Charts/RadialChart.tsx | 1 | 6 | 0 | 2 | 9 |
| navigation/components.tsx | 3 | 1 | 3 | 0 | 7 |
| IllustratedMessage.tsx | 1 | 0 | 0 | 7 | 8 |
| AI/AIVisuals.tsx | 0 | 0 | 4 | 2 | 6 |
| RichTextEditor.tsx | 4 | 5 | 0 | 0 | 9 |
| DiffViewer.tsx | 0 | 4 | 0 | 0 | 4 |

### Hardcoded px Values by Size

| Value | Count | Semantic Intent |
|-------|-------|-----------------|
| 8px | 24 | `baseTokens.borderRadius.md` or spacing |
| 12px | 22 | `baseTokens.borderRadius.lg` or spacing |
| 4px | 15 | `baseTokens.borderRadius.xs` or spacing |
| 6px | 9 | `baseTokens.borderRadius.sm` |
| 16px | 5 | `baseTokens.borderRadius.xl` or spacing |

---

## Conclusion

The Trinity Design System token architecture is **68% compliant** with semantic token governance. The remaining violations are primarily caused by **4 addressable gaps** in the semantic layer, not component negligence.

**Recommended Action:**
1. **Immediate:** Add `semanticTokens.effects` and `semanticTokens.iconSize` (Phase A)
2. **Next Sprint:** Remap domain token files (Phase B)
3. **Following Sprint:** Normalize top 5 violation files (Phase C)

This phased approach minimizes risk while maximizing compliance improvement.

---

*Report generated: January 5, 2026*  
*Next audit scheduled: Post Phase B completion*
