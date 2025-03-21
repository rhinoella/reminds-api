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
import { ProtectedRoute } from "./components/protected-route";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { AuthProvider, useAuth } from "./components/AuthProvider";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="min-w-screen flex min-h-screen">
      {isAuthenticated && <Sidebar />}
      <div className="w-full">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/devices" element={<DeviceRegistration />} />
            <Route path="/surveys" element={<SurveySettings />} />
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/devices" replace />} />
          <Route path="*" element={<Navigate to="/devices" replace />} />
        </Routes>
      </div>
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
