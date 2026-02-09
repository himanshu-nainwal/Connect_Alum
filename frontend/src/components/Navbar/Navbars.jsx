import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSignOutAlt,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [role, setRole] = useState(null); // Store role
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // Retrieve role from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole(null);
    navigate('/');
    window.location.reload(); // Refresh to update UI
  };

  return (
    <div className={`navbar ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <Link to='/' onClick={() => setMenu('home')}>
        <div className="logo">
          <FontAwesomeIcon icon={faGraduationCap} /> ConnectAlum
        </div>
      </Link>



      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
          Home
        </Link>



        {role === "student" && (
          <Link to='/student' onClick={() => setMenu('student')} className={menu === 'student' ? 'active' : ''}>
            Student
          </Link>
        )}

        {role === "alumni" && (
          <Link to='/alumni' onClick={() => setMenu('alumni')} className={menu === 'alumni' ? 'active' : ''}>
            Alumni
          </Link>
        )}

        <a href='#contact' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>
          Contact Us
        </a>
      </ul>

      <div className='navbar-right'>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <FontAwesomeIcon icon={faUser} />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/profile')}><FontAwesomeIcon icon={faUser} /> Edit Profile</li>
              {role === "student" && (
                <li onClick={() => navigate('/student')}><FontAwesomeIcon icon={faGraduationCap} /> Student Portal</li>
              )}
              {role === "alumni" && (
                <li onClick={() => navigate('/alumni')}><FontAwesomeIcon icon={faUser} /> Alumni Portal</li>
              )}
              <hr />
              <li onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
