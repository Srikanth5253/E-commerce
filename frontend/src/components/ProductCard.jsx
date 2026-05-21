// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   FaEye,
//   FaStar,
//   FaFire,
//   FaBoxes,
// } from "react-icons/fa";

// function ProductCard({
//   product,
// }) {

//   const navigate =
//     useNavigate();

//   return (

//     <div
//       className="
//         bg-white
//         border
//         border-slate-200
//         rounded-3xl
//         overflow-hidden
//         hover:-translate-y-2
//         hover:scale-[1.02]
//         transition-all
//         duration-500
//         flex
//         flex-col
//         h-full
//         shadow-sm
//         hover:shadow-2xl
//         relative
//       "
//     >

//       <div className="absolute top-4 left-4 z-10">

//         {product.stock === 0 ? (

//           <span
//             className="
//               bg-red-500
//               text-white
//               px-4
//               py-2
//               rounded-xl
//               text-sm
//               font-bold
//               shadow-lg
//             "
//           >

//             Out Of Stock

//           </span>

//         ) : product.stock <=
//           product.lowStockThreshold ? (

//           <span
//             className="
//               bg-amber-500
//               text-white
//               px-4
//               py-2
//               rounded-xl
//               text-sm
//               font-bold
//               shadow-lg
//               flex
//               items-center
//               gap-2
//             "
//           >

//             <FaFire />

//             Only {product.stock} left

//           </span>

//         ) : (

//           <span
//             className="
//               bg-green-500
//               text-white
//               px-4
//               py-2
//               rounded-xl
//               text-sm
//               font-bold
//               shadow-lg
//             "
//           >

//             In Stock

//           </span>

//         )}

//       </div>

//       <div className="overflow-hidden relative">

//         <img
//           src={
//             product.images?.[0]
//           }
//           alt={product.title}
//           className={`
//             h-72
//             w-full
//             object-cover
//             transition-transform
//             duration-700

//             ${product.stock === 0

//               ? "grayscale"

//               : "hover:scale-110"
//             }
//           `}
//         />

//         {product.stock === 0 && (

//           <div
//             className="
//               absolute
//               inset-0
//               bg-black/50
//               flex
//               items-center
//               justify-center
//             "
//           >

//             <div
//               className="
//                 bg-red-500
//                 text-white
//                 px-6
//                 py-3
//                 rounded-2xl
//                 text-lg
//                 font-bold
//                 shadow-xl
//               "
//             >

//               Currently Unavailable

//             </div>

//           </div>

//         )}

//       </div>

//       <div className="p-6 flex flex-col flex-1">

//         <div>

//           <h2
//             className="
//               text-2xl
//               font-bold
//               text-slate-900
//               line-clamp-2
//               min-h-[64px]
//             "
//           >

//             {product.title}

//           </h2>

//           <p className="text-slate-500 mt-2 font-medium">

//             {product.category}

//           </p>

//         </div>

//         <div className="flex items-center gap-2 mt-4">

//           <div className="flex items-center gap-2 text-amber-500">

//             <FaStar className="text-sm" />

//             <span className="font-bold text-base">

//               {
//                 product.averageRating?.toFixed(
//                   1
//                 ) || "0"
//               }

//             </span>

//           </div>

//           <span className="text-slate-500 text-sm font-medium">

//             (
//             {
//               product.numReviews || 0
//             }
//             {" "}
//             reviews
//             )

//           </span>

//         </div>

//         <div className="mt-6 flex items-end justify-between gap-4">

//           <span className="text-indigo-600 text-3xl font-extrabold">

//             ₹{product.price}

//           </span>

//           <div className="flex flex-col items-end">

//             <div className="flex items-center gap-1 text-emerald-600">

//               <FaBoxes className="text-sm" />

//               <span className="text-xs font-semibold">
//                 In Stock
//               </span>

//             </div>

//             <p className="text-lg font-bold text-slate-800 mt-1">

//               {product.stock}

//             </p>

//           </div>

//         </div>

//         <div className="mt-6 min-h-[56px]">

//           {product.stock > 0 &&
//             product.stock <=
//             product.lowStockThreshold && (

//               <div
//                 className="
//                   bg-amber-50
//                   border
//                   border-amber-200
//                   text-amber-700
//                   px-4
//                   py-3
//                   rounded-2xl
//                   text-sm
//                   font-semibold
//                   flex
//                   items-center
//                 "
//               >

//                 Hurry! Only {product.stock} remaining.

//               </div>

//             )}

//         </div>

//         <button
//           onClick={() =>
//             navigate(
//               `/product/${product._id}`
//             )
//           }
//           className={`
//             mt-auto
//             w-full
//             transition-all
//             duration-300
//             py-3.5
//             rounded-2xl
//             font-semibold
//             mt-6
//             shadow-lg
//             flex
//             items-center
//             justify-center
//             gap-3

//             ${product.stock === 0

//               ? `
//                   bg-slate-300
//                   text-slate-500
//                 `

//               : `
//                   bg-indigo-500
//                   hover:bg-indigo-600
//                   text-white
//                   hover:scale-105
//                   hover:shadow-indigo-500/30
//                 `
//             }
//           `}
//         >

//           <FaEye />

//           {
//             product.stock === 0

//               ? "View Product"

//               : "View Details"
//           }

//         </button>

//       </div>

//     </div>
//   );
// }

// export default ProductCard;

import {
  useNavigate,
} from "react-router-dom";

import {
  FaEye,
  FaStar,
  FaFire,
  FaBoxes,
  FaImage,
  FaVideo,
  FaPlay,
} from "react-icons/fa";

function ProductCard({
  product,
}) {

  const navigate =
    useNavigate();

  const hasVideos =
    product.videos?.length > 0;

  return (

    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        overflow-hidden
        hover:-translate-y-2
        hover:scale-[1.02]
        transition-all
        duration-500
        flex
        flex-col
        h-full
        shadow-sm
        hover:shadow-2xl
        relative
      "
    >

      <div className="absolute top-4 left-4 z-10">

        {product.stock === 0 ? (

          <span
            className="
              bg-red-500
              text-white
              px-4
              py-2
              rounded-xl
              text-sm
              font-bold
              shadow-lg
            "
          >

            Out Of Stock

          </span>

        ) : product.stock <=
          product.lowStockThreshold ? (

          <span
            className="
              bg-amber-500
              text-white
              px-4
              py-2
              rounded-xl
              text-sm
              font-bold
              shadow-lg
              flex
              items-center
              gap-2
            "
          >

            <FaFire />

            Only {product.stock} left

          </span>

        ) : (

          <span
            className="
              bg-green-500
              text-white
              px-4
              py-2
              rounded-xl
              text-sm
              font-bold
              shadow-lg
            "
          >

            In Stock

          </span>

        )}

      </div>

      <div className="overflow-hidden relative">

        <img
          src={
            product.images?.[0] ||
            "/placeholder.png"
          }
          alt={product.title}
          className={`
            h-72
            w-full
            object-cover
            transition-transform
            duration-700

            ${product.stock === 0

              ? "grayscale"

              : "hover:scale-110"
            }
          `}
        />

        {product.stock === 0 && (

          <div
            className="
              absolute
              inset-0
              bg-black/50
              flex
              items-center
              justify-center
            "
          >

            <div
              className="
                bg-red-500
                text-white
                px-6
                py-3
                rounded-2xl
                text-lg
                font-bold
                shadow-xl
              "
            >

              Currently Unavailable

            </div>

          </div>

        )}

        {/* Media Count */}

        <div className="absolute bottom-4 left-4 flex gap-2">

          <span
            className="
              bg-black/70
              text-white
              px-3
              py-1.5
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

          {hasVideos && (

            <span
              className="
                bg-indigo-500
                text-white
                px-3
                py-1.5
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

        {/* Video Badge */}

        {hasVideos && (

          <div
            className="
              absolute
              top-4
              right-4
              bg-black/70
              backdrop-blur-md
              text-white
              p-3
              rounded-2xl
              shadow-lg
            "
          >

            <FaPlay />

          </div>

        )}

      </div>

      <div className="p-6 flex flex-col flex-1">

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
              line-clamp-2
              min-h-[64px]
            "
          >

            {product.title}

          </h2>

          <p className="text-slate-500 mt-2 font-medium">

            {product.category}

          </p>

        </div>

        <div className="flex items-center gap-2 mt-4">

          <div className="flex items-center gap-2 text-amber-500">

            <FaStar className="text-sm" />

            <span className="font-bold text-base">

              {
                product.averageRating?.toFixed(
                  1
                ) || "0"
              }

            </span>

          </div>

          <span className="text-slate-500 text-sm font-medium">

            (
            {
              product.numReviews || 0
            }
            {" "}
            reviews
            )

          </span>

        </div>

        <div className="mt-6 flex items-end justify-between gap-4">

          <span className="text-indigo-600 text-3xl font-extrabold">

            ₹{product.price}

          </span>

          <div className="flex flex-col items-end">

            <div className="flex items-center gap-1 text-emerald-600">

              <FaBoxes className="text-sm" />

              <span className="text-xs font-semibold">

                In Stock

              </span>

            </div>

            <p className="text-lg font-bold text-slate-800 mt-1">

              {product.stock}

            </p>

          </div>

        </div>

        <div className="mt-6 min-h-[56px]">

          {product.stock > 0 &&
            product.stock <=
            product.lowStockThreshold && (

              <div
                className="
                  bg-amber-50
                  border
                  border-amber-200
                  text-amber-700
                  px-4
                  py-3
                  rounded-2xl
                  text-sm
                  font-semibold
                  flex
                  items-center
                "
              >

                Hurry! Only {product.stock} remaining.

              </div>

            )}

        </div>

        <button
          onClick={() =>
            navigate(
              `/product/${product._id}`
            )
          }
          className={`
            mt-auto
            w-full
            transition-all
            duration-300
            py-3.5
            rounded-2xl
            font-semibold
            mt-6
            shadow-lg
            flex
            items-center
            justify-center
            gap-3

            ${product.stock === 0

              ? `
                  bg-slate-300
                  text-slate-500
                `

              : `
                  bg-indigo-500
                  hover:bg-indigo-600
                  text-white
                  hover:scale-105
                  hover:shadow-indigo-500/30
                `
            }
          `}
        >

          <FaEye />

          {
            product.stock === 0

              ? "View Product"

              : "View Details"
          }

        </button>

      </div>

    </div>
  );
}

export default ProductCard;