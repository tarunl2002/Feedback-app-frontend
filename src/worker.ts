import axios from 'axios';

onmessage = async () => {
  try {
    const response = await axios.get('http://localhost:3000/feedback');
    postMessage(response.data);
  } catch (error) {
    postMessage({ error: error.message });
  }
};
