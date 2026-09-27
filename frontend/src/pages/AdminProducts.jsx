import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FiEdit,
  FiFile,
  FiImage,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiUploadCloud,
  FiX,
  FiCheckCircle,
  FiPackage,
  FiBox,
  FiTag,
  FiLayers,
  FiDollarSign,
  FiDatabase,
} from "react-icons/fi";

const API_URL = "http://localhost:5000/api/products";

const EMPTY_FORM = {
  name: "",
  description: "",
  brand: "",
  category: "",
  sku: "",
  price: "",
  mrp: "",
  stock: "",
  image: "",
  unit: "Piece",
  isActive: true,
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const CATEGORY_OPTIONS = [
  "Hardware",
  "Electrical",
  "Building Materials",
  "Tools",
  "Plumbing",
  "Paint & Accessories",
  "Switches & Sockets",
  "Fasteners",
  "Safety Equipment",
  "Other",
];

const UNIT_OPTIONS = [
  "Piece",
  "Box",
  "Packet",
  "Set",
  "Meter",
  "Kg",
  "Liter",
];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");

  const fileInputRef = useRef(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products || []);
    } catch (err) {
      console.error("Load products error:", err);

      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSelectedFile(null);
    setImagePreview("");
    setImageError("");
    setError("");
    setShowForm(true);
  };

  const handleEdit = (product) => {
    const existingImage = product.image || "";

    setEditingId(product._id);

    setForm({
      name: product.name || "",
      description: product.description || "",
      brand: product.brand || "",
      category: product.category || "",
      sku: product.sku || "",
      price: product.price ?? "",
      mrp: product.mrp ?? "",
      stock: product.stock ?? "",
      image: existingImage,
      unit: product.unit || "Piece",
      isActive: product.isActive !== false,
    });

    setSelectedFile(null);
    setImagePreview(existingImage);
    setImageError("");
    setError("");
    setShowForm(true);
  };

  const handleClose = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSelectedFile(null);
    setImagePreview("");
    setImageError("");
  };

  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = () =>
        reject(new Error("Unable to read image file."));

      reader.readAsDataURL(file);
    });
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageError("");

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageError(
        "Please select a JPG, JPEG, PNG or WEBP image."
      );

      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image size must be less than 5 MB.");

      e.target.value = "";
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);

      setSelectedFile(file);
      setImagePreview(dataUrl);

      setForm((prev) => ({
        ...prev,
        image: dataUrl,
      }));
    } catch (err) {
      console.error("Image selection error:", err);

      setImageError("Unable to process selected image.");
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview("");

    setForm((prev) => ({
      ...prev,
      image: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setImageError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!form.category.trim()) {
      setError("Category is required.");
      return;
    }

    if (form.price === "") {
      setError("Price is required.");
      return;
    }

    if (Number(form.price) < 0) {
      setError("Price cannot be negative.");
      return;
    }

    if (
      form.mrp !== "" &&
      Number(form.mrp) < Number(form.price)
    ) {
      setError("MRP should be equal to or greater than selling price.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        brand: form.brand.trim(),
        category: form.category.trim(),
        sku: form.sku.trim(),
        price: Number(form.price),
        mrp: Number(form.mrp) || 0,
        stock: Number(form.stock) || 0,
        image: form.image.trim(),
        images: [],
        unit: form.unit.trim() || "Piece",
        isActive: form.isActive,
      };

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save product"
        );
      }

      await loadProducts();

      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      setSelectedFile(null);
      setImagePreview("");
    } catch (err) {
      console.error("Save product error:", err);

      setError(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete product"
        );
      }

      await loadProducts();
    } catch (err) {
      console.error("Delete product error:", err);

      setError(err.message || "Failed to delete product");
    }
  };

  const filteredProducts = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(value) ||
        product.brand?.toLowerCase().includes(value) ||
        product.category?.toLowerCase().includes(value) ||
        product.sku?.toLowerCase().includes(value)
      );
    });
  }, [products, search]);

  const activeProducts = products.filter(
    (product) => product.isActive
  ).length;

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        <div
          data-aos="fade-down"
          className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600 ring-1 ring-orange-100">
              <FiPackage />
              RAMDEV INVENTORY
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Product Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your Ramdev Udhyog & Hardware product catalog.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={loadProducts}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiRefreshCw
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700"
            >
              <FiPlus />
              Add Product
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <FiX className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div
          data-aos="fade-up"
          className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Products
                </p>
                <p className="mt-2 text-2xl font-black text-slate-900">
                  {products.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <FiPackage className="text-xl" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Active Products
                </p>
                <p className="mt-2 text-2xl font-black text-emerald-600">
                  {activeProducts}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FiCheckCircle className="text-xl" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Stock
                </p>
                <p className="mt-2 text-2xl font-black text-slate-900">
                  {totalStock.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiDatabase className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <FiSearch className="shrink-0 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product, brand, category or SKU..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {loading ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center">
              <FiRefreshCw className="mb-3 animate-spin text-2xl text-orange-500" />
              <p className="text-sm font-semibold text-slate-500">
                Loading products...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <FiPackage className="text-2xl" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                No products found
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                {search
                  ? "Try a different search keyword."
                  : "Add your first product to start building your catalog."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  <FiPlus />
                  Add Product
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Product
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Brand
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Category
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      SKU
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Price
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Stock
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-slate-100 transition hover:bg-orange-50/30"
                    >
                      <td className="px-5 py-4">
                        <div className="flex min-w-[270px] items-center gap-3">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200"
                            />
                          ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                              <FiImage />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate font-bold text-slate-900">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {product.unit || "Piece"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                        {product.brand || "—"}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {product.category || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-600">
                          {product.sku || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">
                          ₹
                          {Number(product.price || 0).toLocaleString(
                            "en-IN"
                          )}
                        </div>

                        {Number(product.mrp) >
                          Number(product.price) && (
                          <div className="text-xs text-slate-400 line-through">
                            ₹
                            {Number(product.mrp).toLocaleString(
                              "en-IN"
                            )}
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`font-bold ${
                            Number(product.stock || 0) <= 5
                              ? "text-red-600"
                              : "text-slate-700"
                          }`}
                        >
                          {product.stock ?? 0}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {product.isActive ? (
                          <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(product)}
                            title="Edit product"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                          >
                            <FiEdit />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(product._id)
                            }
                            title="Delete product"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={handleClose}
        >
          <div
            className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-500">
                  <FiPackage />
                  Product Catalog
                </div>

                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Add complete product information and product image.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={saving}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 disabled:opacity-50"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-5 sm:p-7"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <div className="sm:col-span-2">
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                        <FiPackage className="text-orange-500" />
                        Product Name *
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                        <FiTag className="text-orange-500" />
                        Brand
                      </label>

                      <input
                        type="text"
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        placeholder="e.g. Anchor"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                        <FiLayers className="text-orange-500" />
                        Category *
                      </label>

                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                      >
                        <option value="">Select category</option>

                        {CATEGORY_OPTIONS.map((category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        SKU
                      </label>

                      <input
                        type="text"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                        placeholder="RD-SW-001"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Unit
                      </label>

                      <select
                        name="unit"
                        value={form.unit}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                      >
                        {UNIT_OPTIONS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                        <FiDollarSign className="text-orange-500" />
                        Selling Price *
                      </label>

                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                          ₹
                        </span>

                        <input
                          type="number"
                          name="price"
                          value={form.price}
                          onChange={handleChange}
                          min="0"
                          placeholder="120"
                          className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        MRP
                      </label>

                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                          ₹
                        </span>

                        <input
                          type="number"
                          name="mrp"
                          value={form.mrp}
                          onChange={handleChange}
                          min="0"
                          placeholder="150"
                          className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Stock
                      </label>

                      <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        min="0"
                        placeholder="25"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Description
                      </label>

                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Enter product description..."
                        className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-orange-200 hover:bg-orange-50/30">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={form.isActive}
                          onChange={handleChange}
                          className="h-5 w-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                        />

                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            Product is active
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Active products will be visible on the website.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                    <FiImage className="text-orange-500" />
                    Product Image
                  </label>

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="h-64 w-full object-contain bg-white p-3"
                        />

                        <div className="absolute right-3 top-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              fileInputRef.current?.click()
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-orange-50 hover:text-orange-600"
                            title="Change image"
                          >
                            <FiUploadCloud />
                          </button>

                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white shadow-lg transition hover:bg-red-600"
                            title="Remove image"
                          >
                            <FiTrash2 />
                          </button>
                        </div>

                        {selectedFile && (
                          <div className="border-t border-slate-200 bg-white px-4 py-3">
                            <p className="truncate text-xs font-bold text-slate-700">
                              {selectedFile.name}
                            </p>

                            <p className="mt-1 text-[11px] text-slate-400">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        className="flex min-h-[300px] w-full flex-col items-center justify-center px-5 text-center transition hover:bg-orange-50/40"
                      >
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                          <FiUploadCloud className="text-3xl" />
                        </div>

                        <p className="text-sm font-bold text-slate-800">
                          Choose product image
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Click to browse from your computer
                        </p>

                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500 ring-1 ring-slate-200">
                            JPG
                          </span>

                          <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500 ring-1 ring-slate-200">
                            PNG
                          </span>

                          <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500 ring-1 ring-slate-200">
                            WEBP
                          </span>

                          <span className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500 ring-1 ring-slate-200">
                            Max 5MB
                          </span>
                        </div>
                      </button>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>

                  {imageError && (
                    <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600">
                      {imageError}
                    </div>
                  )}

                  <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-3">
                    <div className="flex gap-2">
                      <FiFile className="mt-0.5 shrink-0 text-blue-500" />

                      <div>
                        <p className="text-xs font-bold text-blue-800">
                          Image requirements
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-blue-700">
                          Use clear product photos in JPG, PNG or WEBP format.
                          Maximum file size is 5MB.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <FiRefreshCw className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle />
                      {editingId
                        ? "Update Product"
                        : "Save Product"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}