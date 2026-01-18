import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import "../../global.css";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex-1 bg-gradient-to-br from-slate-50 to-gray-100">
      <StatusBar style="dark" translucent={false} backgroundColor="#f1f5f9" />
      <View className="bg-white/80 backdrop-blur-sm p-6 pt-12 shadow-sm border-b border-gray-100">
        <Text className="text-3xl font-extrabold text-gray-800">
          Welcome, <Text className="text-indigo-600">{user?.name}</Text>!
        </Text>
        <Text className="text-gray-600 mt-2 font-medium">
          You're signed in to Mindweek
        </Text>
      </View>
      
      <View className="flex-1 items-center justify-center px-6 pb-6">
        <View className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md shadow-xl border border-white/20 mt-8">
          <Text className="text-2xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            🧠 Mindweek Dashboard
          </Text>
          <Text className="text-gray-700 text-center mb-8 leading-relaxed">
            Your mental wellness journey starts here. Track your mood, set goals, and connect with resources.
          </Text>
          
          <TouchableOpacity
            className="bg-red-500 rounded-2xl py-4 px-8 self-center active:scale-95 shadow-lg"
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}