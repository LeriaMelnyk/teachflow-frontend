import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { LogOut, BookOpen, PlusCircle, Users, Award, Settings } from 'lucide-react';

export default function Dashboard({ role, onLogout }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeGreeting, setTimeGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeGreeting('Доброго ранку');
    else if (hour < 18) setTimeGreeting('Добрий день');
    else setTimeGreeting('Доброго вечора');
  }, []);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'teacher':
        return '👨‍🏫';
      case 'student':
        return '👨‍🎓';
      case 'admin':
        return '👨‍💼';
      default:
        return '👤';
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'teacher':
        return 'Викладач';
      case 'student':
        return 'Студент';
      case 'admin':
        return 'Адміністратор';
      default:
        return 'Користувач';
    }
  };

  const getRoleDescription = () => {
    switch (role) {
      case 'teacher':
        return 'Створюйте курси, завдання та тести для студентів';
      case 'student':
        return 'Переглядайте ваші курси та виконуйте завдання';
      case 'admin':
        return 'Керуйте користувачами та курсами системи';
      default:
        return 'Ласкаво просимо в TeachFlow';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-background">
        <div className="dash-blob dash-blob-1"></div>
        <div className="dash-blob dash-blob-2"></div>
        <div className="dash-blob dash-blob-3"></div>
      </div>

      <nav className="navbar">
        <div className="navbar-brand">
          <div className="brand-icon">📚</div>
          <h1>TeachFlow</h1>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {role === 'teacher' && (
            <>
              <button
                className="nav-btn nav-primary"
                onClick={() => {
                  navigate('/courses');
                  setIsMobileMenuOpen(false);
                }}
              >
                <BookOpen size={18} />
                <span>Мої курси</span>
              </button>
              <button
                className="nav-btn nav-secondary"
                onClick={() => {
                  navigate('/create-course');
                  setIsMobileMenuOpen(false);
                }}
              >
                <PlusCircle size={18} />
                <span>Новий курс</span>
              </button>
            </>
          )}
          {role === 'student' && (
            <button
              className="nav-btn nav-primary"
              onClick={() => {
                navigate('/courses');
                setIsMobileMenuOpen(false);
              }}
            >
              <BookOpen size={18} />
              <span>Мої курси</span>
            </button>
          )}
          {role === 'admin' && (
            <>
              <button
                className="nav-btn nav-primary"
                onClick={() => {
                  navigate('/admin');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Users size={18} />
                <span>Керування</span>
              </button>
              <button
                className="nav-btn nav-secondary"
                onClick={() => {
                  navigate('/courses');
                  setIsMobileMenuOpen(false);
                }}
              >
                <BookOpen size={18} />
                <span>Курси</span>
              </button>
            </>
          )}
          <button
            onClick={() => {
              handleLogoutClick();
              setIsMobileMenuOpen(false);
            }}
            className="nav-btn logout-btn"
          >
            <LogOut size={18} />
            <span>Вихід</span>
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <div className="welcome-box">
            <div className="welcome-header">
              <div className="role-badge">{getRoleIcon()}</div>
              <div className="welcome-text">
                <h2>{timeGreeting}! 👋</h2>
                <p className="role-name">{getRoleTitle()}</p>
              </div>
            </div>
            <p className="welcome-description">{getRoleDescription()}</p>
            <div className="welcome-stats">
              <div className="stat-item">
                <span className="stat-value">+5</span>
                <span className="stat-label">Активні</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-label">Готові</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">🔥</span>
                <span className="stat-label">Мотивація</span>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions-section">
          <h3 className="section-title">Швидкі дії</h3>
          <div className="quick-actions">
            {role === 'teacher' && (
              <>
                <div className="action-card">
                  <div className="card-icon" style={{ background: 'linear-gradient(135deg, #CCD5AE, #E4ACB2)' }}>
                    <PlusCircle size={32} />
                  </div>
                  <h3>Новий курс</h3>
                  <p>Створіть новий курс з завданнями та тестами</p>
                  <button
                    className="action-btn"
                    onClick={() => navigate('/create-course')}
                  >
                    Почати →
                  </button>
                </div>

                <div className="action-card">
                  <div className="card-icon" style={{ background: 'linear-gradient(135deg, #EABCA8, #99BAB9)' }}>
                    <BookOpen size={32} />
                  </div>
                  <h3>Мої курси</h3>
                  <p>Керуйте своїми курсами та студентами</p>
                  <button
                    className="action-btn"
                    onClick={() => navigate('/courses')}
                  >
                    Переглянути →
                  </button>
                </div>

                <div className="action-card">
                  <div className="card-icon" style={{ background: 'linear-gradient(135deg, #99BAB9, #FAEDCD)' }}>
                    <Settings size={32} />
                  </div>
                  <h3>Параметри</h3>
                  <p>Налаштуйте свій профіль та кортеж</p>
                  <button className="action-btn">
                    Налаштувати →
                  </button>
                </div>
              </>
            )}

            {role === 'student' && (
              <>
                <div className="action-card">
                  <div className="card-icon" style={{ background: 'linear-gradient(135deg, #CCD5AE, #E4ACB2)' }}>
                    <BookOpen size={32} />
                  </div>
                  <h3>Мої курси</h3>
                  <p>Переглядайте свої записані курси</p>
                  <button
                    className="action-btn"
                    onClick={() => navigate('/courses')}
                  >
                    Переглянути →
                  </button>
                </div>

                <div className="action-card">
                  <div className="card-icon" style={{ background: 'linear-gradient(135deg, #EABCA8, #99BAB9)' }}>
                    <Award size={32} />
                  </div>
                  <h3>Успіхи</h3>
                  <p>Перегляньте свої оцінки та сертифікати</p>
                  <button className="action-btn">
                    Перевірити →
                  </button>
                </div>

                <div className="action-card">
                  <div className="card-icon" style={{ background: 'linear-gradient(135deg, #99BAB9, #FAEDCD)' }}>
                    <Settings size={32} />
                  </div>
                  <h3>Профіль</h3>
                  <p>Редагуйте свій профіль та налаштування</p>
                  <button className="action-btn">
                    Редагувати →
                  </button>
                </div>
              </>
            )}

            {role === 'admin' && (
              <>
                <div className="action-card">
                  <div className="card-icon" style={{ background: 'linear-gradient(135deg, #CCD5AE, #E4ACB2)' }}>
                    <Users size={32} />
                  </div>
                  <h3>Керування користувачами</h3>
                  <p>Створюйте та керуйте користувачами</p>
                  <button
                    className="action-btn"
                    onClick={() => navigate('/admin')}
                  >
                    До панелі →
                  </button>
                </div>

                <div className="action-card">
                  <div className="card-icon" style={{ background: 'linear-gradient(135deg, #EABCA8, #99BAB9)' }}>
                    <BookOpen size={32} />
                  </div>
                  <h3>Всі курси</h3>
                  <p>Переглядайте та керуйте всіма курсами</p>
                  <button
                    className="action-btn"
                    onClick={() => navigate('/courses')}
                  >
                    Переглянути →
                  </button>
                </div>

                <div className="action-card">
                  <div className="card-icon" style={{ background: 'linear-gradient(135deg, #99BAB9, #FAEDCD)' }}>
                    <Settings size={32} />
                  </div>
                  <h3>Налаштування системи</h3>
                  <p>Налаштуйте параметри системи</p>
                  <button className="action-btn">
                    Конфігурація →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}