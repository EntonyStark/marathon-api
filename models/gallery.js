const mongoose = require('mongoose');

const { Schema } = mongoose;

const galletySchema = new Schema(
	{
		pictures: [String],
		eventType: {
			type: String,
			required: true,
			enum: ['Triathlon', 'Marathon', 'Cycling']
		},
		eventTitle: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('gallery', galletySchema);
