import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createProject,
  deleteProjectService,
  getProjectById,
  getProjects,
  updateProjectService,
} from "../api/projectServices";

export const fetchProject = createAsyncThunk(
  "projects/fetchProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const data = await getProjectById(projectId);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAllProjects = createAsyncThunk(
  "projects/fetchAllProjects",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProjects();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createNewProject = createAsyncThunk(
  "projects/createNewProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await createProject(projectData);

      if (response.error) {
        return rejectWithValue(response.error);
      }

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (projectData, { rejectWithValue }) => {
    console.log("projectData", projectData);

    try {
      const response = await updateProjectService(projectData);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await deleteProjectService(projectId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    currentProject: null,
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentProject: (state, action) => {
      const projectId = action.payload;

      const currProject = state.projects.find(
        (project) => project._id === projectId,
      );

      if (currProject) {
        state.currentProject = currProject;
      } else {
        console.warn(`Project with ID ${projectId} not found in state`);
      }
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch single project
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all projects
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      // Create project
      .addCase(createNewProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.currentProject = action.payload;
      })
      .addCase(createNewProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;

        const index = state.projects.findIndex((project) => {
          return project._id === updatedProject._id;
        });

        if (index !== -1) {
          state.projects = [
            ...state.projects.slice(0, index),
            updatedProject,
            ...state.projects.slice(index + 1),
          ];
        } else {
          console.log("Project not found in state");
        }
        if (state.currentProject?._id === updatedProject._id) {
          state.currentProject = updatedProject;
        }

        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((p) => p.id !== action.payload);
        if (
          state.currentProject &&
          state.currentProject.id === action.payload
        ) {
          state.currentProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentProject, clearCurrentProject } = projectsSlice.actions;

export default projectsSlice.reducer;
