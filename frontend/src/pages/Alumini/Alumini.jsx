import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Mentoring from "../../components/Mentoring/Mentoring";
import Networking from "../../components/Networking/Networking";
import Contribution from "../../components/Contribution/Contribution";
import MentorForm from "../../components/MentorForm/MentorForm"; // Import MentorForm
import "./Alumini.css";

const Alumini = () => {
  const [activeTab, setActiveTab] = useState("mentoring");
  const [showMentorForm, setShowMentorForm] = useState(false); // Track form visibility

  return (
    <div className="alumni-container">
      <main className="main-content">
        {/* If showMentorForm is true, render the MentorForm */}
        {showMentorForm ? (
          <MentorForm />
        ) : (
          <>
            {/* Hero section */}
            <section className="hero-section">
              <div className="hero-content">
                <div className="badge">
                  <p>Alumni Portal</p>
                </div>
                <h1>Give Back to Your Tech Community</h1>
                <p>Share your industry experience, mentor students, and connect with fellow alumni</p>
                <div className="button-group">
                  <button className="primary-button" onClick={() => setShowMentorForm(true)}>
                    Become a Mentor
                    <ArrowRight className="icon" />
                  </button>
                
                </div>
              </div>
            </section>

            {/* Main content tabs */}
            <section className="tabs-section">
              <div className="tabs-list">
                <button
                  className={`tab-button ${activeTab === "mentoring" ? "active" : ""}`}
                  onClick={() => setActiveTab("mentoring")}
                >
                  Mentoring
                </button>
                <button
                  className={`tab-button ${activeTab === "networking" ? "active" : ""}`}
                  onClick={() => setActiveTab("networking")}
                >
                  Event Scheduling
                </button>
                <button
                  className={`tab-button ${activeTab === "contribution" ? "active" : ""}`}
                  onClick={() => setActiveTab("contribution")}
                >
                  Post Job
                </button>
              </div>

              {/* Render Selected Tab Component */}
              <div className="tab-content">
                {activeTab === "mentoring" && <Mentoring />}
                {activeTab === "networking" && <Networking />}
                {activeTab === "contribution" && <Contribution />}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Alumini;
