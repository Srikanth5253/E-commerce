import API from "./axios";

export const placeOrder =
  async () => {

    const response =
      await API.post(
        "/orders/place"
      );

    return response.data;
  };

export const getMyOrders =
  async () => {

    const response =
      await API.get(
        "/orders/my-orders"
      );

    return response.data;
  };

export const checkoutOrder =
  async () => {

    const response =
      await API.post(
        "/orders/checkout"
      );

    return response.data;
  };