import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Image
          source={require('@/assets/images/Differlogo11t.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 300,
    height: 180,
  },
});
