const { body, param } = require("express-validator");

exports.createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
];

exports.updateCategoryValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Category ID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name cannot be empty"),

  body()
    .custom((value) => {
      const allowedFields = ["name", "description"];

      const hasValidField = Object.keys(value).some((field) =>
        allowedFields.includes(field)
      );

      if (!hasValidField) {
        throw new Error("At least one valid field is required");
      }

      return true;
    })
];

exports.categoryIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Category ID")
];