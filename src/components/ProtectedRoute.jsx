import React from "react";
import { Route, Redirect } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route {...rest}>
      {isAuthenticated ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  component: PropTypes.func,
};
