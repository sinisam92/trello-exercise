import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "wouter";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserCards from "./components/card-components/UserCards";
import CardDetailsContainer from "./components/card-details-components/CardDetailsContainer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LifelineLoader from "./components/common/loaders/lifeline/LifelineLoader";
import Header from "./components/header/Header";
import Info from "./components/info-components/Info";
import ProjectDetails from "./components/project-components/ProjectDetails";
import Projects from "./components/project-components/Projects";
import Settings from "./components/settings-components/Settings";
import { initializeAuth } from "./reducers/authSlice";
import { fetchProjects } from "./reducers/projectSlice";

// Disables loging in production
// TODO: Make more robust in the future, this was just a quick one to test
if (import.meta.VITE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  console.info = () => {};
}

const App = () => {
  const [isChildMenuOpen, setIsChildMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { isInitialized, status, isAuthenticated, user } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects"));
    if (!projects || projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch]);

  if (!isInitialized || status === "loading") {
    return <LifelineLoader />;
  }
  return (
    <>
      {isAuthenticated && (
        <div className="sticky top-0 w-full z-50  bg-primary">
          <Header setIsChildMenuOpen={setIsChildMenuOpen} />
        </div>
      )}
      <Switch>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <ProtectedRoute
          path="projects"
          component={() => <Projects isChildMenuOpen={isChildMenuOpen} />}
        />
        <ProtectedRoute path="projects/:projectId" component={ProjectDetails} />
        <ProtectedRoute
          path="projects/:projectId/card/:cardId"
          component={CardDetailsContainer}
        />
        <ProtectedRoute path="settings" component={Settings} />
        <ProtectedRoute path="info" component={Info} />
        <ProtectedRoute path="user/:userId/cards" component={UserCards} />
        <Route path="*">
          <Redirect to={isAuthenticated ? `/${user._id}/projects` : "/login"} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
