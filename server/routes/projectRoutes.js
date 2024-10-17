import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
  addListToProject,
  getProjectWithLists,
} from "../controllers/projectController.js";
import { projectValidation } from "../validators/projectValidations.js";
import { isUserLoggedIn } from "../middleware/authMiddleware.js";

const router = Router();

// prettier-ignore
router.route("/")
    .get(getAllProjects)
    .post(projectValidation, createProject);

// prettier-ignore
router.route("/:id")
  // .get(getProjectById)
  .put( projectValidation, updateProject)
  .delete( deleteProject)

// prettier-ignore
router.post("/:projectId/lists", addListToProject);
router.get("/:projectId", getProjectWithLists);

export default router;
