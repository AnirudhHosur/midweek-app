import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAnimation } from '../contexts/AnimationContext';
import { useTheme } from '../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

// Fake data for events - will use theme colors
const createFakeEvents = (colors: any) => [
  {
    id: 1,
    title: 'Office work',
    category: 'Work',
    startTime: '08:00',
    endTime: '12:00',
    timeSlot: '08:00 AM',
    color: colors.brand.primary,
    bgColor: colors.brand.soft,
    borderColor: colors.brand.primary
  },
  {
    id: 2,
    title: 'Lunch Break',
    category: 'Personal',
    startTime: '12:00',
    endTime: '13:00',
    timeSlot: '12:00 PM',
    color: colors.state.warning,
    bgColor: colors.background.subtle,
    borderColor: colors.state.warning
  },
  {
    id: 3,
    title: 'Fill IRCC form',
    category: 'Admin',
    startTime: '13:00',
    endTime: '14:00',
    timeSlot: '01:00 PM',
    color: colors.state.success,
    bgColor: colors.background.subtle,
    borderColor: colors.state.success
  }
];

// Time slots data
const TIME_SLOTS = [
  { time: '08:00 AM', hour: 8 },
  { time: '09:00 AM', hour: 9 },
  { time: '10:00 AM', hour: 10 },
  { time: '11:00 AM', hour: 11 },
  { time: '12:00 PM', hour: 12 },
  { time: '01:00 PM', hour: 13 },
  { time: '02:00 PM', hour: 14 },
  { time: '03:00 PM', hour: 15 },
  { time: '04:00 PM', hour: 16 },
  { time: '05:00 PM', hour: 17 },
];

// Days of the week
const WEEK_DAYS = [
  { day: 'Mon', date: 15, isSelected: true },
  { day: 'Tue', date: 16, isSelected: false },
  { day: 'Wed', date: 17, isSelected: false },
  { day: 'Thu', date: 18, isSelected: false },
  { day: 'Fri', date: 19, isSelected: false },
];

export default function WeeklyPlannerScreen() {
  const router = useRouter();
  const { triggerHaptic } = useAnimation();
  const { isDarkMode, colors } = useTheme();
  const currentTimeIndicatorPosition = useRef(new Animated.Value(420)).current; // Position for 10:30 AM
  const [selectedDay, setSelectedDay] = useState(0);
  const FAKE_EVENTS = createFakeEvents(colors);

  useEffect(() => {
    // Animate current time indicator
    Animated.loop(
      Animated.sequence([
        Animated.timing(currentTimeIndicatorPosition, {
          toValue: 440,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(currentTimeIndicatorPosition, {
          toValue: 400,
          duration: 1000,
          useNativeDriver: false,
        })
      ])
    ).start();
  }, [currentTimeIndicatorPosition]);

  const handleMicPress = () => {
    triggerHaptic('light');
    router.push('/transcribe');
  };

  const getEventsForTimeSlot = (timeSlot: string) => {
    return FAKE_EVENTS.filter(event => event.timeSlot === timeSlot);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.base }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} translucent={true} backgroundColor="transparent" />
      
      {/* Top App Bar */}
      <View style={[styles.topAppBar, { borderBottomColor: colors.border.subtle }]}>
        <View style={styles.topBarLeft}>
          <MaterialIcons name="calendar-today" size={28} color={colors.brand.primary} />
          <View style={styles.topBarText}>
            <Text style={[styles.monthText, { color: colors.text.primary }]}>July 2024</Text>
            <Text style={[styles.syncText, { color: colors.text.secondary }]}>AI Synced 2m ago</Text>
          </View>
        </View>
        
        <View style={styles.topBarRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="search" size={24} color={colors.text.muted} />
          </TouchableOpacity>
          <View style={[styles.profileAvatar, { backgroundColor: colors.background.elevated, borderColor: colors.border.default }]}>
            <MaterialIcons name="person" size={20} color={colors.text.muted} />
          </View>
        </View>
      </View>

      {/* Weekly Tabs (Day Selector) */}
      <View style={[styles.weekTabs, { backgroundColor: colors.background.elevated }]}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekTabsContainer}
        >
          {WEEK_DAYS.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayTab,
                day.isSelected && styles.selectedDayTab,
                day.isSelected ? { backgroundColor: colors.brand.primary } : { backgroundColor: 'transparent' }
              ]}
              onPress={() => setSelectedDay(index)}
            >
              <Text 
                style={[
                  styles.dayText,
                  day.isSelected ? { color: '#ffffff' } : { color: colors.text.muted }
                ]}
              >
                {day.day}
              </Text>
              <Text 
                style={[
                  styles.dateText,
                  day.isSelected ? { color: '#ffffff' } : { color: colors.text.secondary }
                ]}
              >
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content: Scrollable Time Grid */}
      <View style={[styles.contentContainer, { backgroundColor: colors.background.base }]}>
        {/* Current Time Line Indicator */}
        <Animated.View 
          style={[
            styles.currentTimeLine,
            { top: currentTimeIndicatorPosition }
          ]}
        >
          <View style={[styles.timeLabel, { backgroundColor: colors.brand.primary }]}>
            <Text style={[styles.timeLabelText, { color: '#ffffff' }]}>10:30</Text>
          </View>
          <View style={[styles.timeline, { borderBottomColor: colors.brand.primary }]}>
            <View style={[styles.timelineDot, { backgroundColor: colors.brand.primary }]} />
          </View>
        </Animated.View>

        <ScrollView 
          style={styles.timeGrid}
          showsVerticalScrollIndicator={false}
        >
          {TIME_SLOTS.map((slot, slotIndex) => {
            const events = getEventsForTimeSlot(slot.time);
            return (
              <View key={slotIndex} style={[styles.timeSlotRow, { borderBottomColor: colors.border.subtle }]}>
                <View style={styles.timeLabelColumn}>
                  <Text style={[styles.timeLabelText, { color: colors.text.muted }]}>{slot.time.replace(' ', '\n')}</Text>
                </View>
                
                <View style={styles.eventsColumn}>
                  {events.length > 0 ? (
                    events.map((event) => (
                      <View 
                        key={event.id}
                        style={[
                          styles.eventCard,
                          {
                            backgroundColor: event.bgColor,
                            borderLeftColor: event.borderColor
                          }
                        ]}
                      >
                        <View>
                          <Text style={[styles.eventCategory, { color: event.color }]}>
                            {event.category}
                          </Text>
                          <Text style={[styles.eventTitle, { color: colors.text.primary }]}>{event.title}</Text>
                        </View>
                        <View style={styles.eventTimeContainer}>
                          <MaterialIcons 
                            name="schedule" 
                            size={14} 
                            color={event.color} 
                          />
                          <Text style={[styles.eventTime, { color: event.color }]}>
                            {event.startTime} - {event.endTime}
                          </Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View style={styles.emptySlot} />
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Teal FAB */}
      <View style={styles.fabContainer}>
        <View style={styles.fabHint}>
          <Text style={[styles.fabHintText, { color: colors.text.secondary }]}>"Brain dump your thoughts..."</Text>
        </View>
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: colors.brand.primary }]}
          onPress={handleMicPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="mic" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topAppBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    paddingTop: 50,
    borderBottomWidth: 1,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topBarText: {
    flexDirection: 'column',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  syncText: {
    fontSize: 12,
    fontWeight: '500',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 999,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  weekTabs: {
    borderBottomWidth: 1,
  },
  weekTabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dayTab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 12,
    paddingTop: 16,
    minWidth: 50,
    flex: 1,
    borderRadius: 8,
  },
  selectedDayTab: {
    borderRadius: 8,
  },
  dayText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  currentTimeLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  timeLabel: {
    width: 48,
    alignItems: 'flex-end',
    paddingRight: 8,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  timeLabelText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  timeline: {
    flex: 1,
    height: 1,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: 0,
    top: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timeGrid: {
    flex: 1,
  },
  timeSlotRow: {
    flexDirection: 'row',
    minHeight: 100,
    borderBottomWidth: 1,
  },
  timeLabelColumn: {
    width: 56,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  eventsColumn: {
    flex: 1,
    padding: 8,
    position: 'relative',
  },
  eventCard: {
    position: 'absolute',
    left: 8,
    right: 8,
    top: 0,
    bottom: 8,
    borderRadius: 12,
    borderLeftWidth: 4,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  eventCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventTime: {
    fontSize: 10,
    fontWeight: '600',
  },
  emptySlot: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    alignItems: 'flex-end',
    gap: 12,
  },
  fabHint: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 4,
  },
  fabHintText: {
    fontSize: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomNav: {
    height: 80,
    borderTopWidth: 1,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  navButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  navButtonTextActive: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});