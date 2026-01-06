import * as React from 'react';
import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Paper,
  Popper,
  Divider,
  Button,
  alpha,
  useTheme,
  AutocompleteRenderInputParams,
  AutocompleteRenderGetTagProps,
} from '@mui/material';
import {
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

// ============================================
// Types
// ============================================

export interface ComboboxOption {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional secondary text */
  secondary?: string;
  /** Optional group */
  group?: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Custom data */
  data?: Record<string, unknown>;
}

export interface ComboboxProps {
  /** Available options */
  options: ComboboxOption[];
  /** Selected values (for controlled mode) */
  value?: ComboboxOption[];
  /** Default selected values (for uncontrolled mode) */
  defaultValue?: ComboboxOption[];
  /** Callback when selection changes */
  onChange?: (selected: ComboboxOption[]) => void;
  /** Allow creating new options */
  creatable?: boolean;
  /** Callback when new option is created */
  onCreate?: (inputValue: string) => ComboboxOption | Promise<ComboboxOption>;
  /** Create new option text template */
  createText?: string;
  /** Enable multi-select */
  multiple?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Size variant */
  size?: 'small' | 'medium';
  /** Limit number of visible tags */
  limitTags?: number;
  /** Show checkbox for multi-select */
  showCheckbox?: boolean;
  /** Group options by group property */
  groupBy?: boolean;
  /** Loading state */
  loading?: boolean;
  /** No options text */
  noOptionsText?: string;
  /** Custom filter function */
  filterOptions?: (options: ComboboxOption[], state: { inputValue: string }) => ComboboxOption[];
  /** Custom render option */
  renderOption?: (option: ComboboxOption, props: { selected: boolean }) => React.ReactNode;
  /** Custom render tag */
  renderTag?: (option: ComboboxOption, onDelete: (event: React.SyntheticEvent) => void) => React.ReactNode;
  /** Free solo mode (allow any input) */
  freeSolo?: boolean;
  /** Auto highlight first option */
  autoHighlight?: boolean;
  /** Clear on escape */
  clearOnEscape?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  sx?: Record<string, unknown>;
}

// ============================================
// Helper to generate ID for new options
// ============================================

const generateId = () => `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ============================================
// Custom Popper for better styling
// ============================================

const StyledPopper = (props: React.ComponentProps<typeof Popper>) => {
  return (
    <Popper
      {...props}
      placement="bottom-start"
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ]}
    />
  );
};

// ============================================
// Combobox Component
// ============================================

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  creatable = false,
  onCreate,
  createText = 'Create "{value}"',
  multiple = false,
  placeholder = 'Select...',
  label,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  fullWidth = false,
  size = 'medium',
  limitTags = 3,
  showCheckbox = true,
  groupBy = false,
  loading = false,
  noOptionsText = 'No options',
  filterOptions: customFilterOptions,
  renderOption: customRenderOption,
  renderTag: customRenderTag,
  freeSolo = false,
  autoHighlight = true,
  clearOnEscape = true,
  className,
  sx,
}) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = React.useState('');
  const [internalValue, setInternalValue] = React.useState<ComboboxOption[]>(
    defaultValue || []
  );

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Filter options based on input
  const filterOptions = React.useCallback(
    (opts: ComboboxOption[], state: { inputValue: string }) => {
      if (customFilterOptions) {
        return customFilterOptions(opts, state);
      }

      const query = state.inputValue.toLowerCase();
      return opts.filter(
        (opt) =>
          opt.label.toLowerCase().includes(query) ||
          opt.secondary?.toLowerCase().includes(query)
      );
    },
    [customFilterOptions]
  );

  // Check if current input can create a new option
  const canCreate = React.useMemo(() => {
    if (!creatable || !inputValue.trim()) return false;
    const exists = options.some(
      (opt) => opt.label.toLowerCase() === inputValue.toLowerCase()
    );
    return !exists;
  }, [creatable, inputValue, options]);

  // Handle value change
  const handleChange = async (
    _event: React.SyntheticEvent,
    newValue: (ComboboxOption | string)[] | ComboboxOption | string | null
  ) => {
    let processedValue: ComboboxOption[];

    if (multiple) {
      const valueArray = (newValue as (ComboboxOption | string)[]) || [];
      processedValue = await Promise.all(
        valueArray.map(async (item) => {
          if (typeof item === 'string') {
            // Handle free solo or create
            if (creatable && onCreate) {
              return await onCreate(item);
            }
            return { id: generateId(), label: item };
          }
          return item;
        })
      );
    } else {
      if (newValue === null) {
        processedValue = [];
      } else if (typeof newValue === 'string') {
        if (creatable && onCreate) {
          const created = await onCreate(newValue);
          processedValue = [created];
        } else {
          processedValue = [{ id: generateId(), label: newValue }];
        }
      } else {
        processedValue = [newValue as ComboboxOption];
      }
    }

    setInternalValue(processedValue);
    onChange?.(processedValue);
  };

  // Handle create option
  const handleCreate = async () => {
    if (!canCreate || !onCreate) return;

    const newOption = await onCreate(inputValue);
    const newValue = multiple ? [...value, newOption] : [newOption];
    setInternalValue(newValue);
    onChange?.(newValue);
    setInputValue('');
  };

  // Render input
  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      label={label}
      placeholder={value.length === 0 ? placeholder : undefined}
      error={error}
      helperText={error ? errorMessage : helperText}
      size={size}
      InputProps={{
        ...params.InputProps,
        sx: {
          '& .MuiAutocomplete-input': {
            minWidth: '60px !important',
          },
        },
      }}
    />
  );

  // Render tags
  const renderTags = (
    tagValue: ComboboxOption[],
    getTagProps: AutocompleteRenderGetTagProps
  ) => {
    return tagValue.map((option, index) => {
      const tagProps = getTagProps({ index });
      if (customRenderTag) {
        return customRenderTag(option, tagProps.onDelete);
      }
      return (
        <Chip
          {...tagProps}
          key={option.id}
          label={option.label}
          size={size}
          deleteIcon={<CloseIcon fontSize="small" />}
          sx={{
            maxWidth: 150,
            '& .MuiChip-label': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
        />
      );
    });
  };

  // Custom Paper component to include create option
   
  const CustomPaper = React.useCallback(
    (props: React.HTMLAttributes<HTMLElement>) => {
      return (
        <Paper {...props} elevation={8}>
          {props.children}
          {canCreate && (
            <>
              <Divider />
              <Button
                fullWidth
                startIcon={<AddIcon />}
                onClick={handleCreate}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  px: 2,
                  textTransform: 'none',
                  color: 'primary.main',
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {createText.replace('{value}', inputValue)}
              </Button>
            </>
          )}
        </Paper>
      );
    },
    [canCreate, createText, inputValue, theme.palette.primary.main]
  );

  // Build options with proper typing
  const autocompleteOptions = options;

  return (
    <Autocomplete<ComboboxOption, boolean, boolean, boolean>
      className={className}
      sx={{
        width: fullWidth ? '100%' : 300,
        ...sx,
      }}
      multiple={multiple}
      options={autocompleteOptions}
      value={multiple ? value : value[0] || null}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.label
      }
      isOptionEqualToValue={(option, val) => option.id === val.id}
      getOptionDisabled={(option) =>
        typeof option === 'object' && option.disabled === true
      }
      groupBy={groupBy ? (option) => option.group || '' : undefined}
      filterOptions={filterOptions}
      renderInput={renderInput}
      renderTags={multiple ? renderTags : undefined}
      renderOption={(props, option, { selected }) => {
        const { key, ...otherProps } = props;
        if (customRenderOption) {
          return (
            <li key={key} {...otherProps}>
              {customRenderOption(option, { selected })}
            </li>
          );
        }

        return (
          <ListItem key={key} {...otherProps} dense>
            {multiple && showCheckbox && (
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Checkbox
                  icon={<Box sx={{ width: 18, height: 18 }} />}
                  checkedIcon={
                    <CheckIcon
                      sx={{
                        width: 18,
                        height: 18,
                        color: 'primary.main',
                      }}
                    />
                  }
                  checked={selected}
                  size="small"
                />
              </ListItemIcon>
            )}
            {option.icon && (
              <ListItemIcon sx={{ minWidth: 36 }}>{option.icon}</ListItemIcon>
            )}
            <ListItemText
              primary={option.label}
              secondary={option.secondary}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
            {!multiple && selected && (
              <CheckIcon sx={{ ml: 1, color: 'primary.main' }} fontSize="small" />
            )}
          </ListItem>
        );
      }}
      PaperComponent={creatable ? CustomPaper : Paper}
      PopperComponent={StyledPopper}
      limitTags={limitTags}
      disabled={disabled}
      loading={loading}
      noOptionsText={
        canCreate ? (
          <Typography variant="body2" color="text.secondary">
            Press Enter or click below to create
          </Typography>
        ) : (
          noOptionsText
        )
      }
      freeSolo={freeSolo || creatable}
      autoHighlight={autoHighlight}
      clearOnEscape={clearOnEscape}
      disableCloseOnSelect={multiple}
      ChipProps={{
        size: size,
        deleteIcon: <CloseIcon fontSize="small" />,
      }}
    />
  );
};

export default Combobox;
