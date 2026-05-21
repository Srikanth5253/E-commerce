import stripe
  from "../../config/stripe.js";

import Order
  from "../../models/Order.js";

import Cart
  from "../../models/Cart.js";

import Product
  from "../../models/Product.js";


export const placeOrder =
  async (
    req,
    res,
    next
  ) => {

    try {

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


      const totalPrice =
        itemsPrice +
        gstPrice;

      const order =
        await Order.create({
          user:
            req.user._id,

          orderItems,

          itemsPrice,

          gstPrice,

          totalPrice,
        });

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

          await product.save();
        }
      }

      cart.items = [];

      await cart.save();

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

export const createCheckoutSession =
  async (
    req,
    res,
    next
  ) => {

    try {

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

        for (const item of cart.items) {

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
        res.status(400);

        throw new Error(
          "Cart is empty"
        );
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
      const userId = req.user._id;
      const session =
        await stripe.checkout.sessions.create(
          {
            payment_method_types:
              ["card"],

            line_items,

            mode: "payment",

            success_url:
              `${process.env.CLIENT_URLS}/payment-success?userId=${userId}`,

            cancel_url:
              `${process.env.CLIENT_URLS}/payment-cancel`,
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

      const cart =
        await Cart.findOne({
          user:
            req.user._id,
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

      const totalPrice =
        itemsPrice +
        gstPrice;

      const order =
        await Order.create({
          user:
            req.user._id,

          orderItems,

          itemsPrice,

          gstPrice,

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