import { View, Text, StyleSheet, ScrollView, Pressable, Linking, AccessibilityInfo, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const BELT_REQUIREMENTS = {
  white: {
    kyu: '9th',
    kata: ['SHI-ZUKI 1'],
    combinations: ['1', '2'],
    kicks: ['Front Kick (MAE GERI)'],
    videoUrl: 'https://youtu.be/VB-GXt0pQSA?si=FahWsN_H33G2nDbd'
  },
  yellow: {
    kyu: '8th',
    kata: ['PINAN SHODAN'],
    combinations: ['1', '2', '3a'],
    kicks: ['Roundhouse (MAWASHI GERI)'],
    videoUrl: 'https://youtu.be/-3hwVkBeNrE?si=MIWxmzdpKFltxGAo'
  },
  orange: {
    kyu: '7th',
    kata: ['PINAN NIDAN'],
    combinations: ['1', '2', '3a', '3b', '4a'],
    kicks: ['Half-step Hook Kick (URA MAWASHI GERI)'],
    videoUrl: 'https://youtu.be/xnDbSXLn_p0?si=YrFhma7FR-0Gys84'
  },
  green: {
    kyu: '6th',
    kata: ['PINAN SANDAN'],
    combinations: ['1', '2', '3a', '3b', '4a', '4b', '5', '6'],
    kicks: ['Spinning Back Kick (USHIRO GERI)'],
    videoUrl: 'https://youtu.be/keCNTbGTON4?si=C7ukY-Mg1UPe-3CZ'
  },
  blue: {
    kyu: '5th',
    kata: ['PINAN YONDAN', 'PINAN GODAN'],
    combinations: ['1', '2', '3', '4', '5', '6', '7'],
    kicks: ['Half-Step Hook Kick (URA MAWASHI GERI)'],
    videoUrl: 'https://youtu.be/_8TV9YM_rYU?si=dcZcPuoUxajEwUSQ'
  },
  purple: {
    kyu: '4th',
    kata: ['ANANANKU', 'MATSUKAZI'],
    combinations: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    kicks: ['Spinning Hook Kick (URAMAE GERI)'],
    videoUrl: 'https://youtu.be/SCdzlt4oGzw?si=XxzFq3AMgplPwKit'
  },
  brown1: {
    kyu: '3rd',
    kata: ['JI-IN', 'ROHI'],
    combinations: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    kicks: ['Spinning Hook Kick', 'Jump Kick (TOBI GERI)'],
    videoUrl: 'https://youtu.be/6znHzBBeUhs?si=mxKuf6wfjkGLoO4h'
  },
  brown2: {
    kyu: '2nd',
    kata: ['BASSAI DAI', 'NISEISHI'],
    combinations: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    kicks: ['Spinning Hook Kick', 'Jump Kick (TOBI GERI)'],
    videoUrl: 'https://youtu.be/1806Qfpx0Rk?si=wutvSJOmJec4aTao'
  },
  brown3: {
    kyu: '1st',
    kata: ['Requirements to be confirmed'],
    combinations: ['Requirements to be confirmed'],
    kicks: ['2x Jump Kicks (TOBI GERI)', 'Spinning Hook Kick (URAMAE GERI)'],
    videoUrl: 'https://youtu.be/1806Qfpx0Rk?si=wutvSJOmJec4aTao'
  }
};

export default function BeltDetailsScreen() {
  const { id } = useLocalSearchParams();
  const beltId = id?.toString().toLowerCase() as keyof typeof BELT_REQUIREMENTS;
  const requirements = BELT_REQUIREMENTS[beltId];
  
  if (!requirements) {
    const errorMessage = 'Belt requirements not found';
    if (Platform.OS === 'web') {
      const element = document.createElement('div');
      element.setAttribute('role', 'alert');
      element.textContent = errorMessage;
      document.body.appendChild(element);
      setTimeout(() => document.body.removeChild(element), 3000);
    } else {
      AccessibilityInfo.announceForAccessibility(errorMessage);
    }
    
    return (
      <View 
        style={styles.container}
        accessible={true}
      >
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  const handleVideoPress = async () => {
    if (requirements.videoUrl) {
      try {
        const canOpen = await Linking.canOpenURL(requirements.videoUrl);
        if (canOpen) {
          await Linking.openURL(requirements.videoUrl);
        } else {
          const message = 'Unable to open video link';
          if (Platform.OS === 'web') {
            const element = document.createElement('div');
            element.setAttribute('role', 'alert');
            element.textContent = message;
            document.body.appendChild(element);
            setTimeout(() => document.body.removeChild(element), 3000);
          } else {
            AccessibilityInfo.announceForAccessibility(message);
          }
        }
      } catch (error) {
        console.error('Error opening video:', error);
      }
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      accessible={true}
      accessibilityLabel={`${requirements.kyu} Kyu Belt Requirements`}
    >
      <View style={styles.content}>
        <Text 
          style={styles.header}
          accessible={true}
          accessibilityLabel={`${requirements.kyu} Kyu Requirements`}
        >
          {requirements.kyu} Kyu Requirements
        </Text>
        
        <Pressable 
          onPress={handleVideoPress} 
          style={styles.videoSection}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Watch tutorial video"
          accessibilityHint="Opens YouTube to watch the belt requirement tutorial"
        >
          <View style={styles.videoButton}>
            <Ionicons name="logo-youtube" size={24} color="#E63946" />
            <Text style={styles.videoButtonText}>Watch Tutorial Video</Text>
          </View>
        </Pressable>

        <View 
          style={styles.section}
          accessible={true}
          accessibilityLabel="Kata requirements"
        >
          <Text 
            style={styles.sectionTitle}
            accessible={true}
            accessibilityLabel="Kata"
          >
            Kata
          </Text>
          {requirements.kata.map((kata, index) => (
            <View 
              key={index} 
              style={styles.requirement}
              accessible={true}
              accessibilityLabel={kata}
            >
              <View style={styles.bullet} />
              <Text 
                style={[styles.text, styles.kataText]} 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                {kata}
              </Text>
            </View>
          ))}
        </View>

        <View 
          style={styles.section}
          accessible={true}
          accessibilityLabel="Combinations requirements"
        >
          <Text 
            style={styles.sectionTitle}
            accessible={true}
            accessibilityLabel="Combinations"
          >
            Combinations
          </Text>
          <View style={styles.gridContainer}>
            {requirements.combinations.map((combo, index) => (
              <View 
                key={index} 
                style={styles.gridItem}
                accessible={true}
                accessibilityLabel={`Combination ${combo}`}
              >
                <Text style={styles.comboText}>#{combo}</Text>
              </View>
            ))}
          </View>
        </View>

        <View 
          style={styles.section}
          accessible={true}
          accessibilityLabel="Kicks requirements"
        >
          <Text 
            style={styles.sectionTitle}
            accessible={true}
            accessibilityLabel="Kicks"
          >
            Kicks
          </Text>
          {requirements.kicks.map((kick, index) => (
            <View 
              key={index} 
              style={styles.requirement}
              accessible={true}
              accessibilityLabel={kick}
            >
              <View style={styles.bullet} />
              <Text 
                style={[styles.text, styles.kickText]} 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                {kick}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FAEE',
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1D3557',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  videoSection: {
    marginBottom: 16,
  },
  videoButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 8,
  },
  videoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3557',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#E63946',
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#457B9D',
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: '#457B9D',
    lineHeight: 24,
  },
  kataText: {
    fontWeight: '500',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  kickText: {
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    backgroundColor: '#F1FAEE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#457B9D',
  },
  comboText: {
    fontSize: 14,
    color: '#1D3557',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
    color: '#E63946',
    textAlign: 'center',
    marginTop: 20,
  },
});