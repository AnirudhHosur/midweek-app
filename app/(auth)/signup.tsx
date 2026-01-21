import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useAuth } from "../../contexts/AuthContext";
import "../../global.css";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSignup = async() => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const success = await register(name, email, password);
      if (success) {
        Alert.alert("Success", "Account created successfully! Welcome to Mindweek!", [
          {
            text: "Start Journey",
            onPress: () => router.replace("/(tabs)")
          }
        ]);
      }
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
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
                <Text className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                  Create Account
                </Text>
                <Text className="text-gray-600 mt-3 font-medium">
                  Join us on your wellness journey
                </Text>
              </View>

              {/* Name Input */}
              <View className="mb-5">
                <Text className="text-gray-700 font-semibold mb-3 text-lg">Full Name</Text>
                <View className="flex-row items-center bg-white border-2 border-gray-200 focus:border-pink-500 rounded-2xl shadow-sm">
                  <MaterialIcons name="person" size={wp(6)} color="#ec4899" style={{ marginLeft: wp(4) }} />
                  <TextInput
                    className="flex-1 p-5 text-gray-800 font-medium"
                    placeholder="Enter your full name"
                    placeholderTextColor="#9ca3af"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View className="mb-5">
                <Text className="text-gray-700 font-semibold mb-3 text-lg">Email</Text>
                <View className="flex-row items-center bg-white border-2 border-gray-200 focus:border-pink-500 rounded-2xl shadow-sm">
                  <MaterialIcons name="email" size={wp(6)} color="#ec4899" style={{ marginLeft: wp(4) }} />
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
              <View className="mb-5">
                <Text className="text-gray-700 font-semibold mb-3 text-lg">Password</Text>
                <View className="flex-row items-center bg-white border-2 border-gray-200 focus:border-pink-500 rounded-2xl shadow-sm">
                  <MaterialIcons name="lock" size={wp(6)} color="#ec4899" style={{ marginLeft: wp(4) }} />
                  <TextInput
                    className="flex-1 p-5 text-gray-800 font-medium"
                    placeholder="Create a password"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Confirm Password Input */}
              <View className="mb-8">
                <Text className="text-gray-700 font-semibold mb-3 text-lg">Confirm Password</Text>
                <View className="flex-row items-center bg-white border-2 border-gray-200 focus:border-pink-500 rounded-2xl shadow-sm">
                  <MaterialIcons name="lock-outline" size={wp(6)} color="#ec4899" style={{ marginLeft: wp(4) }} />
                  <TextInput
                    className="flex-1 p-5 text-gray-800 font-medium"
                    placeholder="Confirm your password"
                    placeholderTextColor="#9ca3af"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Signup Button */}
              <TouchableOpacity
                className={`bg-pink-600 rounded-2xl py-5 mb-8 shadow-lg ${isLoading ? 'opacity-70' : 'active:scale-95'}`}
                onPress={handleSignup}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-center text-xl">
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View className="flex-row justify-center items-center">
                <Text className="text-gray-600 font-medium">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                  <Text className="text-pink-600 font-bold underline">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </CustomKeyboardView>
    </View>
  );
}