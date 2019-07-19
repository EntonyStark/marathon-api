const express = require('express');

const event = require('../controllers/event');
const { authenticationMiddleware, isAdmin } = require('../utils/help-func');

const router = express.Router();

router.get('/', event.getEvents);
router.post('/', authenticationMiddleware, isAdmin, event.createEvent);
router.put('/:id', authenticationMiddleware, isAdmin, event.updateEvents);
router.delete('/:id', authenticationMiddleware, isAdmin, event.removeEvents);

module.exports = router;
