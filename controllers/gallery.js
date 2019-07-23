const Gallery = require('../models/gallery');
const { to } = require('../utils/help-func');

module.exports = {
	getGallery: async (req, res) => {
		const [err, gallery] = await to(Gallery.find(req.query, { __v: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ gallery });
	},
	createGallery: async (req, res) => {
		const [err, gallery] = await to(new Gallery({ ...req.body }).save());
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ gallery });
	},
	updateGallery: async (req, res) => {
		const { eventType, eventTitle, pictures } = req.body;
		const [err, gallery] = await to(Gallery.findById({ _id: req.params.id }, { __v: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		if (eventType) gallery.eventType = eventType;
		if (eventTitle) gallery.eventTitle = eventTitle;
		if (pictures) {
			if (typeof pictures === 'string') {
				gallery.pictures.push(pictures);
			}
			if (Array.isArray(pictures)) {
				const unique = [...new Set([...pictures, ...gallery.pictures])];

				gallery.pictures = unique;
			}
		}

		const [e, updatedGallery] = await to(gallery.save());
		if (e) return res.status(400).send({ message: e.message });

		return res.status(200).send({ gallery: updatedGallery });
	},
	removeGallery: async (req, res) => {
		const [err, gallery] = await to(Gallery.findOneAndRemove(
			{ _id: req.params.id }, { useFindAndModify: false }
		));
		if (err) return res.status(400).send({ message: err.message });
		if (!gallery) return res.status(400).send({ message: 'Change not saved' });

		return res.status(200).send({ message: 'Gallery successfully removed', id: gallery._id });
	}
};
