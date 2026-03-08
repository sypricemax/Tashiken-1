import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase, Belt, Syllabus, Video } from '@/lib/supabase';
import { VideoCard } from '@/components/VideoCard';
import { InfoSection } from '@/components/InfoSection';
import { BookOpen, Zap, Move, Shield, Hand, X, Youtube, ArrowLeft } from 'lucide-react-native';
import Header from '@/components/Header';

export default function BeltDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [belt, setBelt] = useState<Belt | null>(null);
  const [syllabus, setSyllabus] = useState<Syllabus | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBeltDetails();
  }, [id]);

  const loadBeltDetails = async () => {
    setLoading(true);

    const { data: beltData } = await supabase
      .from('belts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (beltData) {
      setBelt(beltData);

      const { data: syllabusData } = await supabase
        .from('syllabus')
        .select('*')
        .eq('belt_id', id)
        .maybeSingle();

      if (syllabusData) {
        setSyllabus(syllabusData);
      }

      const { data: videosData } = await supabase
        .from('videos')
        .select('*')
        .eq('belt_id', id)
        .order('order', { ascending: true });

      if (videosData) {
        setVideos(videosData);
      }
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EF4444" />
      </View>
    );
  }

  if (!belt) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Belt not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/SampleBG.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={styles.backgroundImageStyle}
      >
        <Header />
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerSection}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <ArrowLeft size={24} color="#1F2937" />
            </TouchableOpacity>
            <View style={styles.beltTitleContainer}>
              <View style={[styles.beltColorIndicator, { backgroundColor: belt.color_hex }]} />
              <Text style={styles.beltName}>{belt.name}</Text>
            </View>
          </View>

          {belt.youtube_url && (
            <View style={styles.youtubeButtonContainer}>
              <TouchableOpacity
                style={styles.youtubeButton}
                onPress={() => Linking.openURL(belt.youtube_url!)}
                activeOpacity={0.8}
              >
                <Youtube size={24} color="#FFFFFF" />
                <Text style={styles.youtubeButtonText}>Watch Sensei's Belt Requirements Video</Text>
              </TouchableOpacity>
            </View>
          )}

          {syllabus && (
            <View style={styles.content}>
              <Text style={styles.sectionTitle}>Grading Requirements</Text>

              {syllabus.kata && (
                <InfoSection
                  icon={BookOpen}
                  title="Kata"
                  content={syllabus.kata || 'No kata requirement specified'}
                  iconColor="#EF4444"
                />
              )}

              {syllabus.combination && (
                <InfoSection
                  icon={Zap}
                  title="Combinations"
                  content={syllabus.combination || 'No combination requirement specified'}
                  iconColor="#3B82F6"
                />
              )}

              {syllabus.kick && (
                <InfoSection
                  icon={Move}
                  title="Kicks"
                  content={syllabus.kick || 'No kick requirement specified'}
                  iconColor="#EF4444"
                />
              )}

              {syllabus.stance && (
                <InfoSection
                  icon={Shield}
                  title="Stances"
                  content={syllabus.stance || 'No stance requirement specified'}
                  iconColor="#3B82F6"
                />
              )}

              {syllabus.punch && (
                <InfoSection
                  icon={Hand}
                  title="Punches"
                  content={syllabus.punch || 'No punch requirement specified'}
                  iconColor="#EF4444"
                />
              )}

              {syllabus.blocking && (
                <InfoSection
                  icon={X}
                  title="Blocking"
                  content={syllabus.blocking || 'No blocking requirement specified'}
                  iconColor="#3B82F6"
                />
              )}

              {syllabus.notes && (
                <View style={styles.notesSection}>
                  <Text style={styles.notesTitle}>Additional Notes</Text>
                  <Text style={styles.notesText}>{syllabus.notes}</Text>
                </View>
              )}

              {videos.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Training Videos</Text>
                  {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </>
              )}
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    opacity: 0.6,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
  headerSection: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    position: 'relative',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  beltTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  beltColorIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  beltName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    marginTop: 8,
  },
  notesSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#fbbf24',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  youtubeButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  youtubeButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  youtubeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});