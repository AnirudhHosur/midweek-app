import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export interface ThemeColors {
  background: {
    base: string;
    elevated: string;
    subtle: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: {
    default: string;
    subtle: string;
  };
  brand: {
    primary: string;
    soft: string;
  };
  state: {
    success: string;
    warning: string;
    error: string;
  };
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => Promise<void>;
  colors: ThemeColors;
}

const lightTheme: ThemeColors = {
  background: {
    base: '#f8fafc',
    elevated: '#ffffff',
    subtle: '#f1f5f9',
  },
  text: {
    primary: '#0f172a',
    secondary: '#334155',
    muted: '#94a3b8',
  },
  border: {
    default: '#e2e8f0',
    subtle: '#f1f5f9',
  },
  brand: {
    primary: '#4f46e5',
    soft: '#eef2ff',
  },
  state: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  }
};

const darkTheme: ThemeColors = {
  background: {
    base: '#020617',
    elevated: '#0f172a',
    subtle: '#111827',
  },
  text: {
    primary: '#f8fafc',
    secondary: '#cbd5f5',
    muted: '#64748b',
  },
  border: {
    default: '#1e293b',
    subtle: '#0f172a',
  },
  brand: {
    primary: '#6366f1',
    soft: '#1e1b4b',
  },
  state: {
    success: '#22c55e',
    warning: '#fbbf24',
    error: '#f87171',
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from storage on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const saved = await AsyncStorage.getItem('darkMode');
        if (saved !== null) {
          setIsDarkMode(JSON.parse(saved));
        } else {
          // Use system preference if nothing saved
          setIsDarkMode(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  const toggleDarkMode = async () => {
    try {
      const newValue = !isDarkMode;
      setIsDarkMode(newValue);
      await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const colors = isDarkMode ? darkTheme : lightTheme;

  if (isLoading) {
    return null; // Or return a loading screen
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
