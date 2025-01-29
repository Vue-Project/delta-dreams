import apiClient from './apiClient';

export const getReservationDataById = async (id) =>
  {
    try {
      const response = await apiClient.get(`/reservations/${id}`); // Adjust endpoint to fetch by ID
      return response.data;
    } catch (error) {
      console.error(`Error fetching reservation with ID "${id}":`, error);
      throw error; // Rethrow the error for handling in the caller
    }
  };
