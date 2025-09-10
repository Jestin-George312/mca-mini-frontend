import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Splash from "./pages/Splash";
import Student_dashboard from "./pages/student_dashboard";
import GlassAuth from "./pages/glassauth"; // keep it if needed
import Login from "./components/Login";
import Signup from "./components/signup";

// ✅ Protected Route component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Splash />} />

        {/* Auth pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Student_dashboard />
            </PrivateRoute>
          }
        />

        {/* Optional extra route */}
        <Route path="/glassauth" element={<GlassAuth />} />
      </Routes>
    </Router>
  );
};

export default App;
