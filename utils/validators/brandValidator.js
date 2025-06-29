const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 2 })
    .withMessage("Brand name must be at least 2 characters")
    .isLength({ max: 32 })
    .withMessage("Brand name must be less than 32 characters"),
  validatorMiddleware,
];

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Brand name must be at least 2 characters")
    .isLength({ max: 32 })
    .withMessage("Brand name must be less than 32 characters"),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware,
]; 