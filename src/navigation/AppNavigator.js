import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
// Import other screens and stacks here as you create them
// e.g., import AuthStack from './AuthStack';
// e.g., import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  // Later, you'll add logic here to determine if the user is authenticated
  // and show AuthStack or MainTabNavigator accordingly.
  // For now, we'll start with an Onboarding screen.

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      {/*
        Example of how you might add other stacks later:
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
      */}
    </Stack.Navigator>
  );
};

export default AppNavigator;