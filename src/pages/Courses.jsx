import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Courses.css';
import { BookOpen, Plus, Users, Star, Clock, ArrowRight, Search, Filter } from 'lucide-react';

export default function Courses({ role }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5280/api/courses', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="courses-loading-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Завантаження курсів...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-wrapper">
      <div className="courses-background">
        <div className="course-blob blob-1"></div>
        <div className="course-blob blob-2"></div>
        <div className="course-blob blob-3"></div>
      </div>

      <div className="courses-container">
        <div className="courses-header">
          <div className="header-content">
            <div className="header-icon">📚</div>
            <div>
              <h1>Курси</h1>
              <p>Розвивайте нові навички та знання</p>
            </div>
          </div>

          {role === 'teacher' && (
            <button 
              className="create-btn"
              onClick={() => navigate('/create-course')}
              aria-label="Створити новий курс"
            >
              <Plus size={20} />
              <span>Новий курс</span>
            </button>
          )}
        </div>

        <div className="courses-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Пошук курсів..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-box">
            <Filter size={20} />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">Усі категорії</option>
              <option value="programming">Програмування</option>
              <option value="design">Дизайн</option>
              <option value="business">Бізнес</option>
              <option value="languages">Мови</option>
            </select>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📖</div>
            <h3>Курси не знайдені</h3>
            <p>Спробуйте змінити пошукові терміни або фільтри</p>
            {role === 'teacher' && (
              <button 
                className="empty-create-btn"
                onClick={() => navigate('/create-course')}
              >
                Створити перший курс
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="courses-info">
              <p>Знайдено <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'курс' : 'курсів'}</p>
            </div>

            <div className="courses-grid">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => navigate(`/course/${course.id}`)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="course-header-bg"></div>

                  <div className="course-icon">
                    <BookOpen size={32} />
                  </div>

                  <div className="course-content">
                    <h3 className="course-title">{course.name}</h3>
                    <p className="course-description">{course.description}</p>

                    <div className="course-stats">
                      <div className="stat">
                        <Users size={16} />
                        <span>{course.teacherId}</span>
                      </div>
                      <div className="stat">
                        <Star size={16} />
                        <span>{course.credits} кредитів</span>
                      </div>
                      <div className="stat">
                        <Clock size={16} />
                        <span>8 тижнів</span>
                      </div>
                    </div>

                    <div className="course-footer">
                      <span className="level-badge">Проміжний</span>
                      <div className="course-arrow">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}