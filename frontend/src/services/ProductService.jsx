import API from "./axios";

export const addProduct =
  async (productData) => {

    const response =
      await API.post(
        "/admin/products/add",
        productData
      );

    return response.data;
  };

export const getProducts =
  async () => {

    const response =
      await API.get(
        "/user/products"
      );

    return response.data;
  };

export const getSingleProduct =
  async (id) => {

    const response =
      await API.get(
        `/user/products/${id}`
      );

    return response.data;
  };

export const updateProduct =
  async (
    id,
    productData
  ) => {

    const response =
      await API.put(
        `/admin/products/update/${id}`,
        productData
      );

    return response.data;
  };

export const deleteProduct =
  async (id) => {

    const response =
      await API.delete(
        `/admin/products/delete/${id}`
      );

    return response.data;
  };

export const addReview =
  async (
    productId,
    reviewData
  ) => {

    const response =
      await API.post(
        `/user/products/${productId}/review`,
        reviewData
      );

    return response.data;
  };

export const getRelatedProducts =
  async (id) => {

    const response =
      await API.get(
        `/user/products/related/${id}`
      );

    return response.data;
  };

