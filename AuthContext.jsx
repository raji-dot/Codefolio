import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    const bootstrapAuth = async () => {
      if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
        try {
          const res = await axios.get(`${API_BASE}/profile/me`);
          
          // CRUCIAL SAFEGUARD VALUE INJECTION: 
          // Inject empty arrays mapping explicitly if properties do not exist in the database model
          const normalizedUserData = {
            ...res.data,
            skills: Array.isArray(res.data?.skills) ? res.data.skills : [],
            education: Array.isArray(res.data?.education) ? res.data.education : [],
            experience: Array.isArray(res.data?.experience) ? res.data.experience : [],
            projects: Array.isArray(res.data?.projects) ? res.data.projects : []
          };
          
          setUser(normalizedUserData);
        } catch (error) {
          delete axios.defaults.headers.common['x-auth-token'];
          localStorage.removeItem('token');
          setUser(null);
          setToken(''); 
        }
      } else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
        setUser(null);
      }
      setLoading(false);
    };

    bootstrapAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      setToken(res.data.token);
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const register = async (username, email, password, name) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, { username, email, password, name });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const logout = () => { 
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
    setToken(''); 
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {/* Fallback component rendering configuration layer checks to avoid getting stuck inside initialization walls */}
      {!loading ? children : (
        <div style={{ textAlign: 'center', marginTop: '20%', fontFamily: 'sans-serif', color: '#38bdf8' }}>
          <h3>Loading CodeFolio Configurations...</h3>
          <p style={{ color: '#6b7280', fontSize: '13px' }}>Connecting to data pipeline telemetry</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};
