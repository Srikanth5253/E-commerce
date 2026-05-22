// import API from "./axios";

// export const placeOrder =
//   async () => {

//     const response =
//       await API.post(
//         "/api/orders/place"
//       );

//     return response.data;
//   };

// export const getMyOrders =
//   async () => {

//     const response =
//       await API.get(
//         "/api/orders/my-orders"
//       );

//     return response.data;
//   };

// export const checkoutOrder =
//   async () => {

//     const response =
//       await API.post(
//         "/api/orders/checkout"
//       );

//     return response.data;
//   };

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