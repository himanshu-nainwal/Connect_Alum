import React, { useState } from "react";
import "./Contribution.css"; // Import CSS for styling

const Contribution = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    jobId: "",
    role: "",
    company: "",
    employmentType: "",
    remote: "",
    jobDescription: "",
    batchEligible: "",
    cgpa: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add logic to submit data to backend or perform other actions
  };

  return (
    <main className="contribution-container">
      <div className="heading">
        <h1>Post a Job Opening</h1>
        <p>Please fill out the details below to share a new job opening.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Job ID */}
        <div className="form-group">
          <label htmlFor="jobId">Job ID</label>
          <input
            type="text"
            id="jobId"
            name="jobId"
            placeholder="Enter a unique job ID"
            value={formData.jobId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        <div className="form-group">
          <label htmlFor="role">Role / Position</label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="e.g. Software Engineer, Marketing Intern"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        {/* Company */}
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="e.g. Acme Corp"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        {/* Employment Type */}
        <div className="form-group">
          <label htmlFor="employmentType">Employment Type</label>
          <select
            id="employmentType"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Remote or In-Person */}
        <div className="form-group">
          <label htmlFor="remote">Location</label>
          <select
            id="remote"
            name="remote"
            value={formData.remote}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Job Description */}
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            placeholder="Briefly describe the role, responsibilities, and requirements..."
            value={formData.jobDescription}
            onChange={handleChange}
            required
          />
        </div>

        {/* Batch Eligible */}
        <div className="form-group">
          <label htmlFor="batchEligible">Batch Eligible</label>
          <input
            type="text"
            id="batchEligible"
            name="batchEligible"
            placeholder="e.g. 2020-2023"
            value={formData.batchEligible}
            onChange={handleChange}
            required
          />
        </div>

        {/* Minimum CGPA */}
        <div className="form-group">
          <label htmlFor="cgpa">Minimum CGPA Requirement</label>
          <input
            type="number"
            step="0.1"
            id="cgpa"
            name="cgpa"
            placeholder="e.g. 7.0"
            value={formData.cgpa}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Submit Job Opening
        </button>
      </form>
    </main>
  );
};

export default Contribution;