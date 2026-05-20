import {
  useNavigate,
} from "react-router-dom";

import {
  FaTimes,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";

function PaymentCancel() {

  const navigate =
    useNavigate();

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
          max-w-xl
          w-full
          shadow-2xl
          hover:shadow-red-100
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
            bg-red-100
            flex
            items-center
            justify-center
            mb-8
            shadow-lg
          "
        >

          <FaTimes
            className="
              text-5xl
              text-red-500
            "
          />

        </div>

        <h1 className="text-5xl font-extrabold text-red-500 leading-tight">

          Payment Cancelled

        </h1>

        <p className="text-slate-500 mt-6 text-xl leading-8">

          Your payment was not completed.
          Don’t worry — your cart items are still exist

        </p>

        <div
          className="
            mt-8
            bg-amber-50
            border
            border-amber-200
            rounded-2xl
            p-5
          "
        >

          <p className="text-amber-700 font-semibold leading-7">

            Inventory availability may change while items remain in your cart.
            Complete checkout soon to secure your products.

          </p>

        </div>

        <div className="flex flex-col sm:flex-row gap-5 mt-10">

          <button
            onClick={() =>
              navigate("/cart")
            }
            className="
              flex-1
              bg-indigo-500
              hover:bg-indigo-600
              text-white
              px-8
              py-4
              rounded-2xl
              text-lg
              font-semibold
              transition-all
              duration-300
              hover:scale-105
              shadow-lg
              hover:shadow-indigo-500/30
              flex
              items-center
              justify-center
              gap-3
            "
          >

            <FaShoppingCart />

            Return To Cart

          </button>

          <button
            onClick={() =>
              navigate("/products")
            }
            className="
              flex-1
              bg-white
              border
              border-slate-300
              hover:border-slate-400
              text-slate-700
              px-8
              py-4
              rounded-2xl
              text-lg
              font-semibold
              transition-all
              duration-300
              hover:scale-105
              shadow-sm
              flex
              items-center
              justify-center
              gap-3
            "
          >

            <FaArrowLeft />

            Continue Shopping

          </button>

        </div>

      </div>

    </div>
  );
}

export default PaymentCancel;