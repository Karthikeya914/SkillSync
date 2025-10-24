// src/components/UserSearch.jsx
import { useState } from "react";
import API from "../api/api";
import "../App.css";

const UserSearch = () => {
  const [skill, setSkill] = useState("");
  const [type, setType] = useState("teach"); // "teach" or "learn"
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedSkill = skill.trim();
    if (!trimmedSkill) {
      setMessage("Please enter a skill to search");
      setResults([]);
      return;
    }

    try {
      const res = await API.get(`/users/search?skill=${trimmedSkill}&type=${type}`);
      if (res.data.length === 0) {
        setMessage(`No users found for "${trimmedSkill}"`);
      } else {
        setMessage("");
      }
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setResults([]);
      setMessage("Error fetching users");
    }
  };

  return (
    <div className="container">
      <h3>Which skills do you want to learn or teach?</h3>
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

      {message && <p className="message">{message}</p>}

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