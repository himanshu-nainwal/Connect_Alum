import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Jobs.css";
import config from "../../config";
import { StoreContext } from "../../context/StoreContext";

const Jobs = () => {
  const { role, user, token } = useContext(StoreContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  // Job Post Form State
  const [showPostForm, setShowPostForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', company: '', location: '', type: 'Full-time', description: '' });

  const fetchJobs = async () => {
    try {
      // Fetch local jobs from our backend
      const response = await axios.get(`${config.API_URL}/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login to post a job");

    try {
      await axios.post(`${config.API_URL}/jobs/create`, {
        ...newJob,
        posted_by: user?.id // Should be handled by backend middleware ideally, but sending for now
      }, {
        headers: { Authorization: `Bearer ${token}` } // Assuming backend checks token
      });
      alert("Job posted successfully!");
      setShowPostForm(false);
      setNewJob({ title: '', company: '', location: '', type: 'Full-time', description: '' });
      fetchJobs(); // Refresh list
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job");
    }
  };

  return (
    <div className="jobs-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Job & Internship Opportunities</h2>
        {role === 'alumni' && (
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            {showPostForm ? "Cancel" : "Post a Job"}
          </button>
        )}
      </div>

      {showPostForm && (
        <form onSubmit={handlePostJob} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Post a New Job</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <input
              type="text" placeholder="Job Title" required
              value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })}
              style={{ padding: '8px' }}
            />
            <input
              type="text" placeholder="Company" required
              value={newJob.company} onChange={e => setNewJob({ ...newJob, company: e.target.value })}
              style={{ padding: '8px' }}
            />
            <input
              type="text" placeholder="Location" required
              value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })}
              style={{ padding: '8px' }}
            />
            <select
              value={newJob.type} onChange={e => setNewJob({ ...newJob, type: e.target.value })}
              style={{ padding: '8px' }}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
            <textarea
              placeholder="Description" required
              value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })}
              style={{ padding: '8px', minHeight: '100px' }}
            />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Submit Job
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length > 0 ? (
        <>
          <ul className="jobs-list">
            {jobs.slice(0, visibleCount).map((job, index) => (
              <li key={job.id || index} className="job-item">
                <h3>{job.title}</h3>
                <p><strong>{job.company}</strong> - {job.location} <span style={{ fontSize: '0.8em', color: '#666' }}>({job.type})</span></p>
                <p style={{ marginTop: '5px' }}>{job.description?.substring(0, 100)}...</p>
                {job.users && <p style={{ fontSize: '0.9em', color: '#555' }}>Posted by: {job.users.name} ({job.users.college})</p>}

                {job.link ? (
                  <a href={job.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '10px', color: '#007bff' }}>
                    Apply / View Details
                  </a>
                ) : (
                  <button style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }} onClick={() => alert("Application feature coming soon!")}>
                    Apply Now
                  </button>
                )}
              </li>
            ))}
          </ul>
          {visibleCount < jobs.length && (
            <button className="show-more-btn" onClick={() => setVisibleCount(jobs.length)}>
              Show More
            </button>
          )}
        </>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default Jobs;
