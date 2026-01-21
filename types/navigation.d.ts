// Navigation types for Expo Router
// This file provides proper TypeScript support for navigation routes

import "expo-router";

declare module "expo-router" {
  interface __routes {
    StaticRoutes: 
      | "/"
      | "/home" 
      | "/profile" 
      | "/settings" 
      | "/task-details" 
      | "/transcribe" 
      | "/welcome";
    
    RouteGroupRoutes: 
      | "(auth)/login" 
      | "(auth)/signup" 
      | "(tabs)";
      
    AllRoutes: StaticRoutes | RouteGroupRoutes;
  }
}