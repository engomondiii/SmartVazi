import React, { useState, useEffect } from 'react';
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

// Reusing mock data and components from AddItemScreen
// In a real app, these would be in shared config files or components
const CATEGORIES = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
const COLORS = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple', 'Orange', 'Brown', 'Grey', 'Multi-color'];
const FABRICS = ['Cotton', 'Denim', 'Silk', 'Leather', 'Wool', 'Polyester', 'Linen'];
const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

const MOCK_WARDROBE_DATABASE = {
  'wd1': { id: 'wd1', name: 'Blue Denim Jacket', category: 'Outerwear', subCategory: 'Jacket', imageUrl: 'https://via.placeholder.com/400/77AADD/FFFFFF?text=Jacket', colors: ['Blue'], fabrics: ['Denim', 'Cotton'], pattern: 'Solid', styleAttributes: ['Casual', 'Streetwear'], seasons: ['Spring', 'Autumn'], brand: 'Levi\'s', purchaseDate: '2023-05-20', price: '89.99', currency: 'USD', notes: 'A classic wardrobe staple. Goes with everything!', wearCount: 12, lastWorn: '2024-05-15' },
  'wd2': { id: 'wd2', name: 'Floral Summer Dress', category: 'Dresses', subCategory: 'Maxi Dress', imageUrl: 'https://via.placeholder.com/400/FFC0CB/333333?text=Dress', colors: ['Pink', 'Green', 'White'], fabrics: ['Cotton', 'Viscose'], pattern: 'Floral', styleAttributes: ['Bohemian', 'Casual'], seasons: ['Summer'], brand: 'Zara', purchaseDate: '2023-06-10', price: '59.99', currency: 'USD', notes: 'Perfect for beach holidays or summer parties.', wearCount: 5, lastWorn: '2023-08-22' },
};

const FormRow = ({ label, children }) => {
  const theme = useAppTheme();
  return (
    <View style={styles.formRow}>
      <Text style={[styles.label, { color: theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily, fontWeight: '600' }]}>{label}</Text>
      {children}
    </View>
  );
};

const SelectableChip = ({ label, isSelected, onPress }) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity onPress={onPress} style={[ styles.chip, { backgroundColor: isSelected ? theme.colors.primaryAction : theme.colors.white, borderColor: isSelected ? theme.colors.primaryAction : theme.colors.lightGrey } ]}>
      <Text style={[styles.chipText, { color: isSelected ? theme.colors.white : theme.colors.textPrimary, fontFamily: theme.typography.body.fontFamily }]}>{label}</Text>
    </TouchableOpacity>
  );
};


const EditItemScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
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

  const [isLoading, setIsLoading] = useState(true); // Initial data loading
  const [isSaving, setIsSaving] = useState(false); // For update action
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing item's data and populate the form
    console.log("Fetching item to edit:", itemId);
    const itemToEdit = MOCK_WARDROBE_DATABASE[itemId];
    if (itemToEdit) {
      setImageUri(itemToEdit.imageUrl);
      setItemName(itemToEdit.name);
      setCategory(itemToEdit.category);
      setColors(itemToEdit.colors || []);
      setFabrics(itemToEdit.fabrics || []);
      setSeasons(itemToEdit.seasons || []);
      setBrand(itemToEdit.brand || '');
      setNotes(itemToEdit.notes || '');
    } else {
      Alert.alert("Error", "Could not find item to edit.");
      navigation.goBack();
    }
    setIsLoading(false);
  }, [itemId, navigation]);

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
      aspect: [1, 1],
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

  const handleColorSelect = (color) => setColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  const handleFabricSelect = (fabric) => setFabrics(prev => prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]);
  const handleSeasonSelect = (season) => setSeasons(prev => prev.includes(season) ? prev.filter(s => s !== season) : [...prev, season]);

  const handleUpdateItem = () => {
    setError(null);
    if (!itemName.trim()) {
      setError('Item name cannot be empty.');
      return;
    }
    setIsSaving(true);
    const updatedItem = { imageUri, itemName, category, colors, fabrics, seasons, brand, notes };
    console.log('Updating item:', updatedItem);

    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('Success!', 'Your item has been updated.');
      // Navigate back, potentially passing updated data to refresh the detail screen
      navigation.navigate('ItemDetail', { itemId: itemId, updated: true }); // Go back to detail screen
    }, 2000);
  };

  const handleDeleteItem = () => {
      Alert.alert(
        "Delete Item",
        `Are you sure you want to permanently delete "${itemName}"?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              console.log("Item deleted:", itemId);
              // Perform delete action, then navigate all the way back to the list
              navigation.navigate('WardrobeList', { itemDeleted: itemId });
            },
          },
        ]
      );
  };


  if (isLoading) {
    return (
      <View style={[styles.fullScreenLoader, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primaryAction} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <View style={[styles.header, { borderBottomColor: theme.colors.lightGrey }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="close" size={30} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.h2.fontFamily }]}>
          Edit Item
        </Text>
        <TouchableOpacity onPress={handleUpdateItem} style={styles.headerButton} disabled={isSaving}>
          <Text style={[styles.headerButtonText, { color: theme.colors.primaryAction, fontFamily: theme.typography.button.fontFamily }]}>Update</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        {/* Image Section */}
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity style={[styles.imagePreview, { borderColor: theme.colors.lightGrey }]} onPress={handleChooseFromGallery}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          </TouchableOpacity>
          <View style={styles.imageButtonsContainer}>
            <TouchableOpacity style={[styles.imageButton, {borderColor: theme.colors.secondaryAction}]} onPress={handleTakePhoto}>
              <Ionicons name="camera-outline" size={22} color={theme.colors.secondaryAction} />
              <Text style={[styles.imageButtonText, {color: theme.colors.secondaryAction}]}>Take New Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.imageButton, {borderColor: theme.colors.secondaryAction}]} onPress={handleChooseFromGallery}>
              <Ionicons name="images-outline" size={22} color={theme.colors.secondaryAction} />
              <Text style={[styles.imageButtonText, {color: theme.colors.secondaryAction}]}>Change Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
            {/* Form rows for all fields, similar to AddItemScreen */}
            <FormRow label="Item Name *">
                <TextInput style={[styles.input, { borderColor: theme.colors.lightGrey, color: theme.colors.textPrimary }]} value={itemName} onChangeText={setItemName} />
            </FormRow>
            <FormRow label="Category *">
                <View style={styles.chipsContainer}>
                    {CATEGORIES.map(cat => <SelectableChip key={cat} label={cat} isSelected={category === cat} onPress={() => setCategory(cat)} />)}
                </View>
            </FormRow>
            <FormRow label="Color(s)">
                <View style={styles.chipsContainer}>
                    {COLORS.map(color => <SelectableChip key={color} label={color} isSelected={colors.includes(color)} onPress={() => handleColorSelect(color)} />)}
                </View>
            </FormRow>
            <FormRow label="Fabric(s)">
                <View style={styles.chipsContainer}>
                    {FABRICS.map(fabric => <SelectableChip key={fabric} label={fabric} isSelected={fabrics.includes(fabric)} onPress={() => handleFabricSelect(fabric)} />)}
                </View>
            </FormRow>
            <FormRow label="Season(s)">
                <View style={styles.chipsContainer}>
                    {SEASONS.map(season => <SelectableChip key={season} label={season} isSelected={seasons.includes(season)} onPress={() => handleSeasonSelect(season)} />)}
                </View>
            </FormRow>
            <FormRow label="Brand (Optional)">
                <TextInput style={[styles.input, { borderColor: theme.colors.lightGrey, color: theme.colors.textPrimary }]} value={brand} onChangeText={setBrand} />
            </FormRow>
            <FormRow label="Notes (Optional)">
                <TextInput style={[styles.input, styles.multilineInput, { borderColor: theme.colors.lightGrey, color: theme.colors.textPrimary }]} multiline value={notes} onChangeText={setNotes} />
            </FormRow>
        </View>

        {error && <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>}

        <StyledButton
          title="Save Changes"
          onPress={handleUpdateItem}
          style={styles.saveButton}
          disabled={isSaving}
        />
        {isSaving && <ActivityIndicator color={theme.colors.primaryAction} style={{marginTop: 10}} />}

        {/* Delete button as secondary, destructive action */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteItem} disabled={isSaving}>
            <Text style={[styles.deleteButtonText, {color: theme.colors.error, fontFamily: theme.typography.button.fontFamily}]}>Delete This Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Reusing styles from AddItemScreen for consistency, with minor additions
const styles = StyleSheet.create({
  fullScreenLoader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: 15, paddingHorizontal: 10, borderBottomWidth: 1 },
  headerTitle: { fontSize: 20, fontWeight: '600' },
  headerButton: { paddingHorizontal: 10, paddingVertical: 5 },
  headerButtonText: { fontSize: 16, fontWeight: '600' },
  scrollViewContent: { paddingBottom: 40 },
  imagePickerContainer: { alignItems: 'center', marginVertical: 20 },
  imagePreview: { width: 200, height: 200, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  image: { width: '100%', height: '100%', borderRadius: 10 },
  imageButtonsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '90%' },
  imageButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1 },
  imageButtonText: { marginLeft: 8, fontSize: 14, fontWeight: '500' },
  formContainer: { paddingHorizontal: 20 },
  formRow: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8, fontWeight: '600' },
  input: { height: 50, borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, backgroundColor: '#fff' },
  multilineInput: { height: 100, textAlignVertical: 'top', paddingTop: 15 },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, marginRight: 10, marginBottom: 10 },
  chipText: { fontSize: 14 },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 15 },
  saveButton: { marginHorizontal: 20, marginTop: 10 },
  deleteButton: { marginTop: 20, alignItems: 'center', padding: 10 },
  deleteButtonText: { fontSize: 15, textDecorationLine: 'underline' },
});

export default EditItemScreen;