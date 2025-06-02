import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens and navigators
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import AuthStack from './AuthStack';
import MainTabNavigator from './MainTabNavigator'; // Ensure this is imported

const AppRootStack = createStackNavigator();

const AppNavigator = () => {
  // For this bypass setup, isAuthenticated isn't strictly controlling screen definition,
  // but rather what you might show initially if you weren't resetting from Login.
  // We will set an initial route for the navigator.
  const initialRouteName = 'Onboarding'; // Always start with Onboarding

  return (
    <AppRootStack.Navigator
      initialRouteName={initialRouteName} // Start with Onboarding
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Define all top-level navigation states your app can be in */}
      <AppRootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AppRootStack.Screen name="Auth" component={AuthStack} />
      <AppRootStack.Screen name="MainApp" component={MainTabNavigator} />
    </AppRootStack.Navigator>
  );
};

export default AppNavigator;