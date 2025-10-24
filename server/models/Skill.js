import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ["teach", "learn"], required: true },
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);