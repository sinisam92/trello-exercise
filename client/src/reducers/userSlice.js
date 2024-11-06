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
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  usersByIds: null,
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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
      })
      .addCase(registerNewUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        console.log("state before", state.users);
        console.log("action.payload", action.payload);

        state.users.push(action.payload);
        console.log("state after", state.users);
        state.status = "succeeded";
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
