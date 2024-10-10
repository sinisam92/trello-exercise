import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProjects } from "../api/projectServices";

const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await getProjects();
  return response;
});

const loadProjectsFromLocalStorage = () => {
  const projects = localStorage.getItem("projects");
  console.log("Loading projects from localStorage", projects);
  return projects ? JSON.parse(projects) : [];
};

const saveProjectsToLocalStorage = (projects) => {
  console.log("Saving projects to localStorage", projects);
  localStorage.setItem("projects", JSON.stringify(projects));
};

const initialState = {
  projects: loadProjectsFromLocalStorage(),
  loading: false,
  error: null,
};

console.log("initialState => initialState", initialState);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action) {
      state.projects.push(action.payload);
      saveProjectsToLocalStorage(state.projects);
      console.log("Saved projects to localStorage:", state.projects);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        console.log("action.payload => action.payload", action.payload);

        state.projects = action.payload;
        console.log(
          "state.projects in caseafter fetch => state.projects",
          state.projects,
        );

        saveProjectsToLocalStorage(state.projects);
        console.log(
          "state.projects in caseafter save to LS => state.projects",
          state.projects,
        );

        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addProject, deleteProject, updateProject, saveProjects } =
  projectSlice.actions;

export default projectSlice.reducer;
export { fetchProjects };
