import React from 'react';
import './Mentoring.css';

const Mentoring = () => {
  // Sample alumni data
  const alumniData = [
    {
      id: 2,
      name: "Vivek Rawat",
      graduationYear: 2015,
      position: "Product Manager",
      company: "Microsoft",
      achievements: ["Launched 3 successful products", "Featured in Forbes 30 Under 30", "Startup advisor"],
      photo: "https://placehold.co/150x150"
    },
    // Add more alumni objects
  ];

  return (
    <div className="alumni-showcase">
      <div className="showcase-header">
        <h1>Alumni Achievements</h1>
        <p>Celebrating the success stories of our distinguished alumni</p>
      </div>

      

      <div className="alumni-grid">
        {alumniData.map(alumnus => (
          <div key={alumnus.id} className="alumni-card">
            <div className="card-header">
              <img 
                src={alumnus.photo} 
                alt={alumnus.name} 
                className="alumni-photo"
              />
              <div className="alumni-info">
                <h3>{alumnus.name}</h3>
                <p className="graduation-year">Class of {alumnus.graduationYear}</p>
                <p className="current-position">
                  {alumnus.position} at {alumnus.company}
                </p>
              </div>
            </div>
            
            <div className="achievements">
              <h4>Notable Achievements</h4>
              <ul>
                {alumnus.achievements.map((achievement, index) => (
                  <li key={index} className="achievement-item">
                    <span className="trophy-icon">🏆</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <h2>1500+</h2>
          <p>Alumni Network</p>
        </div>
        <div className="stat-item">
          <h2>85%</h2>
          <p>Career Growth</p>
        </div>
        <div className="stat-item">
          <h2>200+</h2>
          <p>Startups Founded</p>
        </div>
      </div>
    </div>
  );
};

export default Mentoring;