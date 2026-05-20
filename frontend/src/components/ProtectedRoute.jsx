import {
  Navigate,
} from "react-router-dom";

import {
  useAuth0,
} from "@auth0/auth0-react";

function ProtectedRoute({
  children,
}) {

  const {
    isLoading,
  } = useAuth0();

  const token =
    localStorage.getItem("token");

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

  return children;
}

export default ProtectedRoute;