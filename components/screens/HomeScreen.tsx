import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/ui';
import { COLORS, FONTS, SPACING } from '../../constants/AppConstants';
import { Capture } from '../../types/app.d';

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

  // Mock data for recent captures
  const recentCaptures: Capture[] = [
    {
      id: 1,
      status: 'Scheduled',
      time: '2 mins ago',
      title: 'Plan marketing launch for next Tuesday',
      preview: '"I need to coordinate with Sarah about the..."',
      statusColor: COLORS.status.scheduled,
      statusBg: 'rgba(15, 109, 240, 0.1)'
    },
    {
      id: 2,
      status: 'Draft',
      time: '1 hour ago',
      title: 'Grocery list and dentist appointment',
      preview: '"Remember to buy almond milk and call Dr..."',
      statusColor: COLORS.status.draft,
      statusBg: 'rgba(104, 112, 118, 0.1)'
    }
  ];

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  const renderCaptureCard = (capture: Capture) => (
    <Card key={capture.id} style={styles.captureCard}>
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <View style={styles.statusRow}>
            <View 
              style={[
                styles.statusBadge, 
                { backgroundColor: capture.statusBg }
              ]}
            >
              <Text 
                style={[
                  styles.statusText, 
                  { color: capture.statusColor }
                ]}
              >
                {capture.status}
              </Text>
            </View>
            <Text style={styles.timeText}>{capture.time}</Text>
          </View>
          
          <Text style={styles.captureTitle}>{capture.title}</Text>
          <Text style={styles.capturePreview}>{capture.preview}</Text>
        </View>
        
        <View style={styles.imagePlaceholder} />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      
      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <MaterialIcons 
          name="person" 
          size={28} 
          color={COLORS.background.dark}
          onPress={handleProfilePress}
          style={styles.headerIcon}
        />
        
        <Text style={styles.headerTitle}>This Week</Text>
        
        <MaterialIcons 
          name="settings" 
          size={28} 
          color={COLORS.background.dark}
          onPress={handleSettingsPress}
          style={styles.headerIcon}
        />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
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
              <MaterialIcons 
                name="mic" 
                size={48} 
                color="white"
                onPress={() => router.push('/transcribe')}
              />
            </Animated.View>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Captures</Text>
        </View>

        {/* Recent Captures List */}
        <View style={styles.capturesList}>
          {recentCaptures.map(renderCaptureCard)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.light,
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
    justifyContent: 'space-between',
    paddingTop: 50, // Account for status bar
  },
  headerIcon: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold as any,
    color: COLORS.background.dark,
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  heroSection: {
    paddingVertical: SPACING.xxl,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold as any,
    color: COLORS.background.dark,
  },
  capturesList: {
    gap: SPACING.sm,
  },
  captureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardText: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  statusBadge: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold as any,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  timeText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.secondary,
  },
  captureTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold as any,
    color: COLORS.background.dark,
    marginBottom: SPACING.xs,
  },
  capturePreview: {
    fontSize: FONTS.sizes.base,
    color: COLORS.secondary,
    lineHeight: 20,
  },
  imagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});

export default HomeScreen;