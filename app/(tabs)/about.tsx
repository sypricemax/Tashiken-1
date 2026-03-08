import { View, Text, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase, ClubInfo } from '@/lib/supabase';
import { InfoSection } from '@/components/InfoSection';
import { Clock, MapPin, User, Phone, FileText } from 'lucide-react-native';
import Header from '@/components/Header';

export default function ClubInfoScreen() {
  const [clubInfo, setClubInfo] = useState<ClubInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClubInfo();
  }, []);

  const loadClubInfo = async () => {
    setLoading(true);

    const { data } = await supabase
      .from('club_info')
      .select('*')
      .maybeSingle();

    if (data) {
      setClubInfo(data);
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
          <View style={styles.header}>
            <Text style={styles.title}>Tashiken Karate Club</Text>
            <Text style={styles.subtitle}>
              Everything you need to know about training with us
            </Text>
          </View>

          {clubInfo?.general_guidance && (
            <View style={styles.guidanceContainer}>
              <InfoSection
                icon={FileText}
                title="General Guidance"
                content={clubInfo.general_guidance}
                iconColor="#EF4444"
              />
            </View>
          )}

      <View style={styles.content}>
        {clubInfo?.training_times && (
          <InfoSection
            icon={Clock}
            title="Training Times"
            content={clubInfo.training_times || 'Training times to be announced'}
            iconColor="#EF4444"
          />
        )}

        {clubInfo?.venue && (
          <InfoSection
            icon={MapPin}
            title="Venue"
            content={clubInfo.venue || 'Venue information to be announced'}
            iconColor="#3B82F6"
          />
        )}

        {clubInfo?.instructor_details && (
          <InfoSection
            icon={User}
            title="Instructors"
            content={clubInfo.instructor_details || 'Instructor details to be announced'}
            iconColor="#EF4444"
          />
        )}

        {clubInfo?.contact_info && (
          <InfoSection
            icon={Phone}
            title="Contact Us"
            content={clubInfo.contact_info || 'Contact information to be announced'}
            iconColor="#3B82F6"
          />
        )}

        {!clubInfo && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Club information will be available soon</Text>
            <Text style={styles.emptySubtext}>Please check back later</Text>
          </View>
        )}
      </View>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    textAlign: 'center',
  },
  guidanceContainer: {
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  content: {
    paddingVertical: 16,
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
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});