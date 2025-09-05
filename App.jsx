import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import { UnitProvider } from "./src/context/UnitContext";
import AppNavigator from "./src/navigation/AppNavigator";
import ErrorBoundary from "./src/components/ErrorBoundary";

const navigationTheme = {
  colors: { background: '#ffffff' },
};

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <AuthProvider>
            <UnitProvider>
              <AppNavigator />
            </UnitProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
