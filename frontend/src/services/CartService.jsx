import API from "./axios";

export const addToCart =
  async (productId) => {

    const response =
      await API.post(
        "/cart/add",
        {
          productId,
        }
      );

    return response.data;
  };

export const getCart =
  async () => {

    const response =
      await API.get(
        "/cart"
      );

    return response.data;
  };


export const updateCartQuantity =
  async (
    productId,
    action
  ) => {

    const response =
      await API.put(
        "/cart/update-quantity",
        {
          productId,
          action,
        }
      );

    return response.data;
  };

export const removeFromCart =
  async (productId) => {
    const response =
      await API.delete(
        `/cart/remove/${productId}`
      );

    return response.data;
  };