import {
    useEffect,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    useAuth0,
} from "@auth0/auth0-react";

import toast from "react-hot-toast";

import API from "../../services/axios";

function AuthCallback() {

    const navigate =
        useNavigate();

    const {
        user,
        isAuthenticated,
        isLoading,
    } = useAuth0();

    useEffect(() => {

        const loginToBackend =
            async () => {

                try {

                    if (
                        isAuthenticated &&
                        user
                    ) {

                        const response =
                            await API.post(
                                "/auth/google-login",
                                {
                                    name:
                                        user.name,

                                    email:
                                        user.email,

                                    auth0Id:
                                        user.sub,
                                }
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
                            "Google Login Successful"
                        );

                        navigate("/home", {
                            replace: true,
                        });
                    }

                } catch (error) {

                    toast.error(
                        error.response?.data
                            ?.message ||
                        "Google Login Failed"
                    );

                    navigate("/login", {
                        replace: true,
                    });
                }
            };

        if (
            !isLoading
        ) {

            loginToBackend();
        }

    }, [
        isAuthenticated,
        user,
        isLoading,
        navigate,
    ]);

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
                Logging in...
            </div>

        </div>
    );
}

export default AuthCallback;