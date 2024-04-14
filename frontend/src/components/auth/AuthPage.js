// AuthPage.js

import React, { useState } from "react";
import Login from "./Login"; // Adjust the import path as necessary
import Register from "./Register"; // Adjust the import path as necessary
import "./AuthPage.css"; // Path to the CSS file for styling this component

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(false);

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        {isLoginView ? (
          <>
            <Login />
            <p className="auth-page__toggle-text">
              Don't have an account?{" "}
              <button onClick={toggleView} className="auth-page__toggle-button">
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p className="auth-page__toggle-text">
              Already have an account?{" "}
              <button onClick={toggleView} className="auth-page__toggle-button">
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
