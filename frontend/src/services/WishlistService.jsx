import API from "./axios";

export const addToWishlist =
  async (productId) => {

    const response =
      await API.post(
        "/api/wishlist/add",
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
        "/api/wishlist"
      );

    return response.data;
  };


export const removeFromWishlist =
  async (productId) => {

    const response =
      await API.delete(
        `/api/wishlist/remove/${productId}`
      );

    return response.data;
  };