import { Text, View } from "react-native";
import "../global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <View className="bg-white rounded-2xl p-8 shadow-xl w-4/5 max-w-md">
        <Text className="text-3xl font-bold text-center text-indigo-600 mb-4">
          🚀 Mindweek
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-6">
          Welcome to your React Native app with Nativewind!
        </Text>
        <View className="bg-indigo-500 rounded-lg py-3 px-6">
          <Text className="text-white font-semibold text-center">
            Nativewind is Ready! ✅
          </Text>
        </View>
      </View>
    </View>
  );
}