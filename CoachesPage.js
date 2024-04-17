import React from 'react';
import { useAuth } from './AuthContext'; 
import { Link, useNavigate } from 'react-router-dom';
import './CoachesPage.css';
import sarahImage from './sarah.jpg'; 
import johnImage from './john.jpg'; 
import miaImage from './mia.jpg'; 
import alexImage from './alex.jpg'; 

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">YOGABUDDY</div>
      <ul className="navbar-nav">
        <li className="nav-item"><Link to="/" className="nav-link">HOME</Link></li>
        <li className="nav-item"><Link to="/ClassesPage" className="nav-link">CLASSES</Link></li>
        <li className="nav-item active"><Link to="/CoachesPage" className="nav-link">COACHES</Link></li>
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

const CoachCard = ({ name, surname, description, image }) => {
  return (
    <div className="coach-card">
      <img src={image} alt={`${name} ${surname}`} className="coach-image" />
      <div className="coach-info">
        <h3 className="coach-name">{name} {surname}</h3>
        <p className="coach-description">{description}</p>
      </div>
    </div>
  );
};

const CoachesPage = () => {
  const { isLoggedIn } = useAuth();
  const coaches = [
    { name: 'Sarah', surname: 'Smith', description: 'Experienced fitness coach with a passion for helping clients achieve their goals.', image: sarahImage },
    { name: 'John', surname: 'Doe', description: 'Dedicated sports professional with a track record of team leadership and personal coaching.', image: johnImage },
    { name: 'Mia', surname: 'Johnson', description: 'Certified yoga instructor with over 5 years of experience in mindfulness and stress relief.', image: miaImage },
    { name: 'Alex', surname: 'Brown', description: 'Dynamic personal trainer specializing in high-intensity interval training and strength conditioning.', image: alexImage }
  ];

  return (
    <div className="coaches-page">
      <Navbar />
      <main className="coaches-content">
        <div className="coaches-grid">
          {coaches.map(coach => <CoachCard key={`${coach.name}-${coach.surname}`} {...coach} />)}
        </div>
      </main>
    </div>
  );
};

export default CoachesPage;
