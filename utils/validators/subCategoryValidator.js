const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');

const subCategoryIdValidator = [
  check('id').isMongoId().withMessage('Invalid subcategory id format'),
  validatorMiddleware,
];

const createSubCategoryValidator = [
  check('name')
    .notEmpty().withMessage('SubCategory name is required')
    .isLength({ min: 2 }).withMessage('SubCategory name must be at least 2 characters')
    .isLength({ max: 32 }).withMessage('SubCategory name must be less than 32 characters'),
  check('category')
    .notEmpty().withMessage('SubCategory must belong to a category')
    .isMongoId().withMessage('Invalid category id format'), 
  body('name').custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

const updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subcategory id format'),
  check('name')
  .notEmpty().withMessage('SubCategory name is required')
  .isLength({ min: 2 }).withMessage('SubCategory name must be at least 2 characters')
  .isLength({ max: 32 }).withMessage('SubCategory name must be less than 32 characters'),
check('category').notEmpty().withMessage('SubCategory must belong to a category'),
  validatorMiddleware,
];

const deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subcategory id format'),
  validatorMiddleware,
];

module.exports = {
  subCategoryIdValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
};
