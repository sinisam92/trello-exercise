import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../reducers/authSlice";
import cardReducer from "../reducers/cardSlice";
import commentReducer from "../reducers/commentSlice";
import listReducer from "../reducers/listSlice";
import projectsReducer from "../reducers/projectSlice";
import usersReducer from "../reducers/userSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer,
    auth: authReducer,
    lists: listReducer,
    cards: cardReducer,
    comments: commentReducer,
  },
});

export default store;
