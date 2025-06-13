import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../../api/apiClient'; // apiClient'ın doğru yolda olduğundan emin olun

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
  const [loading, setLoading] = useState(true); // Başlangıçta oturum durumu yükleniyor

  // Sadece component mount olduğunda çalışır: localStorage'dan yükle ve doğrula
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      
      if (storedToken) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          // Backend'de token'ı doğrula ve kullanıcı bilgilerini al
          const response = await apiClient.get('/auth/me');
          const { password, ...userWithoutPassword } = response.data.user;
          setUser(userWithoutPassword);
          setToken(storedToken); 
        } catch (error) {
          console.error("Auth initialization/verification failed:", error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser'); // Eğer kullanılıyorsa
          delete apiClient.defaults.headers.common['Authorization'];
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false); // Her durumda yükleme biter
    };

    initializeAuth();
  }, []); // Boş bağımlılık dizisi, sadece mount'ta çalışır

  const login = useCallback((userData, authToken) => {
    const { password, ...userWithoutPassword } = userData;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('authUser', JSON.stringify(userWithoutPassword)); 
    
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    setUser(userWithoutPassword);
    setToken(authToken);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error("Logout API call failed:", error);
    }
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser'); 
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
  }, []);

  // isAuthenticated durumunu token varlığına göre türet
  const isAuthenticated = !!token;

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;