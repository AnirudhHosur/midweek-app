import { Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import "../global.css";

// This layout wraps the entire app with AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}

// This handles the routing logic based on auth state
function AuthLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-blue-500">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  // If authenticated, show the main app
  if (isAuthenticated) {
    return <Slot />;
  }

  // If not authenticated, let the normal routing handle it
  // The splash screen will redirect to login after 2 seconds
  return <Slot />;
}