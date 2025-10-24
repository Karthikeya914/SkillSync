import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import SkillForm from "./SkillForm";
import UserSearch from "./UserSearch";
import "../App.css";

const Dashboard = () => {
  // Access the logged-in user from AuthContext
  const { user } = useContext(AuthContext);

  // State to hold the user's teach and learn skills
  const [skills, setSkills] = useState({ teachSkills: [], learnSkills: [] });

  // Fetch the current user's skills from the backend
  const fetchSkills = async () => {
    try {
      if (!user?._id) return; // Guard clause if user is not loaded

      const res = await API.get(`/users/${user._id}`);
      // Update state with skills or default to empty arrays
      setSkills({
        teachSkills: res.data.teachSkills || [],
        learnSkills: res.data.learnSkills || [],
      });
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    }
  };

  // Fetch skills whenever the user object changes (e.g., on login)
  useEffect(() => {
    fetchSkills();
  }, [user]);

  // Show loading message until user is available
  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-fullscreen">
      <div className="dashboard-card">
        {/* Greeting message */}
        <h2>Welcome, {user.name}</h2>
        
        {/* Skill management form */}
        <SkillForm skills={skills} setSkills={setSkills} />

        {/* User search component */}
        <UserSearch />
      </div>
    </div>
  );
};

export default Dashboard;
