import React, { useState } from "react";
import "./Register.css"; 
import emailjs from 'emailjs-com';
import customAxios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();
  


  emailjs.init('ozDaQA89xcZyUyBp3')

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage(""); 
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
        // console.log(response.data)

        const templateParams = {
          user_email: email,
          verify_link: `hhttps://resume-rover.vercel.app/verify-email?token=${response.data.token}` 
        }

        emailjs.send('service_p8h4vhi', 'template_6uptjsg', templateParams)
        .then((result) => {
          console.log('Email sent : ', result.text);
          setSuccessMessage("Registration successful! Please check your email to verify your account.");
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }, (error) =>{
          console.error('Error sending email: ', error.text)
          setErrorMessage("Failed to send verification email. Please try again later.");
        })
      }
      // Handle successful registration (e.g., navigate to login or dashboard)
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : "Registration failed. Please try again later.";
      setErrorMessage(message);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <div className="register">
      <div className="register__container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
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
          <button type="submit" className="register__button" onClick={handleRegister}>
            Register
          </button>
        </form>
        <p className="register__footer">
          Free demo version. Not for active commercial use. Intended for
          evaluation and testing purposes only.
        </p>
        <p className="register-page__toggle-text">
              Already have an account?{" "}
              <button onClick={handleLogin} className="register-page__toggle-button">
                Login here
              </button>
            </p>
      </div>
    </div>
  );
};

export default Register;
