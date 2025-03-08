import { Stack } from 'expo-router';

export default function BeltLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[id]" 
        options={{
          headerStyle: {
            backgroundColor: '#E63946',
          },
          headerTintColor: '#fff',
          headerTitle: 'Belt Requirements',
        }} 
      />
    </Stack>
  );
}