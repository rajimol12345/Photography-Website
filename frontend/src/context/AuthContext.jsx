import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import API from '../api';

const AuthContext = createContext();

/**
 * AuthProvider - Manages global authentication state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Logout - Total session clearance
   */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('[AUTH] User logged out successfully');
  }, []);

  // Persistence: Initialize user from localStorage on startup
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error('[AUTH] Failed to parse session:', error);
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();

    // API Interceptor for handling 401 Unauthorized globally
    const interceptor = API.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.warn('[AUTH] Session expired or unauthorized. Logging out.');
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      API.interceptors.response.eject(interceptor);
    };
  }, [logout]);

  /**
   * Login - Professional error reporting and persistence
   */
  const login = async (email, password) => {
    try {
      const { data } = await API.post('/api/users/login', { email, password });

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));

      console.log(`[AUTH] Login successful for: ${data.email}`);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed: Service temporarily unavailable';
      console.error('[AUTH ERROR] Login failed:', message);
      throw new Error(message);
    }
  };

  /**
   * Register - Auto-login and immediate redirection support
   */
  const register = async (name, email, password, role = 'User') => {
    try {
      const { data } = await API.post('/api/users/register', { name, email, password, role });

      // Automatic immediate login
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));

      console.log(`[AUTH] Registration successful for: ${data.email}`);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed: Unable to create account';
      console.error('[AUTH ERROR] Registration failed:', message);
      throw new Error(message);
    }
  };


  // Provide state and methods to the app
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'Admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};