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
  Alert, // Alert can still be used for temporary feedback
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native'; // <-- Ensure CommonActions is imported

const LoginScreen = ({ navigation }) => {
  const theme = useAppTheme();

  // Email and password states are kept for UI but not strictly used for login logic in this bypass version
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Error state can still be used for non-auth errors if any

  const handleLogin = () => {
    setError(null); // Clear previous errors
    setIsLoading(true);
    console.log('Login button pressed. Bypassing authentication, navigating to MainApp...');

    // Simulate a short delay as if an API call was made
    setTimeout(() => {
      setIsLoading(false);

      // Navigate to the main part of the app, replacing the auth stack
      // This effectively simulates a successful login for development purposes
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainApp' }], // 'MainApp' is the route in AppNavigator
                                           // that renders your MainTabNavigator
        })
      );
    }, 1000); // Short delay to show loading indicator briefly
  };

  // Social login handlers remain as placeholders
  const handleGoogleLogin = () => {
    setIsLoading(true);
    console.log('Attempting Google login...');
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Google Login', 'Google Sign-In flow initiated (placeholder).');
      // Potentially also navigate to MainApp after a successful social login simulation:
      // navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'MainApp' }] }));
    }, 1500);
  };

  const handleAppleLogin = () => {
    setIsLoading(true);
    console.log('Attempting Apple login...');
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Apple Login', 'Apple Sign-In flow initiated (placeholder).');
      // Potentially also navigate to MainApp after a successful social login simulation.
    }, 1500);
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
          Welcome Back!
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
          Log in to your SmartVazi account
        </Text>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.colors.lightGrey, // No error highlighting on inputs in this bypass version
                backgroundColor: theme.colors.white,
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.body.fontFamily,
              },
            ]}
            placeholder="Email Address (optional)"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.colors.lightGrey, // No error highlighting on inputs in this bypass version
                backgroundColor: theme.colors.white,
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.body.fontFamily,
              },
            ]}
            placeholder="Password (optional)"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => {
            if (!isLoading) {
              navigation.navigate('ForgotPassword');
            }
          }}
          disabled={isLoading}
        >
          <Text style={[styles.forgotPasswordText, { color: theme.colors.secondaryAction, fontFamily: theme.typography.body.fontFamily }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {isLoading && (
          <ActivityIndicator size="large" color={theme.colors.primaryAction} style={styles.loader} />
        )}

        {!isLoading && (
          <StyledButton
            title="Log In & Proceed" // Title updated to reflect bypass
            onPress={handleLogin}
            style={styles.loginButton}
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
            onPress={handleGoogleLogin}
            disabled={isLoading}
          >
            <MaterialCommunityIcons name="google" size={24} color="#DB4437" style={styles.socialIcon} />
            <Text style={[styles.socialButtonText, { color: '#5f6368', fontFamily: theme.typography.button.fontFamily }]}>
              Sign in with Google
            </Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={[styles.socialButton, styles.appleButton, { backgroundColor: theme.colors.textPrimary }]}
              onPress={handleAppleLogin}
              disabled={isLoading}
            >
              <FontAwesome name="apple" size={24} color={theme.colors.white} style={styles.socialIcon} />
              <Text style={[styles.socialButtonText, { color: theme.colors.white, fontFamily: theme.typography.button.fontFamily, fontWeight: '600' }]}>
                Sign in with Apple
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => {
            if (!isLoading) {
              navigation.navigate('Signup');
            }
          }}
          disabled={isLoading}
        >
          <Text style={[styles.signupText, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
            Don't have an account?{' '}
            <Text style={{ color: theme.colors.primaryAction, fontWeight: 'bold' }}>
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles remain the same as your previous version.
// Ensure these styles are correctly defined in your actual file.
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
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
  },
  errorContainer: {
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
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
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    elevation: 3,
  },
  loader: {
    marginVertical: 20,
  },
  socialSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 30,
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
  signupContainer: {
    marginTop: 30,
    paddingBottom: 20,
  },
  signupText: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default LoginScreen;