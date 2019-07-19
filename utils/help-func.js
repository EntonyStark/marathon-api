const { admin } = require('../config/constants');

module.exports = {
	to: promise => promise.then(data => [null, data]).catch(err => [err]),
	authenticationMiddleware: (req, res, next) => {
		console.log('req.isAuthenticated()', req.isAuthenticated());
		if (req.isAuthenticated()) return next();

		return res.status(401).send({ message: 'Permission denied' });
	},
	isAdmin: (req, res, next) => {
		if (req.user.role === admin) return next();

		return res.status(401).send({ message: 'Permission denied' });
	}
};
