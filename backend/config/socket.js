import { Server } from "socket.io";

let io;

export const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin:
        process.env.CLIENT_URLS.split(","),
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {

    console.log(
      "Socket connected:"
    );

    socket.on(
      "joinConversation",
      (conversationId) => {

        socket.join(
          conversationId
        );

        console.log(
          `Joined room: ${conversationId}`
        );
      }
    );

    socket.on(
      "sendMessage",
      ({ conversationId, message }) => {

        io.to(conversationId).emit(
          "newMessage",
          message
        );
      }
    );

    socket.on("disconnect", () => {

      console.log(
        "Socket disconnected"
      );
    });
  });

  return io;
};

export const getIO = () => {

  if (!io) {
    throw new Error(
      "Socket.io not initialized"
    );
  }

  return io;
};