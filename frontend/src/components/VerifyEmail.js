import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import customAxios from '../api/axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await customAxios.get(`/auth/verify-email?token=${token}`);
        setMessage(response.data.message);
        setTimeout(() => {
          navigate('/');
        }, 3000); // Redirect to login page after 5 seconds
      } catch (error) {
        console.error('Error: ', error)
        setMessage('Verification failed. Please try again.');
      }
    };

    if (token) {
        // console.log(token)
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
