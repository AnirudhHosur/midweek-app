import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function SplashScreen() {
  const router = useRouter();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start spinning animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Simulate splash screen delay
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 3000);

    // Cleanup function to prevent memory leaks
    return () => {
      clearTimeout(timer);
    };
  }, [router, spinValue]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require("../assets/images/applogo.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          Mindweek
        </Text>
        <Text style={styles.subtitle}>
          Your Mental Wellness Companion
        </Text>
        <View style={styles.spinnerContainer}>
          <Animated.View 
            style={[styles.spinner, {
              transform: [{
                rotate: spinValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })
              }]
            }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366f1', // indigo-500
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  logo: {
    width: wp(32),
    height: wp(32),
    borderRadius: wp(4),
    marginBottom: hp(4),
  },
  title: {
    fontSize: wp(8),
    fontWeight: '800',
    color: 'white',
    marginBottom: hp(1),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp(4.5),
    color: '#e0e7ff', // indigo-100
    textAlign: 'center',
    lineHeight: wp(6),
  },
  spinnerContainer: {
    marginTop: hp(6),
  },
  spinner: {
    width: wp(12),
    height: wp(12),
    borderWidth: wp(1),
    borderColor: 'white',
    borderTopColor: 'transparent',
    borderRadius: wp(6),
  },
});