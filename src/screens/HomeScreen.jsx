import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import welcomeImage from "../../assets/Elfign.png";

const { width } = Dimensions.get("window");
const APP_NAME = "Elifign Properties";

export default function HomeScreen({ navigation }) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    // Typing effect for the app name
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText(APP_NAME.slice(0, index + 1));
      index++;
      if (index === APP_NAME.length) clearInterval(typingInterval);
    }, 120); // speed of typing

    // Navigate after splash
    const timer = setTimeout(() => {
      navigation.replace("Public");
    }, 3500);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animatable.Image
        animation="zoomIn"
        duration={1500}
        easing="ease-out"
        source={welcomeImage}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Animated App Name */}
      <Animatable.Text
        animation="fadeInUp"
        delay={1500}
        duration={1500}
        style={styles.title}
      >
        {typedText}
      </Animatable.Text>

      {/* Optional Subtitle */}
      <Animatable.Text
        animation="fadeIn"
        delay={2500}
        duration={1000}
        style={styles.subtitle}
      >
        More Than a Home — A Sanctuary.
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff" 
  },
  image: { 
    width: width * 0.5, 
    height: width * 0.5, 
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c5aa0",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    textAlign: "center",
  },
});
