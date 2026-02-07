const express = require("express");
const {getItems} = require("../controllers/itemsController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", getItems);

module.exports = router;