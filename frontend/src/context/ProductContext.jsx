import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ProductContext = createContext(null);

// =====================================================
// BACKEND API
// =====================================================
const API_URL = "http://localhost:5000/api/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD PRODUCTS FROM BACKEND
  // =====================================================
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Products API request failed");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message || "Failed to load products"
        );
      }

      const formattedProducts = (data.products || []).map(
        (product) => ({
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
        })
      );

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

  // =====================================================
  // INITIAL LOAD
  // =====================================================
  useEffect(() => {
    loadProducts();
  }, []);

  // =====================================================
  // CATEGORIES
  // =====================================================
  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product?.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // =====================================================
  // PROVIDER
  // =====================================================
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

// =====================================================
// useProducts HOOK
// =====================================================
export function useProducts() {
  return useContext(ProductContext);
}