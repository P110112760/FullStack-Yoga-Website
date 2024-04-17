import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import './HomePage.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // Removed email from destructuring

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


const HomePage = () => {
  const { isLoggedIn, username } = useAuth(); 
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="header">
        <Navbar />
      </header>
      <main className="main-content">
        <section className="hero">
          {isLoggedIn ? (
            <>
              <h1>Welcome, {username}</h1>
              <p>View your current bookings below!</p>
              <button className="btn btn-primary" onClick={() => navigate('/BookedClasses')}>View Bookings</button>
            </>
          ) : (
            <>
              <h1>YOGABUDDY TO SHAPE YOUR BODY</h1>
              <p>Discover the transformative power of Yoga with YogaBuddy.</p>
              <button className="btn btn-primary" onClick={() => navigate('/signup')}>Become a Member</button>
            </>
          )}
        </section>
      </main>
      <footer className="footer">
      </footer>
    </div>
  );
};


export default HomePage;



