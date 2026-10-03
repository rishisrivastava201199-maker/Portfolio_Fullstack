const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('token');

const headers = (auth = false) => {
  const h = { 'Content-Type': 'application/json' };
  if (auth) h['Authorization'] = `Token ${getToken()}`;
  return h;
};

const get = async (endpoint) => {
  const res = await fetch(`${API_BASE}${endpoint}`, { headers: headers() });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

const post = async (endpoint, data, auth = false) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: headers(auth),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

export const api = {
  // Public
  getAbout: () => get('/about/'),
  getProjects: () => get('/projects/'),
  getSkills: () => get('/skills/'),
  getExperience: () => get('/experience/'),
  getContact: () => get('/contact/'),
  submitMessage: (data) => post('/contact/submit/', data),

  // Auth
  login: (username, password) => post('/auth/login/', { username, password }),

  // Admin (authenticated)
  getMessages: () => get('/messages/'),
};

export default api;
