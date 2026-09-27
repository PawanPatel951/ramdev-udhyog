import React from "react";
import ReactDOM from "react-dom/client";

import AOS from "aos";
import "aos/dist/aos.css";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";
import "./styles.css";

import { ProductProvider } from "./context/ProductContext";

AOS.init({
  duration: 600,
  easing: "ease-out-cubic",
  once: true,
  offset: 60,
  mirror: false,
});

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <App />
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);