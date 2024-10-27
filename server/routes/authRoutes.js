import { Router } from "express";
import { login, logout, refreshToken, validate } from "../controllers/authController.js";
import { addUser } from "../controllers/userController.js";
import authCookie from "../middleware/authCookie.js";
import { loginValidation, registerValidation } from "../validators/authValidations.js";

const router = Router();

router.post("/register", registerValidation, addUser);
router.post("/login", loginValidation, login);
router.post("/logout",authCookie, logout);
router.post("/refresh-token", refreshToken);
router.get("/validate", authCookie, validate);

export default router;
