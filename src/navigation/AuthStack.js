import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your authentication screens
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login" // Typically, Login is the first screen in the auth flow after onboarding
      screenOptions={{
        headerShown: false, // This will hide the default header for all screens in this stack
                            // Consistent with your AppNavigator's current screenOptions
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;