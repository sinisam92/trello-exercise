import { Form, Formik, useField } from "formik";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "wouter";
import * as Yup from "yup";

import { registerNewUser } from "../../reducers/userSlice";
import Button from "../common/Button";

//custom text input component
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
  const [_, navigate] = useLocation();
  const dispatch = useDispatch();
  const handleRegister = async (
    values,
    { setSubmitting, setErrors, resetForm },
  ) => {
    const { username, firstName, lastName, email, password } = values;
    setSubmitting(true);

    try {
      const newUser = {
        username,
        firstName,
        lastName,
        email,
        password,
        role: "user",
        createdProjects: [],
        memberProjects: [],
        defaultAvatar: username.charAt(0).toUpperCase(),
        avatarUrl: "",
      };

      const resultAction = await dispatch(registerNewUser(newUser));
      if (
        registerNewUser.fulfilled.match(resultAction) &&
        !resultAction.payload.error
      ) {
        resetForm();
        navigate("/login");
      } else {
        setErrors({
          email: resultAction.payload.error || "An error occurred",
        });
      }
    } catch (error) {
      setErrors({ email: error.message });
    }

    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center h-screen sm:w-3/4 sm:mx-auto md:w-1/2">
      <div className="bg-white w-full rounded px-8 pt-6 pb-8 mb-4 md:shadow-md">
        <h1 className="text-4xl text-secundary text-center font-bold mb-4">
          Sign Up
        </h1>
        <Formik
          initialValues={{
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "user",
            createdProjects: [],
            memberProjects: [],
            defaultAvatar: "",
            avatarUrl: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .max(15, "Must be 15 characters or less")
              .min(3, "Must be 3 characters or more")
              .required("Required"),
            firstName: Yup.string()
              .max(30, "Must be 30 characters or less")
              .min(2, "Must be 3 characters or more")
              .required("Required"),
            lastName: Yup.string()
              .max(30, "Must be 30 characters or less")
              .min(2, "Must be 3 characters or more")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .max(50, "Must be 50 characters or less")
              .min(3, "Must be 3 characters or more")
              .required("Required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .max(50, "Password must be at most 50 characters")
              .required("This field is required")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
              ),
            confirmPassword: Yup.string().when("password", {
              is: (val) => (val && val.length > 0 ? true : false),
              then: () =>
                Yup.string().oneOf(
                  [Yup.ref("password")],
                  "Password and confirm password must match",
                ),
            }),
          })}
          onSubmit={handleRegister}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <TextInput
                id="username"
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
              />
              <TextInput
                id="firstName"
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
              />
              <TextInput
                id="lastName"
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
              />
              <TextInput
                id="email"
                label="Email"
                name="email"
                type="text"
                placeholder="Enter your email"
              />

              <TextInput
                id="password"
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <TextInput
                id="confirmPassword"
                label="Password Confirmation"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
              />
              <div className="flex flex-col gap-y-6 items-center justify-between mt-10">
                <Button
                  variation="primary"
                  size="s"
                  label="Sign Up"
                  type="submit"
                  extraClasses={`${!isValid ? "cursor-not-allowed bg-gray-700 hover:bg-gray-700" : ""}`}
                  disabled={!isValid}
                  isLoading={isSubmitting}
                />
                <Link
                  href="login"
                  className="inline-block align-baseline font-bold text-sm text-primaryTextColor hover:text-primaryHover"
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
  registerNewUser: PropTypes.func,
};

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
