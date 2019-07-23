const express = require('express');

const user = require('../controllers/users');
const { authenticationMiddleware, isAdmin } = require('../utils/help-func');

const router = express.Router();

router.get('/', authenticationMiddleware, isAdmin, user.getUserList);
// router.get('/:id', authenticationMiddleware, user.getUserById);
// router.put('/:id', authenticationMiddleware, user.updateUser);
// router.delete('/:id', authenticationMiddleware, isAdmin, user.removeUser);
router.get('/:id', user.getUserById);
router.put('/:id', user.updateUser);
router.delete('/:id', user.removeUser);

module.exports = router;
