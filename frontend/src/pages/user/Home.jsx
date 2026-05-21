import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaArrowRight,
  FaBolt,
  FaBoxOpen,
  FaHeart,
  FaPlay,
  FaShieldAlt,
  FaShoppingBag,
  FaStar,
  FaTruck,
} from "react-icons/fa";

import bannerImage from "../../assets/Banner.jpg";

import {
  getProducts,
} from "../../services/ProductService";

import Navbar from "../../components/Navbar";

import ProductCard from "../../components/ProductCard";

function Home() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchProducts =
    async () => {

      try {

        const response =
          await getProducts();

        setProducts(
          response.products
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

  const featuredVideoProducts =
    products.filter(
      (product) =>

        product.videos
          ?.length > 0
    );

  return (

    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-r
          from-indigo-500
          via-violet-500
          to-pink-500
          py-24
          px-6
        "
      >

        <div
          className="
            absolute
            top-0
            left-0
            w-full
            h-full
            opacity-10
            bg-[radial-gradient(circle_at_top_left,white,transparent_40%)]
          "
        />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-3
                bg-white/10
                backdrop-blur-lg
                border
                border-white/20
                px-5
                py-3
                rounded-full
                text-white
                font-semibold
                mb-8
              "
            >

              <FaBolt />

              Next Generation Ecommerce Platform

            </div>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-extrabold
                leading-tight
                mb-8
                text-white
              "
            >

              Shop Smarter
              <br />

              With NexCart

            </h1>

            <p
              className="
                text-xl
                text-indigo-100
                mb-10
                leading-9
                max-w-2xl
              "
            >

              Discover premium electronics,
              fashion, wearables,
              accessories, and trending
              products with secure
              payments, cloud media,
              instant checkout, and
              lightning-fast delivery.

            </p>

            <div className="flex flex-wrap gap-5">

              <Link
                to="/products"
                className="
                  bg-white
                  text-indigo-600
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  hover:bg-slate-100
                  hover:scale-105
                  transition-all
                  duration-300
                  shadow-2xl
                  flex
                  items-center
                  gap-3
                "
              >

                Explore Products

                <FaArrowRight />

              </Link>

              <Link
                to="/wishlist"
                className="
                  border
                  border-white/30
                  bg-white/10
                  backdrop-blur-lg
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  hover:bg-white
                  hover:text-indigo-600
                  transition-all
                  duration-300
                  flex
                  items-center
                  gap-3
                "
              >

                <FaHeart />

                Wishlist

              </Link>

            </div>

          </div>

          <div className="relative">

            <img
              src={bannerImage}
              alt="Shopping Banner"
              className="
                rounded-[40px]
                shadow-2xl
                w-full
                h-[520px]
                object-cover
                hover:scale-[1.02]
                transition-all
                duration-500
              "
            />

            <div
              className="
                absolute
                top-6
                left-6
                bg-white
                rounded-2xl
                px-5
                py-4
                shadow-2xl
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-indigo-100
                  flex
                  items-center
                  justify-center
                "
              >

                <FaTruck
                  className="
                    text-2xl
                    text-indigo-500
                  "
                />

              </div>

              <div>

                <h3 className="font-bold text-slate-900">

                  Fast Delivery

                </h3>

                <p className="text-slate-500 text-sm">

                  Lightning quick shipping

                </p>

              </div>

            </div>

            <div
              className="
                absolute
                bottom-6
                right-6
                bg-white
                rounded-2xl
                px-5
                py-4
                shadow-2xl
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-pink-100
                  flex
                  items-center
                  justify-center
                "
              >

                <FaShieldAlt
                  className="
                    text-2xl
                    text-pink-500
                  "
                />

              </div>

              <div>

                <h3 className="font-bold text-slate-900">

                  Secure Checkout

                </h3>

                <p className="text-slate-500 text-sm">

                  Protected payment system

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-3 gap-8">

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-10
              shadow-sm
              hover:shadow-2xl
              hover:shadow-indigo-500/10
              transition-all
              duration-500
            "
          >

            <FaTruck
              className="
                text-5xl
                text-indigo-500
                mb-6
              "
            />

            <h3 className="text-3xl font-bold text-slate-900">

              Fast Delivery

            </h3>

            <p className="text-slate-500 mt-4 leading-8">

              Experience super-fast
              shipping and real-time
              order tracking.

            </p>

          </div>

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-10
              shadow-sm
              hover:shadow-2xl
              hover:shadow-indigo-500/10
              transition-all
              duration-500
            "
          >

            <FaShieldAlt
              className="
                text-5xl
                text-indigo-500
                mb-6
              "
            />

            <h3 className="text-3xl font-bold text-slate-900">

              Secure Payments

            </h3>

            <p className="text-slate-500 mt-4 leading-8">

              Multiple safe payment
              methods with advanced
              security protection.

            </p>

          </div>

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-10
              shadow-sm
              hover:shadow-2xl
              hover:shadow-indigo-500/10
              transition-all
              duration-500
            "
          >

            <FaShoppingBag
              className="
                text-5xl
                text-indigo-500
                mb-6
              "
            />

            <h3 className="text-3xl font-bold text-slate-900">

              Premium Products

            </h3>

            <p className="text-slate-500 mt-4 leading-8">

              Curated high-quality
              products with modern media
              experiences.

            </p>

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="mb-12">

          <h2 className="text-5xl font-extrabold mb-3 text-slate-900">

            Shop By Category

          </h2>

          <p className="text-slate-500 text-lg">

            Explore trending collections

          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            {
              name:
                "Electronics",
              icon:
                <FaBolt />,
            },

            {
              name:
                "Fashion",
              icon:
                <FaHeart />,
            },

            {
              name:
                "Accessories",
              icon:
                <FaStar />,
            },

            {
              name:
                "Wearables",
              icon:
                <FaShoppingBag />,
            },

          ].map(
            (category) => (

              <Link
                to={`/products?category=${category.name}`}
                key={
                  category.name
                }
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  p-10
                  hover:border-indigo-500
                  hover:bg-indigo-50
                  hover:-translate-y-2
                  hover:shadow-2xl
                  hover:shadow-indigo-500/10
                  transition-all
                  duration-500
                  cursor-pointer
                  block
                "
              >

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-indigo-100
                    flex
                    items-center
                    justify-center
                    mb-6
                  "
                >

                  <div
                    className="
                      text-3xl
                      text-indigo-500
                    "
                  >

                    {
                      category.icon
                    }

                  </div>

                </div>

                <h3 className="text-3xl font-bold text-slate-900">

                  {
                    category.name
                  }

                </h3>

                <p className="text-slate-500 mt-4 leading-7">

                  Explore premium {
                    category.name
                  } products

                </p>

              </Link>

            )
          )}

        </div>

      </section>

      {featuredVideoProducts.length >
        0 && (

          <section className="max-w-7xl mx-auto px-6 pb-20">

            <div className="flex items-center justify-between mb-12">

              <div>

                <h2 className="text-5xl font-extrabold mb-3 text-slate-900">

                  Video Products

                </h2>

                <p className="text-slate-500 text-lg">

                  Interactive product previews

                </p>

              </div>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {featuredVideoProducts
                .slice(0, 3)
                .map(
                  (
                    product
                  ) => (

                    <Link
                      key={
                        product._id
                      }
                      to={`/product/${product._id}`}
                      className="
                      group
                      bg-white
                      border
                      border-slate-200
                      rounded-3xl
                      overflow-hidden
                      shadow-sm
                      hover:shadow-2xl
                      hover:shadow-indigo-500/10
                      transition-all
                      duration-500
                      hover:-translate-y-2
                    "
                    >

                      <div className="relative">

                        <video
                          src={
                            product
                              .videos?.[0]
                          }
                          className="
                          h-80
                          w-full
                          object-cover
                          bg-black
                        "
                        />

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
                            w-20
                            h-20
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
                              text-3xl
                            "
                            />

                          </div>

                        </div>

                      </div>

                      <div className="p-6">

                        <h3 className="text-2xl font-bold text-slate-900">

                          {
                            product.title
                          }

                        </h3>

                        <p className="text-slate-500 mt-3">

                          {
                            product.category
                          }

                        </p>

                      </div>

                    </Link>

                  )
                )}

            </div>

          </section>

        )}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="flex items-center justify-between mb-12">

          <div>

            <h2 className="text-5xl font-extrabold mb-3 text-slate-900">

              Featured Products

            </h2>

            <p className="text-slate-500 text-lg">

              Discover trending products

            </p>

          </div>

          <Link
            to="/products"
            className="
              text-indigo-600
              hover:text-indigo-700
              font-semibold
              transition
              flex
              items-center
              gap-2
            "
          >

            View All

            <FaArrowRight />

          </Link>

        </div>

        {loading ? (

          <div className="text-center text-slate-500 text-xl py-20">

            Loading products...

          </div>

        ) : products.length ===
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

              Add products to display
              them here.

            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {products
              .slice(0, 4)
              .map(
                (
                  product
                ) => (

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

      </section>

      <section className="px-6 pb-24">

        <div
          className="
            max-w-6xl
            mx-auto
            bg-gradient-to-r
            from-indigo-500
            via-violet-500
            to-pink-500
            rounded-[40px]
            p-14
            text-center
            shadow-2xl
            relative
            overflow-hidden
          "
        >

          <div
            className="
              absolute
              top-0
              left-0
              w-full
              h-full
              opacity-10
              bg-[radial-gradient(circle_at_center,white,transparent_60%)]
            "
          />

          <div className="relative z-10">

            <h2 className="text-5xl font-extrabold mb-6 text-white">

              Big Sale Up To 50% OFF

            </h2>

            <p
              className="
                text-xl
                text-indigo-100
                mb-10
                max-w-3xl
                mx-auto
                leading-9
              "
            >

              Grab exciting deals on
              premium products before
              the offer ends.

            </p>

            <div className="flex flex-wrap justify-center gap-5">

              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  gap-3
                  bg-white
                  text-indigo-600
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  hover:bg-slate-100
                  hover:scale-105
                  transition-all
                  duration-300
                  shadow-lg
                "
              >

                Shop Now

                <FaArrowRight />

              </Link>

              <Link
                to="/wishlist"
                className="
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-white/30
                  bg-white/10
                  backdrop-blur-lg
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  hover:bg-white
                  hover:text-indigo-600
                  transition-all
                  duration-300
                "
              >

                <FaHeart />

                Wishlist

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;