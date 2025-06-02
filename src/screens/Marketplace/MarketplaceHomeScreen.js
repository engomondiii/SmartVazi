import React, { useState, useEffect, useCallback } from 'react'; // useMemo was imported but not used, removed
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView, // For horizontal categories
  Dimensions,
  // Platform, // We are removing direct Platform.OS usage from StyleSheet.create
  RefreshControl,
  Alert,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const NUM_COLUMNS = 2;

// Mock Data
const MOCK_CATEGORIES = [
  { id: 'cat1', name: 'Dresses' },
  { id: 'cat2', name: 'Outerwear' },
  { id: 'cat3', name: 'Tops' },
  { id: 'cat4', name: 'Bottoms' },
  { id: 'cat5', name: 'Shoes' },
  { id: 'cat6', name: 'Accessories' },
  { id: 'cat7', name: 'Swap Only' },
];

const MOCK_LISTINGS_ALL = [
  { id: 'm1', name: 'Vintage Floral Maxi Dress', price: '$65', condition: 'Gently Used', size: 'M', imageUrl: 'https://via.placeholder.com/300/FFC0CB/333333?text=Dress+1', category: 'Dresses', seller: 'UserA' },
  { id: 'm2', name: 'Leather Biker Jacket', price: '$120', condition: 'Excellent', size: 'S', imageUrl: 'https://via.placeholder.com/300/333333/FFFFFF?text=Jacket+1', category: 'Outerwear', seller: 'UserB' },
  { id: 'm3', name: 'Silk Camisole Top', price: '$30', condition: 'New with Tags', size: 'XS', imageUrl: 'https://via.placeholder.com/300/E6E6FA/333333?text=Top+1', category: 'Tops', seller: 'UserC' },
  { id: 'm4', name: 'Designer Handbag', price: '$250', condition: 'Like New', size: 'N/A', imageUrl: 'https://via.placeholder.com/300/B08D57/FFFFFF?text=Bag+1', category: 'Accessories', seller: 'UserD' },
  { id: 'm5', name: 'Bohemian Print Skirt', price: '$40', condition: 'Gently Used', size: 'M', imageUrl: 'https://via.placeholder.com/300/90EE90/333333?text=Skirt+1', category: 'Bottoms', seller: 'UserE' },
  { id: 'm6', name: 'Statement Necklace', price: '$22', condition: 'Good', size: 'N/A', imageUrl: 'https://via.placeholder.com/300/FFD700/333333?text=Necklace', category: 'Accessories', seller: 'UserF' },
  { id: 'm7', name: 'Classic Trench Coat', price: '$90', condition: 'Very Good', size: 'L', imageUrl: 'https://via.placeholder.com/300/F5DEB3/333333?text=Coat', category: 'Outerwear', seller: 'UserG' },
  { id: 'm8', name: 'Ankle Strap Heels', price: '$55', condition: 'Like New', size: '7', imageUrl: 'https://via.placeholder.com/300/ADD8E6/333333?text=Heels', category: 'Shoes', seller: 'UserH' },
];

const ITEMS_PER_PAGE = 6;

const MarketplaceHomeScreen = ({ navigation }) => {
  const theme = useAppTheme();

  const [listings, setListings] = useState([]);
  // const [displayedListings, setDisplayedListings] = useState([]); // Not used in the provided code, can be removed
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const fetchListings = useCallback((page = 1, searchQuery = searchText, category = selectedCategory, isRefresh = false) => {
    if (!isRefresh && page === 1) setIsLoading(true); // Main loader for initial/filter/search
    else if (!isRefresh && page > 1) setIsLoadingMore(true);

    console.log(`Fetching listings... Page: ${page}, Search: ${searchQuery}, Category: ${category}`);

    setTimeout(() => {
      let filteredData = MOCK_LISTINGS_ALL;
      if (searchQuery) {
        filteredData = filteredData.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (category && category !== 'all') { // Assuming 'all' might be represented by null selectedCategory
        filteredData = filteredData.filter(item => item.category === category);
      }

      const newItems = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

      if (page === 1 || isRefresh) {
        setListings(newItems);
      } else {
        setListings(prevListings => [...prevListings, ...newItems]);
      }

      if (newItems.length < ITEMS_PER_PAGE || (page * ITEMS_PER_PAGE >= filteredData.length)) {
        setAllDataLoaded(true);
      } else {
        setAllDataLoaded(false);
      }

      setIsLoading(false);
      setIsRefreshing(false);
      setIsLoadingMore(false);
    }, 1000);
  }, [searchText, selectedCategory]);

  useEffect(() => {
    fetchListings(1, searchText, selectedCategory, true);
  }, [searchText, selectedCategory, fetchListings]);


  const handleSearch = (text) => {
    setSearchText(text);
    setCurrentPage(1);
    setAllDataLoaded(false);
  };

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
    setCurrentPage(1);
    setAllDataLoaded(false);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    setAllDataLoaded(false);
    fetchListings(1, searchText, selectedCategory, true);
  };

  const loadMoreItems = () => {
    if (!isLoadingMore && !allDataLoaded) {
      console.log("Loading more items...");
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchListings(nextPage, searchText, selectedCategory);
    }
  };

  const navigateToCreateListing = () => {
    console.log('Navigate to Create Listing');
    // navigation.navigate('CreateListing');
  };

  const navigateToItemDetail = (item) => {
    console.log('Navigate to Item Detail:', item.name);
    // navigation.navigate('ListingDetail', { itemId: item.id });
  };

  const navigateToFilters = () => Alert.alert("Filters", "Filter screen/modal coming soon!");

  const renderHeader = () => (
    <View style={[styles.headerContainer, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.lightGrey }]}>
      <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h1.fontFamily }]}>
        Marketplace
      </Text>
      <View style={styles.headerActions}>
        <TouchableOpacity onPress={navigateToFilters} style={styles.iconButton}>
          <Ionicons name="filter-outline" size={26} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
      <TextInput
        style={[styles.searchInput, {
          backgroundColor: theme.colors.white,
          color: theme.colors.textPrimary,
          fontFamily: theme.typography.body.fontFamily,
          borderColor: theme.colors.lightGrey
        }]}
        placeholder="Search items, brands..."
        placeholderTextColor={theme.colors.textSecondary}
        value={searchText}
        onChangeText={handleSearch}
        returnKeyType="search"
      />
    </View>
  );

  const renderCategoryPill = ({ item }) => (
    <TouchableOpacity
      key={item.id} // Added key here for mapped components
      style={[
        styles.categoryPill,
        { backgroundColor: selectedCategory === item.name ? theme.colors.primaryAction : theme.colors.white,
          borderColor: selectedCategory === item.name ? theme.colors.primaryAction : theme.colors.lightGrey,
        },
      ]}
      onPress={() => handleSelectCategory(item.name)}
    >
      <Text style={[styles.categoryPillText, {
        color: selectedCategory === item.name ? theme.colors.white : theme.colors.textPrimary,
        fontFamily: theme.typography.body.fontFamily
        }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderListingItemCard = ({ item }) => {
    // TODO: Extract this to src/components/featureSpecific/MarketplaceListingCard.js
    const cardMargin = theme.spacing?.m ? theme.spacing.m / 2 : 8; // Default to 8 if theme.spacing.m is not defined
    const itemWidth = (screenWidth / NUM_COLUMNS) - (cardMargin * NUM_COLUMNS) + (cardMargin / NUM_COLUMNS) - 5; // Adjusted calculation
    return (
      <TouchableOpacity
        style={[styles.listingCard, { width: itemWidth, backgroundColor: theme.colors.white, margin: cardMargin }]}
        onPress={() => navigateToItemDetail(item)}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.listingImage} resizeMode="cover" />
        <View style={styles.listingInfo}>
          <Text numberOfLines={2} style={[styles.listingName, { color: theme.colors.textPrimary, fontFamily: theme.typography.fontFamily.primaryMedium || theme.typography.fontFamily.primary }]}>
            {item.name}
          </Text>
          <Text style={[styles.listingPrice, { color: theme.colors.primaryAction, fontFamily: theme.typography.h2.fontFamily }]}>
            {item.price}
          </Text>
          <Text numberOfLines={1} style={[styles.listingExtraInfo, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
            Size: {item.size} | {item.condition}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="store-search-outline" size={80} color={theme.colors.lightGrey} />
      <Text style={[styles.emptyTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>
        No Treasures Found Yet!
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
        Try adjusting your search or be the first to list something amazing.
      </Text>
      <StyledButton
        title="List Your Item"
        onPress={navigateToCreateListing}
        style={styles.emptyStateButton}
      />
    </View>
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color={theme.colors.primaryAction} />;
  };

  if (isLoading && listings.length === 0 && !isRefreshing) {
    return (
      <View style={[styles.fullScreenLoader, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primaryAction} />
        <Text style={{ marginTop: 10, color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }}>
          Loading Marketplace...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
      {renderHeader()}
      {renderSearchBar()}

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          <TouchableOpacity
            style={[
              styles.categoryPill,
              { backgroundColor: !selectedCategory ? theme.colors.primaryAction : theme.colors.white,
                borderColor: !selectedCategory ? theme.colors.primaryAction : theme.colors.lightGrey,
              },
            ]}
            onPress={() => handleSelectCategory(null)}
          >
            <Text style={[styles.categoryPillText, {
              color: !selectedCategory ? theme.colors.white : theme.colors.textPrimary,
              fontFamily: theme.typography.body.fontFamily
              }]}>
              All
            </Text>
          </TouchableOpacity>
          {categories.map(cat => renderCategoryPill({ item: cat }))}
        </ScrollView>
      </View>

      <FlatList
        data={listings}
        renderItem={renderListingItemCard}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={theme.colors.primaryAction} />
        }
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        // columnWrapperStyle={styles.row} // To ensure even spacing in grid
      />

      <TouchableOpacity style={[styles.fab, { backgroundColor: theme.colors.primaryAction }]} onPress={navigateToCreateListing}>
        <Ionicons name="add-circle-outline" size={32} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // MODIFIED: Fixed value for consistent header padding
    paddingBottom: 10,
    borderBottomWidth: 1,
    // borderBottomColor is applied dynamically
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    paddingHorizontal: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 15,
    elevation: 1, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  categoriesContainer: {
    paddingVertical: 10,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
  },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContentContainer: {
    paddingHorizontal: 8, // (theme.spacing?.m || 16) / 2 - (theme.spacing?.xs || 4) /2 -> simplified to 8 - 2 = 6. Let's use 8.
    paddingBottom: 80,
  },
  // row: { // For FlatList numColumns, if more complex spacing is needed.
  //   flex: 1,
  //   justifyContent: "space-around",
  // },
  listingCard: {
    // margin is applied inline now for calculation
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  listingImage: {
    width: '100%',
    aspectRatio: 1 / 1.2,
  },
  listingInfo: {
    padding: 10,
  },
  listingName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  listingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  listingExtraInfo: {
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
    // marginTop: Dimensions.get('window').height / 6, // Can be removed if list container handles flex
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

export default MarketplaceHomeScreen;