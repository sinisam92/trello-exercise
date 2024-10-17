import { Router } from "express";
import {
  addListToProject,
  createProject,
  deleteProject,
  getAllProjects,
  getProjectWithLists,
  updateProject
} from "../controllers/projectController.js";
import authCookie from "../middleware/authCookie.js";
import { projectValidation } from "../validators/projectValidations.js";

const router = Router();

// prettier-ignore
router.route("/")
    .get(authCookie, getAllProjects)
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
