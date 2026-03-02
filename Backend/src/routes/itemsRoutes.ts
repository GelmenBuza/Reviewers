import express from "express";
import {
	getItems,
	getItemById,
	getSimilarItem,
} from "../controllers/itemsController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItemById);
router.get("/search/:searchText", getSimilarItem);

export default router;
