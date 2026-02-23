import * as Haptics from 'expo-haptics';
import React, { createContext, useContext, useRef, useState } from 'react';

interface AnimationContextType {
  transitionProgress: number;
  isTransitioning: boolean;
  startTransition: () => void;
  completeTransition: () => void;
  cancelTransition: () => void;
  resetTransition: () => void;
  triggerHaptic: (type: 'light' | 'medium' | 'heavy') => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset transition state when provider mounts
  React.useEffect(() => {
    resetTransition();
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'medium') => {
    switch (type) {
      case 'light':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
    }
  };

  const startTransition = () => {
    setIsTransitioning(true);
    setTransitionProgress(0);
    
    // Trigger light haptic feedback when starting transition
    triggerHaptic('light');
    
    // Animate progress from 0 to 1 over 400ms
    let startTime: number;
    const duration = 400;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setTransitionProgress(progress);
      
      if (progress < 1) {
        transitionTimeoutRef.current = setTimeout(() => {
          requestAnimationFrame(animate);
        }, 16); // ~60fps
      } else {
        setIsTransitioning(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const completeTransition = () => {
    setTransitionProgress(1);
    setIsTransitioning(false);
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  };

  const cancelTransition = () => {
    setTransitionProgress(0);
    setIsTransitioning(false);
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    
    // Light haptic feedback for cancellation
    triggerHaptic('light');
  };

  const resetTransition = () => {
    // Force immediate reset
    setTransitionProgress(0);
    setIsTransitioning(false);
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  };

  const value: AnimationContextType = {
    transitionProgress,
    isTransitioning,
    startTransition,
    completeTransition,
    cancelTransition,
    resetTransition,
    triggerHaptic
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};