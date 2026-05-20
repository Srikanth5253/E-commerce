import {
  Navigate,
} from "react-router-dom";

import {
  useAuth0,
} from "@auth0/auth0-react";

function AdminRoute({
  children,
}) {

  const {
    isLoading,
  } = useAuth0();

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (isLoading) {

    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-white
      ">

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

  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    !user ||
    user.role !== "admin"
  ) {

    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  return children;
}

export default AdminRoute;