const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		eventType: {
			type: String,
			required: true,
			enum: ['Triathlon', 'Marathon', 'Cycling']
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
			type: String
		},
		halfmarathoneDistancePrice: {
			type: String
		},
		ageLimit: {
			type: String
		},
		awardMedals: {
			type: String
		},
		maximumTime: {
			type: String
		},
		aidStations: {
			type: String
		},
		equipmentStorage: {
			type: String
		},
		parking: {
			type: String
		},
		refreshments: {
			type: String
		},
		map: {
			type: String
		},
		result: [
			{
				type: Schema.Types.ObjectId,
				ref: 'result'
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('events', eventchema);
