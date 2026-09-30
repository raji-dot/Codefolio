import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.username, formData.email, formData.password, formData.name);
      navigate('/login');
    } catch (err) { setError(err.response?.data?.message || 'Registration failed'); }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', color: '#fff', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', width: '350px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#38bdf8' }}>Join CodeFolio</h2>
        {error && <p style={{ color: '#ef4444', backgroundColor: '#7f1d1d', padding: '0.5rem', borderRadius: '6px' }}>{error}</p>}
        <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid #475569' }} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="text" placeholder="Unique Username" required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid #475569' }} onChange={e => setFormData({...formData, username: e.target.value})} />
        <input type="email" placeholder="Email" required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid #475569' }} onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid #475569' }} onChange={e => setFormData({...formData, password: e.target.value})} />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#38bdf8', border: 'none', borderRadius: '6px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>Create Account</button>
        <p style={{ textAlign: 'center', fontSize: '14px' }}>Have an account? <Link to="/login" style={{ color: '#38bdf8' }}>Log In</Link></p>
      </form>
    </div>
  );
};

export default Register;
