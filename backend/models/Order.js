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

      itemsPrice: {
        type: Number,
        required: true,
      },

      gstPrice: {
        type: Number,
        required: true,
      },

      totalPrice: {
        type: Number,
        required: true,
      },

      paymentMethod: {
        type: String,
        default: "Stripe",
      },

      isPaid: {
        type: Boolean,
        default: false,
      },

      paidAt: Date,

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