import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
      {/* Top App Bar / Logo */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <MaterialIcons name="psychology" size={32} color="#2dd4bf" />
          <Text style={styles.logoText}>
            Mind<Text style={styles.logoAccent}>Week</Text>
          </Text>
        </View>
      </View>

      {/* Hero Illustration Area */}
      <View style={styles.heroContainer}>
        <View style={styles.heroWrapper}>
          <View style={styles.heroIllustration}>
            {/* Decorative Glow Background */}
            <View style={styles.glowBackground} />
            
            {/* Main Central Illustration */}
            <View style={styles.mainIllustration}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="psychology" size={120} color="#2dd4bf" />
                <View style={styles.calendarBadge}>
                  <MaterialIcons name="calendar-month" size={24} color="white" />
                </View>
              </View>
              
              {/* Connecting visual lines */}
              <View style={styles.connectionLine} />
            </View>
          </View>
        </View>
      </View>

      {/* Headline & Body Text */}
      <View style={styles.textContainer}>
        <Text style={styles.headline}>
          Dump your mind.{'\n'}See your week.
        </Text>
        <Text style={styles.description}>
          The AI-powered voice assistant that organizes your thoughts into a clear plan.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/(tabs)')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start my week</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.secondaryButtonText}>
            Already have an account? 
          </Text>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>

      {/* iOS Indicator Spacer */}
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 8,
    paddingTop: 50, // Account for status bar and camera notch
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11181C',
  },
  logoAccent: {
    color: '#2dd4bf',
  },
  heroContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  heroWrapper: {
    width: '100%',
    maxWidth: 320,
  },
  heroIllustration: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowBackground: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(15, 109, 240, 0.1)',
    borderRadius: 9999,
  },
  mainIllustration: {
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  calendarBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#0f6df0',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  connectionLine: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    opacity: 0.4,
  },
  textContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#11181C',
    textAlign: 'center',
    lineHeight: 36,
    paddingBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#687076',
    fontWeight: 'normal',
    lineHeight: 24,
    paddingBottom: 32,
    maxWidth: 280,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 16,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: '#0f6df0',
    borderRadius: 12,
    shadowColor: '#0f6df0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  secondaryButtonText: {
    color: '#687076',
    fontSize: 14,
    fontWeight: '500',
  },
  loginText: {
    color: '#0f6df0',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  spacer: {
    height: 20,
  },
});