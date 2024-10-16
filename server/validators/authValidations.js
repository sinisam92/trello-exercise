import { body, param } from "express-validator";

const commonValidation = [
  body("email")
    .isEmail()
    .withMessage("Must be a valid email")
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail()
    .trim()
    .escape(),
];

const loginValidation = [
  ...commonValidation,
  body("password")
    .trim()
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required"),
];

// prettier-ignore
const registerValidation = [
  ...commonValidation,
  // param("_id")
  //   .isUUID()
  //   .withMessage("ID must be a valid and unique UUID"),
  // body("id")
  //   .isUUID()
  //   .withMessage("ID must be a valid and unique UUID")
  //   .optional(),
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .escape(),
  body("firstName")
    .isString()
    .withMessage("First name must be a string")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .escape(),
  body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .escape(),
  body("password")
    .trim()
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("avatarUrl")
    .isString()
    .withMessage("Avatar URL must be a string")
    .optional()
    .trim()
    .escape(),
];

// const updateUserValidation = [
//   ...registerValidation,
//   body("id").isUUID().withMessage("ID must be a valid and unique UUID").optional(),
// ];

export { loginValidation, registerValidation };
