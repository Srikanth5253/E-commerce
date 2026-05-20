import API from "./axios";

export const addProduct =
  async (productData) => {

    const response =
      await API.post(
        "/api/admin/products/add",
        productData
      );

    return response.data;
  };

export const getProducts =
  async () => {

    const response =
      await API.get(
        "/api/user/products"
      );

    return response.data;
  };

export const getSingleProduct =
  async (id) => {

    const response =
      await API.get(
        `/api/user/products/${id}`
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
        `/api/admin/products/update/${id}`,
        productData
      );

    return response.data;
  };

export const deleteProduct =
  async (id) => {

    const response =
      await API.delete(
        `/api/admin/products/delete/${id}`
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
        `/api/user/products/${productId}/review`,
        reviewData
      );

    return response.data;
  };

export const getRelatedProducts =
  async (id) => {

    const response =
      await API.get(
        `/api/user/products/related/${id}`
      );

    return response.data;
  };

