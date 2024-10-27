import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "wouter";

import LoadingSpinner from "./loaders/LoadingSpinner";

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated, isInitialized, status } = useSelector(
    (state) => state.auth,
  );

  const [_, navigate] = useLocation();

  useEffect(() => {
    // Redirect to login if not authenticated, but only after initialization
    if (isInitialized && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isInitialized, navigate]);

  if (!isInitialized || status === "loading") {
    return <LoadingSpinner />;
  }
  return <Component />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: PropTypes.object,
};

export default ProtectedRoute;
