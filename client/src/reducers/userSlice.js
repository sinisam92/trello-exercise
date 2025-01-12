import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAllUsers,
  getUsersByIds,
  updateUserService,
} from "../api/userServices";
import { addNewUser } from "../api/userServices";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsers();

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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser, { rejectWithValue }) => {
    console.log("updatedUser reducer", updatedUser);

    try {
      const response = await updateUserService(updatedUser);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
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
        state.users.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        );
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
