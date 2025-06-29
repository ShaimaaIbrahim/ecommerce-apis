const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Product title must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("Product title must be less than 100 characters"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 20 })
    .withMessage("Product description must be at least 20 characters"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number")
    .isInt({ min: 0 })
    .withMessage("Quantity cannot be negative"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .isFloat({ min: 0, max: 200000 })
    .withMessage("Price must be between 0 and 200000"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Price after discount must be a number")
    .isFloat({ min: 0 })
    .withMessage("Price after discount cannot be negative"),
  check("imageCover")
    .notEmpty()
    .withMessage("Product image cover is required"),
  check("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Invalid category id format")
    .custom(async (categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) {
        return Promise.reject(new Error(`Category not found for id: ${categoryId}`));
      }
    }),
  check("subCategories")
    .notEmpty()
    .withMessage("Product subcategories is required")
    .isMongoId()
    .withMessage("Invalid subcategory id format")
    .custom(async (subCategoriesIds) => {
      const subCategories = await SubCategory.find({ _id: { $in: subCategoriesIds } });
      if (subCategories.length === 0 || subCategories.length !== subCategoriesIds.length) {
        return Promise.reject(new Error(`Some subcategories are not found`));
      }})
    .custom(async (val , {req})=>{
      const subCategoriesIds = (await SubCategory.find({category: req.body.category})).map(subCategory => subCategory._id.toString());
      const checker = val.every(id => subCategoriesIds.includes(id));
      if(!checker){
        return Promise.reject(new Error(`Some subcategories are not found for category: ${req.body.category}`));
      }
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Colors must be an array"),
  check("colors.*")
    .optional()
    .isString()
    .withMessage("Each color must be a string"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),
  check("images.*")
    .optional()
    .isString()
    .withMessage("Each image must be a string"),
  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Product title must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("Product title must be less than 100 characters"),
  check("description")
    .optional()
    .isLength({ min: 20 })
    .withMessage("Product description must be at least 20 characters"),
  check("quantity")
    .optional()
    .isNumeric()
    .withMessage("Quantity must be a number")
    .isInt({ min: 0 })
    .withMessage("Quantity cannot be negative"),
  check("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .isFloat({ min: 0, max: 200000 })
    .withMessage("Price must be between 0 and 200000"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Price after discount must be a number")
    .isFloat({ min: 0 })
    .withMessage("Price after discount cannot be negative"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category id format"),
  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Invalid brand id format"),
  check("subcategories")
    .optional()
    .isArray()
    .withMessage("Subcategories must be an array"),
  check("subcategories.*")
    .optional()
    .isMongoId()
    .withMessage("Invalid subcategory id format"),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Colors must be an array"),
  check("colors.*")
    .optional()
    .isString()
    .withMessage("Each color must be a string"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),
  check("images.*")
    .optional()
    .isString()
    .withMessage("Each image must be a string"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

exports.getProductsByCategoryValidator = [
  check("categoryId").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.getProductsByBrandValidator = [
  check("brandId").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware,
];

exports.searchProductsValidator = [
  check("q")
    .notEmpty()
    .withMessage("Search query is required")
    .isLength({ min: 2 })
    .withMessage("Search query must be at least 2 characters"),
  validatorMiddleware,
]; 