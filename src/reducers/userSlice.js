import { createSlice } from "@reduxjs/toolkit";

const loadUsersFromLocalStorage = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};
const loadCurrentUserFromLocalStorage = () => {
  const currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
};

const saveCurrentUserToLocalStorage = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

const removeCurrentUserFromLocalStorage = () => {
  localStorage.removeItem("currentUser");
};

const registerNewUser = (newUser) => {
    const users = loadUsersFromLocalStorage();
    const updatedUsers = [...users, newUser];
    saveUsersToLocalStorage(updatedUsers);
    return updatedUsers;
};

const initialState = {
  users: loadUsersFromLocalStorage(),
  currentUser: loadCurrentUserFromLocalStorage(),
};
console.log("initialState", initialState);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      saveUsersToLocalStorage(state.users);
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      saveCurrentUserToLocalStorage(action.payload);
    },
    removeCurrentUser(state) {
      state.currentUser = null;
      removeCurrentUserFromLocalStorage();
    },
    registerUser(state, action) {
        state.users.push(action.payload);
        registerNewUser(action.payload);
    },
  },
});

export const { setUsers, setCurrentUser, removeCurrentUser, registerUser } =
  userSlice.actions;

export default userSlice.reducer;
