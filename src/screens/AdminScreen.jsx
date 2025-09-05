// src/screens/AdminScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SectionList, 
  StyleSheet, 
  Button, 
  TextInput, 
  Alert, 
  ActivityIndicator, 
  RefreshControl, 
  TouchableOpacity 
} from 'react-native';
import { useUnits } from '../context/UnitContext';
import UnitCard from '../components/UnitCard';

export default function AdminScreen() {
  const { 
    units, 
    refreshUnits, 
    refreshing, 
    getUnitsGroupedByFloor, 
    toggleSoldStatus, 
    updateUnitPrice 
  } = useUnits();

  const [editingUnit, setEditingUnit] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const handleToggleSold = async (unitId) => {
    try {
      await toggleSoldStatus(unitId);
    } catch (error) {
      Alert.alert('Error', 'Failed to update unit status.');
    }
  };

  const handleEditPrice = (unit) => {
    setEditingUnit(unit.id);
    setNewPrice(unit.price.toString());
  };

  const handleSavePrice = async (unitId) => {
    const priceValue = parseFloat(newPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }

    try {
      await updateUnitPrice(unitId, priceValue);
      setEditingUnit(null);
      setNewPrice('');
    } catch (error) {
      Alert.alert('Error', 'Failed to update price.');
    }
  };

  const sections = getUnitsGroupedByFloor();

  if (!units.length) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading units...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshUnits} />
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.unitContainer}>
            <UnitCard unit={item} onPress={() => {}} />

            {/* Sold / Available Button */}
            <Button
              title={item.sold ? 'Mark Available' : 'Mark Sold'}
              onPress={() => handleToggleSold(item.id)}
            />

            {/* Price Editing */}
            {editingUnit === item.id ? (
              <View style={styles.priceEditContainer}>
                <TextInput
                  style={styles.priceInput}
                  value={newPrice}
                  onChangeText={setNewPrice}
                  keyboardType="numeric"
                />
                <Button
                  title="Save"
                  onPress={() => handleSavePrice(item.id)}
                />
                <Button
                  title="Cancel"
                  color="red"
                  onPress={() => setEditingUnit(null)}
                />
              </View>
            ) : (
              <TouchableOpacity onPress={() => handleEditPrice(item)}>
                <Text style={styles.priceText}>
                  Price: {item.price.toLocaleString('en-ET')} ETB
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sectionHeader: { 
    backgroundColor: '#2c5aa0', 
    padding: 10 
  },
  sectionTitle: { 
    fontWeight: 'bold', 
    color: 'white', 
    fontSize: 16 
  },
  unitContainer: { 
    margin: 10, 
    backgroundColor: 'white', 
    padding: 10, 
    borderRadius: 12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  priceText: { 
    marginTop: 8, 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#2c5aa0' 
  },
  priceEditContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 8 
  },
  priceInput: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    flex: 1, 
    padding: 8, 
    marginRight: 8, 
    borderRadius: 8 
  },
});
