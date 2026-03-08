import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Belt } from '@/lib/supabase';

interface BeltCardProps {
  belt: Belt;
  onPress: () => void;
}

export function BeltCard({ belt, onPress }: BeltCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.colorStrip, { backgroundColor: belt.color_hex }]} />
      <View style={styles.content}>
        <Text style={styles.beltName}>{belt.name} Belt</Text>
        <Text style={styles.subtitle}>Tap to view syllabus</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  colorStrip: {
    width: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  beltName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
  },
});
