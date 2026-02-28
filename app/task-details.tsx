import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function TaskDetailsScreen() {
  const router = useRouter();
  const { isDarkMode, colors } = useTheme();
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [duration, setDuration] = useState(105); // in minutes (1h 45m)
  const [priority, setPriority] = useState('med');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = [
    { value: 'work', label: '💼 Work', icon: 'work' },
    { value: 'admin', label: '📝 Admin', icon: 'description' },
    { value: 'home', label: '🏠 Home', icon: 'home' },
    { value: 'health', label: '💪 Health', icon: 'fitness-center' },
    { value: 'social', label: '🎨 Social', icon: 'people' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: colors.state.success },
    { value: 'med', label: 'Med', color: colors.state.warning },
    { value: 'high', label: 'High', color: colors.state.error }
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

  const handleSliderChange = (event: any) => {
    const { locationX, nativeEvent } = event;
    if (!nativeEvent || nativeEvent.pageX === undefined) return;
    
    // Get the slider track dimensions
    const sliderWidth = event.currentTarget.style?.width || 300;
    const percentage = Math.max(0, Math.min(100, (locationX / (sliderWidth as number)) * 100));
    
    // Convert percentage to duration (15 to 240 minutes)
    const minMinutes = 15;
    const maxMinutes = 240;
    const newDuration = minMinutes + (percentage / 100) * (maxMinutes - minMinutes);
    
    setDuration(Math.round(newDuration));
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
    setShowCategoryDropdown(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.base }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} translucent={true} backgroundColor="transparent" />
      
      {/* Top Navigation Bar */}
      <View style={[styles.navbar, { borderBottomColor: colors.border.subtle }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        
        <Text style={[styles.navTitle, { color: colors.text.primary }]}>Task Details</Text>
        
        <View style={styles.spacer} />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Large Editable Title */}
        <View style={styles.titleSection}>
          <TextInput
            style={[styles.titleInput, { color: colors.text.primary, borderColor: colors.border.default }]}
            placeholder="What needs to be done?"
            placeholderTextColor={colors.text.muted}
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
            <Text style={[styles.sectionLabel, { color: colors.text.primary }]}>Category</Text>
            
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={[styles.dropdownButton, { backgroundColor: colors.background.elevated, borderColor: colors.border.default }]}
                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                activeOpacity={0.7}
              >
                <Text style={[styles.dropdownText, { color: colors.text.primary }]}>
                  {categories.find(cat => cat.value === category)?.label}
                </Text>
                <MaterialIcons 
                  name={showCategoryDropdown ? "expand-less" : "expand-more"} 
                  size={24} 
                  color={colors.text.muted} 
                />
              </TouchableOpacity>

              {/* Dropdown Menu */}
              {showCategoryDropdown && (
                <View style={[styles.dropdownMenu, { backgroundColor: colors.background.elevated, borderColor: colors.border.default }]}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.value}
                      style={styles.dropdownItem}
                      onPress={() => handleCategorySelect(cat.value)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.dropdownItemContent}>
                        <Text style={[styles.dropdownItemLabel, { color: colors.text.primary }]}>{cat.label}</Text>
                        {category === cat.value && (
                          <MaterialIcons name="check" size={20} color={colors.brand.primary} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Duration Slider */}
          <View style={styles.formSection}>
            <View style={styles.durationHeader}>
              <Text style={[styles.sectionLabel, { color: colors.text.primary }]}>Duration</Text>
              <View style={[styles.durationBadge, { backgroundColor: colors.background.subtle }]}>
                <Text style={[styles.durationText, { color: colors.text.primary }]}>
                  {formatDuration(duration)}
                </Text>
              </View>
            </View>
            
            <View style={styles.sliderContainer}>
              <TouchableOpacity 
                style={[styles.sliderTrack, { backgroundColor: colors.border.default }]}
                onPress={handleSliderChange}
                activeOpacity={0.7}
              >
                <View 
                  style={[styles.sliderFill, { backgroundColor: colors.brand.primary, width: `${Math.min(Math.max(getDurationPercentage(), 0), 100)}%` }]}
                />
                <View style={[styles.sliderThumb, { backgroundColor: colors.brand.primary, left: `${Math.min(Math.max(getDurationPercentage(), 0), 100)}%` }]} />
              </TouchableOpacity>
              
              <View style={styles.sliderLabels}>
                <Text style={[styles.sliderLabelText, { color: colors.text.muted }]}>15m</Text>
                <Text style={[styles.sliderLabelText, { color: colors.text.muted }]}>4h</Text>
              </View>
            </View>
          </View>

          {/* Priority Selection */}
          <View style={styles.formSection}>
            <Text style={[styles.sectionLabel, { color: colors.text.primary }]}>Priority</Text>
            
            <View style={styles.priorityContainer}>
              {priorities.map((pri) => (
                <TouchableOpacity
                  key={pri.value}
                  style={[
                    styles.priorityButton,
                    { borderColor: priority === pri.value ? pri.color : colors.border.default },
                    priority === pri.value && { backgroundColor: pri.color }
                  ]}
                  onPress={() => setPriority(pri.value)}
                  activeOpacity={0.7}
                >
                  <Text 
                    style={[
                      styles.priorityButtonText,
                      { color: priority === pri.value ? 'white' : colors.text.primary }
                    ]}
                  >
                    {pri.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer Actions */}
      <View style={[styles.footer, { backgroundColor: colors.background.base, borderTopColor: colors.border.subtle }]}>
        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: colors.brand.primary }]}
          onPress={() => router.push('/')}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.deleteButton, { borderColor: colors.state.error }]}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={[styles.deleteButtonText, { color: colors.state.error }]}>Delete Task</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
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
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 48,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  titleSection: {
    paddingVertical: 24,
  },
  titleInput: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    fontSize: 28,
    fontWeight: '700',
    padding: 0,
    minHeight: 100,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  formContainer: {
    gap: 24,
  },
  formSection: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 20,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  dropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownItemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  durationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sliderContainer: {
    padding: 24,
    borderRadius: 12,
  },
  sliderTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
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
    fontWeight: '500',
  },
  priorityContainer: {
    flexDirection: 'row',
    padding: 6,
    borderRadius: 12,
    gap: 4,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopWidth: 1,
    gap: 12,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});