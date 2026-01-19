const express = require('express');
const {create} = require('../controllers/reviewController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const {deleteReview} = require("../controllers/reviewController");

const router = express.Router();

router.post('/create', authMiddleware, create);
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;