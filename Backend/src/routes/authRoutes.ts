import express from "express";
import {
	register,
	login,
	logout,
	changeUserName,
	deleteUser,
	refreshToken,
	getUserById,
} from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/changeUsername", authMiddleware, changeUserName);
router.delete("/deleteUser", authMiddleware, deleteUser);
router.post("/refreshToken", refreshToken);
router.get("/user/:id", getUserById);

export default router;
