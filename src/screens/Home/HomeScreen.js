// File: SmartVazi/src/screens/Home/HomeScreen.js
// Re-checked version
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  RefreshControl,
  // Alert, // Removed if not actively used for placeholders
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Mock Data
const MOCK_USER_NAME = 'Alex';
const MOCK_OUTFIT_SUGGESTION = {
  id: 'outfit1',
  name: "Today's Vibe: Casual Chic",
  items: [
    { id: 'item1', imageUrl: 'https://via.placeholder.com/150/D1D1D1/333333?text=Top' },
    { id: 'item2', imageUrl: 'https://via.placeholder.com/150/D1D1D1/333333?text=Bottom' },
    { id: 'item3', imageUrl: 'https://via.placeholder.com/150/D1D1D1/333333?text=Shoes' },
  ],
  occasion: 'Casual Outing',
};
const MOCK_MARKETPLACE_ITEMS = [
  { id: 'market1', name: 'Vintage Denim Jacket', price: '$45', imageUrl: 'https://via.placeholder.com/120/A0A0A0/FFFFFF?text=Jacket' },
  { id: 'market2', name: 'Handmade Silk Scarf', price: '$25', imageUrl: 'https://via.placeholder.com/120/A0A0A0/FFFFFF?text=Scarf' },
  { id: 'market3', name: 'Leather Ankle Boots', price: '$70', imageUrl: 'https://via.placeholder.com/120/A0A0A0/FFFFFF?text=Boots' },
];
const MOCK_SUSTAINABILITY_TIP = {
  title: 'Tip: Wash Cold!',
  description: 'Washing clothes in cold water saves energy and helps them last longer.',
  icon: 'leaf-outline',
};
const MOCK_STYLE_DISCOVERY = {
  title: 'Trending: Monochrome',
  description: 'Explore stunning monochrome outfits for any occasion.',
  linkText: 'Discover Trends',
  icon: 'compass-outline',
};

const HomeScreen = ({ navigation }) => {
  const theme = useAppTheme();

  const [userName, setUserName] = useState(MOCK_USER_NAME);
  const [outfitSuggestion, setOutfitSuggestion] = useState(null);
  const [marketplaceItems, setMarketplaceItems] = useState([]);
  const [sustainabilityTip, setSustainabilityTip] = useState(null);
  const [styleDiscovery, setStyleDiscovery] = useState(null);
  const [wardrobeItemCount, setWardrobeItemCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHomeScreenData = useCallback(() => {
    console.log('Fetching HomeScreen data...');
    // For debugging, ensure all theme properties exist before using them in styles
    if (!theme || !theme.colors || !theme.typography || !theme.typography.fontFamily || !theme.spacing) {
        console.error("Theme object is not fully loaded or structured correctly in HomeScreen:", theme);
        // Potentially return or set an error state if theme is critical for initial render
    }

    setIsLoading(true);
    setTimeout(() => {
      setUserName(MOCK_USER_NAME);
      setOutfitSuggestion(MOCK_OUTFIT_SUGGESTION);
      setMarketplaceItems(MOCK_MARKETPLACE_ITEMS);
      setSustainabilityTip(MOCK_SUSTAINABILITY_TIP);
      setStyleDiscovery(MOCK_STYLE_DISCOVERY);
      setWardrobeItemCount(27);
      setIsLoading(false);
      setRefreshing(false);
    }, 1500);
  }, [theme]); // Added theme as dependency for the check inside, though it shouldn't change

  useEffect(() => {
    fetchHomeScreenData();
  }, [fetchHomeScreenData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHomeScreenData();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const navigateToStylist = () => navigation.navigate('StylistTab', { screen: 'StyleMe' });
  const navigateToAddItem = () => {
    console.log('Navigate to Add Item Screen');
    // navigation.navigate('WardrobeTab', { screen: 'AddItem' });
  };
  const navigateToOutfitDetail = (outfitId) => console.log('Navigate to outfit detail:', outfitId);
  const navigateToMarketplaceItem = (itemId) => console.log('Navigate to marketplace item:', itemId);
  const navigateToMarketplace = () => navigation.navigate('MarketplaceTab');
  const navigateToSustainabilityHub = () => console.log('Navigate to Sustainability Hub');
  const navigateToStyleDiscovery = () => console.log('Navigate to Style Discovery');
  const navigateToNotifications = () => console.log('Navigate to Notifications');

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View>
        <Text style={[styles.greetingText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.secondary }]}>
          {`${getGreeting()},`}
        </Text>
        <Text style={[styles.userNameText, { color: theme.colors.textPrimary, fontFamily: theme.typography.h1.fontFamily }]}>
          {`${userName}!`}
        </Text>
      </View>
      <TouchableOpacity onPress={navigateToNotifications} style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={28} color={theme.colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );

  const renderStyleMeCard = () => (
    <TouchableOpacity onPress={navigateToStylist} style={[styles.card, styles.ctaCard, { backgroundColor: theme.colors.primaryAction }]}>
      <MaterialCommunityIcons name="creation" size={30} color={theme.colors.white} style={styles.ctaIcon} />
      <View>
        <Text style={[styles.ctaCardTitle, { color: theme.colors.white, fontFamily: theme.typography.h2.fontFamily }]}>
          What are we styling today?
        </Text>
        <Text style={[styles.ctaCardSubtitle, { color: theme.colors.white, fontFamily: theme.typography.body.fontFamily }]}>
          Get personalized outfit ideas
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderOutfitSuggestionCard = () => {
    if (!outfitSuggestion && isLoading && !refreshing) return <ActivityIndicator color={theme.colors.primaryAction} style={styles.sectionLoader} />;
    if (!outfitSuggestion) {
      return (
        <TouchableOpacity onPress={navigateToStylist} style={[styles.card, { alignItems: 'center', paddingVertical: theme.spacing?.xl || 32 }]}>
          <Ionicons name="shirt-outline" size={40} color={theme.colors.primaryAction} />
          <Text style={[styles.cardTitle, { marginTop: theme.spacing?.s || 8, color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>No Outfit Suggestion Yet?</Text>
          <Text style={[styles.cardText, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>Let's find your perfect look!</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => navigateToOutfitDetail(outfitSuggestion.id)} style={[styles.card, styles.outfitCard]}>
        <Text style={[styles.cardTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>{outfitSuggestion.name}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.outfitItemsScroll}>
          {outfitSuggestion.items.map(item => (
            <Image key={item.id} source={{ uri: item.imageUrl }} style={styles.outfitItemImage} />
          ))}
        </ScrollView>
        <Text style={[styles.cardTextSmall, { color: theme.colors.textSecondary, marginTop: theme.spacing?.s || 8, fontFamily: theme.typography.body.fontFamily }]}>Tap to view details</Text>
      </TouchableOpacity>
    );
  };

  const renderWardrobeCard = () => (
    <View style={[styles.card, {backgroundColor: theme.colors.white}]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>My Wardrobe</Text>
        <TouchableOpacity onPress={() => navigation.navigate('WardrobeTab')}>
          <Text style={[styles.viewAllText, { color: theme.colors.primaryAction, fontFamily: theme.typography.body.fontFamily }]}>View All</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.cardText, { color: theme.colors.textSecondary, marginBottom: theme.spacing?.m || 16, fontFamily: theme.typography.body.fontFamily }]}>
        {`You have ${wardrobeItemCount} items digitized.`}
      </Text>
      <StyledButton title="+ Add New Item" onPress={navigateToAddItem} />
    </View>
  );

  const renderMarketplaceHighlights = () => {
    if (marketplaceItems.length === 0 && isLoading && !refreshing) return <ActivityIndicator color={theme.colors.primaryAction} style={styles.sectionLoader} />;
    if (marketplaceItems.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderWithLink}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>Fresh Finds</Text>
          <TouchableOpacity onPress={navigateToMarketplace}>
            <Text style={[styles.viewAllText, { color: theme.colors.primaryAction, fontFamily: theme.typography.body.fontFamily }]}>Explore Marketplace</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContainer}>
          {marketplaceItems.map(item => (
            <TouchableOpacity key={item.id} onPress={() => navigateToMarketplaceItem(item.id)} style={[styles.marketplaceItemCard, { backgroundColor: theme.colors.white }]}>
              <Image source={{ uri: item.imageUrl }} style={styles.marketplaceItemImage} />
              <Text numberOfLines={1} style={[styles.marketplaceItemName, { color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}>{item.name}</Text>
              <Text style={[styles.marketplaceItemPrice, { color: theme.colors.primaryAction, fontFamily: theme.typography.body.fontFamily, fontWeight: 'bold' }]}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderFeatureCard = (title, description, iconName, iconSet = 'Ionicons', onPress, accentColor) => {
    const IconComponent = iconSet === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.card, styles.featureCard, {backgroundColor: theme.colors.white}]}>
        <IconComponent name={iconName} size={28} color={accentColor || theme.colors.primaryAction} style={styles.featureIcon} />
        <View style={styles.featureTextContainer}>
          <Text style={[styles.cardTitleSmall, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>{title}</Text>
          <Text style={[styles.cardText, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]} numberOfLines={2}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    );
  };

  // Initial full screen loader
  if (isLoading && !refreshing && !outfitSuggestion && marketplaceItems.length === 0 && !sustainabilityTip && !styleDiscovery) {
    return (
      <View style={[styles.fullScreenLoader, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primaryAction} />
        <Text style={{ marginTop: 10, color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primaryAction} />
      }
    >
      {renderHeader()}
      {renderStyleMeCard()}
      {renderOutfitSuggestionCard()}
      {renderWardrobeCard()}
      {renderMarketplaceHighlights()}
      {sustainabilityTip && renderFeatureCard(
        sustainabilityTip.title,
        sustainabilityTip.description,
        sustainabilityTip.icon,
        'Ionicons',
        navigateToSustainabilityHub,
        theme.colors.secondaryAction
      )}
      {styleDiscovery && renderFeatureCard(
        styleDiscovery.title,
        styleDiscovery.description,
        styleDiscovery.icon,
        'Ionicons',
        navigateToStyleDiscovery,
        theme.colors.accentGold
      )}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

// Updated styles with fallbacks for theme.spacing and explicit backgroundColor for cards
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 40,
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
    paddingTop: (Platform.OS === 'ios' ? 50 : 20) + 10,
    paddingBottom: 20,
  },
  greetingText: {
    fontSize: 16,
  },
  userNameText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
  },
  card: {
    backgroundColor: '#FFFFFF', // Explicit white for cards
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  ctaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor is applied inline from theme.colors.primaryAction
  },
  ctaIcon: {
    marginRight: 15,
  },
  ctaCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ctaCardSubtitle: {
    fontSize: 14,
    opacity: 0.9,
  },
  outfitCard: {},
  outfitItemsScroll: {
    marginTop: 10,
  },
  outfitItemImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardTitleSmall: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardTextSmall: {
    fontSize: 12,
    opacity: 0.7,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeaderWithLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontalScrollContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  marketplaceItemCard: {
    backgroundColor: '#FFFFFF', // Explicit white
    borderRadius: 10,
    marginRight: 15,
    width: 140,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    paddingBottom: 10,
  },
  marketplaceItemImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  marketplaceItemName: {
    fontSize: 13,
    marginVertical: 5,
    paddingHorizontal: 8,
  },
  marketplaceItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', // Explicit white
  },
  featureIcon: {
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  sectionLoader: {
      marginVertical: 20,
  }
});

export default HomeScreen;