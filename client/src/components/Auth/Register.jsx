// src/components/Auth/Register.jsx
import { useState, useContext } from "react";
import API from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Access loginUser function from AuthContext to set logged-in user after registration
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook to programmatically navigate routes

  // Local state for registration form inputs
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  // State to store any error messages from backend
  const [error, setError] = useState("");

  // Handle changes to form inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send POST request to backend to register a new user
      const res = await API.post("/auth/register", form);

      // Save the registered user and token to context and localStorage
      loginUser(res.data.user, res.data.token);

      // Redirect user to dashboard after successful registration
      navigate("/dashboard");
    } catch (err) {
      // Display backend error message or default message
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="auth-fullscreen">
      <div className="auth-card">
        <h2>Register</h2>
        {/* Display error messages */}
        {error && <p className="auth-error">{error}</p>}

        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="auth-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
