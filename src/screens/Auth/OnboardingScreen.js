import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext'; // Import the custom hook

const OnboardingScreen = ({ navigation }) => {
  const theme = useAppTheme(); // Access the theme

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        Welcome to SmartVazi!
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary  }]}>
        Your AI Wardrobe & Global Fashion Marketplace
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={() => {
            // Navigate to Login or Signup, or next Onboarding step
            // For now, just a log
            console.log('Get Started pressed');
            // Example navigation: navigation.navigate('Login');
          }}
          color={theme.colors.primaryAction}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28, // Fallback if fontFamily isn't loaded/set
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18, // Fallback
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  }
});

export default OnboardingScreen;