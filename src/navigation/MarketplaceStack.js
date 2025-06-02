import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your Marketplace screens
import MarketplaceHomeScreen from '../screens/Marketplace/MarketplaceHomeScreen';
// Import other screens for the Marketplace section here as you create them:
// import CreateListingScreen from '../screens/Marketplace/CreateListingScreen';
// import ListingDetailScreen from '../screens/Marketplace/ListingDetailScreen';
// import MyListingsScreen from '../screens/Marketplace/MyListingsScreen';
// import ChatScreen from '../screens/Marketplace/ChatScreen';

const Stack = createStackNavigator();

const MarketplaceStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MarketplaceHome" // Define the initial route for this stack
      screenOptions={{
        headerShown: false, // Hides the default header for all screens in this stack
      }}
    >
      <Stack.Screen
        name="MarketplaceHome" // Route name for MarketplaceHomeScreen
        component={MarketplaceHomeScreen}
        // options={{ title: 'Marketplace' }} // Example if headerShown was true
      />
      {/*
        Example of how to add other screens to this stack later:

        <Stack.Screen
          name="CreateListing"
          component={CreateListingScreen} // You would need to create this screen component
          options={{
            headerShown: true, // Example: Show header for this screen
            title: 'Create New Listing',
            // headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="ListingDetail"
          component={ListingDetailScreen} // You would need to create this screen component
          options={{
            headerShown: true,
            title: 'Item Details', // Title can be dynamic based on item name
            // headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="MyListings"
          component={MyListingsScreen} // You would need to create this screen component
          options={{
            headerShown: true,
            title: 'My Listings',
            // headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen} // You would need to create this screen component
          options={{
            headerShown: true,
            title: 'Chat', // Title can be dynamic based on chat participant
            // headerBackTitleVisible: false,
          }}
        />
      */}
    </Stack.Navigator>
  );
};

export default MarketplaceStack;