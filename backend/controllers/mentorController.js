import supabase from "../config/supabase.js";

const addMentor = async (req, res) => {
  try {
    const newMentor = req.body; // Supabase works with JSON object directly if keys match columns
    // However, let's be explicit to avoid issues with extra fields or mismatch
    const {
      firstName,
      lastName,
      profileLink,
      communication,
      organization,
      location,
      experience,
      expertise,
      linkedin,
      instagram,
      twitter
    } = req.body;

    const { data: createdMentor, error } = await supabase
      .from('mentors')
      .insert([{
        first_name: firstName,
        last_name: lastName,
        profile_link: profileLink,
        communication,
        organization,
        location,
        experience,
        expertise,
        linkedin,
        instagram,
        twitter
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({ message: "Mentor added successfully!", mentor: createdMentor });
  } catch (error) {
    console.error("❌ Error saving mentor:", error);
    res.status(500).json({ error: "Failed to save mentor." });
  }
};

const getAllMentors = async (req, res) => {
  try {
    console.log("🔍 Fetching mentors from Supabase...");
    const { data: mentors, error } = await supabase
      .from('mentors')
      .select('*');

    if (error) {
      throw error;
    }

    console.log("✅ Mentors found:", mentors?.length);

    if (!mentors || mentors.length === 0) {
      return res.status(404).json({ message: "No mentors found" });
    }
    res.json(mentors);
  } catch (error) {
    console.error("❌ Error fetching mentors:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { addMentor, getAllMentors };
