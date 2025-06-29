const { createCategory , getCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require("../controllers/categoryController");
const { getSubCategoriesForCategory  , createSubCategoryForCategory }= require("../controllers/categoryController");

const {categoryIdValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator} = require("../utils/validators/categoryValidator");

const express = require("express");

const router = express.Router({mergeParams: true});

router.route("/:categoryId/subcategories").get(getSubCategoriesForCategory).post(createSubCategoryForCategory);

router.route("/").get(getCategories).post(createCategoryValidator, createCategory);

router.route("/:id")
.get(categoryIdValidator , getCategoryById)
.put(updateCategoryValidator, updateCategoryById)
.delete(deleteCategoryValidator, deleteCategoryById);

module.exports = router;

