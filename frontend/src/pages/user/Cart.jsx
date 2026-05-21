import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

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
        cart?.items?.reduce(
            (
                acc,
                item
            ) =>
                acc +
                item.product.price *
                item.quantity,
            0
        ) || 0;

    const gst =
        subtotal * 0.05;

    const total =
        subtotal + gst;

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

                <h1 className="text-5xl font-extrabold mb-10 text-slate-900">

                    Shopping Cart

                </h1>

                {!cart ||
                    cart.items.length ===
                    0 ? (

                    <div className="text-slate-500 text-xl">

                        Cart is empty

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-3 gap-10">

                        <div className="lg:col-span-2 space-y-6">

                            {cart.items.map(
                                (item) => (

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
                      gap-5
                      shadow-sm
                      hover:shadow-2xl
                      transition-all
                      duration-500
                    "
                                    >

                                        <div className="overflow-hidden rounded-2xl">

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
                        w-36
                        h-36
                        object-cover
                        hover:scale-110
                        transition-transform
                        duration-700
                      "
                                            />

                                        </div>

                                        <div className="flex-1">

                                            <h2 className="text-2xl font-bold text-slate-900">

                                                {
                                                    item.product
                                                        .title
                                                }

                                            </h2>

                                            <div
                                                className="
                          flex
                          items-center
                          gap-4
                          mt-5
                        "
                                            >

                                                <button
                                                    onClick={() =>
                                                        handleQuantity(
                                                            item.product._id,
                                                            "decrease"
                                                        )
                                                    }
                                                    className="
                            w-10
                            h-10
                            rounded-full
                            bg-slate-100
                            hover:bg-indigo-100
                            text-xl
                            font-bold
                            transition-all
                            duration-300
                          "
                                                >
                                                    -
                                                </button>

                                                <span className="text-xl font-bold text-slate-900">

                                                    {
                                                        item.quantity
                                                    }

                                                </span>

                                                <button
                                                    onClick={() =>
                                                        handleQuantity(
                                                            item.product._id,
                                                            "increase"
                                                        )
                                                    }

                                                    disabled={
                                                        item.quantity >=
                                                        item.product.stock
                                                    }

                                                    className={`
                            w-10
                            h-10
                            rounded-full
                            text-xl
                            font-bold
                            transition-all
                            duration-300

                            ${item.quantity >=
                                                            item.product.stock

                                                            ? `
                                    bg-slate-200
                                    text-slate-400
                                    cursor-not-allowed
                                  `

                                                            : `
                                    bg-slate-100
                                    hover:bg-indigo-100
                                  `
                                                        }
                          `}
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <p className="text-indigo-600 text-2xl font-bold mt-4">

                                                ₹
                                                {
                                                    item.product
                                                        .price
                                                }

                                            </p>


                                            <div className="mt-4">

                                                {item.product.stock === 0 ? (

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

                                                ) : item.product.stock <=
                                                    item.product.lowStockThreshold ? (

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
                                                            item.product.stock
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
                                                        item
                                                            .product
                                                            ._id
                                                    )
                                                }
                                                className="
                          mt-5
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-5
                          py-2.5
                          rounded-xl
                          font-semibold
                          transition-all
                          duration-300
                          hover:scale-105
                        "
                                            >

                                                Remove

                                            </button>

                                        </div>

                                    </div>

                                )
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
              "
                        >

                            <h2 className="text-3xl font-extrabold mb-8 text-slate-900">

                                Order Summary

                            </h2>

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

                                onClick={handleCheckout}

                                disabled={hasInvalidStock}

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

                  ${hasInvalidStock

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

                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Cart;

