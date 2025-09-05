import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator, Text, Button, Platform } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import PublicScreen from "../screens/PublicScreen";
import LoginScreen from "../screens/LoginScreen";
import AdminScreen from "../screens/AdminScreen";
import { AuthContext } from "../context/AuthContext";
import ProtectedScreen from "../components/ProtectedScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { loading } = useContext(AuthContext);

  if (loading) return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <ActivityIndicator size="large"/>
    </View>
  );

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false }} />
      <Stack.Screen
        name="Public"
        component={PublicScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text style={{ fontSize:20,fontWeight:'bold',color:'#2c5aa0' }}>Elifign Properties</Text>,
          headerStyle: {
            backgroundColor:'#fff',
            ...Platform.select({ ios:{ shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.1, shadowRadius:3 }, android:{ elevation:4 } })
          },
          headerRight: () => <Button title="Login" color="#2c5aa0" onPress={()=>navigation.navigate("Login")} />
        })}
      />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title:"Admin Sign In", headerLeft:()=>null }} />
      <Stack.Screen name="Admin" options={{ title:"Admin Panel" }}>
        {props => (
          <ProtectedScreen {...props}>
            <AdminScreen {...props}/>
          </ProtectedScreen>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
