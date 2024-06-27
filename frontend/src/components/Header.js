import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { newAnalysis } from "../features/auth/authSlice"; 
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate hook for navigation
import "./Header.css";

const Header = ({ isLightMode, toggleTheme, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  const hideButtonPaths = ["/", "/login", "/signup", "/logout", "/verify-email"];

  const showButtons = !hideButtonPaths.includes(location.pathname);

  // Handler for navigating to the My Analyses page
  const navigateToMyAnalyses = () => {
    navigate("/my-analyses");
  };

  const handleNewAnalysis = () =>{
    dispatch(newAnalysis())
    navigate("/resume-upload");

  }

  // const handleLogin = () => {
  //   navigate("/login");
  // };

  // const handleRegister = () => {
  //   navigate("/register");
  // };
  

  return (
    <header className="header">
      <h1 className="header__logo" >ResumeRover</h1>
      <div className="header__actions">
        <button className="header__toggle" onClick={toggleTheme}>
          {isLightMode ? <FaSun /> : <FaMoon />}
        </button>
        {showButtons && (
          <button
            onClick={navigateToMyAnalyses}
            className="header__my-analyses-button"
          >
            My Analyses
          </button>
        )}
        {showButtons && (
          <button onClick={handleNewAnalysis} className="header__new-analyses-button">
            New Analysis
          </button>
        )}
        {showButtons && (
          <button onClick={handleLogout} className="header__logout-button">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
