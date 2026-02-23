import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';

export default function ProfileSettingsScreen() {
  const router = useRouter();

  const handleNavigation = (screen: any) => {
    router.push(screen);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Control Room</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={32} color="#94a3b8" />
            </View>
            <View style={styles.editBadge}>
              <MaterialIcons name="edit" size={10} color="white" />
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Rivers</Text>
            <Text style={styles.profileEmail}>alex.rivers@example.com</Text>
          </View>
          
          <TouchableOpacity style={styles.chevronButton}>
            <MaterialIcons name="chevron-right" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/personal-info')}
            >
              <MaterialIcons name="person" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Personal Information</Text>
              <MaterialIcons name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/security')}
            >
              <MaterialIcons name="lock" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Password & Security</Text>
              <MaterialIcons name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APP SETTINGS</Text>
          
          <View style={styles.menuContainer}>
            <View style={styles.toggleItem}>
              <MaterialIcons name="notifications" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Push Notifications</Text>
              <View style={styles.toggleSwitch}>
                <View style={[styles.toggleThumb, styles.toggleActive]} />
              </View>
            </View>
            
            <View style={styles.toggleItem}>
              <MaterialIcons name="dark-mode" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Dark Mode</Text>
              <View style={styles.toggleSwitch}>
                <View style={styles.toggleThumb} />
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/working-hours')}
            >
              <MaterialIcons name="schedule" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Working Hours</Text>
              <MaterialIcons name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI PREFERENCES</Text>
          
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/ai-behavior')}
            >
              <MaterialIcons name="psychology" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Task Organization</Text>
              <MaterialIcons name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/voice-settings')}
            >
              <MaterialIcons name="record-voice-over" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Voice Recognition</Text>
              <MaterialIcons name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/help')}
            >
              <MaterialIcons name="help-outline" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Help & Support</Text>
              <MaterialIcons name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/feedback')}
            >
              <MaterialIcons name="feedback" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Send Feedback</Text>
              <MaterialIcons name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEGAL</Text>
          
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/terms')}
            >
              <MaterialIcons name="description" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Terms of Service</Text>
              <MaterialIcons name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation('/privacy')}
            >
              <MaterialIcons name="shield" size={24} color="#94a3b8" />
              <Text style={styles.menuText}>Privacy Policy</Text>
              <MaterialIcons name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.signOutContainer}>
          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={() => console.log('Sign out pressed')}
          >
            <MaterialIcons name="logout" size={24} color="#ef4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
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
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: 'rgba(248, 250, 252, 0.9)',
    backdropFilter: 'blur(16px)',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.5)',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0f6df0',
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748b',
  },
  chevronButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
  },
  toggleSwitch: {
    width: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleActive: {
    backgroundColor: '#0f6df0',
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
    paddingVertical: 16,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});