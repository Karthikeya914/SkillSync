// src/components/Auth/Register.jsx
import { useState, useContext } from "react";
import API from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      loginUser(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="auth-fullscreen">
      <div className="auth-card">
        <h2>Register</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
          <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
          <button className="auth-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
  
};

export default Register;