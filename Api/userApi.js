import apiClient from './apiClient';

export const addGuest = async (formData) => {
  try {
    const response = await apiClient.post('/clients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding guest:', error);
    throw error;
  }
};

export const PostUpdateGuest = async (id, updateGuestData) => {
  try {
    const response = await apiClient.post(`/clients/update/${id}`, updateGuestData, {
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
