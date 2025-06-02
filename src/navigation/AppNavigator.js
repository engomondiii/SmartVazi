import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import AuthStack from './AuthStack'; // <-- Import the AuthStack we just created
// Import MainTabNavigator later when you create it
// import MainTabNavigator from './MainTabNavigator';

const AppRootStack = createStackNavigator(); // Renaming Stack to AppRootStack for clarity

const AppNavigator = () => {
  // Placeholder for authentication logic you'll add later
  // const { isAuthenticated } = useAuth(); // Example if you have an auth hook

  // For now, we'll define a simple flow: Onboarding -> Auth -> (eventually) MainApp
  // This structure will be refined when you implement actual authentication state.
  return (
    <AppRootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName="Onboarding" // Onboarding is the default first screen
    >
      {/* Later, you'll have conditional logic here based on auth state:
        if (isLoadingAuth) {
          return <AppRootStack.Screen name="Loading" component={AuthLoadingScreen} />;
        }
        if (!isAuthenticated) { // If user is not authenticated
          return (
            <>
              <AppRootStack.Screen name="Onboarding" component={OnboardingScreen} />
              <AppRootStack.Screen name="Auth" component={AuthStack} />
            </>
          );
        }
        // If user is authenticated
        return <AppRootStack.Screen name="MainApp" component={MainTabNavigator} />;
      */}

      {/* Simplified flow for now as per your current AppNavigator: */}
      <AppRootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AppRootStack.Screen name="Auth" component={AuthStack} />
      {/* <AppRootStack.Screen name="MainApp" component={MainTabNavigator} /> */}
      {/* MainApp stack will be added here later when user is authenticated */}

    </AppRootStack.Navigator>
  );
};

export default AppNavigator;