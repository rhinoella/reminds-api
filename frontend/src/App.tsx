import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DeviceRegistration from "./pages/DeviceRegistration";
import SurveySettings from "./pages/SurveySettings";
import SurveyResponses from "./pages/SurveyResponses";
import { ProtectedRoute } from "./components/protected-route";
import "./App.css";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import ConfigSettings from "./pages/Configuration";
import { TrialRoutes } from "./pages/TrialRoutes";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="min-w-screen min-h-screen">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* Trial selection route */}
          <Route element={<TrialRoutes />}>
            <Route index element={<DeviceRegistration />} />
            <Route path="devices" element={<DeviceRegistration />} />
            <Route path="survey" element={<SurveySettings />} />
            <Route path="responses" element={<SurveyResponses />} />
            <Route path="config" element={<ConfigSettings />} />
          </Route>
          {/* Redirects */}
          <Route path="/" element={<Navigate to="/trials" replace />} />
          <Route path="*" element={<Navigate to="/trials" replace />} />
        </Route>
      </Routes>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
