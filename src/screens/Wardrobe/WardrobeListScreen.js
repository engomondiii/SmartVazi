import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  // Platform, // <-- Temporarily remove Platform import IF ONLY USED IN STYLESHEET
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { Ionicons } from '@expo/vector-icons';

// Mock Data remains the same
const MOCK_WARDROBE_ITEMS = [
  { id: 'wd1', name: 'Blue Denim Jacket', category: 'Outerwear', imageUrl: 'https://via.placeholder.com/300/77AADD/FFFFFF?text=Jacket' },
  { id: 'wd2', name: 'Floral Summer Dress', category: 'Dresses', imageUrl: 'https://via.placeholder.com/300/FFC0CB/333333?text=Dress' },
  { id: 'wd3', name: 'Classic White Tee', category: 'Tops', imageUrl: 'https://via.placeholder.com/300/EFEFEF/333333?text=T-Shirt' },
  { id: 'wd4', name: 'Black Skinny Jeans', category: 'Bottoms', imageUrl: 'https://via.placeholder.com/300/333333/FFFFFF?text=Jeans' },
  { id: 'wd5', name: 'Running Sneakers', category: 'Shoes', imageUrl: 'https://via.placeholder.com/300/A0A0A0/FFFFFF?text=Shoes' },
  { id: 'wd6', name: 'Leather Handbag', category: 'Accessories', imageUrl: 'https://via.placeholder.com/300/8B4513/FFFFFF?text=Bag' },
];

const NUM_COLUMNS = 2;
const screenWidth = Dimensions.get('window').width;

const WardrobeListScreen = ({ navigation }) => {
  const theme = useAppTheme();
  // ... (state and functions remain the same as your version) ...
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchWardrobeItems = useCallback(() => {
    console.log('Fetching wardrobe items...');
    setTimeout(() => {
      setWardrobeItems(MOCK_WARDROBE_ITEMS);
      setIsLoading(false);
      setIsRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchWardrobeItems();
  }, [fetchWardrobeItems]);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchWardrobeItems();
  };

  const navigateToAddItem = () => {
    console.log('Navigate to Add Item Screen');
    // navigation.navigate('AddItem');
  };

  const navigateToItemDetail = (item) => {
    console.log('Navigate to Item Detail:', item.name);
    // navigation.navigate('ItemDetail', { itemId: item.id });
  };

  const renderItemCard = ({ item }) => {
    const itemWidth = (screenWidth / NUM_COLUMNS) - ( (theme.spacing?.m || 16) * (NUM_COLUMNS + 1) / NUM_COLUMNS);
    return (
      <TouchableOpacity
        style={[styles.itemCard, { width: itemWidth, backgroundColor: theme.colors.white }]}
        onPress={() => navigateToItemDetail(item)}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode="cover" />
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} style={[styles.itemName, { color: theme.colors.textPrimary, fontFamily: theme.typography.fontFamily.primaryMedium || theme.typography.fontFamily.primary }]}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={[styles.itemCategory, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
            {item.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="shirt-outline" size={80} color={theme.colors.lightGrey} />
      <Text style={[styles.emptyTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>
        Your Wardrobe is Empty!
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
        Start by adding your first clothing item.
      </Text>
      <StyledButton
        title="Add First Item"
        onPress={navigateToAddItem}
        style={styles.emptyStateButton}
      />
    </View>
  );

  if (isLoading && wardrobeItems.length === 0 && !isRefreshing) {
    return (
      <View style={[styles.fullScreenLoader, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primaryAction} />
        <Text style={{ marginTop: 10, color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }}>
          Loading your wardrobe...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.lightGrey }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h1.fontFamily }]}>
          My Wardrobe
        </Text>
      </View>
      <FlatList
        data={wardrobeItems}
        renderItem={renderItemCard}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primaryAction}
          />
        }
      />
      <TouchableOpacity style={[styles.fab, { backgroundColor: theme.colors.primaryAction }]} onPress={navigateToAddItem}>
        <Ionicons name="add" size={30} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

// --- MODIFIED StyleSheet ---
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
    // paddingTop: (Platform.OS === 'ios' ? 50 : 20) + 10, // MODIFIED - Using fixed value
    paddingTop: 60, // Fixed value for testing (adjust as needed for status bar)
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContentContainer: {
    padding: 8,
    paddingBottom: 80,
  },
  itemCard: {
    margin: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // MODIFIED - Using fixed value or remove
    overflow: 'hidden', // Fixed value or remove if causing issues
  },
  itemImage: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemInfo: {
    padding: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 10,
    bottom: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: Dimensions.get('window').height / 5,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 30,
  },
  emptyStateButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
});

export default WardrobeListScreen;