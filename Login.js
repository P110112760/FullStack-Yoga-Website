import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login function from context

  const loginHandler = () => {
    axios.post('http://localhost:3001/login', {
      Email: email, 
      Password: password
    }, { withCredentials: true })
    .then(response => {
      if (response.data.loggedIn) {
        setLoginStatus('Login Successful');
        login(response.data.user.Email, response.data.user.Username); // Pass Username to login method
        navigate('/');
      } else {
        setLoginStatus('User not found');
      }
    })
    .catch(error => {
      console.error("Axios error:", error);
      setLoginStatus('Login failed due to a network error. Please try again.');
    });
  };

  return (
    <div className="container">
      <button className="backToHome" onClick={() => navigate('/')}>Back to Home</button>
      <h1>Login</h1>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginHandler}>Login</button>
      <h2>{loginStatus}</h2>
      <div className="accountCreationPrompt">
        Don't have an account? <a href="/Signup">Create one</a>.
      </div>
    </div>
  );
}

export default Login;


