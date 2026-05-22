import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import Navbar from "../../components/Navbar";

import {
  getAddresses,
} from "../../services/UserService";

import {
  checkoutOrder,
  placeOrder,
} from "../../services/OrderService";

import {
  getCart,
} from "../../services/CartService";

function Checkout() {

  const navigate =
    useNavigate();

  const [addresses,
    setAddresses] =
    useState([]);

  const [selectedAddress,
    setSelectedAddress] =
    useState(null);

  const [paymentMethod,
    setPaymentMethod] =
    useState("ONLINE");

  const [cart,
    setCart] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchAddresses();

    fetchCart();

  }, []);

  const fetchAddresses =
    async () => {

      try {

        const response =
          await getAddresses();

        setAddresses(
          response.addresses
        );

        const defaultAddress =
          response.addresses.find(
            (address) =>
              address.isDefault
          );

        if (defaultAddress) {

          setSelectedAddress(
            defaultAddress
          );
        }

      } catch (error) {

        toast.error(
          "Failed to load addresses"
        );

      } finally {

        setLoading(false);
      }
    };

  const fetchCart =
    async () => {

      try {

        const data =
          await getCart();

        setCart(data.cart);

      } catch (error) {

        toast.error(
          "Failed to load cart"
        );
      }
    };

  const subtotal =
    useMemo(() => {

      return (

        cart?.items?.reduce(
          (
            acc,
            item
          ) =>

            acc +
            item.product.price *
            item.quantity,

          0
        ) || 0

      );

    }, [cart]);

  const gst =
    subtotal * 0.05;

  const deliveryCharge =
    subtotal > 0 &&
    subtotal < 2000
      ? 99
      : 0;

  const total =
    subtotal +
    gst +
    deliveryCharge;

  const handlePlaceOrder =
    async () => {

      if (!selectedAddress) {

        toast.error(
          "Please add/select address"
        );

        return;
      }

      try {

        if (
          paymentMethod === "COD"
        ) {

          await placeOrder({

            addressId:
              selectedAddress._id,

            paymentMethod:
              "COD",
          });

          toast.success(
            "Order placed successfully"
          );

          navigate(
            "/my-orders"
          );

          return;
        }

        const data =
          await checkoutOrder({

            addressId:
              selectedAddress._id,

            paymentMethod:
              "ONLINE",
          });

        window.location.href =
          data.url;

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Checkout failed"
        );
      }
    };

  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">

        <div className="
          text-2xl
          font-bold
          text-slate-500
        ">

          Loading Checkout...

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

            <h1 className="
              text-5xl
              font-extrabold
              text-slate-900
            ">
              Checkout
            </h1>

            <p className="
              text-slate-500
              mt-3
              text-lg
            ">

              Complete your order securely

            </p>

          </div>

          <div className="
            bg-indigo-100
            text-indigo-600
            px-6
            py-4
            rounded-2xl
            font-bold
            text-lg
          ">

            {
              cart?.items?.length || 0
            }
            {" "}
            item(s)

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
              rounded-3xl
              p-8
              border
              border-slate-200
              shadow-sm
            ">

              <div className="
                flex
                items-center
                justify-between
                gap-4
                mb-6
              ">

                <h2 className="
                  text-3xl
                  font-bold
                  text-slate-900
                ">
                  Select Address
                </h2>

                <button
                  onClick={() =>
                    navigate(
                      "/profile"
                    )
                  }
                  className="
                    bg-indigo-500
                    hover:bg-indigo-600
                    text-white
                    px-5
                    py-3
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300
                  "
                >

                  Manage Addresses

                </button>

              </div>

              {addresses.length === 0 ? (

                <div className="
                  border-2
                  border-dashed
                  border-slate-300
                  rounded-3xl
                  p-12
                  text-center
                  bg-slate-50
                ">

                  <h3 className="
                    text-2xl
                    font-bold
                    text-slate-900
                  ">

                    No Saved Addresses

                  </h3>

                  <p className="
                    text-slate-500
                    mt-4
                    text-lg
                  ">

                    Please add an address
                    before placing your order.

                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        "/profile"
                      )
                    }
                    className="
                      mt-8
                      bg-indigo-500
                      hover:bg-indigo-600
                      text-white
                      px-8
                      py-4
                      rounded-2xl
                      font-bold
                      transition-all
                      duration-300
                    "
                  >

                    Add Address

                  </button>

                </div>

              ) : (

                <div className="
                  grid
                  gap-5
                ">

                  {addresses.map(
                    (address) => (

                    <div
                      key={address._id}

                      onClick={() => {

                        setSelectedAddress(
                          address
                        );
                      }}

                      className={`
                        border
                        rounded-3xl
                        p-6
                        cursor-pointer
                        transition-all
                        duration-300

                        ${
                          selectedAddress?._id ===
                          address._id

                            ? `
                              border-indigo-500
                              bg-indigo-50
                              shadow-lg
                              shadow-indigo-500/10
                            `

                            : `
                              border-slate-200
                              bg-white
                              hover:border-indigo-300
                            `
                        }
                      `}
                    >

                      <div className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      ">

                        <h3 className="
                          text-2xl
                          font-bold
                          text-slate-900
                        ">

                          {address.label}

                        </h3>

                        {selectedAddress?._id ===
                          address._id && (

                          <div className="
                            bg-indigo-500
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                            font-bold
                          ">

                            Selected

                          </div>

                        )}

                      </div>

                      <div className="
                        mt-5
                        text-slate-700
                        space-y-2
                        text-lg
                      ">

                        <p className="
                          font-bold
                        ">
                          {address.fullName}
                        </p>

                        <p>
                          {address.phone}
                        </p>

                        <p>
                          {address.address}
                        </p>

                        <p>
                          {address.city},
                          {" "}
                          {address.state}
                          {" "}
                          -
                          {" "}
                          {address.pincode}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              )}

            </div>

            <div className="
              bg-white
              rounded-3xl
              p-8
              border
              border-slate-200
              shadow-sm
            ">

              <h2 className="
                text-3xl
                font-bold
                text-slate-900
                mb-8
              ">
                Payment Method
              </h2>

              <div className="
                flex
                flex-col
                gap-5
              ">

                <label
                  className={`
                    border
                    rounded-3xl
                    p-6
                    cursor-pointer
                    transition-all
                    duration-300

                    ${
                      paymentMethod ===
                      "COD"

                        ? `
                          border-amber-500
                          bg-amber-50
                        `

                        : `
                          border-slate-200
                          bg-white
                        `
                    }
                  `}
                >

                  <div className="
                    flex
                    items-center
                    gap-5
                  ">

                    <input
                      type="radio"

                      value="COD"

                      checked={
                        paymentMethod ===
                        "COD"
                      }

                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                    />

                    <div>

                      <h3 className="
                        text-xl
                        font-bold
                        text-slate-900
                      ">

                        Cash On Delivery

                      </h3>

                      <p className="
                        text-slate-500
                        mt-1
                      ">

                        Pay after product delivery

                      </p>

                    </div>

                  </div>

                </label>

                <label
                  className={`
                    border
                    rounded-3xl
                    p-6
                    cursor-pointer
                    transition-all
                    duration-300

                    ${
                      paymentMethod ===
                      "ONLINE"

                        ? `
                          border-green-500
                          bg-green-50
                        `

                        : `
                          border-slate-200
                          bg-white
                        `
                    }
                  `}
                >

                  <div className="
                    flex
                    items-center
                    gap-5
                  ">

                    <input
                      type="radio"

                      value="ONLINE"

                      checked={
                        paymentMethod ===
                        "ONLINE"
                      }

                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                    />

                    <div>

                      <h3 className="
                        text-xl
                        font-bold
                        text-slate-900
                      ">

                        Online Payment

                      </h3>

                      <p className="
                        text-slate-500
                        mt-1
                      ">

                        Secure Stripe payment gateway

                      </p>

                    </div>

                  </div>

                </label>

              </div>

            </div>

          </div>

          <div className="
            bg-white
            rounded-3xl
            p-8
            border
            border-slate-200
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

                <span className="
                  text-slate-600
                ">
                  Subtotal
                </span>

                <span className="
                  font-semibold
                  text-slate-900
                ">
                  ₹
                  {
                    subtotal.toFixed(
                      2
                    )
                  }
                </span>

              </div>

              <div className="
                flex
                justify-between
              ">

                <span className="
                  text-slate-600
                ">
                  GST (5%)
                </span>

                <span className="
                  font-semibold
                  text-slate-900
                ">
                  ₹
                  {
                    gst.toFixed(
                      2
                    )
                  }
                </span>

              </div>

              <div className="
                flex
                justify-between
              ">

                <span className="
                  text-slate-600
                ">
                  Delivery
                </span>

                <span className="
                  font-semibold
                  text-slate-900
                ">

                  {
                    deliveryCharge ===
                    0

                      ? "FREE"

                      : `₹${deliveryCharge}`
                  }

                </span>

              </div>

              {subtotal >= 2000 && (

                <div className="
                  bg-green-50
                  border
                  border-green-200
                  text-green-700
                  p-4
                  rounded-2xl
                  text-sm
                  font-semibold
                ">

                  You unlocked FREE delivery!

                </div>

              )}

              <div className="
                border-t
                border-slate-200
                pt-5
                flex
                justify-between
                text-2xl
                font-bold
              ">

                <span className="
                  text-slate-900
                ">
                  Total
                </span>

                <span className="
                  text-indigo-600
                ">
                  ₹
                  {
                    total.toFixed(
                      2
                    )
                  }
                </span>

              </div>

            </div>

            <button
              onClick={
                handlePlaceOrder
              }

              disabled={
                addresses.length === 0
              }

              className={`
                mt-10
                w-full
                py-4
                rounded-2xl
                text-xl
                font-bold
                transition-all
                duration-300

                ${
                  addresses.length === 0

                    ? `
                      bg-slate-300
                      text-slate-500
                      cursor-not-allowed
                    `

                    : `
                      bg-indigo-500
                      hover:bg-indigo-600
                      text-white
                    `
                }
              `}
            >

              {
                paymentMethod ===
                "COD"

                  ? "Place Order"

                  : "Proceed To Payment"
              }

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;