const FeedBack = require('../models/feedback');

const { to } = require('../utils/help-func');
const { findOneAndUpdateConfig } = require('../config/constants');

module.exports = {
	getFeedbacks: async (req, res) => {
		const [err, results] = await to(FeedBack
			.find(req.query, { __v: 0 })
			.populate('event', { title: 1, eventType: 1 }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ results });
	},
	createFeedback: async (req, res) => {
		const [err, feedback] = await to(new FeedBack({ ...req.body }).save());
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ feedback });
	},
	updateFeedback: async (req, res) => {
		const [err, feedback] = await to(FeedBack.findOneAndUpdate(
			{ _id: req.params.id }, { $set: { ...req.body } }, { ...findOneAndUpdateConfig }
		));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ feedback });
	},
	removeFeedback: async (req, res) => {
		const [err, feedback] = await to(FeedBack.findOneAndRemove(
			{ _id: req.params.id }, { useFindAndModify: false }
		));
		if (err) return res.status(400).send({ message: err.message });
		if (!feedback) return res.status(400).send({ message: 'Change not saved' });

		return res.status(200).send({ message: 'FeedBack successfully removed', id: feedback._id });
	}
};
