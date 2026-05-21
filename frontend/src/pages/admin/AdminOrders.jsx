import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaShippingFast,
  FaTimesCircle,
  FaMoneyCheckAlt,
} from "react-icons/fa";

import Navbar
  from "../../components/Navbar";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/AdminService";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders =
    async () => {

      try {

        const data =
          await getAllOrders();

        setOrders(
          data.orders
        );

      } catch (error) {

        toast.error(
          "Failed to fetch orders"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatus =
    async (
      orderId,
      status
    ) => {

      try {

        const response =
          await updateOrderStatus(
            orderId,
            status
          );

        toast.success(
          response.message
        );

        fetchOrders();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Status update failed"
        );
      }
    };


  const getStatusStyle =
    (status) => {

      switch (status) {

        case "Processing":
          return `
            bg-amber-100
            text-amber-600
            border-amber-200
          `;

        case "Shipped":
          return `
            bg-blue-100
            text-blue-600
            border-blue-200
          `;

        case "Delivered":
          return `
            bg-green-100
            text-green-600
            border-green-200
          `;

        case "Cancelled":
          return `
            bg-red-100
            text-red-600
            border-red-200
          `;

        default:
          return `
            bg-slate-100
            text-slate-600
            border-slate-200
          `;
      }
    };

  const getStatusIcon =
    (status) => {

      switch (status) {

        case "Processing":
          return <FaClock />;

        case "Shipped":
          return <FaShippingFast />;

        case "Delivered":
          return <FaCheckCircle />;

        case "Cancelled":
          return <FaTimesCircle />;

        default:
          return <FaBoxOpen />;
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

        <div className="flex items-center gap-5 mb-14">

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

          <div>

            <h1 className="text-5xl font-extrabold text-slate-900">
              Customer Orders
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Manage customer purchases and transactions
            </p>

          </div>

        </div>


        {orders.length === 0 ? (

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

            <h2 className="text-4xl font-extrabold text-slate-900">
              No Orders Found
            </h2>

            <p className="text-slate-500 text-lg mt-5">
              Customer orders will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-10">

            {orders.map(
              (order) => (

                <div
                  key={order._id}
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
                  "
                >


                  <div className="flex flex-wrap justify-between gap-8">

                    <div>

                      <h2 className="text-3xl font-bold text-slate-900">
                        {
                          order.user?.name
                        }
                      </h2>

                      <p className="text-slate-500 mt-3 break-all">
                        {
                          order.user?.email
                        }
                      </p>

                    </div>

                    <div>

                      <p className="text-slate-500 mb-3 font-medium">
                        Order Status
                      </p>

                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-xl
                            border
                            font-semibold
                            ${getStatusStyle(
                            order.status
                          )}
                          `}
                        >

                          {
                            getStatusIcon(
                              order.status
                            )
                          }

                          {order.status}

                        </div>

                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatus(
                              order._id,
                              e.target.value
                            )
                          }
                          className="
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
                            transition-all
                            duration-300
                          "
                        >

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </div>

                    </div>

                    <div>

                      <p className="text-slate-500 font-medium">
                        Payment
                      </p>

                      <div className="flex items-center gap-3 mt-3">

                        <FaMoneyCheckAlt
                          className={
                            order.isPaid
                              ? "text-green-500 text-2xl"
                              : "text-red-500 text-2xl"
                          }
                        />

                        <span
                          className={
                            order.isPaid
                              ? "text-green-500 font-bold text-lg"
                              : "text-red-500 font-bold text-lg"
                          }
                        >
                          {
                            order.isPaid
                              ? "Paid"
                              : "Pending"
                          }
                        </span>

                      </div>

                    </div>

                    <div>

                      <p className="text-slate-500 font-medium">
                        Total
                      </p>

                      <span className="text-indigo-600 text-4xl font-extrabold mt-3 block">

                        ₹
                        {
                          order.totalPrice
                        }

                      </span>

                    </div>

                  </div>

                  <div className="mt-10 space-y-5">

                    {order.orderItems.map(
                      (item) => (

                        <div
                          key={item.product}
                          className="
                            flex
                            items-center
                            gap-5
                            border
                            border-slate-200
                            rounded-3xl
                            p-5
                            bg-slate-50
                            hover:bg-white
                            hover:shadow-lg
                            transition-all
                            duration-300
                          "
                        >

                          <div className="overflow-hidden rounded-2xl">

                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.title
                              }
                              className="
                                w-28
                                h-28
                                object-cover
                                hover:scale-110
                                transition-transform
                                duration-700
                              "
                            />

                          </div>

                          <div className="flex-1">

                            <h3 className="text-2xl font-bold text-slate-900">
                              {
                                item.title
                              }
                            </h3>

                            <p className="text-slate-500 mt-3">
                              Quantity:
                              {" "}
                              {
                                item.quantity
                              }
                            </p>

                          </div>

                          <div className="text-indigo-600 text-2xl font-extrabold">

                            ₹
                            {item.price}

                          </div>

                        </div>
                      )
                    )}

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

export default AdminOrders;