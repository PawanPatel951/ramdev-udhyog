import axios from "axios";

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const PRODUCTS_PATH =
  import.meta.env.VITE_PUBLIC_PRODUCTS_API || "/products/public";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 12000,
  headers: {
    Accept: "application/json",
  },
});

const firstDefined = (...values) =>
  values.find((v) => v !== undefined && v !== null && v !== "");

export const normalizeProduct = (raw = {}) => {
  const images = [
    ...(Array.isArray(raw.images) ? raw.images : []),
    ...(Array.isArray(raw.imageUrls) ? raw.imageUrls : []),
    firstDefined(
      raw.image,
      raw.imageUrl,
      raw.thumbnail,
      raw.photo,
      raw.productImage
    ),
  ]
    .filter(Boolean)
    .map((item) =>
      typeof item === "string"
        ? item
        : firstDefined(item.url, item.secure_url, item.path)
    );

  const price =
    Number(
      firstDefined(
        raw.sellingPrice,
        raw.salePrice,
        raw.price,
        raw.mrp,
        0
      )
    ) || 0;

  const mrp =
    Number(
      firstDefined(
        raw.mrp,
        raw.originalPrice,
        raw.price,
        price
      )
    ) || price;

  return {
    ...raw,
    id: firstDefined(
      raw._id,
      raw.productId,
      raw.product_id,
      raw.id,
      crypto.randomUUID?.() || Math.random().toString(36)
    ),
    name: firstDefined(
      raw.name,
      raw.productName,
      raw.title,
      "Electrical / Hardware Product"
    ),
    description: firstDefined(
      raw.description,
      raw.shortDescription,
      raw.details,
      "Quality electrical and hardware product from trusted brands."
    ),
    category: firstDefined(
      raw.category,
      raw.categoryName,
      raw.productCategory,
      "Hardware Items"
    ),
    sku: firstDefined(
      raw.sku,
      raw.SKU,
      raw.productCode,
      "—"
    ),
    brand: firstDefined(
      raw.brand,
      raw.brandName,
      "Genuine Brand"
    ),
    price,
    mrp,
    stock: Number(firstDefined(raw.stock, raw.quantity, 0)) || 0,
    image: images[0] || "",
    images,
  };
};

export async function fetchPublicProducts() {
  const response = await api.get(PRODUCTS_PATH);

  const payload = response?.data;

  const rows = Array.isArray(payload)
    ? payload
    : payload?.products ||
      payload?.data ||
      payload?.items ||
      payload?.results ||
      [];

  return rows
    .map(normalizeProduct)
    .filter((product) => product.name);
}