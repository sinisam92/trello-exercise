import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useRoute } from "wouter";

import LoadingSpinner from "./loaders/LoadingSpinner";

const ProtectedRoute = ({ component: Component, path }) => {
  const { isAuthenticated, isInitialized, status } = useSelector(
    (state) => state.auth,
  );
  const [, navigate] = useLocation();
  const [match, params] = useRoute(path);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isInitialized, navigate]);

  if (!isInitialized || status === "loading") {
    return <LoadingSpinner />;
  }

  if (!match) {
    return null;
  }

  return <Component {...params} />;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};
