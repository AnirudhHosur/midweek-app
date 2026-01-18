import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useAuth } from "../../contexts/AuthContext";
import "../../global.css";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.replace("/(tabs)");
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50">
      <StatusBar style="dark" translucent={false} backgroundColor="#ede9fe" />
      <CustomKeyboardView>
        <View className="flex-1 px-6 pt-6">
          <View className="flex-1 justify-center">
            <View className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              {/* Logo */}
              <View className="items-center mb-8">
                <Image 
                  source={require("../../assets/images/applogo.png")} 
                  style={{ width: wp(24), height: wp(24), borderRadius: wp(3) }}
                  className="mb-4"
                  resizeMode="contain"
                />
                <Text className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Welcome Back
                </Text>
                <Text className="text-gray-600 mt-3 font-medium">
                  Sign in to continue your journey
                </Text>
              </View>

              {/* Email Input */}
              <View className="mb-6">
                <Text className="text-gray-700 font-semibold mb-3 text-lg">Email</Text>
                <View className="flex-row items-center bg-white border-2 border-gray-200 focus:border-indigo-500 rounded-2xl shadow-sm">
                  <MaterialIcons name="email" size={wp(6)} color="#6366f1" style={{ marginLeft: wp(4) }} />
                  <TextInput
                    className="flex-1 p-5 text-gray-800 font-medium"
                    placeholder="Enter your email"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-8">
                <Text className="text-gray-700 font-semibold mb-3 text-lg">Password</Text>
                <View className="flex-row items-center bg-white border-2 border-gray-200 focus:border-indigo-500 rounded-2xl shadow-sm">
                  <MaterialIcons name="lock" size={wp(6)} color="#6366f1" style={{ marginLeft: wp(4) }} />
                  <TextInput
                    className="flex-1 p-5 text-gray-800 font-medium"
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                className={`bg-indigo-600 rounded-2xl py-5 mb-8 shadow-lg ${isLoading ? 'opacity-70' : 'active:scale-95'}`}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-center text-xl">
                  {isLoading ? "Signing In..." : "Sign In"}
                </Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View className="flex-row justify-center items-center">
                <Text className="text-gray-600 font-medium">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                  <Text className="text-indigo-600 font-bold underline">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </CustomKeyboardView>
    </View>
  );
}
