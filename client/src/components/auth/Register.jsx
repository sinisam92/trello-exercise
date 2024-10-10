import { Form, Formik, useField } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "wouter";
import * as Yup from "yup";

import { registerUser } from "../../reducers/userSlice";
import Button from "../common/Button";

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

const Register = () => {
  const { users } = useSelector((state) => state.users);
  const [_, navigate] = useLocation();
  const dispatch = useDispatch();

  const handleRegister = (values, { setSubmitting, setErrors, resetForm }) => {
    const { username } = values;
    setSubmitting(true);

    if (users.some((user) => user.username === username)) {
      setErrors({ username: "Username is already taken" });
    } else {
      const newUser = {
        id: uuidv4(),
        username: username,
        defaultAvatar: username.charAt(0).toUpperCase(),
        avatarUrl: "",
      };

      dispatch(registerUser(newUser));
      resetForm();
      navigate("/login");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center h-screen sm:w-3/4 sm:mx-auto">
      <div className="bg-white w-full rounded px-8 pt-6 pb-8 mb-4 md:shadow-md">
        <h1 className="text-4xl text-primary text-center font-bold mb-4">
          Sign Up
        </h1>
        <Formik
          initialValues={{ username: "" }}
          validationSchema={Yup.object({
            username: Yup.string()
              .max(15, "Must be 15 characters or less")
              .min(3, "Must be 3 characters or more")
              .required("Required"),
          })}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
              />
              <div className="flex flex-col gap-y-6 items-center justify-between mt-10">
                <Button
                  variation="primary"
                  size="s"
                  label="Sign Up"
                  type="submit"
                  disabled={isSubmitting}
                />
                <Link
                  href="login"
                  className="inline-block align-baseline font-bold text-sm text-primary hover:text-primaryHover"
                >
                  <small>Already have an account? - </small> Sign In
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;

Register.propTypes = {
  users: PropTypes.array,
  registerUser: PropTypes.func,
};

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
