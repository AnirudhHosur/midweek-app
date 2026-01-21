import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
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
  const recentCaptures = [
    {
      id: 1,
      status: 'Scheduled',
      time: '2 mins ago',
      title: 'Plan marketing launch for next Tuesday',
      preview: '"I need to coordinate with Sarah about the..."',
      statusColor: '#0f6df0',
      statusBg: 'rgba(15, 109, 240, 0.1)'
    },
    {
      id: 2,
      status: 'Draft',
      time: '1 hour ago',
      title: 'Grocery list and dentist appointment',
      preview: '"Remember to buy almond milk and call Dr..."',
      statusColor: '#687076',
      statusBg: 'rgba(104, 112, 118, 0.1)'
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => router.push('/profile')}
        >
          <MaterialIcons name="person" size={28} color="#11181C" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>This Week</Text>
        
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => router.push('/settings')}
        >
          <MaterialIcons name="settings" size={28} color="#11181C" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.appTitle}>Mind Week</Text>
          <Text style={styles.heroText}>
            Press and speak everything on your mind...
          </Text>
          
          {/* Floating Microphone Action */}
          <View style={styles.micContainer}>
            <Animated.View 
              style={[styles.micButton, {
                transform: [{ scale: pulseAnim }]
              }]}
            >
              <TouchableOpacity 
                style={styles.micInnerButton}
                activeOpacity={0.8}
                onPress={() => router.push('/transcribe')}
              >
                <MaterialIcons name="mic" size={48} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Captures</Text>
        </View>

        {/* Recent Captures List */}
        <View style={styles.capturesList}>
          {recentCaptures.map((capture) => (
            <View key={capture.id} style={styles.captureCard}>
              <View style={styles.cardContent}>
                <View style={styles.cardText}>
                  <View style={styles.statusRow}>
                    <View style={[styles.statusBadge, { backgroundColor: capture.statusBg }]}>
                      <Text style={[styles.statusText, { color: capture.statusColor }]}>
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
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7f8',
    padding: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    paddingTop: 50, // Account for status bar
  },
  profileButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
    flex: 1,
    textAlign: 'center',
  },
  calendarButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heroSection: {
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f6df0',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#11181C',
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 32,
    lineHeight: 36,
  },
  micContainer: {
    position: 'relative',
  },
  micButton: {
    position: 'relative',
    width: 96,
    height: 96,
  },
  micInnerButton: {
    width: 96,
    height: 96,
    backgroundColor: '#2dd4bf',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2dd4bf',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionHeader: {
    marginTop: 32,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
  },
  capturesList: {
    flexDirection: 'column',
    gap: 12,
    paddingBottom: 96,
  },
  captureCard: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 16,
  },
  cardText: {
    flex: 2,
    flexDirection: 'column',
    gap: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: 12,
    color: '#687076',
    fontWeight: 'normal',
  },
  captureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11181C',
    marginTop: 4,
  },
  capturePreview: {
    fontSize: 14,
    color: '#687076',
    fontStyle: 'italic',
  },
  imagePlaceholder: {
    width: 96,
    aspectRatio: 1,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
});