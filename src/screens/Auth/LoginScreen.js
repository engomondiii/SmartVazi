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
  Alert,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const theme = useAppTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setError(null);
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setIsLoading(true);
    console.log('Attempting login with:', email, password);
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'test@smartvazi.com' && password === 'password') {
        Alert.alert('Login Success!', 'Welcome back to SmartVazi!');
        // TODO: Navigate to the main part of the app after successful login
        // Example: Replace the auth stack with the main app stack
        // navigation.replace('MainApp'); // Or navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
        // 'MainApp' would be the route name for your main application navigator (e.g., MainTabNavigator)
        // This will be set up once MainTabNavigator and its screens are created.
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }, 2000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    console.log('Attempting Google login...');
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Google Login', 'Google Sign-In flow initiated (placeholder).');
    }, 1500);
  };

  const handleAppleLogin = () => {
    setIsLoading(true);
    console.log('Attempting Apple login...');
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Apple Login', 'Apple Sign-In flow initiated (placeholder).');
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
                borderColor: error && email === '' ? theme.colors.error : theme.colors.lightGrey,
                backgroundColor: theme.colors.white,
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.body.fontFamily,
              },
            ]}
            placeholder="Email Address"
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
                borderColor: error && password === '' ? theme.colors.error : theme.colors.lightGrey,
                backgroundColor: theme.colors.white,
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.body.fontFamily,
              },
            ]}
            placeholder="Password"
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
              console.log('Forgot Password pressed');
              navigation.navigate('ForgotPassword'); // <-- Updated navigation
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
            title="Log In"
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
              console.log('Sign Up pressed');
              navigation.navigate('Signup'); // <-- Updated navigation
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

// Styles remain the same as your previous version
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