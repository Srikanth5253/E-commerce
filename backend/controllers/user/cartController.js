import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js"

export const addToCart =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        productId,
      } = req.body;

      const product =
        await Product.findById(
          productId
        );

      if (!product) {

        res.status(404);

        throw new Error(
          "Product not found"
        );
      }

      if (product.stock <= 0) {

        res.status(400);

        throw new Error(
          "Product is out of stock"
        );
      }

      let cart =
        await Cart.findOne({
          user: req.user._id,
        });

      if (!cart) {

        cart =
          await Cart.create({

            user:
              req.user._id,

            items: [],
          });
      }

      const existingItem =
        cart.items.find(
          (item) =>
            item.product.toString() ===
            productId
        );

      if (existingItem) {

        if (
          existingItem.quantity >=
          product.stock
        ) {

          res.status(400);

          throw new Error(
            `Only ${product.stock} items available in stock`
          );
        }

        existingItem.quantity += 1;

      } else {

        cart.items.push({

          product: productId,

          quantity: 1,
        });
      }

      await cart.save();

      res.status(200).json({

        success: true,

        message:
          "Product added to cart",

        cart,
      });

    } catch (error) {

      next(error);
    }
  };


export const getCart =
  async (
    req,
    res,
    next
  ) => {

    try {

      const cart =
  await Cart.findOne({
    user: req.user._id,
  }).populate({
    path: "items.product",
  });

      res.status(200).json({
        success: true,
        cart,
      });

    } catch (error) {

      next(error);
    }
  };

export const removeFromCart =
  async (
    req,
    res,
    next
  ) => {

    try {

      const cart =
        await Cart.findOne({
          user: req.user._id,
        });

      if (!cart) {

        res.status(404);

        throw new Error(
          "Cart not found"
        );
      }

      cart.items =
        cart.items.filter(
          (item) =>
            item.product.toString() !==
            req.params.productId
        );

      await cart.save();

      res.status(200).json({
        success: true,
        message:
          "Item removed",
      });

    } catch (error) {

      next(error);
    }
  };

export const updateCartQuantity =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        productId,
        action,
      } = req.body;

      const cart =
        await Cart.findOne({
          user: req.user._id,
        });

      if (!cart) {

        res.status(404);

        throw new Error(
          "Cart not found"
        );
      }

      const item =
        cart.items.find(
          (item) =>
            item.product.toString() ===
            productId
        );

      if (!item) {

        res.status(404);

        throw new Error(
          "Product not found"
        );
      }

      if (action === "increase") {

        const product =
          await Product.findById(
            productId
          );

        if (
          item.quantity >=
          product.stock
        ) {

          res.status(400);

          throw new Error(
            `Only ${product.stock} items available in stock`
          );
        }

        item.quantity += 1;
      }

      if (action === "decrease") {

        item.quantity -= 1;

        if (item.quantity <= 0) {

          cart.items =
            cart.items.filter(
              (item) =>
                item.product.toString() !==
                productId
            );
        }
      }

      await cart.save();

      res.status(200).json({
        success: true,
        message:
          "Quantity updated",
      });

    } catch (error) {

      next(error);
    }
  };