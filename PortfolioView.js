import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MinimalistTheme from './MinimalistTheme';
import CyberpunkTheme from './CyberpunkTheme';

// பிராஜெக்ட் ஃபைலில் (Page 3) குறிப்பிட்டிருந்த அதே Mapping Logic!
const themeMap = {
  minimalist: MinimalistTheme,
  cyberpunk: CyberpunkTheme,
};

const PortfolioView = () => {
  const { username } = useParams(); // URL இலிருந்து பெயரை எடுக்கும்
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/profile/public/${username}`)
      .then(res => {
        setPortfolioData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [username]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '20%' }}>Loading Portfolio...</div>;
  if (!portfolioData) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '20%' }}>404 Portfolio Not Found</div>;

  // பயனர் தேர்ந்தெடுத்த தீமைத் தேர்ந்தெடுத்தல் (இல்லை எனில் Default ஆக Minimalist)
  const SelectedTheme = themeMap[portfolioData.templateId?.toLowerCase()] || MinimalistTheme;

  return <SelectedTheme data={portfolioData} />;
};

export default PortfolioView;
