import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase, Belt, Video } from '@/lib/supabase';
import { VideoCard } from '@/components/VideoCard';

export default function VideosScreen() {
  const [belts, setBelts] = useState<Belt[]>([]);
  const [videosByBelt, setVideosByBelt] = useState<Record<string, Video[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);

    const { data: beltsData } = await supabase
      .from('belts')
      .select('*')
      .order('order', { ascending: true });

    const { data: videosData } = await supabase
      .from('videos')
      .select('*')
      .order('order', { ascending: true });

    if (beltsData) {
      setBelts(beltsData);
    }

    if (videosData) {
      const grouped: Record<string, Video[]> = {};

      videosData.forEach((video) => {
        if (video.belt_id) {
          if (!grouped[video.belt_id]) {
            grouped[video.belt_id] = [];
          }
          grouped[video.belt_id].push(video);
        }
      });

      setVideosByBelt(grouped);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Training Videos</Text>
        <Text style={styles.subtitle}>
          Watch instructional videos organized by belt level
        </Text>
      </View>

      <View style={styles.content}>
        {belts.map((belt) => {
          const beltVideos = videosByBelt[belt.id] || [];

          if (beltVideos.length === 0) {
            return null;
          }

          return (
            <View key={belt.id} style={styles.beltSection}>
              <View style={styles.beltHeader}>
                <View style={[styles.beltIndicator, { backgroundColor: belt.color_hex }]} />
                <Text style={styles.beltTitle}>{belt.name} Belt</Text>
              </View>

              {beltVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </View>
          );
        })}

        {belts.every((belt) => !videosByBelt[belt.id] || videosByBelt[belt.id].length === 0) && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No training videos available yet</Text>
            <Text style={styles.emptySubtext}>Check back later for updates</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3B82F6',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  content: {
    padding: 16,
  },
  beltSection: {
    marginBottom: 32,
  },
  beltHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  beltIndicator: {
    width: 6,
    height: 24,
    borderRadius: 3,
    marginRight: 12,
  },
  beltTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});
