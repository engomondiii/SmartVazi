import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your Profile screens
import ProfileScreen from '../screens/Profile/ProfileScreen';
// Import other screens for the Profile section here as you create them:
// import EditProfileScreen from '../screens/Profile/EditProfileScreen';
// import BodyProfileScreen from '../screens/Profile/BodyProfileScreen';
// import WishlistScreen from '../screens/Profile/WishlistScreen';
// import UserAnalyticsScreen from '../screens/Profile/UserAnalyticsScreen';
// Import SettingsScreen if it's part of this flow, or it could be its own stack/screen
// import SettingsScreen from '../screens/Settings/SettingsScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain" // Define the initial route for this stack
      screenOptions={{
        headerShown: false, // Hides the default header for all screens in this stack
      }}
    >
      <Stack.Screen
        name="ProfileMain" // Route name for ProfileScreen
        component={ProfileScreen}
        // options={{ title: 'My Profile' }} // Example if headerShown was true
      />
      {/*
        Example of how to add other screens to this stack later:

        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen} // You would need to create this screen component
          options={{
            headerShown: true, // Example: Show header for this screen
            title: 'Edit Profile',
            // headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="BodyProfile"
          component={BodyProfileScreen} // You would need to create this screen component
          options={{
            headerShown: true,
            title: 'Body Profile',
            // headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Wishlist"
          component={WishlistScreen} // You would need to create this screen component
          options={{
            headerShown: true,
            title: 'My Wishlist',
            // headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="UserAnalytics"
          component={UserAnalyticsScreen} // You would need to create this screen component
          options={{
            headerShown: true,
            title: 'My Style Analytics',
            // headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Settings" // Example: Navigating to Settings from Profile
          component={SettingsScreen} // Assuming SettingsScreen exists in src/screens/Settings/
          options={{
            headerShown: true,
            title: 'Settings',
            // headerBackTitleVisible: false,
          }}
        />
      */}
    </Stack.Navigator>
  );
};

export default ProfileStack;