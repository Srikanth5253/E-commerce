import {
  useState,
} from "react";

import API from "../../services/axios";

import {
  useAuth0,
} from "@auth0/auth0-react";

import {
  useNavigate,
  Link,
  Navigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
} from "lucide-react";

function Login() {

  const navigate =
    useNavigate();

  const {
    loginWithRedirect,
    isLoading,
  } = useAuth0();

  const token =
    localStorage.getItem("token");

  const existingUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  if (isLoading) {

    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-white
        "
      >

        <div className="
          text-xl
          font-semibold
          text-slate-700
        ">
          Loading...
        </div>

      </div>
    );
  }

  if (
    token &&
    existingUser?.role ===
    "admin"
  ) {

    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  if (
    token &&
    existingUser?.role ===
    "user"
  ) {

    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

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
      !formData.email ||
      !formData.password
    ) {

      toast.error(
        "All fields are required"
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

  const handleLogin = async (
    e
  ) => {

    e.preventDefault();

    if (!validateForm())
      return;

    try {

      const response =
        await API.post(
          "/api/auth/login",
          formData
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      toast.success(
        "Login Successful"
      );

      if (
        response.data.user.role ===
        "admin"
      ) {

        navigate("/admin", {
          replace: true,
        });

      } else {

        navigate("/home", {
          replace: true,
        });
      }

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white via-slate-50 to-slate-100">

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-4xl font-extrabold mb-2 text-center text-slate-900">
          Welcome Back
        </h2>

        <p className="text-center text-slate-500 mb-8">
          Login to continue shopping
        </p>

        <form
          onSubmit={
            handleLogin
          }
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="
                w-full
                px-4
                py-3
                bg-slate-50
                border
                border-slate-300
                rounded-xl
                outline-none
                text-slate-900
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                transition-all
              "
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
            Login
          </button>

        </form>

        <div className="my-6 flex items-center gap-4">

          <div className="flex-1 h-px bg-slate-300"></div>

          <span className="text-slate-400 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-slate-300"></div>

        </div>

        <button
          onClick={() =>
            loginWithRedirect()
          }
          className="
            w-full
            bg-white
            border
            border-slate-300
            hover:border-slate-400
            text-slate-700
            transition-all
            duration-300
            py-3
            rounded-xl
            font-semibold
            flex
            items-center
            justify-center
            gap-3
            hover:shadow-md
          "
        >

          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />

          Continue with Google

        </button>

        <p className="mt-6 text-center text-slate-600">

          Don't have an account?

          <Link
            to="/register"
            className="
              ml-2
              text-indigo-600
              hover:text-indigo-700
              font-semibold
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;

