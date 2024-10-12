import { body } from "express-validator";

const loginValidation = [
  body("username")
    .isString()
    .withMessage("Username must be a Strings")
    .notEmpty()
    .withMessage("Username is required"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required"),
];

// prettier-ignore
const registerValidation = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username is required"),
  body("firstName")
    .isString()
    .withMessage("First name must be a string")
    .notEmpty()
    .withMessage("First name is required"),
  body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .notEmpty()
    .withMessage("Last name is required"),
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required"),
  body("avatarUrl")
    .isString()
    .withMessage("Avatar URL must be a string")
    .optional(),
];

export { loginValidation, registerValidation };
