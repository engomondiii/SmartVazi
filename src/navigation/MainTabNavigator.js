import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '../theme/ThemeContext'; // Your theme context

// Icons (ensure you have @expo/vector-icons installed)
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Import your Stack Navigators for each tab
import HomeStack from './HomeStack';
import WardrobeStack from './WardrobeStack';
import StylistStack from './StylistStack';
import MarketplaceStack from './MarketplaceStack';
import ProfileStack from './ProfileStack';     // <-- Uncomment and ensure this file exists

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Each stack will manage its own header
        tabBarActiveTintColor: theme.colors.primaryAction, // Vibrant Coral for active tab
        tabBarInactiveTintColor: theme.colors.textSecondary, // Soft Grey for inactive
        tabBarStyle: {
          backgroundColor: theme.colors.white, // Or theme.colors.background
          borderTopColor: theme.colors.lightGrey,
          borderTopWidth: Platform.OS === 'android' ? 0 : 0.5,
          height: Platform.OS === 'ios' ? 90 : 60,
          paddingBottom: Platform.OS === 'ios' ? 30 : 5,
          paddingTop: 5,
          elevation: 5, // Shadow for Android
          shadowColor: theme.colors.textPrimary, // Shadow for iOS
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamily.secondary, // e.g., OpenSans-Regular
          fontSize: 10,
          marginBottom: Platform.OS === 'ios' ? -5 : 5,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Home Tab',
        }}
      />
      <Tab.Screen
        name="WardrobeTab"
        component={WardrobeStack}
        options={{
          tabBarLabel: 'Wardrobe',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name={focused ? 'hanger' : 'hanger'} size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Wardrobe Tab',
        }}
      />
      <Tab.Screen
        name="StylistTab"
        component={StylistStack}
        options={{
          tabBarLabel: 'Stylist',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'sparkles' : 'sparkles-outline'} size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Stylist Tab',
        }}
      />
      <Tab.Screen
        name="MarketplaceTab"
        component={MarketplaceStack}
        options={{
          tabBarLabel: 'Marketplace',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'storefront' : 'storefront-outline'} size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Marketplace Tab',
        }}
      />
      <Tab.Screen // <-- UNCOMMENTED AND ADDED PROFILE TAB
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Profile Tab',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;