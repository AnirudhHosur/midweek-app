// Application-wide TypeScript interfaces and types

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  priorityColor: string;
  dueDate?: string;
  details?: string;
  icon: string;
  status?: 'Scheduled' | 'Draft' | 'Completed';
  statusColor?: string;
  statusBg?: string;
  preview?: string;
  time?: string;
}

export interface Capture {
  id: number;
  status: 'Scheduled' | 'Draft' | 'Completed';
  time: string;
  title: string;
  preview: string;
  statusColor: string;
  statusBg: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

// UI Component Props
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  style?: object;
  onPress?: () => void;
}

// Navigation types
export type AppRoutes = 
  | '/'
  | '/home'
  | '/profile' 
  | '/settings'
  | '/task-details'
  | '/transcribe'
  | '/welcome'
  | '(auth)/login'
  | '(auth)/signup'
  | '(tabs)';