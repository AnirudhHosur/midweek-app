// Navigation service for consistent routing throughout the app

// Define route types that match Expo Router's expectations
export type ValidRoute = 
  | '/'
  | '/home'
  | '/profile'
  | '/settings'
  | '/task-details'
  | '/transcribe'
  | '/welcome'
  | '/(auth)/login'
  | '/(auth)/signup'
  | '/(tabs)';

// Navigation utilities - use through React components with useRouter hook
// Example usage in components:
// import { useRouter } from 'expo-router';
// const router = useRouter();
// router.push('/task-details');