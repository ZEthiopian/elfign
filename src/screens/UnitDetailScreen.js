import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useUnits } from '../context/UnitContext';

const UnitDetailScreen = ({ route }) => {
  const { unitId } = route.params;
  const { getUnitById } = useUnits();
  const unit = getUnitById(unitId);

  if (!unit) return (
    <View style={styles.center}><Text>Unit not found</Text></View>
  );

  const formatPrice = (price) => (!price || isNaN(price)) ? "-" : `${price.toLocaleString('en-ET')} ETB`;

  return (
    <ScrollView style={styles.container}>
      {unit.imageUrl && <Image source={{ uri: unit.imageUrl }} style={styles.image} resizeMode="cover" />}
      <View style={styles.content}>
        <Text style={styles.title}>{unit.type} - {unit.id}</Text>
        <Text style={styles.floor}>Floor: {unit.floor}</Text>
        <Text style={styles.size}>Size: {unit.size}</Text>
        <Text style={styles.price}>{formatPrice(unit.price)}</Text>
        <Text style={styles.description}>{unit.description}</Text>
        {unit.sold && (
          <View style={styles.soldBadge}><Text style={styles.soldText}>SOLD</Text></View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 300 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  floor: { fontSize: 18, color: '#666', marginBottom: 10 },
  size: { fontSize: 16, marginBottom: 10 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#2c5aa0', marginBottom: 15 },
  description: { fontSize: 16, lineHeight: 24, color: '#555' },
  soldBadge: { marginTop: 20, backgroundColor: 'red', padding: 10, borderRadius: 5, alignSelf: 'flex-start' },
  soldText: { color: 'white', fontWeight: 'bold' }
});

export default UnitDetailScreen;
