const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient.js");

const authMiddleware = async (req, res, next) => {
	try {
		if (!token) {
			return res.status(401).json({ error: "Authentication required" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId;
		const user = await prisma.user.findUnique({
			where: { id: req.userId },
			select: { id: true },
		});

		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}
		next();
	} catch (err) {
		if (err.name === "JsonWebTokenError") {
			return res.status(401).json({ error: "Invalid Token" });
		}
		if (err.name === "TokenExpiredError") {
			return res.status(401).json({ error: "Token Expired" });
		}
		console.error("Auth middleware error:", err);
		res.status(500).json({ error: "internal server error" });
	}
};

module.exports = authMiddleware;
