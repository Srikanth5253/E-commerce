import Wishlist from "../../models/Wishlist.js";

export const addToWishlist =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        productId,
      } = req.body;

      let wishlist =
        await Wishlist.findOne({
          user: req.user._id,
        });

      if (!wishlist) {

        wishlist =
          await Wishlist.create({
            user:
              req.user._id,

            products: [],
          });
      }

      const alreadyExists =
        wishlist.products.includes(
          productId
        );

      if (alreadyExists) {

        res.status(400);

        throw new Error(
          "Product already in wishlist"
        );
      }

      wishlist.products.push(
        productId
      );

      await wishlist.save();

      res.status(200).json({
        success: true,
        message:
          "Added to wishlist",
      });

    } catch (error) {

      next(error);
    }
  };

export const getWishlist =
  async (
    req,
    res,
    next
  ) => {

    try {

      const wishlist =
        await Wishlist.findOne({
          user: req.user._id,
        }).populate(
          "products"
        );

      res.status(200).json({
        success: true,
        wishlist,
      });

    } catch (error) {

      next(error);
    }
  };


export const removeFromWishlist =
  async (
    req,
    res,
    next
  ) => {

    try {

      const wishlist =
        await Wishlist.findOne({
          user: req.user._id,
        });

      if (!wishlist) {

        res.status(404);

        throw new Error(
          "Wishlist not found"
        );
      }

      wishlist.products =
        wishlist.products.filter(
          (product) =>
            product.toString() !==
            req.params.productId
        );

      await wishlist.save();

      res.status(200).json({
        success: true,
        message:
          "Removed from wishlist",
      });

    } catch (error) {

      next(error);
    }
  };