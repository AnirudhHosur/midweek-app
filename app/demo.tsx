import { ScrollView, Text, View } from "react-native";
import "../global.css";

export default function NativewindDemo() {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        <Text className="text-3xl font-bold text-center text-blue-600 mb-2">
          🎨 Nativewind Demo
        </Text>
        <Text className="text-gray-600 text-center">
          Tailwind CSS for React Native is working!
        </Text>
      </View>

      {/* Flexbox Examples */}
      <View className="bg-white rounded-xl p-6 mb-6">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Flexbox Layout</Text>
        <View className="flex-row justify-between mb-4">
          <View className="bg-red-500 w-16 h-16 rounded-lg" />
          <View className="bg-green-500 w-16 h-16 rounded-lg" />
          <View className="bg-blue-500 w-16 h-16 rounded-lg" />
        </View>
        <View className="flex-col items-center">
          <View className="bg-purple-500 w-24 h-8 rounded mb-2" />
          <View className="bg-yellow-500 w-32 h-8 rounded mb-2" />
          <View className="bg-pink-500 w-20 h-8 rounded" />
        </View>
      </View>

      {/* Typography */}
      <View className="bg-white rounded-xl p-6 mb-6">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Typography</Text>
        <Text className="text-xs text-gray-500 mb-1">Extra Small Text</Text>
        <Text className="text-sm text-gray-600 mb-1">Small Text</Text>
        <Text className="text-base text-gray-700 mb-1">Base Text</Text>
        <Text className="text-lg text-gray-800 mb-1">Large Text</Text>
        <Text className="text-xl text-gray-900 mb-1">Extra Large Text</Text>
        <Text className="text-2xl font-bold text-blue-600">Heading Text</Text>
      </View>

      {/* Colors */}
      <View className="bg-white rounded-xl p-6 mb-6">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Colors</Text>
        <View className="flex-row flex-wrap gap-2">
          <View className="bg-red-500 w-12 h-12 rounded" />
          <View className="bg-orange-500 w-12 h-12 rounded" />
          <View className="bg-yellow-500 w-12 h-12 rounded" />
          <View className="bg-green-500 w-12 h-12 rounded" />
          <View className="bg-blue-500 w-12 h-12 rounded" />
          <View className="bg-indigo-500 w-12 h-12 rounded" />
          <View className="bg-purple-500 w-12 h-12 rounded" />
          <View className="bg-pink-500 w-12 h-12 rounded" />
        </View>
      </View>

      {/* Spacing & Borders */}
      <View className="bg-white rounded-xl p-6 mb-6">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Spacing & Borders</Text>
        <View className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 mb-4">
          <Text className="text-blue-800">Border with padding</Text>
        </View>
        <View className="flex-row gap-4">
          <View className="bg-green-100 rounded-sm p-2">
            <Text className="text-green-800">Small radius</Text>
          </View>
          <View className="bg-green-100 rounded-lg p-2">
            <Text className="text-green-800">Large radius</Text>
          </View>
          <View className="bg-green-100 rounded-full p-2">
            <Text className="text-green-800">Full radius</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}