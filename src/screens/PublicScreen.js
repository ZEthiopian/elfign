import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { UnitContext } from '../context/UnitContext';

export default function PublicScreen() {
  const { units } = useContext(UnitContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={units}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            {/* Unit Image */}
            {item.image && (
              <Image source={item.image} style={styles.image} resizeMode="cover" />
            )}

            <Card.Content>
              {/* Unit ID + Type */}
              <Title>{item.id} — {item.type}</Title>

              {/* Price */}
              {item.price && (
                <Paragraph style={styles.price}>
                  Price: ${item.price.toLocaleString()}
                </Paragraph>
              )}

              {/* Floor & Size */}
              <Paragraph>Floor: {item.floor}</Paragraph>
              <Paragraph>Size: {item.size}</Paragraph>

              {/* Description */}
              {item.description && (
                <Paragraph style={styles.desc}>
                  {item.description}
                </Paragraph>
              )}

              {/* Features */}
              {item.features?.length > 0 && (
                <View style={styles.features}>
                  {item.features.map((feature, index) => (
                    <Text key={index} style={styles.featureItem}>
                      • {feature}
                    </Text>
                  ))}
                </View>
              )}

              {/* Status */}
              <Paragraph style={{ fontWeight: 'bold', color: item.sold ? 'red' : 'green' }}>
                Status: {item.sold ? 'Sold' : 'Available'}
              </Paragraph>
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
    backgroundColor: '#f8f8f8'
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3
  },
  image: {
    width: '100%',
    height: 150
  },
  price: {
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5
  },
  desc: {
    marginTop: 5,
    fontStyle: 'italic'
  },
  features: {
    marginTop: 5,
    marginBottom: 10
  },
  featureItem: {
    fontSize: 14,
    color: '#555'
  }
});
