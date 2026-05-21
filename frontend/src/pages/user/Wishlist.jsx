import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import {
  getWishlist,
  removeFromWishlist,
} from "../../services/WishlistService";

import {
  addToCart,
} from "../../services/CartService";

function Wishlist() {

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

  if (loading) {

    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 flex items-center justify-center">

        <div className="text-slate-500 text-2xl font-semibold">
          Loading...
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-12">

        <div className="flex items-center gap-4 mb-12">

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-pink-100
              flex
              items-center
              justify-center
            "
          >

            <FaHeart
              className="
                text-3xl
                text-pink-500
              "
            />

          </div>

          <div>

            <h1 className="text-5xl font-extrabold text-slate-900">
              Wishlist
            </h1>

            <p className="text-slate-500 mt-2 text-lg">
              Your favourite products
            </p>

          </div>

        </div>

        {!wishlist ||
          wishlist.products.length === 0 ? (

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
              Wishlist is Empty
            </h2>

            <p className="text-slate-500 text-lg mt-5">
              Add your favourite products
              to wishlist.
            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {wishlist.products.map(
              (product) => (

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
                    transition-all
                    duration-500
                    hover:-translate-y-2
                  "
                >

                  <div className="overflow-hidden">

                    <img
                      src={
                        product
                          .images?.[0]
                      }
                      alt={
                        product.title
                      }
                      className="
                        h-64
                        w-full
                        object-cover
                        hover:scale-110
                        transition-transform
                        duration-700
                      "
                    />

                  </div>

                  <div className="p-5 flex flex-col h-full">

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

                    <p className="text-slate-500 mt-2 font-medium">
                      {
                        product.category
                      }
                    </p>

                    <p className="text-pink-500 text-3xl font-extrabold mt-5">
                      ₹
                      {
                        product.price
                      }
                    </p>

                    <div className="flex flex-col gap-4 mt-6">

                      <button
                        onClick={() =>
                          handleAddToCart(
                            product._id
                          )
                        }
                        className="
                          w-full
                          bg-indigo-500
                          hover:bg-indigo-600
                          text-white
                          transition-all
                          duration-300
                          py-3
                          rounded-2xl
                          font-semibold
                          hover:scale-[1.02]
                          shadow-lg
                          hover:shadow-indigo-500/30
                          flex
                          items-center
                          justify-center
                          gap-3
                        "
                      >

                        <FaShoppingCart />

                        Add To Cart

                      </button>

                      <button
                        onClick={() =>
                          handleRemove(
                            product._id
                          )
                        }
                        className="
                          w-full
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          transition-all
                          duration-300
                          py-3
                          rounded-2xl
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

                        Remove

                      </button>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default Wishlist;