import { createSlice } from "@reduxjs/toolkit";

const loadProjectsFromLocalStorage = () => {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
};

const saveProjectsToLocalStorage = (projects) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

const initialState = {
  projects: loadProjectsFromLocalStorage(),
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action) {
      state.projects = [...state.projects, action.payload];
      saveProjectsToLocalStorage(state.projects);
    },
    deleteProject(state, action) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
      saveProjectsToLocalStorage(state.projects);
    },
    updateProject(state, action) {
      const updatedProjects = state.projects.map((project) =>
        project.id === action.payload.id ? action.payload : project,
      );
      state.projects = updatedProjects;
      saveProjectsToLocalStorage(state.projects);
    },
    saveProjects(state, action) {
      state.projects = action.payload;
      saveProjectsToLocalStorage(state.projects);
    },
  },
});

export const { addProject, deleteProject, updateProject, saveProjects } =
  projectSlice.actions;

export default projectSlice.reducer;
