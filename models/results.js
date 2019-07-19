const mongoose = require('mongoose');

const { Schema } = mongoose;

const resultSchema = new Schema(
	{
		name: {
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
		time: {
			type: String,
			required: true
		},
		rating: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('result', resultSchema);
