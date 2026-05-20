import mongoose from "mongoose";

const productSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
      },

      reservedStock: {
        type: Number,
        default: 0,
        min: 0,
      },

      lowStockThreshold: {
        type: Number,
        default: 5,
        min: 1,
      },

      sold: {
        type: Number,
        default: 0,
      },

      tags: [String],

      images: [String],

      videos: [String],


      reviews: [
        {
          user: {
            type:
              mongoose.Schema.Types
                .ObjectId,

            ref: "User",
          },

          name: String,

          rating: Number,

          comment: String,

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      averageRating: {
        type: Number,
        default: 0,
      },

      numReviews: {
        type: Number,
        default: 0,
      },
      createdBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;