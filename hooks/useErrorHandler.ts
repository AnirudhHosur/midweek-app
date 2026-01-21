// Custom hook for consistent error handling throughout the app
import { useCallback, useState } from 'react';

export interface UseErrorHandlerReturn {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  handleError: (error: unknown, defaultMessage?: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error: unknown, defaultMessage = 'An unexpected error occurred') => {
    console.error('Application error:', error);
    
    if (error instanceof Error) {
      setError(error.message);
    } else if (typeof error === 'string') {
      setError(error);
    } else {
      setError(defaultMessage);
    }
  }, []);

  return {
    error,
    setError,
    clearError,
    handleError,
    isLoading,
    setIsLoading
  };
};

// Specific error handler for authentication errors
export const useAuthErrorHandler = () => {
  const { error, setError, clearError, handleError, isLoading, setIsLoading } = useErrorHandler();

  const handleAuthError = useCallback((error: unknown) => {
    let errorMessage = 'Authentication failed';
    
    if (error instanceof Error) {
      // Handle Firebase auth errors
      switch (error.message) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Email already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password too weak';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
        default:
          errorMessage = error.message;
      }
    }
    
    setError(errorMessage);
  }, [setError]);

  return {
    error,
    clearError,
    handleAuthError,
    isLoading,
    setIsLoading
  };
};

// Validation hook for form inputs
export const useValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((
    fieldName: string, 
    value: string, 
    validators: ((val: string) => string | null)[]
  ) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        setErrors(prev => ({ ...prev, [fieldName]: error }));
        return false;
      }
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
    return true;
  }, []);

  const validateForm = useCallback((
    formData: Record<string, string>,
    fieldValidators: Record<string, ((val: string) => string | null)[]>
  ) => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
      const value = formData[fieldName] || '';
      for (const validator of validators) {
        const error = validator(value);
        if (error) {
          newErrors[fieldName] = error;
          break;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearFieldError,
    clearAllErrors,
    hasErrors: Object.keys(errors).length > 0
  };
};

// Common validators
export const validators = {
  required: (message = 'This field is required'): ((value: string) => string | null) => {
    return (value: string) => {
      return !value.trim() ? message : null;
    };
  },

  email: (message = 'Please enter a valid email'): ((value: string) => string | null) => {
    return (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value) ? message : null;
    };
  },

  minLength: (min: number, message?: string): ((value: string) => string | null) => {
    const defaultMessage = `Must be at least ${min} characters`;
    return (value: string) => {
      return value.length < min ? (message || defaultMessage) : null;
    };
  },

  maxLength: (max: number, message?: string): ((value: string) => string | null) => {
    const defaultMessage = `Must be no more than ${max} characters`;
    return (value: string) => {
      return value.length > max ? (message || defaultMessage) : null;
    };
  },

  password: (message = 'Password must be at least 6 characters'): ((value: string) => string | null) => {
    return (value: string) => {
      return value.length < 6 ? message : null;
    };
  }
};