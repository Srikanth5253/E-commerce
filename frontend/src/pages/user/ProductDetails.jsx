import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaTag,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import ProductCard from "../../components/ProductCard";

import {
  getSingleProduct,
  addReview,
  getRelatedProducts,
} from "../../services/ProductService";

import {
  addToCart,
} from "../../services/CartService";

import {
  addToWishlist,
} from "../../services/WishlistService";

function ProductDetails() {

  const { id } =
    useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const [
    relatedProducts,
    setRelatedProducts,
  ] = useState([]);

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

      } catch (error) {

        toast.error(
          "Failed to load product"
        );

      } finally {

        setLoading(false);

      }
    };

  const fetchRelatedProducts =
    async () => {

      try {

        const data =
          await getRelatedProducts(
            id
          );

        setRelatedProducts(
          data.relatedProducts
        );

      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
          "Failed to load related products"
        );
      }
    };

  useEffect(() => {

    fetchProduct();

    fetchRelatedProducts();

  }, [id]);

  const handleAddToCart =
    async () => {

      if (product.stock === 0) {

        toast.error(
          "Product is out of stock"
        );

        return;
      }

      try {

        const response =
          await addToCart(
            product._id
          );

        toast.success(
          response.message
        );

        await fetchProduct();

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Failed to add to cart"

        );
      }
    };

  const handleWishlist =
    async () => {

      try {

        const response =
          await addToWishlist(
            product._id
          );

        toast.success(
          response.message
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Wishlist failed"
        );
      }
    };

  const handleReview =
    async () => {

      if (!comment) {

        toast.error(
          "Please enter review"
        );

        return;
      }

      try {

        const response =
          await addReview(
            product._id,
            {
              rating,
              comment,
            }
          );

        toast.success(
          response.message
        );

        fetchProduct();

        setRating(5);

        setComment("");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Review failed"
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

          <img
            src={
              product.images?.[0]
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

          {product.images?.length > 1 && (

            <div className="flex gap-4 mt-5 overflow-x-auto pb-2">

              {product.images.map(
                (
                  image,
                  index
                ) => (

                  <img
                    key={index}
                    src={image}
                    alt="product"
                    className="
                      w-24
                      h-24
                      object-cover
                      rounded-2xl
                      border
                      border-slate-200
                      hover:border-indigo-500
                      hover:scale-105
                      transition-all
                      duration-300
                      cursor-pointer
                      shadow-sm
                      bg-white
                    "
                  />

                )
              )}

            </div>

          )}

        </div>

        <div className="pt-2 lg:sticky lg:top-28 h-fit">

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

          {/* Rating */}

          <div className="flex items-center gap-3 mt-5">

            <div className="flex items-center gap-2 text-amber-500">

              <FaStar />

              <span className="font-bold text-xl">

                {
                  product.averageRating?.toFixed(
                    1
                  ) || "0"
                }

              </span>

            </div>

            <span className="text-slate-500">

              (
              {
                product.numReviews
              }
              {" "}
              reviews
              )

            </span>

          </div>

          <div className="mt-6">

            <span className="text-4xl font-extrabold text-indigo-600">

              ₹{product.price}

            </span>

          </div>

          <div className="mt-6">

            {product.stock === 0 ? (

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-red-100
                  text-red-600
                  px-5
                  py-3
                  rounded-2xl
                  font-bold
                  text-lg
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
                  gap-2
                  bg-amber-100
                  text-amber-600
                  px-5
                  py-3
                  rounded-2xl
                  font-bold
                  text-lg
                "
              >

                Only {product.stock} left

              </div>

            ) : (

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-green-100
                  text-green-600
                  px-5
                  py-3
                  rounded-2xl
                  font-bold
                  text-lg
                "
              >

                In Stock

              </div>

            )}

          </div>

          <div className="mt-8">

            <h2 className="text-3xl font-bold mb-4">

              Description

            </h2>

            <p className="text-slate-600 text-lg leading-9 max-w-2xl">

              {product.description}

            </p>

          </div>

          <div className="mt-8 flex flex-wrap gap-3">

            {product.tags?.map(
              (tag, index) => (

                <span
                  key={index}
                  className="
                    flex
                    items-center
                    gap-2
                    px-5
                    py-2.5
                    bg-indigo-50
                    border
                    border-indigo-200
                    rounded-full
                    text-sm
                    font-semibold
                    text-indigo-700
                    shadow-sm
                    hover:bg-indigo-100
                    hover:border-indigo-400
                    transition-all
                    duration-300
                  "
                >

                  <FaTag className="text-indigo-500" />

                  {tag}

                </span>

              )
            )}

          </div>

          {product.videos?.length > 0 && (

            <div className="mt-10">

              <h2 className="text-3xl font-bold mb-5">

                Product Videos

              </h2>

              <div className="space-y-5">

                {product.videos.map(
                  (
                    video,
                    index
                  ) => (

                    <video
                      key={index}
                      controls
                      className="
                        w-full
                        rounded-3xl
                        border
                        border-slate-200
                        shadow-lg
                      "
                    >

                      <source
                        src={video}
                        type="video/mp4"
                      />

                    </video>

                  )
                )}

              </div>

            </div>

          )}

          <div className="flex flex-col gap-4 mt-10">

            <button

              onClick={
                handleAddToCart
              }

              disabled={
                product.stock === 0
              }

              className={`
                w-full
                transition-all
                duration-300
                py-4
                rounded-2xl
                text-xl
                font-semibold
                flex
                items-center
                justify-center
                gap-3
                shadow-lg

                ${product.stock === 0

                  ? `
                      bg-slate-300
                      cursor-not-allowed
                      text-slate-500
                    `

                  : `
                      bg-indigo-500
                      hover:bg-indigo-600
                      text-white
                      hover:scale-[1.02]
                      hover:shadow-indigo-500/30
                    `
                }
              `}
            >

              <FaShoppingCart />

              {
                product.stock === 0

                  ? "Out Of Stock"

                  : "Add To Cart"
              }

            </button>

            <button
              onClick={
                handleWishlist
              }
              className="
                w-full
                bg-pink-500
                hover:bg-pink-600
                text-white
                transition-all
                duration-300
                py-4
                rounded-2xl
                text-lg
                font-semibold
                hover:scale-[1.02]
                shadow-lg
                hover:shadow-pink-500/30
                flex
                items-center
                justify-center
                gap-3
              "
            >

              <FaHeart />

              Add To Wishlist

            </button>

          </div>

        </div>

      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-20">

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">

          <h2 className="text-4xl font-extrabold mb-8">

            Add Review

          </h2>

          <div className="mb-5">

            <label className="block mb-2 text-slate-600 font-medium">

              Rating

            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(
                  e.target.value
                )
              }
              className="
                w-full
                bg-slate-50
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
              "
            >

              <option value="1">
                1 Star
              </option>

              <option value="2">
                2 Stars
              </option>

              <option value="3">
                3 Stars
              </option>

              <option value="4">
                4 Stars
              </option>

              <option value="5">
                5 Stars
              </option>

            </select>

          </div>

          <div className="mb-5">

            <label className="block mb-2 text-slate-600 font-medium">

              Comment

            </label>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              rows="5"
              placeholder="Write your review..."
              className="
                w-full
                bg-slate-50
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
              "
            />

          </div>

          <button
            onClick={
              handleReview
            }
            className="
              w-full
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
            "
          >

            Submit Review

          </button>

        </div>

        <div className="mt-14">

          <h2 className="text-4xl font-extrabold mb-8">

            Customer Reviews

          </h2>

          {!product.reviews ||
            product.reviews.length === 0 ? (

            <p className="text-slate-500 text-lg">

              No reviews yet

            </p>

          ) : (

            <div className="space-y-6">

              {product.reviews.map(
                (review) => (

                  <div
                    key={
                      review._id
                    }
                    className="
                      bg-white
                      border
                      border-slate-200
                      rounded-3xl
                      p-6
                      shadow-sm
                      hover:shadow-xl
                      transition-all
                      duration-500
                    "
                  >

                    <h3 className="text-2xl font-bold text-slate-900">

                      {review.name}

                    </h3>

                    <div className="flex items-center gap-2 text-amber-500 mt-3">

                      <FaStar />

                      <span className="font-bold">

                        {
                          review.rating
                        }
                        /5

                      </span>

                    </div>

                    <p className="text-slate-600 mt-4 leading-7">

                      {
                        review.comment
                      }

                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        {relatedProducts.length > 0 && (

          <div className="mt-20">

            <h2 className="text-5xl font-extrabold mb-10 text-slate-900">

              Suggested Products

            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {relatedProducts.map(
                (product) => (

                  <ProductCard
                    key={product._id}
                    product={product}
                  />

                )
              )}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default ProductDetails;

