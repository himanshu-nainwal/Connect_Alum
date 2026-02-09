import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Events.css";
import config from "../../config";
import { StoreContext } from "../../context/StoreContext";

const Events = () => {
  const { user, role, token } = useContext(StoreContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Post Event State
  const [showPostForm, setShowPostForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "", department: "", location: "", updatedOn: new Date().toLocaleDateString(),
    tags: "", price: 0, registrationDaysLeft: 30, description: "", speakers: "", meetingLink: ""
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/events`);
      setEvents(response.data);
      if (response.data.length > 0 && !selectedEvent) {
        setSelectedEvent(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handlePostEvent = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login to post an event");

    try {
      const formattedEvent = {
        ...newEvent,
        tags: newEvent.tags.split(',').map(tag => tag.trim()), // Convert comma-separated string to array
        speakers: newEvent.speakers.split(',').map(s => s.trim()),
        postedBy: user?.id,
        updatedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      await axios.post(`${config.API_URL}/events/create`, formattedEvent, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Event posted successfully!");
      setShowPostForm(false);
      setNewEvent({ title: "", department: "", location: "", updatedOn: "", tags: "", price: 0, registrationDaysLeft: 30, description: "", speakers: "", meetingLink: "" });
      fetchEvents();
    } catch (error) {
      console.error("Error posting event:", error);
      alert("Failed to post event");
    }
  };

  const handleRegister = async () => {
    if (!token) return alert("Please login to register");

    // For paid events (simulated logic from original code)
    if (selectedEvent.price > 0) {
      // Ideally verify payment here before calling backend register
      // Keeping original Razorpay alert logic for now as requested to maintain UI/Flow
      alert("Redirecting to payment gateway... (Simulation)");
    }

    try {
      await axios.post(`${config.API_URL}/events/register`, {
        eventId: selectedEvent.id,
        studentId: user?.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Successfully registered for the event!");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Failed to register");
    }
  };

  if (loading) return <div className="events-container"><p>Loading events...</p></div>;

  return (
    <div className="events-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 className="sidebar-title">Events</h2>
          {role === 'alumni' && (
            <button onClick={() => setShowPostForm(!showPostForm)} style={{ fontSize: '0.8em', padding: '5px', cursor: 'pointer' }}>
              {showPostForm ? "Cancel" : "+ Post"}
            </button>
          )}
        </div>

        {showPostForm ? (
          <div className="post-event-form" style={{ padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
            <h3>New Event</h3>
            <form onSubmit={handlePostEvent} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <input type="text" placeholder="Title" required value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
              <input type="text" placeholder="Department" required value={newEvent.department} onChange={e => setNewEvent({ ...newEvent, department: e.target.value })} />
              <input type="text" placeholder="Location" required value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} />
              <input type="number" placeholder="Price (0 for Free)" value={newEvent.price} onChange={e => setNewEvent({ ...newEvent, price: Number(e.target.value) })} />
              <input type="text" placeholder="Tags (comma separated)" value={newEvent.tags} onChange={e => setNewEvent({ ...newEvent, tags: e.target.value })} />
              <textarea placeholder="Description" required value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
              <input type="text" placeholder="Speakers (comma separated)" value={newEvent.speakers} onChange={e => setNewEvent({ ...newEvent, speakers: e.target.value })} />
              <input type="text" placeholder="Meeting Link (Optional)" value={newEvent.meetingLink} onChange={e => setNewEvent({ ...newEvent, meetingLink: e.target.value })} />
              <button type="submit">Submit Event</button>
            </form>
          </div>
        ) : (
          <div className="events-list">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`event-item ${selectedEvent?.id === event.id ? "selected" : ""
                  }`}
              >
                <h3 className="event-title">{event.title}</h3>
                <p className="event-department">{event.department}</p>
                <p className="event-price">
                  {event.price === 0 ? "Free" : `₹${event.price}`}
                </p>
                <div className="event-tags">
                  {event.tags && event.tags.map && event.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {events.length === 0 && <p>No events found.</p>}
          </div>
        )}
      </div>

      {/* Details Section */}
      {selectedEvent && !showPostForm && (
        <div className="details-section">
          <div className="event-details">
            <h2 className="details-title">{selectedEvent.title}</h2>
            <p className="details-info">
              {selectedEvent.department} | {selectedEvent.location}
            </p>
            <div className="details-tags">
              {selectedEvent.tags && selectedEvent.tags.map && selectedEvent.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <p className="details-description">{selectedEvent.description}</p>
            <p className="details-speakers">
              <strong>Speaker(s):</strong> {Array.isArray(selectedEvent.speakers) ? selectedEvent.speakers.join(", ") : selectedEvent.speakers}
            </p>

            {/* Registration Section */}
            <div className="registration-box">
              <p className="registration-price">
                {selectedEvent.price === 0 ? "Free" : `₹${selectedEvent.price}`}
              </p>
              <button className="register-button" onClick={handleRegister}>
                {role === 'alumni' ? "View Details" : "Register"}
              </button>
            </div>

            {/* Meeting Link (Only for Webinars) */}
            {selectedEvent.meeting_link && (
              <p className="meeting-link">
                <a
                  href={selectedEvent.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Meeting
                </a>
              </p>
            )}

            {/* Registration Time Info */}
            <div className="time-info">
              <p>
                <strong>Time left:</strong> {selectedEvent.registration_days_left || 30}{" "}
                days left
              </p>
              <p>
                <strong>Date:</strong> {selectedEvent.updated_on}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
