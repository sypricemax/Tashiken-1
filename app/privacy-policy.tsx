import { ScrollView, Text, View } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 16 }}>
        Privacy Policy
      </Text>

      <Text style={{ marginBottom: 12 }}>
        Effective date: 8 March 2026
      </Text>

      <Text style={{ marginBottom: 12 }}>
        Tashiken Karate Club respects your privacy. This Privacy Policy explains how the Tashiken Karate Club app handles information.
      </Text>

      <Text style={{ fontWeight: '700', marginBottom: 6 }}>1. About the app</Text>
      <Text style={{ marginBottom: 12 }}>
        The Tashiken Karate Club app provides karate club information, belt syllabus content, glossary information, and related club resources.
      </Text>

      <Text style={{ fontWeight: '700', marginBottom: 6 }}>2. Personal data</Text>
      <Text style={{ marginBottom: 12 }}>
        At this time, the app does not require users to create an account and does not intentionally collect personal information such as name, address, phone number, or payment information.
      </Text>

      <Text style={{ fontWeight: '700', marginBottom: 6 }}>3. App data and usage</Text>
      <Text style={{ marginBottom: 12 }}>
        The app is intended to display information and provide access to club-related content. If the app opens external links, such as YouTube or social media pages, those external services may collect data according to their own privacy policies.
      </Text>

      <Text style={{ fontWeight: '700', marginBottom: 6 }}>4. Data sharing</Text>
      <Text style={{ marginBottom: 12 }}>
        The app does not sell user data. The app does not intentionally share personal data with third parties, except where a user chooses to open an external third-party service.
      </Text>

      <Text style={{ fontWeight: '700', marginBottom: 6 }}>5. Children’s privacy</Text>
      <Text style={{ marginBottom: 12 }}>
        The app is not specifically directed at children under 13 without parental involvement. If a parent or guardian believes personal data has been provided through the app, they may contact us to request review or deletion.
      </Text>

      <Text style={{ fontWeight: '700', marginBottom: 6 }}>6. Data retention and deletion</Text>
      <Text style={{ marginBottom: 12 }}>
        Because the app does not intentionally collect or store personal user account data, there is generally no personal account data retained by the developer through normal use of the app.
      </Text>

      <Text style={{ fontWeight: '700', marginBottom: 6 }}>7. Security</Text>
      <Text style={{ marginBottom: 12 }}>
        We take reasonable steps to keep the app and related services secure. However, no method of electronic transmission or storage is completely secure.
      </Text>

      <Text style={{ fontWeight: '700', marginBottom: 6 }}>8. Third-party links</Text>
      <Text style={{ marginBottom: 12 }}>
        The app may contain links to third-party websites or services, including YouTube and social media platforms. We are not responsible for the privacy practices of those third-party services.
      </Text>

      <Text style={{ fontWeight: '700', marginBottom: 6 }}>9. Contact</Text>
      <Text style={{ marginBottom: 12 }}>
        If you have questions about this Privacy Policy, you can contact Tashiken Karate Club at: donnaspurgeon42@gmail.com
      </Text>

      <Text style={{ fontWeight: '700', marginBottom: 6 }}>10. Changes to this policy</Text>
      <Text style={{ marginBottom: 12 }}>
        We may update this Privacy Policy from time to time. Any updates will be posted on this page.
      </Text>
    </ScrollView>
  );
}



