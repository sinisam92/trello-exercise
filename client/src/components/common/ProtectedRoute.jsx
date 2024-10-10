import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route } from "wouter";

import { useAuth } from "../../contexts/AuthContext";

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
