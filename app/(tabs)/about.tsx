import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GLOSSARY_SECTIONS = {
  dojo: {
    title: 'Basic Dojo Terminology',
    terms: [
      { term: 'DOJO', definition: 'Training hall' },
      { term: 'SENSEI', definition: 'Teacher (usually for black belts)' },
      { term: 'SEMPAI', definition: 'Senior student' },
      { term: 'REI', definition: 'Bow' },
      { term: 'OSU', definition: 'A respectful acknowledgment (yes, understood, etc.)' },
      { term: 'KIAI', definition: 'Spirit shout used to generate power' },
      { term: 'GI', definition: 'Karate uniform' },
      { term: 'OBI', definition: 'Belt' },
      { term: 'KUMITE', definition: 'Sparring' },
      { term: 'KATA', definition: 'Pre-arranged sequence of movements' },
      { term: 'BUNKAI', definition: 'Application of kata techniques' },
      { term: 'KIME', definition: 'Focus or finishing energy in a technique' },
    ],
  },
  stances: {
    title: 'Shukokai Stances (DACHI)',
    terms: [
      { term: 'HEIKO DACHI', definition: 'Parallel stance' },
      { term: 'MUSUBI DACHI', definition: 'Attention stance (heels together, feet apart)' },
      { term: 'ZANSHIN DACHI', definition: 'Ready stance' },
      { term: 'SHIKO DACHI', definition: 'Horse stance (wide-legged stance)' },
      { term: 'ZUKI DACHI', definition: 'Punching stance' },
      { term: 'ZENKUTSU DACHI', definition: 'Front stance' },
      { term: 'NEKO ASHI DACHI', definition: 'Cat stance (weight mostly on back leg)' },
      { term: 'KOKUTSU DACHI', definition: 'Back stance' },
      { term: 'SANCHIN DACHI', definition: 'Hourglass stance' },
    ],
  },
  punching: {
    title: 'Punching Techniques (ZUKI/WAZA)',
    terms: [
      { term: 'OI ZUKI', definition: 'Lunge punch' },
      { term: 'GYAKU ZUKI', definition: 'Reverse punch' },
      { term: 'KIZAMI ZUKI', definition: 'Jab punch' },
      { term: 'TATE ZUKI', definition: 'Vertical fist punch' },
      { term: 'URA ZUKI', definition: 'Uppercut punch' },
      { term: 'MOROTE ZUKI', definition: 'Double punch' },
      { term: 'AGE ZUKI', definition: 'Rising punch' },
      { term: 'SHUTO UCHI', definition: 'Knife-hand strike' },
      { term: 'URAKEN UCHI', definition: 'Back-fist strike' },
      { term: 'EMPI UCHI', definition: 'Elbow strike' },
    ],
  },
  kicking: {
    title: 'Kicking Techniques (GERI)',
    terms: [
      { term: 'MAE GERI', definition: 'Front kick' },
      { term: 'MAWASHI GERI', definition: 'Roundhouse kick' },
      { term: 'YOKO GERI', definition: 'Side kick' },
      { term: 'URA MAWASHI GERI', definition: 'Hook kick' },
      { term: 'USHIRO GERI', definition: 'Spinning back kick' },
      { term: 'TOBI GERI', definition: 'Jump kick' },
      { term: 'KEAGE', definition: 'Snap kick' },
      { term: 'KEKOMI', definition: 'Thrust kick' },
    ],
  },
  blocking: {
    title: 'Blocking Techniques (UKE WAZA)',
    terms: [
      { term: 'AGE UKE', definition: 'Rising block (forearm block against high attacks)' },
      { term: 'GEDAN BARAI', definition: 'Downward block (low sweeping block)' },
      { term: 'UCHI UKE', definition: 'Inside block (deflects attacks coming from the side)' },
      { term: 'SOTO UKE', definition: 'Outside block (blocks attacks moving inward)' },
      { term: 'SHUTO UKE', definition: 'Knife-hand block' },
      { term: 'MOROTE UKE', definition: 'Reinforced block (using both hands for added strength)' },
      { term: 'JUJI UKE', definition: 'X-block (crossed-arm block for high or low attacks)' },
      { term: 'OTOSHI UKE', definition: 'Dropping block (used to stop downward strikes)' },
    ],
  },
};

export default function GlossaryScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Shukokai Karate Glossary</Text>
        
        {Object.values(GLOSSARY_SECTIONS).map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.terms.map((item, termIndex) => (
              <View key={termIndex} style={styles.termContainer}>
                <Text style={styles.term}>{item.term}</Text>
                <Text style={styles.definition}>{item.definition}</Text>
              </View>
            ))}
          </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#E63946',
  },
  termContainer: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1FAEE',
  },
  term: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3557',
    marginBottom: 4,
  },
  definition: {
    fontSize: 14,
    color: '#457B9D',
    lineHeight: 20,
  },
});