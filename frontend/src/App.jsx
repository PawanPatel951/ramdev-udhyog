import React, {
  lazy,
  Suspense,
  useEffect,
} from "react";

import AOS from "aos";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";

const Home = lazy(
  () => import("./pages/Home")
);

const Products = lazy(
  () => import("./pages/Products")
);

const Gallery = lazy(
  () => import("./pages/Gallery")
);

const About = lazy(
  () => import("./pages/About")
);

const Contact = lazy(
  () => import("./pages/Contact")
);

const AdminProducts = lazy(
  () => import("./pages/AdminProducts")
);

function RouteLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <PageLoader />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    const timer =
      window.setTimeout(() => {
        AOS.refresh();
      }, 50);

    return () =>
      window.clearTimeout(timer);
  }, [
    location.pathname,
    location.search,
  ]);

  return (
    <>
      <ScrollToTop />

      <Navbar />

      <main className="min-h-[60vh]">
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/gallery"
              element={<Gallery />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/admin/products"
              element={
                <AdminProducts />
              }
            />

            <Route
              path="*"
              element={<Home />}
            />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      <FloatingWhatsApp />
    </>
  );
}