import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { supabase, Belt } from '@/lib/supabase';
import { BeltCard } from '@/components/BeltCard';
import { ArrowLeft } from 'lucide-react-native';
import Header from '@/components/Header';

export default function BeltsScreen() {
  const [belts, setBelts] = useState<Belt[]>([]);

  useEffect(() => {
    loadBelts();
  }, []);

  const loadBelts = async () => {
    const { data } = await supabase
      .from('belts')
      .select('*')
      .order('order', { ascending: true });

    if (data) {
      setBelts(data);
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
          <View style={styles.header}>
            <Text style={styles.title}>Shukokai Belt Grades</Text>
            <Text style={styles.subtitle}>
              Select a belt to view requirements and techniques
            </Text>
          </View>

      <View style={styles.beltsContainer}>
        {belts.map((belt) => (
          <BeltCard
            key={belt.id}
            belt={belt}
            onPress={() => router.push(`/belt/${belt.id}`)}
          />
        ))}
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
  beltsContainer: {
    paddingVertical: 16,
  },
});