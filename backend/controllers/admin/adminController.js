import Product
  from "../../models/Product.js";

import User
  from "../../models/User.js";

import Order
  from "../../models/Order.js";

import stripe
  from "../../config/stripe.js";

export const getDashboardStats =
  async (
    req,
    res,
    next
  ) => {

    try {

      const totalProducts =
        await Product.countDocuments();

      const totalUsers =
        await User.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      res.status(200).json({
        success: true,

        totalProducts,
        totalUsers,
        totalOrders,
      });

    } catch (error) {

      next(error);
    }
  };

export const getAllOrders =
  async (
    req,
    res,
    next
  ) => {

    try {

      const orders =
        await Order.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        orders,
      });

    } catch (error) {

      next(error);
    }
  };

export const updateOrderStatus =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        status,
      } = req.body;

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        res.status(404);

        throw new Error(
          "Order not found"
        );
      }

      if (
        order.status ===
        "Delivered" ||

        order.status ===
        "Cancelled"
      ) {

        res.status(400);

        throw new Error(
          "Completed orders cannot be modified"
        );
      }

      if (
        order.status ===
        "Shipped" &&

        status ===
        "Cancelled"
      ) {

        res.status(400);

        throw new Error(
          "Shipped orders cannot be cancelled"
        );
      }

      if (
        status ===
        "Cancelled"
      ) {

        for (
          const item of
          order.orderItems
        ) {

          const product =
            await Product.findById(
              item.product
            );

          if (product) {

            product.stock +=
              item.quantity;

            product.sold -=
              item.quantity;

            await product.save();
          }
        }

        if (
          order.isPaid
        ) {

          order.refundStatus =
            "Pending";

          order.refundRequestedAt =
            Date.now();
        }
      }

      order.status =
        status;

      if (
        status ===
        "Delivered"
      ) {

        order.deliveredAt =
          Date.now();
      }

      if (

        status ===
        "Delivered" &&

        order.paymentMethod ===
        "COD"

      ) {

        order.isPaid =
          true;

        order.paidAt =
          Date.now();
      }

      await order.save();

      res.status(200).json({
        success: true,

        message:
          "Order status updated",

        order,
      });

    } catch (error) {

      next(error);
    }
  };

export const processRefund =
  async (
    req,
    res,
    next
  ) => {

    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        res.status(404);

        throw new Error(
          "Order not found"
        );
      }

      if (
        !order.isPaid
      ) {

        res.status(400);

        throw new Error(
          "Refund not applicable"
        );
      }

      if (
        order.refundStatus !==
        "Pending"
      ) {

        res.status(400);

        throw new Error(
          "Refund already processed"
        );
      }

      if (
        order.paymentMethod ===
        "ONLINE"
      ) {

        if (
          !order.paymentIntentId
        ) {

          res.status(400);

          throw new Error(
            "Payment Intent ID missing"
          );
        }

        await stripe.refunds.create({

          payment_intent:
            order.paymentIntentId,

        });
      }

      order.refundStatus =
        "Processed";

      order.refundedAt =
        Date.now();

      await order.save();

      res.status(200).json({

        success: true,

        message:
          "Refund processed successfully",

        order,
      });

    } catch (error) {

      next(error);
    }
  };