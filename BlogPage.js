import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import './BlogPage.css'; 

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

const BlogPage = () => {
    return (
      <div>
        <Navbar />
        <div className="blog-container">
          <h1>Yoga Insights</h1>
  
          {/* Blog Post 1 */}
          <article className="blog-post">
            <h2>Starting Your Yoga Journey: 5 Essential Tips for Beginners</h2>
            <p>Welcome to the world of yoga! As you begin your journey, remember that yoga is a personal experience. Here are five tips to get you started on the right foot:</p>
            <ul>
              <li>Choose the Right Class: Start with classes labeled as "beginner" or "all levels" to learn the basics at a comfortable pace.</li>
              <li>Listen to Your Body: Yoga teaches us to be in tune with our bodies. If a pose feels uncomfortable, modify it or take a break.</li>
              <li>Focus on Your Breath: Breathing is central to yoga. Pay attention to your breath to help center your mind and body.</li>
              <li>Practice Regularly: Consistency is key. Even a few minutes of daily practice can make a significant difference over time.</li>
              <li>Be Patient with Yourself: Progress in yoga is not linear. Celebrate the small victories and be patient as you grow in your practice.</li>
            </ul>
          </article>
  
          {/* Blog Post 2 */}
          <article className="blog-post">
            <h2>The Mental Health Benefits of Yoga</h2>
            <p>Yoga is not just a physical practice; it's a mental one as well. Regular yoga practice can have profound effects on your mental health, including:</p>
            <ul>
              <li>Reducing Stress: Yoga's meditative practices can help calm the mind, reducing stress and anxiety.</li>
              <li>Improving Concentration: The focus on breath and movement can enhance concentration and mental clarity.</li>
              <li>Boosting Mood: Yoga can increase serotonin levels, improving mood and creating feelings of well-being.</li>
              <li>Enhancing Self-awareness: Through yoga, you can cultivate a deeper understanding of your body and mind, leading to increased self-awareness and self-esteem.</li>
            </ul>
          </article>
  
          {/* Blog Post 3 */}
          <article className="blog-post">
            <h2>Yoga at Home: Creating Your Peaceful Sanctuary</h2>
            <p>Practicing yoga at home can be incredibly rewarding. Here’s how to create a peaceful yoga sanctuary in your own space:</p>
            <ul>
              <li>Choose a Quiet Corner: Find a spot in your home where you feel at ease and can practice without interruptions.</li>
              <li>Gather Your Tools: Essential yoga tools include a yoga mat, comfortable clothing, and perhaps a yoga block or strap to assist with certain poses.</li>
              <li>Set the Atmosphere: Consider adding elements like candles, incense, or calming music to enhance your practice environment.</li>
              <li>Make a Schedule: Consistency is key. Try to practice at the same time each day to establish a routine.</li>
              <li>Use Online Resources: There are many excellent online yoga classes available. Find a teacher or style that resonates with you and incorporate their lessons into your practice.</li>
            </ul>
          </article>
  
          {/* Blog Post 4 */}
          <article className="blog-post">
            <h2>Integrating Yoga into Your Daily Routine</h2>
            <p>Making yoga a part of your daily life can have a transformative effect. Here are some tips for integrating yoga into your day-to-day activities:</p>
            <ul>
              <li>Morning Stretch: Start your day with a few simple yoga stretches to awaken your body and mind.</li>
              <li>Breathing Breaks: Take short breaks throughout the day to focus on deep, conscious breathing, which can help reduce stress and increase energy.</li>
              <li>Yoga at Work: Incorporate seated yoga poses or stretches into your workday to relieve tension and improve posture.</li>
              <li>Evening Wind-Down: End your day with gentle yoga poses to relax your body and prepare for a restful sleep.</li>
            </ul>
          </article>
        </div>
      </div>
    );
  };
  
export default BlogPage;
