const express = require("express");
const { createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory } = require("../controllers/subCategoryController");
const { subCategoryIdValidator, createSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router.route("/").get(getSubCategories).post(createSubCategoryValidator, createSubCategory);

router.route("/:id")
.get(subCategoryIdValidator, getSubCategory)
.put(updateSubCategoryValidator, updateSubCategory)
.delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;