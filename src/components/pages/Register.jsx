import { useState } from "react";
import { Button } from "../../stories/Button";
import { useLocation, Link } from "wouter";

const Register = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [location, navigate] = useLocation();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.username === username)) {
      setError("Username is already taken");
    } else if (!username || username.trim() === "") {
      setError("Username is required");
    } else if (username.length < 2) {
      setError("Username must be at least 2 characters");
    } else {
      const newUser = { username };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      setError("");
      setUsername("");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center bg-white w-full rounded px-8 pt-6 pb-8 mb-4 md:shadow-md ">
        <h1 className="text-4xl text-primary font-bold mb-4">Sign Up</h1>
        {error && <p className="text-danger text-xl my-2">{error}</p>}
        <form className="w-full">
          <div className="mb-4 ">
            <label
              className="block text-primary text-md font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-y-6 items-center justify-between mt-10">
            <Button
              variation="primary"
              size="s"
              label="Sign Up"
              onClick={handleRegister}
            />
             <Link
              href="login"
              className="inline-block align-baseline font-bold text-sm text-primary hover:text-primaryHover"
            >
            <small>Already have an account? - </small>  Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
