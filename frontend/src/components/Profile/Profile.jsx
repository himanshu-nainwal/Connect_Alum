import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { StoreContext } from '../../context/StoreContext';
import './Profile.css'; // You might need to create this CSS or reuse existing

const Profile = () => {
    const { user, token, setUser } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        college: '',
        grad_year: '',
        department: '',
        job_role: '',
        company: '',
        skills: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                college: user.college || '',
                grad_year: user.grad_year || '',
                department: user.department || '',
                job_role: user.job_role || '',
                company: user.company || '',
                skills: user.skills ? user.skills.join(', ') : ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updates = {
                ...formData,
                userId: user.id,
                skills: formData.skills.split(',').map(s => s.trim())
            };

            const res = await axios.put(`${config.API_URL}/user/profile`, updates, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                alert("Profile updated successfully!");
                setUser({ ...user, ...res.data.user }); // Update local context
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        }
    };

    return (
        <div className="profile-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label>
                    College:
                    <input type="text" name="college" value={formData.college} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </label>
                <label>
                    Graduation Year:
                    <input type="number" name="grad_year" value={formData.grad_year} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </label>
                <label>
                    Department:
                    <input type="text" name="department" value={formData.department} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </label>
                <label>
                    Current Role:
                    <input type="text" name="job_role" value={formData.job_role} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                </label>
                <label>
                    Company / Organization:
                    <input type="text" name="company" value={formData.company} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                </label>
                <label>
                    Skills (comma separated):
                    <textarea name="skills" value={formData.skills} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                </label>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
