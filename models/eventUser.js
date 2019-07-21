const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventUserSchema = new Schema(
	{
		name: {
			required: true,
			type: String
		},
		phone: {
			required: true,
			type: String
		},
		email: {
			type: String,
			unique: true,
			required: true
		},
		sex: {
			type: String,
			required: true,
			enum: ['male', 'female']
		},
		distance: {
			type: String,
			required: true
		},
		userCountry: {
			type: String
		},
		event: [
			{
				type: Schema.Types.ObjectId,
				ref: 'events'
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('eventUsers', eventUserSchema);
