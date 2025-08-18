import React, { useContext } from 'react';
import { View, StyleSheet, SectionList, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { UnitContext } from '../context/UnitContext';

export default function AdminScreen() {
  const { units, toggleSoldStatus } = useContext(UnitContext);

  // Group units by floor
  const groupedUnits = units.reduce((acc, unit) => {
    const floor = `Floor ${unit.floor}`;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor].push(unit);
    return acc;
  }, {});

  // Convert to SectionList format
  const sections = Object.keys(groupedUnits).map(floor => ({
    title: floor,
    data: groupedUnits[floor],
  }));

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.id} — {item.type}</Title>
              <Paragraph>Size: {item.size}</Paragraph>
              <Paragraph>Features: {item.features.join(', ')}</Paragraph>
              <View style={styles.statusContainer}>
                <Paragraph style={item.sold ? styles.soldText : styles.availableText}>
                  Status: {item.sold ? 'SOLD' : 'AVAILABLE'}
                </Paragraph>
                <Button 
                  mode="contained" 
                  onPress={() => toggleSoldStatus(item.id)}
                  style={styles.toggleButton}
                  labelStyle={styles.buttonLabel}
                >
                  {item.sold ? 'Mark Available' : 'Mark Sold'}
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionHeader: {
    backgroundColor: '#0066cc',
    padding: 10,
  },
  sectionHeaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  soldText: {
    color: 'red',
    fontWeight: 'bold',
  },
  availableText: {
    color: 'green',
    fontWeight: 'bold',
  },
  toggleButton: {
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  buttonLabel: {
    fontSize: 12,
  },
});