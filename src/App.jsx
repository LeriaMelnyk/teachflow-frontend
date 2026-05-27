import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Quiz from './pages/Quiz';
import AdminPanel from './pages/AdminPanel';
import CourseDetail from './pages/CourseDetail';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setToken(storedToken);
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {token ? (
          <>
            <Route path="/dashboard" element={<Dashboard role={role} onLogout={handleLogout} />} />
            <Route path="/courses" element={<Courses role={role} />} />
            <Route path="/quiz/:assignmentId" element={<Quiz />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            {role === 'admin' && <Route path="/admin" element={<AdminPanel />} />}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;