import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';
import { ArrowLeft, User, Mail, Lock, Shield, Check, AlertCircle } from 'lucide-react';

export default function AdminPanel() {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

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

      const text = await response.text();
      console.log('Raw response:', text);

      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      console.log('Parsed response:', data);

      if (response.ok) {
        setSuccess(data.message || 'Користувач успішно створений! 🎉');

        setNewUser({
          username: '',
          email: '',
          password: '',
          role: 'student'
        });

        setTimeout(() => setSuccess(''), 5000);
      } else {
        setError(data.error || data.message || 'Помилка при створенні користувача');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Помилка: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return '#E4ACB2';
      case 'teacher':
        return '#EABCA8';
      case 'student':
        return '#CCD5AE';
      default:
        return '#99BAB9';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Адміністратор';
      case 'teacher':
        return 'Викладач';
      case 'student':
        return 'Студент';
      default:
        return 'Студент';
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-background">
        <div className="admin-blob blob-1"></div>
        <div className="admin-blob blob-2"></div>
        <div className="admin-blob blob-3"></div>
      </div>

      <div className="admin-container">
        <div className="admin-header">
          <div className="header-content">
            <button
              onClick={() => navigate('/dashboard')}
              className="back-btn"
              aria-label="Повернутися"
            >
              <ArrowLeft size={20} />
              <span>Назад</span>
            </button>
            <div className="header-title">
              <div className="title-icon">⚙️</div>
              <div>
                <h1>Admin Panel</h1>
                <p>Управління користувачами системи</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-content">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Створити нового користувача</h2>
              <p>Заповніть форму для реєстрації нового користувача в системі</p>
            </div>

            {success && (
              <div className="alert alert-success">
                <Check size={20} />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="user-form">
              {/* Username Field */}
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Ім'я користувача
                </label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    id="username"
                    type="text"
                    placeholder="введіть ім'я користувача"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        username: e.target.value
                      })
                    }
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    id="email"
                    type="email"
                    placeholder="користувач@example.com"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        email: e.target.value
                      })
                    }
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Пароль
                </label>
                <div className="input-wrapper password-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="введіть надійний пароль"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        password: e.target.value
                      })
                    }
                    required
                    disabled={loading}
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password"
                    disabled={loading}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Role Field */}
              <div className="form-group">
                <label htmlFor="role" className="form-label">
                  Роль
                </label>
                <div className="role-select-wrapper">
                  <Shield className="input-icon" size={20} />
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        role: e.target.value
                      })
                    }
                    disabled={loading}
                    className="form-select"
                  >
                    <option value="student">👨‍🎓 Студент</option>
                    <option value="teacher">👨‍🏫 Викладач</option>
                    <option value="admin">👨‍💼 Адміністратор</option>
                  </select>
                  <div
                    className="role-indicator"
                    style={{ backgroundColor: getRoleColor(newUser.role) }}
                  >
                    {getRoleLabel(newUser.role)}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`create-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Створення...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    Створити користувача
                  </>
                )}
              </button>
            </form>

            <div className="form-info">
              <p>💡 Новий користувач отримає email з посиланням для активації облікового запису.</p>
            </div>
          </div>

          <div className="info-card">
            <h3>📋 Інформація про ролі</h3>
            <div className="role-info">
              <div className="role-item">
                <div className="role-badge" style={{ backgroundColor: '#CCD5AE' }}>
                  👨‍🎓
                </div>
                <div>
                  <strong>Студент</strong>
                  <p>Доступ до курсів і завдань</p>
                </div>
              </div>
              <div className="role-item">
                <div className="role-badge" style={{ backgroundColor: '#EABCA8' }}>
                  👨‍🏫
                </div>
                <div>
                  <strong>Викладач</strong>
                  <p>Створення курсів і оцінювання</p>
                </div>
              </div>
              <div className="role-item">
                <div className="role-badge" style={{ backgroundColor: '#E4ACB2' }}>
                  👨‍💼
                </div>
                <div>
                  <strong>Адміністратор</strong>
                  <p>Повний контроль системи</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}