import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "wouter";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { useAuth } from "./contexts/AuthContext";
import Projects from "./components/pages/Projects";
import ProjectDetails from "./components/pages/ProjectDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { Header } from "./stories/Header";

const App = () => {
  const { isAuthenticated } = useAuth(); 

  const [username, setUsername] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        const parsedUser = JSON.parse(currentUser);
        setUsername(parsedUser.username);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        setUsername("");
      }
    }
  }, []);
  
  return (
    <>
      {isAuthenticated && <Header username={username} />}
      <Switch>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <ProtectedRoute path="projects" component={Projects} />
        <ProtectedRoute path="projects/:id" component={ProjectDetails} />
        <Route path="*">
          <Redirect to={isAuthenticated ? "/projects" : "/login"} />
          // TODO: Deal with this when you decide what to do with it
          // this is here just to remind me if I change my mind and want to pass compoenent insted of redirect...
          {/* {(params) => `404, Sorry the page ${params["*"]} does not exist!`} */} 
        </Route>
      </Switch>
    </>
  );
};

export default App;
