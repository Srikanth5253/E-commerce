// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   useSearchParams,
// } from "react-router-dom";

// import {
//   FaSearch,
//   FaFilter,
//   FaBoxOpen,
// } from "react-icons/fa";

// import toast from "react-hot-toast";

// import Navbar from "../../components/Navbar";

// import ProductCard from "../../components/ProductCard";

// import {
//   getProducts,
// } from "../../services/ProductService";

// function Products() {

//   const [products, setProducts] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [search, setSearch] =
//     useState("");

//   const [selectedCategory, setSelectedCategory] =
//     useState("All");

//   const [searchParams] =
//     useSearchParams();

//   const fetchProducts =
//     async () => {

//       try {

//         const data =
//           await getProducts();

//         setProducts(
//           data.products
//         );

//       } catch (error) {
//          toast.error(
//           error?.response?.data?.message ||
//           "Failed to load products"
//         );

//       } finally {

//         setLoading(false);

//       }
//     };

//   useEffect(() => {

//     fetchProducts();

//   }, []);


//   useEffect(() => {

//     const category =
//       searchParams.get(
//         "category"
//       );

//     if (category) {

//       setSelectedCategory(
//         category
//       );

//     } else {

//       setSelectedCategory(
//         "All"
//       );
//     }

//   }, [searchParams]);


//   const categories =
//     useMemo(() => {

//       const allCategories =
//         products.map(
//           (product) =>
//             product.category
//         );

//       return [
//         "All",
//         ...new Set(allCategories),
//       ];

//     }, [products]);


//   const filteredProducts =
//     useMemo(() => {

//       return products.filter(
//         (product) => {

//           const matchesSearch =

//             product.title
//               .toLowerCase()

//               .includes(
//                 search.toLowerCase()
//               ) ||

//             product.category
//               .toLowerCase()

//               .includes(
//                 search.toLowerCase()
//               ) ||

//             product.tags?.some(
//               (tag) =>
//                 tag
//                   .toLowerCase()

//                   .includes(
//                     search.toLowerCase()
//                   )
//             );

//           const matchesCategory =

//             selectedCategory ===
//             "All" ||

//             product.category ===
//             selectedCategory;

//           return (
//             matchesSearch &&
//             matchesCategory
//           );
//         }
//       );

//     }, [
//       products,
//       search,
//       selectedCategory,
//     ]);

//   return (

//     <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

//       <Navbar />

//       <div className="px-6 py-14 max-w-7xl mx-auto">

//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14">

//           <div className="flex items-center gap-5">

//             <div
//               className="
//                 w-20
//                 h-20
//                 rounded-3xl
//                 bg-indigo-100
//                 flex
//                 items-center
//                 justify-center
//               "
//             >

//               <FaBoxOpen
//                 className="
//                   text-4xl
//                   text-indigo-500
//                 "
//               />

//             </div>

//             <div>

//               <h1 className="text-5xl font-extrabold text-slate-900">

//                 Products

//               </h1>

//               <p className="text-slate-500 mt-3 text-lg">

//                 Explore all available products

//               </p>

//             </div>

//           </div>

//           <div
//             className="
//               bg-white
//               border
//               border-slate-200
//               rounded-2xl
//               px-6
//               py-4
//               shadow-sm
//             "
//           >

//             <p className="text-slate-500 text-sm">

//               Total Products

//             </p>

//             <h2 className="text-3xl font-extrabold text-indigo-600 mt-1">

//               {filteredProducts.length}

//             </h2>

//           </div>

//         </div>

//         <div className="grid lg:grid-cols-4 gap-5 mb-12">

//           <div
//             className="
//               lg:col-span-3
//               bg-white
//               border
//               border-slate-200
//               rounded-2xl
//               px-5
//               py-4
//               shadow-sm
//               flex
//               items-center
//               gap-4
//             "
//           >

//             <FaSearch
//               className="
//                 text-slate-400
//                 text-lg
//               "
//             />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//               placeholder="Search products, tags, category..."
//               className="
//                 w-full
//                 outline-none
//                 bg-transparent
//                 text-slate-700
//                 placeholder:text-slate-400
//               "
//             />

//           </div>

//           <div
//             className="
//               bg-white
//               border
//               border-slate-200
//               rounded-2xl
//               px-5
//               py-4
//               shadow-sm
//               flex
//               items-center
//               gap-4
//             "
//           >

//             <FaFilter
//               className="
//                 text-slate-400
//                 text-lg
//               "
//             />

//             <select
//               value={
//                 selectedCategory
//               }
//               onChange={(e) =>
//                 setSelectedCategory(
//                   e.target.value
//                 )
//               }
//               className="
//                 w-full
//                 outline-none
//                 bg-transparent
//                 text-slate-700
//                 cursor-pointer
//               "
//             >

//               {categories.map(
//                 (
//                   category,
//                   index
//                 ) => (

//                   <option
//                     key={index}
//                     value={category}
//                   >

//                     {category}

//                   </option>

//                 )
//               )}

//             </select>

//           </div>

//         </div>

//         {loading ? (

//           <div className="text-center text-slate-500 text-xl py-20">

//             Loading products...

//           </div>

//         ) : (

//           <>

//             {filteredProducts.length === 0 ? (

//               <div
//                 className="
//                   bg-white
//                   border
//                   border-slate-200
//                   rounded-3xl
//                   p-16
//                   text-center
//                   shadow-xl
//                 "
//               >

//                 <h2 className="text-4xl font-extrabold text-slate-900">

//                   No Products Found

//                 </h2>

//                 <p className="text-slate-500 text-lg mt-5">

//                   Try searching with a different keyword or category.

//                 </p>

//               </div>

//             ) : (

//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

//                 {filteredProducts.map(
//                   (product) => (

//                     <ProductCard
//                       key={
//                         product._id
//                       }
//                       product={
//                         product
//                       }
//                     />

//                   )
//                 )}

//               </div>

//             )}

//           </>

//         )}

//       </div>

//     </div>
//   );
// }

// export default Products;

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import {
  FaSearch,
  FaFilter,
  FaBoxOpen,
  FaVideo,
  FaImage,
  FaTags,
} from "react-icons/fa";

import toast from "react-hot-toast";

import Navbar from "../../components/Navbar";

import ProductCard from "../../components/ProductCard";

import {
  getProducts,
} from "../../services/ProductService";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [searchParams] =
    useSearchParams();

  const fetchProducts =
    async () => {

      try {

        const data =
          await getProducts();

        setProducts(
          data.products
        );

      } catch (error) {

        toast.error(

          error?.response?.data
            ?.message ||

          "Failed to load products"

        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchProducts();

  }, []);

  useEffect(() => {

    const category =
      searchParams.get(
        "category"
      );

    if (category) {

      setSelectedCategory(
        category
      );

    } else {

      setSelectedCategory(
        "All"
      );

    }

  }, [searchParams]);

  const categories =
    useMemo(() => {

      const allCategories =
        products.map(
          (product) =>
            product.category
        );

      return [

        "All",

        ...new Set(
          allCategories
        ),

      ];

    }, [products]);

  const filteredProducts =
    useMemo(() => {

      return products.filter(
        (product) => {

          const query =
            search.toLowerCase();

          const matchesSearch =

            product.title
              ?.toLowerCase()
              .includes(query) ||

            product.category
              ?.toLowerCase()
              .includes(query) ||

            product.description
              ?.toLowerCase()
              .includes(query) ||

            product.tags?.some(
              (tag) =>
                tag
                  ?.toLowerCase()
                  .includes(query)
            ) ||

            (
              query ===
                "video" &&

              product.videos
                ?.length > 0
            ) ||

            (
              query ===
                "image" &&

              product.images
                ?.length > 0
            );

          const matchesCategory =

            selectedCategory ===
            "All" ||

            product.category ===
            selectedCategory;

          return (

            matchesSearch &&
            matchesCategory

          );
        }
      );

    }, [

      products,

      search,

      selectedCategory,

    ]);

  const totalImages =
    products.reduce(
      (
        total,
        product
      ) =>

        total +
        (
          product.images
            ?.length || 0
        ),

      0
    );

  const totalVideos =
    products.reduce(
      (
        total,
        product
      ) =>

        total +
        (
          product.videos
            ?.length || 0
        ),

      0
    );

  return (

    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <div className="px-6 py-14 max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-14">

          <div className="flex items-center gap-5">

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-indigo-100
                flex
                items-center
                justify-center
                shadow-sm
              "
            >

              <FaBoxOpen
                className="
                  text-4xl
                  text-indigo-500
                "
              />

            </div>

            <div>

              <h1 className="text-5xl font-extrabold text-slate-900">

                Explore Products

              </h1>

              <p className="text-slate-500 mt-3 text-lg">

                Discover premium products with images and videos

              </p>

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-3 gap-4">

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

              <h2 className="text-3xl font-extrabold text-indigo-600 mt-1">

                {filteredProducts.length}

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

              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">

                <FaImage />

                Images

              </div>

              <h2 className="text-3xl font-extrabold text-indigo-600 mt-1">

                {totalImages}

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

              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">

                <FaVideo />

                Videos

              </div>

              <h2 className="text-3xl font-extrabold text-indigo-600 mt-1">

                {totalVideos}

              </h2>

            </div>

          </div>

        </div>

        {/* SEARCH + FILTER */}

        <div className="grid lg:grid-cols-4 gap-5 mb-12">

          {/* SEARCH */}

          <div
            className="
              lg:col-span-3
              bg-white
              border
              border-slate-200
              rounded-2xl
              px-5
              py-4
              shadow-sm
              flex
              items-center
              gap-4
            "
          >

            <FaSearch
              className="
                text-slate-400
                text-lg
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search products, tags, categories, videos..."
              className="
                w-full
                outline-none
                bg-transparent
                text-slate-700
                placeholder:text-slate-400
              "
            />

          </div>

          {/* CATEGORY */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              px-5
              py-4
              shadow-sm
              flex
              items-center
              gap-4
            "
          >

            <FaFilter
              className="
                text-slate-400
                text-lg
              "
            />

            <select
              value={
                selectedCategory
              }
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
              className="
                w-full
                outline-none
                bg-transparent
                text-slate-700
                cursor-pointer
              "
            >

              {categories.map(
                (
                  category,
                  index
                ) => (

                  <option
                    key={index}
                    value={category}
                  >

                    {category}

                  </option>

                )
              )}

            </select>

          </div>

        </div>

        {/* QUICK TAGS */}

        <div className="flex flex-wrap gap-3 mb-12">

          <button
            onClick={() =>
              setSearch("video")
            }
            className="
              px-5
              py-2.5
              rounded-full
              bg-white
              border
              border-slate-200
              text-slate-700
              hover:bg-indigo-50
              hover:border-indigo-400
              transition-all
              duration-300
              flex
              items-center
              gap-2
              font-medium
            "
          >

            <FaVideo />

            Video Products

          </button>

          <button
            onClick={() =>
              setSearch("image")
            }
            className="
              px-5
              py-2.5
              rounded-full
              bg-white
              border
              border-slate-200
              text-slate-700
              hover:bg-indigo-50
              hover:border-indigo-400
              transition-all
              duration-300
              flex
              items-center
              gap-2
              font-medium
            "
          >

            <FaImage />

            Image Products

          </button>

          <button
            onClick={() => {

              setSearch("");

              setSelectedCategory(
                "All"
              );

            }}
            className="
              px-5
              py-2.5
              rounded-full
              bg-indigo-500
              text-white
              hover:bg-indigo-600
              transition-all
              duration-300
              flex
              items-center
              gap-2
              font-medium
            "
          >

            <FaTags />

            Reset Filters

          </button>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-slate-500 text-xl py-24">

            Loading products...

          </div>

        ) : (

          <>

            {/* EMPTY */}

            {filteredProducts.length === 0 ? (

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
                    w-24
                    h-24
                    mx-auto
                    rounded-full
                    bg-slate-100
                    flex
                    items-center
                    justify-center
                    mb-6
                  "
                >

                  <FaBoxOpen
                    className="
                      text-4xl
                      text-slate-400
                    "
                  />

                </div>

                <h2 className="text-4xl font-extrabold text-slate-900">

                  No Products Found

                </h2>

                <p className="text-slate-500 text-lg mt-5">

                  Try searching with another keyword or category.

                </p>

              </div>

            ) : (

              <div
                className="
                  grid
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                  gap-8
                "
              >

                {filteredProducts.map(
                  (product) => (

                    <ProductCard
                      key={
                        product._id
                      }
                      product={
                        product
                      }
                    />

                  )
                )}

              </div>

            )}

          </>

        )}

      </div>

    </div>
  );
}

export default Products;