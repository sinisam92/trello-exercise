import { useState } from "react";
import { Switch, Route, Redirect } from "wouter";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { useAuth } from "./contexts/AuthContext";
import Projects from "./components/pages/Projects";
import ProjectDetails from "./components/pages/ProjectDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { Header } from "./components/Header";
import Settings from "./components/pages/Settings";
import CardDetails from "./components/pages/CardDetails";
import UserCards from "./components/pages/UserCards";
import Info from "./components/pages/Info";

const App = () => {
  const { isAuthenticated } = useAuth();

  const [isChildMenuOpen, setIsChildMenuOpen] = useState(false);

  

  return (
    <>
      {isAuthenticated && (
        <div className="sticky top-0 h-[130px] w-full z-50 bg-white">
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
          component={CardDetails}
        />
        <ProtectedRoute path="settings" component={Settings} />
        <ProtectedRoute path="info" component={Info} />
        <ProtectedRoute path="user/:userId/cards" component={UserCards} />
        <Route path="*">
          <Redirect to={isAuthenticated ? "/projects" : "/login"} />
          // TODO: Deal with this when you decide what to do with it // this is
          here just to remind me if I change my mind and want to pass component
          insted of redirect...
          {/* {(params) => `404, Sorry the page ${params["*"]} does not exist!`} */}
        </Route>
      </Switch>
    </>
  );
};

export default App;
