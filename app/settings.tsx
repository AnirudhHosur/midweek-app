import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDarkMode, colors } = useTheme();
  const [workingHours, setWorkingHours] = useState({
    startsAt: '09:00 AM',
    endsAt: '06:00 PM'
  });
  const [processingSpeed, setProcessingSpeed] = useState(70);
  const [accuracyPriority, setAccuracyPriority] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.background.base }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} translucent={true} backgroundColor="transparent" />
      {/* Top Navigation Bar */}
      <View style={[styles.navbar, { borderBottomColor: colors.border.subtle }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)')}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        
        <Text style={[styles.navTitle, { color: colors.text.primary }]}>Settings & Preferences</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.description}>
          <Text style={[styles.descriptionText, { color: colors.text.secondary }]}>
            Configure how MindWeek AI organizes your tasks into your schedule.
          </Text>
        </View>

        {/* Working Hours Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>WORKING HOURS</Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.background.elevated }]}>
            {/* Starts At */}
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Starts at</Text>
              <View style={[styles.settingValueContainer, { backgroundColor: colors.background.subtle }]}>
                <Text style={[styles.settingValue, { color: colors.text.primary }]}>{workingHours.startsAt}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#0f6df0" />
              </View>
            </View>
            
            {/* Ends At */}
            <View style={[styles.settingRow, styles.borderBottom]}>
              <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Ends at</Text>
              <View style={[styles.settingValueContainer, { backgroundColor: colors.background.subtle }]}>
                <Text style={[styles.settingValue, { color: colors.text.primary }]}>{workingHours.endsAt}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.brand.primary} />
              </View>
            </View>
          </View>
        </View>

        {/* AI Processing Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>AI PROCESSING PREFERENCES</Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.background.elevated }]}>
            {/* Processing Speed */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="speed" size={20} color={colors.text.secondary} />
                <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Processing Speed</Text>
              </View>
              <View style={styles.sliderContainer}>
                <View style={[styles.sliderTrack, { backgroundColor: colors.border.default }]}>
                  <View style={[styles.sliderFill, { width: `${processingSpeed}%`, backgroundColor: colors.brand.primary }]}></View>
                  <View style={[styles.sliderThumb, { left: `${processingSpeed}%`, backgroundColor: colors.brand.primary }]}></View>
                </View>
                <Text style={[styles.sliderValue, { color: colors.text.secondary }]}>
                  {processingSpeed < 30 ? 'Fast' : processingSpeed < 70 ? 'Balanced' : 'Thorough'}
                </Text>
              </View>
            </View>
            
            {/* Accuracy Priority */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="done-all" size={20} color={colors.text.secondary} />
                <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Accuracy Priority</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggleContainer, accuracyPriority ? { backgroundColor: colors.brand.primary } : { backgroundColor: colors.border.default }]}
                onPress={() => setAccuracyPriority(!accuracyPriority)}
              >
                <View style={[styles.toggleThumb, { backgroundColor: '#ffffff' }]}></View>
              </TouchableOpacity>
            </View>
            
            {/* Language Model */}
            <View style={[styles.settingRow, styles.borderBottom]}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="language" size={20} color={colors.text.secondary} />
                <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Language Model</Text>
              </View>
              <View style={[styles.settingValueContainer, { backgroundColor: colors.background.subtle }]}>
                <Text style={[styles.settingValue, { color: colors.text.primary }]}>GPT-4 Turbo</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.brand.primary} />
              </View>
            </View>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>NOTIFICATIONS</Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.background.elevated }]}>
            {/* Push Notifications */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="notifications" size={20} color={colors.text.secondary} />
                <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Push Notifications</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggleContainer, pushNotifications ? { backgroundColor: colors.brand.primary } : { backgroundColor: colors.border.default }]}
                onPress={() => setPushNotifications(!pushNotifications)}
              >
                <View style={[styles.toggleThumb, { backgroundColor: '#ffffff' }]}></View>
              </TouchableOpacity>
            </View>
            
            {/* Email Digest */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="email" size={20} color={colors.text.secondary} />
                <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Weekly Email Digest</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggleContainer, emailDigest ? { backgroundColor: colors.brand.primary } : { backgroundColor: colors.border.default }]}
                onPress={() => setEmailDigest(!emailDigest)}
              >
                <View style={[styles.toggleThumb, { backgroundColor: '#ffffff' }]}></View>
              </TouchableOpacity>
            </View>
            
            
            {/* Sound Effects */}
            <View style={[styles.settingRow, styles.borderBottom]}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="volume-up" size={20} color={colors.text.secondary} />
                <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Sound Effects</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggleContainer, soundEffects ? { backgroundColor: colors.brand.primary } : { backgroundColor: colors.border.default }]}
                onPress={() => setSoundEffects(!soundEffects)}
              >
                <View style={[styles.toggleThumb, { backgroundColor: '#ffffff' }]}></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Data & Privacy */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>DATA & PRIVACY</Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.background.elevated }]}>
            {/* Auto-delete Old Records */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="delete" size={20} color={colors.text.secondary} />
                <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Auto-delete Old Records</Text>
              </View>
              <View style={[styles.settingValueContainer, { backgroundColor: colors.background.subtle }]}>
                <Text style={[styles.settingValue, { color: colors.text.primary }]}>After 90 days</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.brand.primary} />
              </View>
            </View>
            
            {/* Export Data */}
            <View style={[styles.settingRow, styles.borderBottom]}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="download" size={20} color={colors.text.secondary} />
                <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Export My Data</Text>
              </View>
              <TouchableOpacity style={[styles.actionButton, { borderColor: colors.brand.primary }]}>
                <Text style={[styles.actionButtonText, { color: colors.brand.primary }]}>Export</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>DANGER ZONE</Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.background.elevated }]}>
            <View style={[styles.settingRow, styles.borderBottom]}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="delete-forever" size={20} color={colors.state.error} />
                <Text style={[styles.settingLabel, { color: colors.state.error }]}>Delete Account</Text>
              </View>
              <TouchableOpacity style={[styles.dangerButton, { borderColor: colors.state.error }]}>
                <Text style={[styles.dangerButtonText, { color: colors.state.error }]}>Delete</Text>
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
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    position: 'relative',
    top: 0,
    zIndex: 10,
    paddingTop: 60,
    borderBottomWidth: 1,
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
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
    opacity: 0.6,
  },
  settingsCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
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
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sliderTrack: {
    width: 120,
    height: 4,
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 2,
  },
  sliderThumb: {
    width: 20,
    height: 20,
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
    minWidth: 70,
  },
  toggleContainer: {
    width: 48,
    height: 24,
    borderRadius: 12,
    padding: 2,
    alignItems: 'flex-end',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleInactive: {
    alignItems: 'flex-start',
  },
  toggleActive: {
    alignItems: 'flex-end',
  },
  thumbActive: {
    // Thumb styling when active
  },
  thumbInactive: {
    // Thumb styling when inactive
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dangerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dangerText: {
  },
});