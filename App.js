import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; 
import HomePage from './HomePage';
import CoachesPage from './CoachesPage';
import ClassesPage from './ClassesPage';
import BookedClassesPage from './BookedClassesPage';
import Login from './Login';
import Signup from './Signup';
import BlogPage from './BlogPage';

function App() {
  return (
    <AuthProvider> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CoachesPage" element={<CoachesPage />} />
        <Route path="/ClassesPage" element={<ClassesPage />} />
        <Route path="/BookedClasses" element={<BookedClassesPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/BlogPage" element={<BlogPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;


