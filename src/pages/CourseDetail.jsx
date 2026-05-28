import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CourseDetail.css';
import { ArrowLeft, BookOpen, Users, Clock, Award, Share2, Heart, Download } from 'lucide-react';

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5280/api/courses/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="course-detail-loading">
        <div className="loading-spinner"></div>
        <p>Завантаження курсу...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <div className="not-found-icon">🔍</div>
        <h2>Курс не знайдено</h2>
        <p>На жаль, цей курс більше недоступний</p>
        <button onClick={() => navigate('/courses')} className="back-button">
          <ArrowLeft size={20} />
          Повернутися до курсів
        </button>
      </div>
    );
  }

  return (
    <div className="course-detail-wrapper">
      <div className="detail-background">
        <div className="detail-blob blob-1"></div>
        <div className="detail-blob blob-2"></div>
        <div className="detail-blob blob-3"></div>
      </div>

      <div className="course-detail-container">
        <button 
          onClick={() => navigate('/courses')}
          className="back-btn"
          aria-label="Повернутися"
        >
          <ArrowLeft size={20} />
          <span>Назад</span>
        </button>

        <div className="course-hero">
          <div className="hero-gradient"></div>
          <div className="hero-icon">📚</div>
          <div className="hero-content">
            <h1 className="course-title">{course.name}</h1>
            <p className="course-subtitle">{course.description}</p>
          </div>
          <div className="hero-actions">
            <button 
              className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="Добавити в обрані"
            >
              <Heart size={20} />
            </button>
            <button className="action-btn share-btn" aria-label="Поділитися">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="course-content">
          <div className="content-grid">
            <div className="main-section">
              <div className="section-card">
                <div className="card-header">
                  <h2>📖 Про курс</h2>
                </div>
                <div className="card-body">
                  <p className="full-description">
                    {course.description}
                  </p>

                  <div className="course-highlights">
                    <h3>Що ви вивчите</h3>
                    <ul>
                      <li>Основи та прогресивні техніки</li>
                      <li>Практичне застосування знань</li>
                      <li>Реальні проекти та завдання</li>
                      <li>Сертифікація після завершення</li>
                    </ul>
                  </div>

                  <div className="course-requirements">
                    <h3>Передумови</h3>
                    <ul>
                      <li>Базові знання в галузі</li>
                      <li>Комп'ютер та інтернет</li>
                      <li>Мотивація до навчання</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="section-card curriculum">
                <div className="card-header">
                  <h2>📚 Програма навчання</h2>
                </div>
                <div className="card-body">
                  <div className="curriculum-item">
                    <div className="module-number">1</div>
                    <div className="module-content">
                      <h4>Модуль: Вступ та основи</h4>
                      <p>8 уроків • 2 години</p>
                    </div>
                  </div>
                  <div className="curriculum-item">
                    <div className="module-number">2</div>
                    <div className="module-content">
                      <h4>Модуль: Проміжний рівень</h4>
                      <p>12 уроків • 4 години</p>
                    </div>
                  </div>
                  <div className="curriculum-item">
                    <div className="module-number">3</div>
                    <div className="module-content">
                      <h4>Модуль: Просунуті техніки</h4>
                      <p>15 уроків • 5 годин</p>
                    </div>
                  </div>
                  <div className="curriculum-item">
                    <div className="module-number">4</div>
                    <div className="module-content">
                      <h4>Модуль: Проектна робота</h4>
                      <p>6 уроків • 6 годин</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar">
              <div className="info-card sticky">
                <div className="info-header">
                  <h3>Інформація про курс</h3>
                </div>

                <div className="info-stats">
                  <div className="stat-row">
                    <div className="stat-icon">
                      <BookOpen size={20} />
                    </div>
                    <div className="stat-content">
                      <span className="stat-label">Код курсу</span>
                      <span className="stat-value">{course.code}</span>
                    </div>
                  </div>

                  <div className="stat-row">
                    <div className="stat-icon">
                      <Award size={20} />
                    </div>
                    <div className="stat-content">
                      <span className="stat-label">Кредити</span>
                      <span className="stat-value">{course.credits}</span>
                    </div>
                  </div>

                  <div className="stat-row">
                    <div className="stat-icon">
                      <Clock size={20} />
                    </div>
                    <div className="stat-content">
                      <span className="stat-label">Тривалість</span>
                      <span className="stat-value">8 тижнів</span>
                    </div>
                  </div>

                  <div className="stat-row">
                    <div className="stat-icon">
                      <Users size={20} />
                    </div>
                    <div className="stat-content">
                      <span className="stat-label">Студентів</span>
                      <span className="stat-value">0</span>
                    </div>
                  </div>
                </div>

                <div className="info-divider"></div>

                <div className="course-actions">
                  <button className="primary-btn">
                    <span>Записатися на курс</span>
                  </button>
                  <button className="secondary-btn">
                    <Download size={18} />
                    <span>Завантажити силабус</span>
                  </button>
                </div>

                <div className="instructor-info">
                  <h4>Викладач</h4>
                  <div className="instructor">
                    <div className="instructor-avatar">👨‍🏫</div>
                    <div>
                      <p className="instructor-name">Viktoria Naumenko</p>
                      <p className="instructor-role">Експерт в галузі</p>
                    </div>
                  </div>
                </div>

                <div className="course-tags">
                  <span className="tag">JavaScript</span>
                  <span className="tag">Web Development</span>
                  <span className="tag">Programming</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}