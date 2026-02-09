import React from "react";
import "./StatesSection.css"; // Import the CSS file

const stats = [
  { value: "5,000+", label: "Active Members" },
  { value: "1,200+", label: "Mentorships Created" },
  { value: "350+", label: "Job Placements" },
  { value: "98%", label: "Satisfaction Rate" },
];

const StatsSection = () => {
  return (
    <section className="states-container">
      <div className="stats-badge">Platform Impact</div>
      <h2 className="stats-title">Measuring our success through yours</h2>
      <p className="stats-description">
        Our platform is growing and making a significant impact on technical education and career advancement.
      </p>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stats-card">
            <h3 className="stats-value">{stat.value}</h3>
            <p className="stats-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
