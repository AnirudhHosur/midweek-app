import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [stats] = useState({
    brainDumps: 128,
    tasksDone: 452
  });

  const handleLogout = async() => {
    await logout();
    router.replace('/welcome');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
      {/* Top Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/(tabs)')}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="#11181C" />
        </TouchableOpacity>
        
        <Text style={styles.navTitle}>Profile</Text>
        
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="settings" size={24} color="#11181C" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={64} color="#11181C" />
            </View>
            <View style={styles.editBadge}>
              <MaterialIcons name="edit" size={14} color="#10221f" />
            </View>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>

        {/* Account Statistics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ACCOUNT STATISTICS</Text>
            <MaterialIcons name="insights" size={18} color="rgba(0,0,0,0.3)" />
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Brain Dumps</Text>
              <Text style={styles.statValue}>{stats.brainDumps}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Tasks Done</Text>
              <Text style={styles.statValue}>{stats.tasksDone}</Text>
            </View>
          </View>
        </View>

        {/* Subscription Plan */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SUBSCRIPTION PLAN</Text>
          </View>
          
          <View style={styles.planCard}>
            <View style={styles.planInfo}>
              <View style={styles.planIcon}>
                <MaterialIcons name="workspace-premium" size={24} color="#13ecc8" />
              </View>
              <View style={styles.planText}>
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>MindWeek Premium</Text>
                  <View style={styles.activeBadge}>
                    <Text style={styles.badgeText}>ACTIVE</Text>
                  </View>
                </View>
                <Text style={styles.planRenew}>Renews Oct 12, 2024</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="rgba(0,0,0,0.3)" />
          </View>
        </View>

        {/* Voice Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>VOICE SETTINGS</Text>
          </View>
          
          <View style={styles.voiceSettings}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="record-voice-over" size={20} color="rgba(0,0,0,0.4)" />
                <Text style={styles.settingLabel}>AI Voice Model</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>Natural Aura</Text>
                <MaterialIcons name="unfold-more" size={18} color="#13ecc8" />
              </View>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="mic" size={20} color="rgba(0,0,0,0.4)" />
                <Text style={styles.settingLabel}>Voice Activation</Text>
              </View>
              <View style={styles.toggleContainer}>
                <View style={styles.toggleThumb}></View>
              </View>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(248, 249, 250, 0.8)',
    position: 'relative',
    zIndex: 50,
    paddingTop: 60, // Add padding to avoid camera area
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: '#f8f9fa',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#13ecc8',
    borderWidth: 4,
    borderColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0d1b19',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#4c9a8d',
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.4)',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#1f2687',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 32,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0d1b19',
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#1f2687',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 32,
    elevation: 2,
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(19, 236, 200, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planText: {
    flex: 1,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d1b19',
  },
  activeBadge: {
    backgroundColor: 'rgba(19, 236, 200, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#13ecc8',
    letterSpacing: 0.5,
  },
  planRenew: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
  voiceSettings: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#1f2687',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 32,
    elevation: 2,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d1b19',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#13ecc8',
  },
  toggleContainer: {
    width: 48,
    height: 24,
    backgroundColor: 'rgba(19, 236, 200, 0.2)',
    borderRadius: 12,
    padding: 4,
    alignItems: 'flex-end',
  },
  toggleThumb: {
    width: 16,
    height: 16,
    backgroundColor: '#13ecc8',
    borderRadius: 8,
  },
  logoutSection: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(239, 68, 68, 0.1)',
    backgroundColor: 'transparent',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
    marginLeft: 8,
  },
});