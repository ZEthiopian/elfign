import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native';
import { useContext } from 'react';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PublicScreen from '../screens/PublicScreen';
import AdminScreen from '../screens/AdminScreen';
import ProtectedScreen from '../components/ProtectedScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, logout } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: '',
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Public" 
          component={PublicScreen}
          options={({ navigation }) => ({
            title: 'Available Units',
            headerRight: () => (
              <Button 
                onPress={() => navigation.navigate('Login')} 
                title="Login" 
                color="#000" 
              />
            ),
          })}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen 
          name="Admin" 
          options={{ title: 'Admin Panel' }}
        >
          {props => (
            <ProtectedScreen {...props}>
              <AdminScreen {...props} />
            </ProtectedScreen>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}