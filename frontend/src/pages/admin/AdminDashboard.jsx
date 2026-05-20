import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaBoxOpen,
  FaUsers,
  FaShoppingBag,
  FaPlus,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import {
  getDashboardStats,
} from "../../services/AdminService";

function AdminDashboard() {

  const navigate =
    useNavigate();

  const [stats, setStats] =
    useState({
      totalProducts: 0,
      totalUsers: 0,
      totalOrders: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const fetchStats =
    async () => {

      try {

        const data =
          await getDashboardStats();

        setStats(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-12">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14">

          <div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900">
              Admin Dashboard
            </h1>

            <p className="text-slate-500 mt-4 text-xl">
              Manage products, users,
              orders and store activity.
            </p>

          </div>

          </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-2xl
              transition-all
              duration-500
              hover:-translate-y-2
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold text-slate-600">
                  Total Products
                </h2>

                <p className="text-5xl font-extrabold text-indigo-600 mt-5">

                  {
                    loading
                      ? "..."
                      : stats.totalProducts
                  }

                </p>

              </div>

              <div
                className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-indigo-100
                  flex
                  items-center
                  justify-center
                "
              >

                <FaBoxOpen
                  className="
                    text-4xl
                    text-indigo-500
                  "
                />

              </div>

            </div>

          </div>

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-2xl
              transition-all
              duration-500
              hover:-translate-y-2
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold text-slate-600">
                  Total Users
                </h2>

                <p className="text-5xl font-extrabold text-green-500 mt-5">

                  {
                    loading
                      ? "..."
                      : stats.totalUsers
                  }

                </p>

              </div>

              <div
                className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-green-100
                  flex
                  items-center
                  justify-center
                "
              >

                <FaUsers
                  className="
                    text-4xl
                    text-green-500
                  "
                />

              </div>

            </div>

          </div>

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-2xl
              transition-all
              duration-500
              hover:-translate-y-2
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold text-slate-600">
                  Total Orders
                </h2>

                <p className="text-5xl font-extrabold text-amber-500 mt-5">

                  {
                    loading
                      ? "..."
                      : stats.totalOrders
                  }

                </p>

              </div>

              <div
                className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-amber-100
                  flex
                  items-center
                  justify-center
                "
              >

                <FaShoppingBag
                  className="
                    text-4xl
                    text-amber-500
                  "
                />

              </div>

            </div>

          </div>

        </div>

        <div className="mt-20">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-4xl font-extrabold text-slate-900">
                Quick Actions
              </h2>

              <p className="text-slate-500 mt-3 text-lg">
                Manage your ecommerce platform
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div
              onClick={() =>
                navigate(
                  "/admin/add-product"
                )
              }
              className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-8
                cursor-pointer
                hover:border-indigo-500
                hover:bg-indigo-50
                hover:-translate-y-2
                transition-all
                duration-500
                shadow-sm
                hover:shadow-2xl
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

                <FaPlus
                  className="
                    text-3xl
                    text-indigo-500
                  "
                />

              </div>

              <h3 className="text-3xl font-bold text-slate-900">
                Add Product
              </h3>

              <p className="text-slate-500 mt-4 leading-7">
                Create and publish new
                products for your store.
              </p>

            </div>

            <div
              onClick={() =>
                navigate(
                  "/admin/products"
                )
              }
              className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-8
                cursor-pointer
                hover:border-green-500
                hover:bg-green-50
                hover:-translate-y-2
                transition-all
                duration-500
                shadow-sm
                hover:shadow-2xl
              "
            >

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-green-100
                  flex
                  items-center
                  justify-center
                  mb-6
                "
              >

                <FaBoxOpen
                  className="
                    text-3xl
                    text-green-500
                  "
                />

              </div>

              <h3 className="text-3xl font-bold text-slate-900">
                Manage Products
              </h3>

              <p className="text-slate-500 mt-4 leading-7">
                Edit, update and delete
                existing products.
              </p>

            </div>

            <div
              onClick={() =>
                navigate(
                  "/admin/orders"
                )
              }
              className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-8
                cursor-pointer
                hover:border-amber-500
                hover:bg-amber-50
                hover:-translate-y-2
                transition-all
                duration-500
                shadow-sm
                hover:shadow-2xl
              "
            >

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-amber-100
                  flex
                  items-center
                  justify-center
                  mb-6
                "
              >

                <FaClipboardList
                  className="
                    text-3xl
                    text-amber-500
                  "
                />

              </div>

              <h3 className="text-3xl font-bold text-slate-900">
                Orders
              </h3>

              <p className="text-slate-500 mt-4 leading-7">
                View customer orders
                and transaction details.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;