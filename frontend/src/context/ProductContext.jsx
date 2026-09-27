import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ProductContext = createContext(null);

const getApiBaseUrl = () => {
  const envUrl = String(
    import.meta.env.VITE_API_URL || ""
  ).trim();

  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    return "http://localhost:5000/api";
  }

  return "https://ramdev-udhyog.onrender.com/api";
};

const API_URL = `${getApiBaseUrl()}/products/public`;

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("PRODUCT API:", API_URL);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Products API request failed: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("PRODUCT API RESPONSE:", data);

      if (!data.success) {
        throw new Error(
          data.message || "Failed to load products"
        );
      }

      const formattedProducts = (
        data.products || []
      ).map((product) => ({
        id: product._id,

        name: product.name || "Product",

        description:
          product.description ||
          "Quality electrical and hardware product.",

        category:
          product.category || "Hardware Items",

        sku: product.sku || "—",

        brand:
          product.brand || "Genuine Brand",

        price: Number(product.price) || 0,

        mrp: Number(product.mrp) || 0,

        stock: Number(product.stock) || 0,

        image: product.image || "",

        images: Array.isArray(product.images)
          ? product.images
          : [],

        unit: product.unit || "Piece",

        isActive:
          product.isActive !== false,

        _id: product._id,

        createdAt: product.createdAt,

        updatedAt: product.updatedAt,
      }));

      setProducts(formattedProducts);
    } catch (err) {
      console.error("Product API Error:", err);

      setProducts([]);

      setError(
        err.message ||
          "Products could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product?.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        reload: loadProducts,
        categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}