import { Router } from "express";
import { isUserLoggedIn } from "../middleware/authMiddleware.js";

import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import {
  registerValidation,
  updateUserValidation,
} from "../validators/authValidations.js";

const router = Router();

// prettier-ignore
router.route("/")
  .get(getAllUsers)
  .post(registerValidation, addUser);

// prettier-ignore
router.route("/:id")
  .get(isUserLoggedIn, getUserById)
  .delete(isUserLoggedIn, deleteUser)
  .put(isUserLoggedIn, updateUserValidation, updateUser);

export default router;
