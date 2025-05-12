import apiClient from './apiClient';

export const blockRoomService = async blockRoomData => {
    try {
        const response = await apiClient.post(`/blocks`, blockRoomData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching reservation with ID "${id}":`, error);
        throw error; // Rethrow the error for handling in the caller
    }
};
export const getReasonsSources = async () => {
    try {
        const response = await apiClient.get('/reasons');
        return response.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
};
export const getCalenderAllUnits = async dateRange => {
    try {
        const response = await apiClient.get(`/calender`, {
            params: {
                start_date: dateRange?.start,
                end_date: dateRange?.end,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw error;
    }
};
export const deleteBlock = async id => {
    try {
        const response = await apiClient.delete(`/blocks/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting block:', error);
        throw error;
    }
};
export const postUpdateReservation = async (id, updateDataUnit) => {
    try {
        const response = await apiClient.post(`/reservations/updatedata/${id}`, updateDataUnit);
        return response.data;
    } catch (error) {
        console.error('Error deleting block:', error);
        throw error;
    }
};
export const putUpdateBlock = async (id, updateDataBlock) => {
    try {
        const response = await apiClient.put(`/blocks/${id}`, updateDataBlock);
        return response.data;
    } catch (error) {
        console.error('Error deleting block:', error);
        throw error;
    }
};
export const getCalenderFilter = async filterCalender => {
    try {
        const response = await apiClient.get('/calender', {
            params: filterCalender,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw error;
    }
};
export const getSettingsSite = async () => {
    try {
        const response = await apiClient.get('/settings');
        return response.data;
    } catch (error) {
        console.error('Error fetching settings:', error);
        throw error;
    }
};
