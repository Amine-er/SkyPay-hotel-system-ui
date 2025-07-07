import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login as loginService } from '@/services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('jwt_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isValid = decoded.exp * 1000 > Date.now();
        if (isValid) {
          setUser(decoded);
        } else {
          sessionStorage.removeItem('jwt_token');
        }
      } catch {
        sessionStorage.removeItem('jwt_token');
      }
    }
  }, []);

  const login = async (credentials) => {
    const data = await loginService(credentials);
    const decoded = jwtDecode(data.access_token);
    const roles = decoded?.realm_access?.roles || [];

    const allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];
    const hasAccess = roles.some((r) => allowedRoles.includes(r));
    if (!hasAccess) throw new Error('Access denied');

    sessionStorage.setItem('jwt_token', data.access_token);
    setUser(decoded);
    return roles;
  };

  const logout = () => {
    sessionStorage.removeItem('jwt_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
