import React, { useState } from 'react';
import axios from 'axios';

function CyberpunkTheme({ data }) {
  // Extract fields mapping cleanly with our dashboard telemetry configuration
  const name = data?.name || 'Jennifer Anderson';
  const title = data?.title || 'Art Director';
  const phone = data?.phone || '123-456-7890';
  const email = data?.email || 'hello@reallygreatsite.com';
  const location = data?.location || 'New York, USA';
  const bio = data?.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit eget est tempor, quis tempus arcu elementum.';
  
  const skills = data?.skills || [];
  const education = data?.education || [];
  const experience = data?.experience || [];
  const projects = data?.projects || [];

  const [contact, setContact] = useState({ senderName: '', senderEmail: '', messageText: '' });
  const [status, setStatus] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      setStatus('Sending transmission...');
      await axios.post(`http://localhost:5000/api/profile/contact/${data?.username || 'demo'}`, contact);
      setStatus('Transmission forwarded successfully!');
      setContact({ senderName: '', senderEmail: '', messageText: '' });
    } catch (err) {
      setStatus('Transmission pipeline failure.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '650px', fontFamily: 'sans-serif', backgroundColor: '#fff', color: '#2d3748', maxWidth: '850px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
      
      {/* ==========================================
          LEFT SIDEBAR PANEL: DARK SOLID DESIGN 
         ========================================== */}
      <div style={{ width: '38%', backgroundColor: '#2b3a4a', color: '#fff', padding: '40px 25px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Profile/About Section */}
        <div>
          <h3 style={{ fontSize: '15px', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid #4a5d6e', paddingBottom: '6px', margin: '0 0 15px 0', fontWeight: 'bold' }}>Profile</h3>
          <p style={{ fontSize: '12.5px', lineHeight: '1.6', color: '#e2e8f0', margin: 0, textAlign: 'justify' }}>{bio}</p>
        </div>

        {/* Expertise/Skills Section */}
        <div>
          <h3 style={{ fontSize: '15px', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid #4a5d6e', paddingBottom: '6px', margin: '0 0 15px 0', fontWeight: 'bold' }}>Expertise</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {skills.length > 0 ? skills.map((skill, i) => (
              <div key={i} style={{ fontSize: '13px', color: '#cbd5e1' }}>• {skill}</div>
            )) : <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>No skills listed.</p>}
          </div>
        </div>

        {/* Local Contact Metadata Panel */}
        <div style={{ marginTop: 'auto' }}>
          <h3 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid #4a5d6e', paddingBottom: '6px', margin: '0 0 12px 0', fontWeight: 'bold' }}>Contact Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#cbd5e1' }}>
            <div>📞 {phone}</div>
            <div style={{ wordBreak: 'break-all' }}>✉️ {email}</div>
            <div>📍 {location}</div>
          </div>
        </div>
      </div>

      {/* ==========================================
          RIGHT SIDEBAR PANEL: WHITEOUT SECTIONS 
         ========================================== */}
      <div style={{ width: '62%', padding: '45px 35px', display: 'flex', flexDirection: 'column', gap: '35px' }}>
        
        {/* Main Branding Section */}
        <div>
          <h1 style={{ fontSize: '46px', fontWeight: 'bold', color: '#2b3a4a', margin: '0 0 4px 0', letterSpacing: '1px', lineHeight: '1.1' }}>{name}</h1>
          <p style={{ fontSize: '17px', color: '#718096', margin: 0, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{title}</p>
        </div>

        {/* Experience Section */}
        <div>
          <h2 style={{ fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', color: '#2b3a4a', borderBottom: '2px solid #2b3a4a', paddingBottom: '4px', margin: '0 0 15px 0', fontWeight: 'bold' }}>Experiences</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {experience.length > 0 ? experience.map((exp, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', color: '#2b3a4a' }}>
                  <span>{exp.company} | {exp.duration}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#4a5568', margin: '3px 0 0 0', fontStyle: 'italic' }}>{exp.role}</p>
              </div>
            )) : <p style={{ color: '#a0aec0', fontSize: '13px', margin: 0 }}>No active experiences logged.</p>}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h2 style={{ fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', color: '#2b3a4a', borderBottom: '2px solid #2b3a4a', paddingBottom: '4px', margin: '0 0 15px 0', fontWeight: 'bold' }}>Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {education.length > 0 ? education.map((edu, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', color: '#2b3a4a' }}>
                  <span>{edu.degree} | {edu.year}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#4a5568', margin: '3px 0 0 0' }}>{edu.institute}</p>
              </div>
            )) : <p style={{ color: '#a0aec0', fontSize: '13px', margin: 0 }}>No educational blocks added.</p>}
          </div>
        </div>

        {/* Projects Section (Title & Description Only) */}
        <div>
          <h2 style={{ fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', color: '#2b3a4a', borderBottom: '2px solid #2b3a4a', paddingBottom: '4px', margin: '0 0 15px 0', fontWeight: 'bold' }}>Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {projects.length > 0 ? projects.map((proj, idx) => (
              <div key={idx}>
                <h4 style={{ fontSize: '14px', color: '#2b3a4a', margin: '0 0 4px 0', fontWeight: 'bold' }}>{proj.title}</h4>
                <p style={{ fontSize: '13px', color: '#4a5568', margin: 0, lineHeight: '1.5', textAlign: 'justify' }}>{proj.description}</p>
              </div>
            )) : <p style={{ color: '#a0aec0', fontSize: '13px', margin: 0 }}>No project profiles mapped yet.</p>}
          </div>
        </div>

        {/* Secure Messaging Gateway Container */}
        <div style={{ marginTop: 'auto', borderTop: '1px solid #edf2f7', paddingTop: '15px' }}>
          <h3 style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: '#2b3a4a', margin: '0 0 10px 0', fontWeight: 'bold' }}>Secure Outreach</h3>
          {status && <p style={{ fontSize: '12px', color: '#2b6cb0', margin: '0 0 8px 0' }}>{status}</p>}
          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="Name" value={contact.senderName} onChange={e => setContact({ ...contact, senderName: e.target.value })} style={{ width: '50%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '2px', fontSize: '12px' }} required />
              <input type="email" placeholder="Email Address" value={contact.senderEmail} onChange={e => setContact({ ...contact, senderEmail: e.target.value })} style={{ width: '50%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '2px', fontSize: '12px' }} required />
            </div>
            <textarea placeholder="Outline objective message details..." value={contact.messageText} onChange={e => setContact({ ...contact, messageText: e.target.value })} rows="2" style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '2px', fontSize: '12px', boxSizing: 'border-box', resize: 'none' }} required />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#2b3a4a', color: '#fff', border: 'none', borderRadius: '2px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Send Message</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default CyberpunkTheme;
