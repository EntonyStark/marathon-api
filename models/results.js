const mongoose = require('mongoose');

const { Schema } = mongoose;

const resultSchema = new Schema(
	{
		eventUser: {
			type: Schema.Types.ObjectId,
			ref: 'eventUsers'
		},
		time: {
			type: String,
			required: true
		},
		rating: {
			type: String
		},
		event: {
			type: Schema.Types.ObjectId,
			ref: 'events'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('result', resultSchema);
