// Navigation types for Expo Router
// This file provides proper TypeScript support for navigation routes

import "expo-router";

declare module "expo-router" {
  interface __routes {
    StaticRoutes: 
      | "/"
      | "/home" 
      | "/profile" 
      | "/profile-settings"
      | "/settings" 
      | "/task-details" 
      | "/transcribe" 
      | "/weekly-planner"
      | "/welcome"
      | "/insights";
    
    DynamicRoutes: never;
    RouteGroupRoutes: 
      | "(auth)/login" 
      | "(auth)/signup" 
      | "(tabs)";
    RelativeRoutes: never;
      
    AllRoutes: StaticRoutes | RouteGroupRoutes | DynamicRoutes | RelativeRoutes;
  }
}