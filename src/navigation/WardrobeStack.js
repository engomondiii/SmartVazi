import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your Wardrobe screens
import WardrobeListScreen from '../screens/Wardrobe/WardrobeListScreen';
import AddItemScreen from '../screens/Wardrobe/AddItemScreen';
import ItemDetailScreen from '../screens/Wardrobe/ItemDetailScreen';
import EditItemScreen from '../screens/Wardrobe/EditItemScreen'; // <-- Import EditItemScreen

const Stack = createStackNavigator();

const WardrobeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WardrobeList"
      screenOptions={{
        headerShown: false,
        // Using 'modal' presentation for screens that slide up over the main tab view.
        // The default is 'card' for a standard push animation.
        presentation: 'modal', 
      }}
    >
      <Stack.Screen
        name="WardrobeList"
        component={WardrobeListScreen}
        options={{ presentation: 'card' }} // WardrobeList should not be a modal
      />
      <Stack.Screen
        name="AddItem"
        component={AddItemScreen}
        // Inherits 'modal' presentation from screenOptions
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
        // Inherits 'modal' presentation. Can be changed to 'card' if you prefer.
      />
      <Stack.Screen // <-- Route for EditItemScreen is now active
        name="EditItem"
        component={EditItemScreen}
        // Inherits 'modal' presentation
      />
    </Stack.Navigator>
  );
};

export default WardrobeStack;
