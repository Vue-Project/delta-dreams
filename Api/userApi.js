import apiClient from './apiClient';

export const addGuest = async (addGuestData) => {
  try {
    const response = await apiClient.post('/users', addGuestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding guest:', error);
    throw error;
  }
};

export const updateGuest = async (updateGuestData) => {
  try {
    const response = await apiClient.post('/clients/update', updateGuestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating guest:', error);
    throw error;
  }
};
