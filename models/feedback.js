const mongoose = require('mongoose');

const { Schema } = mongoose;

const feedBackSchema = new Schema(
	{
		date: {
			type: Date,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		event: {
			type: Schema.Types.ObjectId,
			ref: 'events'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('feedback', feedBackSchema);
