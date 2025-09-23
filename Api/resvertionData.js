import apiClient from './apiClient';

export const getReservationData = async (type, page = 1, per_page = 10) => {
  try {
    const response = await apiClient.get('/reservations', {
      params: {
        type,
        page,
        per_page
      },
    });
    return response.data; // Ensure the server returns `data` and `meta` in the response
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



