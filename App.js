import 'react-native-gesture-handler'; // Must be first import
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { UnitProvider } from './src/context/UnitContext'; // import UnitProvider
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <UnitProvider> {/* ✅ now AdminScreen has units */}
          <AppNavigator />
          <StatusBar style="auto" />
        </UnitProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
