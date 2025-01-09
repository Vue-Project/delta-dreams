import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://deltadream.swevey.com/api',
  // timeout: 10000,
});

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
export const getUsers = async () =>
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

export const getReservationData = async (type) =>
{
  try {
    const response = await apiClient.get('/reservations', {
      params: { type },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching reservations for type "${type}":`, error);
    throw error;
  }
};

export const geDataId = async (id) =>
{
  try {
    const response = await apiClient.get(`/reservations/${id}`

    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};
export const getCalenderData = async () =>
{
  try {
    const response = await apiClient.get(`/units`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};
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
// export const getReservationDataById = async (id) =>
// {
//   try {
//     const response = await apiClient.get(`/reservations/${id}`); // Adjust endpoint to fetch by ID
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching reservation with ID "${id}":`, error);
//     throw error; // Rethrow the error for handling in the caller
//   }
// };
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
export const addGuest =  async (formGuestData) =>
  {
    try{
      const response = await apiClient.post(`/users`, formGuestData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;

    } catch (error) {
      console.error(`Error fetching Guest:`, error);
      throw error; // Rethrow the error for handling in the caller
    }

  }







export default {
  getRooms,
  getBusinessSources,
  getBookingSources,
  getReservationTypes,
  getCalenderData,
  getReasonsSources,
  blockRoomService
};
