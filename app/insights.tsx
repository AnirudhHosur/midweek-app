import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';

export default function InsightsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-4 py-12 border-b border-gray-200">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mb-4 w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
        >
          <MaterialIcons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Insights</Text>
      </View>

      <View className="flex-1 items-center justify-center p-6">
        <MaterialIcons name="insights" size={64} color="#9CA3AF" />
        <Text className="text-xl font-semibold text-gray-500 mt-4">
          Insights
        </Text>
        <Text className="text-gray-400 mt-2 text-center">
          This screen is under development
        </Text>
      </View>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
}