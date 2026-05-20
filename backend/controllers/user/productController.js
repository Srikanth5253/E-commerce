import Product from "../../models/Product.js";

export const getProducts =
  async (
    req,
    res,
    next
  ) => {

    try {

      const products =
        await Product.find()
          .sort({
            createdAt: -1,
          });

      const updatedProducts =
        products.map((product) => {

          const stockStatus =
            product.stock === 0

              ? "out_of_stock"

              : product.stock <=
                product.lowStockThreshold

                ? "low_stock"

                : "in_stock";

          return {

            ...product._doc,

            stockStatus,

          };

        });

      res.status(200).json({

        success: true,

        count:
          updatedProducts.length,

        products:
          updatedProducts,

      });

    } catch (error) {

      next(error);

    }
  };

export const getSingleProduct =
  async (
    req,
    res,
    next
  ) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        res.status(404);

        throw new Error(
          "Product not found"
        );
      }
      const stockStatus =
        product.stock === 0

          ? "out_of_stock"

          : product.stock <=
            product.lowStockThreshold

            ? "low_stock"

            : "in_stock";

      res.status(200).json({

        success: true,

        product: {

          ...product._doc,

          stockStatus,

        },

      });
    } catch (error) {
      next(error);
    }
  };

export const addReview =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        rating,
        comment,
      } = req.body;

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        res.status(404);

        throw new Error(
          "Product not found"
        );
      }

      const alreadyReviewed =
        product.reviews.find(
          (review) =>
            review.user.toString() ===
            req.user._id.toString()
        );

      if (alreadyReviewed) {

        res.status(400);

        throw new Error(
          "You already reviewed this product"
        );
      }

      const review = {
        user:
          req.user._id,

        name:
          req.user.name,

        rating:
          Number(rating),

        comment,
      };

      product.reviews.push(
        review
      );

      product.numReviews =
        product.reviews.length;

      product.averageRating =
        product.reviews.reduce(
          (
            acc,
            item
          ) =>
            item.rating + acc,
          0
        ) /
        product.reviews.length;

      await product.save();

      res.status(201).json({
        success: true,
        message:
          "Review added successfully",
      });

    } catch (error) {

      next(error);
    }
  };

export const getRelatedProducts =
  async (
    req,
    res,
    next
  ) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        res.status(404);

        throw new Error(
          "Product not found"
        );
      }

      const relatedProducts =
        await Product.find({

          tags: {
            $in: product.tags,
          },

          _id: {
            $ne: product._id,
          },

        })
          .sort({
            sold: -1,
          })
          .limit(4);

      res.status(200).json({
        success: true,
        relatedProducts,
      });

    } catch (error) {

      next(error);
    }
  };