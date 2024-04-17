import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ClassesPage.css'; 
import axios from 'axios';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">YOGABUDDY</div>
      <ul className="navbar-nav">
        <li className="nav-item"><Link to="/" className="nav-link">HOME</Link></li>
        <li className="nav-item"><Link to="/ClassesPage" className="nav-link active">CLASSES</Link></li>
        <li className="nav-item"><Link to="/CoachesPage" className="nav-link">COACHES</Link></li>
        <li className="nav-item"><Link to="/BlogPage" className="nav-link">BLOG</Link></li>
      </ul>
      <div className="navbar-contact">
        {isLoggedIn ? (
          <>
            <button className="btn" onClick={() => navigate('/BookedClasses')}>View Bookings</button>
            <button className="btn login" onClick={logout}>Logout</button>
          </>
        ) : (
          <button className="btn login" onClick={() => navigate('/Login')}>Login</button>
        )}
      </div>
    </nav>
  );
};

function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Login');
    } else {
      fetchClasses();
    }
  }, [isLoggedIn, navigate]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/classes', { withCredentials: true });
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const selectClass = async (classID) => {
    try {
      const response = await axios.post('http://localhost:3001/bookClass', { classID }, { withCredentials: true });
      if (response.data.success) {
        alert("Class booked successfully!");
        fetchClasses(); 
      } else {
        alert("Failed to book class");
      }
    } catch (error) {
      console.error("Error booking class:", error);
      alert("Error booking class");
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="classes-container">
        <h2>Available Classes</h2>
        {classes.length > 0 ? (
          classes.map((yogaClass) => (
            <div key={yogaClass.classID} className="class-card">
              <h3>{yogaClass.title}</h3>
              <p>Date: {new Date(yogaClass.date).toLocaleDateString()}</p>
              <p>Time: {yogaClass.time}</p>
              <p>Duration: {yogaClass.duration} minutes</p>
              <p>Instructor: {yogaClass.instructorName}</p>
              <p>Description: {yogaClass.description}</p>
              <button className="select-btn" onClick={() => selectClass(yogaClass.classID)}>Select</button>
            </div>
          ))
        ) : (
          <p>No classes available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default ClassesPage;
