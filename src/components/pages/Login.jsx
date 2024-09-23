import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "../Button";
import { Link } from "wouter";
import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

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
  const [location, navigate] = useLocation();

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
          onSubmit={(values, { setSubmitting }) => {
            const { username } = values;
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const foundUser = users.find((user) => user.username === username);

            if (foundUser) {
              localStorage.setItem("currentUser", JSON.stringify(foundUser));
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
