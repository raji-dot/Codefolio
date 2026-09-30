import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import MinimalistTheme from '../Templates/MinimalistTheme';
import CyberpunkTheme from '../Templates/CyberpunkTheme';
import CorporateTheme from '../Templates/CorporateTheme';

const previewThemeMap = {
  classic: MinimalistTheme,
  creative: CyberpunkTheme,
  corporate: CorporateTheme
};

function Dashboard() {
  const { user, logout } = useAuth();
  
  // 1. Profile Core Metrics
  const [profileData, setProfileData] = useState({
    name: '',
    title: '',
    phone: '',
    email: '',
    location: '',
    bio: '',
    theme: 'classic'
  });

  // 2. Section Array Lists
  const [skillsList, setSkillsList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  // 3. New Record Input Form States
  const [newSkill, setNewSkill] = useState('');
  const [newEdu, setNewEdu] = useState({ institute: '', degree: '', year: '' });
  const [newExp, setNewExp] = useState({ company: '', role: '', duration: '' });
  const [newProj, setNewProj] = useState({ title: '', description: '' });

  const [message, setMessage] = useState('');

  // Auto bootstrap state validation loop from database response
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        title: user.title || '',
        phone: user.phone || '',
        email: user.email || '',
        location: user.location || '',
        bio: user.bio || '',
        theme: user.theme || 'classic'
      });
      setSkillsList(Array.isArray(user.skills) ? user.skills : []);
      setEducationList(Array.isArray(user.education) ? user.education : []);
      setExperienceList(Array.isArray(user.experience) ? user.experience : []);
      setProjectList(Array.isArray(user.projects) ? user.projects : []);
    }
  }, [user]);

  const handleBaseChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Section Adders
  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkillsList([...skillsList, newSkill.trim()]);
    setNewSkill('');
  };

  const addEducation = () => {
    if (!newEdu.institute || !newEdu.degree) return;
    setEducationList([...educationList, newEdu]);
    setNewEdu({ institute: '', degree: '', year: '' });
  };

  const addExperience = () => {
    if (!newExp.company || !newExp.role) return;
    setExperienceList([...experienceList, newExp]);
    setNewExp({ company: '', role: '', duration: '' });
  };

  const addProject = () => {
    if (!newProj.title || !newProj.description) return;
    setProjectList([...projectList, newProj]);
    setNewProj({ title: '', description: '' });
  };

  // FIXED DYNAMIC REMOVERS: Individual filtration array mapping by index matrix keys
  const removeSkill = (indexToRemove) => {
    setSkillsList(skillsList.filter((_, idx) => idx !== indexToRemove));
  };

  const removeEducation = (indexToRemove) => {
    setEducationList(educationList.filter((_, idx) => idx !== indexToRemove));
  };

  const removeExperience = (indexToRemove) => {
    setExperienceList(experienceList.filter((_, idx) => idx !== indexToRemove));
  };

  const removeProject = (indexToRemove) => {
    setProjectList(projectList.filter((_, idx) => idx !== indexToRemove));
  };

  // Safe Master Submit Actions Sync
  const handleMasterSave = async (e) => {
    e.preventDefault();
    try {
      setMessage('Syncing portfolio specifications context...');
      const integratedPayload = {
        ...profileData,
        skills: skillsList,
        education: educationList,
        experience: experienceList,
        projects: projectList
      };
      await axios.post('http://localhost:5000/api/profile', integratedPayload);
      setMessage('All portfolio configurations synchronized successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error processing telemetry parameters.');
    }
  };

  const livePreviewTelemetry = {
    name: profileData.name || 'Your Name',
    title: profileData.title || 'Professional Job Title',
    phone: profileData.phone || 'Contact Number',
    email: profileData.email || 'Email Address',
    location: profileData.location || 'Location Metric',
    bio: profileData.bio || 'About me details...',
    skills: skillsList || [],
    education: educationList || [],
    experience: experienceList || [],
    projects: projectList || []
  };

  const ActiveComponent = previewThemeMap[profileData.theme] || MinimalistTheme;
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#111827', color: '#f3f4f6', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* LEFT SIDEBAR PANEL: UNIFIED SYSTEM INPUT FORMS */}
      <div style={{ width: '45%', padding: '25px', overflowY: 'auto', backgroundColor: '#1f2937', borderRight: '2px solid #374151' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#38bdf8', margin: 0 }}>CodeFolio CMS Panel</h2>
          <button onClick={logout} style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
        </div>

        {message && <div style={{ padding: '10px', borderRadius: '4px', marginBottom: '15px', backgroundColor: '#064e3b', color: '#a7f3d0' }}>{message}</div>}

        <form onSubmit={handleMasterSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <h3 style={{ color: '#9ca3af', borderBottom: '1px solid #374151', paddingBottom: '4px' }}>Profile Details</h3>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Name</label>
            <input type="text" name="name" value={profileData.name} onChange={handleBaseChange} style={{ width: '100%', padding: '8px', backgroundColor: '#111827', border: '1px solid #4b5563', borderRadius: '4px', color: '#fff' }} required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Professional / Job Title</label>
            <input type="text" name="title" value={profileData.title} onChange={handleBaseChange} style={{ width: '100%', padding: '8px', backgroundColor: '#111827', border: '1px solid #4b5563', borderRadius: '4px', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Contact Number</label>
            <input type="text" name="phone" value={profileData.phone} onChange={handleBaseChange} style={{ width: '100%', padding: '8px', backgroundColor: '#111827', border: '1px solid #4b5563', borderRadius: '4px', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Email Address</label>
            <input type="email" name="email" value={profileData.email} onChange={handleBaseChange} style={{ width: '100%', padding: '8px', backgroundColor: '#111827', border: '1px solid #4b5563', borderRadius: '4px', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Location</label>
            <input type="text" name="location" value={profileData.location} onChange={handleBaseChange} style={{ width: '100%', padding: '8px', backgroundColor: '#111827', border: '1px solid #4b5563', borderRadius: '4px', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>About Me</label>
            <textarea name="bio" value={profileData.bio} onChange={handleBaseChange} rows="3" style={{ width: '100%', padding: '8px', backgroundColor: '#111827', border: '1px solid #4b5563', borderRadius: '4px', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Active Layout Theme Template</label>
            <select name="theme" value={profileData.theme} onChange={handleBaseChange} style={{ width: '100%', padding: '8px', backgroundColor: '#111827', border: '1px solid #4b5563', borderRadius: '4px', color: '#fff' }}>
              <option value="classic">Classic Minimalist</option>
              <option value="creative">Cyberpunk Theme</option>
              <option value="corporate">Corporate Template</option>
            </select>
          </div>

          <h3 style={{ color: '#9ca3af', borderBottom: '1px solid #374151', paddingBottom: '4px', marginTop: '15px' }}>Skills</h3>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input type="text" placeholder="e.g. React" value={newSkill} onChange={e => setNewSkill(e.target.value)} style={{ width: '75%', padding: '8px', backgroundColor: '#111827', border: '1px solid #4b5563', borderRadius: '4px', color: '#fff' }} />
            <button type="button" onClick={addSkill} style={{ width: '25%', padding: '8px', backgroundColor: '#38bdf8', color: '#111827', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>+ Add Skill</button>
          </div>
          <div style={{ fontSize: '12px', color: '#38bdf8', display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
            {skillsList.map((s, idx) => (
              <span key={idx} style={{ backgroundColor: '#4b5563', color: '#fff', padding: '3px 8px', borderRadius: '3px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {s} <b onClick={() => removeSkill(idx)} style={{ color: '#f87171', cursor: 'pointer', fontSize: '13px' }}>×</b>
              </span>
            ))}
          </div>
          <h3 style={{ color: '#9ca3af', borderBottom: '1px solid #374151', paddingBottom: '4px', marginTop: '15px' }}>Education</h3>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input type="text" placeholder="School/College Name" value={newEdu.institute} onChange={e => setNewEdu({ ...newEdu, institute: e.target.value })} style={{ width: '40%', padding: '6px', backgroundColor: '#111827', border: '1px solid #4b5563', color: '#fff' }} />
            <input type="text" placeholder="Degree / Class" value={newEdu.degree} onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })} style={{ width: '40%', padding: '6px', backgroundColor: '#111827', border: '1px solid #4b5563', color: '#fff' }} />
            <input type="text" placeholder="Year" value={newEdu.year} onChange={e => setNewEdu({ ...newEdu, year: e.target.value })} style={{ width: '20%', padding: '6px', backgroundColor: '#111827', border: '1px solid #4b5563', color: '#fff' }} />
          </div>
          <button type="button" onClick={addEducation} style={{ padding: '6px', backgroundColor: '#4b5563', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: '5px' }}>+ Add Section Record</button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
            {educationList.map((e, idx) => (
              <div key={idx} style={{ background: '#374151', padding: '4px 8px', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🎓 {e.institute} ({e.degree})</span>
                <button type="button" onClick={() => removeEducation(idx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
              </div>
            ))}
          </div>

          <h3 style={{ color: '#9ca3af', borderBottom: '1px solid #374151', paddingBottom: '4px', marginTop: '15px' }}>Experience</h3>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input type="text" placeholder="Company Name" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} style={{ width: '40%', padding: '6px', backgroundColor: '#111827', border: '1px solid #4b5563', color: '#fff' }} />
            <input type="text" placeholder="Role Job Title" value={newExp.role} onChange={e => setNewExp({ ...newExp, role: e.target.value })} style={{ width: '40%', padding: '6px', backgroundColor: '#111827', border: '1px solid #4b5563', color: '#fff' }} />
            <input type="text" placeholder="Duration" value={newExp.duration} onChange={e => setNewExp({ ...newExp, duration: e.target.value })} style={{ width: '20%', padding: '6px', backgroundColor: '#111827', border: '1px solid #4b5563', color: '#fff' }} />
          </div>
          <button type="button" onClick={addExperience} style={{ padding: '6px', backgroundColor: '#4b5563', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: '5px' }}>+ Add Section Record</button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
            {experienceList.map((x, idx) => (
              <div key={idx} style={{ background: '#374151', padding: '4px 8px', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>💼 {x.company} ({x.role})</span>
                <button type="button" onClick={() => removeExperience(idx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
              </div>
            ))}
          </div>

          <h3 style={{ color: '#9ca3af', borderBottom: '1px solid #374151', paddingBottom: '4px', marginTop: '15px' }}>Projects</h3>
          <input type="text" placeholder="Project Title Specification" value={newProj.title} onChange={e => setNewProj({ ...newProj, title: e.target.value })} style={{ width: '100%', padding: '6px', backgroundColor: '#111827', border: '1px solid #4b5563', color: '#fff' }} />
          <textarea placeholder="Project Summary / Description lines..." value={newProj.description} onChange={e => setNewProj({ ...newProj, description: e.target.value })} rows="2" style={{ width: '100%', padding: '6px', backgroundColor: '#111827', border: '1px solid #4b5563', color: '#fff', marginTop: '5px' }} />
          <button type="button" onClick={addProject} style={{ padding: '6px', backgroundColor: '#4b5563', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '5px', marginBottom: '5px' }}>+ Add Section Record</button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
            {projectList.map((p, idx) => (
              <div key={idx} style={{ background: '#374151', padding: '4px 8px', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🚀 {p.title}</span>
                <button type="button" onClick={() => removeProject(idx)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
              </div>
            ))}
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px', fontSize: '15px' }}>
            💾 Sync All Configurations
          </button>
        </form>
      </div>

      {/* RIGHT SIDE PANEL: LIVE INTERACTIVE PREVIEW MINI-SCREEN */}
      <div style={{ width: '55%', height: '100%', backgroundColor: '#ffffff', color: '#000000', overflowY: 'auto', borderLeft: '4px solid #38bdf8' }}>
        <div style={{ background: '#38bdf8', color: '#111827', padding: '6px 12px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          🖥️ Live Split Screen Interactive Preview
        </div>
        <div style={{ padding: '20px' }}>
          <ActiveComponent data={livePreviewTelemetry} />
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
