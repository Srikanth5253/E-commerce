import Product from "../../models/Product.js";

// export const addProduct = async (
//   req,
//   res,
//   next
// ) => {

//   try {

//     const {
//       title,
//       description,
//       price,
//       category,
//       stock,
//       lowStockThreshold,
//       tags,
//       images,
//       videos,
//     } = req.body;

//     if (stock < 0) {

//       return res.status(400).json({
//         success: false,
//         message: "Stock cannot be negative",
//       });

//     }

//     const formattedTags =
//       Array.isArray(tags)

//         ? tags.map(
//           (tag) =>
//             tag.trim().toLowerCase()
//         )

//         : tags
//           ?.split(",")
//           .map(
//             (tag) =>
//               tag.trim().toLowerCase()
//           );

//     const product =
//       await Product.create({

//         title,

//         description,

//         price,

//         category,

//         stock,

//         lowStockThreshold:
//           lowStockThreshold || 5,

//         tags: formattedTags,

//         images,

//         videos,

//         createdBy: req.user._id,

//       });

//     res.status(201).json({

//       success: true,

//       message:
//         "Product added successfully",

//       product,

//     });

//   } catch (error) {

//     next(error);

//   }
// };

export const addProduct = async (
  req,
  res,
  next
) => {

  try {

    const {
      title,
      description,
      price,
      category,
      stock,
      lowStockThreshold,
      tags,
    } = req.body;

    if (stock < 0) {

      return res.status(400).json({
        success: false,
        message:
          "Stock cannot be negative",
      });

    }

    const formattedTags =
      Array.isArray(tags)

        ? tags.map(
          (tag) =>
            tag
              .trim()
              .toLowerCase()
        )

        : tags
          ?.split(",")
          .map(
            (tag) =>
              tag
                .trim()
                .toLowerCase()
          ) || [];

    const uploadedImages =
      req.files?.images?.map(
        (file) => file.path
      ) || [];

    const uploadedVideos =
      req.files?.videos?.map(
        (file) => file.path
      ) || [];

    const product =
      await Product.create({

        title,

        description,

        price,

        category,

        stock,

        lowStockThreshold:
          lowStockThreshold || 5,

        tags: formattedTags,

        images:
          uploadedImages,

        videos:
          uploadedVideos,

        createdBy:
          req.user._id,

      });

    res.status(201).json({

      success: true,

      message:
        "Product added successfully",

      product,

    });

  } catch (error) {

    next(error);

  }
};

// export const updateProduct =
//   async (
//     req,
//     res,
//     next
//   ) => {

//     try {

//       const product =
//         await Product.findById(
//           req.params.id
//         );

//       if (!product) {

//         res.status(404);

//         throw new Error(
//           "Product not found"
//         );
//       }

//       if (
//         req.body.stock &&
//         req.body.stock < 0
//       ) {

//         return res.status(400).json({
//           success: false,
//           message: "Stock cannot be negative",
//         });

//       }

//       const formattedTags =
//         Array.isArray(
//           req.body.tags
//         )

//           ? req.body.tags.map(
//             (tag) =>
//               tag
//                 .trim()
//                 .toLowerCase()
//           )

//           : req.body.tags
//             ?.split(",")
//             .map(
//               (tag) =>
//                 tag
//                   .trim()
//                   .toLowerCase()
//             );

//       const updatedData = {

//         ...req.body,

//         tags:
//           formattedTags,

//       };

//       const updatedProduct =
//         await Product.findByIdAndUpdate(

//           req.params.id,

//           updatedData,

//           {
//             new: true,
//           }

//         );

//       res.status(200).json({

//         success: true,

//         message:
//           "Product updated successfully",

//         updatedProduct,

//       });

//     } catch (error) {

//       next(error);
//     }
//   };
export const updateProduct =
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

      if (
        req.body.stock &&
        req.body.stock < 0
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Stock cannot be negative",

        });

      }

      const formattedTags =
        Array.isArray(
          req.body.tags
        )

          ? req.body.tags.map(
            (tag) =>
              tag
                .trim()
                .toLowerCase()
          )

          : req.body.tags
            ?.split(",")
            .map(
              (tag) =>
                tag
                  .trim()
                  .toLowerCase()
            ) || [];

      const uploadedImages =
        req.files?.images?.map(
          (file) =>
            file.path
        ) || [];

      const uploadedVideos =
        req.files?.videos?.map(
          (file) =>
            file.path
        ) || [];

      const updatedData = {

        ...req.body,

        tags:
          formattedTags,

      };

      // Only update media if uploaded

      if (
        uploadedImages.length > 0
      ) {

        updatedData.images =
          uploadedImages;

      }

      if (
        uploadedVideos.length > 0
      ) {

        updatedData.videos =
          uploadedVideos;

      }

      const updatedProduct =
        await Product.findByIdAndUpdate(

          req.params.id,

          updatedData,

          {
            new: true,
          }

        );

      res.status(200).json({

        success: true,

        message:
          "Product updated successfully",

        updatedProduct,

      });

    } catch (error) {

      next(error);

    }
  };

export const deleteProduct =
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

      await product.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "Product deleted successfully",

      });

    } catch (error) {

      next(error);
    }
  };