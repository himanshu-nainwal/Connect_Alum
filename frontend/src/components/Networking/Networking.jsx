import React, { useState } from 'react';

const Networking = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    mode: 'online',
    description: '',
    feeType: 'free',
    feeAmount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFeeChange = (e) => {
    setFormData({
      ...formData,
      feeType: e.target.value,
      feeAmount: e.target.value === 'free' ? '' : formData.feeAmount
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Event scheduled successfully!');
  };

  return (
    <main className="networking-container">
      <div className="heading">
        <h1>Schedule a Seminar/Webinar</h1>
        <p>Fill out the details below to schedule an event.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter event title" required />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Mode:</label>
          <select name="mode" value={formData.mode} onChange={handleChange} required>
            <option value="online">Online</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Enter event details..." required></textarea>
        </div>

        <div className="form-group">
          <label>Is this event free or paid?</label>
          <div className="fee-section">
            <input type="radio" name="feeType" value="free" checked={formData.feeType === 'free'} onChange={handleFeeChange} />
            <label>Free</label>
            <input type="radio" name="feeType" value="paid" checked={formData.feeType === 'paid'} onChange={handleFeeChange} />
            <label>Paid (₹)</label>
            <input type="number" name="feeAmount" value={formData.feeAmount} onChange={handleChange} disabled={formData.feeType === 'free'} placeholder="Enter amount" />
          </div>
        </div>

        <button type="submit" className="submit-btn">Schedule Event</button>
      </form>
    </main>
  );
};

export default Networking;
