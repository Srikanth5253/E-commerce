import mongoose
  from "mongoose";

const orderSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      orderItems: [
        {
          product: {
            type:
              mongoose.Schema.Types
                .ObjectId,

            ref: "Product",
          },

          title: String,

          image: String,

          price: Number,

          quantity: Number,
        },
      ],

      shippingAddress: {

        fullName: {
          type: String,
          required: true,
        },

        phone: {
          type: String,
          required: true,
        },

        address: {
          type: String,
          required: true,
        },

        city: {
          type: String,
          required: true,
        },

        state: {
          type: String,
          required: true,
        },

        pincode: {
          type: String,
          required: true,
        },
      },

      itemsPrice: {
        type: Number,
        required: true,
      },

      gstPrice: {
        type: Number,
        required: true,
      },

      deliveryPrice: {
        type: Number,
        default: 0,
      },

      totalPrice: {
        type: Number,
        required: true,
      },

      paymentMethod: {
        type: String,

        enum: [
          "COD",
          "ONLINE",
        ],

        default: "ONLINE",
      },

      isPaid: {
        type: Boolean,
        default: false,
      },

      paidAt: Date,

      refundStatus: {
        type: String,

        enum: [
          "Not Applicable",
          "Pending",
          "Processed",
        ],

        default: "Not Applicable",
      },

      refundRequestedAt: Date,

      refundedAt: Date,

      status: {
        type: String,

        enum: [
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
        ],

        default: "Processing",
      },

      deliveredAt: Date,
    },
    {
      timestamps: true,
    }
  );

const Order =
  mongoose.model(
    "Order",
    orderSchema
  );

export default Order;