/**
 * Form Utilities Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { renderHook, render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import {
  FormProvider,
  useForm,
  useFormField,
  required,
  email,
  minLength,
  maxLength,
  pattern,
  min,
  max,
  custom,
} from '../form';

// ============================================================================
// Validation Rules Tests
// ============================================================================

describe('Validation Rules', () => {
  describe('required', () => {
    const rule = required();

    it('should fail for empty string', () => {
      expect(rule.validate('')).toBe(false);
    });

    it('should fail for whitespace only', () => {
      expect(rule.validate('   ')).toBe(false);
    });

    it('should fail for null', () => {
      expect(rule.validate(null)).toBe(false);
    });

    it('should fail for undefined', () => {
      expect(rule.validate(undefined)).toBe(false);
    });

    it('should pass for non-empty string', () => {
      expect(rule.validate('hello')).toBe(true);
    });

    it('should fail for empty array', () => {
      expect(rule.validate([])).toBe(false);
    });

    it('should pass for non-empty array', () => {
      expect(rule.validate([1, 2, 3])).toBe(true);
    });

    it('should use custom message', () => {
      const customRule = required('Field is required');
      expect(customRule.message).toBe('Field is required');
    });
  });

  describe('email', () => {
    const rule = email();

    it('should pass for valid email', () => {
      expect(rule.validate('test@example.com')).toBe(true);
    });

    it('should pass for empty string (use with required)', () => {
      expect(rule.validate('')).toBe(true);
    });

    it('should fail for invalid email', () => {
      expect(rule.validate('invalid')).toBe(false);
      expect(rule.validate('invalid@')).toBe(false);
      expect(rule.validate('@example.com')).toBe(false);
    });

    it('should use custom message', () => {
      const customRule = email('Invalid email format');
      expect(customRule.message).toBe('Invalid email format');
    });
  });

  describe('minLength', () => {
    const rule = minLength(5);

    it('should pass for string at minimum length', () => {
      expect(rule.validate('hello')).toBe(true);
    });

    it('should pass for string above minimum length', () => {
      expect(rule.validate('hello world')).toBe(true);
    });

    it('should fail for string below minimum length', () => {
      expect(rule.validate('hi')).toBe(false);
    });

    it('should pass for empty string (use with required)', () => {
      expect(rule.validate('')).toBe(true);
    });

    it('should generate correct message', () => {
      expect(rule.message).toBe('Must be at least 5 characters');
    });
  });

  describe('maxLength', () => {
    const rule = maxLength(10);

    it('should pass for string at maximum length', () => {
      expect(rule.validate('0123456789')).toBe(true);
    });

    it('should pass for string below maximum length', () => {
      expect(rule.validate('hello')).toBe(true);
    });

    it('should fail for string above maximum length', () => {
      expect(rule.validate('hello world!')).toBe(false);
    });

    it('should generate correct message', () => {
      expect(rule.message).toBe('Must be no more than 10 characters');
    });
  });

  describe('pattern', () => {
    const rule = pattern(/^\d{3}-\d{4}$/, 'Invalid phone format');

    it('should pass for matching pattern', () => {
      expect(rule.validate('123-4567')).toBe(true);
    });

    it('should fail for non-matching pattern', () => {
      expect(rule.validate('1234567')).toBe(false);
    });

    it('should pass for empty string', () => {
      expect(rule.validate('')).toBe(true);
    });
  });

  describe('min', () => {
    const rule = min(10);

    it('should pass for value at minimum', () => {
      expect(rule.validate(10)).toBe(true);
    });

    it('should pass for value above minimum', () => {
      expect(rule.validate(15)).toBe(true);
    });

    it('should fail for value below minimum', () => {
      expect(rule.validate(5)).toBe(false);
    });

    it('should pass for undefined', () => {
      expect(rule.validate(undefined as unknown as number)).toBe(true);
    });
  });

  describe('max', () => {
    const rule = max(100);

    it('should pass for value at maximum', () => {
      expect(rule.validate(100)).toBe(true);
    });

    it('should pass for value below maximum', () => {
      expect(rule.validate(50)).toBe(true);
    });

    it('should fail for value above maximum', () => {
      expect(rule.validate(150)).toBe(false);
    });
  });

  describe('custom', () => {
    it('should use custom validation function', () => {
      const rule = custom<string>((value) => value.startsWith('test'), 'Must start with test');
      
      expect(rule.validate('test123')).toBe(true);
      expect(rule.validate('hello')).toBe(false);
    });

    it('should accept string return value', () => {
      const rule = custom<number>((value) => {
        if (value % 2 !== 0) return 'Must be even';
        return true;
      });
      
      expect(rule.validate(4)).toBe(true);
      expect(rule.validate(3)).toBe('Must be even');
    });
  });
});

// ============================================================================
// FormProvider Tests
// ============================================================================

describe('FormProvider', () => {
  it('should render children', () => {
    render(
      <FormProvider>
        <div data-testid="child">Child content</div>
      </FormProvider>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should render a form element', () => {
    render(
      <FormProvider>
        <button type="submit">Submit</button>
      </FormProvider>
    );
    
    const form = screen.getByRole('button').closest('form');
    expect(form).toBeInTheDocument();
  });
});

// ============================================================================
// useForm Tests
// ============================================================================

describe('useForm', () => {
  it('should throw error when used outside FormProvider', () => {
    expect(() => {
      renderHook(() => useForm());
    }).toThrow('useForm must be used within a FormProvider');
  });

  it('should return form context when inside FormProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FormProvider>{children}</FormProvider>
    );

    const { result } = renderHook(() => useForm(), { wrapper });

    expect(result.current).toHaveProperty('state');
    expect(result.current).toHaveProperty('registerField');
    expect(result.current).toHaveProperty('setFieldValue');
    expect(result.current).toHaveProperty('validateForm');
    expect(result.current).toHaveProperty('resetForm');
    expect(result.current).toHaveProperty('getValues');
  });

  it('should have correct initial state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FormProvider>{children}</FormProvider>
    );

    const { result } = renderHook(() => useForm(), { wrapper });

    expect(result.current.state.isSubmitting).toBe(false);
    expect(result.current.state.isValid).toBe(true);
    expect(result.current.state.isSubmitted).toBe(false);
    expect(result.current.state.isTouched).toBe(false);
    expect(result.current.state.isDirty).toBe(false);
  });
});

// ============================================================================
// useFormField Tests
// ============================================================================

describe('useFormField', () => {
  const TestField: React.FC<{
    name: string;
    rules?: ReturnType<typeof required>[];
    onRender?: (field: ReturnType<typeof useFormField>) => void;
  }> = ({ name, rules, onRender }) => {
    const field = useFormField({ name, rules });
    
    React.useEffect(() => {
      onRender?.(field);
    }, [field, onRender]);

    return (
      <div>
        <input
          data-testid={`input-${name}`}
          {...field.inputProps}
          value={field.value as string}
        />
        {field.showError && (
          <span data-testid={`error-${name}`} id={field.errorId}>
            {field.error}
          </span>
        )}
      </div>
    );
  };

  it('should register field with form', () => {
    render(
      <FormProvider>
        <TestField name="username" />
      </FormProvider>
    );

    const input = screen.getByTestId('input-username');
    expect(input).toBeInTheDocument();
  });

  it('should update value on change', () => {
    render(
      <FormProvider>
        <TestField name="username" />
      </FormProvider>
    );

    const input = screen.getByTestId('input-username');
    fireEvent.change(input, { target: { value: 'testuser' } });
    
    expect(input).toHaveValue('testuser');
  });

  it('should show error after touch with validation', async () => {
    render(
      <FormProvider>
        <TestField name="username" rules={[required()]} />
      </FormProvider>
    );

    const input = screen.getByTestId('input-username');
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByTestId('error-username')).toBeInTheDocument();
    });
  });

  it('should clear error when valid value entered', async () => {
    render(
      <FormProvider>
        <TestField name="username" rules={[required()]} />
      </FormProvider>
    );

    const input = screen.getByTestId('input-username');
    
    // Trigger validation
    fireEvent.blur(input);
    await waitFor(() => {
      expect(screen.getByTestId('error-username')).toBeInTheDocument();
    });

    // Enter valid value
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.queryByTestId('error-username')).not.toBeInTheDocument();
    });
  });

  it('should have correct aria attributes', () => {
    render(
      <FormProvider>
        <TestField name="email" rules={[required()]} />
      </FormProvider>
    );

    const input = screen.getByTestId('input-email');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('should set aria-invalid to true when error shown', async () => {
    render(
      <FormProvider>
        <TestField name="email" rules={[required()]} />
      </FormProvider>
    );

    const input = screen.getByTestId('input-email');
    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });
});

// ============================================================================
// Form Submission Tests
// ============================================================================

describe('Form Submission', () => {
  it('should call onSubmit with form values', async () => {
    const onSubmit = vi.fn();
    
    const TestForm = () => {
      const field = useFormField({ name: 'username' });
      return (
        <>
          <input {...field.inputProps} value={field.inputProps.value as string} data-testid="input" />
          <button type="submit">Submit</button>
        </>
      );
    };

    render(
      <FormProvider onSubmit={onSubmit} initialValues={{ username: 'testuser' }}>
        <TestForm />
      </FormProvider>
    );

    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ username: 'testuser' });
    });
  });

  it('should not submit when validation fails', async () => {
    const onSubmit = vi.fn();
    const onValidationError = vi.fn();

    const TestForm = () => {
      const field = useFormField({ name: 'email', rules: [required(), email()] });
      return (
        <>
          <input {...field.inputProps} data-testid="input" />
          <button type="submit">Submit</button>
        </>
      );
    };

    render(
      <FormProvider onSubmit={onSubmit} onValidationError={onValidationError}>
        <TestForm />
      </FormProvider>
    );

    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
