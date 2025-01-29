import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://deltadream.swevey.com/api',
});

export default apiClient;
