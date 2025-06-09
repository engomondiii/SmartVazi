import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// In a real app, this data would come from your API / database
const MOCK_WARDROBE_DATABASE = {
  'wd1': {
    id: 'wd1', name: 'Blue Denim Jacket', category: 'Outerwear', subCategory: 'Jacket',
    imageUrl: 'https://via.placeholder.com/400/77AADD/FFFFFF?text=Jacket',
    colors: ['Blue'], fabrics: ['Denim', 'Cotton'], pattern: 'Solid',
    styleAttributes: ['Casual', 'Streetwear'], seasons: ['Spring', 'Autumn'], brand: 'Levi\'s',
    purchaseDate: '2023-05-20', price: '89.99', currency: 'USD',
    notes: 'A classic wardrobe staple. Goes with everything!',
    wearCount: 12, lastWorn: '2024-05-15',
  },
  'wd2': {
    id: 'wd2', name: 'Floral Summer Dress', category: 'Dresses', subCategory: 'Maxi Dress',
    imageUrl: 'https://via.placeholder.com/400/FFC0CB/333333?text=Dress',
    colors: ['Pink', 'Green', 'White'], fabrics: ['Cotton', 'Viscose'], pattern: 'Floral',
    styleAttributes: ['Bohemian', 'Casual'], seasons: ['Summer'], brand: 'Zara',
    purchaseDate: '2023-06-10', price: '59.99', currency: 'USD',
    notes: 'Perfect for beach holidays or summer parties.',
    wearCount: 5, lastWorn: '2023-08-22',
  },
  // Add other items from MOCK_WARDROBE_ITEMS with full details here if needed...
};

const AttributeTag = ({ label }) => {
    const theme = useAppTheme();
    return (
        <View style={[styles.tag, {backgroundColor: theme.colors.background, borderColor: theme.colors.lightGrey}]}>
            <Text style={[styles.tagText, {color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily}]}>{label}</Text>
        </View>
    );
};

const AnalyticsRow = ({ iconName, label, value }) => {
    const theme = useAppTheme();
    return (
        <View style={styles.analyticsRow}>
            <Ionicons name={iconName} size={22} color={theme.colors.secondaryAction} />
            <Text style={[styles.analyticsLabel, {color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily}]}>{label}</Text>
            <Text style={[styles.analyticsValue, {color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily}]}>{value}</Text>
        </View>
    );
};


const ItemDetailScreen = ({ route, navigation }) => {
  const theme = useAppTheme();
  const { itemId } = route.params;

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching item details from a database using the itemId
    console.log("Fetching details for item:", itemId);
    setTimeout(() => {
      const foundItem = MOCK_WARDROBE_DATABASE[itemId];
      if (foundItem) {
        setItem(foundItem);
      } else {
        Alert.alert("Error", "Item not found.", [{ text: "OK", onPress: () => navigation.goBack() }]);
      }
      setIsLoading(false);
    }, 500);
  }, [itemId, navigation]);

  const handleEdit = () => {
    console.log("Navigate to Edit Item Screen");
    navigation.navigate('EditItem', { itemId: item.id }); // <-- MODIFIED
  };

  useLayoutEffect(() => {
      if (item) {
          navigation.setOptions({
              headerShown: true,
              title: item.name,
              headerTitleStyle: { fontFamily: theme.typography.h2.fontFamily, fontSize: 18 },
              headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                      <Ionicons name="close" size={30} color={theme.colors.textPrimary} />
                  </TouchableOpacity>
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row', marginRight: 15}}>
                  <TouchableOpacity onPress={handleEdit} style={{paddingHorizontal: 8}}>
                    <Ionicons name="pencil-outline" size={24} color={theme.colors.textPrimary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleMoreOptions} style={{paddingHorizontal: 8}}>
                    <Ionicons name="ellipsis-vertical" size={24} color={theme.colors.textPrimary} />
                  </TouchableOpacity>
                </View>
              ),
          });
      }
  }, [navigation, item, theme, handleEdit]); // handleEdit added to dependency array


  const handleDelete = () => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Item deleted:", item.id);
            // In a real app, you would dispatch a delete action here
            // and then navigate back.
            navigation.goBack();
          },
        },
      ]
    );
  };
  
  const handleMoreOptions = () => {
      Alert.alert(
          'More Options',
          '',
          [
              { text: 'List on Marketplace', onPress: () => console.log('List on Marketplace pressed') },
              { text: 'Find Similar Items', onPress: () => console.log('Find Similar pressed') },
              { text: 'Delete Item', onPress: handleDelete, style: 'destructive' },
              { text: 'Cancel', style: 'cancel' },
          ],
          { cancelable: true }
      );
  };


  if (isLoading) {
    return (
      <View style={[styles.fullScreenLoader, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primaryAction} />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={[styles.fullScreenLoader, { backgroundColor: theme.colors.background }]}>
        <Text style={{fontFamily: theme.typography.body.fontFamily, color: theme.colors.textPrimary}}>Item not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.mainImage} />
      
      <View style={styles.contentContainer}>
        {/* Primary Info */}
        <Text style={[styles.itemName, {color: theme.colors.textPrimary, fontFamily: theme.typography.h1.fontFamily}]}>{item.name}</Text>
        <Text style={[styles.itemCategory, {color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily}]}>{item.category} / {item.subCategory}</Text>
      
        {/* Details & Attributes */}
        <View style={[styles.sectionCard, {backgroundColor: theme.colors.white}]}>
            <Text style={[styles.sectionTitle, {fontFamily: theme.typography.h2.fontFamily, color: theme.colors.textPrimary}]}>Details</Text>
            {item.brand && <Text style={styles.detailText}><Text style={styles.detailLabel}>Brand: </Text>{item.brand}</Text>}
            <View style={styles.tagContainer}>
                {item.colors.map(color => <AttributeTag key={color} label={color} />)}
                {item.fabrics.map(fabric => <AttributeTag key={fabric} label={fabric} />)}
                {item.styleAttributes.map(style => <AttributeTag key={style} label={style} />)}
                {item.seasons.map(season => <AttributeTag key={season} label={season} />)}
            </View>
            {item.notes && <Text style={styles.notesText}><Text style={styles.detailLabel}>Notes: </Text>{item.notes}</Text>}
        </View>

        {/* Item Analytics */}
        <View style={[styles.sectionCard, {backgroundColor: theme.colors.white}]}>
            <Text style={[styles.sectionTitle, {fontFamily: theme.typography.h2.fontFamily, color: theme.colors.textPrimary}]}>Analytics</Text>
            <AnalyticsRow iconName="repeat-outline" label="Worn" value={`${item.wearCount} times`} />
            <AnalyticsRow iconName="calendar-outline" label="Last Worn" value={item.lastWorn} />
            <AnalyticsRow iconName="cash-outline" label="Cost Per Wear" value={`$${(parseFloat(item.price) / item.wearCount).toFixed(2)}`} />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
            <StyledButton 
                title="Add to Outfit" 
                onPress={() => console.log("Add to Outfit Pressed")}
                style={{flex: 1, marginRight: 10}} 
            />
            <StyledButton 
                title="List on Marketplace" 
                onPress={() => console.log("List on Marketplace Pressed")} 
                style={{flex: 1, backgroundColor: theme.colors.secondaryAction}}
            />
        </View>
      </View>
    </ScrollView>
  );
};

// --- Styles remain the same ---
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  fullScreenLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    aspectRatio: 1,
  },
  contentContainer: {
    padding: 20,
  },
  itemName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  itemCategory: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  detailText: {
      fontSize: 16,
      marginBottom: 10,
      lineHeight: 22,
  },
  detailLabel: {
      fontWeight: '600',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 13,
  },
  notesText: {
      fontSize: 15,
      fontStyle: 'italic',
      lineHeight: 22,
      marginTop: 5,
  },
  analyticsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  analyticsLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  analyticsValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  }
});

export default ItemDetailScreen;
