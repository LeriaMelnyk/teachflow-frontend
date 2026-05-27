import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';

export default function AdminPanel() {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student'
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5280/api/users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      // читаємо як текст
      const text = await response.text();

      console.log('Raw response:', text);

      // пробуємо перетворити в json
      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      console.log('Parsed response:', data);

      if (response.ok) {
        alert(data.message || 'User created successfully');

        setNewUser({
          username: '',
          email: '',
          password: '',
          role: 'student'
        });
      } else {
        alert(data.error || data.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>

        <button
          onClick={() => navigate('/dashboard')}
          className="back-btn"
        >
          ← Back
        </button>
      </div>

      <div className="admin-content">
        <div className="create-user-section">
          <h2>Create New User</h2>

          <form onSubmit={handleCreateUser} className="user-form">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  username: e.target.value
                })
              }
              required
              disabled={loading}
            />

            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value
                })
              }
              required
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  password: e.target.value
                })
              }
              required
              disabled={loading}
            />

            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  role: e.target.value
                })
              }
              disabled={loading}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="create-btn"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}