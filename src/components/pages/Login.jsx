import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "../../stories/Button";
import { Link } from "wouter";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [location, navigate] = useLocation();

  const { login } = useAuth();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.username === username)) {
      localStorage.setItem("currentUser", JSON.stringify({ username }));
      login();
      navigate("/projects");
    } else {
      setError("User not found");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-full rounded px-8 pt-6 pb-8 mb-4 md:shadow-md ">
        <h2 className="text-4xl font-bold mb-6 text-primary text-center">Login</h2>
        <form>
          <div className="mb-4 mx-auto">
            <label
              className="block text-primary text-md font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-6 items-center justify-between mt-10">
            <Button
              variation="primary"
              label="Sign In"
              size="s"
              onClick={handleLogin}
            />
            <Link
              href="register"
              className="inline-block align-baseline font-bold text-sm text-primary hover:text-primaryHover"
            >
            <small>Do not have an account? - </small>  Sign Up
            </Link>
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
