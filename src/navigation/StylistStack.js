import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your Stylist screens
import StyleMeScreen from '../screens/Stylist/StyleMeScreen';
// Import other screens for the Stylist section here as you create them:
// import OutfitResultsScreen from '../screens/Stylist/OutfitResultsScreen';
// import OutfitVisualizerScreen from '../screens/Stylist/OutfitVisualizerScreen';

const Stack = createStackNavigator();

const StylistStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="StyleMe" // Define the initial route for this stack
      screenOptions={{
        headerShown: false, // Hides the default header for all screens in this stack
      }}
    >
      <Stack.Screen
        name="StyleMe" // Route name for StyleMeScreen
        component={StyleMeScreen}
        // options={{ title: 'AI Stylist' }} // Example if headerShown was true and you wanted a title
      />
      {/*
        Example of how to add other screens to this stack later:

        <Stack.Screen
          name="OutfitResults"
          component={OutfitResultsScreen} // You would need to create this screen component
          options={{
            headerShown: true, // Example: Show header for this screen
            title: 'Your Outfit Suggestions',
            headerBackTitleVisible: false, // Optional: for iOS back button
            // You can also style the header here using theme.colors etc.
            // headerStyle: { backgroundColor: theme.colors.background },
            // headerTintColor: theme.colors.textPrimary,
          }}
        />
        <Stack.Screen
          name="OutfitVisualizer"
          component={OutfitVisualizerScreen} // You would need to create this screen component
          options={{
            headerShown: true,
            title: 'Outfit Preview',
            headerBackTitleVisible: false,
          }}
        />
      */}
    </Stack.Navigator>
  );
};

export default StylistStack;