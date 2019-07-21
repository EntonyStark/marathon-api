const EventUser = require('../models/eventUser');
const { to } = require('../utils/help-func');

module.exports = {
	getEventUsers: async (req, res) => {
		const [err, eventusers] = await to(EventUser.find(req.query, { __v: 0 }));
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ eventusers });
	},
	createEventUser: async (req, res) => {
		if (!req.body.event) return res.status(400).send({ message: 'Miss event' });

		const [err, newEventUser] = await to(new EventUser({ ...req.body }).save());
		if (err) return res.status(400).send({ message: err.message });

		return res.status(200).send({ eventUser: newEventUser });
	},
	updateEventUser: async (req, res) => {
		const {
			name, sex, event, phone, distance
		} = req.body;

		const [err, eventUser] = await to(EventUser.findById({ _id: req.params.id }));
		if (err) return res.status(400).send({ message: err.message });

		if (name) eventUser.name = name;
		if (sex) eventUser.sex = sex;
		if (phone) eventUser.phone = phone;
		if (distance) eventUser.distance = distance;
		if (event) {
			const events = [...eventUser.distance].concat(event).map(el => String(el));
			eventUser.distance = [...new Set(events)];
		}

		const [e, updatedUser] = await to(eventUser.save());
		if (e) return res.status(400).send({ message: e.message });

		return res.status(200).send({ eventUser: updatedUser });
	},
	removeEventUser: async (req, res) => {
		const [err, eventUser] = await to(EventUser.findOneAndRemove(
			{ _id: req.params.id }, { useFindAndModify: false }
		));
		if (err) return res.status(400).send({ message: err.message });
		if (!eventUser) return res.status(400).send({ message: 'Change not saved' });

		return res.status(200).send({
			message: `${eventUser.name} successfully removed`,
			id: eventUser._id
		});
	}
};
