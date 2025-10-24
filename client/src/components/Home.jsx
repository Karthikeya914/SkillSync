import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <div className="home-fullscreen">
      <div className="home-card">
        <h1>
          Welcome to <span className="highlight">SkillSync</span>
        </h1>
        <p className="home-subtitle">
          Connect with peers to learn or teach new skills and expand your knowledge.
        </p>
        <div className="home-buttons">
          <Link to="/login">
            <button className="home-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="home-btn">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
