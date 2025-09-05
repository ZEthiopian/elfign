import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedScreen({ children, navigation }) {
  const { user, loading, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && (!user || !isAdmin())) {
      navigation.replace("Login");
    }
  }, [user, loading]);

  if (loading) return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <ActivityIndicator size="large"/>
    </View>
  );

  if (!user || !isAdmin()) return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Access denied. Admins only.</Text>
      <Button title="Go to Login" onPress={()=>navigation.replace("Login")} />
    </View>
  );

  return children;
}
