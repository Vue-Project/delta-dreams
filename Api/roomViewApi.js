import apiClient from './apiClient';

export const getRooms = async () =>
{
  try {
    const response = await apiClient.get('/rooms');
    // console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};
