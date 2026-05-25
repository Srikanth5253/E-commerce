import API from "./axios";

export const placeOrder =
  async (orderData) => {

    const response =
      await API.post(
        "/api/orders/place",
        orderData
      );

    return response.data;
  };

export const getMyOrders =
  async () => {

    const response =
      await API.get(
        "/api/orders/my-orders"
      );

    return response.data;
  };

export const getOrderById =
  async (id) => {

    const response =
      await API.get(
        `/api/orders/${id}`
      );

    return response.data;
  };

export const checkoutOrder =
  async (checkoutData) => {

    const response =
      await API.post(
        "/api/orders/checkout",
        checkoutData
      );

    return response.data;
  };

export const cancelOrder =
  async (id) => {

    const response =
      await API.put(
        `/api/orders/cancel/${id}`
      );

    return response.data;
  };