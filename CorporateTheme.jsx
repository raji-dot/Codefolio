import React, { useState } from 'react';
import axios from 'axios';

function CorporateTheme({ data }) {
  // Extracting all telemetry variables to sync with Sebastian Bennett wireframe lines
  const name = data?.name || 'SEBASTIAN BENNETT';
  const title = data?.title || 'Professional Accountant';
  const phone = data?.phone || '+123-456-7890';
  const email = data?.email || 'hello@reallygreatsite.com';
  const location = data?.location || '123 Anywhere St., Any City';
  const bio = data?.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  
  const skills = data?.skills || [];
  const education = data?.education || [];
  const experience = data?.experience || [];
  const projects = data?.projects || [];

  const [contact, setContact] = useState({ senderName: '', senderEmail: '', messageText: '' });
  const [status, setStatus] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      setStatus('Sending professional inquiry...');
      await axios.post(`http://localhost:5000/api/profile/contact/${data?.username || 'demo'}`, contact);
      setStatus('Engagement transmission forwarded successfully!');
      setContact({ senderName: '', senderEmail: '', messageText: '' });
    } catch (err) {
      setStatus('Outreach system tracking failure.');
    }
  };

  return (
    <div style={{ padding: '50px 40px', fontFamily: 'sans-serif', color: '#000', backgroundColor: '#fff', maxWidth: '800px', margin: '0 auto', border: '1px solid #e2e8f0' }}>
      
      {/* 1. Executive Identification Corporate Header */}
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '38px', fontWeight: 'bold', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '1px', color: '#1a1a1a' }}>{name}</h1>
        <p style={{ fontSize: '15px', color: '#4a4a4a', margin: '0 0 16px 0', letterSpacing: '0.5px' }}>{title}</p>
        
        {/* Secondary line for sub-header metadata grid */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '12.5px', color: '#555', borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '10px 0' }}>
          <span>📞 {phone}</span>
          <span>✉️ {email}</span>
          <span>📍 {location}</span>
        </div>
      </div>

      {/* 2. Executive Summary Block */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>About Me</h3>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#222', margin: 0, textAlign: 'justify' }}>{bio}</p>
        <div style={{ borderBottom: '1px solid #ccc', width: '100%', marginTop: '15px' }}></div>
      </div>

      {/* 3. Education Framework Grid Tracks */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 15px 0', letterSpacing: '0.5px' }}>Education</h3>
        {education.length > 0 ? education.map((edu, idx) => (
          <div key={idx} style={{ marginBottom: '15px' }}>
            <div style={{ fontStyle: 'italic', fontSize: '12px', color: '#555', marginBottom: '2px' }}>{edu.institute} | {edu.year}</div>
            <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#000' }}>{edu.degree}</div>
          </div>
        )) : <p style={{ color: '#777', fontSize: '13px', margin: 0 }}>No dynamic education nodes logged.</p>}
        <div style={{ borderBottom: '1px solid #ccc', width: '100%', marginTop: '15px' }}></div>
      </div>

      {/* 4. Corporate Work Experience Tracks */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 15px 0', letterSpacing: '0.5px' }}>Work Experience</h3>
        {experience.length > 0 ? experience.map((exp, idx) => (
          <div key={idx} style={{ marginBottom: '15px' }}>
            <div style={{ fontStyle: 'italic', fontSize: '12px', color: '#555', marginBottom: '2px' }}>{exp.company} | {exp.duration}</div>
            <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#000' }}>{exp.role}</div>
          </div>
        )) : <p style={{ color: '#777', fontSize: '13px', margin: 0 }}>No experience tracks registered.</p>}
        <div style={{ borderBottom: '1px solid #ccc', width: '100%', marginTop: '15px' }}></div>
      </div>

      {/* 5. Target Project Grid (Title & Description Specifications) */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 15px 0', letterSpacing: '0.5px' }}>Projects</h3>
        {projects.length > 0 ? projects.map((proj, idx) => (
          <div key={idx} style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#000', marginBottom: '4px' }}>{proj.title}</div>
            <p style={{ fontSize: '13px', color: '#222', margin: 0, lineHeight: '1.5', textAlign: 'justify' }}>{proj.description}</p>
          </div>
        )) : <p style={{ color: '#777', fontSize: '13px', margin: 0 }}>No explicit projects cataloged.</p>}
        <div style={{ borderBottom: '1px solid #ccc', width: '100%', marginTop: '15px' }}></div>
      </div>

      {/* 6. Skills Competency Checklist Matrix */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 15px 0', letterSpacing: '0.5px' }}>Skills</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {skills.length > 0 ? skills.map((skill, i) => (
            <div key={i} style={{ fontSize: '12.5px', color: '#222' }}>• {skill}</div>
          )) : <p style={{ color: '#777', fontSize: '13px', margin: 0 }}>No competency parameters.</p>}
        </div>
        <div style={{ borderBottom: '1px solid #000', width: '100%', marginTop: '20px' }}></div>
      </div>

      {/* 7. Corporate Request/Contact Form Component */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 15px 0', letterSpacing: '0.5px' }}>Contact Form</h3>
        {status && <p style={{ fontSize: '12.5px', color: '#000', fontWeight: 'bold', marginBottom: '10px' }}>{status}</p>}
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Your Name" value={contact.senderName} onChange={e => setContact({ ...contact, senderName: e.target.value })} style={{ padding: '10px', border: '1px solid #000', fontSize: '12.5px', borderRadius: 0, boxSizing: 'border-box', width: '100%' }} required />
          <input type="email" placeholder="Your Email Address" value={contact.senderEmail} onChange={e => setContact({ ...contact, senderEmail: e.target.value })} style={{ padding: '10px', border: '1px solid #000', fontSize: '12.5px', borderRadius: 0, boxSizing: 'border-box', width: '100%' }} required />
          <textarea placeholder="Write project outreach specifications here..." value={contact.messageText} onChange={e => setContact({ ...contact, messageText: e.target.value })} rows="3" style={{ padding: '10px', border: '1px solid #000', fontSize: '12.5px', borderRadius: 0, boxSizing: 'border-box', width: '100%', resize: 'none' }} required />
          <button type="submit" style={{ padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Submit Inquiry</button>
        </form>
      </div>

    </div>
  );
}

export default CorporateTheme;
