import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminProducts = lazy(() => import("./pages/AdminProducts"));

function RouteLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <PageLoader />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <main className="min-h-[60vh]">
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Products />} />

            <Route path="/gallery" element={<Gallery />} />

            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />

            <Route
              path="/admin/products"
              element={<AdminProducts />}
            />

            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      <FloatingWhatsApp />
    </>
  );
}