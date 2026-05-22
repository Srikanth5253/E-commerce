import Product
  from "../../models/Product.js";

import User
  from "../../models/User.js";

import Order
  from "../../models/Order.js";

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

// export const updateOrderStatus =
//   async (
//     req,
//     res,
//     next
//   ) => {

//     try {

//       const {
//         status,
//       } = req.body;

//       const order =
//         await Order.findById(
//           req.params.id
//         );

//       if (!order) {

//         res.status(404);

//         throw new Error(
//           "Order not found"
//         );
//       }

//       order.status =
//         status;

//       if (
//         status ===
//         "Delivered"
//       ) {

//         order.deliveredAt =
//           Date.now();
//       }

//       await order.save();

//       res.status(200).json({
//         success: true,

//         message:
//           "Order status updated",

//         order,
//       });

//     } catch (error) {

//       next(error);
//     }
//   };

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