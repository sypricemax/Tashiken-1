import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#E63946',
        tabBarInactiveTintColor: '#1D3557',
        headerStyle: {
          backgroundColor: '#1D3557',
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#F1FAEE',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Belt Grades',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="karate" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Tashiken Karate Club',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="meditation" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Glossary',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="book-open-variant" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}