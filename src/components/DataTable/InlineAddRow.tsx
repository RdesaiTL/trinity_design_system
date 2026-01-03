/**
 * Inline Add Row Component
 * Renders a row for adding new data inline within the table
 */

import React, { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Stack,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { InlineAddConfig, TableDensity } from './types';
import { tableTypography, tableColors, densityTokens } from './tokens';
import { brandColors } from '../../tokens';

interface InlineAddRowProps<R extends GridValidRowModel> {
  columns: GridColDef[];
  config: InlineAddConfig<R>;
  density: TableDensity;
  onAdd: (newRow: Partial<R>) => void;
  onCancel: () => void;
  isActive: boolean;
  onActivate: () => void;
  mode?: 'light' | 'dark';
}

export const InlineAddRow = <R extends GridValidRowModel>({
  columns,
  config,
  density,
  onAdd,
  onCancel,
  isActive,
  onActivate,
  mode = 'light',
}: InlineAddRowProps<R>) => {
  const [values, setValues] = useState<Partial<R>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const tokens = densityTokens[density];
  const colors = tableColors[mode];

  const editableColumns = columns.filter((col) => {
    if (config.excludeFields?.includes(col.field)) return false;
    if (config.editableFields && !config.editableFields.includes(col.field)) return false;
    return col.editable !== false;
  });

  const handleChange = useCallback((field: string, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }, [errors]);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Check required fields
    config.requiredFields?.forEach((field) => {
      const value = values[field as keyof R];
      if (value === undefined || value === null || value === '') {
        newErrors[field] = 'Required';
      }
    });

    // Custom validation
    if (config.validation) {
      const customErrors = config.validation(values);
      Object.assign(newErrors, customErrors);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, config]);

  const handleSubmit = useCallback(() => {
    if (validate()) {
      const newRow = config.defaultValues
        ? { ...config.defaultValues, ...values }
        : values;
      onAdd(newRow);
      setValues({});
      setErrors({});
    }
  }, [validate, config.defaultValues, values, onAdd]);

  const handleCancel = useCallback(() => {
    setValues({});
    setErrors({});
    onCancel();
  }, [onCancel]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleSubmit, handleCancel]);

  // Render placeholder row when not active
  if (!isActive) {
    return (
      <Box
        onClick={onActivate}
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: tokens.cellPaddingY,
          borderBottom: `1px solid ${colors.borderColor}`,
          backgroundColor: colors.hover,
          cursor: 'pointer',
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: colors.selected,
          },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <AddIcon sx={{ fontSize: 18, color: brandColors.primary.light }} />
          <Box
            sx={{
              fontFamily: tableTypography.fontFamily,
              fontSize: tokens.fontSize,
              color: brandColors.primary.light,
              fontWeight: 500,
            }}
          >
            {config.placeholder || 'Add new row...'}
          </Box>
        </Stack>
      </Box>
    );
  }

  // Render input row when active
  return (
    <Box
      onKeyDown={handleKeyDown}
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1,
        borderBottom: `2px solid ${brandColors.primary.light}`,
        backgroundColor: colors.background,
        gap: 1,
      }}
    >
      {editableColumns.map((col) => {
        const fieldConfig = config.fieldConfigs?.[col.field];
        const hasError = Boolean(errors[col.field]);
        const value = values[col.field as keyof R] ?? '';

        // Select input for fields with options
        if (fieldConfig?.type === 'select' && fieldConfig.options) {
          return (
            <FormControl
              key={col.field}
              size="small"
              error={hasError}
              sx={{ minWidth: col.width || 150 }}
            >
              <Select
                value={value}
                onChange={(e) => handleChange(col.field, e.target.value)}
                displayEmpty
                sx={{
                  fontFamily: tableTypography.fontFamily,
                  fontSize: tokens.fontSize,
                  '& .MuiSelect-select': {
                    py: 0.75,
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em>{col.headerName}</em>
                </MenuItem>
                {fieldConfig.options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }

        // Default text input
        return (
          <TextField
            key={col.field}
            size="small"
            placeholder={col.headerName}
            value={value}
            onChange={(e) => handleChange(col.field, e.target.value)}
            error={hasError}
            helperText={errors[col.field]}
            type={fieldConfig?.type === 'number' ? 'number' : 'text'}
            slotProps={{
              input: {
                sx: {
                  fontFamily: tableTypography.fontFamily,
                  fontSize: tokens.fontSize,
                },
                startAdornment: fieldConfig?.prefix ? (
                  <InputAdornment position="start">{fieldConfig.prefix}</InputAdornment>
                ) : undefined,
                endAdornment: fieldConfig?.suffix ? (
                  <InputAdornment position="end">{fieldConfig.suffix}</InputAdornment>
                ) : undefined,
              },
              formHelperText: {
                sx: { mx: 0, fontSize: 10 },
              },
            }}
            sx={{
              flex: col.flex || 1,
              minWidth: col.width || 100,
              maxWidth: col.maxWidth,
              '& .MuiOutlinedInput-root': {
                '& input': {
                  py: 0.75,
                },
              },
            }}
          />
        );
      })}

      {/* Action buttons */}
      <Stack direction="row" spacing={0.5} sx={{ ml: 'auto' }}>
        <Tooltip title="Save (⌘+Enter)">
          <IconButton
            size="small"
            color="primary"
            onClick={handleSubmit}
            sx={{
              backgroundColor: brandColors.primary.light,
              color: 'white',
              '&:hover': {
                backgroundColor: brandColors.primary.main,
              },
            }}
          >
            <CheckIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel (Esc)">
          <IconButton
            size="small"
            onClick={handleCancel}
            sx={{
              '&:hover': {
                backgroundColor: colors.hover,
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default InlineAddRow;
