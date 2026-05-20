import { useState } from "react";

import API from "../../services/axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
} from "lucide-react";

function Register() {

  const navigate =
    useNavigate();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const validateForm = () => {

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {

      toast.error(
        "All fields are required"
      );

      return false;
    }

    if (
      formData.name.length < 3
    ) {

      toast.error(
        "Name must be at least 3 characters"
      );

      return false;
    }

    if (
      !emailRegex.test(
        formData.email
      )
    ) {

      toast.error(
        "Enter valid email"
      );

      return false;
    }

    if (
      formData.password.length < 6
    ) {

      toast.error(
        "Password must be at least 6 characters"
      );

      return false;
    }

    return true;
  };

  const handleRegister =
    async (e) => {

      e.preventDefault();

      if (!validateForm())
        return;

      try {

        await API.post(
          "/api/auth/register",
          formData
        );

        toast.success(
          "Registration Successful"
        );

        navigate("/login");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Registration Failed"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white via-slate-50 to-slate-100">

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-4xl font-extrabold mb-2 text-center text-slate-900">
          Create Account
        </h2>

        <p className="text-center text-slate-500 mb-8">
          Register to start shopping
        </p>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 text-sm font-medium text-slate-700">
              Name
            </label>

            <input type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full
                        px-4 py-3
                        bg-slate-50
                        border
                        border-slate-300
                        rounded-xl
                        outline-none
                        text-slate-900
                        focus:border-indigo-500
                        focus:ring-4
                        focus:ring-indigo-100"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full
                   px-4 py-3
                   bg-slate-50
                   border
                   border-slate-300
                   rounded-xl
                   outline-none
                   text-slate-900
                   focus:border-indigo-500
                   focus:ring-4
                   focus:ring-indigo-100"
            />
          </div>

          <div>

            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                placeholder="Enter password"
                className="
        w-full
        px-4
        py-3
        pr-12
        bg-slate-50
        border
        border-slate-300
        rounded-xl
        outline-none
        focus:border-indigo-500
        focus:ring-4
        focus:ring-indigo-100
        text-slate-900
      "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-slate-500
        hover:text-indigo-600
        transition
      "
              >

                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}

              </button>

            </div>

          </div>

          <button
            type="submit"
            className="
              w-full
              bg-indigo-500
              hover:bg-indigo-600
              text-white
              transition-all
              duration-300
              py-3
              rounded-xl
              font-semibold
              hover:scale-[1.02]
              shadow-lg
              hover:shadow-indigo-500/30
            "
          >
            Register
          </button>

        </form>

        <p className="mt-6 text-center text-slate-600">

          Already have an account?

          <Link
            to="/login"
            className="
              ml-2
              text-indigo-600
              hover:text-indigo-700
              font-semibold
            "
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Register;