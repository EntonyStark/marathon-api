const express = require('express');

const result = require('../controllers/results');
// const { authenticationMiddleware, isAdmin } = require('../utils/help-func');

const router = express.Router();

router.get('/', result.getResults);
router.post('/', result.createResult);
router.put('/:id', result.updateResult);
router.delete('/:id', result.removeResult);

module.exports = router;
