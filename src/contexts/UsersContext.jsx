import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users"));
      return storedUsers || [];
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const registerUser = (newUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      return updatedUsers;
    });
  };

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch (error) {
      console.error("Error parsing currentUser from localStorage:", error);
      return null;
    }
  })();

  return (
    <UsersContext.Provider
      value={{ users, setUsers, currentUser, registerUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider, UsersContext };

UsersProvider.propTypes = {
  children: PropTypes.node,
};
