import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://deltadream.swevey.com/api',
  params: {
    user_code: 'fLWKqJqshtwrX8vV',
    user_type: 'admin'
  }
});

// Add an interceptor to ensure these params are included in every request
apiClient.interceptors.request.use((config) => {
  // Ensure params object exists
  config.params = config.params || {};
  // Add default params while preserving any existing params
  config.params = {
    user_code: 'fLWKqJqshtwrX8vV',
    user_type: 'admin',
    ...config.params
  };

  return config;
});

export default apiClient;
