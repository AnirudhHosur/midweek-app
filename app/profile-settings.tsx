import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { useTheme } from '../contexts/ThemeContext';

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode, colors } = useTheme();

  const handleNavigation = (screen: any) => {
    router.push(screen);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.base }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} translucent={true} backgroundColor="transparent" />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border.subtle }]}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Control Room</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.background.elevated }]}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.background.subtle }]}>
              <MaterialIcons name="person" size={32} color={colors.text.muted} />
            </View>
            <View style={[styles.editBadge, { backgroundColor: colors.brand.primary }]}>
              <MaterialIcons name="edit" size={10} color="white" />
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text.primary }]}>Alex Rivers</Text>
            <Text style={[styles.profileEmail, { color: colors.text.secondary }]}>alex.rivers@example.com</Text>
          </View>
          
          <TouchableOpacity style={[styles.chevronButton, { backgroundColor: colors.background.subtle }]}>
            <MaterialIcons name="chevron-right" size={20} color={colors.text.muted} />
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>ACCOUNT</Text>
          
          <View style={[styles.menuContainer, { backgroundColor: colors.background.elevated }]}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/personal-info')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="person" size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Personal Information</Text>
              <MaterialIcons name="chevron-right" size={16} color={colors.text.muted} />
            </TouchableOpacity>
            
            <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/security')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="lock" size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Password & Security</Text>
              <MaterialIcons name="chevron-right" size={16} color={colors.text.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>APP SETTINGS</Text>
          
          <View style={[styles.menuContainer, { backgroundColor: colors.background.elevated }]}>
            <View style={styles.toggleItem}>
              <MaterialIcons name="notifications" size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Push Notifications</Text>
              <View style={[styles.toggleSwitch, { backgroundColor: colors.border.default }]}>
                <View style={[styles.toggleThumb, styles.toggleActive, { backgroundColor: colors.brand.primary }]} />
              </View>
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />
            
            <TouchableOpacity 
              style={styles.toggleItem}
              onPress={toggleDarkMode}
              activeOpacity={0.7}
            >
              <MaterialIcons name={isDarkMode ? "light-mode" : "dark-mode"} size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Dark Mode</Text>
              <View style={[styles.toggleSwitch, { backgroundColor: isDarkMode ? colors.brand.primary : colors.border.default }]}>
                <View style={[styles.toggleThumb, isDarkMode && styles.toggleActive, { backgroundColor: isDarkMode ? '#ffffff' : colors.border.default }]} />
              </View>
            </TouchableOpacity>
            
            <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/working-hours')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="schedule" size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Working Hours</Text>
              <MaterialIcons name="chevron-right" size={16} color={colors.text.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>AI PREFERENCES</Text>
          
          <View style={[styles.menuContainer, { backgroundColor: colors.background.elevated }]}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/ai-behavior')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="psychology" size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Task Organization</Text>
              <MaterialIcons name="chevron-right" size={16} color={colors.text.muted} />
            </TouchableOpacity>
            
            <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/voice-settings')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="record-voice-over" size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Voice Recognition</Text>
              <MaterialIcons name="chevron-right" size={16} color={colors.text.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>SUPPORT</Text>
          
          <View style={[styles.menuContainer, { backgroundColor: colors.background.elevated }]}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/help')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="help-outline" size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Help & Support</Text>
              <MaterialIcons name="chevron-right" size={16} color={colors.text.muted} />
            </TouchableOpacity>
            
            <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/feedback')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="feedback" size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Send Feedback</Text>
              <MaterialIcons name="chevron-right" size={16} color={colors.text.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>LEGAL</Text>
          
          <View style={[styles.menuContainer, { backgroundColor: colors.background.elevated }]}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/terms')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="description" size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Terms of Service</Text>
              <MaterialIcons name="chevron-right" size={16} color={colors.text.muted} />
            </TouchableOpacity>
            
            <View style={[styles.divider, { backgroundColor: colors.border.subtle }]} />
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/privacy')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="shield" size={24} color={colors.text.muted} />
              <Text style={[styles.menuText, { color: colors.text.primary }]}>Privacy Policy</Text>
              <MaterialIcons name="chevron-right" size={16} color={colors.text.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.signOutContainer}>
          <TouchableOpacity 
            style={[styles.signOutButton, { borderColor: colors.state.error }]}
            onPress={() => console.log('Sign out pressed')}
            activeOpacity={0.7}
          >
            <MaterialIcons name="logout" size={24} color={colors.state.error} />
            <Text style={[styles.signOutText, { color: colors.state.error }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: '400',
  },
  chevronButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  menuContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  toggleSwitch: {
    width: 36,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleActive: {
    alignSelf: 'flex-end',
  },
  signOutContainer: {
    marginTop: 32,
    marginBottom: 80,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '600',
  },
});