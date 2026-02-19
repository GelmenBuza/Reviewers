const express = require("express");
const {
	getItems,
	getItemById,
	getSimilarItem,
} = require("../controllers/itemsController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItemById);
router.get("/search/:searchText", getSimilarItem);

module.exports = router;
