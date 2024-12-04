import { body, param } from "express-validator";

export const listPostValidations = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("cards")
    .isArray()
    .withMessage("Items must be an array")
    .custom((items) => {
      if (!items.every((item) => typeof item === "string")) {
        throw new Error("All items must be strings");
      }
      return true;
    }),
  body("slug")
    .notEmpty()
    .withMessage("Slug is required")
    .isString()
    .withMessage("Slug must be a string"),
];

export const listPutValidations = [
  param("id").isUUID().withMessage("List ID must be a string"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("cards")
    .isArray()
    .withMessage("Items must be an array")
    .custom((items) => {
      if (!items.every((item) => typeof item === "string")) {
        throw new Error("All items must be strings");
      }
      return true;
    }),
  body("slug")
    .notEmpty()
    .withMessage("Slug is required")
    .isString()
    .withMessage("Slug must be a string"),
];
