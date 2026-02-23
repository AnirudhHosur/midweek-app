import { MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'capture', label: 'Capture', icon: 'radio-button-checked', route: '/home' },
  { id: 'schedule', label: 'Schedule', icon: 'calendar-today', route: '/weekly-planner' },
  { id: 'insights', label: 'Insights', icon: 'insights', route: '/insights' },
  { id: 'profile', label: 'Profile', icon: 'person', route: '/profile-settings' },
];

export const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActiveRoute = (route: string) => {
    if (route === '/home') {
      return pathname === '/' || pathname === '/home';
    }
    return pathname === route;
  };

  const handleNavigation = (route: string) => {
    // Type assertion to bypass strict typing
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {NAV_ITEMS.map((item) => {
          const isActive = isActiveRoute(item.route);
          
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => handleNavigation(item.route)}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={isActive ? '#2dd4bf' : '#94a3b8'}
              />
              <Text style={[
                styles.navLabel,
                { color: isActive ? '#2dd4bf' : '#94a3b8' }
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  navBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.5)',
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flex: 1,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});