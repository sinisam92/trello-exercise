import { Router } from "express";
import {
  addListToProject,
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/projectController.js";
import authCookie from "../middleware/authCookie.js";
import {
  projectPostValidation,
  projectPutValidation,
} from "../validators/projectValidations.js";

const router = Router();

// prettier-ignore
router.route("/")
    // .get(authCookie, getAllProjects)
    .get(getAllProjects)
    .post(projectPostValidation, createProject);

// prettier-ignore
router.route("/:projectId")
    .get(getProjectById)
    // .get(getProjectWithListsAndCards)
    .put(projectPutValidation, updateProject)
    .delete( deleteProject)

// prettier-ignore
router.post("/:projectId/lists", addListToProject);

export default router;
