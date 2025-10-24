import { createContext, useState } from "react";

// Create a context to manage authentication state across the app
export const AuthContext = createContext();

// Provider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage if available, otherwise null
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Function to log in a user
  const loginUser = (userData, token) => {
    // Save user data and JWT token in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    // Update React state
    setUser(userData);
  };

  // Function to log out a user
  const logoutUser = () => {
    // Remove user data and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Reset React state
    setUser(null);
  };

  // Provide the user state and auth functions to child components
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
