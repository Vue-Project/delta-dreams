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

    export const postCancelReservation = async (id) => {
      try {
        const response = await apiClient.post(`/reservations/cancel/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error cancelling reservation with ID "${id}":`, error);
        throw error;
      }
    };
    export const updateWallet = async (walletData) => {
      try {
        const response = await apiClient.post(`/reservations/wallets/${walletData}`);
        return response.data;

      } catch (error) {
        console.error(`Error cancelling reservation with ID "${walletData}":`, error);
        throw error;
      }
    };
    export const postStatusChange = async (id,newStatus) => {
      try {
        const response = await apiClient.post(`/reservations/status/${id}`,newStatus);
        return response.data;


      } catch (error) {
        console.error(`Error cancelling reservation with ID "${newStatus}":`, error);
        throw error;
      }
    };



