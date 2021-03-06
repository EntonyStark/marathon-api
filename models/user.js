const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
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
		password: {
			type: String,
			required: true
		},
		sex: {
			type: String,
			required: true,
			enum: ['male', 'female']
		},
		role: {
			type: String,
			required: true,
			default: 'user',
			enum: ['user', 'admin']
		},
		history: [
			{
				type: Schema.Types.ObjectId,
				ref: 'event'
			}
		],
		result: [
			{
				type: Schema.Types.ObjectId,
				ref: 'result'
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
