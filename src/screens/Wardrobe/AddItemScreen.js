import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import StyledButton from '../../components/common/StyledButton';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// Mock data for Pickers/Tags - In a real app, this would come from a config or API
const CATEGORIES = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
const COLORS = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple', 'Orange', 'Brown', 'Grey', 'Multi-color'];
const FABRICS = ['Cotton', 'Denim', 'Silk', 'Leather', 'Wool', 'Polyester', 'Linen'];
const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

// A simple reusable component for form rows
const FormRow = ({ label, children }) => {
  const theme = useAppTheme();
  return (
    <View style={styles.formRow}>
      <Text style={[styles.label, { color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily, fontWeight: '600' }]}>{label}</Text>
      {children}
    </View>
  );
};

// A simple reusable component for selectable chips
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

const AddItemScreen = ({ navigation }) => {
  const theme = useAppTheme();

  // State for the form fields
  const [imageUri, setImageUri] = useState(null);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState(null);
  const [colors, setColors] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [brand, setBrand] = useState('');
  const [notes, setNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || libraryStatus.status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera and photo library permissions to make this work!');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleChooseFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio, adjust as needed
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleColorSelect = (color) => {
    setColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleFabricSelect = (fabric) => {
    setFabrics(prev =>
        prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]
    );
  };

  const handleSeasonSelect = (season) => {
    setSeasons(prev =>
        prev.includes(season) ? prev.filter(s => s !== season) : [...prev, season]
    );
  };


  const handleSaveItem = () => {
    setError(null);
    if (!imageUri) {
      setError('Please add an image for your item.');
      return;
    }
    if (!itemName.trim()) {
      setError('Please give your item a name.');
      return;
    }
    // Add more validation...

    setIsLoading(true);
    const newItem = {
      imageUri,
      itemName,
      category,
      colors,
      fabrics,
      seasons,
      brand,
      notes,
    };
    console.log('Saving item:', newItem);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success!', 'Your item has been added to your wardrobe.');
      navigation.goBack(); // Go back to WardrobeListScreen
    }, 2000);
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      {/* Custom Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.lightGrey }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="close" size={30} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>
          Add New Item
        </Text>
        <TouchableOpacity onPress={handleSaveItem} style={styles.headerButton} disabled={isLoading}>
          <Text style={[styles.headerButtonText, { color: theme.colors.primaryAction, fontFamily: theme.typography.button.fontFamily }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Image Picker Section */}
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity
            style={[styles.imagePreview, { borderColor: theme.colors.lightGrey }]}
            onPress={handleChooseFromGallery} // Default action
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={50} color={theme.colors.lightGrey} />
                <Text style={[styles.imagePlaceholderText, { color: theme.colors.textSecondary }]}>Tap to add image</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.imageButtonsContainer}>
            <TouchableOpacity style={[styles.imageButton, {borderColor: theme.colors.secondaryAction}]} onPress={handleTakePhoto}>
              <Ionicons name="camera-outline" size={22} color={theme.colors.secondaryAction} />
              <Text style={[styles.imageButtonText, {color: theme.colors.secondaryAction}]}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.imageButton, {borderColor: theme.colors.secondaryAction}]} onPress={handleChooseFromGallery}>
              <Ionicons name="images-outline" size={22} color={theme.colors.secondaryAction} />
              <Text style={[styles.imageButtonText, {color: theme.colors.secondaryAction}]}>From Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <FormRow label="Item Name *">
            <TextInput
              style={[styles.input, { borderColor: theme.colors.lightGrey, color: theme.colors.textPrimary }]}
              placeholder="e.g., Blue Denim Jacket"
              value={itemName}
              onChangeText={setItemName}
            />
          </FormRow>

          <FormRow label="Category *">
            {/* Replace with a styled Picker/Dropdown component later */}
            <View style={styles.chipsContainer}>
                {CATEGORIES.map(cat => (
                    <SelectableChip key={cat} label={cat} isSelected={category === cat} onPress={() => setCategory(cat)} />
                ))}
            </View>
          </FormRow>
          
          <FormRow label="Color(s)">
            <View style={styles.chipsContainer}>
                {COLORS.map(color => (
                    <SelectableChip key={color} label={color} isSelected={colors.includes(color)} onPress={() => handleColorSelect(color)} />
                ))}
            </View>
          </FormRow>

          <FormRow label="Fabric(s)">
            <View style={styles.chipsContainer}>
                {FABRICS.map(fabric => (
                    <SelectableChip key={fabric} label={fabric} isSelected={fabrics.includes(fabric)} onPress={() => handleFabricSelect(fabric)} />
                ))}
            </View>
          </FormRow>

          <FormRow label="Season(s)">
            <View style={styles.chipsContainer}>
                {SEASONS.map(season => (
                    <SelectableChip key={season} label={season} isSelected={seasons.includes(season)} onPress={() => handleSeasonSelect(season)} />
                ))}
            </View>
          </FormRow>

          <FormRow label="Brand (Optional)">
            <TextInput
              style={[styles.input, { borderColor: theme.colors.lightGrey, color: theme.colors.textPrimary }]}
              placeholder="e.g., Levi's, Zara"
              value={brand}
              onChangeText={setBrand}
            />
          </FormRow>

          <FormRow label="Notes (Optional)">
            <TextInput
              style={[styles.input, styles.multilineInput, { borderColor: theme.colors.lightGrey, color: theme.colors.textPrimary }]}
              placeholder="e.g., Sentimental value, goes well with..."
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </FormRow>
        </View>

        {error && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
        )}

        <StyledButton
          title="Save Item to Wardrobe"
          onPress={handleSaveItem}
          style={styles.saveButton}
          disabled={isLoading}
        />
        {isLoading && <ActivityIndicator color={theme.colors.primaryAction} style={{marginTop: 10}} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 10,
    fontSize: 14,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  imageButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  formRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multilineInput: {
      height: 100,
      textAlignVertical: 'top',
      paddingTop: 15,
  },
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  loader: {
      marginTop: 20,
  }
});

export default AddItemScreen;