import stripe
  from "../../config/stripe.js";

import Order
  from "../../models/Order.js";

import Cart
  from "../../models/Cart.js";

import Product
  from "../../models/Product.js";

import User
  from "../../models/User.js";


export const placeOrder =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        addressId,
        paymentMethod,
      } = req.body;

      const cart =
        await Cart.findOne({
          user: req.user._id,
        }).populate(
          "items.product"
        );

      if (
        !cart ||
        cart.items.length === 0
      ) {

        res.status(400);

        throw new Error(
          "Cart is empty"
        );
      }

      const user =
        await User.findById(
          req.user._id
        );

      const selectedAddress =
        user.addresses.id(
          addressId
        );

      if (!selectedAddress) {

        res.status(404);

        throw new Error(
          "Address not found"
        );
      }

      for (
        const item of cart.items
      ) {

        const product =
          await Product.findById(
            item.product._id
          );

        if (!product) {

          res.status(404);

          throw new Error(
            `${item.product.title} not found`
          );
        }

        if (product.stock <= 0) {

          res.status(400);

          throw new Error(
            `${product.title} is out of stock`
          );
        }

        if (
          item.quantity >
          product.stock
        ) {

          res.status(400);

          throw new Error(
            `Only ${product.stock} units available for ${product.title}`
          );
        }
      }

      const orderItems =
        cart.items.map(
          (item) => ({
            product:
              item.product._id,

            title:
              item.product.title,

            image:
              item.product.images?.[0],

            price:
              item.product.price,

            quantity:
              item.quantity,
          })
        );

      const itemsPrice =
        orderItems.reduce(
          (
            acc,
            item
          ) =>
            acc +
            item.price *
            item.quantity,
          0
        );

      const gstPrice =
        itemsPrice * 0.05;

      const deliveryPrice =
        itemsPrice > 0 &&
        itemsPrice < 2000
          ? 99
          : 0;

      const totalPrice =
        itemsPrice +
        gstPrice +
        deliveryPrice;

      const order =
        await Order.create({

          user:
            req.user._id,

          orderItems,

          shippingAddress: {

            fullName:
              selectedAddress.fullName,

            phone:
              selectedAddress.phone,

            address:
              selectedAddress.address,

            city:
              selectedAddress.city,

            state:
              selectedAddress.state,

            pincode:
              selectedAddress.pincode,
          },

          paymentMethod,

          itemsPrice,

          gstPrice,

          deliveryPrice,

          totalPrice,
        });

      if (
        paymentMethod === "COD"
      ) {

        for (
          const item of cart.items
        ) {

          const product =
            await Product.findById(
              item.product._id
            );

          if (product) {

            product.stock -=
              item.quantity;

            product.sold +=
              item.quantity;

            await product.save();
          }
        }

        cart.items = [];

        await cart.save();
      }

      res.status(201).json({
        success: true,

        message:
          "Order placed successfully",

        order,
      });

    } catch (error) {

      next(error);
    }
  };


export const getMyOrders =
  async (
    req,
    res,
    next
  ) => {

    try {

      const orders =
        await Order.find({
          user: req.user._id,
        }).sort({
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

export const getOrderById =
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

        order.user.toString() !==
        req.user._id.toString()

      ) {

        res.status(403);

        throw new Error(
          "Unauthorized access"
        );
      }

      res.status(200).json({
        success: true,
        order,
      });

    } catch (error) {

      next(error);
    }
  };

export const createCheckoutSession =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        addressId,
        paymentMethod,
      } = req.body;

      const cart =
        await Cart.findOne({
          user: req.user._id,
        }).populate(
          "items.product"
        );

      if (
        !cart ||
        cart.items.length === 0
      ) {

        res.status(400);

        throw new Error(
          "Cart is empty"
        );
      }

      for (
        const item of cart.items
      ) {

        const product =
          await Product.findById(
            item.product._id
          );

        if (!product) {

          res.status(404);

          throw new Error(
            `${item.product.title} not found`
          );
        }

        if (product.stock <= 0) {

          res.status(400);

          throw new Error(
            `${product.title} is out of stock`
          );
        }

        if (
          item.quantity >
          product.stock
        ) {

          res.status(400);

          throw new Error(
            `Only ${product.stock} units available for ${product.title}`
          );
        }
      }

      const line_items =
        cart.items.map(
          (item) => ({
            price_data: {
              currency: "inr",

              product_data: {
                name:
                  item.product.title,

                images: [
                  item.product
                    .images?.[0],
                ],
              },

              unit_amount:
                item.product.price *
                100,
            },

            quantity:
              item.quantity,
          })
        );

      const session =
        await stripe.checkout.sessions.create(
          {
            payment_method_types:
              ["card"],

            line_items,

            mode: "payment",

            metadata: {

              userId:
                req.user._id.toString(),

              addressId,

              paymentMethod,
            },

            success_url:
              `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
              `${process.env.CLIENT_URL}/payment-cancel`,
          }
        );

      res.status(200).json({
        success: true,

        url:
          session.url,
      });

    } catch (error) {

      next(error);
    }
  };


export const paymentSuccess =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        sessionId,
      } = req.body;

      const session =
        await stripe.checkout.sessions.retrieve(
          sessionId
        );

      if (
        session.payment_status !==
        "paid"
      ) {

        res.status(400);

        throw new Error(
          "Payment not completed"
        );
      }

      const {
        userId,
        addressId,
        paymentMethod,
      } = session.metadata;

      const cart =
        await Cart.findOne({
          user: userId,
        }).populate(
          "items.product"
        );

      if (
        !cart ||
        cart.items.length === 0
      ) {

        res.status(400);

        throw new Error(
          "Cart is empty"
        );
      }

      const user =
        await User.findById(
          userId
        );

      const selectedAddress =
        user.addresses.id(
          addressId
        );

      if (!selectedAddress) {

        res.status(404);

        throw new Error(
          "Address not found"
        );
      }

      const orderItems =
        cart.items.map(
          (item) => ({
            product:
              item.product._id,

            title:
              item.product.title,

            image:
              item.product.images?.[0],

            price:
              item.product.price,

            quantity:
              item.quantity,
          })
        );

      const itemsPrice =
        orderItems.reduce(
          (
            acc,
            item
          ) =>
            acc +
            item.price *
            item.quantity,
          0
        );

      const gstPrice =
        itemsPrice * 0.05;

      const deliveryPrice =
        itemsPrice > 0 &&
        itemsPrice < 2000
          ? 99
          : 0;

      const totalPrice =
        itemsPrice +
        gstPrice +
        deliveryPrice;

      const order =
        await Order.create({

          user: userId,

          orderItems,

          shippingAddress: {

            fullName:
              selectedAddress.fullName,

            phone:
              selectedAddress.phone,

            address:
              selectedAddress.address,

            city:
              selectedAddress.city,

            state:
              selectedAddress.state,

            pincode:
              selectedAddress.pincode,
          },

          paymentMethod,

          itemsPrice,

          gstPrice,

          deliveryPrice,

          totalPrice,

          isPaid: true,

          paidAt:
            Date.now(),
        });

      for (
        const item of cart.items
      ) {

        const product =
          await Product.findById(
            item.product._id
          );

        if (product) {

          if (
            product.stock <
            item.quantity
          ) {

            res.status(400);

            throw new Error(
              `${product.title} stock unavailable`
            );
          }

          product.stock -=
            item.quantity;

          product.sold +=
            item.quantity;

          await product.save();
        }
      }

      cart.items = [];

      await cart.save();

      res.status(200).json({
        success: true,

        message:
          "Payment successful",

        order,
      });

    } catch (error) {

      next(error);
    }
  };