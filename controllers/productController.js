const Product = require("../models/productModel");
const factory = require("./handlersFactory");


// @desc    Create product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product);


// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = factory.getAll(Product, 'Products');


// @desc    Get specific product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product);


// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(Product);


// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.deleteOne(Product)

