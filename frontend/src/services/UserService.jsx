import API from "./axios";

export const updateProfile =
  async (userData) => {

    const response =
      await API.put(
        "/api/auth/profile/update",
        userData
      );

    return response.data;
  };

export const createConversation =
  async () => {

    const response = await API.post(
      "/api/user/chat/conversation"
    );

    return response.data;
  };

export const getUserMessages =
  async (conversationId) => {

    const response = await API.get(
      `/api/user/chat/messages/${conversationId}`
    );

    return response.data;
  };

export const sendUserMessage =
  async (payload) => {

    const response = await API.post(
      "/api/user/chat/message",
      payload
    );

    return response.data;
  };

  export const getAddresses =
  async () => {

    const response =
      await API.get(
        "/api/users/address"
      );

    return response.data;
  };


export const addAddress =
  async (addressData) => {

    const response =
      await API.post(
        "/api/users/address",
        addressData
      );

    return response.data;
  };


export const updateAddress =
  async (
    id,
    addressData
  ) => {

    const response =
      await API.put(
        `/api/users/address/${id}`,
        addressData
      );

    return response.data;
  };


export const deleteAddress =
  async (id) => {

    const response =
      await API.delete(
        `/api/users/address/${id}`
      );

    return response.data;
  };