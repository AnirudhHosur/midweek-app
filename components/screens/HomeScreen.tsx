import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomNavigation } from '../../components/BottomNavigation';
import { COLORS, FONTS, SPACING } from '../../constants/AppConstants';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start pulse animation for voice button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      
      {/* Hero Section - Centered and Clean */}
      <View style={styles.heroSection}>
        <Text style={styles.appTitle}>Mind Week</Text>
        <Text style={styles.heroText}>
          Press and speak everything on your mind...
        </Text>
        
        {/* Floating Microphone Action */}
        <View style={styles.micContainer}>
          <Animated.View 
            style={[
              styles.micButton, 
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <TouchableOpacity
              onPress={() => router.push('/transcribe')}
              style={styles.micTouchable}
            >
              <MaterialIcons 
                name="mic" 
                size={48} 
                color="white"
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  heroSection: {
    flex: 1,
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.extraBold as any,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
    letterSpacing: -0.5,
  },
  heroText: {
    fontSize: FONTS.sizes.huge,
    fontWeight: FONTS.weights.bold as any,
    color: COLORS.background.dark,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: SPACING.xl,
    lineHeight: 36,
  },
  micContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  micTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;