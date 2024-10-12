import { body } from "express-validator";

const userValidation = [
  body("username")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
];

export { userValidation };
