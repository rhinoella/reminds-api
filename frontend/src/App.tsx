import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DeviceRegistration from "./pages/DeviceRegistration";
import SurveySettings from "./pages/SurveySettings";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" Component={LoginPage} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/devices" Component={DeviceRegistration} />
        <Route path="/surveys" Component={SurveySettings} />
      </Switch>
    </Router>
  );
};

export default App;
