import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { Ionicons } from '@expo/vector-icons';

// A reusable component for the item list rows
const ItemRow = ({ item, onPress }) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity style={[styles.itemRow, { borderBottomColor: theme.colors.lightGrey + '50' }]} onPress={onPress}>
      <Image source={{ uri: item.imageUrl }} style={[styles.itemThumbnail, {backgroundColor: theme.colors.lightGrey}]} />
      <View style={styles.itemTextContainer}>
        <Text style={[styles.itemRowName, { color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily, fontWeight: 'bold' }]}>
          {item.name}
        </Text>
        <Text style={[styles.itemRowCategory, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
          {item.category}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color={theme.colors.lightGrey} />
    </TouchableOpacity>
  );
};


const OutfitVisualizerScreen = ({ route, navigation }) => {
  const theme = useAppTheme();
  // Receive the 'outfit' object passed from the OutfitResultsScreen
  const { outfit } = route.params;

  // Set header options dynamically based on the outfit data
  useLayoutEffect(() => {
    if (outfit) {
      navigation.setOptions({
        title: outfit.name, // Dynamically set the header title
        headerLeft: () => ( // Add a custom back/close button
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
            <Ionicons name="close" size={30} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        ),
        headerRight: () => ( // Add a share button
            <TouchableOpacity onPress={() => Alert.alert("Share", "Sharing feature coming soon!")} style={{ marginRight: 15 }}>
              <Ionicons name="share-social-outline" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
        ),
      });
    }
  }, [navigation, outfit, theme]);

  if (!outfit) {
    // This is a fallback in case navigation parameters are missing
    return (
      <View style={[styles.fullScreenLoader, { backgroundColor: theme.colors.background }]}>
        <Text style={{ fontFamily: theme.typography.body.fontFamily, color: theme.colors.error }}>
          Error: Outfit data is missing.
        </Text>
      </View>
    );
  }

  const handleItemPress = (item) => {
    Alert.alert("View Item", `Navigation to details for "${item.name}" coming soon!`);
    // Example of cross-stack navigation you'll implement later:
    // navigation.navigate('WardrobeStack', { screen: 'ItemDetail', params: { itemId: item.id } });
  };
  
  const handleLogOutfit = () => {
    Alert.alert("Logged!", `Outfit "${outfit.name}" has been logged to your calendar (placeholder).`);
  };

  const handleSaveLook = () => {
    Alert.alert("Saved!", `Outfit "${outfit.name}" has been saved to My Looks (placeholder).`);
  };


  return (
    <ScrollView style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
      {/* Main Visualization Area */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: outfit.imageUrl }} style={styles.mainImage} resizeMode="cover" />
      </View>

      {/* Outfit Components Section */}
      <View style={styles.detailsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>
          Items in this Outfit
        </Text>
        <View style={[styles.itemListCard, {backgroundColor: theme.colors.white}]}>
            {outfit.items.map((item, index) => (
                <ItemRow key={item.id || index} item={item} onPress={() => handleItemPress(item)} />
            ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <StyledButton
            title="Wear This Outfit"
            onPress={handleLogOutfit}
            style={{flex: 1}} // Take up available space
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSaveLook}>
            <Ionicons name="bookmark-outline" size={28} color={theme.colors.primaryAction} />
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
  imageContainer: {
    // For a premium feel, the image can be the focus with minimal distraction
  },
  mainImage: {
    width: '100%',
    aspectRatio: 1, // A square visualization area, can be adjusted e.g., 4/5 for taller
    backgroundColor: '#f0f0f0',
  },
  detailsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  itemListCard: {
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    overflow: 'hidden', // Ensures children respect border radius
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
  },
  itemThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemRowName: {
    fontSize: 16,
    marginBottom: 2,
  },
  itemRowCategory: {
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 40, // Extra space for home indicator etc.
    borderTopWidth: 1,
    // borderTopColor: theme.colors.lightGrey + '50', // Use dynamic value if needed
    borderColor: '#f0f0f0',
  },
  iconButton: {
    padding: 10,
    marginLeft: 15,
    borderWidth: 1,
    // borderColor: theme.colors.primaryAction, // Use dynamic value if needed
    borderColor: '#FF6F61',
    borderRadius: 50, // Make it circular
  },
});

export default OutfitVisualizerScreen;