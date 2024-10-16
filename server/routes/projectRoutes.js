import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";
import { projectValidation } from "../validators/projectValidations.js";
import { isUserLoggedIn } from "../middleware/authMiddleware.js";
import { addList } from "../controllers/listController.js";

const router = Router();

// prettier-ignore
router.route("/")
    .get( getAllProjects)
    .post(projectValidation, createProject);

// prettier-ignore
router.route("/:id")
  .get(isUserLoggedIn, getProjectById)
  .put(isUserLoggedIn, projectValidation, updateProject)
  .delete(isUserLoggedIn, deleteProject)

router.route("/:projectId").post(addList);

export default router;
