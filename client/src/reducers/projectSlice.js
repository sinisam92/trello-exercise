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
    console.log("projectData", projectData);

    try {
      const response = await createProject(projectData);
      console.log("response", response);

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
  async ({ projectId, projectData }, { rejectWithValue }) => {
    try {
      const response = await updateProjectService(projectId, projectData);

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
    loading: false,
    error: null,
  },
  reducers: {
    // setCurrentProject: (state, action) => {
    //   state.currentProject = action.payload;
    // },
    // clearCurrentProject: (state) => {
    //   state.currentProject = null;
    // },
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
        state.error = null;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading = false;
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
        state.loading = false;
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id,
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        state.currentProject = action.payload;
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

// export const { setCurrentProject, clearCurrentProject } = projectsSlice.actions;

export default projectsSlice.reducer;
