import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, SectionList, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';
import { Search } from 'lucide-react-native';
import Header from '@/components/Header';

interface GlossaryTerm {
  id: string;
  term: string;
  pronunciation: string;
  meaning: string;
  category: string;
  sort_order: number;
}

interface Section {
  title: string;
  data: GlossaryTerm[];
}

export default function GlossaryScreen() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<Section[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlossaryTerms();
  }, []);

  useEffect(() => {
    filterTerms();
  }, [searchQuery, terms]);

  const fetchGlossaryTerms = async () => {
    try {
      const { data, error } = await supabase
        .from('glossary_terms')
        .select('*')
        .order('category', { ascending: true })
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTerms(data || []);
    } catch (error) {
      console.error('Error fetching glossary:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTerms = () => {
    let filtered = terms;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = terms.filter(
        (term) =>
          term.term.toLowerCase().includes(query) ||
          term.meaning.toLowerCase().includes(query) ||
          term.pronunciation?.toLowerCase().includes(query)
      );
    }

    // Group by category
    const grouped = filtered.reduce((acc, term) => {
      const category = term.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(term);
      return acc;
    }, {} as Record<string, GlossaryTerm[]>);

    const sections: Section[] = Object.entries(grouped).map(([category, data]) => ({
      title: category,
      data,
    }));

    setFilteredTerms(sections);
  };

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: GlossaryTerm }) => (
    <View style={styles.termCard}>
      <Text style={styles.termText}>{item.term}</Text>
      {item.pronunciation && (
        <Text style={styles.pronunciationText}>({item.pronunciation})</Text>
      )}
      <Text style={styles.meaningText}>{item.meaning}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading glossary...</Text>
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
        <StatusBar style="light" />
        <Header />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Karate Glossary</Text>
          <Text style={styles.headerSubtitle}>Japanese Terms & Meanings</Text>
        </View>

        <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search terms..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <SectionList
        sections={filteredTerms}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No terms found</Text>
          </View>
        }
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
    letterSpacing: 0.5,
  },
  termCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  termText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  pronunciationText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  meaningText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
});
