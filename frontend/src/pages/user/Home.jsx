import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

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

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <section
        className="
          bg-gradient-to-r
          from-indigo-500
          via-violet-500
          to-pink-500
          py-24
          px-6
        "
      >

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>

            <h1
              className="
                text-5xl
                md:text-6xl
                font-extrabold
                leading-tight
                mb-6
                text-white
              "
            >
              Shop Smarter
              <br />
              With NexCart
            </h1>

            <p
              className="
                text-lg
                text-indigo-100
                mb-8
                leading-8
              "
            >
              Discover premium fashion,
              electronics, accessories,
              and trending products with
              secure payments and fast
              delivery.
            </p>

            <div className="flex gap-5 flex-wrap">

              <Link
                to="/products"
                className="
                  bg-white
                  text-indigo-600
                  px-7
                  py-4
                  rounded-2xl
                  font-semibold
                  hover:bg-slate-100
                  hover:scale-105
                  transition-all
                  duration-300
                  shadow-lg
                "
              >
                Explore Products
              </Link>

              <Link
                to="/wishlist"
                className="
                  border
                  border-white/40
                  bg-white/10
                  backdrop-blur-lg
                  text-white
                  px-7
                  py-4
                  rounded-2xl
                  font-semibold
                  hover:bg-white
                  hover:text-indigo-600
                  transition-all
                  duration-300
                "
              >
                Wishlist
              </Link>

            </div>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1400&auto=format&fit=crop"
              alt="Shopping Banner"
              className="
                rounded-[32px]
                shadow-2xl
                w-full
                h-[450px]
                object-cover
                hover:scale-[1.02]
                transition-all
                duration-500
              "
            />

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-12">

          <h2 className="text-5xl font-extrabold mb-3 text-slate-900">
            Shop By Category
          </h2>

          <p className="text-slate-500 text-lg">
            Explore trending categories
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            "Electronics",
            "Fashion",
            "Accessories",
            "Wearables",
          ].map((category) => (

            <Link
              to={`/products?category=${category}`}
              key={category}
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
                transition-all
                duration-500
                cursor-pointer
                block
              "
            >

              <h3 className="text-2xl font-bold text-slate-900">
                {category}
              </h3>

              <p className="text-slate-500 mt-3">
                Explore premium {category}
              </p>

            </Link>

          ))}

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="flex items-center justify-between mb-12">

          <div>

            <h2 className="text-5xl font-extrabold mb-3 text-slate-900">
              Featured Products
            </h2>

            <p className="text-slate-500">
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
            "
          >
            View All
          </Link>

        </div>

        {loading ? (

          <div className="text-center text-slate-500 text-xl">
            Loading products...
          </div>

        ) : products.length === 0 ? (

          <div className="text-center text-slate-500 text-xl">
            No products found
          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {products
              .slice(0, 4)
              .map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))}

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
          "
        >

          <h2 className="text-5xl font-extrabold mb-6 text-white">
            Big Sale Up To 50% OFF
          </h2>

          <p
            className="
              text-xl
              text-indigo-100
              mb-8
            "
          >
            Grab exciting deals on
            premium products before
            the offer ends.
          </p>

          <Link
            to="/products"
            className="
              inline-block
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
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;

