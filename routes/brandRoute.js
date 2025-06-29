const express = require("express");
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand
} = require("../controllers/brandController");
const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator
} = require("../utils/validators/brandValidator");

const router = express.Router();

router.route("/")
  .post(createBrandValidator, createBrand)
  .get(getBrands);

router.route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router; 