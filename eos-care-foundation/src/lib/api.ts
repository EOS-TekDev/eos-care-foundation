import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    let message = error.response?.data?.message || error.message;
    
    // Parse Zod validation errors (JSON array string)
    if (message.startsWith('[')) {
      try {
        const errors = JSON.parse(message);
        message = errors[0]?.message || message;
      } catch {
        // Keep original message if parsing fails
      }
    }
    
    return Promise.reject(new Error(message));
  }
);

// Request interceptor for adding CSRF token and auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add CSRF token to state-changing requests
    if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
      const csrfToken = getCSRFToken();
      if (csrfToken && config.headers) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Helper function to get CSRF token from cookies
 */
const getCSRFToken = (): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; csrfToken=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
};

export default api;
