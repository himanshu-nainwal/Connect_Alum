import supabase from "../config/supabase.js";

// Get all events
const getEvents = async (req, res) => {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('*');

    if (error) {
      throw error;
    }

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new event (Alumni only)
const createEvent = async (req, res) => {
  const { title, department, location, updatedOn, tags, price, registrationDaysLeft, description, speakers, meetingLink, postedBy } = req.body;

  try {
    const { data: event, error } = await supabase
      .from('events')
      .insert([{
        title,
        department,
        location,
        updated_on: updatedOn,
        tags,
        price,
        registration_days_left: registrationDaysLeft,
        description,
        speakers,
        meeting_link: meetingLink,
        posted_by: postedBy
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, event });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
};

// Register for an event (Student)
const registerForEvent = async (req, res) => {
  const { eventId, studentId } = req.body;

  try {
    // Check if already registered
    const { data: existing } = await supabase
      .from('registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('student_id', studentId)
      .single();

    if (existing) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    const { data: registration, error } = await supabase
      .from('registrations')
      .insert([{ event_id: eventId, student_id: studentId }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, message: "Registered successfully", registration });
  } catch (err) {
    console.error("Error registering for event:", err);
    res.status(500).json({ error: "Failed to register" });
  }
};

export { getEvents, getEventById, createEvent, registerForEvent };