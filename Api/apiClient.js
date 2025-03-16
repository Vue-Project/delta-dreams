import axios from 'axios';
// Import your store
import { state } from '../store/index'; // Adjust the path to your store

// Function to check and save URL parameters
function checkAndSaveUrlParams() {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    const typeFromUrl = urlParams.get('type');

    // If URL parameters exist, save them to both store and localStorage
    if (codeFromUrl) {
      state.code = codeFromUrl;
      localStorage.setItem('user_code', codeFromUrl);
    }
    if (typeFromUrl) {
      state.type = typeFromUrl;
      localStorage.setItem('user_type', typeFromUrl);
    }
  }
}

// Function to get dynamic code and type
function getDynamicParams() {
  // First check URL/store values, then fallback to localStorage, then default values
  const code = state.code || localStorage.getItem('user_code') || 'defaultCode';
  const type = state.type || localStorage.getItem('user_type') || 'defaultType';

  // Keep store in sync with current values
  state.code = code;
  state.type = type;

  return { code, type };
}

// Only run the check if we're in a browser environment
if (typeof window !== 'undefined') {
  checkAndSaveUrlParams();
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
