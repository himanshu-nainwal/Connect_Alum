import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Mentors from "../../components/Mentors/Mentors";
import Events from "../../components/Events/Events";
import Jobs from "../../components/Jobs/Jobs";
import "./Student.css";

const Student = () => {
  const [activeTab, setActiveTab] = useState("mentors");
  // Create a ref for the tabs section
  const tabsRef = useRef(null);

  // Scroll to tabs section and set active tab to "mentors"
  const scrollToMentors = () => {
    setActiveTab("mentors");
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to tabs section and set active tab to "events"
  const scrollToEvents = () => {
    setActiveTab("events");
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="student-container">
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="badge">
              <p>Student Portal</p>
            </div>
            <h1>Connect with Industry Experts</h1>
            <p>
              Access mentorship, resources, and opportunities to accelerate your
              technical career
            </p>
            <div className="button-group">
              <button className="primary-button" onClick={scrollToMentors}>
                Find a Mentor <ArrowRight className="icon" />
              </button>
              <button className="secondary-button" onClick={scrollToEvents}>
                Browse Events
              </button>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="tabs-section" ref={tabsRef}>
          <div className="tabs-list">
            <button
              className={`tab-button ${activeTab === "mentors" ? "active" : ""}`}
              onClick={() => setActiveTab("mentors")}
            >
              Mentors
            </button>
            <button
              className={`tab-button ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
            <button
              className={`tab-button ${activeTab === "jobs" ? "active" : ""}`}
              onClick={() => setActiveTab("jobs")}
            >
              Jobs
            </button>
          </div>

          {/* Render Selected Tab Component */}
          <div className="tab-content">
            {activeTab === "mentors" && <Mentors />}
            {activeTab === "events" && <Events />}
            {activeTab === "jobs" && <Jobs />}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Student;
