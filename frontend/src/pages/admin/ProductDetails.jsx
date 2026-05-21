// import {
//   useEffect,
//   useState,
// } from "react";

// import toast from "react-hot-toast";

// import {
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import {
//   FaBoxOpen,
//   FaEdit,
//   FaTrash,
//   FaTag,
//   FaRupeeSign,
//   FaWarehouse,
//   FaChartLine,
// } from "react-icons/fa";

// import Navbar from "../../components/Navbar";

// import {
//   getSingleProduct,
//   deleteProduct,
// } from "../../services/ProductService";

// function ProductDetails() {

//   const { id } =
//     useParams();

//   const navigate =
//     useNavigate();

//   const [product, setProduct] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   const fetchProduct =
//     async () => {

//       try {

//         const data =
//           await getSingleProduct(
//             id
//           );

//         setProduct(
//           data.product
//         );

//       } catch (error) {

//         toast.error(
//           "Failed to fetch product"
//         );

//       } finally {

//         setLoading(false);

//       }
//     };

//   useEffect(() => {

//     fetchProduct();

//   }, [id]);

//   const handleDelete =
//     async () => {

//       const confirmDelete =
//         window.confirm(
//           "Delete this product?"
//         );

//       if (!confirmDelete)
//         return;

//       try {

//         await deleteProduct(
//           product._id
//         );

//         toast.success(
//           "Product Deleted Successfully"
//         );

//         navigate(
//           "/admin/products"
//         );

//       } catch (error) {

//         toast.error(

//           error.response?.data
//             ?.message ||

//           "Delete Failed"

//         );

//       }
//     };

//   if (loading) {

//     return (

//       <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 flex items-center justify-center">

//         <div className="text-slate-500 text-2xl font-semibold">

//           Loading...

//         </div>

//       </div>

//     );
//   }

//   if (!product) {

//     return (

//       <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 flex items-center justify-center">

//         <div className="text-slate-500 text-2xl font-semibold">

//           Product Not Found

//         </div>

//       </div>

//     );
//   }

//   return (

//     <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

//       <Navbar />

//       <div className="max-w-[1400px] mx-auto px-6 py-12 grid lg:grid-cols-2 gap-16 items-start">

//         <div>

//           <img
//             src={
//               product.images?.[0]
//             }
//             alt={
//               product.title
//             }
//             className="
//               w-full
//               h-[420px]
//               object-cover
//               rounded-3xl
//               border
//               border-slate-200
//               shadow-xl
//               hover:shadow-2xl
//               transition-all
//               duration-500
//               bg-white
//             "
//           />

//           <div className="flex gap-4 mt-5 overflow-x-auto pb-2">

//             {product.images?.map(
//               (
//                 image,
//                 index
//               ) => (

//                 <img
//                   key={index}
//                   src={image}
//                   alt="product"
//                   className="
//                     w-24
//                     h-24
//                     object-cover
//                     rounded-2xl
//                     border
//                     border-slate-200
//                     hover:border-indigo-500
//                     hover:scale-105
//                     transition-all
//                     duration-300
//                     cursor-pointer
//                     shadow-sm
//                     bg-white
//                   "
//                 />

//               )
//             )}

//           </div>

//         </div>

//         <div className="pt-2 lg:sticky lg:top-28 h-fit">

//           <div
//             className="
//               inline-flex
//               items-center
//               gap-2
//               bg-indigo-100
//               text-indigo-600
//               px-5
//               py-2.5
//               rounded-full
//               font-semibold
//               mb-6
//             "
//           >

//             <FaBoxOpen />

//             Product Details

//           </div>

//           <h1
//             className="
//               text-4xl
//               md:text-5xl
//               font-extrabold
//               text-slate-900
//               leading-tight
//             "
//           >

//             {product.title}

//           </h1>

//           <p className="text-slate-500 mt-4 text-lg font-medium">

//             Category:
//             {" "}
//             {product.category}

//           </p>

//           <div className="mt-8 flex items-center gap-3">

//             <FaRupeeSign
//               className="
//                 text-3xl
//                 text-indigo-500
//               "
//             />

//             <span className="text-4xl font-extrabold text-indigo-600">

//               {product.price}

//             </span>

//           </div>

//           <div className="mt-8 grid sm:grid-cols-2 gap-5">

//             <div
//               className="
//                 bg-white
//                 border
//                 border-slate-200
//                 rounded-3xl
//                 p-5
//                 shadow-sm
//               "
//             >

//               <div className="flex items-center gap-3 mb-3">

//                 <FaWarehouse
//                   className="
//                     text-2xl
//                     text-indigo-500
//                   "
//                 />

//                 <h3 className="text-lg font-bold text-slate-800">

//                   Inventory Status

//                 </h3>

//               </div>

//               {product.stock === 0 ? (

//                 <div>

//                   <p className="text-red-500 text-xl font-bold">

//                     Out Of Stock

//                   </p>

//                   <p className="text-slate-500 mt-1">

//                     Product unavailable

//                   </p>

//                 </div>

//               ) : product.stock <=
//                 product.lowStockThreshold ? (

//                 <div>

//                   <p className="text-amber-500 text-xl font-bold">

//                     Low Stock

//                   </p>

//                   <p className="text-slate-500 mt-1">

//                     Only {product.stock} left

//                   </p>

//                 </div>

//               ) : (

//                 <div>

//                   <p className="text-green-500 text-xl font-bold">

//                     In Stock

//                   </p>

//                   <p className="text-slate-500 mt-1">

//                     {product.stock} available

//                   </p>

//                 </div>

//               )}

//             </div>

//             <div
//               className="
//                 bg-white
//                 border
//                 border-slate-200
//                 rounded-3xl
//                 p-5
//                 shadow-sm
//               "
//             >

//               <div className="flex items-center gap-3 mb-4">

//                 <FaChartLine
//                   className="
//                     text-xl
//                     text-indigo-500
//                   "
//                 />

//                 <h3 className="text-lg font-bold text-slate-800">

//                   Inventory Insights

//                 </h3>

//               </div>

//               <div className="space-y-3">

//                 <div className="flex justify-between">

//                   <span className="text-slate-500">

//                     Available

//                   </span>

//                   <span className="font-bold text-slate-800">

//                     {product.stock}

//                   </span>

//                 </div>

//                 <div className="flex justify-between">

//                   <span className="text-slate-500">

//                     Reserved

//                   </span>

//                   <span className="font-bold text-slate-800">

//                     {product.reservedStock || 0}

//                   </span>

//                 </div>

//                 <div className="flex justify-between">

//                   <span className="text-slate-500">

//                     Sold

//                   </span>

//                   <span className="font-bold text-indigo-600">

//                     {product.sold || 0}

//                   </span>

//                 </div>

//                 <div className="flex justify-between">

//                   <span className="text-slate-500">

//                     Low Stock Alert

//                   </span>

//                   <span className="font-bold text-amber-500">

//                     {product.lowStockThreshold}

//                   </span>

//                 </div>

//               </div>

//             </div>

//           </div>

//           <div className="mt-10">

//             <h2 className="text-3xl font-bold mb-5">

//               Description

//             </h2>

//             <p className="text-slate-600 text-lg leading-9 max-w-2xl">

//               {product.description}

//             </p>

//           </div>

//           <div className="mt-10">

//             <h2 className="text-2xl font-bold mb-5">

//               Tags

//             </h2>

//             <div className="flex flex-wrap gap-3">

//               {product.tags?.map(
//                 (
//                   tag,
//                   index
//                 ) => (

//                   <span
//                     key={index}
//                     className="
//                       px-5
//                       py-2.5
//                       bg-white
//                       border
//                       border-slate-200
//                       rounded-full
//                       text-sm
//                       font-medium
//                       text-slate-700
//                       shadow-sm
//                       hover:border-indigo-500
//                       hover:bg-indigo-50
//                       transition-all
//                       duration-300
//                       flex
//                       items-center
//                       gap-2
//                     "
//                   >

//                     <FaTag
//                       className="
//                         text-indigo-500
//                       "
//                     />

//                     {tag}

//                   </span>

//                 )
//               )}

//             </div>

//           </div>

//           <div className="flex flex-col md:flex-row gap-5 mt-12">

//             <button
//               onClick={() =>
//                 navigate(
//                   `/admin/edit-product/${product._id}`
//                 )
//               }
//               className="
//                 flex-1
//                 bg-amber-500
//                 hover:bg-amber-600
//                 text-white
//                 transition-all
//                 duration-300
//                 py-4
//                 rounded-2xl
//                 text-lg
//                 font-semibold
//                 hover:scale-[1.02]
//                 shadow-lg
//                 hover:shadow-amber-500/30
//                 flex
//                 items-center
//                 justify-center
//                 gap-3
//               "
//             >

//               <FaEdit />

//               Edit Product

//             </button>

//             <button
//               onClick={
//                 handleDelete
//               }
//               className="
//                 flex-1
//                 bg-red-500
//                 hover:bg-red-600
//                 text-white
//                 transition-all
//                 duration-300
//                 py-4
//                 rounded-2xl
//                 text-lg
//                 font-semibold
//                 hover:scale-[1.02]
//                 shadow-lg
//                 hover:shadow-red-500/30
//                 flex
//                 items-center
//                 justify-center
//                 gap-3
//               "
//             >

//               <FaTrash />

//               Delete Product

//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default ProductDetails;

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaBoxOpen,
  FaEdit,
  FaTrash,
  FaTag,
  FaRupeeSign,
  FaWarehouse,
  FaChartLine,
  FaPlay,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import {
  getSingleProduct,
  deleteProduct,
} from "../../services/ProductService";

function ProductDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedMedia,
    setSelectedMedia] =
    useState("");

  const fetchProduct =
    async () => {

      try {

        const data =
          await getSingleProduct(
            id
          );

        setProduct(
          data.product
        );

        setSelectedMedia(

          data.product.images?.[0] ||

          data.product.videos?.[0] ||

          ""

        );

      } catch (error) {

        toast.error(
          "Failed to fetch product"
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchProduct();

  }, [id]);

  const handleDelete =
    async () => {

      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteProduct(
          product._id
        );

        toast.success(
          "Product Deleted Successfully"
        );

        navigate(
          "/admin/products"
        );

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Delete Failed"

        );

      }
    };

  const isVideo =
    selectedMedia?.includes(
      ".mp4"
    ) ||

    selectedMedia?.includes(
      ".webm"
    ) ||

    selectedMedia?.includes(
      ".mov"
    );

  if (loading) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 flex items-center justify-center">

        <div className="text-slate-500 text-2xl font-semibold">

          Loading...

        </div>

      </div>

    );
  }

  if (!product) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 flex items-center justify-center">

        <div className="text-slate-500 text-2xl font-semibold">

          Product Not Found

        </div>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-12 grid lg:grid-cols-2 gap-16 items-start">

        <div>

          <div className="relative">

            {isVideo ? (

              <video
                controls
                src={selectedMedia}
                className="
                  w-full
                  h-[420px]
                  object-cover
                  rounded-3xl
                  border
                  border-slate-200
                  shadow-xl
                  bg-black
                "
              />

            ) : (

              <img
                src={
                  selectedMedia ||
                  "/placeholder.png"
                }
                alt={
                  product.title
                }
                className="
                  w-full
                  h-[420px]
                  object-cover
                  rounded-3xl
                  border
                  border-slate-200
                  shadow-xl
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  bg-white
                "
              />

            )}

          </div>

          <div className="flex gap-4 mt-5 overflow-x-auto pb-2">

            {[
              ...(product.images || []),
              ...(product.videos || []),
            ].map(
              (
                media,
                index
              ) => {

                const mediaIsVideo =

                  media.includes(
                    ".mp4"
                  ) ||

                  media.includes(
                    ".webm"
                  ) ||

                  media.includes(
                    ".mov"
                  );

                return (

                  <button
                    key={index}
                    onClick={() =>
                      setSelectedMedia(
                        media
                      )
                    }
                    className="
                      flex-shrink-0
                      relative
                    "
                  >

                    {mediaIsVideo ? (

                      <div className="relative">

                        <video
                          src={media}
                          className="
                            w-24
                            h-24
                            object-cover
                            rounded-2xl
                            border
                            border-slate-200
                            shadow-sm
                          "
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            bg-black/40
                            rounded-2xl
                          "
                        >

                          <FaPlay
                            className="
                              text-white
                              text-xl
                            "
                          />

                        </div>

                      </div>

                    ) : (

                      <img
                        src={media}
                        alt="product"
                        className={`
                          w-24
                          h-24
                          object-cover
                          rounded-2xl
                          border
                          shadow-sm
                          transition-all
                          duration-300
                          cursor-pointer
                          bg-white

                          ${
                            selectedMedia ===
                            media

                              ? "border-indigo-500 scale-105"

                              : "border-slate-200 hover:border-indigo-500 hover:scale-105"
                          }
                        `}
                      />

                    )}

                  </button>

                );
              }
            )}

          </div>

        </div>

        <div className="pt-2 lg:sticky lg:top-28 h-fit">

          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-indigo-100
              text-indigo-600
              px-5
              py-2.5
              rounded-full
              font-semibold
              mb-6
            "
          >

            <FaBoxOpen />

            Product Details

          </div>

          <h1
            className="
              text-4xl
              md:text-5xl
              font-extrabold
              text-slate-900
              leading-tight
            "
          >

            {product.title}

          </h1>

          <p className="text-slate-500 mt-4 text-lg font-medium">

            Category:
            {" "}
            {product.category}

          </p>

          <div className="mt-8 flex items-center gap-3">

            <FaRupeeSign
              className="
                text-3xl
                text-indigo-500
              "
            />

            <span className="text-4xl font-extrabold text-indigo-600">

              {product.price}

            </span>

          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-5">

            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-5
                shadow-sm
              "
            >

              <div className="flex items-center gap-3 mb-3">

                <FaWarehouse
                  className="
                    text-2xl
                    text-indigo-500
                  "
                />

                <h3 className="text-lg font-bold text-slate-800">

                  Inventory Status

                </h3>

              </div>

              {product.stock === 0 ? (

                <div>

                  <p className="text-red-500 text-xl font-bold">

                    Out Of Stock

                  </p>

                  <p className="text-slate-500 mt-1">

                    Product unavailable

                  </p>

                </div>

              ) : product.stock <=
                product.lowStockThreshold ? (

                <div>

                  <p className="text-amber-500 text-xl font-bold">

                    Low Stock

                  </p>

                  <p className="text-slate-500 mt-1">

                    Only {product.stock} left

                  </p>

                </div>

              ) : (

                <div>

                  <p className="text-green-500 text-xl font-bold">

                    In Stock

                  </p>

                  <p className="text-slate-500 mt-1">

                    {product.stock} available

                  </p>

                </div>

              )}

            </div>

            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-5
                shadow-sm
              "
            >

              <div className="flex items-center gap-3 mb-4">

                <FaChartLine
                  className="
                    text-xl
                    text-indigo-500
                  "
                />

                <h3 className="text-lg font-bold text-slate-800">

                  Inventory Insights

                </h3>

              </div>

              <div className="space-y-3">

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Available

                  </span>

                  <span className="font-bold text-slate-800">

                    {product.stock}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Reserved

                  </span>

                  <span className="font-bold text-slate-800">

                    {product.reservedStock || 0}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Sold

                  </span>

                  <span className="font-bold text-indigo-600">

                    {product.sold || 0}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Low Stock Alert

                  </span>

                  <span className="font-bold text-amber-500">

                    {product.lowStockThreshold}

                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-5">

              Description

            </h2>

            <p className="text-slate-600 text-lg leading-9 max-w-2xl">

              {product.description}

            </p>

          </div>

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-5">

              Tags

            </h2>

            <div className="flex flex-wrap gap-3">

              {product.tags?.map(
                (
                  tag,
                  index
                ) => (

                  <span
                    key={index}
                    className="
                      px-5
                      py-2.5
                      bg-white
                      border
                      border-slate-200
                      rounded-full
                      text-sm
                      font-medium
                      text-slate-700
                      shadow-sm
                      hover:border-indigo-500
                      hover:bg-indigo-50
                      transition-all
                      duration-300
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <FaTag
                      className="
                        text-indigo-500
                      "
                    />

                    {tag}

                  </span>

                )
              )}

            </div>

          </div>

          <div className="flex flex-col md:flex-row gap-5 mt-12">

            <button
              onClick={() =>
                navigate(
                  `/admin/edit-product/${product._id}`
                )
              }
              className="
                flex-1
                bg-amber-500
                hover:bg-amber-600
                text-white
                transition-all
                duration-300
                py-4
                rounded-2xl
                text-lg
                font-semibold
                hover:scale-[1.02]
                shadow-lg
                hover:shadow-amber-500/30
                flex
                items-center
                justify-center
                gap-3
              "
            >

              <FaEdit />

              Edit Product

            </button>

            <button
              onClick={
                handleDelete
              }
              className="
                flex-1
                bg-red-500
                hover:bg-red-600
                text-white
                transition-all
                duration-300
                py-4
                rounded-2xl
                text-lg
                font-semibold
                hover:scale-[1.02]
                shadow-lg
                hover:shadow-red-500/30
                flex
                items-center
                justify-center
                gap-3
              "
            >

              <FaTrash />

              Delete Product

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;