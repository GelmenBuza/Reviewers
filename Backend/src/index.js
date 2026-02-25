const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = require("./prismaClient.js");
const authRoutes = require("./routes/authRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const itemsRoutes = require("./routes/itemsRoutes.js");

const app = express();

// Middleware
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/items", itemsRoutes);

// Get info me

app.get("/api/me", async (req, res) => {
	try {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "token is required" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.userId = decoded.userId;
		const user = await prisma.user.findUnique({
			where: { id: req.userId },
			select: {
				id: true,
				username: true,
				email: true,
			},
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			return res.status(401).json({ message: "Token expired" });
		}
		if (err.name === "JsonWebTokenError") {
			return res.status(403).json({ message: "Invalid token" });
		}
		res.status(500).json({ message: "Internal server error" });
	}
});

process.on("SIGINT", async () => {
	await prisma.$disconnect();
	console.log("Server shutdown");
	process.exit(0);
});

module.exports = app;
