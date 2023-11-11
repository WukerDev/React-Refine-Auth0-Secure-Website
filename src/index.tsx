import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <Auth0Provider
        domain="dev-65c0wxqetj88kd6j.us.auth0.com"
        clientId="jsFjoZqUFdPR6BhDHHJ9Yj0qS1gQvA2y"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </React.Suspense>
  </React.StrictMode>
);
