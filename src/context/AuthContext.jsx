import React, { createContext, useState, useEffect } from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored credentials on app start
  useEffect(() => {
    checkStoredUser();
  }, []);

  const checkStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user from storage:', error);
    } finally {
      setLoading(false);
    }
  };

  // Login with phone & password
  const login = async (phone, password) => {
    try {
      // Default admin credentials
      const defaultPhone = '0911505756';
      const defaultPassword = '251617';

      if (phone === defaultPhone && password === defaultPassword) {
        const userData = { phone, role: 'admin' };
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }

      // Check other stored users (if any)
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.phone === phone && userData.password === password) {
          setUser(userData);
          return { success: true };
        }
      }

      return { success: false, error: 'Invalid phone or password' };
      
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Optional: store default credentials reference
  const initializeDefaultUser = async () => {
    try {
      const storedDefault = await AsyncStorage.getItem('default_credentials');
      if (!storedDefault) {
        const defaultCredentials = { phone: '0911505756', password: '251617', role: 'admin' };
        await AsyncStorage.setItem('default_credentials', JSON.stringify(defaultCredentials));
        console.log('Default admin credentials stored for reference');
      }
    } catch (error) {
      console.error('Failed to initialize default user:', error);
    }
  };

  useEffect(() => {
    initializeDefaultUser();
  }, []);

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
