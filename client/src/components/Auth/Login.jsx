// src/components/Auth/Login.jsx
import { useState, useContext } from "react";
import API from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Access loginUser function from AuthContext to set logged-in user
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook to programmatically navigate routes

  // Local state for login form inputs
  const [form, setForm] = useState({ email: "", password: "" });
  // State to store any error messages
  const [error, setError] = useState("");

  // Handle changes to form inputs
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send POST request to backend to login
      const res = await API.post("/auth/login", form);

      // Save user and token to context and localStorage
      loginUser(res.data.user, res.data.token);

      // Redirect user to dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      // Display backend error message or default message
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-fullscreen">
      <div className="auth-card">
        <h2>Login</h2>
        {/* Display error messages */}
        {error && <p className="auth-error">{error}</p>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
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
          <button className="auth-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
