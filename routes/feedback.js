const express = require('express');

const feedback = require('../controllers/feedback');
// const { authenticationMiddleware, isAdmin } = require('../utils/help-func');

const router = express.Router();

router.get('/', feedback.getFeedbacks);
router.post('/', feedback.createFeedback);
router.put('/:id', feedback.updateFeedback);
router.delete('/:id', feedback.removeFeedback);

module.exports = router;
