import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert, // For simple alerts/placeholders
  Linking, // To open links for Terms & Privacy
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons'; // For icons

const SignupScreen = ({ navigation }) => {
  const theme = useAppTheme();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Can be a string or an object for field-specific errors

  const validateEmail = (emailToValidate) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToValidate);
  };

  const handleSignup = () => {
    setError(null); // Clear previous errors

    // Client-side validation
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) { // Example: Basic password length check
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    console.log('Attempting signup with:', { fullName, email, password, agreedToTerms });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Replace with actual signup logic & navigation
      // For now, simulate success or error
      if (email.includes('existing')) { // Simulate existing email
        setError('This email address is already registered.');
      } else {
        Alert.alert(
          'Signup Successful!',
          'Welcome to SmartVazi! Please check your email to verify your account (placeholder).',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }] // Navigate to Login after signup
        );
        // Or navigate to a VerifyEmailScreen or directly to MainApp if auto-login
        // navigation.navigate('VerifyEmail');
        // navigation.replace('MainApp');
      }
    }, 2000);
  };

  const handleSocialSignup = (provider) => {
    setIsLoading(true);
    console.log(`Attempting signup with ${provider}...`);
    // Actual Social Sign-up logic will go here
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(`${provider} Signup`, `${provider} Sign-up flow initiated (placeholder).`);
    }, 1500);
  };

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.typography.h1.fontFamily }]}>
          Create Account
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
          Join SmartVazi today!
        </Text>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.lightGrey, backgroundColor: theme.colors.white, color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}
            placeholder="Full Name"
            placeholderTextColor={theme.colors.textSecondary}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            editable={!isLoading}
          />
          <TextInput
            style={[styles.input, { borderColor: theme.colors.lightGrey, backgroundColor: theme.colors.white, color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}
            placeholder="Email Address"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
          <TextInput
            style={[styles.input, { borderColor: theme.colors.lightGrey, backgroundColor: theme.colors.white, color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}
            placeholder="Create Password (min. 8 characters)"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
          <TextInput
            style={[styles.input, { borderColor: theme.colors.lightGrey, backgroundColor: theme.colors.white, color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}
            placeholder="Confirm Password"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
          disabled={isLoading}
        >
          <Ionicons
            name={agreedToTerms ? 'checkbox' : 'square-outline'}
            size={24}
            color={agreedToTerms ? theme.colors.primaryAction : theme.colors.textSecondary}
          />
          <Text style={[styles.termsTextBase, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
            I agree to the{' '}
            <Text style={[styles.linkText, { color: theme.colors.secondaryAction }]} onPress={() => openLink('https://yourdomain.com/terms')}>
              Terms of Service
            </Text>
            {' '}and{' '}
            <Text style={[styles.linkText, { color: theme.colors.secondaryAction }]} onPress={() => openLink('https://yourdomain.com/privacy')}>
              Privacy Policy
            </Text>.
          </Text>
        </TouchableOpacity>

        {isLoading && (
          <ActivityIndicator size="large" color={theme.colors.primaryAction} style={styles.loader} />
        )}

        {!isLoading && (
          <StyledButton
            title="Create Account"
            onPress={handleSignup}
            style={styles.signupButton}
          />
        )}

        <View style={styles.socialSeparatorContainer}>
          <View style={[styles.separatorLine, { backgroundColor: theme.colors.lightGrey }]} />
          <Text style={[styles.separatorText, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
            OR
          </Text>
          <View style={[styles.separatorLine, { backgroundColor: theme.colors.lightGrey }]} />
        </View>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton, { borderColor: theme.colors.lightGrey }]}
            onPress={() => handleSocialSignup('Google')}
            disabled={isLoading}
          >
            <MaterialCommunityIcons name="google" size={24} color="#DB4437" style={styles.socialIcon} />
            <Text style={[styles.socialButtonText, { color: '#5f6368', fontFamily: theme.typography.button.fontFamily }]}>
              Sign up with Google
            </Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={[styles.socialButton, styles.appleButton, { backgroundColor: theme.colors.textPrimary }]}
              onPress={() => handleSocialSignup('Apple')}
              disabled={isLoading}
            >
              <FontAwesome name="apple" size={24} color={theme.colors.white} style={styles.socialIcon} />
              <Text style={[styles.socialButtonText, { color: theme.colors.white, fontFamily: theme.typography.button.fontFamily, fontWeight: '600' }]}>
                Sign up with Apple
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.loginLinkContainer}
          onPress={() => {
            if (!isLoading) navigation.navigate('Login');
          }}
          disabled={isLoading}
        >
          <Text style={[styles.loginLinkText, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
            Already have an account?{' '}
            <Text style={{ color: theme.colors.primaryAction, fontWeight: 'bold' }}>
              Log In
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  logoContainer: {
    marginBottom: 20, // Adjusted spacing
    alignItems: 'center',
  },
  logo: {
    width: 100, // Slightly smaller for signup if needed
    height: 100,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20, // Adjusted spacing
  },
  errorContainer: {
    width: '100%',
    paddingVertical: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 5, // Reduced margin below last input
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    marginTop: 5,
  },
  termsTextBase: {
    marginLeft: 10,
    fontSize: 13,
    flexShrink: 1, // Allow text to wrap
    lineHeight: 18,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  signupButton: {
    width: '100%',
    elevation: 3,
    marginTop: 5, // Added margin top for spacing
  },
  loader: {
    marginVertical: 20,
  },
  socialSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 25, // Adjusted spacing
  },
  separatorLine: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialLoginContainer: {
    width: '100%',
    alignItems: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    width: '100%',
    marginBottom: 15,
    minHeight: 48,
    elevation: 1,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
  },
  appleButton: {
    borderColor: 'transparent',
  },
  socialIcon: {
    marginRight: 15,
  },
  socialButtonText: {
    fontSize: 16,
  },
  loginLinkContainer: {
    marginTop: 25, // Adjusted spacing
    paddingBottom: 20,
  },
  loginLinkText: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default SignupScreen;