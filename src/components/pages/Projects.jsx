import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const Projects = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { logout } = useAuth();
  return (
    <div>
      <h2>Hello,{currentUser.username} </h2>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Projects;
