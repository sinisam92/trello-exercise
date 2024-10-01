import React, { useState } from "react";
import { Switch, Route, Redirect } from "wouter";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useAuth } from "./contexts/AuthContext";
import Projects from "./components/project-components/Projects";
import ProjectDetails from "./components/project-components/ProjectDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Header from "./components/header/Header";
import Settings from "./components/settings-components/Settings";
import CardDetailsContainer from "./components/card-details-components/CardDetailsContainer";
import UserCards from "./components/card-components/UserCards";
import Info from "./components/info-components/Info";

const App = () => {
  const { isAuthenticated } = useAuth();

  const [isChildMenuOpen, setIsChildMenuOpen] = useState(false);

  return (
    <>
      {isAuthenticated && (
        <div className="sticky top-0 h-[130px] w-full z-50  bg-primary">
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
          <Redirect to={isAuthenticated ? "/projects" : "/login"} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
