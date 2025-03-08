import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BELT_GRADES = [
  { id: 'white', name: '9th Kyu – White Belt', color: '#FFFFFF', border: '#000000' },
  { id: 'yellow', name: '8th Kyu – Yellow Belt', color: '#FFD700' },
  { id: 'orange', name: '7th Kyu – Orange Belt', color: '#FFA500' },
  { id: 'green', name: '6th Kyu – Green Belt', color: '#228B22' },
  { id: 'blue', name: '5th Kyu – Blue Belt', color: '#0000FF' },
  { id: 'purple', name: '4th Kyu – Purple Belt', color: '#800080' },
  { id: 'brown1', name: '3rd Kyu – Brown Belt (1 stripe)', color: '#A0522D' },
  { id: 'brown2', name: '2nd Kyu – Brown Belt (2 stripes)', color: '#8B4513' },
  { id: 'brown3', name: '1st Kyu – Brown Belt (3 stripes)', color: '#654321' }
];

export default function BeltGradesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="karate" size={48} color="#E63946" />
        <Text style={styles.header}>Tashiken Karate Club</Text>
        <Text style={styles.subtitle}>Shukokai Karate Belt System</Text>
      </View>
      
      <View style={styles.beltsContainer}>
        {BELT_GRADES.map((belt) => (
          <Pressable
            key={belt.id}
            style={[
              styles.beltCard,
              { 
                backgroundColor: belt.color,
                borderColor: belt.border || belt.color,
              },
            ]}
            onPress={() => router.push(`/belt/${belt.id}`)}
          >
            <View style={styles.beltIconContainer}>
              <MaterialCommunityIcons 
                name="karate" 
                size={24} 
                color={['white', 'yellow'].includes(belt.id) ? '#1D3557' : '#fff'} 
              />
            </View>
            <Text style={[
              styles.beltText,
              { color: ['white', 'yellow'].includes(belt.id) ? '#1D3557' : '#fff' }
            ]}>
              {belt.name}
            </Text>
            {belt.id.startsWith('brown') && (
              <View style={styles.stripesContainer}>
                {[...Array(parseInt(belt.id.slice(-1)))].map((_, index) => (
                  <View 
                    key={index} 
                    style={styles.stripe} 
                  />
                ))}
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FAEE',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#1D3557',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#A8DADC',
    marginTop: 8,
  },
  beltsContainer: {
    padding: 16,
  },
  beltCard: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  beltIconContainer: {
    marginRight: 12,
  },
  beltText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  stripesContainer: {
    flexDirection: 'row',
    gap: 4,
    marginLeft: 8,
  },
  stripe: {
    width: 20,
    height: 4,
    backgroundColor: '#E63946',
    borderRadius: 2,
  }
});