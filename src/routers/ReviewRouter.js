const Review = require('../controllers/ReviewController');
const express = require('express');

const router = express.Router();

router.post('/review',Review.addReview)

module.exports = router;