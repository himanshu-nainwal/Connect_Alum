import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbars';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { StoreContext } from './context/StoreContext';
import Student from './pages/Student/Student';
import Alumini from './pages/Alumini/Alumini';
import Profile from './components/Profile/Profile';

const App = () => {

  const { showLogin, setShowLogin } = useContext(StoreContext); // Use context


  return (
    <main>
      {showLogin && <LoginSignup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<Student />} />
          <Route path="/alumni" element={<Alumini />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </main>


  );
};

export default App;
