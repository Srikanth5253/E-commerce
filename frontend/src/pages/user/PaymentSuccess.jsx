import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaCheck,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

import API
  from "../../services/axios";

function PaymentSuccess() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [orderCreated, setOrderCreated] =
    useState(false);

  useEffect(() => {

    const createOrder =
      async () => {

        try {

          const response =
            await API.post(
              "/api/orders/payment-success"
            );

          console.log(response);

          setOrderCreated(true);

          toast.success(
            "Order placed successfully"
          );

          setTimeout(() => {

            navigate(
              "/my-orders"
            );

          }, 3500);

        } catch (error) {

          console.log(error);

          toast.error(

            error.response?.data
              ?.message ||

            "Order creation failed"

          );

          setTimeout(() => {

            navigate("/cart");

          }, 3000);

        } finally {

          setLoading(false);

        }
      };

    createOrder();

  }, []);

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-b
        from-white
        via-slate-50
        to-slate-100
        px-4
      "
    >

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-[32px]
          p-12
          text-center
          max-w-2xl
          w-full
          shadow-2xl
          hover:shadow-green-100
          transition-all
          duration-500
        "
      >

        <div
          className="
            w-28
            h-28
            mx-auto
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
            mb-8
            shadow-lg
          "
        >

          <FaCheck
            className="
              text-5xl
              text-green-500
            "
          />

        </div>

        <h1 className="text-5xl font-extrabold text-green-500 leading-tight">

          Payment Successful

        </h1>

        <p className="text-slate-500 mt-6 text-xl leading-8">

          Your payment has been processed successfully
          and your order is now being prepared.

        </p>

        <div className="grid sm:grid-cols-3 gap-5 mt-10">

          <div
            className="
              bg-slate-50
              border
              border-slate-200
              rounded-3xl
              p-5
            "
          >

            <div
              className="
                w-14
                h-14
                mx-auto
                rounded-2xl
                bg-indigo-100
                flex
                items-center
                justify-center
                mb-4
              "
            >

              <FaBoxOpen
                className="
                  text-2xl
                  text-indigo-500
                "
              />

            </div>

            <h3 className="font-bold text-slate-900">

              Order Created

            </h3>

            <p className="text-slate-500 text-sm mt-2">

              Your order has been generated successfully.

            </p>

          </div>

          <div
            className="
              bg-slate-50
              border
              border-slate-200
              rounded-3xl
              p-5
            "
          >

            <div
              className="
                w-14
                h-14
                mx-auto
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
                mb-4
              "
            >

              <FaCheckCircle
                className="
                  text-2xl
                  text-green-500
                "
              />

            </div>

            <h3 className="font-bold text-slate-900">

              Payment Verified

            </h3>

            <p className="text-slate-500 text-sm mt-2">

              Payment completed securely via Stripe.

            </p>

          </div>

          <div
            className="
              bg-slate-50
              border
              border-slate-200
              rounded-3xl
              p-5
            "
          >

            <div
              className="
                w-14
                h-14
                mx-auto
                rounded-2xl
                bg-amber-100
                flex
                items-center
                justify-center
                mb-4
              "
            >

              <FaTruck
                className="
                  text-2xl
                  text-amber-500
                "
              />

            </div>

            <h3 className="font-bold text-slate-900">

              Preparing Shipment

            </h3>

            <p className="text-slate-500 text-sm mt-2">

              Your items are being prepared for dispatch.

            </p>

          </div>

        </div>

        <div
          className="
            mt-10
            bg-green-50
            border
            border-green-200
            rounded-3xl
            p-6
          "
        >

          <p className="text-green-700 font-semibold text-lg leading-8">

            Inventory has been reserved and your products
            are now secured for delivery.

          </p>

        </div>

        {loading ? (

          <div className="mt-10 flex flex-col items-center">

            <div
              className="
                w-12
                h-12
                border-4
                border-indigo-200
                border-t-indigo-500
                rounded-full
                animate-spin
              "
            ></div>

            <p className="text-slate-400 mt-5 text-lg">

              Finalizing your order...

            </p>

          </div>

        ) : (

          <div className="mt-10">

            {orderCreated ? (

              <p className="text-slate-500 text-lg">

                Redirecting to your orders...

              </p>

            ) : (

              <p className="text-red-500 text-lg font-semibold">

                Redirecting back to cart...

              </p>

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default PaymentSuccess;