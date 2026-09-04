import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth session on load with 3.5s fast timeout to prevent hanging
  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        const checkPromise = api.adminCheckAuth();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Auth check timeout')), 3500)
        );

        const res = await Promise.race([checkPromise, timeoutPromise]);
        if (isMounted && res && res.success && res.user) {
          setAdmin(res.user);
          setLoading(false);
          return;
        }
      } catch (err) {
        // Session not active or backend cold start timeout
      }

      if (isMounted) {
        setAdmin(null);
        setLoading(false);
      }
    }
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.adminLogin(email, password);
      if (res && res.success && res.user) {
        setAdmin(res.user);
        return { success: true, user: res.user };
      }
      return { success: false, message: 'Invalid email or password.' };
    } catch (err) {
      return { success: false, message: 'Invalid email or password.' };
    }
  };

  const logout = async () => {
    try {
      await api.adminLogout();
    } catch (e) {
      // Ignore
    } finally {
      setAdmin(null);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
