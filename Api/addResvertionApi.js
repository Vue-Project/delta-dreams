import apiClient from "./apiClient";

export const getBusinessSources = async () => {
  try {
    const response = await apiClient.get("/business_sources");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};
export const getBookingSources = async () => {
  try {
    const response = await apiClient.get("/booking_sources");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};
export const getUnitTypes = async () => {
  try {
    const response = await apiClient.get("/unit_types");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};
export const getUnits = async (unitTypeId, dateParams = {}) => {
  try {
    const params = { ...dateParams };
    const response = await apiClient.get(`/units?unit_type_id=${unitTypeId}`, {
      params,
    });
    return response.data;
    // const response = await apiClient.get(`/units?unit_type_id=${unitTypeId}`);
    // // console.log(response.data);
    // return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

// export const getReservationTypes = async () =>
// {
//   try {
//     const response = await apiClient.get('/reservation_types');
//     // console.log(response.data);
//     return response.data;

//   } catch (error) {
//     console.error('Error fetching rooms:', error);
//     throw error;
//   }
// };
export const postAddReservationData = async (bookingData) => {
  try {
    const response = await apiClient.post("/reservations", bookingData);

    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};
export const getGuestsInfo = async () => {
  try {
    const response = await apiClient.get("/clients");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};
export const getGuestDetails = async (guestId) => {
  try {
    const response = await apiClient.get(`/clients/${guestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetReservationItems = async (reservationId) => {
  try {
    const response = await apiClient.get(`/reservations/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const PostReservationItems = async (
  reservationId,
  updateReservationItems
) => {
  try {
    const response = await apiClient.post(
      `/reservation_items/${reservationId}`,
      updateReservationItems,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const PutUpdateReservation = async (reservationId, bookingData) => {
  try {
    // Use PUT method for updating a reservation
    const response = await apiClient.put(
      `/reservations/${reservationId}`,
      bookingData
    );

    return response.data;
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
};

export const getPaymentMethods = async () => {
  try {
    const response = await apiClient.get("/payments");
    return response.data;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    throw error;
  }
};
export const getPaymentTypes = async () => {
  try {
    const response = await apiClient.get("/payment_types");
    return response.data;
  } catch (error) {
    console.error("Error fetching payment types:", error);
    throw error;
  }
};
export const getAccounts = async () => {
  try {
    const response = await apiClient.get("/accounts");
    return response.data;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    throw error;
  }
};
export const getServices = async () => {
  try {
    const response = await apiClient.get("/services");
    return response.data;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    throw error;
  }
};
