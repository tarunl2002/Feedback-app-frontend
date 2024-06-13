import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Feedback {
  id: number;
  name: string;
  feedback: string;
}

const App: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Feedback[]>('https://feedback-app-sw6c.onrender.com/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('https://feedback-app-sw6c.onrender.com/feedback', { name, feedback });
      setName('');
      setFeedback('');

      // Fetch updated feedback list
      const response = await axios.get<Feedback[]>('https://feedback-app-sw6c.onrender.com/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif' as const,
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    textAlign: 'center' as const,
    color: '#333',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  };

  const labelStyle = {
    fontSize: '14px',
    color: '#555',
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'flex-end' as const,
  };

  const listStyle = {
    listStyleType: 'none' as const,
    padding: '0',
  };

  const listItemStyle = {
    backgroundColor: '#fff',
    margin: '10px 0',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Feedback</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
      <h2 style={titleStyle}>All Feedback</h2>
      <ul style={listStyle}>
        {feedbacks.map((fb) => (
          <li key={fb.id} style={listItemStyle}>
            <strong>{fb.name}:</strong> {fb.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;