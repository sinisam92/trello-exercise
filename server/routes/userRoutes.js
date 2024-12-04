import { Router } from "express";

import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUsersByIds,
  updateUser,
} from "../controllers/userController.js";
import { registerValidation } from "../validators/authValidations.js";

const router = Router();

router.route("/many").get(getUsersByIds);

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
