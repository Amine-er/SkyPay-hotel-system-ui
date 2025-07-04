import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('jwt_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        sessionStorage.removeItem('jwt_token');
      }
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem('jwt_token', token);
    setDecodedToken(jwtDecode(token));
  };

  const logout = () => {
    sessionStorage.removeItem('jwt_token');
    setDecodedToken(null);
  };

  return (
    <AuthContext.Provider value={{ user: decodedToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
