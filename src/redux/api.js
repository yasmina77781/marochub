import axios from 'axios';

const API_BASE_URL = 'http://localhost:3011';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Startups API
export const startupsAPI = {
  getAll: () => api.get('/startups'),
  getById: (id) => api.get(`/startups/${id}`),
  create: (data) => api.post('/startups', data),
  update: (id, data) => api.put(`/startups/${id}`, data),
  delete: (id) => api.delete(`/startups/${id}`),
};

// Events API
export const eventsAPI = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  joinEvent: (id, userEmail) => {
    return api.get(`/events/${id}`).then(response => {
      const event = response.data;
      const updatedParticipants = [...event.participants, userEmail];
      return api.patch(`/events/${id}`, { participants: updatedParticipants });
    });
  },
  leaveEvent: (id, userEmail) => {
    return api.get(`/events/${id}`).then(response => {
      const event = response.data;
      const updatedParticipants = event.participants.filter(p => p !== userEmail);
      return api.patch(`/events/${id}`, { participants: updatedParticipants });
    });
  },
};

// Discussions API
export const discussionsAPI = {
  getAll: () => api.get('/discussions'),
  getById: (id) => api.get(`/discussions/${id}`),
  create: (data) => api.post('/discussions', data),
  update: (id, data) => api.put(`/discussions/${id}`, data),
  delete: (id) => api.delete(`/discussions/${id}`),
};

// Users/Auth API
export const usersAPI = {
  getAll: () => api.get('/users'),
  login: (email, password) => {
    return api.get(`/users?email=${email}&password=${password}`);
  },
  register: (data) => api.post('/users', data),
};

export default api;