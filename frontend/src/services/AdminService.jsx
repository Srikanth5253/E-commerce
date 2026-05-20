import API from "./axios";

export const getDashboardStats =
  async () => {

    const response =
      await API.get(
        "/admin/dashboard"
      );

    return response.data;
  };

export const getAllOrders =
  async () => {

    const response =
      await API.get(
        "/admin/orders"
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
        `/admin/orders/${orderId}`,
        {
          status,
        }
      );

    return response.data;
  };


export const getConversations =
  async () => {

    const response = await API.get(
      "/admin/chat/conversations"
    );

    return response.data;
  };

export const getChatMessages =
  async (conversationId) => {

    const response = await API.get(
      `/admin/chat/messages/${conversationId}`
    );

    return response.data;
  };

export const sendAdminMessage =
  async (payload) => {

    const response = await API.post(
      "/admin/chat/message",
      payload
    );

    return response.data;
  };