// import {
//   useEffect,
//   useState,
// } from "react";

// import toast from "react-hot-toast";

// import {
//   FaHeart,
//   FaTrash,
//   FaShoppingCart,
// } from "react-icons/fa";

// import Navbar from "../../components/Navbar";

// import {
//   getWishlist,
//   removeFromWishlist,
// } from "../../services/WishlistService";

// import {
//   addToCart,
// } from "../../services/CartService";

// function Wishlist() {

//   const [wishlist, setWishlist] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   const fetchWishlist =
//     async () => {

//       try {

//         const data =
//           await getWishlist();

//         setWishlist(
//           data.wishlist
//         );

//       } catch (error) {

//         toast.error(
//           "Failed to load wishlist"
//         );

//       } finally {

//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);


//   const handleRemove =
//     async (productId) => {

//       try {

//         await removeFromWishlist(
//           productId
//         );

//         toast.success(
//           "Removed from wishlist"
//         );

//         fetchWishlist();

//       } catch (error) {

//         toast.error(
//           error.response?.data
//             ?.message ||
//           "Remove failed"
//         );
//       }
//     };

//   const handleAddToCart =
//     async (productId) => {

//       try {

//         const response =
//           await addToCart(
//             productId
//           );

//         toast.success(
//           response.message
//         );

//       } catch (error) {

//         toast.error(
//           error.response?.data
//             ?.message ||
//           "Failed to add to cart"
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

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

//       <Navbar />

//       <div className="max-w-[1400px] mx-auto px-6 py-12">

//         <div className="flex items-center gap-4 mb-12">

//           <div
//             className="
//               w-16
//               h-16
//               rounded-2xl
//               bg-pink-100
//               flex
//               items-center
//               justify-center
//             "
//           >

//             <FaHeart
//               className="
//                 text-3xl
//                 text-pink-500
//               "
//             />

//           </div>

//           <div>

//             <h1 className="text-5xl font-extrabold text-slate-900">
//               Wishlist
//             </h1>

//             <p className="text-slate-500 mt-2 text-lg">
//               Your favourite products
//             </p>

//           </div>

//         </div>

//         {!wishlist ||
//           wishlist.products.length === 0 ? (

//           <div
//             className="
//               bg-white
//               border
//               border-slate-200
//               rounded-3xl
//               p-16
//               text-center
//               shadow-xl
//             "
//           >

//             <div
//               className="
//                 w-24
//                 h-24
//                 rounded-full
//                 bg-pink-100
//                 flex
//                 items-center
//                 justify-center
//                 mx-auto
//                 mb-8
//               "
//             >

//               <FaHeart
//                 className="
//                   text-5xl
//                   text-pink-500
//                 "
//               />

//             </div>

//             <h2 className="text-4xl font-extrabold text-slate-900">
//               Wishlist is Empty
//             </h2>

//             <p className="text-slate-500 text-lg mt-5">
//               Add your favourite products
//               to wishlist.
//             </p>

//           </div>

//         ) : (

//           <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//             {wishlist.products.map(
//               (product) => (

//                 <div
//                   key={
//                     product._id
//                   }
//                   className="
//                     bg-white
//                     border
//                     border-slate-200
//                     rounded-3xl
//                     overflow-hidden
//                     shadow-sm
//                     hover:shadow-2xl
//                     transition-all
//                     duration-500
//                     hover:-translate-y-2
//                   "
//                 >

//                   <div className="overflow-hidden">

//                     <img
//                       src={
//                         product
//                           .images?.[0]
//                       }
//                       alt={
//                         product.title
//                       }
//                       className="
//                         h-64
//                         w-full
//                         object-cover
//                         hover:scale-110
//                         transition-transform
//                         duration-700
//                       "
//                     />

//                   </div>

//                   <div className="p-5 flex flex-col h-full">

//                     <h2
//                       className="
//                         text-2xl
//                         font-bold
//                         text-slate-900
//                         line-clamp-2
//                         min-h-[64px]
//                       "
//                     >
//                       {
//                         product.title
//                       }
//                     </h2>

//                     <p className="text-slate-500 mt-2 font-medium">
//                       {
//                         product.category
//                       }
//                     </p>

//                     <p className="text-pink-500 text-3xl font-extrabold mt-5">
//                       ₹
//                       {
//                         product.price
//                       }
//                     </p>

//                     <div className="flex flex-col gap-4 mt-6">

//                       <button
//                         onClick={() =>
//                           handleAddToCart(
//                             product._id
//                           )
//                         }
//                         className="
//                           w-full
//                           bg-indigo-500
//                           hover:bg-indigo-600
//                           text-white
//                           transition-all
//                           duration-300
//                           py-3
//                           rounded-2xl
//                           font-semibold
//                           hover:scale-[1.02]
//                           shadow-lg
//                           hover:shadow-indigo-500/30
//                           flex
//                           items-center
//                           justify-center
//                           gap-3
//                         "
//                       >

//                         <FaShoppingCart />

//                         Add To Cart

//                       </button>

//                       <button
//                         onClick={() =>
//                           handleRemove(
//                             product._id
//                           )
//                         }
//                         className="
//                           w-full
//                           bg-red-500
//                           hover:bg-red-600
//                           text-white
//                           transition-all
//                           duration-300
//                           py-3
//                           rounded-2xl
//                           font-semibold
//                           hover:scale-[1.02]
//                           shadow-lg
//                           hover:shadow-red-500/30
//                           flex
//                           items-center
//                           justify-center
//                           gap-3
//                         "
//                       >

//                         <FaTrash />

//                         Remove

//                       </button>

//                     </div>

//                   </div>

//                 </div>
//               )
//             )}

//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

// export default Wishlist;

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
  FaBoxOpen,
  FaImage,
  FaVideo,
  FaPlay,
  FaBolt,
  FaShieldAlt,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../../components/Navbar";

import {
  getWishlist,
  removeFromWishlist,
} from "../../services/WishlistService";

import {
  addToCart,
} from "../../services/CartService";

function Wishlist() {

  const navigate =
    useNavigate();

  const [wishlist, setWishlist] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchWishlist =
    async () => {

      try {

        const data =
          await getWishlist();

        setWishlist(
          data.wishlist
        );

      } catch (error) {

        toast.error(
          "Failed to load wishlist"
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchWishlist();

  }, []);

  const handleRemove =
    async (productId) => {

      try {

        await removeFromWishlist(
          productId
        );

        toast.success(
          "Removed from wishlist"
        );

        fetchWishlist();

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Remove failed"

        );
      }
    };

  const handleAddToCart =
    async (productId) => {

      try {

        const response =
          await addToCart(
            productId
          );

        toast.success(
          response.message
        );

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Failed to add to cart"

        );
      }
    };

  const totalProducts =
    wishlist?.products
      ?.length || 0;

  const totalValue =
    useMemo(() => {

      return (

        wishlist?.products?.reduce(
          (
            acc,
            product
          ) =>

            acc +
            product.price,

          0
        ) || 0

      );

    }, [wishlist]);

  if (loading) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 flex items-center justify-center">

        <div className="text-slate-500 text-2xl font-semibold">

          Loading Wishlist...

        </div>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-12">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-14">

          <div className="flex items-center gap-5">

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-pink-100
                flex
                items-center
                justify-center
              "
            >

              <FaHeart
                className="
                  text-4xl
                  text-pink-500
                "
              />

            </div>

            <div>

              <h1 className="text-5xl font-extrabold text-slate-900">

                Wishlist

              </h1>

              <p className="text-slate-500 mt-3 text-lg">

                Your favourite saved products

              </p>

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 gap-4">

            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                px-6
                py-5
                shadow-sm
                text-center
              "
            >

              <p className="text-slate-400 text-sm">

                Products

              </p>

              <h2 className="text-3xl font-extrabold text-pink-500 mt-1">

                {totalProducts}

              </h2>

            </div>

            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                px-6
                py-5
                shadow-sm
                text-center
              "
            >

              <p className="text-slate-400 text-sm">

                Total Value

              </p>

              <h2 className="text-3xl font-extrabold text-indigo-600 mt-1">

                ₹{totalValue.toFixed(0)}

              </h2>

            </div>

          </div>

        </div>

        {/* EMPTY */}

        {!wishlist ||
        wishlist.products.length ===
          0 ? (

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-16
              text-center
              shadow-xl
            "
          >

            <div
              className="
                w-28
                h-28
                rounded-full
                bg-pink-100
                flex
                items-center
                justify-center
                mx-auto
                mb-8
              "
            >

              <FaHeart
                className="
                  text-5xl
                  text-pink-500
                "
              />

            </div>

            <h2 className="text-4xl font-extrabold text-slate-900">

              Wishlist Is Empty

            </h2>

            <p className="text-slate-500 text-lg mt-5">

              Add products to your wishlist and save them for later.

            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {wishlist.products.map(
              (product) => {

                const previewVideo =
                  product.videos?.[0];

                const hasVideo =
                  product.videos
                    ?.length > 0;

                return (

                  <div
                    key={
                      product._id
                    }
                    className="
                      bg-white
                      border
                      border-slate-200
                      rounded-3xl
                      overflow-hidden
                      shadow-sm
                      hover:shadow-2xl
                      hover:shadow-pink-500/10
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      flex
                      flex-col
                    "
                  >

                    {/* MEDIA */}

                    <div
                      onClick={() =>
                        navigate(
                          `/product/${product._id}`
                        )
                      }
                      className="
                        overflow-hidden
                        relative
                        cursor-pointer
                      "
                    >

                      {product.images?.[0] ? (

                        <img
                          src={
                            product
                              .images?.[0]
                          }
                          alt={
                            product.title
                          }
                          className="
                            h-72
                            w-full
                            object-cover
                            hover:scale-110
                            transition-transform
                            duration-700
                            bg-white
                          "
                        />

                      ) : previewVideo ? (

                        <video
                          src={
                            previewVideo
                          }
                          className="
                            h-72
                            w-full
                            object-cover
                            bg-black
                          "
                        />

                      ) : (

                        <div
                          className="
                            h-72
                            w-full
                            bg-slate-100
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <FaBoxOpen
                            className="
                              text-6xl
                              text-slate-300
                            "
                          />

                        </div>

                      )}

                      {/* MEDIA BADGES */}

                      <div className="absolute top-4 left-4 flex gap-2">

                        <span
                          className="
                            bg-black/70
                            text-white
                            px-3
                            py-1
                            rounded-xl
                            text-xs
                            font-semibold
                            backdrop-blur-md
                            flex
                            items-center
                            gap-1
                          "
                        >

                          <FaImage />

                          {
                            product.images
                              ?.length || 0
                          }

                        </span>

                        {hasVideo && (

                          <span
                            className="
                              bg-indigo-500
                              text-white
                              px-3
                              py-1
                              rounded-xl
                              text-xs
                              font-semibold
                              flex
                              items-center
                              gap-1
                            "
                          >

                            <FaVideo />

                            {
                              product.videos
                                ?.length
                            }

                          </span>

                        )}

                      </div>

                      {/* VIDEO OVERLAY */}

                      {hasVideo && (

                        <div
                          className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <div
                            className="
                              w-16
                              h-16
                              rounded-full
                              bg-black/60
                              backdrop-blur-md
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <FaPlay
                              className="
                                text-white
                                text-2xl
                              "
                            />

                          </div>

                        </div>

                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="p-6 flex flex-col flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <h2
                          className="
                            text-2xl
                            font-bold
                            text-slate-900
                            line-clamp-2
                            min-h-[64px]
                          "
                        >

                          {
                            product.title
                          }

                        </h2>

                        <button
                          onClick={() =>
                            handleRemove(
                              product._id
                            )
                          }
                          className="
                            w-11
                            h-11
                            rounded-2xl
                            bg-red-100
                            text-red-500
                            hover:bg-red-500
                            hover:text-white
                            transition-all
                            duration-300
                            flex
                            items-center
                            justify-center
                            flex-shrink-0
                          "
                        >

                          <FaTrash />

                        </button>

                      </div>

                      <p className="text-slate-500 mt-3 font-medium">

                        {
                          product.category
                        }

                      </p>

                      <p
                        className="
                          text-slate-500
                          mt-3
                          line-clamp-2
                          min-h-[48px]
                        "
                      >

                        {
                          product.description
                        }

                      </p>

                      {/* FEATURES */}

                      <div className="grid grid-cols-2 gap-3 mt-6">

                        <div
                          className="
                            bg-slate-50
                            rounded-2xl
                            p-4
                            text-center
                          "
                        >

                          <FaBolt
                            className="
                              mx-auto
                              text-indigo-500
                              text-lg
                              mb-2
                            "
                          />

                          <p className="text-sm font-semibold">

                            Fast Checkout

                          </p>

                        </div>

                        <div
                          className="
                            bg-slate-50
                            rounded-2xl
                            p-4
                            text-center
                          "
                        >

                          <FaShieldAlt
                            className="
                              mx-auto
                              text-indigo-500
                              text-lg
                              mb-2
                            "
                          />

                          <p className="text-sm font-semibold">

                            Secure Order

                          </p>

                        </div>

                      </div>

                      {/* PRICE */}

                      <div className="mt-7">

                        <p className="text-pink-500 text-4xl font-extrabold">

                          ₹
                          {
                            product.price
                          }

                        </p>

                      </div>

                      {/* STOCK */}

                      <div className="mt-5">

                        {product.stock ===
                        0 ? (

                          <div
                            className="
                              inline-flex
                              items-center
                              bg-red-100
                              text-red-600
                              px-4
                              py-2
                              rounded-xl
                              text-sm
                              font-bold
                            "
                          >

                            Out Of Stock

                          </div>

                        ) : product.stock <=
                          product.lowStockThreshold ? (

                          <div
                            className="
                              inline-flex
                              items-center
                              bg-amber-100
                              text-amber-600
                              px-4
                              py-2
                              rounded-xl
                              text-sm
                              font-bold
                            "
                          >

                            Only {
                              product.stock
                            } left

                          </div>

                        ) : (

                          <div
                            className="
                              inline-flex
                              items-center
                              bg-green-100
                              text-green-600
                              px-4
                              py-2
                              rounded-xl
                              text-sm
                              font-bold
                            "
                          >

                            In Stock

                          </div>

                        )}

                      </div>

                      {/* ACTION */}

                      <button
                        onClick={() =>
                          handleAddToCart(
                            product._id
                          )
                        }
                        disabled={
                          product.stock ===
                          0
                        }
                        className={`
                          w-full
                          mt-8
                          transition-all
                          duration-300
                          py-4
                          rounded-2xl
                          font-semibold
                          hover:scale-[1.02]
                          shadow-lg
                          flex
                          items-center
                          justify-center
                          gap-3

                          ${
                            product.stock ===
                            0

                              ? `
                                bg-slate-300
                                text-slate-500
                                cursor-not-allowed
                              `

                              : `
                                bg-indigo-500
                                hover:bg-indigo-600
                                text-white
                                hover:shadow-indigo-500/30
                              `
                          }
                        `}
                      >

                        <FaShoppingCart />

                        {
                          product.stock ===
                          0

                            ? "Out Of Stock"

                            : "Add To Cart"
                        }

                      </button>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Wishlist;