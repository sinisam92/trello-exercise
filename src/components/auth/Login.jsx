import React, { useState, useRef } from "react";
import { useLocation } from "wouter";
import Button from "../common/Button";
import { Link } from "wouter";
import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../reducers/userSlice";

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

const Login = () => {
  const [error, setError] = useState("");
  const [_, navigate] = useLocation();

  const { users } = useSelector((state) => state.users);
  console.log("users AT useSelection", users);
  
  const dispatch = useDispatch();
  const { login } = useAuth();
  const formRef = useRef(null);

  return (
    <div className="flex justify-center items-center h-screen sm:w-3/4  sm:mx-auto">
      <div className="bg-white w-full rounded px-8 pt-6 pb-8 mb-4 md:shadow-md ">
        <h2 className="text-4xl font-bold mb-6 text-primary text-center">
          Login
        </h2>
        <Formik
          initialValues={{ username: "" }}
          validationSchema={Yup.object({
            username: Yup.string()
              .max(15, "Must be 15 characters or less")
              .min(3, "Must be 3 characters or more")
              .required("Required"),
          })}
          onSubmit={(values) => {
            const { username } = values;
            console.log("users --> login", users);
            
            const foundUser = users.find((user) => user.username === username);

            if (foundUser) {
              dispatch(setCurrentUser(foundUser));
              login();
              navigate("/projects");
            } else {
              setError("User not found");
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <TextInput
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
              />
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
