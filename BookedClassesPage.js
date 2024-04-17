import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './ClassesPage.css'; 

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">YOGABUDDY</div>
      <ul className="navbar-nav">
        <li className="nav-item"><Link to="/" className="nav-link">HOME</Link></li>
        <li className="nav-item"><Link to="/ClassesPage" className="nav-link">CLASSES</Link></li>
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

function BookedClassesPage() {
  const [bookedClasses, setBookedClasses] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Login');
    } else {
      fetchBookedClasses();
    }
  }, [isLoggedIn, navigate]);

  const fetchBookedClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/bookedClasses', { withCredentials: true });
      setBookedClasses(response.data);
    } catch (error) {
      console.error("Error fetching booked classes:", error);
    }
  };

  const cancelBooking = async (classID) => {
    try {
      const response = await axios.post('http://localhost:3001/cancelBooking', { classID }, { withCredentials: true });
      if (response.data.success) {
        alert("Booking canceled successfully!");
        fetchBookedClasses(); // Refresh the list of booked classes
      } else {
        alert("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Error canceling booking");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="classes-container">
        <h2>Booked Classes</h2>
        {bookedClasses.length > 0 ? (
          bookedClasses.map((bookedClass) => (
            <div key={bookedClass.classID} className="class-card">
              <h3>{bookedClass.title}</h3>
              <p>Date: {new Date(bookedClass.date).toLocaleDateString()}</p>
              <p>Time: {bookedClass.time}</p>
              <p>Duration: {bookedClass.duration} minutes</p>
              <p>Description: {bookedClass.description}</p>
              <button className="select-btn" onClick={() => cancelBooking(bookedClass.classID)}>Cancel</button>
            </div>
          ))
        ) : (
          <p>No classes booked yet.</p>
        )}
      </div>
    </div>
  );
}

export default BookedClassesPage;

