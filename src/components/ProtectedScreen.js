import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedScreen({ navigation, children }) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigation.replace('Login'); // Redirect to login if not authenticated
    }
  }, [user]);

  return user ? children : null;
}
