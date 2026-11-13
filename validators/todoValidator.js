const { body, param, query } = require("express-validator");

const allowedStatus = ["pending", "in progress", "completed"];
const allowedSortFields = ["title", "dueDate", "createdAt", "status"];

exports.createTodoValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Todo title is required"),

  body("status")
    .optional()
    .isIn(allowedStatus)
    .withMessage("Invalid Todo status"),

  body("dueDate")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Invalid due date"),

  body("category")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("Invalid category ID")
];

exports.updateTodoValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Todo ID"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Todo title cannot be empty"),

  body("status")
    .optional()
    .isIn(allowedStatus)
    .withMessage("Invalid Todo status"),

  body("dueDate")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Invalid due date"),

  body("category")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("Invalid category ID"),

  body()
    .custom((value) => {
      const allowedFields = [
        "title",
        "description",
        "status",
        "dueDate",
        "category"
      ];

      const hasValidField = Object.keys(value).some((field) =>
        allowedFields.includes(field)
      );

      if (!hasValidField) {
        throw new Error("At least one valid field is required");
      }

      return true;
    })
];

exports.todoIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Todo ID")
];

exports.getTodosValidator = [
  query("status")
    .optional()
    .isIn(allowedStatus)
    .withMessage("Invalid Todo status filter"),

  query("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category ID"),

  query("sort")
    .optional()
    .custom((value) => {
      const fields = value.split(",");

      return fields.every((field) => {
        const fieldName = field.startsWith("-")
          ? field.slice(1)
          : field;

        return allowedSortFields.includes(fieldName);
      });
    })
    .withMessage("Invalid sort field"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
];