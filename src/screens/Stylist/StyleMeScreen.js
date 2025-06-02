import React, { useState, useCallback } from 'react'; // useCallback was not used, can be removed if fetchHomeScreenData pattern isn't planned here
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform, // Still imported, as KeyboardAvoidingView uses it
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Mock Data for navigation result
const MOCK_GENERATED_OUTFITS = [
  { id: 'outfit_1', name: 'Chic Conference Look', items: ['Blazer', 'Silk Blouse', 'Tailored Trousers'], imageUrl: 'https://via.placeholder.com/300/D1D1D1/333333?text=Outfit+1' },
  { id: 'outfit_2', name: 'Elegant Evening Attire', items: ['Little Black Dress', 'Heels', 'Clutch'], imageUrl: 'https://via.placeholder.com/300/333333/FFFFFF?text=Outfit+2' },
  { id: 'outfit_3', name: 'Casual Weekend Vibes', items: ['Knit Sweater', 'Comfort Jeans', 'Sneakers'], imageUrl: 'https://via.placeholder.com/300/A0A0A0/FFFFFF?text=Outfit+3' },
];


const StyleMeScreen = ({ navigation }) => {
  const theme = useAppTheme();

  // Core Inputs
  const [occasion, setOccasion] = useState('');
  const [location, setLocation] = useState('');
  const [styleMood, setStyleMood] = useState('');

  // Advanced Preferences (placeholders for now)
  const [preferredColors, setPreferredColors] = useState([]);
  const [avoidColors, setAvoidColors] = useState([]);
  const [mustIncludeItems, setMustIncludeItems] = useState([]);
  const [excludeItems, setExcludeItems] = useState([]);
  const [modestyLevel, setModestyLevel] = useState('Moderate'); // Default or example
  const [eventDate, setEventDate] = useState(null);

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateOutfits = () => {
    setError(null);
    if (!occasion.trim()) {
      setError('Please tell us the occasion.');
      return;
    }
    // Add more validation as needed

    setIsLoading(true);
    const criteria = {
      occasion,
      location,
      styleMood,
      preferredColors,
      avoidColors,
      mustIncludeItems,
      excludeItems,
      modestyLevel,
      eventDate,
    };
    console.log('Generating outfits with criteria:', criteria);

    // Simulate API call to AI stylist
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to OutfitResultsScreen with mock data
      navigation.navigate('OutfitResults', { // Ensure 'OutfitResults' route is defined in StylistStack
        outfits: MOCK_GENERATED_OUTFITS,
        criteria,
      });
    }, 2000);
  };


  const renderSectionHeader = (title, iconName = null, iconSet = 'Ionicons') => {
    const IconComponent = iconSet === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons;
    return (
      <View style={styles.sectionHeaderContainer}>
        {iconName && <IconComponent name={iconName} size={22} color={theme.colors.textPrimary} style={styles.sectionHeaderIcon} />}
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
        style={styles.screenContainer} // Added screenContainer style here
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Custom Header Section */}
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

        {/* Core Inputs Section */}
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

        {/* Advanced Preferences Section (Placeholders) */}
        {renderSectionHeader('Refine Your Style (Optional)', 'options-outline')}
        <View style={styles.placeholderSection}>
          <Text style={[styles.placeholderText, {fontFamily: theme.typography.body.fontFamily, color: theme.colors.textSecondary}]}>Color Preferences (e.g., Love blues, avoid yellows)</Text>
          <TouchableOpacity style={styles.placeholderButton} onPress={() => Alert.alert("Color Preferences", "Color selection UI coming soon!")}>
            <Text style={{color: theme.colors.primaryAction, fontFamily: theme.typography.button.fontFamily}}>Select Colors</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.placeholderSection}>
          <Text style={[styles.placeholderText, {fontFamily: theme.typography.body.fontFamily, color: theme.colors.textSecondary}]}>Specific Items from Wardrobe</Text>
          <TouchableOpacity style={styles.placeholderButton} onPress={() => Alert.alert("Browse Wardrobe", "Wardrobe item selection UI coming soon!")}>
            <Text style={{color: theme.colors.primaryAction, fontFamily: theme.typography.button.fontFamily}}>Include / Exclude Items</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.placeholderSection}>
            <Text style={[styles.placeholderText, {fontFamily: theme.typography.body.fontFamily, color: theme.colors.textSecondary}]}>Modesty Level: {modestyLevel}</Text>
            <TouchableOpacity style={styles.placeholderButton} onPress={() => Alert.alert("Modesty Level", "Modesty selection UI coming soon!")}>
                <Text style={{color: theme.colors.primaryAction, fontFamily: theme.typography.button.fontFamily}}>Change Modesty</Text>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: { // Style for the ScrollView itself if needed, or remove if not distinct
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
    // paddingTop: (Platform.OS === 'ios' ? 50 : 20) + 10, // Original
    paddingTop: 60, // MODIFIED: Fixed value for consistency during debugging
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
    borderColor: '#e0e0e0', // Fallback if theme.colors.lightGrey is an issue
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
});

export default StyleMeScreen;