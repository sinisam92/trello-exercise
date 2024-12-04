import { body } from "express-validator";
export const commentValidations = [
  body("text")
    .isString()
    .withMessage("Comment text must be a string")
    .isLength({ min: 1 })
    .withMessage("Comment text cannot be empty")
    .isLength({ max: 500 })
    .withMessage("Comment text cannot exceed 500 characters"),
];
