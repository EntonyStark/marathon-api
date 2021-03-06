const Results = require('../models/results');
const Event = require('../models/event');
const { to } = require('../utils/help-func');

module.exports = {
	getResults: async (req, res) => {
		const [err, results] = await to(Results
			.find(req.query, { __v: 0 })
			.populate('event', { title: 1, eventType: 1 })
			.populate('eventUser', { __v: 0, event: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ results });
	},
	createResult: async (req, res) => {
		try {
			const dublicate = await Results.find({ eventUser: req.body.eventUser });
			if (dublicate.length !== 0) throw new Error('Result for this user already exist in event');

			const results = await new Results({ ...req.body }).save();
			const event = await Event.findById({ _id: req.body.event });

			event.result.push(results);

			await event.save();

			return res.status(200).send({ results });
		}
		catch (error) {
			return res.status(400).send({ error: error.message });
		}
	},
	updateResult: async (req, res) => {
		const { time, rating } = req.body;
		const [err, result] = await to(Results.findById({ _id: req.params.id }, { __v: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		if (time) result.time = time;
		if (rating) result.rating = rating;

		const updatedResult = await result.save();

		return res.status(200).send({ result: updatedResult });
	},
	removeResult: async (req, res) => {
		const [err, result] = await to(Results.findOneAndRemove(
			{ _id: req.params.id }, { useFindAndModify: false }
		));
		if (err) return res.status(400).send({ message: err.message });
		if (!result) return res.status(400).send({ message: 'Change not saved' });

		await Event.updateOne(
			{ _id: result.event },
			{ $pullAll: { result: [result._id] } }
		);

		return res.status(200).send({ message: 'Result successfully removed', id: result._id });
	}
};
