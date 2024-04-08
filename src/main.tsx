import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import App from "./App.tsx";
import "./index.css";
import { TokenProvider } from "./services/token.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenProvider>
      <Theme>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Theme>
    </TokenProvider>
  </React.StrictMode>
);
