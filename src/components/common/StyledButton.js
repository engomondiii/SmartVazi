import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';

const StyledButton = ({ title, onPress, style, textStyle, disabled }) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: theme.colors.primaryAction },
        disabled && styles.disabledButton,
        style, // Allow custom styles to be passed
      ]}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: theme.colors.white, // Assuming white text on primaryAction color
            fontFamily: theme.typography.button.fontFamily,
            fontSize: theme.typography.button.fontSize,
          },
          textStyle, // Allow custom text styles
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14, // Generous padding for a premium feel
    paddingHorizontal: 30,
    borderRadius: 25, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Subtle shadow for Android
    shadowColor: '#000', // Subtle shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    minWidth: 200, // Ensure a good minimum width
  },
  buttonText: {
    fontWeight: '500', // Corresponds to Medium if Montserrat-Medium is loaded
    letterSpacing: 0.5,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default StyledButton;