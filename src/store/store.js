import { configureStore } from "@reduxjs/toolkit";

import projectsReducer from "../reducers/projectSlice";
import usersReducer from "../reducers/userSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer,
  },
});

export default store;
