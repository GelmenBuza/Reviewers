const express = require("express");
const { getItems, getItemById } = require("../controllers/itemsController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItemById);

module.exports = router;
