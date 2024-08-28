import { Route, Redirect } from "wouter";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route {...rest}>
      {isAuthenticated ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
