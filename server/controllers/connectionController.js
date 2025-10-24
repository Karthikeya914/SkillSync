import User from "../models/User.js";

// Send connection request
export const sendRequest = async (req, res) => {
  try {
    const fromId = req.user.id;
    const { toId } = req.body;

    if (fromId === toId) return res.status(400).json({ msg: "Cannot connect to yourself" });

    const fromUser = await User.findById(fromId);
    const toUser = await User.findById(toId);

    if (!toUser) return res.status(404).json({ msg: "User not found" });

    if (fromUser.connections.includes(toId))
      return res.status(400).json({ msg: "Already connected" });

    fromUser.connections.push(toId);
    toUser.connections.push(fromId);

    await fromUser.save();
    await toUser.save();

    res.json({ msg: "Connection request sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};