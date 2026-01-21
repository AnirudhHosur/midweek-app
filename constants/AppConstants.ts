// Application constants and configuration

export const COLORS = {
  primary: '#0f6df0',
  secondary: '#687076',
  background: {
    light: '#f5f7f8',
    dark: '#0d131c'
  },
  status: {
    scheduled: '#0f6df0',
    draft: '#687076',
    completed: '#10b981'
  },
  priority: {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981'
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const FONTS = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    huge: 32
  },
  weights: {
    normal: '400',
    medium: '500',
    bold: '700',
    extraBold: '800'
  }
};

export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  TASK_DETAILS: '/task-details',
  TRANSCRIBE: '/transcribe',
  WELCOME: '/welcome',
  LOGIN: '(auth)/login',
  SIGNUP: '(auth)/signup',
  TABS: '(tabs)'
} as const;

export const STORAGE_KEYS = {
  USER: 'user',
  AUTHENTICATED: 'isAuthenticated',
  THEME: 'theme'
} as const;

export const ANIMATION = {
  durations: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
};