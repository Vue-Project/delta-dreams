import apiClient from './apiClient';

export const getRooms = async (tab,date ) => {
  try {
    const response = await apiClient.get('/rooms', {
      params: {
        date,
        tab,

      },
    });
    return response.data; // Ensure the server returns `data` and `meta` in the response
  } catch (error) {
    console.error(`Error fetching Rooms View for type "${tab}":`, error);
    throw error;
  }
};
