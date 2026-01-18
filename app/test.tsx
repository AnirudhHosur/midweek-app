import { Text, View } from "react-native";
import "../global.css";

export default function TestScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-100 p-4">
      <Text className="text-2xl font-bold text-blue-600 mb-4">
        Nativewind is Working! 🎉
      </Text>
      <Text className="text-lg text-gray-700">
        If you can see this styled text, Nativewind setup is successful!
      </Text>
    </View>
  );
}