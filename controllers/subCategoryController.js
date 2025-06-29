const SubCategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures =  require("../utils/apiFeatures");
const factory = require("./handlersFactory");

// @desc    Create subCategory
// @route   POST /api/v1/subcategories
// @access  Private
exports.createSubCategory = factory.createOne(SubCategory);


// @desc    Get all subCategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = factory.getAll(SubCategory);


// @desc    Get specific subCategory
// @route   GET /api/v1/subcategories/:id
// @access  Public
///have refrence inside another model 
exports.getSubCategory = factory.getOne(SubCategory);


// @desc    Update specific subCategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = factory.updateOne(SubCategory);


// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);