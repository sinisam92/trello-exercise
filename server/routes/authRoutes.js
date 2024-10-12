import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../validators/authValidations.js";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", logout);

export default router;
