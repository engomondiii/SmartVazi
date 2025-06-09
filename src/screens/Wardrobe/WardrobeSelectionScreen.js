import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

// We'll reuse the same mock wardrobe data
const MOCK_WARDROBE_ITEMS = [
  { id: 'wd1', name: 'Blue Denim Jacket', category: 'Outerwear', imageUrl: 'https://via.placeholder.com/300/77AADD/FFFFFF?text=Jacket' },
  { id: 'wd2', name: 'Floral Summer Dress', category: 'Dresses', imageUrl: 'https://via.placeholder.com/300/FFC0CB/333333?text=Dress' },
  { id: 'wd3', name: 'Classic White Tee', category: 'Tops', imageUrl: 'https://via.placeholder.com/300/EFEFEF/333333?text=T-Shirt' },
  { id: 'wd4', name: 'Black Skinny Jeans', category: 'Bottoms', imageUrl: 'https://via.placeholder.com/300/333333/FFFFFF?text=Jeans' },
  { id: 'wd5', name: 'Running Sneakers', category: 'Shoes', imageUrl: 'https://via.placeholder.com/300/A0A0A0/FFFFFF?text=Shoes' },
  { id: 'wd6', name: 'Leather Handbag', category: 'Accessories', imageUrl: 'https://via.placeholder.com/300/8B4513/FFFFFF?text=Bag' },
];

const WardrobeSelectionScreen = ({ route, navigation }) => {
  const theme = useAppTheme();
  // Get initial selection from the screen that navigated here
  const { initialSelection = [] } = route.params;

  // This state holds the items the user is currently selecting in this screen
  const [selectedItems, setSelectedItems] = useState(initialSelection);

  const handleToggleItem = (item) => {
    setSelectedItems((prevSelected) => {
      const isAlreadySelected = prevSelected.some(i => i.id === item.id);
      if (isAlreadySelected) {
        // Unselect if already selected
        return prevSelected.filter(i => i.id !== item.id);
      } else {
        // Select if not already selected (storing only needed info)
        return [...prevSelected, { id: item.id, name: item.name }];
      }
    });
  };

  const handleDone = () => {
    // MODIFIED: Instead of calling a function, we navigate back to the previous
    // screen ('StyleMe') and pass the `selectedItems` as a parameter.
    // The `merge: true` option is important; it tells the navigator to update
    // the previous screen's params instead of pushing a new instance.
    navigation.navigate({
        name: 'StyleMe', // The route name of the screen to return to
        params: { selectedItems: selectedItems }, // The data we are passing back
        merge: true,
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedItems.some(i => i.id === item.id);
    return (
      <TouchableOpacity 
        style={[styles.itemRow, { borderBottomColor: theme.colors.lightGrey + '50' }]} 
        onPress={() => handleToggleItem(item)}
      >
        <Image source={{ uri: item.imageUrl }} style={[styles.itemThumbnail, { backgroundColor: theme.colors.lightGrey }]} />
        <View style={styles.itemTextContainer}>
          <Text style={[styles.itemName, { color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}>{item.name}</Text>
          <Text style={[styles.itemCategory, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>{item.category}</Text>
        </View>
        <Ionicons
          name={isSelected ? 'checkbox' : 'square-outline'}
          size={26}
          color={isSelected ? theme.colors.primaryAction : theme.colors.textSecondary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.lightGrey }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Ionicons name="close" size={30} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>Select Items</Text>
        <TouchableOpacity onPress={handleDone} style={styles.headerButton}>
            <Text style={[styles.doneText, { color: theme.colors.primaryAction, fontFamily: theme.typography.button.fontFamily }]}>Done</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={MOCK_WARDROBE_ITEMS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, paddingBottom: 15, paddingHorizontal: 10, borderBottomWidth: 1 },
  headerTitle: { fontSize: 20, fontWeight: '600' },
  headerButton: { padding: 10 },
  doneText: { fontSize: 16, fontWeight: '600' },
  listContent: { paddingVertical: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1 },
  itemThumbnail: { width: 50, height: 50, borderRadius: 8, marginRight: 15 },
  itemTextContainer: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '500', marginBottom: 2 },
  itemCategory: { fontSize: 14 },
});

export default WardrobeSelectionScreen;