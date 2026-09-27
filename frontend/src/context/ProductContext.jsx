import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

const CACHE_KEY = "ramdev_products_cache";
const CACHE_TIME = 5 * 60 * 1000;

const getCachedProducts = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);

    if (!cached) {
      return null;
    }

    const parsed = JSON.parse(cached);

    if (
      !parsed ||
      !Array.isArray(parsed.products) ||
      !parsed.timestamp
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const saveCachedProducts = (products) => {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        products,
        timestamp: Date.now(),
      })
    );
  } catch {
    // Ignore localStorage errors
  }
};

const formatProducts = (products = []) => {
  return products.map((product) => ({
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
};

export function ProductProvider({ children }) {
  const cached = useMemo(
    () => getCachedProducts(),
    []
  );

  const [products, setProducts] = useState(
    cached?.products
      ? formatProducts(cached.products)
      : []
  );

  const [loading, setLoading] = useState(
    !cached?.products
  );

  const [error, setError] = useState("");

  const requestRef = useRef(null);

  const loadProducts = useCallback(
    async (force = false) => {
      if (requestRef.current) {
        return requestRef.current;
      }

      const cachedData = getCachedProducts();

      if (
        !force &&
        cachedData?.products &&
        Date.now() - cachedData.timestamp <
          CACHE_TIME
      ) {
        const formatted =
          formatProducts(
            cachedData.products
          );

        setProducts(formatted);
        setLoading(false);

        return formatted;
      }

      const controller =
        new AbortController();

      const timeout = window.setTimeout(() => {
        controller.abort();
      }, 15000);

      requestRef.current = (async () => {
        try {
          setError("");

          if (products.length === 0) {
            setLoading(true);
          }

          const response = await fetch(
            API_URL,
            {
              method: "GET",
              signal: controller.signal,
              headers: {
                Accept:
                  "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              `Products API request failed: ${response.status}`
            );
          }

          const data =
            await response.json();

          if (!data.success) {
            throw new Error(
              data.message ||
                "Failed to load products"
            );
          }

          const rawProducts =
            data.products || [];

          const formatted =
            formatProducts(
              rawProducts
            );

          setProducts(formatted);

          saveCachedProducts(
            rawProducts
          );

          return formatted;
        } catch (err) {
          if (
            err.name === "AbortError"
          ) {
            setError(
              "Products are taking longer than expected."
            );
          } else {
            console.error(
              "Product API Error:",
              err
            );

            setError(
              err.message ||
                "Products could not be loaded."
            );
          }

          if (products.length === 0) {
            setProducts([]);
          }

          return [];
        } finally {
          window.clearTimeout(timeout);
          setLoading(false);
          requestRef.current = null;
        }
      })();

      return requestRef.current;
    },
    [products.length]
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map(
            (product) =>
              product?.category
          )
          .filter(Boolean)
      ),
    ];
  }, [products]);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      reload: () => loadProducts(true),
      categories,
    }),
    [
      products,
      loading,
      error,
      loadProducts,
      categories,
    ]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}