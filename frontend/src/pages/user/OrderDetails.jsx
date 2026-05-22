import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import toast
    from "react-hot-toast";

import Navbar
    from "../../components/Navbar";

import {
    getOrderById,
} from "../../services/OrderService";

function OrderDetails() {

    const {
        id,
    } = useParams();

    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const fetchOrder =
        async () => {

            try {

                const data =
                    await getOrderById(id);

                setOrder(
                    data.order
                );

            } catch (error) {

                toast.error(

                    error.response?.data
                        ?.message ||

                    "Failed to load order"
                );

            } finally {

                setLoading(false);

            }
        };

    useEffect(() => {

        fetchOrder();

    }, [id]);

    const steps = [
        "Processing",
        "Shipped",
        "Delivered",
    ];

    const currentStep =
        steps.indexOf(
            order?.status
        );

    if (loading) {

        return (

            <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-b
        from-white
        via-slate-50
        to-slate-100
      ">

                <div className="
          text-slate-500
          text-2xl
          font-semibold
        ">

                    Loading Order...

                </div>

            </div>
        );
    }

    if (!order) {

        return (

            <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">

                Order not found

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

                    <div>

                        <h1 className="
              text-5xl
              font-extrabold
              text-slate-900
            ">

                            Order Details

                        </h1>

                        <p className="
              text-slate-500
              mt-4
              break-all
            ">

                            Order ID:
                            {" "}
                            {order._id}

                        </p>

                    </div>

                    <div className="
            flex
            flex-wrap
            gap-5
          ">

                        <div
                            className={`
                px-6
                py-4
                rounded-3xl
                font-bold
                text-lg

                ${order.status ===
                                    "Delivered"

                                    ? `
                      bg-green-100
                      text-green-600
                    `

                                    : order.status ===
                                        "Shipped"

                                        ? `
                        bg-blue-100
                        text-blue-600
                      `

                                        : `
                        bg-amber-100
                        text-amber-600
                      `
                                }
              `}
                        >

                            {order.status}

                        </div>

                        <div
                            className={`
                px-6
                py-4
                rounded-3xl
                font-bold
                text-lg

                ${order.isPaid

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

                                    ? "Paid"

                                    : "Pending"
                            }

                        </div>

                    </div>

                </div>

                <div className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-8
          shadow-sm
          mb-10
        ">

                    <h2 className="
            text-3xl
            font-bold
            text-slate-900
            mb-10
          ">

                        Delivery Timeline

                    </h2>

                    <div className="
            flex
            items-center
            justify-between
            gap-4
          ">

                        {steps.map(
                            (
                                step,
                                index
                            ) => (

                                <div
                                    key={step}
                                    className="
                    flex-1
                    flex
                    items-center
                  "
                                >

                                    <div className="
                    flex
                    flex-col
                    items-center
                    flex-1
                  ">

                                        <div
                                            className={`
                        w-16
                        h-16
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-white
                        text-xl
                        font-bold

                        ${index <=
                                                    currentStep

                                                    ? `
                              bg-indigo-500
                            `

                                                    : `
                              bg-slate-300
                            `
                                                }
                      `}
                                        >

                                            {index + 1}

                                        </div>

                                        <p className="
                      mt-4
                      font-bold
                      text-slate-700
                    ">

                                            {step}

                                        </p>

                                    </div>

                                    {index <
                                        steps.length - 1 && (

                                            <div
                                                className={`
                        h-1
                        flex-1
                        rounded-full

                        ${index <
                                                        currentStep

                                                        ? `
                              bg-indigo-500
                            `

                                                        : `
                              bg-slate-300
                            `
                                                    }
                      `}
                                            />

                                        )}

                                </div>

                            )
                        )}

                    </div>

                </div>

                <div className="
          grid
          lg:grid-cols-3
          gap-10
        ">

                    <div className="
            lg:col-span-2
            space-y-8
          ">

                        <div className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-8
              shadow-sm
            ">

                            <h2 className="
                text-3xl
                font-bold
                text-slate-900
                mb-6
              ">

                                Shipping Address

                            </h2>

                            <div className="
                text-slate-700
                space-y-3
                text-lg
              ">

                                <p className="
                  font-bold
                  text-2xl
                ">

                                    {
                                        order.shippingAddress
                                            ?.fullName
                                    }

                                </p>

                                <p>

                                    {
                                        order.shippingAddress
                                            ?.phone
                                    }

                                </p>

                                <p>

                                    {
                                        order.shippingAddress
                                            ?.address
                                    }

                                </p>

                                <p>

                                    {
                                        order.shippingAddress
                                            ?.city
                                    },
                                    {" "}
                                    {
                                        order.shippingAddress
                                            ?.state
                                    }
                                    {" "}
                                    -
                                    {" "}
                                    {
                                        order.shippingAddress
                                            ?.pincode
                                    }

                                </p>

                            </div>

                        </div>

                        <div className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-8
              shadow-sm
            ">

                            <h2 className="
                text-3xl
                font-bold
                text-slate-900
                mb-6
              ">

                                Payment Details

                            </h2>

                            <div className="
                grid
                md:grid-cols-2
                gap-6
              ">

                                <div>

                                    <p className="
                    text-slate-500
                    mb-2
                  ">

                                        Payment Method

                                    </p>

                                    <div
                                        className={`
                      inline-flex
                      items-center
                      gap-3
                      px-5
                      py-3
                      rounded-2xl
                      font-bold
                      text-lg

                      ${order.paymentMethod ===
                                                "COD"

                                                ? `
                            bg-amber-100
                            text-amber-700
                          `

                                                : `
                            bg-green-100
                            text-green-700
                          `
                                            }
                    `}
                                    >

                                        {
                                            order.paymentMethod ===
                                                "COD"

                                                ? "Cash On Delivery"

                                                : "Online Payment"
                                        }

                                    </div>

                                </div>

                                <div>

                                    <p className="
                    text-slate-500
                    mb-2
                  ">

                                        Payment Status

                                    </p>

                                    <div
                                        className={`
                      inline-flex
                      items-center
                      gap-3
                      px-5
                      py-3
                      rounded-2xl
                      font-bold
                      text-lg

                      ${order.isPaid

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

                                </div>

                            </div>

                        </div>

                        <div className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-8
              shadow-sm
            ">

                            <h2 className="
                text-3xl
                font-bold
                text-slate-900
                mb-8
              ">

                                Ordered Products

                            </h2>

                            <div className="
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
                        flex-col
                        md:flex-row
                        md:items-center
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
                          w-28
                          h-28
                          object-cover
                          rounded-2xl
                          bg-white
                        "
                                            />

                                            <div className="flex-1">

                                                <h3 className="
                          text-2xl
                          font-bold
                          text-slate-900
                        ">

                                                    {item.title}

                                                </h3>

                                                <div className="
                          flex
                          flex-wrap
                          gap-6
                          mt-4
                          text-slate-500
                        ">

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

                                            <div className="text-right">

                                                <p className="
                          text-slate-500
                          mb-2
                        ">

                                                    Total

                                                </p>

                                                <h3 className="
                          text-3xl
                          font-extrabold
                          text-indigo-600
                        ">

                                                    ₹
                                                    {
                                                        (
                                                            item.price *
                                                            item.quantity
                                                        ).toFixed(2)
                                                    }

                                                </h3>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                    <div className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-8
            shadow-sm
            h-fit
            sticky
            top-28
          ">

                        <h2 className="
              text-3xl
              font-bold
              text-slate-900
              mb-8
            ">

                            Order Summary

                        </h2>

                        <div className="
              space-y-5
              text-lg
            ">

                            <div className="
                flex
                justify-between
              ">

                                <span>
                                    Items Price
                                </span>

                                <span>
                                    ₹
                                    {
                                        order.itemsPrice?.toFixed(
                                            2
                                        )
                                    }
                                </span>

                            </div>

                            <div className="
                flex
                justify-between
              ">

                                <span>
                                    GST
                                </span>

                                <span>
                                    ₹
                                    {
                                        order.gstPrice?.toFixed(
                                            2
                                        )
                                    }
                                </span>

                            </div>

                            <div className="
                flex
                justify-between
              ">

                                <span>
                                    Delivery
                                </span>

                                <span>

                                    {
                                        order.deliveryPrice ===
                                            0

                                            ? "FREE"

                                            : `₹${order.deliveryPrice}`
                                    }

                                </span>

                            </div>

                            <div className="
                border-t
                border-slate-200
                pt-5
                flex
                justify-between
                text-2xl
                font-bold
              ">

                                <span>
                                    Total
                                </span>

                                <span className="
                  text-indigo-600
                ">

                                    ₹
                                    {
                                        order.totalPrice?.toFixed(
                                            2
                                        )
                                    }

                                </span>

                            </div>

                        </div>

                        <div className="
              mt-10
              pt-8
              border-t
              border-slate-200
              space-y-6
            ">

                            <div>

                                <p className="
                  text-slate-500
                  mb-2
                ">

                                    Ordered On

                                </p>

                                <p className="
                  font-bold
                  text-slate-900
                ">

                                    {
                                        new Date(
                                            order.createdAt
                                        ).toLocaleString()
                                    }

                                </p>

                            </div>

                            {order.paidAt && (

                                <div>

                                    <p className="
                    text-slate-500
                    mb-2
                  ">

                                        Paid On

                                    </p>

                                    <p className="
                    font-bold
                    text-green-600
                  ">

                                        {
                                            new Date(
                                                order.paidAt
                                            ).toLocaleString()
                                        }

                                    </p>

                                </div>

                            )}

                            {order.deliveredAt && (

                                <div>

                                    <p className="
                    text-slate-500
                    mb-2
                  ">

                                        Delivered On

                                    </p>

                                    <p className="
                    font-bold
                    text-indigo-600
                  ">

                                        {
                                            new Date(
                                                order.deliveredAt
                                            ).toLocaleString()
                                        }

                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OrderDetails;