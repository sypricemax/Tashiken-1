import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Video as VideoIcon, ExternalLink } from 'lucide-react-native';
import { Video } from '@/lib/supabase';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(video.youtube_url);
      if (supported) {
        await Linking.openURL(video.youtube_url);
      }
    } catch (error) {
      console.error('Error opening video:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <VideoIcon size={24} color="#3B82F6" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{video.title}</Text>
        {video.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {video.description}
          </Text>
        ) : null}
      </View>
      <View style={styles.linkIcon}>
        <ExternalLink size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
  },
  linkIcon: {
    marginLeft: 8,
  },
});
