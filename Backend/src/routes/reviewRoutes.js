const express = require('express');
const {create} = require('../controllers/reviewController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/create', authMiddleware, create);

module.exports = router;