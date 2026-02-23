import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAnimation } from '../contexts/AnimationContext';

const { width, height } = Dimensions.get('window');

// Fake data for events
const FAKE_EVENTS = [
  {
    id: 1,
    title: 'Office work',
    category: 'Work',
    startTime: '08:00',
    endTime: '12:00',
    timeSlot: '08:00 AM',
    color: '#0f6df0',
    bgColor: 'rgba(15, 109, 240, 0.1)',
    borderColor: '#0f6df0'
  },
  {
    id: 2,
    title: 'Lunch Break',
    category: 'Personal',
    startTime: '12:00',
    endTime: '13:00',
    timeSlot: '12:00 PM',
    color: '#ea580c',
    bgColor: 'rgba(234, 88, 12, 0.1)',
    borderColor: '#ea580c'
  },
  {
    id: 3,
    title: 'Fill IRCC form',
    category: 'Admin',
    startTime: '13:00',
    endTime: '14:00',
    timeSlot: '01:00 PM',
    color: '#0d9488',
    bgColor: 'rgba(13, 148, 136, 0.1)',
    borderColor: '#0d9488'
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
  const currentTimeIndicatorPosition = useRef(new Animated.Value(420)).current; // Position for 10:30 AM
  const [selectedDay, setSelectedDay] = useState(0);

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
    <View style={styles.container}>
      <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
      
      {/* Top App Bar */}
      <View style={styles.topAppBar}>
        <View style={styles.topBarLeft}>
          <MaterialIcons name="calendar-today" size={28} color="#0f6df0" />
          <View style={styles.topBarText}>
            <Text style={styles.monthText}>July 2024</Text>
            <Text style={styles.syncText}>AI Synced 2m ago</Text>
          </View>
        </View>
        
        <View style={styles.topBarRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="search" size={24} color="#64748b" />
          </TouchableOpacity>
          <View style={styles.profileAvatar}>
            <MaterialIcons name="person" size={20} color="#64748b" />
          </View>
        </View>
      </View>

      {/* Weekly Tabs (Day Selector) */}
      <View style={styles.weekTabs}>
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
                day.isSelected && styles.selectedDayTab
              ]}
              onPress={() => setSelectedDay(index)}
            >
              <Text 
                style={[
                  styles.dayText,
                  day.isSelected ? styles.selectedDayText : styles.unselectedDayText
                ]}
              >
                {day.day}
              </Text>
              <Text 
                style={[
                  styles.dateText,
                  day.isSelected ? styles.selectedDateText : styles.unselectedDateText
                ]}
              >
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content: Scrollable Time Grid */}
      <View style={styles.contentContainer}>
        {/* Current Time Line Indicator */}
        <Animated.View 
          style={[
            styles.currentTimeLine,
            { top: currentTimeIndicatorPosition }
          ]}
        >
          <View style={styles.timeLabel}>
            <Text style={styles.timeLabelText}>10:30</Text>
          </View>
          <View style={styles.timeline}>
            <View style={styles.timelineDot} />
          </View>
        </Animated.View>

        <ScrollView 
          style={styles.timeGrid}
          showsVerticalScrollIndicator={false}
        >
          {TIME_SLOTS.map((slot, slotIndex) => {
            const events = getEventsForTimeSlot(slot.time);
            return (
              <View key={slotIndex} style={styles.timeSlotRow}>
                <View style={styles.timeLabelColumn}>
                  <Text style={styles.timeLabelText}>{slot.time.replace(' ', '\n')}</Text>
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
                          <Text style={styles.eventTitle}>{event.title}</Text>
                        </View>
                        <View style={styles.eventTimeContainer}>
                          <MaterialIcons 
                            name="schedule" 
                            size={14} 
                            color={event.color} 
                          />
                          <Text style={[styles.eventTime, { color: `${event.color}cc` }]}>
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
          <Text style={styles.fabHintText}>"Brain dump your thoughts..."</Text>
        </View>
        <TouchableOpacity 
          style={styles.fab}
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
    backgroundColor: '#ffffff',
  },
  topAppBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    paddingTop: 50,
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
    color: '#0d131c',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  syncText: {
    fontSize: 12,
    color: '#64748b',
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
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekTabs: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  weekTabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dayTab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    paddingBottom: 12,
    paddingTop: 16,
    minWidth: 50,
    flex: 1,
  },
  selectedDayTab: {
    borderBottomColor: '#0f6df0',
  },
  dayText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  selectedDayText: {
    color: '#0f6df0',
  },
  unselectedDayText: {
    color: '#94a3b8',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDateText: {
    color: '#0d131c',
  },
  unselectedDateText: {
    color: '#64748b',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
  },
  timeLabelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f6df0',
  },
  timeline: {
    flex: 1,
    height: 1,
    backgroundColor: '#0f6df0',
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: 0,
    top: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0f6df0',
  },
  timeGrid: {
    flex: 1,
  },
  timeSlotRow: {
    flexDirection: 'row',
    minHeight: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
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
    color: '#0d131c',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 4,
  },
  fabHintText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f6df0',
    fontStyle: 'italic',
  },
  fab: {
    width: 56,
    height: 56,
    backgroundColor: '#2dd4bf',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2dd4bf',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomNav: {
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
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
    color: '#94a3b8',
  },
  navButtonTextActive: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f6df0',
  },
});