import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('Public');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}>
        <Image
          source={require('assets/Elfign.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 300,
    height: 150,
  },
});