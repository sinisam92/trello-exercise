import React, { useState } from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "wouter";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserCards from "./components/card-components/UserCards";
import CardDetailsContainer from "./components/card-details-components/CardDetailsContainer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Header from "./components/header/Header";
import Info from "./components/info-components/Info";
import ProjectDetails from "./components/project-components/ProjectDetails";
import Projects from "./components/project-components/Projects";
import Settings from "./components/settings-components/Settings";
import { useAuth } from "./contexts/AuthContext";
import store from "./store/store";

const App = () => {
  const { isAuthenticated } = useAuth();

  const [isChildMenuOpen, setIsChildMenuOpen] = useState(false);

  return (
    <>
      <Provider store={store}>
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
          <ProtectedRoute
            path="projects/:projectId"
            component={ProjectDetails}
          />
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
      </Provider>
    </>
  );
};

export default App;
