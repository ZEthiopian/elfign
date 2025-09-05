import React, { useState } from 'react';
import { 
  View, Text, SectionList, ActivityIndicator, RefreshControl, StyleSheet,
  Button, Modal, TouchableOpacity, ScrollView, Platform
} from 'react-native';
import { useUnits } from '../context/UnitContext';
import UnitCard from '../components/UnitCard';
import { Ionicons } from '@expo/vector-icons';

const PublicScreen = ({ navigation }) => {
  const { 
    units, loading, error, refreshing, refreshUnits, 
    getUnitsGroupedByFloor, getUniqueFloors 
  } = useUnits();

  const [selectedFloor, setSelectedFloor] = useState(null);
  const [showFloorModal, setShowFloorModal] = useState(false);

  const handleUnitPress = (unit) => {
    navigation.navigate('UnitDetail', { unitId: unit.id });
  };

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
    setShowFloorModal(false);
  };

  const clearFloorFilter = () => setSelectedFloor(null);

  const getFilteredUnits = () => {
    const grouped = getUnitsGroupedByFloor();
    if (selectedFloor === null) return grouped;
    return grouped.filter(section => section.title.replace('Floor ', '') === selectedFloor.toString());
  };

  const filteredSections = getFilteredUnits();
  const uniqueFloors = getUniqueFloors();
  const totalUnits = units.length;
  const filteredUnitsCount = selectedFloor 
    ? units.filter(unit => unit.floor === parseInt(selectedFloor)).length
    : totalUnits;

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
      <Text>Loading units...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.center}>
      <Text style={styles.error}>Error: {error}</Text>
      <Button title="Try Again" onPress={refreshUnits} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Available Units</Text>
          <Text style={styles.headerSubtitle}>
            {selectedFloor ? `Floor ${selectedFloor}` : 'All Floors'} • {filteredUnitsCount} units
          </Text>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFloorModal(true)}>
          <Ionicons name="filter" size={24} color="#2c5aa0" />
          {selectedFloor && <View style={styles.filterBadge} />}
        </TouchableOpacity>
      </View>

      {/* Floor Modal */}
      <Modal visible={showFloorModal} transparent animationType="slide" onRequestClose={() => setShowFloorModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Floor</Text>
              <TouchableOpacity onPress={() => setShowFloorModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <TouchableOpacity
                style={[styles.floorOption, selectedFloor === null && styles.floorOptionSelected]}
                onPress={() => handleFloorSelect(null)}
              >
                <Text style={[styles.floorOptionText, selectedFloor === null && styles.floorOptionTextSelected]}>
                  All Floors
                </Text>
                <Text style={styles.floorUnitCount}>({totalUnits} units)</Text>
              </TouchableOpacity>

              {uniqueFloors.map(floor => {
                const floorUnits = units.filter(u => u.floor === floor);
                const availableUnits = floorUnits.filter(u => !u.sold).length;
                return (
                  <TouchableOpacity key={floor} style={[styles.floorOption, selectedFloor === floor && styles.floorOptionSelected]} onPress={() => handleFloorSelect(floor)}>
                    <View style={styles.floorInfo}>
                      <Text style={[styles.floorOptionText, selectedFloor === floor && styles.floorOptionTextSelected]}>Floor {floor}</Text>
                      <Text style={styles.floorUnitCount}>{availableUnits} available • {floorUnits.length} units</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {selectedFloor && (
              <TouchableOpacity style={styles.clearFilterButton} onPress={clearFloorFilter}>
                <Text style={styles.clearFilterText}>Clear Filter</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* Units List */}
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshUnits} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionSubtitle}>{section.data.filter(u => !u.sold).length} available</Text>
          </View>
        )}
        renderItem={({ item }) => <UnitCard unit={item} onPress={() => handleUnitPress(item)} />}
        ListEmptyComponent={
          <View style={styles.center}>
            <Ionicons name="search" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No units found</Text>
            {selectedFloor && <Button title="Clear Filter" onPress={clearFloorFilter} />}
          </View>
        }
        stickySectionHeadersEnabled
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee',
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 }, android: { elevation: 4 } })
  },
  headerContent: { flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  headerSubtitle: { fontSize: 14, color: '#666', marginTop: 2 },
  filterButton: { padding: 8, borderRadius: 20, backgroundColor: '#f0f0f0', position: 'relative' },
  filterBadge: { position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderRadius: 4, backgroundColor: '#2c5aa0' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  floorOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  floorOptionSelected: { backgroundColor: '#e6f2ff' },
  floorInfo: { flex: 1 },
  floorOptionText: { fontSize: 16, color: '#333', marginBottom: 2 },
  floorOptionTextSelected: { color: '#2c5aa0', fontWeight: 'bold' },
  floorUnitCount: { fontSize: 12, color: '#666' },
  clearFilterButton: { padding: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee' },
  clearFilterText: { color: '#2c5aa0', fontWeight: 'bold' },
  sectionHeader: { backgroundColor: '#2c5aa0', padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, color: 'white' },
  sectionSubtitle: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)' },
  listContent: { paddingBottom: 20 },
  emptyText: { fontSize: 16, color: '#666', marginTop: 10, marginBottom: 20 },
  error: { color: 'red', marginBottom: 20, textAlign: 'center' },
});

export default PublicScreen;
