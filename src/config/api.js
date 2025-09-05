// Production API Configuration
export const BASE_URL = 'https://derensra.com/elfign-backend';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
  },
  POSTS: {
    ALL: '/api/posts',
    SINGLE: (id) => `/api/posts/${id}`,
    CREATE: '/api/posts',
    UPDATE: (id) => `/api/posts/${id}`,
    DELETE: (id) => `/api/posts/${id}`,
  },
  UPLOAD: {
    IMAGE: '/api/upload/image',
  },
  HEALTH: '/api/health',
};

export const getApiUrl = (endpoint) => {
  return `${BASE_URL}${endpoint}`;
};