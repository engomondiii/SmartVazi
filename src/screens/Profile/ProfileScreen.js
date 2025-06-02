import React, { useState, useEffect, useCallback } from 'react'; // useCallback is not used, can be removed
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform, // Still imported as it might be used elsewhere or by KeyboardAvoidingView if added
  Alert,
  Linking,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// Mock User Data (Replace with actual data from auth context/API)
const MOCK_USER = {
  fullName: 'Alex Vazi',
  email: 'alex.vazi@example.com',
  avatarUrl: 'https://via.placeholder.com/150/A0A0A0/FFFFFF?text=AV', // Placeholder avatar
  membershipTier: 'StylePlus Member', // Optional - uncomment to see it
};

const ProfileScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser(MOCK_USER);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            console.log("User logged out");
            // Actual logout logic: clear token, reset auth state
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        },
      ]
    );
  };

  const navigateTo = (screenName, params = {}) => {
    if (screenName.startsWith('http')) {
        Linking.openURL(screenName).catch(err => Alert.alert("Error", "Could not open link: " + err.message));
    } else {
        console.log(`Navigating to ${screenName} with params:`, params);
        navigation.navigate(screenName, params);
    }
  };

  const ProfileOptionItem = ({ iconName, iconSet = 'Ionicons', label, onPress, isDestructive = false }) => {
    const IconComponent = iconSet === 'MaterialCommunityIcons' ? MaterialCommunityIcons :
                          iconSet === 'FontAwesome5' ? FontAwesome5 : Ionicons;
    return (
      <TouchableOpacity 
        style={[
            styles.optionItem, 
            { borderBottomColor: theme.colors.lightGrey + '50' } // Adding border color dynamically
        ]} 
        onPress={onPress}
      >
        <IconComponent
          name={iconName}
          size={22}
          color={isDestructive ? theme.colors.error : theme.colors.textSecondary}
          style={styles.optionIcon}
        />
        <Text style={[styles.optionLabel,
            { 
                color: isDestructive ? theme.colors.error : theme.colors.textPrimary, 
                fontFamily: theme.typography.body.fontFamily 
            }
        ]}>
          {label}
        </Text>
        {!isDestructive && <Ionicons name="chevron-forward" size={22} color={theme.colors.lightGrey} />}
      </TouchableOpacity>
    );
  };

  if (isLoading || !user) {
    return (
      <View style={[styles.fullScreenLoader, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primaryAction} />
        <Text style={{color: theme.colors.textPrimary, marginTop: 10, fontFamily: theme.typography.body.fontFamily}}>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 20}}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h1.fontFamily }]}>
          My Profile
        </Text>
      </View>

      <View style={[styles.userInfoSection, {borderBottomColor: theme.colors.lightGrey}]}>
        <TouchableOpacity onPress={() => navigateTo('EditProfile')}>
          <Image source={{ uri: user.avatarUrl }} style={[styles.avatar, {borderColor: theme.colors.primaryAction}]} />
          <View style={[styles.editAvatarIconContainer, {backgroundColor: theme.colors.primaryAction}]}>
            <Ionicons name="pencil" size={16} color={theme.colors.white} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.userName, { color: theme.colors.textPrimary, fontFamily: theme.typography.h1.fontFamily }]}>
          {user.fullName}
        </Text>
        <Text style={[styles.userEmail, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
          {user.email}
        </Text>
        {user.membershipTier && (
          <Text style={[styles.membershipTier, { color: theme.colors.accentGold, backgroundColor: theme.colors.accentGold + '20', fontFamily: theme.typography.body.fontFamily }]}>
            {user.membershipTier}
          </Text>
        )}
        <StyledButton
          title="Edit Profile"
          onPress={() => navigateTo('EditProfile')}
          style={styles.editProfileButton}
          textStyle={styles.editProfileButtonText}
        />
      </View>

      <View style={[styles.menuSection, {backgroundColor: theme.colors.white}]}>
        <ProfileOptionItem iconName="body-outline" label="Body Profile & Measurements" onPress={() => navigateTo('BodyProfile')} />
        <ProfileOptionItem iconName="storefront-outline" iconSet="MaterialCommunityIcons" label="My Marketplace Listings" onPress={() => navigateTo('MarketplaceTab', { screen: 'MyListings' })} />
        <ProfileOptionItem iconName="heart-outline" label="My Wishlist" onPress={() => navigateTo('Wishlist')} />
        <ProfileOptionItem iconName="analytics-outline" label="Style Analytics" onPress={() => navigateTo('UserAnalytics')} />
      </View>

      <View style={[styles.menuSection, {backgroundColor: theme.colors.white}]}>
        <ProfileOptionItem iconName="settings-outline" label="Settings" onPress={() => navigateTo('Settings')} />
        <ProfileOptionItem iconName="notifications-outline" label="Notifications" onPress={() => navigateTo('Notifications')} />
        <ProfileOptionItem iconName="help-circle-outline" label="Help & Support" onPress={() => navigateTo('HelpScreen')} />
      </View>

      <View style={[styles.menuSection, {backgroundColor: theme.colors.white}]}>
        <ProfileOptionItem iconName="shield-checkmark-outline" label="Privacy Policy" onPress={() => navigateTo('https://smartvazi.com/privacy')} />
        <ProfileOptionItem iconName="document-text-outline" label="Terms of Service" onPress={() => navigateTo('https://smartvazi.com/terms')} />
      </View>

      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={[styles.logoutButton, {borderColor: theme.colors.error}]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color={theme.colors.error} style={styles.optionIcon} />
            <Text style={[styles.optionLabel, { color: theme.colors.error, fontFamily: theme.typography.button.fontFamily }]}>
              Log Out
            </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  fullScreenLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    // paddingTop: (Platform.OS === 'ios' ? 50 : 20) + 15, // Original
    paddingTop: 60, // MODIFIED: Fixed value (adjust as needed for status bar)
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  userInfoSection: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    // borderBottomColor applied dynamically from theme
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    // borderColor applied dynamically from theme
  },
  editAvatarIconContainer: {
    position: 'absolute',
    bottom: 15, // Corresponds to marginBottom of avatar
    right: 0,
    // backgroundColor applied dynamically from theme
    padding: 6,
    borderRadius: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    marginBottom: 10,
  },
  membershipTier: {
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 20,
    // backgroundColor and color applied dynamically
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    minWidth: 150,
    marginTop: 5, // Reduced from 20 to make section more compact
  },
  editProfileButtonText: {
    fontSize: 14,
  },
  menuSection: {
    marginTop: 15, // Reduced margin between sections
    marginBottom: 0, // Remove bottom margin if sections are contiguous
    marginHorizontal: 15,
    // backgroundColor applied dynamically
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    // borderBottomColor applied dynamically
  },
  optionIcon: {
    marginRight: 20,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
  },
  logoutButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 30, // Added paddingTop for space above logout
    paddingBottom: 30,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    width: '80%',
    maxWidth: 300,
    // borderColor applied dynamically
  },
});

export default ProfileScreen;