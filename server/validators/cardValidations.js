import { body, param } from "express-validator";

export const cardPostValidations = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot be longer than 500 characters"),
  body("dueDate").optional().isISO8601().withMessage("Due date must be a valid date"),
  body("status").optional().withMessage("Card has to have status"),
  body("assigned").optional().isArray().withMessage("Assigned must be an array"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
  body("comments").optional().isArray().withMessage("Comments must be an array"),
  body("commentsCount")
    .optional()
    .isNumeric()
    .withMessage("Comments count must be a number"),
];

export const cardPutValidations = [
  ...cardPostValidations,
  param("id").isUUID().withMessage("Card ID must be a string"),
];
