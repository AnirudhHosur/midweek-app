// Authentication utility service
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/AppConstants';
import { User } from '../types/app.d';

class AuthService {
  // Store user data in AsyncStorage
  async storeUserData(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      await AsyncStorage.setItem(STORAGE_KEYS.AUTHENTICATED, 'true');
    } catch (error) {
      console.error('Error storing user data:', error);
      throw new Error('Failed to store user data');
    }
  }

  // Get stored user data
  async getUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const authStatus = await AsyncStorage.getItem(STORAGE_KEYS.AUTHENTICATED);
      return authStatus === 'true';
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  }

  // Clear user data from storage
  async clearUserData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTHENTICATED);
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw new Error('Failed to clear user data');
    }
  }

  // Get authentication token (if using tokens)
  async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error retrieving auth token:', error);
      return null;
    }
  }

  // Store authentication token
  async storeAuthToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error storing auth token:', error);
      throw new Error('Failed to store auth token');
    }
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  validatePassword(password: string): { isValid: boolean; message: string } {
    if (password.length < 6) {
      return {
        isValid: false,
        message: 'Password must be at least 6 characters long'
      };
    }

    if (password.length > 128) {
      return {
        isValid: false,
        message: 'Password must be less than 128 characters'
      };
    }

    return {
      isValid: true,
      message: 'Password is valid'
    };
  }

  // Validate name
  validateName(name: string): boolean {
    return name.trim().length >= 2 && name.trim().length <= 50;
  }
}

// Singleton instance
export const authService = new AuthService();

// Helper functions for common auth operations
export const storeUserSession = async(user: User): Promise<void> => {
  await authService.storeUserData(user);
};

export const getCurrentUser = async(): Promise<User | null> => {
  return await authService.getUserData();
};

export const checkAuthentication = async(): Promise<boolean> => {
  return await authService.isAuthenticated();
};

export const clearUserSession = async(): Promise<void> => {
  await authService.clearUserData();
};

export const validateCredentials = (email: string, password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!authService.validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }
  
  const passwordValidation = authService.validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.push(passwordValidation.message);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRegistrationData = (name: string, email: string, password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!authService.validateName(name)) {
    errors.push('Name must be between 2 and 50 characters');
  }
  
  if (!authService.validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }
  
  const passwordValidation = authService.validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.push(passwordValidation.message);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};