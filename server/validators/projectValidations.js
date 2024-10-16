import { body, param } from "express-validator";

const projectValidation = [
  // param("_id").isUUID().withMessage("ID must be a valid and unique UUID"),
  body("name")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters")
    .trim()
    .escape(),
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 550 })
    .withMessage("Description must not exceed 550 characters")
    .optional()
    .trim()
    .escape(),
  body("dueDate")
    .isDate()
    .withMessage("Due date must be a valid date")
    .trim()
    .escape()
    .optional(),
  body("assigned")
    .isArray()
    .withMessage("Assigned must be an array")
    .trim()
    .escape()
    .optional(),
  body("tags").isArray().withMessage("Tags must be an array").trim().escape().optional(),
  body("comments")
    .isArray()
    .withMessage("Comments must be an array")
    .trim()
    .escape()
    .optional(),
  body("lists")
    .isArray()
    .withMessage("Lists must be an array")
    .trim()
    .escape()
    .optional(),
];

// const addProjectValidation = [
//   ...projectValidation,
//   body("id").isUUID().withMessage("ID must be a valid and unique UUID").optional(),
// ];

export { projectValidation };
