import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../reducers/authSlice";
import projectsReducer from "../reducers/projectSlice";
import usersReducer from "../reducers/userSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer,
    auth: authReducer,
  },
});

export default store;
