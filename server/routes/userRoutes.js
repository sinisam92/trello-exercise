import { Router } from "express";

import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { userValidation } from "../validators/userValidations.js";

const router = Router();

// prettier-ignore
router.route("/")
  .get(getAllUsers)
  .post(userValidation, addUser);

// prettier-ignore
router.route("/:id")
  .get(getUserById)
  .delete(deleteUser)
  .put(userValidation, updateUser);

export default router;
