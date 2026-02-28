import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TransitionOverlay } from '../components/animations/TransitionOverlay';
import { useAnimation } from '../contexts/AnimationContext';
import { useTheme } from '../contexts/ThemeContext';

export default function TranscribeScreen() {
  const router = useRouter();
  const { isDarkMode, colors } = useTheme();
  const waveAnimation = useRef(new Animated.Value(0)).current;
  const { triggerHaptic, resetTransition } = useAnimation();
  
  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: 'Fill IRCC form',
      category: 'Admin',
      priority: 'High',
      priorityColor: colors.state.error,
      dueDate: 'Due by Tuesday',
      icon: 'event'
    },
    {
      id: 2,
      title: 'Buy groceries',
      category: 'Home',
      priority: 'Medium',
      priorityColor: colors.state.warning,
      details: 'Milk and bread',
      icon: 'shopping-cart'
    }
  ];

  useEffect(() => {
    // Start waveform animation
    const animateWave = () => {
      Animated.sequence([
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start(() => animateWave());
    };
    
    animateWave();
    
    // Trigger haptic feedback when screen loads
    triggerHaptic('medium');
  }, [waveAnimation, triggerHaptic]);

  // Reset animation state when navigating away (cleanup)
  useEffect(() => {
    return () => {
      resetTransition();
    };
  }, [resetTransition]);

  const waveBars = Array.from({ length: 10 }, (_, i) => (
    <Animated.View
      key={i}
      style={[
        styles.waveBar,
        { backgroundColor: colors.brand.primary },
        {
          transform: [{
            scaleY: waveAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.5 + (i % 3) * 0.5]
            })
          }]
        }
      ]}
    />
  ));

  return (
    <TransitionOverlay isActive={false}>
      <View style={[styles.container, { backgroundColor: colors.background.base }]}>
        <StatusBar style={isDarkMode ? "light" : "dark"} translucent={true} backgroundColor="transparent" />
        {/* Top Navigation Bar */}
        <View style={[styles.navbar, { borderBottomColor: colors.border.subtle }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {
              resetTransition();
              router.back();
            }}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          
          <Text style={[styles.navTitle, { color: colors.text.primary }]}>MindWeek</Text>
          
          <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="more-horiz" size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Raw Transcript Section */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 300, delay: 200 }}
          >
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text.muted }]}>RAW TRANSCRIPT</Text>
                <Text style={[styles.autoSaveText, { color: colors.state.success }]}>Auto-saved</Text>
              </View>
              
              <View style={[styles.transcriptBox, { backgroundColor: colors.background.elevated, borderColor: colors.border.default }]}>
                <Text style={[styles.transcriptText, { color: colors.text.primary }]}>
                  &quot;I need to finish that <Text style={[styles.highlight, { color: colors.brand.primary }]}>IRCC form</Text> by <Text style={[styles.highlight, { color: colors.brand.primary }]}>Tuesday</Text> and also grab some <Text style={[styles.highlight, { color: colors.brand.primary }]}>milk and bread</Text> on the way home...&quot;
                </Text>
              </View>
            </View>
          </MotiView>

          {/* Waveform Visualizer */}
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15, delay: 300 }}
          >
            <View style={styles.waveformContainer}>
              <View style={styles.waveform}>
                {waveBars}
              </View>
              <Text style={[styles.processingText, { color: colors.text.secondary }]}>AI is processing your brain dump...</Text>
            </View>
          </MotiView>

          {/* Task List Section */}
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 300, delay: 400 }}
          >
            <View style={styles.section}>
              <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>Tasks I found</Text>
                <View style={styles.itemCount}>
                  <Text style={styles.itemCountText}>2 items</Text>
                </View>
              </View>
              
              <View style={styles.taskList}>
                {tasks.map((task) => (
                  <TouchableOpacity 
                    key={task.id} 
                    style={styles.taskCard}
                    onPress={() => router.push('../task-details')}
                  >
                    <View style={styles.taskHeaderRow}>
                      <View style={styles.taskInfo}>
                        <Text style={styles.taskName}>{task.title}</Text>
                        <View style={styles.tagContainer}>
                          <View style={[styles.categoryTag, { backgroundColor: 'rgba(15, 109, 240, 0.1)' }]}>
                            <Text style={[styles.tagText, { color: '#0f6df0' }]}>{task.category}</Text>
                          </View>
                          <View style={[styles.priorityTag, { backgroundColor: `${task.priorityColor}20` }]}>
                            <View style={[styles.priorityDot, { backgroundColor: task.priorityColor }]} />
                            <Text style={[styles.tagText, { color: task.priorityColor }]}>{task.priority} Priority</Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.editButton}>
                        <MaterialIcons name="edit-note" size={24} color="#94a3b8" />
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.taskDetails}>
                      <MaterialIcons name={task.icon as any} size={16} color="#64748b" />
                      <Text style={styles.detailText}>{task.dueDate || task.details}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
                
                {/* Quick Add Placeholder */}
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => router.push('../task-details')}
                >
                  <MaterialIcons name="add-circle" size={20} color="#94a3b8" />
                  <Text style={styles.addButtonText}>Add another task</Text>
                </TouchableOpacity>
              </View>
            </View>
          </MotiView>
        </ScrollView>

        {/* Sticky Footer CTA */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 300, delay: 500 }}
        >
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => {
                triggerHaptic('medium');
                router.push('/weekly-planner');
              }}
            >
              <Text style={styles.ctaText}>Plan my week</Text>
              <MaterialIcons name="auto-awesome" size={20} color="white" />
            </TouchableOpacity>
            <View style={styles.homeIndicatorSpacer} />
          </View>
        </MotiView>
      </View>
    </TransitionOverlay>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
    paddingTop: 0, // Remove paddingTop to show native status bar
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7f8',
    padding: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    paddingTop: 50, // Account for status bar manually
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
  menuButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  autoSaveText: {
    fontSize: 12,
    fontWeight: '500',
  },
  transcriptBox: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    maxHeight: 128,
  },
  transcriptText: {
    fontSize: 16,
    lineHeight: 24,
  },
  highlight: {
    fontWeight: '500',
  },
  waveformContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 60,
    marginBottom: 8,
  },
  waveBar: {
    width: 4,
    height: 32,
    borderRadius: 2,
  },
  processingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingTop: 20,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d131c',
  },
  itemCount: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  itemCountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
  },
  taskList: {
    gap: 12,
  },
  taskCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  taskHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  taskInfo: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d131c',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  editButton: {
    padding: 8,
  },
  taskDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#94a3b8',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(245, 247, 248, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  ctaButton: {
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
    gap: 8,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  homeIndicatorSpacer: {
    height: 16,
  },
});