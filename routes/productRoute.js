const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsWithFilter,
  getProductsByCategory,
  getProductsByBrand,
  searchProducts
} = require("../controllers/productController");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
  getProductsByCategoryValidator,
  getProductsByBrandValidator,
  searchProductsValidator
} = require("../utils/validators/productValidator");

const router = express.Router();


// Main product routes
router.route("/")
  .post(createProductValidator, createProduct)
  .get(getProducts);

router.route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router; 