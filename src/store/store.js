import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/userSlice";
import projectsReducer from "../reducers/projectSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer,
  },
});

export default store;
