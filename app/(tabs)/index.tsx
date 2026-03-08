import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { router } from 'expo-router';
import { BookOpen, Info, Facebook, Instagram, Youtube } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { supabase, ClubInfo } from '@/lib/supabase';
import Header from '@/components/Header';

export default function HomeScreen() {
  const [clubInfo, setClubInfo] = useState<ClubInfo | null>(null);

  useEffect(() => {
    loadClubInfo();
  }, []);

  const loadClubInfo = async () => {
    const { data } = await supabase
      .from('club_info')
      .select('*')
      .maybeSingle();

    if (data) {
      setClubInfo(data);
    }
  };

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
          <View style={styles.content}>
            <Text style={styles.clubName}>{clubInfo?.club_name || 'Karate Club'}</Text>
            <Text style={styles.welcomeText}>Master the Art of Karate</Text>

            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Linking.openURL('https://www.facebook.com/tashikenkarateclub')}
                activeOpacity={0.7}
              >
                <Facebook size={28} color="#1877F2" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Linking.openURL('https://www.instagram.com/tashikenkarateclub')}
                activeOpacity={0.7}
              >
                <Instagram size={28} color="#E4405F" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Linking.openURL('https://www.youtube.com/@tashikenkarateclub6405')}
                activeOpacity={0.7}
              >
                <Youtube size={28} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.navCard}
              onPress={() => router.push('/(tabs)/training')}
              activeOpacity={0.7}
            >
              <View style={[styles.navIconContainer, { backgroundColor: '#EF444420' }]}>
                <BookOpen size={24} color="#EF4444" />
              </View>
              <Text style={styles.navTitle}>Belt Syllabus</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navCard}
              onPress={() => router.push('/(tabs)/about')}
              activeOpacity={0.7}
            >
              <View style={[styles.navIconContainer, { backgroundColor: '#3B82F620' }]}>
                <Info size={24} color="#3B82F6" />
              </View>
              <Text style={styles.navTitle}>Club Info</Text>
            </TouchableOpacity>
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
  content: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  clubName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -1,
  },
  welcomeText: {
    fontSize: 18,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '500',
  },
  navigationContainer: {
    padding: 24,
  },
  navCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  navIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
  },
  socialButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
});
