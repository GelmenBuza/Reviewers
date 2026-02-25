const express = require("express");
const {
	register,
	login,
	logout,
	changeUserName,
	deleteUser,
	refreshToken,
	getUserById,
} = require("../controllers/authController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/changeUsername", authMiddleware, changeUserName);
router.delete("/deleteUser", authMiddleware, deleteUser);
router.post("/refreshToken", refreshToken);
router.get("/user/:id", getUserById);

module.exports = router;
