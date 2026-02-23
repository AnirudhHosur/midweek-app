import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AnimationProvider } from "../contexts/AnimationContext";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import "../global.css";

// This layout wraps the entire app with AuthProvider and AnimationProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <AnimationProvider>
        <AuthLayout />
      </AnimationProvider>
    </AuthProvider>
  );
}

// This handles the routing logic based on auth state
function AuthLayout() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, loading, router]);

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

  // If not authenticated, redirect to login (this should rarely be reached due to useEffect)
  return <Slot />;
}