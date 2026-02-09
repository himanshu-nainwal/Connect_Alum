import React from "react";
import "./Hero.css";

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-content">
                <span className="tagline">Connecting generations of knowledge</span>
                <h1>
                    Building <span className="highlight">meaningful</span> connections in
                    tech education
                </h1>
                <p>
                    Connect with alumni, find mentors, and advance your career through a
                    community of tech professionals.
                </p>
                <div className="hero-buttons">
                    <button className="primary-btn">Find a Mentor →</button>
                    <button className="secondary-btn">Join Alumni Network</button>
                </div>
                <div className="members-info">
                    <div className="stats-container">
                        {/* Active Members */}
                        <div className="stat-item">
                            <span className="emoji">👥</span>
                            <span className="stat-text">5K+ Active Members</span>
                        </div>

                        {/* Mentorships */}
                        <div className="stat-item">
                            <span className="emoji">📖</span>
                            <span className="stat-text">1.2K+ Mentorships</span>
                        </div>

                        {/* Job Placements */}
                        <div className="stat-item">
                            <span className="emoji">💼</span>
                            <span className="stat-text">300+ Job Placements</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero-image">
            <img src="f.png" alt="" style={{ borderRadius: "8px" }} />

            </div>
        </div>
    );
};

export default Hero;
