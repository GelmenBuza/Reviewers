const express = require("express");
const {
	create,
	updateReview,
	deleteReview,
	getReviews,
} = require("../controllers/reviewController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/create", authMiddleware, create);
router.delete("/:id", authMiddleware, deleteReview);
router.patch("/:id", authMiddleware, updateReview);
router.get("/", getReviews);

module.exports = router;
