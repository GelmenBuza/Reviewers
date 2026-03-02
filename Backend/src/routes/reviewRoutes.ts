import express from "express";
import {
	create,
	updateReview,
	deleteReview,
	getReviews,
	getReviewsByItemID,
} from "../controllers/reviewController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, create);
router.delete("/:id", authMiddleware, deleteReview);
router.patch("/:id", authMiddleware, updateReview);
router.get("/:id", getReviewsByItemID);
router.get("/", getReviews);

export default router;
