import axios from 'axios';

// Function to get dynamic code and type
function getDynamicParams() {
  // Replace with actual logic to retrieve dynamic values
  const code = 'dynamicCode'; // Example: retrieve from a global state or context
  const type = 'dynamicType'; // Example: retrieve from a global state or context
  return { code, type };
}

const apiClient = axios.create({
  baseURL: 'https://deltadream.swevey.com/api',
});

// Add an interceptor to ensure these params are included in every request
apiClient.interceptors.request.use((config) => {
  // Ensure params object exists
  config.params = config.params || {};

  // Get dynamic params
  const { code, type } = getDynamicParams();

  // Add dynamic params while preserving any existing params
  config.params = {
    user_code: code,
    user_type: type,
    ...config.params
  };

  return config;
});

export default apiClient;
