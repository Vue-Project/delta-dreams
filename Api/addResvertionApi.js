
import apiClient from './apiClient';

export const getBusinessSources = async () =>
{
  try {
    const response = await apiClient.get('/business-sources');
    // console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};
export const getBookingSources = async () =>
{
  try {
    const response = await apiClient.get('/booking-sources');
    // console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};
export const getReservationTypes = async () =>
{
  try {
    const response = await apiClient.get('/reservation-types');
    // console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};
export const postAddReservationData = async (bookingData) =>
{
  try {
    const response = await apiClient.post('/reservations' , bookingData);

    return response.data;

  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};
export const getGuestsInfo = async () =>
{
  try {
    const response = await apiClient.get('/users');
    // console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};


export const GetReservationItems = async (reservationId) =>
  {
    try {
      const response = await apiClient.get(`/reservations/${reservationId}`);
      return response.data;

    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }

export const PostReservationItems = async (reservationId ,updateReservationItems) =>
  {
    try {
      const response = await apiClient.post(`/reservation-items/${reservationId}` , updateReservationItems);
      return response.data;

    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }

  export const PutReservation = async (bookingData) => {
    try {
      // Use PUT method for updating a reservation
      const response = await apiClient.put(`/reservations/${7}`, bookingData);
      console.log('Update response:', response);

      return response.data;
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw error;
    }
  };
