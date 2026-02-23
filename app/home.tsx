import {
    StyleSheet,
    TextStyle,
    ViewStyle
} from 'react-native';
import HomeScreen from '../components/screens/HomeScreen';

export default function Home() {
  return <HomeScreen />;
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  } as ViewStyle,

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
  } as ViewStyle,

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#11181C',
  } as TextStyle,

  content: {
    flex: 1,
    paddingHorizontal: 16,
  } as ViewStyle,

  heroSection: {
    paddingVertical: 48,
    alignItems: 'center',
  } as ViewStyle,

  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f6df0',
    marginBottom: 8,
  } as TextStyle,

  heroText: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 32,
  } as TextStyle,

  micContainer: {
    alignItems: 'center',
  } as ViewStyle,

  micButton: {
    width: 96,
    height: 96,
  } as ViewStyle,

  micInnerButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#2dd4bf',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  } as ViewStyle,

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 16,
  } as TextStyle,

  captureCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  } as ViewStyle,

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  } as ViewStyle,

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  } as ViewStyle,

  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  } as TextStyle,

  timeText: {
    fontSize: 12,
    color: '#687076',
  } as TextStyle,

  captureTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  } as TextStyle,

  capturePreview: {
    fontSize: 14,
    color: '#687076',
    fontStyle: 'italic',
  } as TextStyle,
});
