import { useState, useEffect } from "react";
import API from "../api/api";
import "../App.css";

const SkillForm = ({ skills, setSkills }) => {
  const [teach, setTeach] = useState("");
  const [learn, setLearn] = useState("");
  const [message, setMessage] = useState("");

  // Merge new skills with existing ones (case-insensitive)
  const mergeSkills = (existing, added) => {
    const lowerExisting = existing.map(s => s.toLowerCase());
    return [
      ...existing,
      ...added.filter(s => s && !lowerExisting.includes(s.toLowerCase()))
    ];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTeach = teach.split(",").map(s => s.trim()).filter(s => s);
    const newLearn = learn.split(",").map(s => s.trim()).filter(s => s);

    if (newTeach.length === 0 && newLearn.length === 0) {
      setMessage("Please enter skills to add.");
      return;
    }

    const updatedSkills = {
      teachSkills: mergeSkills(skills.teachSkills, newTeach),
      learnSkills: mergeSkills(skills.learnSkills, newLearn),
    };

    try {
      const res = await API.put("/users/skills", updatedSkills);
      setSkills(res.data);
      setTeach("");
      setLearn("");
      setMessage("Skills updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update skills");
    }
  };

  const removeSkill = async (type, skillToRemove) => {
    const updatedSkills = { ...skills };
    updatedSkills[type] = skills[type].filter(s => s !== skillToRemove);

    try {
      const res = await API.put("/users/skills", updatedSkills);
      setSkills(res.data);
      setMessage(`Removed "${skillToRemove}" from ${type === "teachSkills" ? "Teach" : "Learn"} Skills`);
    } catch (err) {
      console.error(err);
      setMessage("Failed to remove skill");
    }
  };

  return (
    <div className="skill-card">
      <h3>Manage Skills</h3>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="skill-form">
        <div>
          <label>Teach Skills (comma separated)</label>
          <input
            value={teach}
            onChange={e => setTeach(e.target.value)}
            placeholder="Add new skills, e.g. React, NodeJS"
            className="skill-input"
          />
        </div>
        
        <div style={{ marginTop: "14px" }}>
          <label>Learn Skills (comma separated)</label>
          <input
            value={learn}
            onChange={e => setLearn(e.target.value)}
            placeholder="Add new skills, e.g. Django"
            className="skill-input"
          />
        </div>
        <button style={{ marginTop: "20px" }} type="submit" className="skill-btn">Save Skills</button>
      </form>

      <div className="skills-list">
        <h4>Your Skills</h4>

        <div>
          <b>Teach:</b>{" "}
          {skills.teachSkills.length > 0
            ? skills.teachSkills.map((s, i) => (
                <span className="skill-tag" key={i}>
                  {s}{" "}
                  <button type="button" className="skill-remove" onClick={() => removeSkill("teachSkills", s)}>❌</button>
                </span>
              ))
            : "None"}
        </div>

        <div style={{ marginTop: "8px" }}>
          <b>Learn:</b>{" "}
          {skills.learnSkills.length > 0
            ? skills.learnSkills.map((s, i) => (
                <span className="skill-tag" key={i}>
                  {s}{" "}
                  <button type="button" className="skill-remove" onClick={() => removeSkill("learnSkills", s)}>❌</button>
                </span>
              ))
            : "None"}
        </div>
      </div>
    </div>
  );
};

export default SkillForm;