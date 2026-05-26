import Conversation from "../../models/Conversation.js";
import Message from "../../models/Message.js";

import { getIO } from "../../config/socket.js";

export const getAdminConversations =
    async (req, res) => {
        try {

            const conversations =
                await Conversation.find()
                    .populate(
                        "user",
                        "name email"
                    )
                    .sort({
                        lastMessageAt: -1,
                    });

            res.status(200).json({
                success: true,
                conversations,
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

export const getAdminMessages =
    async (req, res) => {

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

            const messages =
                await Message.find({
                    conversation: id,
                })
                    .populate(
                        "sender",
                        "name email role"
                    )
                    .sort({
                        createdAt: 1,
                    });

            conversation.unreadByAdmin = 0;

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


export const adminSendMessage =
    async (req, res) => {

        try {

            const {
                conversationId,
                text,
            } = req.body;

            const senderId =
                req.user.id;

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
                    conversation:
                        conversationId,
                    sender: senderId,
                    text,
                });

            message =
                await message.populate(
                    "sender",
                    "name email role"
                );

            conversation.lastMessage =
                text;

            conversation.lastMessageAt =
                new Date();

            conversation.unreadByUser += 1;

            await conversation.save();


            getIO().to(conversationId).emit(
                "newMessage",
                message
            );

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