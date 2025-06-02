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
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { Ionicons } from '@expo/vector-icons'; // For a back icon or success/error icons

const ForgotPasswordScreen = ({ navigation }) => {
  const theme = useAppTheme();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const validateEmail = (emailToValidate) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToValidate);
  };

  const handleSendResetLink = () => {
    setError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    console.log('Requesting password reset for:', email);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For security, always show a generic success message
      // regardless of whether the email exists in the database.
      setSuccessMessage(
        `If an account exists for ${email}, password reset instructions have been sent. Please check your inbox (and spam folder).`
      );
      // setEmail(''); // Optionally clear the email field
    }, 2000);
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
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          {/* Logo is optional here, title is more direct for this utility screen */}
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.typography.h1.fontFamily }]}>
            Forgot Password?
          </Text>
          <Text style={[styles.instructionText, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
            No worries! Enter the email address associated with your SmartVazi account, and we'll send you instructions.
          </Text>

          {error && !successMessage && ( // Only show error if no success message
            <View style={styles.messageContainer}>
              <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
            </View>
          )}

          {successMessage && (
            <View style={[styles.messageContainer, styles.successContainer, { borderColor: theme.colors.success }]}>
               <Ionicons name="checkmark-circle-outline" size={24} color={theme.colors.success} style={{marginRight: 10}} />
              <Text style={[styles.successText, { color: theme.colors.success, fontFamily: theme.typography.body.fontFamily }]}>
                {successMessage}
              </Text>
            </View>
          )}

          {!successMessage && ( // Hide form if success message is shown
            <>
              <View style={styles.inputWrapper}>
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
                  placeholder="Enter your email address"
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (error) setError(null); // Clear error when user types
                  }}
                  editable={!isLoading}
                />
              </View>

              {isLoading && (
                <ActivityIndicator size="large" color={theme.colors.primaryAction} style={styles.loader} />
              )}

              {!isLoading && (
                <StyledButton
                  title="Send Reset Link"
                  onPress={handleSendResetLink}
                  style={styles.submitButton}
                />
              )}
            </>
          )}

          <TouchableOpacity
            style={styles.backToLoginContainer}
            onPress={() => navigation.navigate('Login')} // Or navigation.goBack() if appropriate
            disabled={isLoading && !successMessage} // Disable if loading and no success message
          >
            <Text style={[styles.backToLoginText, { color: theme.colors.primaryAction, fontFamily: theme.typography.button.fontFamily }]}>
              {successMessage ? 'Back to Login' : 'Remembered Password? Log In'}
            </Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center', // Center content vertically for this screen
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20, // Adjust for status bar
    left: 20,
    zIndex: 1, // Ensure it's tappable
  },
  backButton: {
    padding: 10, // Make it easier to tap
  },
  formContainer: {
    width: '100%',
    alignItems: 'center', // Center items within the form container
  },
  title: {
    fontSize: 26, // Slightly smaller than main auth titles if desired
    textAlign: 'center',
    marginBottom: 15,
  },
  instructionText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  messageContainer: {
    width: '100%',
    paddingVertical: 12,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  successContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fff0', // Very light green for success background
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  successText: {
    fontSize: 14,
    textAlign: 'center',
    flexShrink: 1, // Allow text to wrap
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  submitButton: {
    width: '100%',
    elevation: 3,
  },
  loader: {
    marginVertical: 20,
  },
  backToLoginContainer: {
    marginTop: 30,
  },
  backToLoginText: {
    fontSize: 15,
    fontWeight: 'bold', // Making it look more like a button text
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;