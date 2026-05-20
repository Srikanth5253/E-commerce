import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <section className="px-6 py-28">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Welcome to
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                {" "}NexCart
              </span>
            </h1>

            <p className="mt-6 text-slate-600 text-lg leading-8">
              Explore premium fashion,
              electronics, gaming,
              accessories, and much more
              with the best quality and
              affordable prices.
            </p>

            <div className="mt-8 flex gap-4">

              <Link
                to="/products"
                className="bg-indigo-500 hover:bg-indigo-600 shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Explore Products
              </Link>

              <Link
                to="/register"
                className="bg-white border border-slate-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white border border-slate-200 shadow-sm hover:shadow-2xl p-5 rounded-3xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500">

              <img
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
                alt="Sneakers"
                className="rounded-xl h-60 w-full object-cover hover:scale-110 transition-transform duration-700"
              />

              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                Sneakers
              </h3>

              <p className="text-slate-500 mt-2">
                Trending collection
              </p>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm hover:shadow-2xl p-5 rounded-3xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500">

              <img
                src="https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg"
                alt="Phone"
                className="rounded-xl h-60 w-full object-cover hover:scale-110 transition-transform duration-700"
              />

              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                Smartphones
              </h3>

              <p className="text-slate-500 mt-2">
                Latest technology
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-10">
            Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {[
              "Fashion",
              "Electronics",
              "Accessories",
              "Gaming",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-500 hover:bg-indigo-50 p-8 rounded-3xl text-center cursor-pointer hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-10">
            Featured Products
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white border border-slate-200 shadow-sm hover:shadow-2xl rounded-3xl overflow-hidden hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500">

              <img
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
                alt="Sneakers"
                className="h-64 w-full object-cover hover:scale-110 transition-transform duration-700"
              />

              <div className="p-5">
                <h3 className="text-2xl font-bold text-slate-900">
                  Nike Sneakers
                </h3>

                <p className="text-slate-500 mt-2">
                  Stylish sneakers with
                  premium comfort.
                </p>

                <span className="text-indigo-600 text-xl font-bold block mt-5">
                  ₹8,999
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm hover:shadow-2xl rounded-3xl overflow-hidden hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500">

              <img
                src="https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg"
                alt="Phone"
                className="h-64 w-full object-cover hover:scale-110 transition-transform duration-700"
              />

              <div className="p-5">
                <h3 className="text-2xl font-bold text-slate-900">
                  iPhone 15
                </h3>

                <p className="text-slate-500 mt-2">
                  Experience next-generation
                  smartphone performance.
                </p>

                <span className="text-indigo-600 text-xl font-bold block mt-5">
                  ₹79,999
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm hover:shadow-2xl rounded-3xl overflow-hidden hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500">

              <img
                src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"
                alt="Watch"
                className="h-64 w-full object-cover hover:scale-110 transition-transform duration-700"
              />

              <div className="p-5">
                <h3 className="text-2xl font-bold text-slate-900">
                  Smart Watch
                </h3>

                <p className="text-slate-500 mt-2">
                  Modern smartwatch with
                  fitness tracking features.
                </p>

                <span className="text-indigo-600 text-xl font-bold block mt-5">
                  ₹6,999
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;