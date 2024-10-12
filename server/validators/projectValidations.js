import { body } from "express-validator";

const projectValidation = [
  body("name")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters"),
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 550 })
    .withMessage("Description must not exceed 550 characters")
    .optional(),
  body("dueDate").isDate().withMessage("Due date must be a valid date").optional(),
  body("assigned").isArray().withMessage("Assigned must be an array").optional(),
  body("tags").isArray().withMessage("Tags must be an array").optional(),
  body("comments").isArray().withMessage("Comments must be an array").optional(),
];

export { projectValidation };
