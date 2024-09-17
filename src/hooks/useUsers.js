import { useState, useEffect } from "react";

const useUsers = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    return storedUsers || [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return { users, currentUser, setUsers };
};

export default useUsers;
