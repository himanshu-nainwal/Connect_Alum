import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import config from "../config"; // Import config

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = config.API_URL; // Use config URL
  const [token, setToken] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [user, setUser] = useState(null); // Store full user object (college, etc.)

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        // Ideally fetch user profile here if token exists
        // await fetchUserProfile(localStorage.getItem("token")); 
      }
    }
    loadData();
  }, []);

  const [showLogin, setShowLogin] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${url}/user/login`, { email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        setToken(res.data.token);
        setRole(res.data.role);
        // We could also store user details if returned, or fetch them
        // setUser(res.data.user); 
        return true;
      } else {
        alert(res.data.message);
        return false;
      }
    } catch (error) {
      console.error("Login Error", error);
      alert("Login failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setRole("");
    setUser(null);
  }

  const contextValue = {
    showLogin,
    setShowLogin,
    url,
    token,
    setToken,
    role,
    setRole,
    user,
    setUser,
    login,
    logout
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;