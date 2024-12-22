import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://deltadream.swevey.com/api',
  timeout: 10000,
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
export const postUsers = async (body) =>
{
  try {
    const response = await apiClient.post('/users', body);
    // console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};


export default {
  getRooms,
  getBusinessSources,
  getBookingSources,
  getReservationTypes
};
