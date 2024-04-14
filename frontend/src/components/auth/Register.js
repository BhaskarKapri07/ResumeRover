import React, { useState } from "react";
import "./Register.css"; // Ensure the CSS aligns with Login.css for consistent styling
import customAxios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await customAxios.post("/auth/signup", {
        email,
        password,
      });

      if (response) {
        navigate("/");
      }
      // Handle successful registration (e.g., navigate to login or dashboard)
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : "Registration failed. Please try again later.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="register">
      <div className="register__container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <h1 className="register__title">Create Your Account</h1>
        <form onSubmit={handleRegister} className="register__form">
          <input
            type="email"
            placeholder="Enter email"
            className="register__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="register__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="register__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="register__button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
