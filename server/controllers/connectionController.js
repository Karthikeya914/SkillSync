import User from "../models/User.js";

// Controller to send a connection request between two users
export const sendRequest = async (req, res) => {
  try {
    // Get the ID of the user making the request from the auth middleware
    const fromId = req.user.id;
    const { toId } = req.body;

    // Prevent users from connecting with themselves
    if (fromId === toId) return res.status(400).json({ msg: "Cannot connect to yourself" });

    const fromUser = await User.findById(fromId);
    const toUser = await User.findById(toId);

    // If the target user does not exist
    if (!toUser) return res.status(404).json({ msg: "User not found" });

    // Prevent duplicate connections
    if (fromUser.connections.includes(toId))
      return res.status(400).json({ msg: "Already connected" });

    // Add each user to the other's connections array
    fromUser.connections.push(toId);
    toUser.connections.push(fromId);

    await fromUser.save();
    await toUser.save();

    // Send success response
    res.json({ msg: "Connection request sent" });
  } catch (err) {
    // Handle unexpected server errors
    res.status(500).json({ error: err.message });
  }
};
