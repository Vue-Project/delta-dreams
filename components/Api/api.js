import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://deltadream.swevey.com/api',
  timeout: 10000,
});

export const getRooms = async () =>
{
  try {
    const response = await apiClient.get('/rooms');
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export default {
  getRooms,
};
