import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";
import {
  projectValidation,
  addProjectValidation,
} from "../validators/projectValidations.js";
import { isUserLoggedIn } from "../middleware/authMiddleware.js";

const router = Router();

// prettier-ignore
router.route("/")
    .get(isUserLoggedIn, getAllProjects)
    .post(isUserLoggedIn, addProjectValidation, createProject);

// prettier-ignore
router.route("/:id")
  .get(isUserLoggedIn, getProjectById)
  .put(isUserLoggedIn, addProjectValidation, updateProject)
  .delete(isUserLoggedIn, deleteProject);

export default router;
