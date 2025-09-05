import React, { useContext, useState } from "react";
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Text, 
  Alert, 
  TouchableOpacity, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  // Pre-fill phone with default admin, password empty
  const [phone, setPhone] = useState("0911505756"); 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    const result = await login(phone, password);
    setLoading(false);

    if (result.success) {
      navigation.replace("Admin");
    } else {
      Alert.alert("Login Failed", result.error || "Invalid credentials");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.header}>Admin Login</Text>
          <Text style={styles.subtitle}>Access the admin dashboard</Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            style={styles.input}
            editable={!loading}
            maxLength={10}
          />
          
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.note}>
            Default Credentials:{"\n"}
            Phone: 0911505756{"\n"}
            Password: 251617
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  content: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 8, textAlign: "center", color: '#2c5aa0' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 15, marginBottom: 15, borderRadius: 8, fontSize: 16 },
  button: { backgroundColor: "#2c5aa0", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  buttonDisabled: { backgroundColor: "#ccc" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  note: { textAlign: "center", color: "#666", fontSize: 14, lineHeight: 20 },
});
