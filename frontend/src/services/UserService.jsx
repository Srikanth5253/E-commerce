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
      "/user/chat/conversation"
    );

    return response.data;
  };

export const getUserMessages =
  async (conversationId) => {

    const response = await API.get(
      `/user/chat/messages/${conversationId}`
    );

    return response.data;
  };

export const sendUserMessage =
  async (payload) => {

    const response = await API.post(
      "/user/chat/message",
      payload
    );

    return response.data;
  };