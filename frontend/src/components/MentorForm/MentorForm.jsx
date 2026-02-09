import React, { useState } from "react";
import "./MentorForm.css"; // Import the external CSS file

const MentorForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profileLink: "",
    communication: [],
    organization: "",
    location: "",
    experience: "",
    expertise: "",
    linkedin: "",
    instagram: "",
    twitter: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        communication: checked
          ? [...prevData.communication, value]
          : prevData.communication.filter((item) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/mentors/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Thank you, ${formData.firstName}! Your mentor details have been submitted.`);
        setFormData({
          firstName: "",
          lastName: "",
          profileLink: "",
          communication: [],
          organization: "",
          location: "",
          experience: "",
          expertise: "",
          linkedin: "",
          instagram: "",
          twitter: "",
        });
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting mentor details:", error);
      alert("Submission failed. Try again later.");
    }
  };


  return (
    <div className="mentor-form-container">
      <h1 className="form-title">Become an Mentor!</h1>
      <p className="form-description">Enter your details to help learners find you.</p>
      <form onSubmit={handleSubmit} className="mentor-form">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="url" name="profileLink" placeholder="Resume Link (optional)" value={formData.profileLink} onChange={handleChange} />

        <fieldset>
          <legend>Preferred Communication Mediums:</legend>
          {["Voice", "Video", "Text", "In-person"].map((type) => (
            <label key={type} className="checkbox-label">
              <input type="checkbox" name="communication" value={type} checked={formData.communication.includes(type)} onChange={handleChange} /> {type}
            </label>
          ))}
        </fieldset>

        <input type="text" name="organization" placeholder="Current Organization/Institute" value={formData.organization} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location (City, Country)" value={formData.location} onChange={handleChange} />
        <input type="number" name="experience" placeholder="Work Experience (in years)" value={formData.experience} onChange={handleChange} />
        <textarea name="expertise" placeholder="Your Expertise / Strengths" value={formData.expertise} onChange={handleChange}></textarea>

        <input type="url" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} />
        <input type="url" name="instagram" placeholder="Instagram Profile" value={formData.instagram} onChange={handleChange} />
        <input type="url" name="twitter" placeholder="Twitter Profile" value={formData.twitter} onChange={handleChange} />

        <button type="submit" className="submit-button">Submit Details</button>
      </form>
    </div>
  );
};

export default MentorForm;
