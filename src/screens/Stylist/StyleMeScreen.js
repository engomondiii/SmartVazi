import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AppModal from '../../components/common/Modal'; // Import the Modal component

// Mock Data for navigation result
const MOCK_GENERATED_OUTFITS = [
  { id: 'outfit_1', name: 'Chic Conference Look', items: [{name: 'Blazer', category: 'Outerwear'}, {name: 'Silk Blouse', category: 'Tops'}], imageUrl: 'https://via.placeholder.com/300/D1D1D1/333333?text=Outfit+1' },
  { id: 'outfit_2', name: 'Elegant Evening Attire', items: [{name: 'Little Black Dress', category: 'Dresses'}, {name: 'Heels', category: 'Shoes'}], imageUrl: 'https://via.placeholder.com/300/333333/FFFFFF?text=Outfit+2' },
];

// Mock data for Pickers/Tags
const COLORS = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple', 'Orange', 'Brown', 'Grey', 'Multi-color'];
const MODESTY_LEVELS = ['Conservative', 'Moderate', 'Expressive'];

// A simple reusable component for selectable chips (for use inside the modal)
const SelectableChip = ({ label, isSelected, onPress }) => {
    const theme = useAppTheme();
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.chip,
          {
            backgroundColor: isSelected ? theme.colors.primaryAction : theme.colors.white,
            borderColor: isSelected ? theme.colors.primaryAction : theme.colors.lightGrey,
          },
        ]}
      >
        <Text style={[styles.chipText, { color: isSelected ? theme.colors.white : theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };


const StyleMeScreen = ({ navigation }) => {
  const theme = useAppTheme();

  // Core Inputs
  const [occasion, setOccasion] = useState('');
  const [location, setLocation] = useState('');
  const [styleMood, setStyleMood] = useState('');

  // Advanced Preferences
  const [preferredColors, setPreferredColors] = useState([]);
  const [mustIncludeItems, setMustIncludeItems] = useState([]);
  const [modestyLevel, setModestyLevel] = useState('Moderate');

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- MODIFICATION START ---
  // State to control modal visibility
  const [isColorModalVisible, setColorModalVisible] = useState(false);
  const [isModestyModalVisible, setModestyModalVisible] = useState(false);

  // Handlers for modal interactions
  const handleColorSelect = (color) => {
    setPreferredColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleModestySelect = (level) => {
    setModestyLevel(level);
    setModestyModalVisible(false);
  };

  const handleBrowseWardrobe = () => {
    Alert.alert("Browse Wardrobe", "This will navigate to a wardrobe selection screen (coming soon).");
    if (mustIncludeItems.length === 0) {
      setMustIncludeItems([{ id: 'wd3', name: 'Classic White Tee' }]);
    } else {
      setMustIncludeItems([]);
    }
  };
  // --- MODIFICATION END ---

  const handleGenerateOutfits = () => {
    setError(null);
    if (!occasion.trim()) {
      setError('Please tell us the occasion.');
      return;
    }

    setIsLoading(true);
    const criteria = {
      occasion,
      location,
      styleMood,
      preferredColors,
      mustIncludeItems,
      modestyLevel,
    };
    console.log('Generating outfits with criteria:', criteria);

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('OutfitResults', {
        outfits: MOCK_GENERATED_OUTFITS,
        criteria,
      });
    }, 2000);
  };


  const renderSectionHeader = (title, iconName = null) => {
    return (
      <View style={styles.sectionHeaderContainer}>
        {iconName && <Ionicons name={iconName} size={22} color={theme.colors.textPrimary} style={styles.sectionHeaderIcon} />}
        <Text style={[styles.sectionHeader, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <ScrollView
        style={styles.screenContainer}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.customHeader}>
          <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h1.fontFamily }]}>
            AI Stylist
          </Text>
          <TouchableOpacity onPress={() => Alert.alert("Help", "Describe your needs, and let SmartVazi find your perfect outfit!")}>
            <Ionicons name="help-circle-outline" size={28} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.instructionText, { color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily }]}>
          Tell me about your event, and I'll craft some looks for you!
        </Text>

        {/* Core Inputs Section - NO CHANGES HERE */}
        {renderSectionHeader('The Basics', 'sparkles-outline')}
        <TextInput
          style={[styles.input, { borderColor: theme.colors.lightGrey, backgroundColor: theme.colors.white, color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}
          placeholder="What's the Occasion? (e.g., Work meeting)"
          placeholderTextColor={theme.colors.textSecondary}
          value={occasion}
          onChangeText={setOccasion}
          editable={!isLoading}
        />
        <TextInput
          style={[styles.input, { borderColor: theme.colors.lightGrey, backgroundColor: theme.colors.white, color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}
          placeholder="Location? (e.g., London, UK)"
          placeholderTextColor={theme.colors.textSecondary}
          value={location}
          onChangeText={setLocation}
          editable={!isLoading}
        />
        <Text style={[styles.infoText, {color: theme.colors.textSecondary, fontFamily: theme.typography.body.fontFamily}]}>
            Weather will be auto-detected based on location.
        </Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.lightGrey, backgroundColor: theme.colors.white, color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}
          placeholder="Desired Style or Mood? (e.g., Elegant, Casual)"
          placeholderTextColor={theme.colors.textSecondary}
          value={styleMood}
          onChangeText={setStyleMood}
          editable={!isLoading}
        />

        {/* Advanced Preferences Section (Placeholders are now interactive) */}
        {renderSectionHeader('Refine Your Style (Optional)', 'options-outline')}
        <View style={styles.placeholderSection}>
          <Text style={[styles.placeholderText, {fontFamily: theme.typography.body.fontFamily, color: theme.colors.textSecondary}]}>
            Color Preferences
          </Text>
          <TouchableOpacity style={styles.placeholderButton} onPress={() => setColorModalVisible(true)}>
            <Text style={{color: theme.colors.primaryAction, fontFamily: theme.typography.button.fontFamily}}>
              {preferredColors.length > 0 ? preferredColors.join(', ') : 'Select Colors'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.placeholderSection}>
          <Text style={[styles.placeholderText, {fontFamily: theme.typography.body.fontFamily, color: theme.colors.textSecondary}]}>Specific Items from Wardrobe</Text>
          <TouchableOpacity style={styles.placeholderButton} onPress={handleBrowseWardrobe}>
            <Text style={{color: theme.colors.primaryAction, fontFamily: theme.typography.button.fontFamily}}>
                {mustIncludeItems.length > 0 ? mustIncludeItems.map(i => i.name).join(', ') : 'Include / Exclude Items'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.placeholderSection}>
            <Text style={[styles.placeholderText, {fontFamily: theme.typography.body.fontFamily, color: theme.colors.textSecondary}]}>Modesty Level</Text>
            <TouchableOpacity style={styles.placeholderButton} onPress={() => setModestyModalVisible(true)}>
                <Text style={{color: theme.colors.primaryAction, fontFamily: theme.typography.button.fontFamily}}>{modestyLevel}</Text>
            </TouchableOpacity>
        </View>


        {error && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
          </View>
        )}

        {isLoading && (
          <ActivityIndicator size="large" color={theme.colors.primaryAction} style={styles.loader} />
        )}

        {!isLoading && (
          <StyledButton
            title="Generate Outfits"
            onPress={handleGenerateOutfits}
            style={styles.generateButton}
          />
        )}
      </ScrollView>

      {/* --- NEW: Modals for Selections (Outside ScrollView) --- */}
      <AppModal visible={isColorModalVisible} onClose={() => setColorModalVisible(false)} title="Select Preferred Colors">
        <View style={styles.chipsContainer}>
            {COLORS.map(color => (
                <SelectableChip key={color} label={color} isSelected={preferredColors.includes(color)} onPress={() => handleColorSelect(color)} />
            ))}
        </View>
      </AppModal>

      <AppModal visible={isModestyModalVisible} onClose={() => setModestyModalVisible(false)} title="Select Modesty Level">
        {MODESTY_LEVELS.map(level => (
            <TouchableOpacity key={level} style={[styles.modalOption, {borderBottomColor: theme.colors.lightGrey + '50'}]} onPress={() => handleModestySelect(level)}>
                <Text style={[styles.modalOptionText, {color: modestyLevel === level ? theme.colors.primaryAction : theme.colors.textPrimary}]}>{level}</Text>
                {modestyLevel === level && <Ionicons name="checkmark-circle" size={24} color={theme.colors.primaryAction} />}
            </TouchableOpacity>
        ))}
      </AppModal>
    </KeyboardAvoidingView>
  );
};

// --- Styles are UNCHANGED from your provided "current" version ---
// I have only added styles for the new modal-specific components at the end.
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionHeaderIcon: {
    marginRight: 8,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  infoText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 15,
    textAlign: 'center',
  },
  placeholderSection: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  placeholderText: {
    fontSize: 15,
    marginBottom: 8,
  },
  placeholderButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  errorContainer: {
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  generateButton: {
    marginTop: 30,
    width: '100%',
    elevation: 3,
  },
  // --- Styles added for new components, leaving originals untouched ---
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    fontSize: 14,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: 16,
  },
});

export default StyleMeScreen;
