import {
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  FaShoppingCart,
  FaTrash,
  FaMinus,
  FaPlus,
  FaShieldAlt,
  FaTruck,
  FaBolt,
  FaVideo,
  FaImage,
  FaArrowRight,
  FaBoxOpen,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../../services/CartService";

import {
  checkoutOrder,
} from "../../services/OrderService";

function Cart() {

  const [cart, setCart] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchCart();

  }, []);

  const handleRemove =
    async (productId) => {

      try {

        await removeFromCart(
          productId
        );

        toast.success(
          "Item removed"
        );

        fetchCart();

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Remove failed"

        );
      }
    };

  const handleQuantity =
    async (
      productId,
      action
    ) => {

      try {

        await updateCartQuantity(
          productId,
          action
        );

        fetchCart();

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Quantity update failed"

        );
      }
    };

  const handleCheckout =
    async () => {

      if (hasInvalidStock) {

        toast.error(
          "Please resolve inventory issues before checkout"
        );

        return;
      }

      try {

        const data =
          await checkoutOrder();

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

  const hasInvalidStock =
    cart?.items?.some(
      (item) =>

        item.quantity >
        item.product.stock ||

        item.product.stock === 0
    );

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
    subtotal > 5000
      ? 0
      : 99;

  const total =
    subtotal +
    gst +
    deliveryCharge;

  const totalItems =
    cart?.items?.reduce(
      (
        acc,
        item
      ) =>

        acc + item.quantity,

      0
    ) || 0;

  if (loading) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 flex items-center justify-center">

        <div className="text-slate-500 text-2xl font-semibold">

          Loading Cart...

        </div>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14">

          <div className="flex items-center gap-5">

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

              <FaShoppingCart
                className="
                  text-4xl
                  text-indigo-500
                "
              />

            </div>

            <div>

              <h1 className="text-5xl font-extrabold text-slate-900">

                Shopping Cart

              </h1>

              <p className="text-slate-500 mt-3 text-lg">

                Review your products before checkout

              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

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

              <p className="text-slate-400 text-sm">

                Items

              </p>

              <h2 className="text-3xl font-extrabold text-indigo-600 mt-1">

                {totalItems}

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

              <p className="text-slate-400 text-sm">

                Total

              </p>

              <h2 className="text-3xl font-extrabold text-indigo-600 mt-1">

                ₹{total.toFixed(0)}

              </h2>

            </div>

          </div>

        </div>

        {!cart ||
        cart.items.length ===
          0 ? (

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

            <h2 className="text-4xl font-extrabold text-slate-900">

              Your Cart Is Empty

            </h2>

            <p className="text-slate-500 text-lg mt-5">

              Add products to continue shopping.

            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 space-y-6">

              {cart.items.map(
                (item) => {

                  const previewVideo =
                    item.product
                      .videos?.[0];

                  return (

                    <div
                      key={
                        item.product
                          ._id
                      }
                      className="
                        bg-white
                        border
                        border-slate-200
                        rounded-3xl
                        p-5
                        flex
                        flex-col
                        md:flex-row
                        gap-6
                        shadow-sm
                        hover:shadow-2xl
                        hover:shadow-indigo-500/10
                        transition-all
                        duration-500
                      "
                    >

                      <div className="relative overflow-hidden rounded-2xl">

                        {item.product
                          .images?.[0] ? (

                          <img
                            src={
                              item.product
                                .images?.[0]
                            }
                            alt={
                              item.product
                                .title
                            }
                            className="
                              w-full
                              md:w-40
                              h-40
                              object-cover
                              hover:scale-110
                              transition-transform
                              duration-700
                              bg-white
                            "
                          />

                        ) : previewVideo ? (

                          <video
                            src={
                              previewVideo
                            }
                            className="
                              w-full
                              md:w-40
                              h-40
                              object-cover
                              bg-black
                            "
                          />

                        ) : (

                          <div
                            className="
                              w-full
                              md:w-40
                              h-40
                              bg-slate-100
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <FaBoxOpen
                              className="
                                text-5xl
                                text-slate-300
                              "
                            />

                          </div>

                        )}

                        <div className="absolute top-3 left-3 flex gap-2">

                          <span
                            className="
                              bg-black/70
                              text-white
                              px-2.5
                              py-1
                              rounded-lg
                              text-xs
                              font-semibold
                              backdrop-blur-md
                              flex
                              items-center
                              gap-1
                            "
                          >

                            <FaImage />

                            {
                              item.product
                                .images
                                ?.length || 0
                            }

                          </span>

                          {item.product
                            .videos
                            ?.length >
                            0 && (

                              <span
                                className="
                                  bg-indigo-500
                                  text-white
                                  px-2.5
                                  py-1
                                  rounded-lg
                                  text-xs
                                  font-semibold
                                  flex
                                  items-center
                                  gap-1
                                "
                              >

                                <FaVideo />

                                {
                                  item.product
                                    .videos
                                    ?.length
                                }

                              </span>

                            )}

                        </div>

                      </div>

                      <div className="flex-1">

                        <h2 className="text-2xl font-bold text-slate-900">

                          {
                            item.product
                              .title
                          }

                        </h2>

                        <p className="text-slate-500 mt-2">

                          {
                            item.product
                              .category
                          }

                        </p>

                        <div className="mt-5 flex items-center gap-5">

                          <div
                            className="
                              flex
                              items-center
                              gap-4
                              bg-slate-100
                              rounded-2xl
                              px-4
                              py-2
                            "
                          >

                            <button
                              onClick={() =>
                                handleQuantity(
                                  item.product
                                    ._id,
                                  "decrease"
                                )
                              }
                              className="
                                w-9
                                h-9
                                rounded-full
                                bg-white
                                hover:bg-indigo-100
                                flex
                                items-center
                                justify-center
                                transition-all
                                duration-300
                              "
                            >

                              <FaMinus />

                            </button>

                            <span className="text-xl font-bold">

                              {
                                item.quantity
                              }

                            </span>

                            <button
                              onClick={() =>
                                handleQuantity(
                                  item.product
                                    ._id,
                                  "increase"
                                )
                              }
                              disabled={
                                item.quantity >=
                                item.product
                                  .stock
                              }
                              className={`
                                w-9
                                h-9
                                rounded-full
                                flex
                                items-center
                                justify-center
                                transition-all
                                duration-300

                                ${
                                  item.quantity >=
                                  item.product
                                    .stock

                                    ? `
                                      bg-slate-200
                                      text-slate-400
                                      cursor-not-allowed
                                    `

                                    : `
                                      bg-white
                                      hover:bg-indigo-100
                                    `
                                }
                              `}
                            >

                              <FaPlus />

                            </button>

                          </div>

                          <div>

                            <p className="text-indigo-600 text-3xl font-extrabold">

                              ₹
                              {
                                item.product
                                  .price
                              }

                            </p>

                          </div>

                        </div>

                        <div className="mt-5">

                          {item.product
                            .stock ===
                          0 ? (

                            <div
                              className="
                                inline-flex
                                items-center
                                bg-red-100
                                text-red-600
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                                font-bold
                              "
                            >

                              Out Of Stock

                            </div>

                          ) : item.product
                              .stock <=
                            item.product
                              .lowStockThreshold ? (

                            <div
                              className="
                                inline-flex
                                items-center
                                bg-amber-100
                                text-amber-600
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                                font-bold
                              "
                            >

                              Only {
                                item.product
                                  .stock
                              } left

                            </div>

                          ) : (

                            <div
                              className="
                                inline-flex
                                items-center
                                bg-green-100
                                text-green-600
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                                font-bold
                              "
                            >

                              In Stock

                            </div>

                          )}

                        </div>

                        <button
                          onClick={() =>
                            handleRemove(
                              item.product
                                ._id
                            )
                          }
                          className="
                            mt-6
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-5
                            py-3
                            rounded-2xl
                            font-semibold
                            transition-all
                            duration-300
                            hover:scale-105
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <FaTrash />

                          Remove

                        </button>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-8
                h-fit
                shadow-sm
                hover:shadow-2xl
                transition-all
                duration-500
                lg:sticky
                lg:top-28
              "
            >

              <h2 className="text-3xl font-extrabold mb-8 text-slate-900">

                Order Summary

              </h2>

              <div className="grid grid-cols-3 gap-3 mb-8">

                <div
                  className="
                    bg-slate-50
                    rounded-2xl
                    p-4
                    text-center
                  "
                >

                  <FaTruck
                    className="
                      mx-auto
                      text-indigo-500
                      text-xl
                      mb-2
                    "
                  />

                  <p className="text-xs font-semibold">

                    Fast Delivery

                  </p>

                </div>

                <div
                  className="
                    bg-slate-50
                    rounded-2xl
                    p-4
                    text-center
                  "
                >

                  <FaShieldAlt
                    className="
                      mx-auto
                      text-indigo-500
                      text-xl
                      mb-2
                    "
                  />

                  <p className="text-xs font-semibold">

                    Secure

                  </p>

                </div>

                <div
                  className="
                    bg-slate-50
                    rounded-2xl
                    p-4
                    text-center
                  "
                >

                  <FaBolt
                    className="
                      mx-auto
                      text-indigo-500
                      text-xl
                      mb-2
                    "
                  />

                  <p className="text-xs font-semibold">

                    Instant

                  </p>

                </div>

              </div>

              <div className="space-y-5 text-lg text-slate-700">

                <div className="flex justify-between">

                  <span>
                    Subtotal
                  </span>

                  <span className="font-semibold">

                    ₹
                    {
                      subtotal.toFixed(
                        2
                      )
                    }

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    GST (5%)
                  </span>

                  <span className="font-semibold">

                    ₹
                    {
                      gst.toFixed(
                        2
                      )
                    }

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Delivery
                  </span>

                  <span className="font-semibold">

                    {
                      deliveryCharge ===
                      0

                        ? "FREE"

                        : `₹${deliveryCharge}`
                    }

                  </span>

                </div>

                <div className="border-t border-slate-200 pt-5 flex justify-between text-2xl font-bold">

                  <span>
                    Total
                  </span>

                  <span className="text-indigo-600">

                    ₹
                    {
                      total.toFixed(
                        2
                      )
                    }

                  </span>

                </div>

              </div>

              {hasInvalidStock && (

                <div
                  className="
                    mt-8
                    bg-red-100
                    border
                    border-red-200
                    text-red-600
                    px-5
                    py-4
                    rounded-2xl
                    font-semibold
                    text-center
                  "
                >

                  Some products exceed available inventory.
                  Please update cart quantities.

                </div>

              )}

              <button
                onClick={
                  handleCheckout
                }
                disabled={
                  hasInvalidStock
                }
                className={`
                  mt-10
                  w-full
                  py-4
                  rounded-2xl
                  text-xl
                  font-semibold
                  transition-all
                  duration-300
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  gap-3

                  ${
                    hasInvalidStock

                      ? `
                        bg-slate-300
                        text-slate-500
                        cursor-not-allowed
                      `

                      : `
                        bg-indigo-500
                        hover:bg-indigo-600
                        text-white
                        hover:scale-[1.02]
                        hover:shadow-indigo-500/30
                      `
                  }
                `}
              >

                {
                  hasInvalidStock

                    ? "Inventory Issue"

                    : "Proceed To Checkout"
                }

                {!hasInvalidStock && (

                  <FaArrowRight />

                )}

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;