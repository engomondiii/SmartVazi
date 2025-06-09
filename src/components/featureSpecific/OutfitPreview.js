import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const OutfitPreview = ({ outfit, onItemPress }) => {
  const theme = useAppTheme();

  if (!outfit) {
    return null;
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.white }]}>
      {/* Outfit Visualization */}
      <Image source={{ uri: outfit.imageUrl }} style={styles.outfitImage} />

      {/* Outfit Details */}
      <View style={styles.detailsContainer}>
        <Text style={[styles.outfitName, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>
          {outfit.name}
        </Text>
        
        <View style={styles.divider} />

        <Text style={[styles.itemsHeader, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily, fontWeight: '600' }]}>
          Includes:
        </Text>
        {outfit.items.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => onItemPress(item)}>
            <View style={styles.itemRow}>
              <Ionicons name="shirt-outline" size={18} color={theme.colors.textSecondary} style={styles.itemIcon}/>
              <Text style={[styles.itemName, { color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}>
                {item.name} ({item.category})
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  outfitImage: {
    width: '100%',
    aspectRatio: 1, // Square aspect ratio for the main visual
    backgroundColor: '#f0f0f0',
  },
  detailsContainer: {
    padding: 20,
  },
  outfitName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  itemsHeader: {
    fontSize: 14,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemIcon: {
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
  },
});

export default OutfitPreview;