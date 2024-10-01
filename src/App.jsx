import React, { useState } from "react";
import { Switch, Route, Redirect } from "wouter";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { useAuth } from "./contexts/AuthContext";
import Projects from "./components/pages/Projects";
import ProjectDetails from "./components/pages/ProjectDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { Header } from "./components/Header";
import Settings from "./components/pages/Settings";
import CardDetailsContainer from "./components/pages/CardDetailsContainer";
import UserCards from "./components/pages/UserCards";
import Info from "./components/pages/Info";
import { UsersProvider } from "./contexts/UsersContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AnimationProvider } from "./contexts/AnimationContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  const [isChildMenuOpen, setIsChildMenuOpen] = useState(false);

  return (
    <>
      <UsersProvider>
        <ThemeProvider>
          <AnimationProvider>
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
          </AnimationProvider>
        </ThemeProvider>
      </UsersProvider>
    </>
  );
};

export default App;
