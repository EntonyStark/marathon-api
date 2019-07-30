const Event = require('../models/event');
const FeedBack = require('../models/feedback');
const { to } = require('../utils/help-func');

const { findOneAndUpdateConfig } = require('../config/constants');

module.exports = {
	getEvents: async (req, res) => {
		const [err, events] = await to(Event
			.find(req.query, { __v: 0 })
			.populate({ path: 'result', select: { time: 1, rating: 1 }, populate: { path: 'eventUser', select: { email: 1, name: 1 } } }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ events });
	},
	createEvent: async (req, res) => {
		const [err, event] = await to(new Event({ ...req.body }).save());
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ event });
	},
	updateEvents: async (req, res) => {
		const [err, event] = await to(Event.findOneAndUpdate(
			{ _id: req.params.id }, { $set: { ...req.body } }, { ...findOneAndUpdateConfig }
		));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ event });
	},
	removeEvents: async (req, res) => {
		const [err, event] = await to(Event.findOneAndRemove(
			{ _id: req.params.id }, { useFindAndModify: false }
		));
		if (err) return res.status(400).send({ message: err.message });
		if (!event) return res.status(400).send({ message: 'Change not saved' });

		const fb = await FeedBack.find({ event: event._id });
		fb.forEach(el => el.remove());

		return res.status(200).send({ message: `${event.title} successfully removed`, id: event._id });
	}
};
