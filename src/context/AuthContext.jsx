import React, { createContext, useState, useEffect, useContext } from 'react';

/**
 * Membuat context yang menyimpan token dan fungsi login, logout
 */
export const AuthContext = createContext();

/**
 * Provider yang menyediakan context untuk komponen lain
 * @param {Object} props - props yang berisi children
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    // Ambil token dari localStorage jika ada
    localStorage.getItem('token')
  );

  /**
   * Fungsi untuk login
   * @param {string} newToken - token yang dihasilkan dari proses login
   */
  const login = (newToken) => {
    setToken(newToken);
    // Simpan token ke localStorage
    localStorage.setItem('token', newToken);
  };

  /**
   * Fungsi untuk logout
   */
  const logout = () => {
    setToken(null);
    // Hapus token dari localStorage
    localStorage.removeItem('token');
  };

  /**
   * Jika ada token di localStorage, maka set token ke state
   */
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook untuk menggunakan AuthContext
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
