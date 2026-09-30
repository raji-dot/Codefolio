import React, { useState } from 'react';
import axios from 'axios';

function MinimalistTheme({ data }) {
  // Extracting all the exact fields from our new dashboard layout
  const name = data?.name || 'OLIVIA SANCHEZ';
  const title = data?.title || 'Administrative Manager';
  const phone = data?.phone || '123-456-7890';
  const email = data?.email || 'hello@reallygreatsite.com';
  const location = data?.location || '123 Anywhere St., Any City';
  const bio = data?.bio || 'Detail-oriented administrative professional with over three years of experience providing comprehensive support to executive teams and office operations.';
  
  const skills = data?.skills || [];
  const education = data?.education || [];
  const experience = data?.experience || [];
  const projects = data?.projects || [];

  const [contact, setContact] = useState({ senderName: '', senderEmail: '', messageText: '' });
  const [status, setStatus] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      setStatus('Sending message...');
      await axios.post(`http://localhost:5000/api/profile/contact/${data?.username || 'demo'}`, contact);
      setStatus('Message sent successfully!');
      setContact({ senderName: '', senderEmail: '', messageText: '' });
    } catch (err) {
      setStatus('Failed to send message.');
    }
  };

  return (
    <div style={{ padding: '40px 30px', fontFamily: 'sans-serif', color: '#2b2d42', backgroundColor: '#fff', maxWidth: '800px', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
      
      {/* 1. Header Section (Olivia Sanchez Style) */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '38px', letterSpacing: '2px', margin: '0 0 5px 0', textTransform: 'uppercase', color: '#000', fontWeight: 'bold' }}>{name}</h1>
        <p style={{ fontSize: '16px', fontWeight: '500', color: '#4a4a4a', margin: '0 0 15px 0', letterSpacing: '0.5px' }}>{title}</p>
        
        {/* Contact Info Sub-header line */}
        <div style={{ fontSize: '13px', color: '#555', borderTop: '1px solid #eaeaea', paddingTop: '12px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span>{email}</span> | <span>{phone}</span> | <span>{location}</span>
        </div>
      </div>

      {/* 2. Summary Section */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ backgroundColor: '#dbe2e9', padding: '6px 12px', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px 0', color: '#1a202c', fontWeight: 'bold' }}>Summary</h3>
        <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: '#4a5568', margin: '0 0 0 8px', textAlign: 'justify' }}>{bio}</p>
      </div>

      {/* 3. Work Experience Section */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ backgroundColor: '#dbe2e9', padding: '6px 12px', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 15px 0', color: '#1a202c', fontWeight: 'bold' }}>Work Experience</h3>
        {experience.length > 0 ? experience.map((exp, idx) => (
          <div key={idx} style={{ marginBottom: '15px', paddingLeft: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', color: '#000' }}>
              <span>{exp.role}</span>
              <span style={{ fontWeight: 'normal', color: '#555' }}>{exp.duration}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#4b5563', fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}</div>
          </div>
        )) : <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 0 8px' }}>No experience records registered yet.</p>}
      </div>

      {/* 4. Education Section */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ backgroundColor: '#dbe2e9', padding: '6px 12px', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 15px 0', color: '#1a202c', fontWeight: 'bold' }}>Education</h3>
        {education.length > 0 ? education.map((edu, idx) => (
          <div key={idx} style={{ marginBottom: '15px', paddingLeft: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', color: '#000' }}>
              <span>{edu.degree}</span>
              <span style={{ fontWeight: 'normal', color: '#555' }}>{edu.year}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#4b5563', margin: '2px 0' }}>{edu.institute}</div>
          </div>
        )) : <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 0 8px' }}>No education fields added yet.</p>}
      </div>

      {/* 5. Projects Section (Title & Description Only) */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ backgroundColor: '#dbe2e9', padding: '6px 12px', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 15px 0', color: '#1a202c', fontWeight: 'bold' }}>Projects</h3>
        {projects.length > 0 ? projects.map((proj, idx) => (
          <div key={idx} style={{ marginBottom: '15px', paddingLeft: '8px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#000', marginBottom: '4px' }}>{proj.title}</div>
            <p style={{ fontSize: '13px', color: '#4a5568', margin: 0, lineHeight: '1.5', textAlign: 'justify' }}>{proj.description}</p>
          </div>
        )) : <p style={{ color: '#718096', fontSize: '13px', margin: '0 0 0 8px' }}>No projects built yet.</p>}
      </div>

      {/* 6. Key Skills Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ backgroundColor: '#dbe2e9', padding: '6px 12px', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px 0', color: '#1a202c', fontWeight: 'bold' }}>Key Skills</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', paddingLeft: '8px' }}>
          {skills.length > 0 ? skills.map((skill, i) => (
            <div key={i} style={{ fontSize: '13px', color: '#4a5568' }}>• {skill}</div>
          )) : <p style={{ color: '#718096', fontSize: '13px', margin: 0 }}>No skills listed.</p>}
        </div>
      </div>

      {/* 7. Secure Messaging Contact Form */}
      <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '20px' }}>
        <h3 style={{ fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 15px 0', color: '#1a202c', fontWeight: 'bold' }}>Get In Touch</h3>
        {status && <p style={{ fontSize: '13px', color: '#2563eb', margin: '0 0 10px 0', fontWeight: '500' }}>{status}</p>}
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Your Name" value={contact.senderName} onChange={e => setContact({ ...contact, senderName: e.target.value })} style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', width: '100%', boxSizing: 'border-box' }} required />
          <input type="email" placeholder="Your Email" value={contact.senderEmail} onChange={e => setContact({ ...contact, senderEmail: e.target.value })} style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', width: '100%', boxSizing: 'border-box' }} required />
          <textarea placeholder="Write your professional outreach message here..." value={contact.messageText} onChange={e => setContact({ ...contact, messageText: e.target.value })} rows="3" style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', width: '100%', boxSizing: 'border-box', resize: 'none' }} required />
          <button type="submit" style={{ padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Send Message Securely</button>
        </form>
      </div>

    </div>
  );
}

export default MinimalistTheme;
