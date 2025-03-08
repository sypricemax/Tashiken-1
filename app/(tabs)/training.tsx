import { View, Text, StyleSheet, ScrollView, Image, Linking, AccessibilityInfo, Platform } from 'react-native';

const SCORING_SECTIONS = [
  { name: 'BASICS YOI', description: 'Readiness, posture, and discipline before movement' },
  { name: 'BASICS KAMAE', description: 'Fighting stance, guard position, and balance' },
  { name: 'ASHI BARAI', description: 'Foot sweeps and movement control' },
  { name: 'COMBINATIONS', description: 'Execution of set sequences with accuracy and flow' },
  { name: 'KICKS', description: 'Accuracy, power, and control of kicks' },
  { name: 'KATA', description: 'Performance of the required kata with correct technique, timing, and spirit' },
  { name: 'PADWORK PUNCHING', description: 'Power, speed, and accuracy in punch drills' },
  { name: 'PADWORK KICKING', description: 'Execution of kicks on pads with precision and control' },
  { name: 'KUMITE', description: 'Controlled sparring, demonstrating skill, timing, and strategy' },
];

const CONTACT_INFO = {
  instructors: [
    {
      name: 'Sensei Chris Spurgeon',
      title: 'Chief Instructor',
      rank: '4th Dan'
    },
    {
      name: 'Sensei Donna Spurgeon',
      title: 'Club Secretary',
      rank: '2nd Dan'
    }
  ],
  phone: '07729832565',
  email: 'donnaspurgeon42@gmail.com'
};

export default function TrainingScreen() {
  const handleEmailPress = async () => {
    try {
      const url = `mailto:${CONTACT_INFO.email}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        // Announce error to screen readers
        const message = 'Unable to open email application';
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
      console.error('Error opening email:', error);
    }
  };

  const handlePhonePress = async () => {
    try {
      const url = `tel:${CONTACT_INFO.phone}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        // Announce error to screen readers
        const message = 'Unable to open phone application';
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
      console.error('Error opening phone:', error);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      accessibilityRole="main"
      accessibilityLabel="Tashiken Karate Club Information"
    >
      <View style={styles.content}>
        <Text 
          style={styles.header}
          accessibilityRole="header"
          accessibilityLabel="Tashiken Karate Club"
        >
          Tashiken Karate Club
        </Text>
        
        <View 
          style={styles.logoContainer}
          accessibilityRole="image"
          accessibilityLabel="Karate training image"
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2142&auto=format&fit=crop' }}
            style={styles.logo}
            resizeMode="cover"
            accessibilityLabel="Karate training demonstration"
          />
        </View>

        <Text style={styles.sectionHeader}>Introduction to Shukokai Karate</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What is Shukokai Karate?</Text>
          <Text style={styles.infoText}>
            Shukokai Karate is a dynamic and efficient martial art known for its fast, powerful strikes and scientific approach to movement and biomechanics. Developed in Japan, Shukokai focuses on maximizing speed and impact while maintaining fluidity and control. It is a highly practical style, making it effective in both self-defense and sport karate.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Origins of Shukokai</Text>
          <Text style={styles.infoText}>
            Shukokai was founded by CHOJIRO TANI in the 1940s, evolving from the Shito-Ryu style of Karate. Tani Sensei refined traditional techniques to emphasize body mechanics, weight transfer, and explosive power, setting Shukokai apart from other styles.
          </Text>
          <Text style={styles.infoText}>
            The name Shukokai (修交会) translates to "Way for All", reflecting its inclusive and adaptable nature.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Key Principles of Shukokai Karate</Text>
          <View style={styles.principleItem}>
            <Text style={styles.principleBullet}>•</Text>
            <Text style={styles.principleText}>
              <Text style={styles.bold}>Speed and Power</Text> – Techniques are designed to generate maximum power through hip rotation and body movement.
            </Text>
          </View>
          <View style={styles.principleItem}>
            <Text style={styles.principleBullet}>•</Text>
            <Text style={styles.principleText}>
              <Text style={styles.bold}>Efficiency of Movement</Text> – Unlike rigid styles, Shukokai emphasizes relaxed, fluid motions that allow faster strikes and improved reaction time.
            </Text>
          </View>
          <View style={styles.principleItem}>
            <Text style={styles.principleBullet}>•</Text>
            <Text style={styles.principleText}>
              <Text style={styles.bold}>Double-Hip Rotation</Text> – A unique feature of Shukokai, this method of generating force allows for powerful punches and kicks with minimal energy loss.
            </Text>
          </View>
          <View style={styles.principleItem}>
            <Text style={styles.principleBullet}>•</Text>
            <Text style={styles.principleText}>
              <Text style={styles.bold}>Adaptability</Text> – While rooted in traditional kata, Shukokai is highly practical for both self-defense and competitive karate.
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Shukokai Training</Text>
          <Text style={styles.infoText}>Training in Shukokai Karate typically includes:</Text>
          <View style={styles.trainingList}>
            <Text style={styles.trainingItem}>• Kihon (Basics): Stances, punches, blocks, and kicks</Text>
            <Text style={styles.trainingItem}>• Kata (Forms): Pre-arranged sequences developing technique and discipline</Text>
            <Text style={styles.trainingItem}>• Kumite (Sparring): Controlled fighting practice to improve reaction time and strategy</Text>
            <Text style={styles.trainingItem}>• Padwork & Impact Training: Developing explosive power through target striking</Text>
            <Text style={styles.trainingItem}>• Self-Defense Techniques: Practical applications for real-world situations</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Why Choose Shukokai Karate?</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Text style={styles.checkmark}>✅</Text>
              <Text style={styles.benefitText}>Powerful & Effective – Uses science to maximize force</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.checkmark}>✅</Text>
              <Text style={styles.benefitText}>Fast & Dynamic – Emphasizes speed and fluid movement</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.checkmark}>✅</Text>
              <Text style={styles.benefitText}>Great for All Ages – Suitable for both beginners and advanced practitioners</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.checkmark}>✅</Text>
              <Text style={styles.benefitText}>Traditional Yet Practical – Strong roots in Karate history with real-world applications</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Contact Us</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.instructorsContainer}>
            {CONTACT_INFO.instructors.map((instructor, index) => (
              <View key={index} style={styles.instructorCard}>
                <Text style={styles.instructorName}>{instructor.name}</Text>
                <Text style={styles.instructorTitle}>{instructor.title}</Text>
                <Text style={styles.instructorRank}>{instructor.rank}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.contactDetails}>
            <Text 
              style={styles.contactLink}
              onPress={handlePhonePress}
              accessibilityRole="button"
              accessibilityLabel={`Call us at ${CONTACT_INFO.phone}`}
              accessibilityHint="Opens your phone app to make a call"
            >
              📞 {CONTACT_INFO.phone}
            </Text>
            <Text 
              style={styles.contactLink}
              onPress={handleEmailPress}
              accessibilityRole="button"
              accessibilityLabel={`Email us at ${CONTACT_INFO.email}`}
              accessibilityHint="Opens your email app to send an email"
            >
              ✉️ {CONTACT_INFO.email}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Grading System</Text>
        
        <View style={[styles.infoCard, styles.gradingCard]}>
          <Text style={styles.infoText}>
            Each section is scored on a 1-10 scale, with 1 being Poor and 10 being Excellent.
          </Text>
        </View>

        <Text style={styles.subHeader}>Scoring Sections</Text>
        {SCORING_SECTIONS.map((section, index) => (
          <View key={index} style={styles.scoringCard}>
            <Text style={styles.scoringTitle}>{section.name}</Text>
            <Text style={styles.scoringDescription}>{section.description}</Text>
            <View style={styles.scoreScale}>
              {[1, 10].map(score => (
                <View key={score} style={styles.scorePoint}>
                  <Text style={styles.scoreNumber}>{score}</Text>
                  <Text style={styles.scoreLabel}>
                    {score === 1 ? 'Poor' : 'Excellent'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.subHeader}>Scoring Requirements</Text>
        <View style={styles.requirementsCard}>
          <View style={styles.requirement}>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✅</Text>
            </View>
            <View style={styles.requirementContent}>
              <Text style={styles.requirementTitle}>Adults (16+)</Text>
              <Text style={styles.requirementText}>
                Must achieve at least 50% overall and fail no more than 2 sections
              </Text>
            </View>
          </View>
          <View style={[styles.requirement, styles.lastRequirement]}>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✅</Text>
            </View>
            <View style={styles.requirementContent}>
              <Text style={styles.requirementTitle}>Cadets (15 and under)</Text>
              <Text style={styles.requirementText}>
                Must achieve at least 40% overall and fail no more than 2 sections
              </Text>
            </View>
          </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
    color: '#1D3557',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
    color: '#1D3557',
    textAlign: 'center',
  },
  logoContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
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
  gradingCard: {
    backgroundColor: '#E63946',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#457B9D',
    lineHeight: 24,
    marginBottom: 12,
  },
  principleItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 8,
  },
  principleBullet: {
    fontSize: 16,
    color: '#E63946',
    marginRight: 8,
    marginTop: 2,
  },
  principleText: {
    flex: 1,
    fontSize: 16,
    color: '#457B9D',
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
    color: '#1D3557',
  },
  trainingList: {
    marginTop: 8,
  },
  trainingItem: {
    fontSize: 16,
    color: '#457B9D',
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 8,
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkmark: {
    fontSize: 16,
    marginRight: 8,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: '#457B9D',
    lineHeight: 24,
  },
  instructorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  instructorCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: '#F1FAEE',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E63946',
  },
  instructorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 16,
    color: '#457B9D',
    marginBottom: 2,
  },
  instructorRank: {
    fontSize: 16,
    color: '#E63946',
    fontWeight: '600',
  },
  contactDetails: {
    alignItems: 'center',
    gap: 8,
  },
  contactLink: {
    fontSize: 16,
    color: '#457B9D',
    textDecorationLine: 'underline',
    padding: 8,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#1D3557',
  },
  scoringCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
  },
  scoringTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 4,
  },
  scoringDescription: {
    fontSize: 15,
    color: '#457B9D',
    marginBottom: 12,
  },
  scoreScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1FAEE',
  },
  scorePoint: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#457B9D',
    marginTop: 2,
  },
  requirementsCard: {
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
  requirement: {
    flexDirection: 'row',
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1FAEE',
  },
  lastRequirement: {
    paddingBottom: 0,
    marginBottom: 0,
    borderBottomWidth: 0,
  },
  requirementContent: {
    flex: 1,
  },
  requirementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 14,
    color: '#457B9D',
    lineHeight: 20,
  },
  checkmarkText: {
    fontSize: 16,
  },
});