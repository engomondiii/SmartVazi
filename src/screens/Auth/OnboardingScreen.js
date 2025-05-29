import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton'; // Your custom button
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const OnboardingScreen = ({ navigation }) => {
  const theme = useAppTheme();

  // Animation shared values
  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(20);

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);

  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(20);

  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(20);

  useEffect(() => {
    const duration = 700; // Animation duration
    const easing = Easing.out(Easing.exp); // Smooth easing

    // Staggered animations
    logoOpacity.value = withDelay(200, withTiming(1, { duration, easing }));
    logoTranslateY.value = withDelay(200, withTiming(0, { duration, easing }));

    titleOpacity.value = withDelay(400, withTiming(1, { duration, easing }));
    titleTranslateY.value = withDelay(400, withTiming(0, { duration, easing }));

    subtitleOpacity.value = withDelay(600, withTiming(1, { duration, easing }));
    subtitleTranslateY.value = withDelay(600, withTiming(0, { duration, easing }));

    buttonOpacity.value = withDelay(800, withTiming(1, { duration, easing }));
    buttonTranslateY.value = withDelay(800, withTiming(0, { duration, easing }));
  }, []); // Empty dependency array to run once on mount

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.contentContainer}>
        <Animated.View style={logoAnimatedStyle}>
          <Image
            source={require('../../../assets/images/logo.png')} // Path from your code
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={titleAnimatedStyle}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.h1.fontFamily,
                fontSize: theme.typography.h1.fontSize,
              },
            ]}
          >
            Welcome to SmartVazi Stylist!
          </Text>
        </Animated.View>

        <Animated.View style={subtitleAnimatedStyle}>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.typography.body.fontFamily,
                fontSize: theme.typography.body.fontSize,
              },
            ]}
          >
            Your AI Wardrobe & Global Fashion Marketplace
          </Text>
        </Animated.View>
      </View>

      <Animated.View style={[styles.buttonWrapper, buttonAnimatedStyle]}>
        <StyledButton
          title="Get Started"
          onPress={() => {
            console.log('Get Started pressed');
            // Example navigation: navigation.navigate('Login');
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30, // Increased padding for more "breathable space"
    paddingTop: 60,        // More space at the top
    paddingBottom: 40,     // Space at the bottom
    justifyContent: 'space-between',
    alignItems: 'center', // Center content horizontally on the screen
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%', // Ensure content container takes full width for text centering
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 180, // Slightly larger logo
    height: 180,
    marginBottom: 50, // More space below logo
  },
  title: {
    textAlign: 'center',
    marginBottom: 20, // More space below title
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 15, // Adjust as needed
    lineHeight: 24, // Explicit line height (e.g., theme.typography.body.fontSize * 1.5)
    opacity: 0.9, // Slightly softer subtitle for hierarchy
  },
  buttonWrapper: { // Wrapper for the button for better layout control if needed
    width: '80%', // Make button take a significant portion of width
    maxWidth: 350, // Max width for very large screens
    paddingBottom: 20, // Ensure some space from absolute bottom
  },
});

export default OnboardingScreen;