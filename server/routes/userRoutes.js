import { Router } from "express";

import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import {
  registerValidation,
  // updateUserValidation,
} from "../validators/authValidations.js";

const router = Router();

// prettier-ignore
router.route("/")
  .get(getAllUsers)
  .post(registerValidation, addUser);

// prettier-ignore
router.route("/:id")
  .get( getUserById)
  .delete( deleteUser)
  .put( updateUser);

export default router;
