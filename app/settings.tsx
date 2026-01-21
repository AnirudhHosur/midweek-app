import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const [workingHours, setWorkingHours] = useState({
    startsAt: '09:00 AM',
    endsAt: '06:00 PM'
  });
  const [processingSpeed, setProcessingSpeed] = useState(70); // 0-100
  const [accuracyPriority, setAccuracyPriority] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
      {/* Top Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)')}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="#0d131c" />
        </TouchableOpacity>
        
        <Text style={styles.navTitle}>Settings & Preferences</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Configure how MindWeek AI organizes your tasks into your schedule.
          </Text>
        </View>

        {/* Working Hours Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WORKING HOURS</Text>
          
          <View style={styles.settingsCard}>
            {/* Starts At */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Starts at</Text>
              <View style={styles.settingValueContainer}>
                <Text style={styles.settingValue}>{workingHours.startsAt}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#0f6df0" />
              </View>
            </View>
            
            {/* Ends At */}
            <View style={[styles.settingRow, styles.borderBottom]}>
              <Text style={styles.settingLabel}>Ends at</Text>
              <View style={styles.settingValueContainer}>
                <Text style={styles.settingValue}>{workingHours.endsAt}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#0f6df0" />
              </View>
            </View>
          </View>
        </View>

        {/* AI Processing Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI PROCESSING PREFERENCES</Text>
          
          <View style={styles.settingsCard}>
            {/* Processing Speed */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="speed" size={20} color="rgba(13, 19, 28, 0.6)" />
                <Text style={styles.settingLabel}>Processing Speed</Text>
              </View>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderFill, { width: `${processingSpeed}%` }]}></View>
                  <View style={[styles.sliderThumb, { left: `${processingSpeed}%` }]}></View>
                </View>
                <Text style={styles.sliderValue}>
                  {processingSpeed < 30 ? 'Fast' : processingSpeed < 70 ? 'Balanced' : 'Thorough'}
                </Text>
              </View>
            </View>
            
            {/* Accuracy Priority */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="done-all" size={20} color="rgba(13, 19, 28, 0.6)" />
                <Text style={styles.settingLabel}>Accuracy Priority</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggleContainer, accuracyPriority ? styles.toggleActive : styles.toggleInactive]}
                onPress={() => setAccuracyPriority(!accuracyPriority)}
              >
                <View style={[styles.toggleThumb, accuracyPriority ? styles.thumbActive : styles.thumbInactive]}></View>
              </TouchableOpacity>
            </View>
            
            {/* Language Model */}
            <View style={[styles.settingRow, styles.borderBottom]}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="language" size={20} color="rgba(13, 19, 28, 0.6)" />
                <Text style={styles.settingLabel}>Language Model</Text>
              </View>
              <View style={styles.settingValueContainer}>
                <Text style={styles.settingValue}>GPT-4 Turbo</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#0f6df0" />
              </View>
            </View>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
          
          <View style={styles.settingsCard}>
            {/* Push Notifications */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="notifications" size={20} color="rgba(13, 19, 28, 0.6)" />
                <Text style={styles.settingLabel}>Push Notifications</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggleContainer, pushNotifications ? styles.toggleActive : styles.toggleInactive]}
                onPress={() => setPushNotifications(!pushNotifications)}
              >
                <View style={[styles.toggleThumb, pushNotifications ? styles.thumbActive : styles.thumbInactive]}></View>
              </TouchableOpacity>
            </View>
            
            {/* Email Digest */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="email" size={20} color="rgba(13, 19, 28, 0.6)" />
                <Text style={styles.settingLabel}>Weekly Email Digest</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggleContainer, emailDigest ? styles.toggleActive : styles.toggleInactive]}
                onPress={() => setEmailDigest(!emailDigest)}
              >
                <View style={[styles.toggleThumb, emailDigest ? styles.thumbActive : styles.thumbInactive]}></View>
              </TouchableOpacity>
            </View>
            
            {/* Sound Effects */}
            <View style={[styles.settingRow, styles.borderBottom]}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="volume-up" size={20} color="rgba(13, 19, 28, 0.6)" />
                <Text style={styles.settingLabel}>Sound Effects</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggleContainer, soundEffects ? styles.toggleActive : styles.toggleInactive]}
                onPress={() => setSoundEffects(!soundEffects)}
              >
                <View style={[styles.toggleThumb, soundEffects ? styles.thumbActive : styles.thumbInactive]}></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Data & Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATA & PRIVACY</Text>
          
          <View style={styles.settingsCard}>
            {/* Auto-delete Old Records */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="delete" size={20} color="rgba(13, 19, 28, 0.6)" />
                <Text style={styles.settingLabel}>Auto-delete Old Records</Text>
              </View>
              <View style={styles.settingValueContainer}>
                <Text style={styles.settingValue}>After 90 days</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#0f6df0" />
              </View>
            </View>
            
            {/* Export Data */}
            <View style={[styles.settingRow, styles.borderBottom]}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="download" size={20} color="rgba(13, 19, 28, 0.6)" />
                <Text style={styles.settingLabel}>Export My Data</Text>
              </View>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Export</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DANGER ZONE</Text>
          
          <View style={styles.settingsCard}>
            <View style={[styles.settingRow, styles.borderBottom]}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="delete-forever" size={20} color="#ef4444" />
                <Text style={[styles.settingLabel, styles.dangerText]}>Delete Account</Text>
              </View>
              <TouchableOpacity style={styles.dangerButton}>
                <Text style={styles.dangerButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 247, 248, 0.8)',
    padding: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    position: 'relative',
    top: 0,
    zIndex: 10,
    paddingTop: 60, // Add padding to avoid camera area
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d131c',
    flex: 1,
    textAlign: 'center',
    paddingRight: 48,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  description: {
    paddingVertical: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#64748b',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0d131c',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
    opacity: 0.6,
  },
  settingsCard: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingHorizontal: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0d131c',
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f6df0',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sliderTrack: {
    width: 120,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#0f6df0',
    borderRadius: 2,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    backgroundColor: '#0f6df0',
    borderRadius: 10,
    position: 'absolute',
    top: -8,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0d131c',
    minWidth: 70,
  },
  toggleContainer: {
    width: 48,
    height: 24,
    backgroundColor: '#0f6df0',
    borderRadius: 12,
    padding: 2,
    alignItems: 'flex-end',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleInactive: {
    backgroundColor: '#cbd5e1',
    alignItems: 'flex-start',
  },
  toggleActive: {
    backgroundColor: '#0f6df0',
    alignItems: 'flex-end',
  },
  thumbActive: {
    // Thumb styling when active
  },
  thumbInactive: {
    // Thumb styling when inactive
  },
  actionButton: {
    backgroundColor: '#0f6df0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  dangerButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  dangerText: {
    color: '#ef4444',
  },
});