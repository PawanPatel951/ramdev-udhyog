import React, { useEffect } from "react";
import AOS from "aos";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminProducts from "./pages/AdminProducts";
import { useProducts } from "./context/ProductContext";

export default function App() {
  const location = useLocation();
  const { loading } = useProducts();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      AOS.refreshHard();
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main className="min-h-[60vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
