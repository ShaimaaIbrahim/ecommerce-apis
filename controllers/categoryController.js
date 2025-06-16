const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const categoryModel = require("../models/categoryModel");

/// get all categories
const getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    const categories = await categoryModel.find().skip(skip).limit(limit);
    res.status(200).json({results: categories.length, data: categories, page: page, limit: limit});
});

//get category by id
const getCategoryById = asyncHandler(async (req, res, next) => {
    const category = await categoryModel.findById(req.params.id)

    if(!category){
        return next(new ApiError("Category not found", 404));
    }
    res.status(200).json({data: category});
});

///create category
const createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;

    const category = await categoryModel.create({name: name, slug: slugify(name)});
    console.log(category);
    res.status(201).json({data: category});
});

//updating category by id
const updateCategoryById = asyncHandler(async (req, res, next) => {
    const category = await categoryModel.findOneAndUpdate(
         {_id: req.params.id},
         {name: req.body.name, slug: slugify(req.body.name)},
         {new: true}
        );

    if(!category){
        return next(new ApiError("Category not found", 404));
    }
    res.status(200).json({data: category});
});

const deleteCategoryById = asyncHandler(async (req, res, next) => {
    const category = await categoryModel.findOneAndDelete({_id: req.params.id});

    if(!category){
        return next(new ApiError("Category not found", 404));
    }
    res.status(200).json({message: "Category deleted successfully"});
});


module.exports = { createCategory , getCategories, getCategoryById, updateCategoryById, deleteCategoryById};