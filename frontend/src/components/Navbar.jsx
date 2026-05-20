import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaShoppingCart,
  FaHome,
  FaBoxOpen,
  FaHeart,
  FaClipboardList,
  FaTachometerAlt,
  FaComments,
} from "react-icons/fa";

import { useState } from "react";

import ChatWidget from "../components/ChatWidget";
import ChatPopup from "../components/ChatPopup";

function Navbar() {

  const navigate =
    useNavigate();

  const [openChat, setOpenChat] =
    useState(false);

  const token =
    localStorage.getItem(
      "token"
    );

  const user = JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/");
  };



  return (
    <>

      <nav
        className="
          flex
          items-center
          justify-between

          px-8
          py-4

          border-b
          border-slate-200

          bg-white/80
          backdrop-blur-xl

          sticky
          top-0
          z-50

          shadow-sm
        "
      >

        <Link
          to={
            token
              ? user?.role === "admin"
                ? "/admin"
                : "/home"
              : "/"
          }
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                rounded-xl

                bg-gradient-to-r
                from-indigo-500
                to-violet-500

                flex
                items-center
                justify-center

                shadow-md
              "
            >

              <FaShoppingCart
                className="
                  text-white
                  text-lg
                "
              />

            </div>

            <h1
              className="
                text-2xl
                font-extrabold

                bg-gradient-to-r
                from-indigo-500
                to-violet-500

                bg-clip-text
                text-transparent

                tracking-tight
              "
            >
              NexCart
            </h1>

          </div>

        </Link>

        <div
          className="
            hidden
            md:flex
            items-center
            gap-6

            text-sm
            font-medium
            text-slate-700
          "
        >

          {user?.role !== "admin" &&
            token && (

              <Link
                to="/home"
                className="
                  flex
                  items-center
                  gap-2

                  hover:text-indigo-600

                  transition-all
                "
              >
                <FaHome />
                Home
              </Link>
            )}

          {token && (

            <Link
              to={
                user?.role === "admin"
                  ? "/admin/products"
                  : "/products"
              }
              className="
                flex
                items-center
                gap-2

                hover:text-indigo-600

                transition-all
              "
            >
              <FaBoxOpen />
              Products
            </Link>
          )}

          {token &&
            user?.role !== "admin" && (
              <>

                <Link
                  to="/cart"
                  className="
                    flex
                    items-center
                    gap-2

                    hover:text-indigo-600

                    transition-all
                    duration-300
                  "
                >
                  <FaShoppingCart />
                  Cart
                </Link>

                <Link
                  to="/wishlist"
                  className="
                    flex
                    items-center
                    gap-2

                    hover:text-pink-500

                    transition-all
                  "
                >
                  <FaHeart />
                  Wishlist
                </Link>

                <Link
                  to="/my-orders"
                  className="
                    flex
                    items-center
                    gap-2

                    hover:text-indigo-600

                    transition-all
                  "
                >
                  <FaClipboardList />
                  Orders
                </Link>

              </>
            )}

          {user?.role === "admin" && (
            <>

              <Link
                to="/admin"
                className="
                  flex
                  items-center
                  gap-2

                  hover:text-indigo-600

                  transition-all
                "
              >
                <FaTachometerAlt />
                Dashboard
              </Link>

              <Link
                to="/admin/orders"
                className="
                  flex
                  items-center
                  gap-2

                  hover:text-indigo-600

                  transition-all
                "
              >
                <FaClipboardList />
                Orders
              </Link>

              <Link
                to="/admin/chats"
                className="
                  flex
                  items-center
                  gap-2

                  hover:text-indigo-600

                  transition-all
                "
              >
                <FaComments />
                Chats
              </Link>

            </>
          )}

        </div>

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          {token ? (
            <>

              {user?.role !== "admin" && (

                <Link
                  to="/profile"
                  className="
                    flex
                    items-center
                    gap-3

                    px-3
                    py-2

                    rounded-xl

                    hover:bg-slate-100

                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      w-10
                      h-10

                      rounded-full

                      bg-gradient-to-r
                      from-indigo-500
                      to-violet-500

                      text-white

                      flex
                      items-center
                      justify-center

                      font-bold
                      text-sm

                      shadow-md
                    "
                  >
                    {user?.name?.charAt(0)}
                  </div>

                  <div className="hidden md:block">

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-slate-800
                        leading-none
                      "
                    >
                      {user?.name}
                    </p>

                  </div>

                </Link>
              )}

              <button
                onClick={
                  handleLogout
                }
                className="
                  px-5
                  py-2

                  rounded-xl

                  bg-red-500
                  hover:bg-red-600

                  text-white
                  font-semibold

                  shadow-sm

                  transition-all
                  duration-300
                "
              >
                Logout
              </button>

            </>
          ) : (
            <>

              <Link
                to="/login"
                className="
                  px-5
                  py-2

                  rounded-xl

                  border
                  border-slate-300

                  bg-white

                  hover:border-indigo-500
                  hover:bg-indigo-50

                  font-semibold
                  text-slate-700

                  transition-all
                  duration-300
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-indigo-500
                  hover:bg-indigo-600

                  px-5
                  py-2

                  rounded-xl

                  text-white
                  font-semibold

                  shadow-md

                  transition-all
                  duration-300
                "
              >
                Register
              </Link>

            </>
          )}

        </div>

      </nav>

      {token &&
        user?.role !== "admin" && (
          <>
            <ChatWidget
              setOpen={setOpenChat}
            />

            <ChatPopup
              open={openChat}
              setOpen={setOpenChat}
            />
          </>
        )}

    </>
  );
}

export default Navbar;