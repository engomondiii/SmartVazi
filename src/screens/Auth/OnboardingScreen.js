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
            console.log('Get Started pressed, navigating to Auth stack');
            // Updated navigation action:
            navigation.replace('Auth');
          }}
        />
      </Animated.View>
    </View>
  );
};

// Styles remain the same as your previous version
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 15,
    lineHeight: 24,
    opacity: 0.9,
  },
  buttonWrapper: {
    width: '80%',
    maxWidth: 350,
    paddingBottom: 20,
  },
});

export default OnboardingScreen;