import supabase from "../config/supabase.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Helper Function to Create JWT Token
const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// **🔹 User Login**
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(404).json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user.id, user.role);
        res.status(200).json({ success: true, token, role: user.role });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// **🔹 User Registration**
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate Email Format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate Password Length
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create & Save User
        const { data: newUser, error } = await supabase
            .from('users')
            .insert([{ name, email, password: hashedPassword, role }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        const token = createToken(newUser.id, newUser.role);
        res.status(201).json({ success: true, token, role: newUser.role });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// **🔹 Update User Profile (Alumni/Student)**
const updateProfile = async (req, res) => {
    const { userId } = req.body; // In a real app, get from middleware req.user.id
    const updates = req.body; // { college, grad_year, department, skills, current_role, company, ... }

    // Remove immutable fields from updates if present (e.g., email, id, role) to be safe
    delete updates.email;
    delete updates.id;
    delete updates.role;
    delete updates.userId; // Remove the ID passed in body

    try {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;

        res.status(200).json({ success: true, user: data });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ success: false, message: "Failed to update profile" });
    }
};

// **🔹 Get Alumni (Filter by college)**
const getAlumni = async (req, res) => {
    const { college } = req.query;

    try {
        let query = supabase
            .from('users')
            .select('id, name, email, college, grad_year, department, job_role, company, skills')
            .eq('role', 'alumni');

        if (college) {
            query = query.eq('college', college);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error("Fetch Alumni Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch alumni" });
    }
};

export { loginUser, registerUser, updateProfile, getAlumni };

