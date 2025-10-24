// src/components/UserSearch.jsx
import { useState } from "react";
import API from "../api/api";
import "../App.css";

const UserSearch = () => {
  // State for the skill input
  const [skill, setSkill] = useState("");
  // State for the search type: "teach" or "learn"
  const [type, setType] = useState("teach");
  // State to store search results from backend
  const [results, setResults] = useState([]);
  // State for messages (errors or info)
  const [message, setMessage] = useState("");

  // Function to handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedSkill = skill.trim();

    // Validate that user entered something
    if (!trimmedSkill) {
      setMessage("Please enter a skill to search");
      setResults([]);
      return;
    }

    try {
      // Call backend API to search users by skill
      const res = await API.get(`/users/search?skill=${trimmedSkill}&type=${type}`);
      
      // Show message if no users are found
      if (res.data.length === 0) {
        setMessage(`No users found for "${trimmedSkill}"`);
      } else {
        setMessage("");
      }

      // Update results state with users returned from API
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setResults([]);
      setMessage("Error fetching users");
    }
  };

  return (
    <div className="container">
      {/* Heading */}
      <h3>Which skills do you want to learn or teach?</h3>

      {/* Search form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          placeholder="Type a skill, e.g., React"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="teach">Teach</option>
          <option value="learn">Learn</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {/* Show messages for errors or info */}
      {message && <p className="message">{message}</p>}

      {/* Display search results */}
      <div className="search-results">
        {results.map((u) => (
          <div className="user-card" key={u._id}>
            <p>
              <strong>{u.name}</strong> | Email: {u.email} | Teach: {u.teachSkills.join(", ")} | Learn: {u.learnSkills.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
