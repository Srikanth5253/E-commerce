// import {
//   useEffect,
//   useState,
// } from "react";

// import Navbar
//   from "../../components/Navbar";

// import {
//   getMyOrders,
// } from "../../services/OrderService";

// function Orders() {

//   const [orders, setOrders] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const fetchOrders =
//     async () => {

//       try {

//         const data =
//           await getMyOrders();

//         setOrders(
//           data.orders
//         );

//       } catch (error) {

//         console.log(error);

//       } finally {

//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     fetchOrders();
//   }, []);


//   const getStatusColor =
//     (status) => {

//       switch (status) {

//         case "Processing":
//           return "text-yellow-500";

//         case "Shipped":
//           return "text-blue-500";

//         case "Delivered":
//           return "text-green-500";

//         case "Cancelled":
//           return "text-red-500";

//         default:
//           return "text-slate-700";
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

//       <div className="max-w-7xl mx-auto px-6 py-12">

//         <h1 className="text-5xl font-extrabold mb-10 text-slate-900">
//           My Orders
//         </h1>

//         {orders.length ===
//           0 ? (

//           <p className="text-slate-500 text-xl">
//             No orders found
//           </p>

//         ) : (

//           <div className="space-y-8">

//             {orders.map(
//               (order) => (

//                 <div
//                   key={order._id}
//                   className="
//                     bg-white
//                     border
//                     border-slate-200
//                     rounded-3xl
//                     p-8
//                     shadow-sm
//                     hover:shadow-2xl
//                     transition-all
//                     duration-500
//                   "
//                 >

//                   <div className="flex flex-wrap items-center justify-between gap-6">

//                     <div>

//                       <h2 className="text-2xl font-bold text-slate-900">
//                         Order ID
//                       </h2>

//                       <p className="text-slate-500 mt-2 break-all">
//                         {order._id}
//                       </p>

//                     </div>

//                     <div>

//                       <p className="text-slate-500 mb-1">
//                         Status
//                       </p>

//                       <span
//                         className={`
//                           font-bold
//                           text-lg
//                           ${getStatusColor(
//                           order.status
//                         )}
//                         `}
//                       >
//                         {order.status}
//                       </span>

//                     </div>

//                     <div>

//                       <p className="text-slate-500 mb-1">
//                         Payment
//                       </p>

//                       <span
//                         className={
//                           order.isPaid
//                             ? "text-green-500 font-bold text-lg"
//                             : "text-red-500 font-bold text-lg"
//                         }
//                       >
//                         {
//                           order.isPaid
//                             ? "Paid"
//                             : "Pending"
//                         }
//                       </span>

//                     </div>

//                     <div>

//                       <p className="text-slate-500 mb-1">
//                         Total
//                       </p>

//                       <span className="text-indigo-600 text-3xl font-extrabold">

//                         ₹
//                         {
//                           order.totalPrice
//                         }

//                       </span>

//                     </div>

//                   </div>

//                   <div className="mt-8 space-y-5">

//                     {order.orderItems.map(
//                       (item) => (

//                         <div
//                           key={item.product}
//                           className="
//                             flex
//                             items-center
//                             gap-5
//                             border
//                             border-slate-200
//                             bg-slate-50
//                             rounded-2xl
//                             p-4
//                             hover:bg-white
//                             hover:shadow-lg
//                             transition-all
//                             duration-300
//                           "
//                         >

//                           <div className="overflow-hidden rounded-2xl">

//                             <img
//                               src={
//                                 item.image
//                               }
//                               alt={
//                                 item.title
//                               }
//                               className="
//                                 w-24
//                                 h-24
//                                 object-cover
//                                 hover:scale-110
//                                 transition-transform
//                                 duration-700
//                               "
//                             />

//                           </div>

//                           <div className="flex-1">

//                             <h3 className="text-xl font-bold text-slate-900">
//                               {item.title}
//                             </h3>

//                             <p className="text-slate-500 mt-2">
//                               Quantity:
//                               {" "}
//                               {item.quantity}
//                             </p>

//                           </div>

//                           <div className="text-indigo-600 text-2xl font-bold">

//                             ₹
//                             {item.price}

//                           </div>

//                         </div>
//                       )
//                     )}

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

// export default Orders;

import {
  useEffect,
  useState,
} from "react";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaTimesCircle,
  FaRupeeSign,
} from "react-icons/fa";

import Navbar
  from "../../components/Navbar";

import {
  getMyOrders,
} from "../../services/OrderService";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders =
    async () => {

      try {

        const data =
          await getMyOrders();

        setOrders(
          data.orders
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchOrders();

  }, []);

  const getStatusColor =
    (status) => {

      switch (status) {

        case "Processing":
          return `
            bg-yellow-100
            text-yellow-600
          `;

        case "Shipped":
          return `
            bg-blue-100
            text-blue-600
          `;

        case "Delivered":
          return `
            bg-green-100
            text-green-600
          `;

        case "Cancelled":
          return `
            bg-red-100
            text-red-600
          `;

        default:
          return `
            bg-slate-100
            text-slate-700
          `;
      }
    };

  const getStatusIcon =
    (status) => {

      switch (status) {

        case "Processing":
          return <FaClock />;

        case "Shipped":
          return <FaTruck />;

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

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}

        <div className="flex items-center gap-5 mb-12">

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

              My Orders

            </h1>

            <p className="text-slate-500 mt-3 text-lg">

              Track all your purchases and order history

            </p>

          </div>

        </div>

        {/* Empty State */}

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

              You haven’t placed any orders yet.

            </p>

          </div>

        ) : (

          <div className="space-y-8">

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

                  {/* Top Section */}

                  <div className="flex flex-wrap items-center justify-between gap-8">

                    {/* Order ID */}

                    <div>

                      <p className="text-slate-500 mb-2 font-medium">

                        Order ID

                      </p>

                      <h2 className="text-xl font-bold text-slate-900 break-all">

                        {order._id}

                      </h2>

                    </div>

                    {/* Status */}

                    <div>

                      <p className="text-slate-500 mb-2 font-medium">

                        Status

                      </p>

                      <div
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          px-5
                          py-2.5
                          rounded-2xl
                          font-bold
                          text-lg
                          ${getStatusColor(
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

                    </div>

                    {/* Payment */}

                    <div>

                      <p className="text-slate-500 mb-2 font-medium">

                        Payment

                      </p>

                      <div
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          px-5
                          py-2.5
                          rounded-2xl
                          font-bold
                          text-lg

                          ${
                            order.isPaid

                              ? `
                                bg-green-100
                                text-green-600
                              `

                              : `
                                bg-red-100
                                text-red-600
                              `
                          }
                        `}
                      >

                        {
                          order.isPaid

                            ? <FaCheckCircle />

                            : <FaTimesCircle />
                        }

                        {
                          order.isPaid

                            ? "Paid"

                            : "Pending"
                        }

                      </div>

                    </div>

                    {/* Total */}

                    <div>

                      <p className="text-slate-500 mb-2 font-medium">

                        Total

                      </p>

                      <div className="flex items-center gap-2">

                        <FaRupeeSign
                          className="
                            text-indigo-500
                            text-2xl
                          "
                        />

                        <span className="text-indigo-600 text-4xl font-extrabold">

                          {order.totalPrice}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Order Items */}

                  <div className="mt-10 space-y-5">

                    {order.orderItems.map(
                      (item) => (

                        <div
                          key={item.product}
                          className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            gap-5
                            border
                            border-slate-200
                            bg-slate-50
                            rounded-3xl
                            p-5
                            hover:bg-white
                            hover:shadow-lg
                            transition-all
                            duration-300
                          "
                        >

                          {/* Product Image */}

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

                          {/* Product Info */}

                          <div className="flex-1">

                            <h3 className="text-2xl font-bold text-slate-900">

                              {item.title}

                            </h3>

                            <div className="flex flex-wrap gap-6 mt-3 text-slate-500 font-medium">

                              <p>

                                Quantity:
                                {" "}
                                {item.quantity}

                              </p>

                              <p>

                                Price:
                                {" "}
                                ₹{item.price}

                              </p>

                            </div>

                          </div>

                          {/* Item Total */}

                          <div className="text-right">

                            <p className="text-slate-500 mb-2 font-medium">

                              Item Total

                            </p>

                            <div className="text-indigo-600 text-3xl font-extrabold">

                              ₹
                              {
                                (
                                  item.price *
                                  item.quantity
                                ).toFixed(2)
                              }

                            </div>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                  {/* Footer */}

                  <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-5">

                    <div className="text-slate-500">

                      {
                        order.orderItems.length
                      }
                      {" "}
                      item(s) in this order

                    </div>

                    <div className="text-slate-500">

                      Ordered successfully

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

export default Orders;

