const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// =====================================================
// PUBLIC PRODUCTS
// IMPORTANT: MUST COME BEFORE /:id
// =====================================================
router.get("/public", getProducts);

// =====================================================
// ALL PRODUCTS
// =====================================================
router.get("/", getProducts);

// =====================================================
// SINGLE PRODUCT
// =====================================================
router.get("/:id", getProductById);

// =====================================================
// CREATE PRODUCT
// =====================================================
router.post("/", createProduct);

// =====================================================
// UPDATE PRODUCT
// =====================================================
router.put("/:id", updateProduct);

// =====================================================
// DELETE PRODUCT
// =====================================================
router.delete("/:id", deleteProduct);

module.exports = router;