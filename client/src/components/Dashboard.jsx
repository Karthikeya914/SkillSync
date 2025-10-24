import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import SkillForm from "./SkillForm";
import UserSearch from "./UserSearch";
import "../App.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState({ teachSkills: [], learnSkills: [] });

  const fetchSkills = async () => {
    try {
      if (!user?._id) return; 

      const res = await API.get(`/users/${user._id}`);
      setSkills({
        teachSkills: res.data.teachSkills || [],
        learnSkills: res.data.learnSkills || [],
      });
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [user]); 

  if (!user) return <p>Loading...</p>; 

  return (
    <div className="dashboard-fullscreen">
      <div className="dashboard-card">
        <h2>Welcome, {user.name}</h2>
        <SkillForm skills={skills} setSkills={setSkills} />
        <UserSearch />
      </div>
    </div>
  );
};

export default Dashboard;