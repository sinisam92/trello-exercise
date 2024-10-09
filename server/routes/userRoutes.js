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

router.route("/").get(getAllUsers).post(userValidation, addUser);
router
  .route("/:id")
  .get(getUserById)
  .delete(deleteUser)
  .put(userValidation, updateUser);

export default router;
