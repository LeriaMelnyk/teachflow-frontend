import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5280/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        setError(data.error || 'Помилка входу');
        setLoading(false);
        return;
      }

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        
        const decodedToken = JSON.parse(atob(data.access_token.split('.')[1]));
        const role = decodedToken.realm_access?.roles?.[0] || 'student';
        localStorage.setItem('role', role);

        navigate('/dashboard');
      } else {
        setError('Токен не отримано');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Помилка входу: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>

      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <div className="logo-icon">📚</div>
            <h1 className="app-title">TeachFlow</h1>
            <p className="app-subtitle">Освітня платформа нового покоління</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {error && (
              <div className="error-message">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username" className="form-label">Ім'я користувача</label>
              <div className="input-wrapper">
                <input
                  id="username"
                  type="text"
                  placeholder="Введіть ваше ім'я користувача"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                  className="form-input"
                />
                <div className="input-icon">👤</div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Пароль</label>
              <div className="input-wrapper password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Введіть ваш пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                  disabled={loading}
                  aria-label="Показати/приховати пароль"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`login-button ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Вхід...
                </>
              ) : (
                'Увійти'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Перший раз тут? <a href="#signup">Зверніться до адміністратора системи, аби зареєструватись</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}