import React from "react";
import "./App.css";
import AppRoutes from "./routes";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { logout } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Adjust path as necessary

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLightMode, setIsLightMode] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Navigate to login page after logout
  };
  

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", isLightMode ? "light" : "dark");
  }, [isLightMode]);

  return (
    <div className="App">
      <Header
        isLightMode={isLightMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout}      />

      <AppRoutes />
    </div>
  );
}

export default App;
