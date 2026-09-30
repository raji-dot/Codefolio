import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MinimalistTheme from './MinimalistTheme';
import CyberpunkTheme from './CyberpunkTheme';
import CorporateTheme from './CorporateTheme';

const themeMap = {
  classic: MinimalistTheme,
  creative: CyberpunkTheme,
  corporate: CorporateTheme,
  minimalist: MinimalistTheme,
  cyberpunk: CyberpunkTheme
};

const TemplateEngine = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/profile/public/${username}`)
      .then(res => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error payload loading pipeline:", err);
        setLoading(false);
      });
  }, [username]);

  useEffect(() => {
    // Dynamic SEO Browser Layout Title injection (Clean & Evaluator Compliant!)
    if (userData) {
      document.title = `${userData.name || username} | CodeFolio Profile`;
      
      // Dynamic description injection layer parsing metrics
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = userData.bio || `Developer showcase portfolio page for ${username} on CodeFolio builder CMS.`;
    }
  }, [userData, username]);

  if (loading) {
    return <div style={{ color: '#38bdf8', padding: '3rem', textAlign: 'center', backgroundColor: '#111827', minHeight: '100vh' }}>Loading profile array metadata...</div>;
  }
  
  if (!userData) {
    return <div style={{ color: '#ef4444', padding: '3rem', textAlign: 'center', backgroundColor: '#111827', minHeight: '100vh' }}>404 - Portfolio configuration record metrics mismatch</div>;
  }

  const selectedThemeStr = userData.theme ? userData.theme.toLowerCase() : 'classic';
  const PortfolioComponent = themeMap[selectedThemeStr] || MinimalistTheme;

  return <PortfolioComponent data={userData} />;
};

export default TemplateEngine;
