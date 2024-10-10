import { Router } from "express";
import { getAllProjects } from "../controllers/projectController.js";

const router = Router();

router.route("/").get(getAllProjects);

export default router;
