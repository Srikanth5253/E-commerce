import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";
import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={
      import.meta.env
        .VITE_AUTH0_DOMAIN
    }

    clientId={
      import.meta.env
        .VITE_AUTH0_CLIENT_ID
    }

    authorizationParams={{
      redirect_uri: window.location.origin +
        "/auth-callback",
    }}
    cacheLocation="localstorage"
  >
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </BrowserRouter>
  </Auth0Provider>
);

