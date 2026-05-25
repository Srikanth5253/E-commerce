import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import toast
    from "react-hot-toast";

import {
    FaArrowLeft,
    FaCheckCircle,
    FaClock,
    FaTruck,
    FaTimesCircle,
} from "react-icons/fa";

import Navbar
    from "../../components/Navbar";

import {
    getOrderById,
    cancelOrder,
} from "../../services/OrderService";

function OrderDetails() {

    const navigate =
        useNavigate();

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

    const handleCancelOrder =
        async (id) => {

            toast((t) => (
                <div className="flex flex-col gap-4">
                    <p className="font-semibold">
                        Cancel this order?
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={async () => {
                                toast.dismiss(t.id);

                                try {

                                    const data =
                                        await cancelOrder(id);

                                    toast.success(
                                        data.message
                                    );

                                    fetchOrder();

                                } catch (error) {

                                    toast.error(

                                        error.response?.data
                                            ?.message ||

                                        "Failed to cancel order"
                                    );
                                }
                            }}
                            className="
          bg-red-500
          text-white
          px-4
          py-2
          rounded-xl
        "
                        >
                            Yes
                        </button>

                        <button
                            onClick={() =>
                                toast.dismiss(t.id)
                            }
                            className="
          bg-slate-200
          px-4
          py-2
          rounded-xl
        "
                        >
                            No
                        </button>
                    </div>
                </div>
            ));

            try {

                const data =
                    await cancelOrder(id);

                toast.success(
                    data.message
                );

                fetchOrder();

            } catch (error) {

                toast.error(

                    error.response?.data
                        ?.message ||

                    "Failed to cancel order"
                );
            }
        };

    const steps = [
        "Processing",
        "Shipped",
        "Delivered",
    ];

    const currentStep =
        steps.indexOf(
            order?.status
        );

    const getStepColor =
        (index) => {

            return index <=
                currentStep

                ? `
            bg-indigo-500
          `

                : `
            bg-slate-300
          `;
        };

    const getExpectedDelivery =
        () => {

            const orderDate =
                new Date(
                    order.createdAt
                );

            const startDate =
                new Date(orderDate);

            startDate.setDate(
                startDate.getDate() + 3
            );

            const endDate =
                new Date(orderDate);

            endDate.setDate(
                endDate.getDate() + 5
            );

            const options = {
                month: "short",
                day: "numeric",
            };

            return `
      ${startDate.toLocaleDateString(
                "en-IN",
                options
            )}
      -
      ${endDate.toLocaleDateString(
                "en-IN",
                options
            )}
    `;
        };

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
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-6
          mb-10
        ">

                    <div>

                        <button
                            onClick={() =>
                                navigate(
                                    "/my-orders"
                                )
                            }
                            className="
                flex
                items-center
                gap-3
                text-indigo-600
                font-semibold
                mb-6
                hover:text-indigo-700
              "
                        >

                            <FaArrowLeft />

                            Back To Orders

                        </button>

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
            gap-4
          ">

                        <div
                            className={`
                px-6
                py-3
                rounded-2xl
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

                                        : order.status ===
                                            "Cancelled"

                                            ? `
                            bg-red-100
                            text-red-600
                          `

                                            : `
                            bg-yellow-100
                            text-yellow-600
                          `
                                }
              `}
                        >

                            {order.status}

                        </div>

                        <div
                            className={`
                px-6
                py-3
                rounded-2xl
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
                  font-bold
                  transition-all
                  duration-300
                "
                                >

                                    Cancel Order

                                </button>

                            )}

                    </div>

                </div>

                {
                    order.status !==
                    "Cancelled" && (

                        <div className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-8
            shadow-sm
            mb-10
          ">

                            <div className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-5
              mb-10
            ">

                                <h2 className="
                text-3xl
                font-bold
                text-slate-900
              ">

                                    Delivery Timeline

                                </h2>

                                <div className="
                bg-indigo-50
                text-indigo-600
                border
                border-indigo-200
                px-5
                py-3
                rounded-2xl
                font-semibold
              ">

                                    {
                                        order.status ===
                                            "Delivered"

                                            ? "Delivered Successfully"

                                            : order.status ===
                                                "Shipped"

                                                ? "Arriving Soon"

                                                : `Expected Delivery: ${getExpectedDelivery()}`
                                    }

                                </div>

                            </div>

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
                          ${getStepColor(
                                                        index
                                                    )}
                        `}
                                                >

                                                    {
                                                        index === 0

                                                            ? <FaClock />

                                                            : index === 1

                                                                ? <FaTruck />

                                                                : <FaCheckCircle />
                                                    }

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

                    )}

                {
                    order.status ===
                    "Cancelled" && (

                        <div className="
            bg-red-50
            border
            border-red-200
            rounded-3xl
            p-8
            mb-10
            flex
            items-center
            gap-5
          ">

                            <FaTimesCircle
                                className="
                text-red-500
                text-5xl
              "
                            />

                            <div>

                                <h2 className="
                text-3xl
                font-bold
                text-red-600
              ">

                                    Order Cancelled

                                </h2>

                                <p className="
                text-red-500
                mt-2
              ">

                                    {
                                        order.isPaid

                                            ? `
        Order cancelled successfully.
        Refund will be processed soon.
      `

                                            : `
        Order cancelled successfully.
      `
                                    }

                                </p>

                            </div>

                        </div>

                    )}

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

                            {order.refundStatus &&
                                order.refundStatus !==
                                "Not Applicable" && (

                                    <div>

                                        <p className="
      text-slate-500
      mb-2
    ">

                                            Refund Status

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

        ${order.refundStatus ===
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

                                            {
                                                order.refundStatus
                                            }

                                        </div>

                                    </div>

                                )}

                            {order.refundRequestedAt && (

                                <div>

                                    <p className="
      text-slate-500
      mb-2
    ">

                                        Refund Requested

                                    </p>

                                    <p className="
      font-bold
      text-yellow-700
    ">

                                        {
                                            new Date(
                                                order.refundRequestedAt
                                            ).toLocaleString()
                                        }

                                    </p>

                                </div>

                            )}

                            {order.refundedAt && (

                                <div>

                                    <p className="
      text-slate-500
      mb-2
    ">

                                        Refunded On

                                    </p>

                                    <p className="
      font-bold
      text-green-700
    ">

                                        {
                                            new Date(
                                                order.refundedAt
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