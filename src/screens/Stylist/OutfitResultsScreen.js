import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import OutfitPreview from '../../components/featureSpecific/OutfitPreview';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const Pagination = ({ data, activeIndex, theme }) => (
    <View style={styles.paginationContainer}>
        {data.map((_, index) => (
            <View 
                key={index} 
                style={[
                    styles.dot, 
                    { 
                        backgroundColor: index === activeIndex ? theme.colors.primaryAction : theme.colors.lightGrey,
                        width: index === activeIndex ? 12 : 8,
                        height: index === activeIndex ? 12 : 8,
                    }
                ]} 
            />
        ))}
    </View>
);

const OutfitResultsScreen = ({ route, navigation }) => {
  const theme = useAppTheme();
  const { outfits, criteria } = route.params;

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  
  useLayoutEffect(() => {
    if (criteria?.occasion) {
        navigation.setOptions({
            title: `Outfits for ${criteria.occasion}`,
        });
    }
  }, [navigation, criteria]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleVisualize = () => {
    const currentOutfit = outfits[activeIndex];
    console.log("Visualizing outfit:", currentOutfit.name);
    // Navigate to the visualizer screen, passing the selected outfit's data
    navigation.navigate('OutfitVisualizer', { outfit: currentOutfit }); // <-- MODIFIED
  };

  const handleSaveOutfit = () => {
    const currentOutfit = outfits[activeIndex];
    Alert.alert("Saved!", `Outfit "${currentOutfit.name}" has been saved to your looks.`);
  };

  const handleItemPress = (item) => {
    // This is an example of cross-stack navigation, which can be complex.
    // Ensure 'ItemDetail' is a route in your 'WardrobeStack' and that 'WardrobeStack' is a sibling
    // in a higher-level navigator if you plan to navigate this way.
    console.log("Navigate to item detail for:", item.id);
    // navigation.navigate('WardrobeTab', { 
    //   screen: 'ItemDetail', 
    //   params: { itemId: item.id },
    // });
    Alert.alert("Item Tapped", `${item.name} (${item.category})`, [
        { text: "OK" },
        { text: "View Details (Placeholder)", onPress: () => {} }
      ]);
  };

  if (!outfits || outfits.length === 0) {
    return (
      <View style={[styles.emptyContainer, {backgroundColor: theme.colors.background}]}>
        <Ionicons name="sad-outline" size={80} color={theme.colors.lightGrey} />
        <Text style={[styles.emptyTitle, {color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily}]}>No Outfits Found</Text>
        <Text style={[styles.emptySubtitle, {color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily}]}>
            We couldn't create an outfit with the selected criteria.
        </Text>
        <StyledButton title="Refine Your Search" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
      <View style={styles.criteriaBanner}>
        <Text style={[styles.criteriaText, {color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily}]}>
            For: <Text style={{fontWeight: 'bold'}}>{criteria.occasion}</Text> in <Text style={{fontWeight: 'bold'}}>{criteria.location || 'anywhere'}</Text>
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={outfits}
        renderItem={({ item }) => (
            <View style={styles.carouselItemContainer}>
                <OutfitPreview outfit={item} onItemPress={handleItemPress} />
            </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToAlignment="center"
        decelerationRate="fast"
      />

      <Pagination data={outfits} activeIndex={activeIndex} theme={theme} />

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleSaveOutfit}>
            <Ionicons name="bookmark-outline" size={28} color={theme.colors.secondaryAction} />
        </TouchableOpacity>
        <StyledButton 
            title="Visualize / Try On" 
            onPress={handleVisualize} 
            style={styles.visualizeButton}
        />
        <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-social-outline" size={28} color={theme.colors.secondaryAction} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  criteriaBanner: {
    padding: 10,
    alignItems: 'center',
  },
  criteriaText: {
      fontSize: 14,
      fontStyle: 'italic',
  },
  carouselItemContainer: {
      width: screenWidth,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  dot: {
    borderRadius: 6,
    marginHorizontal: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  visualizeButton: {
    flex: 1,
    marginHorizontal: 15,
  },
  iconButton: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
});

export default OutfitResultsScreen;