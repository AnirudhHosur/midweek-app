import { MotiView } from 'moti';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useAnimation } from '../../contexts/AnimationContext';

interface TransitionOverlayProps {
  children: React.ReactNode;
  isActive: boolean;
  onTransitionComplete?: () => void;
}

const { width, height } = Dimensions.get('window');

export const TransitionOverlay: React.FC<TransitionOverlayProps> = ({ 
  children, 
  isActive,
  onTransitionComplete 
}) => {
  const { transitionProgress, isTransitioning, resetTransition } = useAnimation();

  useEffect(() => {
    if (!isTransitioning && transitionProgress === 1 && onTransitionComplete) {
      onTransitionComplete();
    }
  }, [transitionProgress, isTransitioning, onTransitionComplete]);

  // Reset animation when component becomes inactive
  useEffect(() => {
    if (!isActive) {
      // Small delay to ensure clean reset
      const timer = setTimeout(() => {
        resetTransition();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isActive, resetTransition]);

  if (!isActive) {
    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Background overlay that dims during transition */}
      <MotiView
        style={styles.backgroundOverlay}
        animate={{
          opacity: transitionProgress * 0.7,
        }}
        transition={{
          type: 'timing',
          duration: 400,
        }}
      />
      
      {/* Main content with scale animation */}
      <MotiView
        style={styles.contentContainer}
        animate={{
          scale: 1 - (transitionProgress * 0.1), // Scale from 1 to 0.9
        }}
        transition={{
          type: 'timing',
          duration: 400,
        }}
      >
        {children}
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 100,
  },
  contentContainer: {
    flex: 1,
    zIndex: 101,
  },
});