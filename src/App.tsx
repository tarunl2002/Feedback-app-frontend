import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Feedback } from './types';

const App: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url));
    worker.onmessage = (event) => {
      setFeedbacks(event.data);
    };
    worker.postMessage(null);

    return () => {
      worker.terminate();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/feedback', { name, feedback });
      setName('');
      setFeedback('');
      const response = await axios.get('http://localhost:5000/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(feedbacks)

  return (
    <div>
      <h1>Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>All Feedback</h2>
      <ul>
        {feedbacks?.map((fb) => (
          <li key={fb.id}>
            <strong>{fb.name}:</strong> {fb.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
