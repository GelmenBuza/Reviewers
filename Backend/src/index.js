const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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


process.on("SIGINT", async () => {
	await prisma.$disconnect();
	console.log("Server shutdown");
	process.exit(0);
});

module.exports = app;
