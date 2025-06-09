import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppTheme } from '../theme/ThemeContext'; // Import theme hook

// Import your Stylist screens
import StyleMeScreen from '../screens/Stylist/StyleMeScreen';
import OutfitResultsScreen from '../screens/Stylist/OutfitResultsScreen';
import OutfitVisualizerScreen from '../screens/Stylist/OutfitVisualizerScreen';

const Stack = createStackNavigator();

const StylistStack = () => {
  const theme = useAppTheme();

  return (
    <Stack.Navigator
      initialRouteName="StyleMe"
      screenOptions={{
        headerShown: false, // Default for the stack, can be overridden per screen
      }}
    >
      <Stack.Screen
        name="StyleMe"
        component={StyleMeScreen}
      />
      <Stack.Screen
        name="OutfitResults"
        component={OutfitResultsScreen}
        options={{
          headerShown: true, // Show a standard header for the results screen
          title: 'Your Outfit Suggestions',
          headerBackTitleVisible: false,
          headerStyle: { 
            backgroundColor: theme.colors.background, 
            borderBottomWidth: 0, 
            elevation: 0, // No shadow for a flat look
          },
          headerTitleStyle: { 
            color: theme.colors.textPrimary, 
            fontFamily: theme.typography.h2.fontFamily 
          },
          headerTintColor: theme.colors.primaryAction, // Color for the back arrow
        }}
      />
      <Stack.Screen
        name="OutfitVisualizer"
        component={OutfitVisualizerScreen}
        options={{
          presentation: 'modal', // Show this as a slide-up modal for a distinct feel
          headerShown: true,
          title: 'Outfit Preview',
          headerBackTitleVisible: false,
          headerStyle: { 
            backgroundColor: theme.colors.background, 
            borderBottomWidth: 0, 
            elevation: 0 
          },
          headerTitleStyle: { 
            color: theme.colors.textPrimary, 
            fontFamily: theme.typography.h2.fontFamily 
          },
          headerTintColor: theme.colors.primaryAction,
        }}
      />
    </Stack.Navigator>
  );
};

export default StylistStack;
