import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { Products } from "./pages/Products.tsx";
import { ProductDetails } from "./pages/ProductDetails.tsx";
import { CreateProduct } from "./pages/CreateProduct.tsx";
import { fetchProducts } from "./state/productsSlice";
import "./index.css";

// Fetch products when app starts
store.dispatch(fetchProducts());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
