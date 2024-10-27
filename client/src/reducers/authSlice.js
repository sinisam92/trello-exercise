import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { login, logoutUser } from "../api/authServices";
import { refreshAccessToken } from "../api/authServices";

//  sets cookies
const setCookie = (name, value, options = {}) => {
  Cookies.set(name, value, { ...options, secure: true, sameSite: "strict" });
};

// removes cookies
// const removeCookie = (name) => {
//   Cookies.remove(name);
// };

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      setCookie("accessToken", data.accessToken, { expires: 1 / 24 });
      setCookie("refreshToken", data.refreshToken, { expires: 7 });
      return data;
    } catch (error) {
      console.error("Error logging in:", error);
      return rejectWithValue(error.message || "Login failed");
    }
  },
);

export const initializeAuth = createAsyncThunk("auth/initialize", async () => {
  try {
    const result = await refreshAccessToken();
    if (result.accessToken) {
      return { user: result.user, accessToken: result.accessToken };
    }
  } catch (error) {
    console.error("Failed to initialize auth:", error);
  }
  return null;
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitialized: false,
  status: "idle",
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(initializeAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isInitialized = true;
        if (action.payload) {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.accessToken = null;
          state.isAuthenticated = false;
        }
        state.status = "idle";
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isInitialized = true;
        state.status = "idle";
        state.isAuthenticated = false;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.status = "idle";
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
