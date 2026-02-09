import React from 'react';
import './Home.css';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import StatesSection from '../../components/StatesSection/StatesSection';
import CTASection from '../../components/CTASection/CTASection';

const Home = () => {
  return (
    <div className="homemain">
      <Hero/>
      <Features/>
      <StatesSection/>
      <CTASection/>




    </div>
  );
};

export default Home;