import User from "../models/User.js";

// Add skills (already exists)
export const addSkills = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const { teachSkills, learnSkills } = req.body;

    // Replace teachSkills and learnSkills directly
    user.teachSkills = teachSkills || [];
    user.learnSkills = learnSkills || [];

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update skills" });
  }
};
// Search users by skill (case-insensitive)
export const searchUsers = async (req, res) => {
  const { skill, type } = req.query;

  try {
    if (!skill || !type) return res.status(400).json({ msg: "Missing skill or type" });

    // Determine which field to search in
    const query = type === "learn"
      ? { teachSkills: { $regex: skill, $options: "i" } }  // users who can teach
      : { learnSkills: { $regex: skill, $options: "i" } }; // users who want to learn

    // Exclude the logged-in user
    const users = await User.find({
      ...query,
      _id: { $ne: req.user.id }
    }).select("name email teachSkills learnSkills");

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// userController.js
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("teachSkills learnSkills name email");
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};