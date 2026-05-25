// // import {
// //   useEffect,
// //   useMemo,
// //   useState,
// // } from "react";

// // import {
// //   useNavigate,
// // } from "react-router-dom";

// // import {
// //   FaBoxOpen,
// //   FaCheckCircle,
// //   FaClock,
// //   FaTruck,
// //   FaTimesCircle,
// //   FaRupeeSign,
// //   FaImage,
// //   FaVideo,
// //   FaShoppingBag,
// //   FaWallet,
// //   FaBolt,
// //   FaShieldAlt,
// // } from "react-icons/fa";

// // import toast from "react-hot-toast";

// // import Navbar
// //   from "../../components/Navbar";

// // import {
// //   getMyOrders,
// // } from "../../services/OrderService";

// // function Orders() {

// //   const [orders, setOrders] =
// //     useState([]);

// //   const [loading, setLoading] =
// //     useState(true);

// //   const navigate =
// //     useNavigate();

// //   const fetchOrders =
// //     async () => {

// //       try {

// //         const data =
// //           await getMyOrders();

// //         setOrders(
// //           data.orders
// //         );

// //       } catch (error) {

// //         toast.error(

// //           error?.response?.data
// //             ?.message ||

// //           "Failed to load orders"

// //         );

// //       } finally {

// //         setLoading(false);

// //       }
// //     };

// //   useEffect(() => {

// //     fetchOrders();

// //   }, []);

// //   const totalSpent =
// //     useMemo(() => {

// //       return orders.reduce(
// //         (
// //           acc,
// //           order
// //         ) =>

// //           acc +
// //           order.totalPrice,

// //         0
// //       );

// //     }, [orders]);

// //   const totalProducts =
// //     useMemo(() => {

// //       return orders.reduce(
// //         (
// //           acc,
// //           order
// //         ) =>

// //           acc +
// //           order.orderItems.length,

// //         0
// //       );

// //     }, [orders]);

// //   const getStatusColor =
// //     (status) => {

// //       switch (status) {

// //         case "Processing":

// //           return `
// //             bg-yellow-100
// //             text-yellow-600
// //           `;

// //         case "Shipped":

// //           return `
// //             bg-blue-100
// //             text-blue-600
// //           `;

// //         case "Delivered":

// //           return `
// //             bg-green-100
// //             text-green-600
// //           `;

// //         case "Cancelled":

// //           return `
// //             bg-red-100
// //             text-red-600
// //           `;

// //         default:

// //           return `
// //             bg-slate-100
// //             text-slate-700
// //           `;
// //       }
// //     };

// //   const getStatusIcon =
// //     (status) => {

// //       switch (status) {

// //         case "Processing":

// //           return <FaClock />;

// //         case "Shipped":

// //           return <FaTruck />;

// //         case "Delivered":

// //           return <FaCheckCircle />;

// //         case "Cancelled":

// //           return <FaTimesCircle />;

// //         default:

// //           return <FaBoxOpen />;
// //       }
// //     };

// //   if (loading) {

// //     return (

// //       <div className="
// //         min-h-screen
// //         bg-gradient-to-b
// //         from-white
// //         via-slate-50
// //         to-slate-100
// //         flex
// //         items-center
// //         justify-center
// //       ">

// //         <div className="
// //           text-slate-500
// //           text-2xl
// //           font-semibold
// //         ">

// //           Loading Orders...

// //         </div>

// //       </div>

// //     );
// //   }

// //   return (

// //     <div className="
// //       min-h-screen
// //       bg-gradient-to-b
// //       from-white
// //       via-slate-50
// //       to-slate-100
// //       text-slate-900
// //     ">

// //       <Navbar />

// //       <div className="
// //         max-w-7xl
// //         mx-auto
// //         px-6
// //         py-12
// //       ">

// //         <div className="
// //           flex
// //           flex-col
// //           xl:flex-row
// //           xl:items-center
// //           xl:justify-between
// //           gap-8
// //           mb-14
// //         ">

// //           <div className="
// //             flex
// //             items-center
// //             gap-5
// //           ">

// //             <div
// //               className="
// //                 w-20
// //                 h-20
// //                 rounded-3xl
// //                 bg-indigo-100
// //                 flex
// //                 items-center
// //                 justify-center
// //               "
// //             >

// //               <FaShoppingBag
// //                 className="
// //                   text-4xl
// //                   text-indigo-500
// //                 "
// //               />

// //             </div>

// //             <div>

// //               <h1 className="
// //                 text-5xl
// //                 font-extrabold
// //                 text-slate-900
// //               ">

// //                 My Orders

// //               </h1>

// //               <p className="
// //                 text-slate-500
// //                 mt-3
// //                 text-lg
// //               ">

// //                 Track your purchases and order history

// //               </p>

// //             </div>

// //           </div>

// //           <div className="
// //             grid
// //             grid-cols-3
// //             gap-4
// //           ">

// //             <div
// //               className="
// //                 bg-white
// //                 border
// //                 border-slate-200
// //                 rounded-2xl
// //                 px-6
// //                 py-5
// //                 shadow-sm
// //                 text-center
// //               "
// //             >

// //               <p className="
// //                 text-slate-400
// //                 text-sm
// //               ">

// //                 Orders

// //               </p>

// //               <h2 className="
// //                 text-3xl
// //                 font-extrabold
// //                 text-indigo-600
// //                 mt-1
// //               ">

// //                 {orders.length}

// //               </h2>

// //             </div>

// //             <div
// //               className="
// //                 bg-white
// //                 border
// //                 border-slate-200
// //                 rounded-2xl
// //                 px-6
// //                 py-5
// //                 shadow-sm
// //                 text-center
// //               "
// //             >

// //               <p className="
// //                 text-slate-400
// //                 text-sm
// //               ">

// //                 Products

// //               </p>

// //               <h2 className="
// //                 text-3xl
// //                 font-extrabold
// //                 text-indigo-600
// //                 mt-1
// //               ">

// //                 {totalProducts}

// //               </h2>

// //             </div>

// //             <div
// //               className="
// //                 bg-white
// //                 border
// //                 border-slate-200
// //                 rounded-2xl
// //                 px-6
// //                 py-5
// //                 shadow-sm
// //                 text-center
// //               "
// //             >

// //               <p className="
// //                 text-slate-400
// //                 text-sm
// //               ">

// //                 Total Spent

// //               </p>

// //               <h2 className="
// //                 text-3xl
// //                 font-extrabold
// //                 text-indigo-600
// //                 mt-1
// //               ">

// //                 ₹{totalSpent.toFixed(0)}

// //               </h2>

// //             </div>

// //           </div>

// //         </div>

// //         {orders.length === 0 ? (

// //           <div
// //             className="
// //               bg-white
// //               border
// //               border-slate-200
// //               rounded-3xl
// //               p-16
// //               text-center
// //               shadow-xl
// //             "
// //           >

// //             <div
// //               className="
// //                 w-28
// //                 h-28
// //                 mx-auto
// //                 rounded-full
// //                 bg-slate-100
// //                 flex
// //                 items-center
// //                 justify-center
// //                 mb-8
// //               "
// //             >

// //               <FaBoxOpen
// //                 className="
// //                   text-5xl
// //                   text-slate-400
// //                 "
// //               />

// //             </div>

// //             <h2 className="
// //               text-4xl
// //               font-extrabold
// //               text-slate-900
// //             ">

// //               No Orders Found

// //             </h2>

// //             <p className="
// //               text-slate-500
// //               text-lg
// //               mt-5
// //             ">

// //               You haven’t placed any orders yet.

// //             </p>

// //           </div>

// //         ) : (

// //           <div className="space-y-8">

// //             {orders.map(
// //               (order) => (

// //                 <div
// //                   key={order._id}
// //                   className="
// //                     bg-white
// //                     border
// //                     border-slate-200
// //                     rounded-3xl
// //                     p-8
// //                     shadow-sm
// //                     hover:shadow-2xl
// //                     hover:shadow-indigo-500/10
// //                     transition-all
// //                     duration-500
// //                   "
// //                 >

// //                   <div className="
// //                     flex
// //                     flex-wrap
// //                     items-center
// //                     justify-between
// //                     gap-8
// //                   ">

// //                     <div>

// //                       <p className="
// //                         text-slate-500
// //                         mb-2
// //                         font-medium
// //                       ">

// //                         Order ID

// //                       </p>

// //                       <h2 className="
// //                         text-xl
// //                         font-bold
// //                         text-slate-900
// //                         break-all
// //                       ">

// //                         {order._id}

// //                       </h2>

// //                     </div>

// //                     <div>

// //                       <p className="
// //                         text-slate-500
// //                         mb-2
// //                         font-medium
// //                       ">

// //                         Status

// //                       </p>

// //                       <div
// //                         className={`
// //                           inline-flex
// //                           items-center
// //                           gap-2
// //                           px-5
// //                           py-2.5
// //                           rounded-2xl
// //                           font-bold
// //                           text-lg
// //                           ${getStatusColor(
// //                           order.status
// //                         )}
// //                         `}
// //                       >

// //                         {
// //                           getStatusIcon(
// //                             order.status
// //                           )
// //                         }

// //                         {order.status}

// //                       </div>

// //                     </div>

// //                     <div>

// //                       <p className="
// //                         text-slate-500
// //                         mb-2
// //                         font-medium
// //                       ">

// //                         Payment

// //                       </p>

// //                       <div
// //                         className={`
// //                           inline-flex
// //                           items-center
// //                           gap-2
// //                           px-5
// //                           py-2.5
// //                           rounded-2xl
// //                           font-bold
// //                           text-lg

// //                           ${order.isPaid

// //                             ? `
// //                                 bg-green-100
// //                                 text-green-600
// //                               `

// //                             : `
// //                                 bg-red-100
// //                                 text-red-600
// //                               `
// //                           }
// //                         `}
// //                       >

// //                         {
// //                           order.isPaid

// //                             ? <FaCheckCircle />

// //                             : <FaTimesCircle />
// //                         }

// //                         {
// //                           order.isPaid

// //                             ? "Paid"

// //                             : "Pending"
// //                         }

// //                       </div>

// //                     </div>

// //                     <div>

// //                       <p className="
// //                         text-slate-500
// //                         mb-2
// //                         font-medium
// //                       ">

// //                         Total

// //                       </p>

// //                       <div className="
// //                         flex
// //                         items-center
// //                         gap-2
// //                       ">

// //                         <FaRupeeSign
// //                           className="
// //                             text-indigo-500
// //                             text-2xl
// //                           "
// //                         />

// //                         <span className="
// //                           text-indigo-600
// //                           text-4xl
// //                           font-extrabold
// //                         ">

// //                           {order.totalPrice}

// //                         </span>

// //                       </div>

// //                       <div className="
// //                         mt-5
// //                         space-y-2
// //                         text-slate-500
// //                         text-sm
// //                       ">

// //                         <div className="
// //                           flex
// //                           justify-between
// //                         ">

// //                           <span>
// //                             Items
// //                           </span>

// //                           <span>
// //                             ₹
// //                             {
// //                               order.itemsPrice?.toFixed(
// //                                 2
// //                               )
// //                             }
// //                           </span>

// //                         </div>

// //                         <div className="
// //                           flex
// //                           justify-between
// //                         ">

// //                           <span>
// //                             GST
// //                           </span>

// //                           <span>
// //                             ₹
// //                             {
// //                               order.gstPrice?.toFixed(
// //                                 2
// //                               )
// //                             }
// //                           </span>

// //                         </div>

// //                         <div className="
// //                           flex
// //                           justify-between
// //                         ">

// //                           <span>
// //                             Delivery
// //                           </span>

// //                           <span>

// //                             {
// //                               order.deliveryPrice ===
// //                                 0

// //                                 ? "FREE"

// //                                 : `₹${order.deliveryPrice}`
// //                             }

// //                           </span>

// //                         </div>

// //                       </div>

// //                     </div>

// //                   </div>

// //                   <div className="
// //                     grid
// //                     grid-cols-3
// //                     gap-4
// //                     mt-10
// //                   ">

// //                     <div
// //                       className="
// //                         bg-slate-50
// //                         rounded-2xl
// //                         p-5
// //                         text-center
// //                       "
// //                     >

// //                       <FaTruck
// //                         className="
// //                           mx-auto
// //                           text-indigo-500
// //                           text-2xl
// //                           mb-3
// //                         "
// //                       />

// //                       <p className="font-semibold">

// //                         Fast Delivery

// //                       </p>

// //                     </div>

// //                     <div
// //                       className="
// //                         bg-slate-50
// //                         rounded-2xl
// //                         p-5
// //                         text-center
// //                       "
// //                     >

// //                       <FaShieldAlt
// //                         className="
// //                           mx-auto
// //                           text-indigo-500
// //                           text-2xl
// //                           mb-3
// //                         "
// //                       />

// //                       <p className="font-semibold">

// //                         Secure Payment

// //                       </p>

// //                     </div>

// //                     <div
// //                       className="
// //                         bg-slate-50
// //                         rounded-2xl
// //                         p-5
// //                         text-center
// //                       "
// //                     >

// //                       <FaBolt
// //                         className="
// //                           mx-auto
// //                           text-indigo-500
// //                           text-2xl
// //                           mb-3
// //                         "
// //                       />

// //                       <p className="font-semibold">

// //                         Instant Updates

// //                       </p>

// //                     </div>

// //                   </div>

// //                   <div
// //                     className="
// //                       mt-8
// //                       bg-slate-50
// //                       border
// //                       border-slate-200
// //                       rounded-3xl
// //                       p-6
// //                     "
// //                   >

// //                     <h3 className="
// //                       text-2xl
// //                       font-bold
// //                       text-slate-900
// //                       mb-5
// //                     ">
// //                       Delivery Details
// //                     </h3>

// //                     <div className="
// //                       grid
// //                       md:grid-cols-2
// //                       gap-6
// //                     ">

// //                       <div>

// //                         <p className="
// //                           text-slate-500
// //                           font-medium
// //                           mb-2
// //                         ">
// //                           Shipping Address
// //                         </p>

// //                         <div className="
// //                           text-slate-700
// //                           space-y-1
// //                         ">

// //                           <p className="font-bold">

// //                             {
// //                               order.shippingAddress
// //                                 ?.fullName
// //                             }

// //                           </p>

// //                           <p>
// //                             {
// //                               order.shippingAddress
// //                                 ?.phone
// //                             }
// //                           </p>

// //                           <p>
// //                             {
// //                               order.shippingAddress
// //                                 ?.address
// //                             }
// //                           </p>

// //                           <p>
// //                             {
// //                               order.shippingAddress
// //                                 ?.city
// //                             },
// //                             {" "}
// //                             {
// //                               order.shippingAddress
// //                                 ?.state
// //                             }
// //                             {" "}
// //                             -
// //                             {" "}
// //                             {
// //                               order.shippingAddress
// //                                 ?.pincode
// //                             }
// //                           </p>

// //                         </div>

// //                       </div>

// //                       <div>

// //                         <p className="
// //                           text-slate-500
// //                           font-medium
// //                           mb-2
// //                         ">
// //                           Payment Method
// //                         </p>

// //                         <div
// //                           className={`
// //                             inline-flex
// //                             items-center
// //                             gap-3
// //                             px-5
// //                             py-3
// //                             rounded-2xl
// //                             font-bold
// //                             text-lg

// //                             ${order.paymentMethod ===
// //                               "COD"

// //                               ? `
// //                                   bg-amber-100
// //                                   text-amber-700
// //                                 `

// //                               : `
// //                                   bg-green-100
// //                                   text-green-700
// //                                 `
// //                             }
// //                           `}
// //                         >

// //                           <FaWallet />

// //                           {
// //                             order.paymentMethod ===
// //                               "COD"

// //                               ? "Cash On Delivery"

// //                               : "Online Payment"
// //                           }

// //                         </div>

// //                       </div>

// //                     </div>

// //                   </div>

// //                   <div className="
// //                     mt-10
// //                     space-y-5
// //                   ">

// //                     {order.orderItems.map(
// //                       (item, index) => {

// //                         const isVideo =
// //                           item.image?.includes(
// //                             ".mp4"
// //                           ) ||

// //                           item.image?.includes(
// //                             ".webm"
// //                           ) ||

// //                           item.image?.includes(
// //                             ".mov"
// //                           );

// //                         return (

// //                           <div
// //                             key={index}
// //                             className="
// //                               flex
// //                               flex-col
// //                               sm:flex-row
// //                               sm:items-center
// //                               gap-5
// //                               border
// //                               border-slate-200
// //                               bg-slate-50
// //                               rounded-3xl
// //                               p-5
// //                               hover:bg-white
// //                               hover:shadow-lg
// //                               transition-all
// //                               duration-300
// //                             "
// //                           >

// //                             <div className="
// //                               relative
// //                               overflow-hidden
// //                               rounded-2xl
// //                             ">

// //                               {isVideo ? (

// //                                 <video
// //                                   src={item.image}
// //                                   className="
// //                                     w-28
// //                                     h-28
// //                                     object-cover
// //                                     bg-black
// //                                   "
// //                                 />

// //                               ) : (

// //                                 <img
// //                                   src={item.image}
// //                                   alt={item.title}
// //                                   className="
// //                                     w-28
// //                                     h-28
// //                                     object-cover
// //                                     hover:scale-110
// //                                     transition-transform
// //                                     duration-700
// //                                     bg-white
// //                                   "
// //                                 />

// //                               )}

// //                               <div className="
// //                                 absolute
// //                                 top-2
// //                                 left-2
// //                               ">

// //                                 {isVideo ? (

// //                                   <div
// //                                     className="
// //                                       bg-indigo-500
// //                                       text-white
// //                                       px-2.5
// //                                       py-1
// //                                       rounded-lg
// //                                       text-xs
// //                                       font-semibold
// //                                       flex
// //                                       items-center
// //                                       gap-1
// //                                     "
// //                                   >

// //                                     <FaVideo />

// //                                     Video

// //                                   </div>

// //                                 ) : (

// //                                   <div
// //                                     className="
// //                                       bg-black/70
// //                                       text-white
// //                                       px-2.5
// //                                       py-1
// //                                       rounded-lg
// //                                       text-xs
// //                                       font-semibold
// //                                       backdrop-blur-md
// //                                       flex
// //                                       items-center
// //                                       gap-1
// //                                     "
// //                                   >

// //                                     <FaImage />

// //                                     Image

// //                                   </div>

// //                                 )}

// //                               </div>

// //                             </div>

// //                             <div className="flex-1">

// //                               <h3 className="
// //                                 text-2xl
// //                                 font-bold
// //                                 text-slate-900
// //                               ">

// //                                 {item.title}

// //                               </h3>

// //                               <div className="
// //                                 flex
// //                                 flex-wrap
// //                                 gap-6
// //                                 mt-4
// //                                 text-slate-500
// //                                 font-medium
// //                               ">

// //                                 <p>

// //                                   Quantity:
// //                                   {" "}
// //                                   {item.quantity}

// //                                 </p>

// //                                 <p>

// //                                   Price:
// //                                   {" "}
// //                                   ₹{item.price}

// //                                 </p>

// //                               </div>

// //                             </div>

// //                             <div className="text-right">

// //                               <p className="
// //                                 text-slate-500
// //                                 mb-2
// //                                 font-medium
// //                               ">

// //                                 Item Total

// //                               </p>

// //                               <div className="
// //                                 text-indigo-600
// //                                 text-3xl
// //                                 font-extrabold
// //                               ">

// //                                 ₹
// //                                 {
// //                                   (
// //                                     item.price *
// //                                     item.quantity
// //                                   ).toFixed(2)
// //                                 }

// //                               </div>

// //                             </div>

// //                           </div>

// //                         );
// //                       }
// //                     )}

// //                   </div>

// //                   <div className="
// //                     mt-8
// //                     pt-6
// //                     border-t
// //                     border-slate-200
// //                     flex
// //                     flex-wrap
// //                     items-center
// //                     justify-between
// //                     gap-5
// //                   ">

// //                     <div className="
// //                       text-slate-500
// //                       flex
// //                       items-center
// //                       gap-2
// //                     ">

// //                       <FaBoxOpen />

// //                       {
// //                         order.orderItems.length
// //                       }
// //                       {" "}
// //                       item(s) in this order

// //                     </div>

// //                     <div className="
// //                       flex
// //                       items-center
// //                       gap-4
// //                     ">

// //                       <div className="
// //                         text-slate-500
// //                         flex
// //                         items-center
// //                         gap-2
// //                       ">

// //                         <FaWallet />

// //                         Order processed successfully

// //                       </div>

// //                       <button
// //                         onClick={() =>
// //                           navigate(
// //                             `/order/${order._id}`
// //                           )
// //                         }
// //                         className="
// //                           bg-indigo-500
// //                           hover:bg-indigo-600
// //                           text-white
// //                           px-6
// //                           py-3
// //                           rounded-2xl
// //                           font-semibold
// //                           transition-all
// //                           duration-300
// //                         "
// //                       >

// //                         View Details

// //                       </button>

// //                     </div>

// //                   </div>

// //                 </div>

// //               )
// //             )}

// //           </div>

// //         )}

// //       </div>

// //     </div>
// //   );
// // }

// // export default Orders;


// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   FaBoxOpen,
//   FaCheckCircle,
//   FaClock,
//   FaTruck,
//   FaTimesCircle,
//   FaRupeeSign,
//   FaImage,
//   FaVideo,
//   FaShoppingBag,
//   FaWallet,
//   FaBolt,
//   FaShieldAlt,
// } from "react-icons/fa";

// import toast from "react-hot-toast";

// import Navbar
//   from "../../components/Navbar";

// import {
//   getMyOrders,
//   cancelOrder,
// } from "../../services/OrderService";

// function Orders() {

//   const [orders, setOrders] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const navigate =
//     useNavigate();

//   const fetchOrders =
//     async () => {

//       try {

//         const data =
//           await getMyOrders();

//         setOrders(
//           data.orders
//         );

//       } catch (error) {

//         toast.error(

//           error?.response?.data
//             ?.message ||

//           "Failed to load orders"

//         );

//       } finally {

//         setLoading(false);

//       }
//     };

//   useEffect(() => {

//     fetchOrders();

//   }, []);

//   const handleCancelOrder =
//     async (id) => {

//       const confirmCancel =
//         window.confirm(
//           "Cancel this order?"
//         );

//       if (!confirmCancel) {

//         return;
//       }

//       try {

//         const data =
//           await cancelOrder(id);

//         toast.success(
//           data.message
//         );

//         fetchOrders();

//       } catch (error) {

//         toast.error(

//           error.response?.data
//             ?.message ||

//           "Failed to cancel order"
//         );
//       }
//     };

//   const totalSpent =
//     useMemo(() => {

//       return orders.reduce(
//         (
//           acc,
//           order
//         ) =>

//           acc +
//           order.totalPrice,

//         0
//       );

//     }, [orders]);

//   const totalProducts =
//     useMemo(() => {

//       return orders.reduce(
//         (
//           acc,
//           order
//         ) =>

//           acc +
//           order.orderItems.length,

//         0
//       );

//     }, [orders]);

//   const getStatusColor =
//     (status) => {

//       switch (status) {

//         case "Processing":

//           return `
//             bg-yellow-100
//             text-yellow-600
//           `;

//         case "Shipped":

//           return `
//             bg-blue-100
//             text-blue-600
//           `;

//         case "Delivered":

//           return `
//             bg-green-100
//             text-green-600
//           `;

//         case "Cancelled":

//           return `
//             bg-red-100
//             text-red-600
//           `;

//         default:

//           return `
//             bg-slate-100
//             text-slate-700
//           `;
//       }
//     };

//   const getStatusIcon =
//     (status) => {

//       switch (status) {

//         case "Processing":

//           return <FaClock />;

//         case "Shipped":

//           return <FaTruck />;

//         case "Delivered":

//           return <FaCheckCircle />;

//         case "Cancelled":

//           return <FaTimesCircle />;

//         default:

//           return <FaBoxOpen />;
//       }
//     };

//   if (loading) {

//     return (

//       <div className="
//         min-h-screen
//         bg-gradient-to-b
//         from-white
//         via-slate-50
//         to-slate-100
//         flex
//         items-center
//         justify-center
//       ">

//         <div className="
//           text-slate-500
//           text-2xl
//           font-semibold
//         ">

//           Loading Orders...

//         </div>

//       </div>

//     );
//   }

//   return (

//     <div className="
//       min-h-screen
//       bg-gradient-to-b
//       from-white
//       via-slate-50
//       to-slate-100
//       text-slate-900
//     ">

//       <Navbar />

//       <div className="
//         max-w-7xl
//         mx-auto
//         px-6
//         py-12
//       ">

//         <div className="
//           flex
//           flex-col
//           xl:flex-row
//           xl:items-center
//           xl:justify-between
//           gap-8
//           mb-14
//         ">

//           <div className="
//             flex
//             items-center
//             gap-5
//           ">

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

//               <FaShoppingBag
//                 className="
//                   text-4xl
//                   text-indigo-500
//                 "
//               />

//             </div>

//             <div>

//               <h1 className="
//                 text-5xl
//                 font-extrabold
//                 text-slate-900
//               ">

//                 My Orders

//               </h1>

//               <p className="
//                 text-slate-500
//                 mt-3
//                 text-lg
//               ">

//                 Track your purchases and order history

//               </p>

//             </div>

//           </div>

//           <div className="
//             grid
//             grid-cols-3
//             gap-4
//           ">

//             <div
//               className="
//                 bg-white
//                 border
//                 border-slate-200
//                 rounded-2xl
//                 px-6
//                 py-5
//                 shadow-sm
//                 text-center
//               "
//             >

//               <p className="
//                 text-slate-400
//                 text-sm
//               ">

//                 Orders

//               </p>

//               <h2 className="
//                 text-3xl
//                 font-extrabold
//                 text-indigo-600
//                 mt-1
//               ">

//                 {orders.length}

//               </h2>

//             </div>

//             <div
//               className="
//                 bg-white
//                 border
//                 border-slate-200
//                 rounded-2xl
//                 px-6
//                 py-5
//                 shadow-sm
//                 text-center
//               "
//             >

//               <p className="
//                 text-slate-400
//                 text-sm
//               ">

//                 Products

//               </p>

//               <h2 className="
//                 text-3xl
//                 font-extrabold
//                 text-indigo-600
//                 mt-1
//               ">

//                 {totalProducts}

//               </h2>

//             </div>

//             <div
//               className="
//                 bg-white
//                 border
//                 border-slate-200
//                 rounded-2xl
//                 px-6
//                 py-5
//                 shadow-sm
//                 text-center
//               "
//             >

//               <p className="
//                 text-slate-400
//                 text-sm
//               ">

//                 Total Spent

//               </p>

//               <h2 className="
//                 text-3xl
//                 font-extrabold
//                 text-indigo-600
//                 mt-1
//               ">

//                 ₹{totalSpent.toFixed(0)}

//               </h2>

//             </div>

//           </div>

//         </div>

//         {orders.length === 0 ? (

//           <div
//             className="
//               bg-white
//               border
//               border-slate-200
//               rounded-3xl
//               p-16
//               text-center
//               shadow-xl
//             "
//           >

//             <div
//               className="
//                 w-28
//                 h-28
//                 mx-auto
//                 rounded-full
//                 bg-slate-100
//                 flex
//                 items-center
//                 justify-center
//                 mb-8
//               "
//             >

//               <FaBoxOpen
//                 className="
//                   text-5xl
//                   text-slate-400
//                 "
//               />

//             </div>

//             <h2 className="
//               text-4xl
//               font-extrabold
//               text-slate-900
//             ">

//               No Orders Found

//             </h2>

//             <p className="
//               text-slate-500
//               text-lg
//               mt-5
//             ">

//               You haven’t placed any orders yet.

//             </p>

//           </div>

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
//                     hover:shadow-indigo-500/10
//                     transition-all
//                     duration-500
//                   "
//                 >

//                   <div className="
//                     mt-8
//                     pt-6
//                     border-t
//                     border-slate-200
//                     flex
//                     flex-wrap
//                     items-center
//                     justify-between
//                     gap-5
//                   ">

//                     <div className="
//                       text-slate-500
//                       flex
//                       items-center
//                       gap-2
//                     ">

//                       <FaBoxOpen />

//                       {
//                         order.orderItems.length
//                       }
//                       {" "}
//                       item(s) in this order

//                     </div>

//                     <div className="
//                       flex
//                       items-center
//                       gap-4
//                       flex-wrap
//                     ">

//                       {
//                         order.status ===
//                         "Processing" && (

//                         <button
//                           onClick={() =>
//                             handleCancelOrder(
//                               order._id
//                             )
//                           }
//                           className="
//                             bg-red-500
//                             hover:bg-red-600
//                             text-white
//                             px-6
//                             py-3
//                             rounded-2xl
//                             font-semibold
//                             transition-all
//                             duration-300
//                           "
//                         >

//                           Cancel Order

//                         </button>

//                       )}

//                       <button
//                         onClick={() =>
//                           navigate(
//                             `/order/${order._id}`
//                           )
//                         }
//                         className="
//                           bg-indigo-500
//                           hover:bg-indigo-600
//                           text-white
//                           px-6
//                           py-3
//                           rounded-2xl
//                           font-semibold
//                           transition-all
//                           duration-300
//                         "
//                       >

//                         View Details

//                       </button>

//                     </div>

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
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaTimesCircle,
  FaShoppingBag,
} from "react-icons/fa";

import toast from "react-hot-toast";

import Navbar
  from "../../components/Navbar";

import {
  getMyOrders,
  cancelOrder,
} from "../../services/OrderService";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  const fetchOrders =
    async () => {

      try {

        const data =
          await getMyOrders();

        setOrders(
          data.orders
        );

      } catch (error) {

        toast.error(

          error?.response?.data
            ?.message ||

          "Failed to load orders"

        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchOrders();

  }, []);

  const handleCancelOrder =
    async (id) => {

      const confirmCancel =
        window.confirm(
          "Cancel this order?"
        );

      if (!confirmCancel) {

        return;
      }

      try {

        const data =
          await cancelOrder(id);

        toast.success(
          data.message
        );

        fetchOrders();

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Failed to cancel order"
        );
      }
    };

  const totalSpent =
    useMemo(() => {

      return orders.reduce(
        (
          acc,
          order
        ) =>

          acc +
          order.totalPrice,

        0
      );

    }, [orders]);

  const totalProducts =
    useMemo(() => {

      return orders.reduce(
        (
          acc,
          order
        ) =>

          acc +
          order.orderItems.length,

        0
      );

    }, [orders]);

  const getStatusColor =
    (status) => {

      switch (status) {

        case "Processing":

          return `
            bg-yellow-100
            text-yellow-700
          `;

        case "Shipped":

          return `
            bg-blue-100
            text-blue-700
          `;

        case "Delivered":

          return `
            bg-green-100
            text-green-700
          `;

        case "Cancelled":

          return `
            bg-red-100
            text-red-700
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

  const formatDate =
    (date) => {

      if (!date) {

        return "N/A";
      }

      return new Date(
        date
      ).toLocaleString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    };

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-gradient-to-b
        from-white
        via-slate-50
        to-slate-100
        flex
        items-center
        justify-center
      ">

        <div className="
          text-slate-500
          text-2xl
          font-semibold
        ">

          Loading Orders...

        </div>

      </div>

    );
  }

  return (

    <div className="
      min-h-screen
      bg-gradient-to-b
      from-white
      via-slate-50
      to-slate-100
      text-slate-900
    ">

      <Navbar />

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-12
      ">
        
        <div className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-8
          mb-14
        ">

          <div className="
            flex
            items-center
            gap-5
          ">

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

              <FaShoppingBag
                className="
                  text-4xl
                  text-indigo-500
                "
              />

            </div>

            <div>

              <h1 className="
                text-5xl
                font-extrabold
                text-slate-900
              ">

                My Orders

              </h1>

              <p className="
                text-slate-500
                mt-3
                text-lg
              ">

                Track your purchases and order history

              </p>

            </div>

          </div>

          <div className="
            grid
            grid-cols-3
            gap-4
          ">

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

              <p className="
                text-slate-400
                text-sm
              ">

                Orders

              </p>

              <h2 className="
                text-3xl
                font-extrabold
                text-indigo-600
                mt-1
              ">

                {orders.length}

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

              <p className="
                text-slate-400
                text-sm
              ">

                Products

              </p>

              <h2 className="
                text-3xl
                font-extrabold
                text-indigo-600
                mt-1
              ">

                {totalProducts}

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

              <p className="
                text-slate-400
                text-sm
              ">

                Total Spent

              </p>

              <h2 className="
                text-3xl
                font-extrabold
                text-indigo-600
                mt-1
              ">

                ₹
                {
                  totalSpent.toFixed(
                    0
                  )
                }

              </h2>

            </div>

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

            <div
              className="
                w-28
                h-28
                mx-auto
                rounded-full
                bg-slate-100
                flex
                items-center
                justify-center
                mb-8
              "
            >

              <FaBoxOpen
                className="
                  text-5xl
                  text-slate-400
                "
              />

            </div>

            <h2 className="
              text-4xl
              font-extrabold
              text-slate-900
            ">

              No Orders Found

            </h2>

            <p className="
              text-slate-500
              text-lg
              mt-5
            ">

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
                    hover:shadow-indigo-500/10
                    transition-all
                    duration-500
                  "
                >

                  <div className="
                    flex
                    flex-col
                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                    gap-8
                  ">

                    <div>

                      <div className="
                        flex
                        items-center
                        gap-4
                        flex-wrap
                      ">

                        <div
                          className={`
                            px-5
                            py-2
                            rounded-2xl
                            font-bold
                            flex
                            items-center
                            gap-3

                            ${
                              getStatusColor(
                                order.status
                              )
                            }
                          `}
                        >

                          {
                            getStatusIcon(
                              order.status
                            )
                          }

                          {order.status}

                        </div>

                        <div
                          className={`
                            px-5
                            py-2
                            rounded-2xl
                            font-bold

                            ${
                              order.isPaid

                                ? `
                                    bg-green-100
                                    text-green-700
                                  `

                                : `
                                    bg-red-100
                                    text-red-700
                                  `
                            }
                          `}
                        >

                          {
                            order.isPaid

                              ? "Paid"

                              : "Pending"
                          }

                        </div>

                        {
                          order.refundStatus &&
                          order.refundStatus !==
                          "Not Applicable" && (

                          <div
                            className={`
                              px-5
                              py-2
                              rounded-2xl
                              font-bold

                              ${
                                order.refundStatus ===
                                "Pending"

                                  ? `
                                      bg-yellow-100
                                      text-yellow-700
                                    `

                                  : `
                                      bg-green-100
                                      text-green-700
                                    `
                              }
                            `}
                          >

                            Refund:
                            {" "}
                            {
                              order.refundStatus
                            }

                          </div>

                        )}

                      </div>

                      <h2 className="
                        text-3xl
                        font-extrabold
                        text-slate-900
                        mt-6
                      ">

                        ₹
                        {
                          order.totalPrice
                            ?.toFixed(2)
                        }

                      </h2>

                      <p className="
                        text-slate-500
                        mt-3
                        break-all
                      ">

                        Order ID:
                        {" "}
                        {order._id}

                      </p>

                    </div>

                    <div className="
                      grid
                      md:grid-cols-2
                      gap-4
                    ">

                      <div
                        className="
                          bg-slate-50
                          border
                          border-slate-200
                          rounded-2xl
                          px-5
                          py-4
                        "
                      >

                        <p className="
                          text-slate-500
                          text-sm
                          mb-2
                        ">

                          Ordered On

                        </p>

                        <p className="
                          font-bold
                          text-slate-900
                        ">

                          {
                            formatDate(
                              order.createdAt
                            )
                          }

                        </p>

                      </div>

                      {
                        order.refundRequestedAt && (

                        <div
                          className="
                            bg-yellow-50
                            border
                            border-yellow-200
                            rounded-2xl
                            px-5
                            py-4
                          "
                        >

                          <p className="
                            text-yellow-700
                            text-sm
                            mb-2
                          ">

                            Refund Requested

                          </p>

                          <p className="
                            font-bold
                            text-yellow-700
                          ">

                            {
                              formatDate(
                                order.refundRequestedAt
                              )
                            }

                          </p>

                        </div>

                      )}

                      {
                        order.refundedAt && (

                        <div
                          className="
                            bg-green-50
                            border
                            border-green-200
                            rounded-2xl
                            px-5
                            py-4
                          "
                        >

                          <p className="
                            text-green-700
                            text-sm
                            mb-2
                          ">

                            Refunded On

                          </p>

                          <p className="
                            font-bold
                            text-green-700
                          ">

                            {
                              formatDate(
                                order.refundedAt
                              )
                            }

                          </p>

                        </div>

                      )}

                    </div>

                  </div>

                  <div className="
                    mt-8
                    space-y-5
                  ">

                    {order.orderItems.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          key={index}
                          className="
                            flex
                            items-center
                            gap-5
                            border
                            border-slate-200
                            rounded-3xl
                            p-5
                            bg-slate-50
                          "
                        >

                          <img
                            src={item.image}
                            alt={item.title}
                            className="
                              w-24
                              h-24
                              object-contain
                              bg-white
                              rounded-2xl
                              p-2
                            "
                          />

                          <div className="flex-1">

                            <h3 className="
                              text-xl
                              font-bold
                              text-slate-900
                            ">

                              {item.title}

                            </h3>

                            <div className="
                              flex
                              gap-5
                              mt-3
                              text-slate-500
                            ">

                              <p>
                                Qty:
                                {" "}
                                {item.quantity}
                              </p>

                              <p>
                                ₹{item.price}
                              </p>

                            </div>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                  <div className="
                    mt-8
                    pt-6
                    border-t
                    border-slate-200
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-5
                  ">

                    <div className="
                      text-slate-500
                      flex
                      items-center
                      gap-2
                    ">

                      <FaBoxOpen />

                      {
                        order.orderItems.length
                      }
                      {" "}
                      item(s) in this order

                    </div>

                    <div className="
                      flex
                      items-center
                      gap-4
                      flex-wrap
                    ">

                      {
                        order.status ===
                        "Processing" && (

                        <button
                          onClick={() =>
                            handleCancelOrder(
                              order._id
                            )
                          }
                          className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-6
                            py-3
                            rounded-2xl
                            font-semibold
                            transition-all
                            duration-300
                          "
                        >

                          Cancel Order

                        </button>

                      )}

                      <button
                        onClick={() =>
                          navigate(
                            `/order/${order._id}`
                          )
                        }
                        className="
                          bg-indigo-500
                          hover:bg-indigo-600
                          text-white
                          px-6
                          py-3
                          rounded-2xl
                          font-semibold
                          transition-all
                          duration-300
                        "
                      >

                        View Details

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

export default Orders;