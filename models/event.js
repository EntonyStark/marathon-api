const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventchema = new Schema({
	title: {
		type: String,
		required: true
	},
	eventType: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	eventDate: {
		type: Date,
		required: true
	},
	mainBannerPicture: {
		type: String
	},
	overview: {
		type: String
	},
	contentPicture: {
		type: String
	},
	contentVideo: {
		type: String
	},
	marathoneDistancePrice: {
		type: Number
	},
	halfmarathoneDistancePrice: {
		type: Number
	},
	ageLimit: {
		type: Number
	},
	awardMedals: {
		type: Boolean,
		required: true
	},
	maximumTime: {
		type: Number
	},
	aidStations: {
		type: Boolean
	},
	equipmentStorage: {
		type: Boolean
	},
	parking: {
		type: Boolean
	},
	refreshments: {
		type: Boolean
	},
	map: {
		type: String
	}

}, { timestamps: true });

module.exports = mongoose.model('events', eventchema);
