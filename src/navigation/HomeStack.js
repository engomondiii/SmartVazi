import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen'; // Import your HomeScreen
// Import other screens for the Home section here as you create them
// e.g., import ItemDetailScreen from '../screens/Home/ItemDetailScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain" // Define a route name for your HomeScreen
      screenOptions={{
        headerShown: false, // Hides the default header for all screens in this stack
                            // Allows HomeScreen to implement a custom header or have no header
      }}
    >
      <Stack.Screen
        name="HomeMain" // This is the route name within HomeStack
        component={HomeScreen}
        // You can add options specific to HomeScreen here if needed
        // options={{ title: 'SmartVazi Home' }} // Example if headerShown was true
      />
      {/*
        Example of how to add another screen to this stack later:
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetailScreen}
          // Options for ItemDetailScreen, e.g., to show a header with a back button:
          // options={{
          //   headerShown: true,
          //   title: 'Item Details',
          //   headerBackTitleVisible: false, // Optional: hide back button text on iOS
          // }}
        />
      */}
    </Stack.Navigator>
  );
};

export default HomeStack;