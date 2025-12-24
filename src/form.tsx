/**
 * Trinity Form Utilities
 * Helpers for building consistent, accessible forms
 * 
 * @module form
 */

import React, { createContext, useContext, useCallback, useMemo, useState, useId } from 'react';
import { SxProps, Theme } from '@mui/material';

// ============================================================================
// TYPES
// ============================================================================

export type ValidationRule<T = unknown> = {
  /** Validation function - return true if valid, false or error message if invalid */
  validate: (value: T) => boolean | string;
  /** Error message if validate returns false */
  message?: string;
};

export type FieldState = {
  /** Current field value */
  value: unknown;
  /** Whether field has been touched/interacted with */
  touched: boolean;
  /** Whether field is currently being edited */
  dirty: boolean;
  /** Current error message (if any) */
  error: string | null;
  /** Whether field is currently validating (async) */
  validating: boolean;
};

export type FieldConfig<T = unknown> = {
  /** Initial value */
  initialValue?: T;
  /** Validation rules */
  rules?: ValidationRule<T>[];
  /** Whether to validate on change */
  validateOnChange?: boolean;
  /** Whether to validate on blur */
  validateOnBlur?: boolean;
  /** Custom transform function for value */
  transform?: (value: T) => T;
};

export type FormState = {
  /** All field states */
  fields: Record<string, FieldState>;
  /** Whether form is submitting */
  isSubmitting: boolean;
  /** Whether form is valid */
  isValid: boolean;
  /** Whether form has been submitted */
  isSubmitted: boolean;
  /** Whether any field has been touched */
  isTouched: boolean;
  /** Whether any field is dirty */
  isDirty: boolean;
};

export type FormContextValue = {
  /** Form state */
  state: FormState;
  /** Register a field */
  registerField: (name: string, config?: FieldConfig) => void;
  /** Unregister a field */
  unregisterField: (name: string) => void;
  /** Get field state */
  getFieldState: (name: string) => FieldState | undefined;
  /** Set field value */
  setFieldValue: (name: string, value: unknown) => void;
  /** Set field touched */
  setFieldTouched: (name: string, touched?: boolean) => void;
  /** Set field error */
  setFieldError: (name: string, error: string | null) => void;
  /** Validate a field */
  validateField: (name: string) => Promise<boolean>;
  /** Validate all fields */
  validateForm: () => Promise<boolean>;
  /** Reset form to initial values */
  resetForm: () => void;
  /** Submit handler */
  handleSubmit: (onSubmit: (values: Record<string, unknown>) => void | Promise<void>) => (e?: React.FormEvent) => Promise<void>;
  /** Get all form values */
  getValues: () => Record<string, unknown>;
};

// ============================================================================
// CONTEXT
// ============================================================================

const FormContext = createContext<FormContextValue | null>(null);

// ============================================================================
// FORM PROVIDER
// ============================================================================

export interface FormProviderProps {
  /** Form content */
  children: React.ReactNode;
  /** Initial form values */
  initialValues?: Record<string, unknown>;
  /** Called when form is submitted successfully */
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>;
  /** Called when validation fails */
  onValidationError?: (errors: Record<string, string>) => void;
  /** Whether to validate all fields on submit */
  validateOnSubmit?: boolean;
}

/**
 * FormProvider - Provides form context to child components.
 * Manages form state, validation, and submission.
 * 
 * @example
 * ```tsx
 * <FormProvider
 *   initialValues={{ email: '', password: '' }}
 *   onSubmit={(values) => console.log(values)}
 * >
 *   <FormField name="email" label="Email" rules={[required()]} />
 *   <FormField name="password" label="Password" rules={[required()]} />
 *   <button type="submit">Submit</button>
 * </FormProvider>
 * ```
 */
export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  initialValues = {},
  onSubmit,
  onValidationError,
  validateOnSubmit = true,
}) => {
  const [fieldConfigs, setFieldConfigs] = useState<Record<string, FieldConfig>>({});
  const [state, setState] = useState<FormState>({
    fields: {},
    isSubmitting: false,
    isValid: true,
    isSubmitted: false,
    isTouched: false,
    isDirty: false,
  });

  const registerField = useCallback((name: string, config: FieldConfig = {}) => {
    setFieldConfigs((prev) => ({ ...prev, [name]: config }));
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          value: config.initialValue ?? initialValues[name] ?? '',
          touched: false,
          dirty: false,
          error: null,
          validating: false,
        },
      },
    }));
  }, [initialValues]);

  const unregisterField = useCallback((name: string) => {
    setFieldConfigs((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
    setState((prev) => {
      const { [name]: _, ...rest } = prev.fields;
      return { ...prev, fields: rest };
    });
  }, []);

  const getFieldState = useCallback((name: string) => {
    return state.fields[name];
  }, [state.fields]);

  const setFieldValue = useCallback((name: string, value: unknown) => {
    const config = fieldConfigs[name];
    const transformedValue = config?.transform ? config.transform(value) : value;
    
    setState((prev) => {
      const newFields = {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          value: transformedValue,
          dirty: true,
        },
      };
      
      return {
        ...prev,
        fields: newFields,
        isDirty: true,
      };
    });

    // Validate on change if configured
    if (fieldConfigs[name]?.validateOnChange) {
      validateField(name);
    }
  }, [fieldConfigs]);

  const setFieldTouched = useCallback((name: string, touched = true) => {
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          touched,
        },
      },
      isTouched: true,
    }));

    // Validate on blur if configured
    if (touched && fieldConfigs[name]?.validateOnBlur) {
      validateField(name);
    }
  }, [fieldConfigs]);

  const setFieldError = useCallback((name: string, error: string | null) => {
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          error,
        },
      },
    }));
  }, []);

  const validateField = useCallback(async (name: string): Promise<boolean> => {
    const config = fieldConfigs[name];
    const fieldState = state.fields[name];
    
    if (!config?.rules || !fieldState) return true;

    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: { ...prev.fields[name], validating: true },
      },
    }));

    for (const rule of config.rules) {
      const result = rule.validate(fieldState.value);
      
      if (result === false || typeof result === 'string') {
        const errorMessage = typeof result === 'string' ? result : rule.message || 'Invalid';
        
        setState((prev) => ({
          ...prev,
          fields: {
            ...prev.fields,
            [name]: {
              ...prev.fields[name],
              error: errorMessage,
              validating: false,
            },
          },
          isValid: false,
        }));
        
        return false;
      }
    }

    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          error: null,
          validating: false,
        },
      },
    }));

    return true;
  }, [fieldConfigs, state.fields]);

  const validateForm = useCallback(async (): Promise<boolean> => {
    const fieldNames = Object.keys(state.fields);
    const results = await Promise.all(fieldNames.map(validateField));
    const isValid = results.every(Boolean);
    
    setState((prev) => ({ ...prev, isValid }));
    
    if (!isValid && onValidationError) {
      const errors: Record<string, string> = {};
      fieldNames.forEach((name) => {
        const error = state.fields[name]?.error;
        if (error) errors[name] = error;
      });
      onValidationError(errors);
    }
    
    return isValid;
  }, [state.fields, validateField, onValidationError]);

  const resetForm = useCallback(() => {
    setState((prev) => ({
      ...prev,
      fields: Object.fromEntries(
        Object.entries(prev.fields).map(([name, field]) => [
          name,
          {
            ...field,
            value: fieldConfigs[name]?.initialValue ?? initialValues[name] ?? '',
            touched: false,
            dirty: false,
            error: null,
            validating: false,
          },
        ])
      ),
      isSubmitting: false,
      isValid: true,
      isSubmitted: false,
      isTouched: false,
      isDirty: false,
    }));
  }, [fieldConfigs, initialValues]);

  const getValues = useCallback(() => {
    return Object.fromEntries(
      Object.entries(state.fields).map(([name, field]) => [name, field.value])
    );
  }, [state.fields]);

  const handleSubmit = useCallback(
    (submitFn: (values: Record<string, unknown>) => void | Promise<void>) =>
      async (e?: React.FormEvent) => {
        e?.preventDefault();
        
        setState((prev) => ({ ...prev, isSubmitting: true }));

        if (validateOnSubmit) {
          const isValid = await validateForm();
          if (!isValid) {
            setState((prev) => ({ ...prev, isSubmitting: false }));
            return;
          }
        }

        try {
          await submitFn(getValues());
          setState((prev) => ({
            ...prev,
            isSubmitting: false,
            isSubmitted: true,
          }));
        } catch {
          setState((prev) => ({ ...prev, isSubmitting: false }));
        }
      },
    [validateOnSubmit, validateForm, getValues]
  );

  const contextValue = useMemo<FormContextValue>(
    () => ({
      state,
      registerField,
      unregisterField,
      getFieldState,
      setFieldValue,
      setFieldTouched,
      setFieldError,
      validateField,
      validateForm,
      resetForm,
      handleSubmit: handleSubmit as FormContextValue['handleSubmit'],
      getValues,
    }),
    [
      state,
      registerField,
      unregisterField,
      getFieldState,
      setFieldValue,
      setFieldTouched,
      setFieldError,
      validateField,
      validateForm,
      resetForm,
      handleSubmit,
      getValues,
    ]
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit(onSubmit || (() => {}))}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

// ============================================================================
// USE FORM HOOK
// ============================================================================

/**
 * Hook to access form context.
 * Must be used within a FormProvider.
 */
export const useForm = (): FormContextValue => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

// ============================================================================
// USE FORM FIELD HOOK
// ============================================================================

export interface UseFormFieldOptions<T = unknown> {
  /** Field name (required) */
  name: string;
  /** Initial value */
  initialValue?: T;
  /** Validation rules */
  rules?: ValidationRule<T>[];
  /** Whether to validate on change */
  validateOnChange?: boolean;
  /** Whether to validate on blur */
  validateOnBlur?: boolean;
  /** Custom transform function */
  transform?: (value: T) => T;
}

export interface UseFormFieldReturn<T = unknown> {
  /** Field value */
  value: T;
  /** Field error */
  error: string | null;
  /** Whether field has been touched */
  touched: boolean;
  /** Whether field is dirty */
  dirty: boolean;
  /** Whether field is validating */
  validating: boolean;
  /** Whether field has an error and has been touched */
  showError: boolean;
  /** Input props to spread */
  inputProps: {
    name: string;
    value: T;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | T) => void;
    onBlur: () => void;
    'aria-invalid': boolean;
    'aria-describedby': string | undefined;
  };
  /** Error message ID for aria-describedby */
  errorId: string;
  /** Set field value directly */
  setValue: (value: T) => void;
  /** Set touched state */
  setTouched: (touched?: boolean) => void;
  /** Validate field */
  validate: () => Promise<boolean>;
}

/**
 * Hook for connecting a form field to FormProvider.
 * Handles registration, validation, and state management.
 * 
 * @example
 * ```tsx
 * const EmailInput = () => {
 *   const { inputProps, error, showError } = useFormField({
 *     name: 'email',
 *     rules: [required(), email()],
 *   });
 * 
 *   return (
 *     <TextField
 *       {...inputProps}
 *       error={showError}
 *       helperText={showError ? error : undefined}
 *     />
 *   );
 * };
 * ```
 */
export const useFormField = <T = unknown>({
  name,
  initialValue,
  rules,
  validateOnChange = false,
  validateOnBlur = true,
  transform,
}: UseFormFieldOptions<T>): UseFormFieldReturn<T> => {
  const id = useId();
  const errorId = `${name}-error-${id}`;
  
  const {
    registerField,
    unregisterField,
    getFieldState,
    setFieldValue,
    setFieldTouched,
    validateField,
  } = useForm();

  // Register field on mount
  React.useEffect(() => {
    registerField(name, {
      initialValue,
      rules: rules as ValidationRule<unknown>[],
      validateOnChange,
      validateOnBlur,
      transform: transform as ((value: unknown) => unknown) | undefined,
    });
    
    return () => unregisterField(name);
  }, [name, registerField, unregisterField]);

  const fieldState = getFieldState(name);
  
  const value = (fieldState?.value ?? initialValue ?? '') as T;
  const error = fieldState?.error ?? null;
  const touched = fieldState?.touched ?? false;
  const dirty = fieldState?.dirty ?? false;
  const validating = fieldState?.validating ?? false;
  const showError = touched && !!error;

  const handleChange = useCallback((
    eventOrValue: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | T
  ) => {
    const newValue = eventOrValue && typeof eventOrValue === 'object' && 'target' in eventOrValue
      ? (eventOrValue.target as HTMLInputElement).value as T
      : eventOrValue as T;
    setFieldValue(name, newValue);
  }, [name, setFieldValue]);

  const handleBlur = useCallback(() => {
    setFieldTouched(name, true);
  }, [name, setFieldTouched]);

  const setValue = useCallback((newValue: T) => {
    setFieldValue(name, newValue);
  }, [name, setFieldValue]);

  const setTouched = useCallback((isTouched = true) => {
    setFieldTouched(name, isTouched);
  }, [name, setFieldTouched]);

  const validate = useCallback(() => {
    return validateField(name);
  }, [name, validateField]);

  const inputProps = useMemo(() => ({
    name,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': showError,
    'aria-describedby': showError ? errorId : undefined,
  }), [name, value, handleChange, handleBlur, showError, errorId]);

  return {
    value,
    error,
    touched,
    dirty,
    validating,
    showError,
    inputProps,
    errorId,
    setValue,
    setTouched,
    validate,
  };
};

// ============================================================================
// VALIDATION RULES
// ============================================================================

/**
 * Required field validation rule.
 */
export const required = (message = 'This field is required'): ValidationRule => ({
  validate: (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },
  message,
});

/**
 * Email validation rule.
 */
export const email = (message = 'Please enter a valid email'): ValidationRule<string> => ({
  validate: (value) => {
    if (!value) return true; // Use with required() for required emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  message,
});

/**
 * Minimum length validation rule.
 */
export const minLength = (min: number, message?: string): ValidationRule<string> => ({
  validate: (value) => !value || value.length >= min,
  message: message || `Must be at least ${min} characters`,
});

/**
 * Maximum length validation rule.
 */
export const maxLength = (max: number, message?: string): ValidationRule<string> => ({
  validate: (value) => !value || value.length <= max,
  message: message || `Must be no more than ${max} characters`,
});

/**
 * Pattern validation rule.
 */
export const pattern = (regex: RegExp, message = 'Invalid format'): ValidationRule<string> => ({
  validate: (value) => !value || regex.test(value),
  message,
});

/**
 * Minimum number validation rule.
 */
export const min = (minValue: number, message?: string): ValidationRule<number> => ({
  validate: (value) => value === undefined || value === null || value >= minValue,
  message: message || `Must be at least ${minValue}`,
});

/**
 * Maximum number validation rule.
 */
export const max = (maxValue: number, message?: string): ValidationRule<number> => ({
  validate: (value) => value === undefined || value === null || value <= maxValue,
  message: message || `Must be no more than ${maxValue}`,
});

/**
 * Custom validation rule.
 */
export const custom = <T,>(
  validateFn: (value: T) => boolean | string,
  message = 'Invalid value'
): ValidationRule<T> => ({
  validate: validateFn,
  message,
});
