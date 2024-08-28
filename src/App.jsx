import { Switch, Route } from "wouter";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Projects from "./components/pages/Projects";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <ProtectedRoute path="projects" component={Projects} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
