// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); 

  useEffect(() => {
    // Check if user is logged in when the app loads
    axios.get('http://localhost:3001/isLoggedIn', { withCredentials: true })
      .then(response => {
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          setEmail(response.data.user.Email); 
          setUsername(response.data.user.Username); // Set username on initial check
        } else {
          setIsLoggedIn(false);
          setEmail('');
          setUsername(''); // Reset username when not logged in
        }
      })
      .catch(error => console.error("Error checking login status:", error));
  }, []);

  const value = {
    isLoggedIn,
    email,
    username, 
    login: (email, username) => { // Update login to accept username
      setIsLoggedIn(true);
      setEmail(email);
      setUsername(username); // Set username upon login
    },
    logout: () => {
      setIsLoggedIn(false);
      setEmail('');
      setUsername(''); // Reset username on logout
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
