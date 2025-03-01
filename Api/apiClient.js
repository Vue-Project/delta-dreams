import axios from 'axios';
// Import your store
import { state } from '../store/index'; // Adjust the path to your store


// Function to get dynamic code and type
function getDynamicParams() {
  // Check URL for code and type
  const urlParams = new URLSearchParams(window.location.search);
  const codeFromUrl = urlParams.get('code');
  const typeFromUrl = urlParams.get('type');

  // Retrieve code and type from the store if not in URL
  const code = codeFromUrl || state.code || 'defaultCode'; // Use a default if not set
  const type = typeFromUrl || state.type || 'defaultType'; // Use a default if not set
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
