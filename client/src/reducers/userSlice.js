import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllUsers, getUsersByIds } from "../api/userServices";
import { addNewUser } from "../api/userServices";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsers();
      console.log("fetchAllUsers response", response);

      return response;
    } catch (error) {
      console.error("Failed to fetch all users:", error);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUsersByIds = createAsyncThunk(
  "users/fetchUsersByIds",
  async (userIds, { rejectWithValue }) => {
    try {
      const response = await getUsersByIds(userIds);
      return response;
    } catch (error) {
      console.error("Failed to fetch users by IDs:", error);
      return rejectWithValue(error.message);
    }
  },
);

export const registerNewUser = createAsyncThunk(
  "users/registerNewUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await addNewUser(newUser);
      return response;
    } catch (error) {
      console.error("Failed to register new user:", error);
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  users: null,
  loading: false,
  error: null,
  usersByIds: null,
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser(state, action) {
      state.users.push(action.payload);
      registerNewUser(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        console.log("fetchAllUsers.fulfilled", action);

        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsersByIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.usersByIds = action.payload;
      })
      .addCase(fetchUsersByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { registerUser } = userSlice.actions;

export default userSlice.reducer;
