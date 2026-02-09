import supabase from "../config/supabase.js";

// Create a new job (Alumni only)
export const createJob = async (req, res) => {
    const { title, company, location, type, description, posted_by } = req.body;

    try {
        const { data, error } = await supabase
            .from('jobs')
            .insert([{ title, company, location, type, description, posted_by }])
            .select();

        if (error) throw error;

        res.status(201).json({ success: true, job: data[0] });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ success: false, message: "Failed to create job" });
    }
};

// Get all jobs (For students)
export const getJobs = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('jobs')
            .select(`
                *,
                users:posted_by (name, email, college) 
            `) // Join with users table to get alumni details
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ success: false, message: "Failed to fetch jobs" });
    }
};

// Get jobs posted by specific alumni
export const getMyJobs = async (req, res) => {
    const { userId } = req.params;

    try {
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('posted_by', userId);

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching my jobs:", error);
        res.status(500).json({ success: false, message: "Failed to fetch your jobs" });
    }
};
