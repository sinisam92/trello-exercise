import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { apiClient } from "../api/apiClient";
import { getProjects } from "../api/projectServices";

// const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
//   const response = await getProjects();
//   return response;
// });
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await getProjects();
    console.log("response", response);

    return response;
  },
);

const saveProjectsToLocalStorage = (projects) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

const initialState = {
  // projects: loadProjectsFromLocalStorage(),
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action) {
      state.projects.push(action.payload);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;

        saveProjectsToLocalStorage(state.projects);

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
