import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/userSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
