import {
  useState,
  useEffect,
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
  FaMapMarkerAlt,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import {
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
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

  const [addresses,
    setAddresses] =
    useState([]);

  const [showAddressForm,
    setShowAddressForm] =
    useState(false);

  const [editingAddressId,
    setEditingAddressId] =
    useState(null);

  const [addressForm,
    setAddressForm] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      label: "Home",
      isDefault: false,
    });

  useEffect(() => {

    fetchAddresses();

  }, []);

  const fetchAddresses =
    async () => {

      try {

        const response =
          await getAddresses();

        setAddresses(
          response.addresses
        );

      } catch (error) {

        console.log(error);
      }
    };

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

  const handleAddressSubmit =
    async () => {

      if (
        !addressForm.fullName.trim() ||

        !addressForm.phone.trim() ||

        !addressForm.address.trim() ||

        !addressForm.city.trim() ||

        !addressForm.state.trim() ||

        !addressForm.pincode.trim()
      ) {

        toast.error(
          "Please fill all address fields"
        );

        return;
      }

      if (
        !/^[0-9]{10}$/.test(
          addressForm.phone
        )
      ) {

        toast.error(
          "Enter valid 10-digit phone number"
        );

        return;
      }

      if (
        !/^[0-9]{6}$/.test(
          addressForm.pincode
        )
      ) {

        toast.error(
          "Enter valid 6-digit pincode"
        );

        return;
      }

      try {

        if (
          editingAddressId
        ) {

          await updateAddress(
            editingAddressId,
            addressForm
          );

          toast.success(
            "Address Updated"
          );

        } else {

          await addAddress(
            addressForm
          );

          toast.success(
            "Address Added"
          );
        }

        fetchAddresses();

        setShowAddressForm(
          false
        );

        setEditingAddressId(
          null
        );

        setAddressForm({
          fullName: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          label: "Home",
          isDefault: false,
        });

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Something went wrong"
        );
      }
    };

  const handleEditAddress =
    (address) => {

      setEditingAddressId(
        address._id
      );

      setAddressForm({
        fullName:
          address.fullName,

        phone:
          address.phone,

        address:
          address.address,

        city:
          address.city,

        state:
          address.state,

        pincode:
          address.pincode,

        label:
          address.label,

        isDefault:
          address.isDefault,
      });

      setShowAddressForm(
        true
      );
    };

  const handleDeleteAddress =
    async (id) => {

      try {

        await deleteAddress(
          id
        );

        toast.success(
          "Address Deleted"
        );

        fetchAddresses();

      } catch (error) {

        toast.error(
          "Delete Failed"
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

            <div className="
              flex
              items-center
              justify-between
              mb-8
            ">

              <div>

                <h2 className="
                  text-4xl
                  font-extrabold
                  text-slate-900
                ">
                  Saved Addresses
                </h2>

                <p className="
                  text-slate-500
                  mt-2
                ">
                  Manage your delivery addresses
                </p>

              </div>

              <button
                onClick={() => {

                  setShowAddressForm(
                    true
                  );

                  setEditingAddressId(
                    null
                  );
                }}
                className="
                  bg-black
                  hover:bg-slate-800
                  text-white
                  px-6
                  py-4
                  rounded-2xl
                  font-semibold
                  flex
                  items-center
                  gap-3
                  transition-all
                  duration-300
                "
              >

                <FaPlus />

                Add Address

              </button>

            </div>

            {showAddressForm && (

              <div className="
                border
                border-slate-200
                rounded-3xl
                p-6
                mb-8
                bg-slate-50
              ">

                <div className="
                  grid
                  md:grid-cols-2
                  gap-5
                ">

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={
                      addressForm.fullName
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        fullName:
                          e.target.value,
                      })
                    }
                    className="
                      border
                      border-slate-300
                      p-4
                      rounded-2xl
                    "
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={
                      addressForm.phone
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        phone:
                          e.target.value,
                      })
                    }
                    className="
                      border
                      border-slate-300
                      p-4
                      rounded-2xl
                    "
                  />

                  <textarea
                    placeholder="Address"
                    value={
                      addressForm.address
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        address:
                          e.target.value,
                      })
                    }
                    className="
                      md:col-span-2
                      border
                      border-slate-300
                      p-4
                      rounded-2xl
                      h-32
                    "
                  />

                  <input
                    type="text"
                    placeholder="City"
                    value={
                      addressForm.city
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        city:
                          e.target.value,
                      })
                    }
                    className="
                      border
                      border-slate-300
                      p-4
                      rounded-2xl
                    "
                  />

                  <input
                    type="text"
                    placeholder="State"
                    value={
                      addressForm.state
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        state:
                          e.target.value,
                      })
                    }
                    className="
                      border
                      border-slate-300
                      p-4
                      rounded-2xl
                    "
                  />

                  <input
                    type="text"
                    placeholder="Pincode"
                    value={
                      addressForm.pincode
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        pincode:
                          e.target.value,
                      })
                    }
                    className="
                      border
                      border-slate-300
                      p-4
                      rounded-2xl
                    "
                  />

                  <select
                    value={
                      addressForm.label
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        label:
                          e.target.value,
                      })
                    }
                    className="
                      border
                      border-slate-300
                      p-4
                      rounded-2xl
                    "
                  >

                    <option>
                      Home
                    </option>

                    <option>
                      Office
                    </option>

                    <option>
                      Other
                    </option>

                  </select>

                </div>

                <div className="
                  flex
                  items-center
                  gap-3
                  mt-5
                ">

                  <input
                    type="checkbox"
                    checked={
                      addressForm.isDefault
                    }
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        isDefault:
                          e.target.checked,
                      })
                    }
                  />

                  <p>
                    Set as default address
                  </p>

                </div>

                <div className="
                  flex
                  gap-4
                  mt-6
                ">

                  <button
                    onClick={
                      handleAddressSubmit
                    }
                    className="
                      bg-indigo-500
                      hover:bg-indigo-600
                      text-white
                      px-6
                      py-3
                      rounded-2xl
                      font-semibold
                    "
                  >

                    {editingAddressId
                      ? "Update Address"
                      : "Save Address"}

                  </button>

                  <button
                    onClick={() =>
                      setShowAddressForm(
                        false
                      )
                    }
                    className="
                      bg-slate-200
                      hover:bg-slate-300
                      px-6
                      py-3
                      rounded-2xl
                      font-semibold
                    "
                  >
                    Cancel
                  </button>

                </div>

              </div>
            )}

            <div className="
              grid
              md:grid-cols-2
              gap-6
            ">

              {addresses.map(
                (address) => (

                  <div
                    key={address._id}
                    className="
                    border
                    border-slate-200
                    rounded-3xl
                    p-6
                    bg-slate-50
                    hover:bg-white
                    hover:shadow-lg
                    transition-all
                    duration-300
                  "
                  >

                    <div className="
                    flex
                    items-start
                    justify-between
                  ">

                      <div className="
                      flex
                      items-center
                      gap-3
                    ">

                        <FaMapMarkerAlt
                          className="
                          text-indigo-500
                          text-xl
                        "
                        />

                        <div>

                          <h3 className="
                          text-xl
                          font-bold
                        ">
                            {address.label}
                          </h3>

                          {address.isDefault && (

                            <span className="
                            text-xs
                            bg-green-100
                            text-green-600
                            px-3
                            py-1
                            rounded-full
                            font-semibold
                          ">
                              Default
                            </span>
                          )}

                        </div>

                      </div>

                      <button
                        onClick={() =>
                          handleDeleteAddress(
                            address._id
                          )
                        }
                        className="
                        text-red-500
                        hover:text-red-600
                      "
                      >

                        <FaTrash />

                      </button>

                    </div>

                    <div className="
                    mt-5
                    space-y-2
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

                    <button
                      onClick={() =>
                        handleEditAddress(
                          address
                        )
                      }
                      className="
                      mt-6
                      bg-indigo-50
                      hover:bg-indigo-100
                      text-indigo-600
                      px-5
                      py-3
                      rounded-2xl
                      font-semibold
                      flex
                      items-center
                      gap-2
                    "
                    >

                      <FaEdit />

                      Edit Address

                    </button>

                  </div>
                ))}

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