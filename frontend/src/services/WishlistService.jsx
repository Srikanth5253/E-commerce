import API from "./axios";

export const addToWishlist =
  async (productId) => {

    const response =
      await API.post(
        "/wishlist/add",
        {
          productId,
        }
      );

    return response.data;
  };

export const getWishlist =
  async () => {

    const response =
      await API.get(
        "/wishlist"
      );

    return response.data;
  };


export const removeFromWishlist =
  async (productId) => {

    const response =
      await API.delete(
        `/wishlist/remove/${productId}`
      );

    return response.data;
  };