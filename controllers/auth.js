const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');
const { to } = require('../utils/help-func');

module.exports = {
	login: async (req, res, next) => {
		passport.authenticate('local',
			{ successRedirect: '/', failureRedirect: '/login' }, (err, user, info) => {
				if (info) return res.status(info.code || 401).send({ message: info.message });

				res.cookie('user', JSON.stringify({ id: user._id }), {
					secure: false,
					httpOnly: false,
					maxAge: 24 * 60 * 60 * 1000 * 7
				});
				return req.logIn(user, (error) => {
					if (error) return next(err);
					return res.status(200).send({ user });
				});
			})(req, res, next);
	},
	register: async (req, res) => {
		const {
			name, sex, email, phone, password, confirmPassword, distance
		} = req.body;
		const user = await User.findOne({ email });
		if (user) return res.status(400).send({ message: 'User already exist' });

		if (!password) return res.status(401).send({ message: 'Missing password' });
		if (password !== confirmPassword) return res.status(401).send({ message: 'Passwords do not match' });

		const salt = await bcrypt.genSalt(10);
		const hashPass = await bcrypt.hash(password, salt);

		const [err, newUser] = await to(new User({
			name,
			sex,
			email,
			phone,
			password: hashPass,
			distance
		}).save());

		if (err) return res.status(400).send({ error: err.message });

		return res.status(200).send({
			message: 'User was successfully register',
			id: newUser._id
		});
	},
	logOut: async (req, res) => {
		req.session.destroy(() => {
			res.clearCookie('sessionId');
			res.clearCookie('user');

			res.send({ logOut: true });
		});
	}
};
