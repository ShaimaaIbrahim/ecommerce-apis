const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const categoryModel = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

/// get all categories
const getCategories = factory.getAll(categoryModel);

//get category by id
const getCategoryById = factory.getOne(categoryModel);

///create category
const createCategory = factory.createOne(categoryModel); 


//get subcategories for a category
const getSubCategoriesForCategory = factory.getSubDocsByParent(SubCategory,"category", "name");

///create subCategory for a category
const createSubCategoryForCategory = factory.createSubDocForParent(SubCategory,"category", "name");

//updating category by id
const updateCategoryById = factory.updateOne(categoryModel);


const deleteCategoryById = factory.deleteOne(categoryModel);


module.exports = { createCategory , getCategories, getCategoryById, updateCategoryById, deleteCategoryById , getSubCategoriesForCategory, createSubCategoryForCategory};