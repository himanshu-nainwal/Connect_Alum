import React from "react";
import "./Features.css"; // Import the CSS file

const features = [
  {
    icon: "🔍",
    title: "Searchable Alumni Directory",
    description: "Find and connect with alumni from your field, filtered by industry, graduation year, location, and expertise.",
  },
  {
    icon: "👥",
    title: "Mentorship Matching",
    description: "Our intelligent algorithm pairs students with alumni mentors based on career goals, skills, and interests.",
  },
  {
    icon: "💼",
    title: "Exclusive Job Postings",
    description: "Access job and internship opportunities posted specifically for our community by alumni and partner companies.",
  },
  {
    icon: "💬",
    title: "Knowledge Forums",
    description: "Engage in discussions with peers and industry professionals on technical topics and career development.",
  },
  {
    icon: "📅",
    title: "Event Scheduling",
    description: "Easily organize and join virtual events, webinars, and alumni reunions through our integrated calendar.",
  },
  {
    icon: "🤝",
    title: "Community Projects",
    description: "Collaborate on real-world projects with fellow students and alumni to build your portfolio and network.",
  },
];

const Features = () => {
  return (
    <div className="features-section">
      {/* Section Title */}
      <div>
        <h2 className="features-title">Everything You Need to Build Your Professional Network</h2>
        <p className="features-description">
          Our platform offers a comprehensive suite of tools designed to connect alumni and students, fostering meaningful professional relationships.
        </p>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-box">
            <div className="flex">
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
            </div>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
