import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Courses.css';

export default function Courses({ role }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>Courses</h1>
        {role === 'teacher' && (
          <button className="create-btn" onClick={() => navigate('/create-course')}>
            + Create Course
          </button>
        )}
      </div>

      {courses.length === 0 ? (
        <div className="empty-state">
          <p>No courses available</p>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span className="teacher">👨‍🏫 {course.teacherId}</span>
                <span className="credits">⭐ {course.credits} credits</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}