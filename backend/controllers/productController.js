const Product = require("../models/Product");

// =====================================================
// GET ALL PRODUCTS
// GET /api/products
// =====================================================
const getProducts = async (req, res) => {
  try {
    console.log("========================================");
    console.log("GET PRODUCTS REQUEST");
    console.log("========================================");

    const products = await Product.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    console.log("Products found:", products.length);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("========================================");
    console.error("GET PRODUCTS ERROR");
    console.error(error);
    console.error("========================================");

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE PRODUCT
// GET /api/products/:id
// =====================================================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE PRODUCT
// POST /api/products
// =====================================================
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      sku,
      price,
      mrp,
      stock,
      image,
      images,
      unit,
      isActive,
    } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, category and price are required",
      });
    }

    const product = await Product.create({
      name,
      description,
      brand,
      category,
      sku,
      price,
      mrp,
      stock,
      image,
      images,
      unit,
      isActive: isActive !== false,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE PRODUCT
// PUT /api/products/:id
// =====================================================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PRODUCT
// DELETE /api/products/:id
// =====================================================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};