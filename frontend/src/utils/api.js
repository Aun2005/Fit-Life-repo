import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Success:', response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('❌ API Error Response:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('❌ No Response from Server. Is backend running on port 5000?');
      console.error('Backend URL:', API_URL);
    } else {
      console.error('❌ Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  getUsers: () => api.get('/auth/users'),
  deleteUser: (id) => api.delete(`/auth/users/${id}`),
};

// Workout APIs
export const workoutAPI = {
  getAll: (filters) => api.get('/workouts', { params: filters }),
  getById: (id) => api.get(`/workouts/${id}`),
  create: (workoutData) => {
    const formData = new FormData();
    Object.keys(workoutData).forEach(key => {
      if (key === 'image' && workoutData[key]) {
        formData.append('image', workoutData[key]);
      } else if (typeof workoutData[key] === 'object') {
        formData.append(key, JSON.stringify(workoutData[key]));
      } else {
        formData.append(key, workoutData[key]);
      }
    });
    return api.post('/workouts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id, workoutData) => {
    const formData = new FormData();
    Object.keys(workoutData).forEach(key => {
      if (key === 'image' && workoutData[key]) {
        formData.append('image', workoutData[key]);
      } else if (typeof workoutData[key] === 'object') {
        formData.append(key, JSON.stringify(workoutData[key]));
      } else {
        formData.append(key, workoutData[key]);
      }
    });
    return api.put(`/workouts/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => api.delete(`/workouts/${id}`),
};

// Diet APIs
export const dietAPI = {
  getAll: (filters) => api.get('/diets', { params: filters }),
  getById: (id) => api.get(`/diets/${id}`),
  create: (dietData) => {
    const formData = new FormData();
    Object.keys(dietData).forEach(key => {
      if (key === 'image' && dietData[key]) {
        formData.append('image', dietData[key]);
      } else if (typeof dietData[key] === 'object') {
        formData.append(key, JSON.stringify(dietData[key]));
      } else {
        formData.append(key, dietData[key]);
      }
    });
    return api.post('/diets', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id, dietData) => {
    const formData = new FormData();
    Object.keys(dietData).forEach(key => {
      if (key === 'image' && dietData[key]) {
        formData.append('image', dietData[key]);
      } else if (typeof dietData[key] === 'object') {
        formData.append(key, JSON.stringify(dietData[key]));
      } else {
        formData.append(key, dietData[key]);
      }
    });
    return api.put(`/diets/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => api.delete(`/diets/${id}`),
};

// Membership APIs
export const membershipAPI = {
  getAll: () => api.get('/memberships'),
  getById: (id) => api.get(`/memberships/${id}`),
  create: (membershipData) => api.post('/memberships', membershipData),
  update: (id, membershipData) => api.put(`/memberships/${id}`, membershipData),
  delete: (id) => api.delete(`/memberships/${id}`),
};

// Contact APIs
export const contactAPI = {
  submit: (contactData) => api.post('/contact', contactData),
  getAll: () => api.get('/contact'),
  getById: (id) => api.get(`/contact/${id}`),
  reply: (id, replyData) => api.put(`/contact/${id}/reply`, replyData),
  delete: (id) => api.delete(`/contact/${id}`),
};

export default api;