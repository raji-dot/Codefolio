import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import TemplateEngine from './Templates/TemplateEngine'
import { useAuth } from './Context/AuthContext' // Assuming you export a custom hook

// Protected Route Component to block unauthorized users
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // or however your AuthContext tracks auth state
  
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      {/* Public Guest Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Dashboard Settings Panel */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Dynamic Vanity Portfolio Wildcard */}
      <Route path="/:username" element={<TemplateEngine />} />
      
      {/* Fallback Catch-All Endpoint */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
