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

  const [phone,
    setPhone] =
    useState("");

  const [paymentMethod,
    setPaymentMethod] =
    useState("ONLINE");

  const [cart,
    setCart] =
    useState(null);

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

          setPhone(
            defaultAddress.phone
          );
        }

      } catch (error) {

        toast.error(
          "Failed to load addresses"
        );
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
          "Please select address"
        );

        return;
      }

      if (!phone.trim()) {

        toast.error(
          "Phone number required"
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

            phone,

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

            phone,

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

        <h1 className="
          text-5xl
          font-extrabold
          text-slate-900
          mb-10
        ">
          Checkout
        </h1>

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

              <h2 className="
                text-3xl
                font-bold
                mb-6
              ">
                Select Address
              </h2>

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

                      setPhone(
                        address.phone
                      );
                    }}

                    className={`
                      border
                      rounded-3xl
                      p-5
                      cursor-pointer
                      transition-all
                      duration-300

                      ${
                        selectedAddress?._id ===
                        address._id

                          ? `
                            border-indigo-500
                            bg-indigo-50
                          `

                          : `
                            border-slate-200
                            bg-white
                          `
                      }
                    `}
                  >

                    <h3 className="
                      text-xl
                      font-bold
                    ">
                      {address.label}
                    </h3>

                    <p className="
                      mt-3
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
                ))}

              </div>

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
                mb-6
              ">
                Contact Number
              </h2>

              <input
                type="text"

                value={phone}

                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }

                placeholder="
                  Enter phone number
                "

                className="
                  w-full
                  border
                  border-slate-300
                  px-5
                  py-4
                  rounded-2xl
                  outline-none
                  focus:border-indigo-500
                "
              />

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
                mb-6
              ">
                Payment Method
              </h2>

              <div className="
                flex
                flex-col
                gap-5
              ">

                <label className="
                  flex
                  items-center
                  gap-4
                  text-lg
                  font-semibold
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

                  Cash On Delivery

                </label>

                <label className="
                  flex
                  items-center
                  gap-4
                  text-lg
                  font-semibold
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

                  Online Payment

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
                  Subtotal
                </span>

                <span>
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

                <span>
                  GST
                </span>

                <span>
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

                <span>
                  Delivery
                </span>

                <span>

                  {
                    deliveryCharge ===
                    0

                      ? "FREE"

                      : `₹${deliveryCharge}`
                  }

                </span>

              </div>

              <div className="
                border-t
                pt-5
                flex
                justify-between
                text-2xl
                font-bold
              ">

                <span>
                  Total
                </span>

                <span>
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
              className="
                mt-10
                w-full
                bg-indigo-500
                hover:bg-indigo-600
                text-white
                py-4
                rounded-2xl
                text-xl
                font-bold
                transition-all
                duration-300
              "
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