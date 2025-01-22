
import apiClient from './apiClient';

export const blockRoomService =  async (blockRoomData) =>
  {
    try{
      const response = await apiClient.post(`/blocks`, blockRoomData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;

    } catch (error) {
      console.error(`Error fetching reservation with ID "${id}":`, error);
      throw error; // Rethrow the error for handling in the caller
    }

  }
  // export const getCalenderAllUnits = async () =>
  // {
  //   try {
  //     const response = await apiClient.get(`/units`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching reservations:', error);
  //     throw error;
  //   }
  // };
  export const getReasonsSources = async () =>
    {
      try {
        const response = await apiClient.get('/reasons');
        return response.data;

      } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
      }
    };
    export const getCalenderAllUnits = async (dateRange) => {
      try {
        const response = await apiClient.get(`/units`, {
          params: {
            start: dateRange?.start,
            end: dateRange?.end
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching reservations:', error);
        throw error;
      }
    };
