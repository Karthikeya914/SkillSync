import express from "express";
import { addSkills, searchUsers ,getUser} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add skills (protected)
router.put("/skills", authMiddleware, addSkills);

// Search users by skill (public or protected)
router.get("/search", authMiddleware, searchUsers);


router.get("/:id", authMiddleware, getUser);
export default router;