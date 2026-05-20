import API from "./axios";

export const getDashboardStats =
  async () => {

    const response =
      await API.get(
        "/api/admin/dashboard"
      );

    return response.data;
  };

export const getAllOrders =
  async () => {

    const response =
      await API.get(
        "/api/admin/orders"
      );

    return response.data;
  };


export const updateOrderStatus =
  async (
    orderId,
    status
  ) => {

    const response =
      await API.put(
        `/api/admin/orders/${orderId}`,
        {
          status,
        }
      );

    return response.data;
  };


export const getConversations =
  async () => {

    const response = await API.get(
      "/api/admin/chat/conversations"
    );

    return response.data;
  };

export const getChatMessages =
  async (conversationId) => {

    const response = await API.get(
      `/api/admin/chat/messages/${conversationId}`
    );

    return response.data;
  };

export const sendAdminMessage =
  async (payload) => {

    const response = await API.post(
      "/api/admin/chat/message",
      payload
    );

    return response.data;
  };