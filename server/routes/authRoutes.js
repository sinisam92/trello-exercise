import { Router } from "express";
import { login, logout } from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../validators/authValidations.js";
import { addUser } from "../controllers/userController.js";
import { isUserLoggedIn } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerValidation, addUser);
router.post("/login", loginValidation, login);
router.post("/logout", isUserLoggedIn, logout);

export default router;
