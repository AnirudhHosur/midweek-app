import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomNavigation } from '../../components/BottomNavigation';
import { FONTS, SPACING } from '../../constants/AppConstants';
import { useTheme } from '../../contexts/ThemeContext';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { isDarkMode, colors } = useTheme();
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
    <View style={[styles.container, { backgroundColor: colors.background.base }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} translucent backgroundColor="transparent" />
      
      {/* Header with Settings Icon */}
      <View style={[styles.header, { borderBottomColor: colors.border.subtle }]}>
        <Text style={[styles.headerPlaceholder]} />
        <TouchableOpacity 
          onPress={() => router.push('/settings')}
          activeOpacity={0.7}
        >
          <MaterialIcons name="settings" size={24} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>
      
      {/* Subtle Background Glow */}
      <View style={[styles.glowOrb, { backgroundColor: colors.brand.soft, opacity: isDarkMode ? 0.3 : 0.15 }]} />
      
      {/* Hero Section - Clean Hierarchy */}
      <View style={styles.heroSection}>
        <Text style={[styles.appTitle, { color: colors.text.primary }]}>
          Mind Week
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.text.secondary }]}>
          Speak freely, we'll organize
        </Text>
        
        {/* Gradient Microphone Button */}
        <View style={styles.micContainer}>
          <Animated.View 
            style={[
              styles.micButtonWrapper,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <LinearGradient
              colors={[colors.brand.primary, '#7c3aed']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.micButton}
            >
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  router.push('/transcribe');
                }}
                style={styles.micTouchable}
              >
                <MaterialIcons 
                  name="mic" 
                  size={48} 
                  color="white"
                />
              </TouchableOpacity>
            </LinearGradient>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
  },
  headerPlaceholder: {
    width: 24,
  },
  glowOrb: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    top: '20%',
    alignSelf: 'center',
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
    textAlign: 'center',
    marginBottom: SPACING.sm,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: SPACING.xl,
    lineHeight: 24,
  },
  micContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonWrapper: {
    marginTop: SPACING.lg,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  micTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;