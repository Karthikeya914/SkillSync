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
  const { user } = useContext(AuthContext);

  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;