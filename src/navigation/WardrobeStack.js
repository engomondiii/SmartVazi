import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your Wardrobe screens
import WardrobeListScreen from '../screens/Wardrobe/WardrobeListScreen';
// Import other screens for the Wardrobe section here as you create them:
// import AddItemScreen from '../screens/Wardrobe/AddItemScreen';
// import ItemDetailScreen from '../screens/Wardrobe/ItemDetailScreen';
// import EditItemScreen from '../screens/Wardrobe/EditItemScreen';

const Stack = createStackNavigator();

const WardrobeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WardrobeList" // Define the initial route for this stack
      screenOptions={{
        headerShown: false, // Hides the default header for all screens in this stack
                            // Allows screens to implement custom headers or have no header
      }}
    >
      <Stack.Screen
        name="WardrobeList" // Route name for WardrobeListScreen
        component={WardrobeListScreen}
        // options={{ title: 'My Wardrobe' }} // Example if headerShown was true
      />
      {/*
        Example of how to add other screens to this stack later:

        <Stack.Screen
          name="AddItem"
          component={AddItemScreen}
          options={{
            headerShown: true, // Example: Show header for this screen
            title: 'Add New Item',
            // You might want to customize back button, header styles etc.
            // headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetailScreen}
          options={{
            headerShown: true,
            title: 'Item Details',
            // headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItemScreen}
          options={{
            headerShown: true,
            title: 'Edit Item',
            // headerBackTitleVisible: false,
          }}
        />
      */}
    </Stack.Navigator>
  );
};

export default WardrobeStack;