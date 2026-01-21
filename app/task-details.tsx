import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TaskDetailsScreen() {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [duration, setDuration] = useState(105); // in minutes (1h 45m)
  const [priority, setPriority] = useState('med');
  const [deadlineEnabled, setDeadlineEnabled] = useState(true);

  const categories = [
    { value: 'work', label: '💼 Work', icon: 'work' },
    { value: 'admin', label: '📝 Admin', icon: 'description' },
    { value: 'home', label: '🏠 Home', icon: 'home' },
    { value: 'health', label: '💪 Health', icon: 'fitness-center' },
    { value: 'social', label: '🎨 Social', icon: 'people' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#10b981' },
    { value: 'med', label: 'Med', color: '#f59e0b' },
    { value: 'high', label: 'High', color: '#ef4444' }
  ];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const getDurationPercentage = () => {
    const maxMinutes = 240; // 4 hours
    const minMinutes = 15;
    return ((duration - minMinutes) / (maxMinutes - minMinutes)) * 100;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
      
      {/* Top Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="#0d131c" />
        </TouchableOpacity>
        
        <Text style={styles.navTitle}>Task Details</Text>
        
        <View style={styles.spacer} />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Large Editable Title */}
        <View style={styles.titleSection}>
          <TextInput
            style={styles.titleInput}
            placeholder="What needs to be done?"
            placeholderTextColor="#9ca3af"
            multiline
            value={taskTitle}
            onChangeText={setTaskTitle}
            textAlignVertical="top"
          />
        </View>

        {/* Form Section Container */}
        <View style={styles.formContainer}>
          {/* Category Selection */}
          <View style={styles.formSection}>
            <Text style={styles.sectionLabel}>Category</Text>
            
            <View style={styles.dropdownContainer}>
              <View style={styles.dropdownButton}>
                <Text style={styles.dropdownText}>
                  {categories.find(cat => cat.value === category)?.label}
                </Text>
                <MaterialIcons name="expand-more" size={24} color="#9ca3af" />
              </View>
            </View>
          </View>

          {/* Duration Slider */}
          <View style={styles.formSection}>
            <View style={styles.durationHeader}>
              <Text style={styles.sectionLabel}>Duration</Text>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>
                  {formatDuration(duration)}
                </Text>
              </View>
            </View>
            
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <View 
                  style={[styles.sliderFill, { width: `${Math.min(Math.max(getDurationPercentage(), 0), 100)}%` }]}
                />
                <View style={[styles.sliderThumb, { left: `${Math.min(Math.max(getDurationPercentage(), 0), 100)}%` }]} />
              </View>
              
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelText}>15m</Text>
                <Text style={styles.sliderLabelText}>4h</Text>
              </View>
            </View>
          </View>

          {/* Priority Selection */}
          <View style={styles.formSection}>
            <Text style={styles.sectionLabel}>Priority</Text>
            
            <View style={styles.priorityContainer}>
              {priorities.map((pri) => (
                <TouchableOpacity
                  key={pri.value}
                  style={[
                    styles.priorityButton,
                    priority === pri.value && styles.priorityButtonActive
                  ]}
                  onPress={() => setPriority(pri.value)}
                >
                  <Text 
                    style={[
                      styles.priorityButtonText,
                      priority === pri.value && styles.priorityButtonTextActive
                    ]}
                  >
                    {pri.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Deadline Toggle */}
          <View style={styles.deadlineContainer}>
            <View style={styles.deadlineContent}>
              <MaterialIcons name="event" size={24} color="#0f6df0" />
              <Text style={styles.deadlineText}>
                Must be done this week
              </Text>
            </View>
            
            <Switch
              trackColor={{ false: '#ccc', true: '#0f6df0' }}
              thumbColor={deadlineEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#ccc"
              onValueChange={setDeadlineEnabled}
              value={deadlineEnabled}
            />
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => router.back()}
        >
          <Text style={styles.deleteButtonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#f5f7f8',
    padding: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    paddingTop: 50, // Account for status bar
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
  },
  spacer: {
    width: 48,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 120, // Space for footer
  },
  titleSection: {
    paddingVertical: 24,
  },
  titleInput: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d131c',
    padding: 0,
    minHeight: 100,
  },
  formContainer: {
    gap: 24,
  },
  formSection: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f4f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0d131c',
  },
  durationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationBadge: {
    backgroundColor: 'rgba(15, 109, 240, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  durationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f6df0',
  },
  sliderContainer: {
    backgroundColor: '#f0f4f9',
    padding: 24,
    borderRadius: 12,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#cfd9e8',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#0f6df0',
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0f6df0',
    borderWidth: 4,
    borderColor: 'white',
    top: -8,
    marginLeft: -12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  sliderLabelText: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  priorityContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f4f9',
    padding: 6,
    borderRadius: 12,
    gap: 4,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  priorityButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#9ca3af',
  },
  priorityButtonTextActive: {
    color: '#0d131c',
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f4f9',
    padding: 20,
    borderRadius: 12,
  },
  deadlineContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deadlineText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d131c',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: '#0f6df0',
    borderRadius: 12,
    shadowColor: '#0f6df0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
  },
});