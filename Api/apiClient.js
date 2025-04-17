import axios from 'axios';

// Helper function to get store safely
function getStore() {
  if (process.client && window.$nuxt) {
    return window.$nuxt.$store;
  }
  return null;
}

// Function to check and save URL parameters
function checkAndSaveUrlParams() {
  const store = getStore();
  if (store) {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    const typeFromUrl = urlParams.get('type');

    // Get existing values from store
    const existingCode = store.state.code;
    const existingType = store.state.type;

    // Save values, prioritizing URL params over existing values
    store.commit('setParams', {
      code: codeFromUrl || existingCode,
      type: typeFromUrl || existingType
    });
  }
}

// Function to get dynamic code and type
function getDynamicParams() {
  const store = getStore();
  if (!store) return { code: '', type: '' };

  // Ensure we're getting the latest values from store
  const storeCode = store.state.code;
  const storeType = store.state.type;

  // Return stored values or empty strings
  return {
    code: storeCode || '',
    type: storeType || ''
  };
}

// Initialize store when Nuxt is ready AND on page load
if (process.client) {
  // Initial check on page load
  window.addEventListener('load', () => {
    checkAndSaveUrlParams();
  });

  // Check when Nuxt is ready
  window.onNuxtReady(() => {
    checkAndSaveUrlParams();
  });
}

const apiClient = axios.create({
  baseURL: 'https://testdeltadream.swevey.com/api',
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
