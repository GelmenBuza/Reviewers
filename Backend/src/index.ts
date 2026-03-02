import "dotenv/config";

import express, {Application, Request, Response} from "express";
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

import prisma from "./prismaClient";
import authRoutes  from "./routes/authRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import itemsRoutes from "./routes/itemsRoutes";

const app: Application = express();


declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}


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

app.get("/api/me", async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({message: "token is required"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;
        const user = await prisma.user.findUnique({
            where: {id: req.userId},
            select: {
                id: true,
                username: true,
                email: true,
            },
        });

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({message: "Token expired"});
            }
            if (error.name === "JsonWebTokenError") {
                return res.status(403).json({message: "Invalid token"});
            }
        }
        res.status(500).json({message: "Internal server error"});
    }
});

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("Server shutdown");
    process.exit(0);
});

module.exports = app;
