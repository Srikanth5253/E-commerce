import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaUser,
  FaBoxOpen,
  FaHeart,
  FaCheckCircle,
  FaEdit,
  FaSave,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import {
  updateProfile,
} from "../../services/UserService";

function Profile() {

  const storedUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const [user, setUser] =
    useState(storedUser);

  const [isEditing, setIsEditing] =
    useState(false);

  const [name, setName] =
    useState(
      storedUser?.name || ""
    );

  const handleSave =
    async () => {

      if (!name.trim()) {

        toast.error(
          "Name is required"
        );

        return;
      }

      try {

        const response =
          await updateProfile({
            name,
          });

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.user
          )
        );

        setUser(
          response.user
        );

        toast.success(
          "Profile Updated"
        );

        setIsEditing(false);

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Update Failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-12 grid lg:grid-cols-4 gap-10">

        <div
          className="
            bg-white/80
            backdrop-blur-xl
            border
            border-slate-200
            rounded-3xl
            p-8
            h-fit
            shadow-xl
          "
        >

          <div className="flex flex-col items-center">

            <div
              className="
                w-28
                h-28
                rounded-full
                bg-gradient-to-r
                from-indigo-500
                to-violet-500
                flex
                items-center
                justify-center
                text-4xl
                font-bold
                text-white
                shadow-lg
              "
            >
              {user?.name?.charAt(0)}
            </div>

            <h2 className="text-3xl font-extrabold mt-6 text-slate-900">
              {user?.name}
            </h2>

            <p className="text-slate-500 mt-3 text-center break-all">
              {user?.email}
            </p>

          </div>

          <div className="mt-10 space-y-4">

            <button
              className="
                w-full
                flex
                items-center
                gap-3
                bg-indigo-500
                hover:bg-indigo-600
                text-white
                py-4
                px-5
                rounded-2xl
                font-semibold
                transition-all
                duration-300
                shadow-lg
                hover:shadow-indigo-500/30
              "
            >

              <FaUser />

              Profile Overview

            </button>

            <Link
              to="/my-orders"
              className="
                flex
                items-center
                gap-3
                w-full
                bg-white
                border
                border-slate-200
                hover:border-indigo-500
                hover:bg-indigo-50
                py-4
                px-5
                rounded-2xl
                font-semibold
                transition-all
                duration-300
                shadow-sm
              "
            >

              <FaBoxOpen />

              Orders

            </Link>

            <Link
              to="/wishlist"
              className="
                flex
                items-center
                gap-3
                w-full
                bg-white
                border
                border-slate-200
                hover:border-pink-500
                hover:bg-pink-50
                py-4
                px-5
                rounded-2xl
                font-semibold
                transition-all
                duration-300
                shadow-sm
              "
            >

              <FaHeart />

              Wishlist

            </Link>

          </div>

        </div>

        <div className="lg:col-span-3 space-y-8">

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-8
              shadow-xl
            "
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <h1 className="text-5xl font-extrabold text-slate-900">
                  Profile Overview
                </h1>

                <p className="text-slate-500 mt-3 text-lg">
                  Manage your personal information
                </p>

              </div>

              <button
                onClick={() => {

                  if (isEditing) {

                    handleSave();

                  } else {

                    setIsEditing(
                      true
                    );
                  }
                }}
                className="
                  bg-indigo-500
                  hover:bg-indigo-600
                  text-white
                  px-7
                  py-4
                  rounded-2xl
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

                {isEditing ? (
                  <FaSave />
                ) : (
                  <FaEdit />
                )}

                {isEditing
                  ? "Save Profile"
                  : "Edit Profile"}

              </button>

            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">

              <div>

                <p className="text-slate-600 font-medium">
                  Full Name
                </p>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  disabled={
                    !isEditing
                  }
                  className="
                    mt-3
                    w-full
                    bg-slate-50
                    border
                    border-slate-300
                    px-4
                    py-4
                    rounded-2xl
                    outline-none
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                    transition-all
                    duration-300
                    disabled:opacity-70
                  "
                />

              </div>

              <div>

                <p className="text-slate-600 font-medium">
                  Email Address
                </p>

                <input
                  type="text"
                  value={
                    user?.email
                  }
                  disabled
                  className="
                    mt-3
                    w-full
                    bg-slate-100
                    border
                    border-slate-300
                    px-4
                    py-4
                    rounded-2xl
                    opacity-80
                  "
                />

              </div>

              <div>

                <p className="text-slate-600 font-medium">
                  Account Status
                </p>

                <div className="flex items-center gap-3 mt-4">

                  <FaCheckCircle
                    className="
                      text-green-500
                      text-2xl
                    "
                  />

                  <h3 className="text-2xl font-bold text-green-500">
                    Active
                  </h3>

                </div>

              </div>

            </div>

          </div>

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-8
              shadow-xl
            "
          >

            <h2 className="text-4xl font-extrabold mb-8 text-slate-900">
              Recent Activity
            </h2>

            <div className="space-y-5">

              <div
                className="
                  bg-slate-50
                  border
                  border-slate-200
                  p-5
                  rounded-2xl
                  hover:bg-white
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
              >
                Logged into account
              </div>

              <div
                className="
                  bg-slate-50
                  border
                  border-slate-200
                  p-5
                  rounded-2xl
                  hover:bg-white
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
              >
                Viewed products
              </div>

              <div
                className="
                  bg-slate-50
                  border
                  border-slate-200
                  p-5
                  rounded-2xl
                  hover:bg-white
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
              >
                Updated profile
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;