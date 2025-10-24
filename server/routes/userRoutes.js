import express from "express";
import { addSkills, searchUsers ,getUser} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add skills 
router.put("/skills", authMiddleware, addSkills);

// Search users by skill 
router.get("/search", authMiddleware, searchUsers);

// Get User by Id
router.get("/:id", authMiddleware, getUser);
export default router;
