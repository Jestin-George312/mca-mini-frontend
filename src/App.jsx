import React from "react";
import { ThemeProvider, CssBaseline } from '@mui/material';
import getTheme from './theme';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Splash from "./pages/Splash";
import Student_dashboard from "./pages/student_dashboard";
import GlassAuth from "./pages/glassauth"; // Optional route
import Login from "./components/Login";
import Signup from "./components/signup";
import StudySmartDashboard from "./components/mat_gem";
import TimetablePage from './components/Time_table';
import Material_tab from "./components/material_tab";
import Landingpage from "./components/landingpaage";
import Quiz_Material from "./components/quiz_material";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const theme = getTheme('light');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
        
          <Route path="/" element={<Splash />} />
          <Route path="/upload"  element={<Material_tab/>}/>
     <Route path="/quiz" element={<Quiz_Material />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Student_dashboard />
              </PrivateRoute>
            }
          />

          <Route path="/glassauth" element={<GlassAuth />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;