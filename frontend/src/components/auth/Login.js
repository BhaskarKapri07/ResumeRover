import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import "./Login.css";
import customAxios from "../../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await customAxios.post(
        "/auth/login",
        { email, password }
      );

      // Dispatch the login action with the received token and user information
      dispatch(login({ token: response.data.token }));

      // Store the token in local storage
      localStorage.setItem("token", response.data.token);

      navigate("/resume-upload"); // Navigate to the dashboard on successful login
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <h1 className="login__title">Unlock Your Next Star Employee</h1>
        <form onSubmit={handleLogin} className="login__form">
          <input
            type="email"
            placeholder="Enter email"
            className="login__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login__button">
            Sign In
          </button>
        </form>
        <p className="login__footer">
          Free demo version. Not for active commercial use. Intended for
          evaluation and testing purposes only.
        </p>
      </div>
    </div>
  );
};

export default Login;
