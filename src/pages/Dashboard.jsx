import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

export default function Dashboard({ role, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>TeachFlow</h1>
        <div className="nav-links">
          {role === 'teacher' && (
            <>
              <button onClick={() => navigate('/courses')}>Courses</button>
              <button onClick={() => navigate('/create-course')}>Create Course</button>
            </>
          )}
          {role === 'student' && (
            <button onClick={() => navigate('/courses')}>My Courses</button>
          )}
          {role === 'admin' && (
            <>
              <button onClick={() => navigate('/admin')}>Admin Panel</button>
              <button onClick={() => navigate('/courses')}>All Courses</button>
            </>
          )}
          <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-box">
          <h2>Welcome, {role}!</h2>
          <p>
            {role === 'teacher' && 'Create courses, assignments and quizzes for your students'}
            {role === 'student' && 'View your courses and complete assignments'}
            {role === 'admin' && 'Manage users and courses'}
          </p>
        </div>

        <div className="quick-actions">
          {role === 'teacher' && (
            <div className="action-card">
              <h3>Create New Course</h3>
              <p>Build a new course with assignments and quizzes</p>
              <button onClick={() => navigate('/create-course')}>Start</button>
            </div>
          )}
          {role === 'student' && (
            <div className="action-card">
              <h3>View Courses</h3>
              <p>Access your enrolled courses</p>
              <button onClick={() => navigate('/courses')}>Browse</button>
            </div>
          )}
          {role === 'admin' && (
            <div className="action-card">
              <h3>Manage Users</h3>
              <p>Create and manage teachers and students</p>
              <button onClick={() => navigate('/admin')}>Go</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}