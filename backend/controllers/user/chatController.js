import Conversation from "../../models/Conversation.js";
import Message from "../../models/Message.js";

export const createConversation = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    let conversation =
      await Conversation.findOne({
        user: userId,
        status: "open",
      });

    if (!conversation) {
      conversation =
        await Conversation.create({
          user: userId,
        });
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendMessage = async (
  req,
  res
) => {
  try {
    const { conversationId, text } =
      req.body;

    const senderId = req.user.id;

    const conversation =
      await Conversation.findById(
        conversationId
      );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message:
          "Conversation not found",
      });
    }

    let message =
      await Message.create({
        conversation: conversationId,
        sender: senderId,
        text,
      });


    message = await message.populate(
      "sender",
      "name email role"
    );


    conversation.lastMessage = text;

    conversation.lastMessageAt =
      new Date();


    conversation.unreadByAdmin += 1;

    await conversation.save();

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMessages = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const conversation =
      await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message:
          "Conversation not found",
      });
    }

    if (
      conversation.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const messages =
      await Message.find({
        conversation: id,
      })
        .populate(
          "sender",
          "name email role"
        )
        .sort({ createdAt: 1 });


    conversation.unreadByUser = 0;

    await conversation.save();

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};