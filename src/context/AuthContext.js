import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hardcoded credentials
  const correctEmail = 'admin@elfign.com';
  const correctPassword = 'admin123';

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === correctEmail && password === correctPassword) {
          setUser({ email });
          setLoading(false);
          resolve(true);
        } else {
          setError('Invalid email or password');
          setLoading(false);
          resolve(false);
        }
      }, 500); // small delay for UX
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
