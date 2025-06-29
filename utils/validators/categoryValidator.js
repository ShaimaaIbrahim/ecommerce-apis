const { check, validationResult } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');

const categoryIdValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware,
];

const createCategoryValidator = [
     check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({min: 3}).withMessage("Category name must be at least 3 characters")
    .isLength({max: 32}).withMessage("Category name must be less than 32 characters")
    .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
      }),
     validatorMiddleware,
];

const updateCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware,
];

const deleteCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware,
];

module.exports = {categoryIdValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator};