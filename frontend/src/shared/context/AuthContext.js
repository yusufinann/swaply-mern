import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../../api/apiClient';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          const response = await apiClient.get('/auth/me');
          if (response.data && response.data.user) {
            const { password, ...userWithoutPassword } = response.data.user;
            setUser(userWithoutPassword);
            setToken(storedToken);
            const { favorites, cart, ...staticUserInfo } = userWithoutPassword;
            localStorage.setItem('authUser', JSON.stringify(staticUserInfo));
          } else {
            throw new Error("User data not found in response");
          }
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
          delete apiClient.defaults.headers.common['Authorization'];
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback((userData, authToken) => {
    const { password, ...userWithoutPassword } = userData;
    const { favorites, cart, ...staticUserInfo } = userWithoutPassword;
    
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('authUser', JSON.stringify(staticUserInfo));

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    setUser(userWithoutPassword);
    setToken(authToken);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error("Logout API call failed, proceeding with client-side logout:", error.message);
    }

    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
  }, []);

  const updateUser = useCallback((newUserData) => {
    if (typeof newUserData === 'function') {
        setUser(prevUser => {
            const updatedUser = newUserData(prevUser);
            if (updatedUser) { 
                const { password, favorites, cart, ...staticUserInfo } = updatedUser;
                localStorage.setItem('authUser', JSON.stringify(staticUserInfo));
            }
            return updatedUser;
        });
    } else {
        setUser(newUserData);
        if (newUserData) {
            const { password, favorites, cart, ...staticUserInfo } = newUserData;
            localStorage.setItem('authUser', JSON.stringify(staticUserInfo));
        } else if (newUserData === null) {
            localStorage.removeItem('authUser');
        }
    }
  }, []);

  const isAuthenticated = !!token && !!user;

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;