const express = require('express');

const gallery = require('../controllers/gallery');
// const { authenticationMiddleware, isAdmin } = require('../utils/help-func');

const router = express.Router();

router.get('/', gallery.getGallery);
router.post('/', gallery.createGallery);
router.put('/:id', gallery.updateGallery);
router.delete('/:id', gallery.removeGallery);

module.exports = router;
