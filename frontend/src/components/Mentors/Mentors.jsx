import { useEffect, useState, useContext } from "react";
import "./Mentors.css";
import config from "../../config";
import { StoreContext } from "../../context/StoreContext";

const Mentors = () => {
  const { user } = useContext(StoreContext);
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [filterMyCollege, setFilterMyCollege] = useState(false);

  useEffect(() => {
    let url = `${config.API_URL}/user/alumni`;
    if (filterMyCollege && user?.college) {
      url += `?college=${encodeURIComponent(user.college)}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch mentors");
        }
        return res.json();
      })
      .then((data) => setMentors(data))
      .catch((err) => setError(err.message));
  }, [filterMyCollege, user]);

  const visibleMentors = showAll ? mentors : mentors.slice(0, 6);

  return (
    <div className="jobs-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Mentors & Alumni</h2>
        {user?.college && (
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={filterMyCollege}
              onChange={(e) => setFilterMyCollege(e.target.checked)}
            />
            Show Alumni from {user.college}
          </label>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      <ul className="jobs-list">
        {visibleMentors.length > 0 ? (
          visibleMentors.map((mentor) => (
            <li
              key={mentor.id}
              className="job-item"
              style={{ padding: "15px", borderBottom: "1px solid #ccc" }}
            >
              <h3 style={{ marginBottom: "5px" }}>
                {mentor.name || `${mentor.first_name} ${mentor.last_name}`}
              </h3>
              {mentor.college && <p><strong>College:</strong> {mentor.college}</p>}
              {mentor.job_role && <p><strong>Role:</strong> {mentor.job_role}</p>}
              {mentor.company && <p><strong>Company:</strong> {mentor.company}</p>}

              {/* Fallback to old fields if new ones are empty (for backward compatibility during migration) */}
              {!mentor.company && mentor.organization && <p><strong>Organization:</strong> {mentor.organization}</p>}
              {!mentor.job_role && mentor.expertise && <p><strong>Expertise:</strong> {mentor.expertise}</p>}

              <button
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => alert(`Connecting with ${mentor.name}`)}
              >
                Connect
              </button>
            </li>
          ))
        ) : (
          <p className="no-mentors">No mentors found from your college.</p>
        )}
      </ul>

      {mentors.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            marginTop: "15px",
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "block",
            margin: "0 auto",
          }}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default Mentors;
