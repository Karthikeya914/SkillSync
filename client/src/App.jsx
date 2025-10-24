// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

function App() {
  // Access the logged-in user from AuthContext
  const { user } = useContext(AuthContext);

  return (
    <div className="app-wrapper">
      {/* Set up routing for the application */}
      <Router>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />
          
          {/* Registration page route */}
          <Route path="/register" element={<Register />} />
          
          {/* Login page route */}
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard route is protected; redirect to login if user is not logged in */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
