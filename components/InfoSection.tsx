import { View, Text, StyleSheet } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface InfoSectionProps {
  icon: LucideIcon;
  title: string;
  content: string;
  iconColor?: string;
}

export function InfoSection({ icon: Icon, title, content, iconColor = '#dc2626' }: InfoSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
          <Icon size={20} color={iconColor} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  content: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});
