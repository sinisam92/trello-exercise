import { Form, Formik, useField } from "formik";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { Link } from "wouter";
import * as Yup from "yup";

import { loginUser } from "../../reducers/authSlice";
import Button from "../common/Button";
import AnimatedLogo from "../common/loaders/AnimatedLogo";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className="shadow-md appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-danger mt-2">{meta.error}</div>
      ) : null}
    </>
  );
};

const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="relative">
        <input
          className="shadow-md appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
          type={showPassword ? "text" : "password"}
          {...field}
          {...props}
          value={field.value || ""}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-danger mt-2">{meta.error}</div>
      ) : null}
    </>
  );
};

const Login = () => {
  const [error, setError] = useState("");
  const [_, navigate] = useLocation();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const handleLogin = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const action = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(action)) {
        navigate(`projects`);
      } else if (loginUser.rejected.match(action)) {
        console.error("Login failed:", action.payload || action.error.message);
        // setError(action.payload?.message || action.error.message);
        setError("Incorect email or password");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };
  console.log("Error:", error);

  return (
    <div className="relative flex flex-col justify-center items-center h-screen ">
      <div className="absolute top-8 left-0">
        <AnimatedLogo />
      </div>
      <div className="flex justify-center items-center sm:w-3/4 sm:mx-auto md:w-1/2">
        <div className="bg-white w-full rounded px-8 pt-6 pb-8 mb-4 md:shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-primary text-center">
            Login
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .max(50, "Must be 35 characters or less")
                .min(3, "Must be 3 characters or more")
                .required("Required"),
              password: Yup.string()
                .max(50, "Must be 50 characters or less")
                .min(6, "Must be 6 characters or more")
                .required("Required")
                .matches(/^[a-zA-Z0-9]+$/, "No special characters allowed"),
            })}
            onSubmit={handleLogin}
          >
            {({ handleSubmit }) => (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <TextInput
                  label="Email"
                  name="email"
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                />
                {error && <p className="text-danger mt-2">{error}</p>}
                <div className="mt-4">
                  <PasswordInput
                    label="Password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
                <div className="flex flex-col gap-y-6 items-center justify-between mt-10">
                  <Button
                    variation="primary"
                    label="Sign In"
                    size="s"
                    type="submit"
                  />
                  <Link
                    href="register"
                    className="inline-block align-baseline font-bold text-sm text-primary hover:text-primaryHover"
                  >
                    <small>Do not have an account? - </small> Sign Up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;

Login.propTypes = {
  currentUser: PropTypes.object,
  projects: PropTypes.array,
  handleAddComment: PropTypes.func,
  project: PropTypes.object,
  list: PropTypes.object,
  thisCard: PropTypes.object,
  users: PropTypes.array,
  toggleOptions: PropTypes.func,
  openOptions: PropTypes.number,
  commentsIconRef: PropTypes.object,
  commentsOptionsRef: PropTypes.object,
  handleDeleteComment: PropTypes.func,
  props: PropTypes.object,
};

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

PasswordInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  password: PropTypes.string,
  placeholder: PropTypes.string,
};
