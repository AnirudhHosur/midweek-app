import { MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

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
  const { isDarkMode, colors } = useTheme();

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
      <View style={[styles.navBar, { backgroundColor: colors.background.elevated, borderTopColor: colors.border.subtle }]}>
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
                color={isActive ? colors.brand.primary : colors.text.muted}
              />
              <Text style={[
                styles.navLabel,
                { color: isActive ? colors.brand.primary : colors.text.muted }
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
    borderTopWidth: 1,
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