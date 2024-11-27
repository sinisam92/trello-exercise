import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createList,
  deleteListService,
  getListByProjectId,
  getLists,
  updateListService,
} from "../api/listServices";

// Fetch all lists
export const fetchAllLists = createAsyncThunk(
  "lists/fetchAllLists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLists();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Fetch a single list by ID
export const fetchListByProjectId = createAsyncThunk(
  "lists/fetchListById",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await getListByProjectId(projectId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Create a new list
export const createNewList = createAsyncThunk(
  "lists/createNewList",
  async (listData, { rejectWithValue }) => {
    try {
      const response = await createList(listData);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Update an  list
export const updateList = createAsyncThunk(
  "lists/updateList",
  async (listData, { rejectWithValue }) => {
    console.log("listData SLIce", listData);

    try {
      const response = await updateListService(listData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete a list
export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (listId, { rejectWithValue }) => {
    try {
      await deleteListService(listId);
      return listId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const listSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all lists
      .addCase(fetchAllLists.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchAllLists.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      // // Fetch single list
      // .addCase(getListByProjectId.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getListByProjectId.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.currentList = action.payload;
      // })
      // .addCase(getListByProjectId.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      // Create new list
      .addCase(createNewList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewList.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(action.payload);
        state.currentList = action.payload;
      })
      .addCase(createNewList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update list
      .addCase(updateList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.loading = false;
        const updatedList = action.payload;
        const index = state.lists.findIndex(
          (list) => list._id === updatedList._id,
        );
        if (index !== -1) {
          state.lists[index] = updatedList;
        }
        if (state.currentList && state.currentList._id === updatedList._id) {
          state.currentList = updatedList;
        }
      })
      .addCase(updateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete list
      .addCase(deleteList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = state.lists.filter((list) => list._id !== action.payload);
        if (state.currentList && state.currentList._id === action.payload) {
          state.currentList = null;
        }
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { setCurrentList, clearCurrentList } = listSlice.actions;

export default listSlice.reducer;
