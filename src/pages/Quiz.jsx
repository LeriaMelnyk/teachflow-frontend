import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Quiz.css';

export default function Quiz() {
  const { assignmentId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [grade, setGrade] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchQuiz = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5161/api/quizzes/assignment/${assignmentId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      setQuiz(data);

      const initialAnswers = {};
      if (data.questions) {
        data.questions.forEach(q => {
          initialAnswers[q.id] = '';
        });
      }
      setAnswers(initialAnswers);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      alert('Error loading quiz');
    } finally {
      setLoading(false);
    }
  }, [assignmentId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5161/api/quizzes/${quiz.id}/submit`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ answers })
        }
      );

      if (response.ok) {
        const data = await response.json();
        setGrade(data.grade);
        setSubmitted(true);
      } else {
        alert('Error submitting quiz');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz');
    }
  };

  if (loading) return <div className="loading">Loading quiz...</div>;
  if (!quiz) return <div className="loading">Quiz not found</div>;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>{quiz.title}</h1>
        <button onClick={() => navigate('/courses')} className="back-btn">← Back</button>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="quiz-form">
          <div className="questions">
            {quiz.questions && quiz.questions.map((question, index) => (
              <div key={question.id} className="question-card">
                <h3>Question {index + 1}</h3>
                <p className="question-text">{question.text}</p>
                <input
                  type="text"
                  placeholder="Your answer"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="answer-input"
                />
              </div>
            ))}
          </div>
          <button type="submit" className="submit-btn">Submit Quiz</button>
        </form>
      ) : (
        <div className="result-card">
          <h2>Quiz Complete!</h2>
          <div className="grade-display">
            <span className="grade">{grade}%</span>
            <span className="label">Your Score</span>
          </div>
          <button onClick={() => navigate('/courses')} className="back-btn">Back to Courses</button>
        </div>
      )}
    </div>
  );
}