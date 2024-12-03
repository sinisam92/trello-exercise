import { body } from "express-validator";

export const projectValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must not exceed 50 characters")
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
