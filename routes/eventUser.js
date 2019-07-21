const express = require('express');

const eventUser = require('../controllers/eventUser');
const { authenticationMiddleware, isAdmin } = require('../utils/help-func');

const router = express.Router();

router.get('/', eventUser.getEventUsers);
router.post('/', authenticationMiddleware, isAdmin, eventUser.createEventUser);
router.put('/:id', authenticationMiddleware, isAdmin, eventUser.updateEventUser);
router.delete('/:id', authenticationMiddleware, isAdmin, eventUser.removeEventUser);

module.exports = router;
