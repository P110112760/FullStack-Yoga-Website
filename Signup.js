import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [signupStatus, setSignupStatus] = useState('');
  const navigate = useNavigate();

  const signupHandler = () => {
    axios.post('http://localhost:3001/signup', {
      Email: email,
      Password: password,
      Username: username
    }).then(response => {
      if (response.data.success) {
        setSignupStatus('Signup Successful. You can now log in.');
        setTimeout(() => navigate('/Login'), 2000);
      } else {
        setSignupStatus(response.data.message);
      }
    }).catch(error => {
      console.error("Axios error:", error);
      setSignupStatus('Signup failed due to a network error. Please try again.');
    });
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="inputField" />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="inputField" />
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="inputField" />
      <button onClick={signupHandler}>Sign Up</button>
      <h2>{signupStatus}</h2>
    </div>
  );
}

export default Signup;
