// import {
//   useState,
// } from "react";

// import toast from "react-hot-toast";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   FaBoxOpen,
//   FaImage,
//   FaTags,
//   FaVideo,
//   FaRupeeSign,
//   FaLayerGroup,
//   FaWarehouse,
// } from "react-icons/fa";

// import Navbar from "../../components/Navbar";

// import {
//   addProduct,
// } from "../../services/ProductService";

// function AddProduct() {

//   const navigate =
//     useNavigate();

//   const [formData, setFormData] =
//     useState({

//       title: "",

//       description: "",

//       price: "",

//       category: "",

//       stock: "",

//       lowStockThreshold: 5,

//       tags: "",

//       images: "",

//       videos: "",

//     });

//   const [loading, setLoading] =
//     useState(false);

//   const handleChange = (e) => {

//     setFormData({

//       ...formData,

//       [e.target.name]:
//         e.target.value,

//     });
//   };

//   const handleSubmit =
//     async (e) => {

//       e.preventDefault();

//       if (

//         !formData.title ||

//         !formData.description ||

//         !formData.price ||

//         !formData.category ||

//         formData.stock === "" ||

//         !formData.images

//       ) {

//         toast.error(
//           "Please fill all required fields"
//         );

//         return;
//       }

//       if (
//         Number(formData.stock) < 0
//       ) {

//         toast.error(
//           "Stock cannot be negative"
//         );

//         return;
//       }

//       if (
//         Number(
//           formData.lowStockThreshold
//         ) < 1
//       ) {

//         toast.error(
//           "Low stock threshold must be at least 1"
//         );

//         return;
//       }

//       try {

//         setLoading(true);

//         const productData = {

//           ...formData,

//           price:
//             Number(
//               formData.price
//             ),

//           stock:
//             Number(
//               formData.stock
//             ),

//           lowStockThreshold:
//             Number(
//               formData.lowStockThreshold
//             ),

//           tags:
//             formData.tags

//               ? formData.tags
//                 .split(",")

//                 .map((tag) =>
//                   tag.trim()
//                 )

//               : [],

//           images:
//             formData.images

//               .split(",")

//               .map((img) =>
//                 img.trim()
//               ),

//           videos:
//             formData.videos

//               ? formData.videos
//                 .split(",")

//                 .map((video) =>
//                   video.trim()
//                 )

//               : [],
//         };

//         const response =
//           await addProduct(
//             productData
//           );

//         toast.success(
//           "Product Added Successfully"
//         );

//         navigate(
//           "/admin/products"
//         );

//       } catch (error) {

//         toast.error(

//           error.response?.data
//             ?.message ||

//           "Failed To Add Product"

//         );

//       } finally {

//         setLoading(false);

//       }
//     };

//   return (

//     <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

//       <Navbar />

//       <div className="max-w-4xl mx-auto px-6 py-12">

//         <div className="flex items-center gap-4 mb-10">

//           <div
//             className="
//               w-16
//               h-16
//               rounded-2xl
//               bg-indigo-100
//               flex
//               items-center
//               justify-center
//             "
//           >

//             <FaBoxOpen
//               className="
//                 text-3xl
//                 text-indigo-500
//               "
//             />

//           </div>

//           <div>

//             <h1 className="text-5xl font-extrabold text-slate-900">

//               Add Product

//             </h1>

//             <p className="text-slate-500 mt-2 text-lg">

//               Create and manage products

//             </p>

//           </div>

//         </div>

//         <div
//           className="
//             bg-white
//             border
//             border-slate-200
//             rounded-3xl
//             p-8
//             shadow-xl
//           "
//         >

//           <form
//             onSubmit={
//               handleSubmit
//             }
//             className="space-y-8"
//           >

//             <div>

//               <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

//                 <FaBoxOpen />

//                 Product Title

//               </label>

//               <input
//                 type="text"
//                 name="title"
//                 value={
//                   formData.title
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="Enter product title"
//                 className="
//                   w-full
//                   px-5
//                   py-4
//                   bg-slate-50
//                   border
//                   border-slate-300
//                   rounded-2xl
//                   outline-none
//                   focus:border-indigo-500
//                   focus:ring-4
//                   focus:ring-indigo-100
//                   transition-all
//                   duration-300
//                 "
//                 required
//               />

//             </div>

//             <div>

//               <label className="block mb-3 text-slate-700 font-semibold">

//                 Description

//               </label>

//               <textarea
//                 name="description"
//                 value={
//                   formData.description
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 rows="6"
//                 placeholder="Enter description"
//                 className="
//                   w-full
//                   px-5
//                   py-4
//                   bg-slate-50
//                   border
//                   border-slate-300
//                   rounded-2xl
//                   outline-none
//                   focus:border-indigo-500
//                   focus:ring-4
//                   focus:ring-indigo-100
//                   transition-all
//                   duration-300
//                 "
//                 required
//               />

//             </div>

//             <div className="grid md:grid-cols-3 gap-6">

//               <div>

//                 <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

//                   <FaRupeeSign />

//                   Price

//                 </label>

//                 <input
//                   type="number"
//                   name="price"
//                   value={
//                     formData.price
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   placeholder="Enter price"
//                   min="0"
//                   className="
//                     w-full
//                     px-5
//                     py-4
//                     bg-slate-50
//                     border
//                     border-slate-300
//                     rounded-2xl
//                     outline-none
//                     focus:border-indigo-500
//                     focus:ring-4
//                     focus:ring-indigo-100
//                     transition-all
//                     duration-300
//                   "
//                   required
//                 />

//               </div>

//               <div>

//                 <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

//                   <FaWarehouse />

//                   Stock

//                 </label>

//                 <input
//                   type="number"
//                   name="stock"
//                   value={
//                     formData.stock
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   placeholder="Enter stock quantity"
//                   min="0"
//                   className="
//                     w-full
//                     px-5
//                     py-4
//                     bg-slate-50
//                     border
//                     border-slate-300
//                     rounded-2xl
//                     outline-none
//                     focus:border-indigo-500
//                     focus:ring-4
//                     focus:ring-indigo-100
//                     transition-all
//                     duration-300
//                   "
//                   required
//                 />

//               </div>

//               <div>

//                 <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

//                   <FaWarehouse />

//                   Low Stock Alert

//                 </label>

//                 <input
//                   type="number"
//                   name="lowStockThreshold"
//                   value={
//                     formData.lowStockThreshold
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   placeholder="Low stock warning"
//                   min="1"
//                   className="
//                     w-full
//                     px-5
//                     py-4
//                     bg-slate-50
//                     border
//                     border-slate-300
//                     rounded-2xl
//                     outline-none
//                     focus:border-indigo-500
//                     focus:ring-4
//                     focus:ring-indigo-100
//                     transition-all
//                     duration-300
//                   "
//                 />

//               </div>

//             </div>

//             <div>

//               <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

//                 <FaLayerGroup />

//                 Category

//               </label>

//               <input
//                 type="text"
//                 name="category"
//                 value={
//                   formData.category
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="Electronics, Fashion..."
//                 className="
//                   w-full
//                   px-5
//                   py-4
//                   bg-slate-50
//                   border
//                   border-slate-300
//                   rounded-2xl
//                   outline-none
//                   focus:border-indigo-500
//                   focus:ring-4
//                   focus:ring-indigo-100
//                   transition-all
//                   duration-300
//                 "
//                 required
//               />

//             </div>

//             <div>

//               <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

//                 <FaTags />

//                 Tags

//               </label>

//               <input
//                 type="text"
//                 name="tags"
//                 value={
//                   formData.tags
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="nike, shoes, fashion"
//                 className="
//                   w-full
//                   px-5
//                   py-4
//                   bg-slate-50
//                   border
//                   border-slate-300
//                   rounded-2xl
//                   outline-none
//                   focus:border-indigo-500
//                   focus:ring-4
//                   focus:ring-indigo-100
//                   transition-all
//                   duration-300
//                 "
//               />

//             </div>

//             <div>

//               <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

//                 <FaImage />

//                 Image URLs

//               </label>

//               <input
//                 type="text"
//                 name="images"
//                 value={
//                   formData.images
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="Separate image URLs with commas"
//                 className="
//                   w-full
//                   px-5
//                   py-4
//                   bg-slate-50
//                   border
//                   border-slate-300
//                   rounded-2xl
//                   outline-none
//                   focus:border-indigo-500
//                   focus:ring-4
//                   focus:ring-indigo-100
//                   transition-all
//                   duration-300
//                 "
//                 required
//               />

//             </div>

//             <div>

//               <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

//                 <FaVideo />

//                 Video URLs

//               </label>

//               <input
//                 type="text"
//                 name="videos"
//                 value={
//                   formData.videos
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="Separate video URLs with commas"
//                 className="
//                   w-full
//                   px-5
//                   py-4
//                   bg-slate-50
//                   border
//                   border-slate-300
//                   rounded-2xl
//                   outline-none
//                   focus:border-indigo-500
//                   focus:ring-4
//                   focus:ring-indigo-100
//                   transition-all
//                   duration-300
//                 "
//               />

//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="
//                 w-full
//                 bg-indigo-500
//                 hover:bg-indigo-600
//                 text-white
//                 transition-all
//                 duration-300
//                 py-4
//                 rounded-2xl
//                 text-lg
//                 font-semibold
//                 hover:scale-[1.02]
//                 shadow-lg
//                 hover:shadow-indigo-500/30
//                 disabled:opacity-70
//               "
//             >

//               {loading

//                 ? "Adding Product..."

//                 : "Add Product"}

//             </button>

//           </form>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default AddProduct;


import {
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaBoxOpen,
  FaImage,
  FaTags,
  FaVideo,
  FaRupeeSign,
  FaLayerGroup,
  FaWarehouse,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import {
  addProduct,
} from "../../services/ProductService";

function AddProduct() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      price: "",

      category: "",

      stock: "",

      lowStockThreshold: 5,

      tags: "",

    });

  const [imageFiles, setImageFiles] =
    useState([]);

  const [videoFiles, setVideoFiles] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (

        !formData.title ||

        !formData.description ||

        !formData.price ||

        !formData.category ||

        formData.stock === ""

      ) {

        toast.error(
          "Please fill all required fields"
        );

        return;
      }

      if (
        Number(formData.stock) < 0
      ) {

        toast.error(
          "Stock cannot be negative"
        );

        return;
      }

      if (
        Number(
          formData.lowStockThreshold
        ) < 1
      ) {

        toast.error(
          "Low stock threshold must be at least 1"
        );

        return;
      }

      try {

        setLoading(true);

        const productData =
          new FormData();

        productData.append(
          "title",
          formData.title
        );

        productData.append(
          "description",
          formData.description
        );

        productData.append(
          "price",
          Number(
            formData.price
          )
        );

        productData.append(
          "category",
          formData.category
        );

        productData.append(
          "stock",
          Number(
            formData.stock
          )
        );

        productData.append(
          "lowStockThreshold",
          Number(
            formData.lowStockThreshold
          )
        );

        productData.append(
          "tags",
          formData.tags
        );

        imageFiles.forEach(
          (file) => {

            productData.append(
              "images",
              file
            );

          }
        );

        videoFiles.forEach(
          (file) => {

            productData.append(
              "videos",
              file
            );

          }
        );

        await addProduct(
          productData
        );

        toast.success(
          "Product Added Successfully"
        );

        navigate(
          "/admin/products"
        );

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Failed To Add Product"

        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="flex items-center gap-4 mb-10">

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-indigo-100
              flex
              items-center
              justify-center
            "
          >

            <FaBoxOpen
              className="
                text-3xl
                text-indigo-500
              "
            />

          </div>

          <div>

            <h1 className="text-5xl font-extrabold text-slate-900">

              Add Product

            </h1>

            <p className="text-slate-500 mt-2 text-lg">

              Create and manage products

            </p>

          </div>

        </div>

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-8
            shadow-xl
          "
        >

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-8"
          >

            <div>

              <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                <FaBoxOpen />

                Product Title

              </label>

              <input
                type="text"
                name="title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                placeholder="Enter product title"
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                "
                required
              />

            </div>

            <div>

              <label className="block mb-3 text-slate-700 font-semibold">

                Description

              </label>

              <textarea
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                rows="6"
                placeholder="Enter description"
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                "
                required
              />

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              <div>

                <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                  <FaRupeeSign />

                  Price

                </label>

                <input
                  type="number"
                  name="price"
                  value={
                    formData.price
                  }
                  onChange={
                    handleChange
                  }
                  min="0"
                  placeholder="Enter price"
                  className="
                    w-full
                    px-5
                    py-4
                    bg-slate-50
                    border
                    border-slate-300
                    rounded-2xl
                  "
                  required
                />

              </div>

              <div>

                <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                  <FaWarehouse />

                  Stock

                </label>

                <input
                  type="number"
                  name="stock"
                  value={
                    formData.stock
                  }
                  onChange={
                    handleChange
                  }
                  min="0"
                  placeholder="Enter stock quantity"
                  className="
                    w-full
                    px-5
                    py-4
                    bg-slate-50
                    border
                    border-slate-300
                    rounded-2xl
                  "
                  required
                />

              </div>

              <div>

                <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                  <FaWarehouse />

                  Low Stock Alert

                </label>

                <input
                  type="number"
                  name="lowStockThreshold"
                  value={
                    formData.lowStockThreshold
                  }
                  onChange={
                    handleChange
                  }
                  min="1"
                  placeholder="Low stock warning"
                  className="
                    w-full
                    px-5
                    py-4
                    bg-slate-50
                    border
                    border-slate-300
                    rounded-2xl
                  "
                />

              </div>

            </div>

            <div>

              <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                <FaLayerGroup />

                Category

              </label>

              <input
                type="text"
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                placeholder="Electronics, Fashion..."
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                "
                required
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                <FaTags />

                Tags

              </label>

              <input
                type="text"
                name="tags"
                value={
                  formData.tags
                }
                onChange={
                  handleChange
                }
                placeholder="nike, shoes, fashion"
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                "
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                <FaImage />

                Upload Images

              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setImageFiles([
                    ...e.target.files,
                  ])
                }
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                "
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                <FaVideo />

                Upload Videos

              </label>

              <input
                type="file"
                multiple
                accept="video/*"
                onChange={(e) =>
                  setVideoFiles([
                    ...e.target.files,
                  ])
                }
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                "
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-indigo-500
                hover:bg-indigo-600
                text-white
                py-4
                rounded-2xl
                text-lg
                font-semibold
                transition-all
                duration-300
                hover:scale-[1.02]
                shadow-lg
                hover:shadow-indigo-500/30
                disabled:opacity-70
              "
            >

              {loading
                ? "Adding Product..."
                : "Add Product"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddProduct;
